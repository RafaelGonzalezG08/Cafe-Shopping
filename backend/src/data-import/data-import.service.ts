import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { promises as fs, createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { pipeline as pipelineCb } from 'stream';
import { promisify } from 'util';
import { tmpdir } from 'os';
import { join } from 'path';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsService } from '../products/products.service';
import { AuditService } from '../audit/audit.service';
import { CatalogoService } from '../catalogo/catalogo.service';

const pipeline = promisify(pipelineCb);

export interface ProductoRenumerado {
  nombre: string;
  skuOriginal: string;
  skuNuevo: string;
}

export interface ResumenImportacion {
  total: number;
  agregados: number;
  renumerados: ProductoRenumerado[];
  omitidos: number;
}

/**
 * Une el inventario de OTRA computadora (ej. la de mama) con el de esta,
 * a partir de un respaldo .sqlite.gz generado por Configuracion > Respaldos.
 *
 * Solo toca productos: clientes, ventas y facturas se quedan cada uno en su
 * propia computadora, tal como el negocio los usa hoy (no hay una sola caja
 * compartida entre ambas).
 *
 * Regla de oro, pedida explicitamente: esto NUNCA modifica una fila que ya
 * existia en la base de datos ACTUAL. Solo se insertan filas nuevas — las
 * que vienen del archivo importado, con su SKU tal cual si esta libre, o con
 * uno nuevo (siguiendo la secuencia de ESTA base) si ya estaba en uso.
 */
@Injectable()
export class DataImportService {
  private readonly logger = new Logger(DataImportService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly products: ProductsService,
    private readonly audit: AuditService,
    private readonly catalogo: CatalogoService,
  ) {}

  async importarProductos(buffer: Buffer, userId?: string): Promise<ResumenImportacion> {
    const carpetaTemp = await fs.mkdtemp(join(tmpdir(), 'cafe-shopping-import-'));
    const rutaSqlite = join(carpetaTemp, 'origen.sqlite');
    let origen: PrismaClient | null = null;

    try {
      await this.prepararArchivo(buffer, rutaSqlite);

      origen = new PrismaClient({ datasources: { db: { url: `file:${rutaSqlite}` } } });

      let productosOrigen: Array<{
        sku: string;
        nombre: string;
        precioUnitario: unknown;
        costoUnitario: unknown;
        material: string;
        stock: number;
      }>;
      try {
        productosOrigen = await origen.product.findMany({
          where: { activo: true },
          select: { sku: true, nombre: true, precioUnitario: true, costoUnitario: true, material: true, stock: true },
        });
      } catch (error) {
        this.logger.warn(`No se pudo leer productos del archivo importado: ${error}`);
        throw new BadRequestException(
          'Ese archivo no parece un respaldo valido de Cafe Shopping (no se pudo leer su inventario).',
        );
      }

      const renumerados: ProductoRenumerado[] = [];
      let agregados = 0;
      let omitidos = 0;

      // Secuencial (no Promise.all): generateSku calcula el siguiente
      // consecutivo mirando el ultimo SKU de ESTA base, y si dos inserciones
      // corrieran a la vez podrian calcular el mismo numero y chocar.
      for (const p of productosOrigen) {
        if (!p.sku?.trim() || !p.nombre?.trim()) {
          omitidos++;
          continue;
        }

        const existente = await this.prisma.product.findUnique({ where: { sku: p.sku } });
        const skuFinal = existente ? await this.products.generateSku(p.nombre) : p.sku;

        await this.prisma.product.create({
          data: {
            sku: skuFinal,
            nombre: p.nombre,
            precioUnitario: p.precioUnitario as any,
            costoUnitario: p.costoUnitario as any,
            material: p.material,
            stock: p.stock,
            // Las fotos viven en la carpeta de uploads de la OTRA computadora:
            // no hay forma de traerlas solo con este archivo. Se importa sin
            // foto y se completa despues desde Productos.
            imageUrl: null,
            activo: true,
          },
        });

        if (existente) {
          renumerados.push({ nombre: p.nombre, skuOriginal: p.sku, skuNuevo: skuFinal });
        } else {
          agregados++;
        }
      }

      await this.audit.log('Product', 'import', 'CREATE', userId, {
        total: productosOrigen.length,
        agregados,
        renumerados: renumerados.length,
        omitidos,
      });

      if (agregados + renumerados.length > 0) {
        try {
          await this.catalogo.generar();
        } catch (error) {
          this.logger.warn(`No se pudo actualizar el catalogo web tras la importacion: ${error}`);
        }
      }

      return { total: productosOrigen.length, agregados, renumerados, omitidos };
    } finally {
      await origen?.$disconnect().catch(() => undefined);
      await fs.rm(carpetaTemp, { recursive: true, force: true }).catch(() => undefined);
    }
  }

  /**
   * Descomprime si hace falta (los respaldos de Configuracion salen en
   * .sqlite.gz) y valida que de verdad sea una base SQLite antes de abrirla,
   * igual que hace la restauracion de respaldos.
   */
  private async prepararArchivo(buffer: Buffer, destino: string): Promise<void> {
    const esGzip = buffer.length > 2 && buffer[0] === 0x1f && buffer[1] === 0x8b;

    if (esGzip) {
      const comprimido = join(destino, '..', 'origen.sqlite.gz');
      await fs.writeFile(comprimido, buffer);
      try {
        await pipeline(createReadStream(comprimido), createGunzip(), createWriteStream(destino));
      } catch (error) {
        throw new BadRequestException('El archivo esta corrupto o no es un respaldo valido (no se pudo descomprimir).');
      }
    } else {
      await fs.writeFile(destino, buffer);
    }

    const stat = await fs.stat(destino).catch(() => null);
    if (!stat || stat.size < 200) {
      throw new BadRequestException('El archivo esta vacio o corrupto.');
    }
    const cabecera = await fs
      .readFile(destino, { encoding: 'latin1', flag: 'r' })
      .then((c) => c.slice(0, 15));
    if (cabecera !== 'SQLite format 3') {
      throw new BadRequestException(
        'Ese archivo no parece un respaldo de base de datos. Sube el archivo .sqlite.gz que genera Configuracion > Respaldos automaticos en la otra computadora.',
      );
    }
  }
}
