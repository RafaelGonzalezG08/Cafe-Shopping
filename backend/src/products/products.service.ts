import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { StorageService } from '../invoices/storage.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
    private readonly storage: StorageService,
  ) {}

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
    return product;
  }

  async updatePhoto(id: string, buffer: Buffer, mimetype: string, userId?: string) {
    await this.findOne(id);
    const ext = mimetype === 'image/png' ? 'png' : mimetype === 'image/webp' ? 'webp' : 'jpg';
    const key = `products/${id}-${Date.now()}.${ext}`;
    const imageUrl = await this.storage.upload(buffer, key, mimetype);
    const product = await this.prisma.product.update({ where: { id }, data: { imageUrl } });
    await this.audit.log('Product', id, 'UPDATE', userId, { imageUrl });
    return product;
  }
}
