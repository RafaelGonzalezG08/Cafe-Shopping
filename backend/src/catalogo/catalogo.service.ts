import { Injectable, Logger } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join, extname, basename } from 'path';
import { PrismaService } from '../prisma/prisma.service';
import { UPLOADS_DIR } from '../common/paths';
import { generarHtml, DatosCatalogo, ProductoCatalogo } from './plantilla';
import { MATERIAL_LABEL, Material } from '../common/enums';

export interface ResultadoGenerar {
  ok: boolean;
  carpeta?: string;
  productos?: number;
  /** Piezas que quedaron fuera y por que, para que el negocio pueda completarlas. */
  excluidasSinFoto?: number;
  excluidasSinPrecio?: number;
  error?: string;
}

/**
 * Genera el catalogo publico como un sitio estatico listo para subir.
 *
 * Por que estatico y no un servidor: el negocio no paga hosting ni mantiene
 * nada, el sitio no puede caerse por un fallo del programa, y no hay ninguna
 * base de datos en internet que pueda filtrarse. Los pedidos llegan por
 * WhatsApp, que es el canal que el negocio ya usa a diario.
 *
 * Lo que se publica y lo que no:
 *  - Solo productos ACTIVOS y CON EXISTENCIA. Mostrar piezas agotadas
 *    genera conversaciones de "ya no lo tengo" que desgastan al cliente.
 *  - Nunca el costo de adquisicion ni el margen: son datos internos.
 *  - Nunca clientes, ventas ni deudas.
 */
@Injectable()
export class CatalogoService {
  private readonly logger = new Logger(CatalogoService.name);

  constructor(private readonly prisma: PrismaService) {}

  /** Carpeta donde se deja el sitio listo para subir. */
  private carpetaSalida(): string {
    // Documentos del usuario: un lugar que la persona sabe encontrar, y que
    // no desaparece al actualizar el programa.
    const documentos =
      process.env.CATALOGO_DIR ||
      join(process.env.USERPROFILE || process.cwd(), 'Documents', 'Catalogo Cafe Shopping');
    return documentos;
  }

  private ejecucionActual: Promise<ResultadoGenerar> | null = null;
  private hayPendiente = false;

  /**
   * Punto de entrada publico: serializa las generaciones para que nunca
   * corran dos a la vez.
   *
   * Hace falta porque `generar()` borra la carpeta de salida y la vuelve a
   * escribir completa. Como ahora se dispara solo despues de cada cambio en
   * un producto (ver ProductsService), editar varias piezas seguidas lanzaba
   * varias generaciones en paralelo que se pisaban entre si — una borraba lo
   * que la otra estaba escribiendo a medio camino. Se detecto probando esto
   * mismo: 11 ediciones seguidas dejaron el sitio con 10 piezas y una con el
   * material de la corrida anterior.
   *
   * Si llega una peticion mientras otra esta corriendo, no se lanza una
   * segunda: se marca "pendiente" y, al terminar la actual, se corre UNA vez
   * mas (no una por cada peticion que llego en el medio) para que los
   * cambios que se cruzaron con la corrida en curso queden reflejados
   * igual, sin acumular trabajo de mas.
   */
  async generar(): Promise<ResultadoGenerar> {
    if (this.ejecucionActual) {
      this.hayPendiente = true;
      return this.ejecucionActual;
    }

    this.ejecucionActual = this.generarInterno();
    try {
      return await this.ejecucionActual;
    } finally {
      this.ejecucionActual = null;
      if (this.hayPendiente) {
        this.hayPendiente = false;
        void this.generar();
      }
    }
  }

  private async generarInterno(): Promise<ResultadoGenerar> {
    const perfil = await this.prisma.businessProfile.findFirst();

    if (!perfil?.telefonoWhatsapp?.trim()) {
      return {
        ok: false,
        error:
          'Falta el telefono de WhatsApp para pedidos. Ponlo en Configuracion > Datos del negocio ' +
          'antes de publicar: sin el, los clientes no tendrian como enviarte el pedido.',
      };
    }

    const candidatos = await this.prisma.product.findMany({
      where: { activo: true, stock: { gt: 0 } },
      orderBy: { nombre: 'asc' },
      // Se eligen los campos uno a uno para que el costo NUNCA pueda salir
      // publicado por descuido al agregar columnas nuevas al producto.
      select: {
        sku: true,
        nombre: true,
        precioUnitario: true,
        imageUrl: true,
        material: true,
        categoriaId: true,
      },
    });

    // categoriaId no es una relacion real de Prisma (ver schema.prisma), asi
    // que se resuelve el nombre aparte, con una sola consulta para todas las
    // piezas en vez de una por cada una.
    const categorias = await this.prisma.category.findMany({ select: { id: true, nombre: true } });
    const nombreCategoria = new Map(categorias.map((c) => [c.id, c.nombre]));

    // Una pieza sin precio saldria como "RD$ 0.00", que parece un error del
    // sitio o una ganga; y una sin foto no aporta nada en un catalogo cuyo
    // proposito es que la gente VEA la joya. Se dejan fuera y se informa
    // cuantas, para que el negocio sepa que le falta por completar.
    const sinPrecio = candidatos.filter((p) => Number(p.precioUnitario) <= 0);
    const conPrecio = candidatos.filter((p) => Number(p.precioUnitario) > 0);
    const sinFoto = conPrecio.filter((p) => !p.imageUrl);
    const productos = conPrecio.filter((p) => p.imageUrl);

    if (productos.length === 0) {
      return {
        ok: false,
        error:
          `Ninguna pieza esta lista para publicar. Del inventario activo con existencia, ` +
          `${sinFoto.length} no tienen foto y ${sinPrecio.length} no tienen precio. ` +
          `El catalogo necesita al menos una pieza con foto y precio.`,
      };
    }

    const carpeta = this.carpetaSalida();
    const carpetaFotos = join(carpeta, 'fotos');
    await fs.rm(carpeta, { recursive: true, force: true });
    await fs.mkdir(carpetaFotos, { recursive: true });

    const items: ProductoCatalogo[] = [];
    for (const p of productos) {
      items.push({
        sku: p.sku,
        nombre: p.nombre,
        precio: Number(p.precioUnitario),
        imagen: await this.copiarFoto(p.imageUrl, carpetaFotos),
        // Se manda ya traducido ("Plata" en vez de "PLATA"): la pagina no
        // conoce las constantes del backend, solo lo que va a mostrar.
        material: MATERIAL_LABEL[(p.material as Material) ?? 'OTRO'] ?? MATERIAL_LABEL.OTRO,
        categoria: p.categoriaId ? (nombreCategoria.get(p.categoriaId) ?? null) : null,
      });
    }

    const logo = await this.copiarFoto(perfil.logoUrl, carpetaFotos);

    const datos: DatosCatalogo = {
      negocio: perfil.nombre,
      descripcion: perfil.descripcionWeb ?? '',
      direccion: perfil.direccion ?? '',
      telefonoWhatsapp: perfil.telefonoWhatsapp,
      logo,
      productos: items,
      generado: new Date().toLocaleDateString('es-DO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      relevoUrl: perfil.relevoPedidosUrl?.trim() || undefined,
    };

    await fs.writeFile(join(carpeta, 'index.html'), generarHtml(datos), 'utf8');

    this.logger.log(
      `Catalogo generado con ${items.length} piezas en ${carpeta} ` +
        `(${sinFoto.length} sin foto y ${sinPrecio.length} sin precio quedaron fuera)`,
    );
    return {
      ok: true,
      carpeta,
      productos: items.length,
      excluidasSinFoto: sinFoto.length,
      excluidasSinPrecio: sinPrecio.length,
    };
  }

  /**
   * Copia una foto al sitio y devuelve su ruta relativa.
   *
   * Las fotos viven en la carpeta de datos del programa, que no es publica.
   * El sitio necesita su propia copia al lado del HTML para poder subirse
   * como un bloque a cualquier hosting.
   */
  private async copiarFoto(url: string | null, destino: string): Promise<string | null> {
    if (!url) return null;

    // Si ya es una direccion de internet (almacenamiento en la nube), se usa
    // tal cual: no hay nada que copiar.
    if (/^https?:\/\//i.test(url)) return url;

    const relativa = url.replace(/^\/uploads\//, '');
    const origen = join(UPLOADS_DIR, relativa);
    const nombre = basename(relativa);

    try {
      await fs.copyFile(origen, join(destino, nombre));
      return `fotos/${nombre}`;
    } catch {
      // Foto perdida (borrada a mano, respaldo incompleto): la pieza sale sin
      // imagen en vez de romper la generacion completa.
      this.logger.warn(`No se encontro la foto ${origen}; la pieza saldra sin imagen.`);
      return null;
    }
  }
}
