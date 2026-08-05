import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { StorageService } from '../invoices/storage.service';
import { optimizeProductImage } from '../common/image.util';
import { CatalogoService } from '../catalogo/catalogo.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
    private readonly storage: StorageService,
    private readonly catalogo: CatalogoService,
  ) {}

  /**
   * Vuelve a generar el sitio del catalogo despues de un cambio en el
   * inventario (precio, foto, stock, alta o baja), para que quien lo suba a
   * Netlify siempre tenga la version mas reciente sin tener que acordarse de
   * pulsar "Publicar catalogo" cada vez.
   *
   * Sin `await` en quien la llama: regenerar no debe demorar la respuesta al
   * cajero que esta guardando una pieza, y el propio metodo atrapa cualquier
   * error para que un fallo aqui (por ejemplo, si aun no se configuro el
   * telefono de WhatsApp del catalogo) nunca tumbe el guardado del producto.
   */
  private async regenerarCatalogo(): Promise<void> {
    try {
      const resultado = await this.catalogo.generar();
      if (!resultado.ok) {
        this.logger.warn(`No se pudo actualizar el catalogo web: ${resultado.error}`);
      }
    } catch (error) {
      this.logger.warn(`No se pudo actualizar el catalogo web: ${error}`);
    }
  }

  findAll(onlyActive = true) {
    return this.prisma.product.findMany({
      where: onlyActive ? { activo: true } : undefined,
      orderBy: { nombre: 'asc' },
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Producto no encontrado.');
    return product;
  }

  async create(dto: CreateProductDto, userId?: string) {
    const sku = dto.sku?.trim() || (await this.generateSku(dto.nombre));

    const existing = await this.prisma.product.findUnique({ where: { sku } });
    if (existing) throw new ConflictException('Ya existe un producto con ese SKU.');

    const product = await this.prisma.product.create({ data: { ...dto, sku } });
    await this.audit.log('Product', product.id, 'CREATE', userId, { ...dto, sku } as any);
    void this.regenerarCatalogo();
    return product;
  }

  /**
   * Genera un SKU tipo "AN-0001": las 2 primeras letras del nombre (sin
   * acentos, en mayusculas) mas un consecutivo de 4 digitos, calculado a
   * partir del ultimo SKU existente con ese mismo prefijo.
   */
  private async generateSku(nombre: string): Promise<string> {
    const soloLetras = nombre
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // quita acentos (á -> a)
      .replace(/[^a-zA-Z]/g, '');
    const prefix = (soloLetras.slice(0, 2) || 'PR').toUpperCase();

    const last = await this.prisma.product.findFirst({
      where: { sku: { startsWith: `${prefix}-` } },
      orderBy: { sku: 'desc' },
    });

    let nextNumber = 1;
    if (last) {
      const match = last.sku.match(/-(\d+)$/);
      if (match) nextNumber = parseInt(match[1], 10) + 1;
    }

    return `${prefix}-${String(nextNumber).padStart(4, '0')}`;
  }

  async update(id: string, dto: UpdateProductDto, userId?: string) {
    await this.findOne(id);
    const product = await this.prisma.product.update({ where: { id }, data: dto });
    await this.audit.log('Product', id, 'UPDATE', userId, dto as any);
    void this.regenerarCatalogo();
    return product;
  }

  async remove(id: string, userId?: string) {
    await this.findOne(id);
    // Baja logica en lugar de borrado fisico para no romper ventas historicas.
    const product = await this.prisma.product.update({
      where: { id },
      data: { activo: false },
    });
    await this.audit.log('Product', id, 'DELETE', userId);
    // La pieza dada de baja tiene que desaparecer del sitio publico tambien.
    void this.regenerarCatalogo();
    return product;
  }

  async updatePhoto(id: string, buffer: Buffer, mimetype: string, userId?: string) {
    await this.findOne(id);
    // Se reduce a 800x800 y se comprime antes de guardar (ver image.util.ts):
    // las fotos vienen del celular pesando megabytes y se muestran a 144px.
    const optimized = await optimizeProductImage(buffer, mimetype);
    const key = `products/${id}-${Date.now()}.${optimized.ext}`;
    const imageUrl = await this.storage.upload(optimized.buffer, key, optimized.contentType);
    const product = await this.prisma.product.update({ where: { id }, data: { imageUrl } });
    await this.audit.log('Product', id, 'UPDATE', userId, { imageUrl });
    void this.regenerarCatalogo();
    return product;
  }
}
