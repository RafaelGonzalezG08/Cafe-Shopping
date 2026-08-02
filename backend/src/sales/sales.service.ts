import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EstadoFactura, MetodoPago, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { InvoicesService } from '../invoices/invoices.service';
import { parseFromDate, parseToDate } from '../common/date-range';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { DeleteSaleDto } from './dto/delete-sale.dto';

export interface SaleTotals {
  subtotal: number;
  impuestos: number;
  total: number;
}

const DEFAULT_TAX_RATE = Number(process.env.DEFAULT_TAX_RATE ?? 0.18);

@Injectable()
export class SalesService {
  private readonly logger = new Logger(SalesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
    private readonly invoicesService: InvoicesService,
  ) {}

  /** Calcula subtotal/impuestos/total. Expuesto tambien para pruebas unitarias. */
  static calculateTotals(items: { cantidad: number; precioUnitario: number }[], tasaImpuesto: number): SaleTotals {
    const subtotal = items.reduce((sum, item) => sum + item.cantidad * item.precioUnitario, 0);
    const impuestos = Math.round(subtotal * tasaImpuesto * 100) / 100;
    const total = Math.round((subtotal + impuestos) * 100) / 100;
    return { subtotal: Math.round(subtotal * 100) / 100, impuestos, total };
  }

  async create(dto: CreateSaleDto, userId: string) {
    if (dto.metodoPago === MetodoPago.CREDITO && !dto.clientId) {
      throw new BadRequestException('Una venta a credito requiere seleccionar un cliente.');
    }

    const tasaImpuesto = dto.tasaImpuesto ?? (await this.getTasaImpuestoDefault());
    const totals = SalesService.calculateTotals(dto.items, tasaImpuesto);
    const costByProductId = await this.getCostByProductId(dto.items);

    const sale = await this.prisma.$transaction(async (tx) => {
      const created = await tx.sale.create({
        data: {
          fecha: new Date(),
          subtotal: totals.subtotal,
          impuestos: totals.impuestos,
          total: totals.total,
          metodoPago: dto.metodoPago,
          userId,
          clientId: dto.clientId,
          items: {
            create: dto.items.map((item) => ({
              productId: item.productId,
              descripcion: item.descripcion,
              cantidad: item.cantidad,
              precioUnitario: item.precioUnitario,
              // Copiado del catalogo al momento de vender (nunca del cliente) para
              // que el margen reportado en Costos no cambie si luego se edita el
              // costo del producto.
              costoUnitario: item.productId ? costByProductId.get(item.productId) ?? 0 : 0,
              total: Math.round(item.cantidad * item.precioUnitario * 100) / 100,
            })),
          },
        },
        include: { items: true },
      });

      // Descuenta stock de productos del catalogo (ignora items manuales, que
      // no tienen productId). El `where` con `stock >= cantidad` hace que el
      // descuento sea atomico; si no alcanza, updateMany afecta 0 filas y hay
      // que AVISAR: antes se ignoraba en silencio y la venta se registraba
      // igual, dejando el inventario desfasado sin que nadie se enterara.
      await this.descontarStock(tx, dto.items);

      if (dto.metodoPago === MetodoPago.CREDITO && dto.clientId) {
        await tx.clientDebt.create({
          data: {
            clientId: dto.clientId,
            saleId: created.id,
            amountTotal: totals.total,
            dueDate: dto.fechaVencimiento ? new Date(dto.fechaVencimiento) : undefined,
          },
        });
      }

      const numero = await this.generateInvoiceNumber(tx);
      await tx.invoice.create({
        data: {
          saleId: created.id,
          numero,
          estado: EstadoFactura.PENDIENTE,
        },
      });

      // Pedido por entregar: queda en el registro de Pedidos hasta que se
      // marque como entregado (ahi se borra y la factura pasa a ser el
      // registro de la venta). Ver orders.service.ts.
      if (dto.esPedido) {
        await tx.order.create({
          data: {
            saleId: created.id,
            fechaEntrega: dto.fechaEntrega ? parseFromDate(dto.fechaEntrega) : null,
          },
        });
      }

      return created;
    });

    await this.audit.log('Sale', sale.id, 'CREATE', userId, {
      total: totals.total,
      metodoPago: dto.metodoPago,
    });

    if (dto.generarFactura !== false) {
      try {
        await this.invoicesService.generateForSale(sale.id);
      } catch (error) {
        // No tumbamos la venta si falla la generacion del PNG: la venta ya quedo
        // registrada y la factura puede regenerarse/reenviarse despues.
        this.logger.error(`Fallo al generar factura para venta ${sale.id}: ${error}`);
      }
    }

    return this.findOne(sale.id);
  }

  /**
   * Edita los items de una venta ya creada (correccion de un error de
   * facturacion: cantidad o precio mal digitado, etc.).
   *
   * Requiere que quien llama sea ADMIN (verificado por el guard en el
   * controller) Y que vuelva a escribir SU PROPIA clave en `dto.adminPassword`
   * como confirmacion extra — aunque ya este loggeado, editar una factura ya
   * emitida es sensible (afecta reportes, inventario y posiblemente una
   * deuda de cliente), asi que no basta con tener la sesion abierta.
   */
  async update(id: string, dto: UpdateSaleDto, userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado.');
    const passwordOk = await bcrypt.compare(dto.adminPassword, user.passwordHash);
    if (!passwordOk) {
      throw new ForbiddenException('Clave de administrador incorrecta.');
    }

    const existing = await this.prisma.sale.findUnique({
      where: { id },
      include: { items: true },
    });
    if (!existing) throw new NotFoundException('Venta no encontrada.');
    const existingDebt = await this.prisma.clientDebt.findFirst({ where: { saleId: id } });

    const tasaImpuesto = existing.subtotal.gt(0) ? Number(existing.impuestos) / Number(existing.subtotal) : await this.getTasaImpuestoDefault();
    const totals = SalesService.calculateTotals(dto.items, tasaImpuesto);
    const costByProductId = await this.getCostByProductId(dto.items);

    if (existingDebt && totals.total < Number(existingDebt.amountPaid)) {
      throw new BadRequestException(
        `No se puede bajar el total a RD$ ${totals.total.toFixed(2)}: el cliente ya abono RD$ ${Number(
          existingDebt.amountPaid,
        ).toFixed(2)} de esta cuenta. Revisa los abonos antes de corregir la factura.`,
      );
    }

    await this.prisma.$transaction(async (tx) => {
      // Devuelve al inventario lo que esta venta habia descontado.
      for (const item of existing.items) {
        if (item.productId) {
          await tx.product.updateMany({
            where: { id: item.productId },
            data: { stock: { increment: item.cantidad } },
          });
        }
      }

      await tx.saleItem.deleteMany({ where: { saleId: id } });

      await tx.sale.update({
        where: { id },
        data: {
          subtotal: totals.subtotal,
          impuestos: totals.impuestos,
          total: totals.total,
          items: {
            create: dto.items.map((item) => ({
              productId: item.productId,
              descripcion: item.descripcion,
              cantidad: item.cantidad,
              precioUnitario: item.precioUnitario,
              costoUnitario: item.productId ? costByProductId.get(item.productId) ?? 0 : 0,
              total: Math.round(item.cantidad * item.precioUnitario * 100) / 100,
            })),
          },
        },
      });

      // Descuenta el inventario segun los items corregidos (misma validacion
      // que al crear: si no alcanza el stock, la correccion se rechaza entera
      // y la transaccion revierte la devolucion de arriba).
      await this.descontarStock(tx, dto.items);

      if (existingDebt) {
        await tx.clientDebt.update({
          where: { id: existingDebt.id },
          data: { amountTotal: totals.total },
        });
      }
    });

    await this.audit.log('Sale', id, 'UPDATE', userId, {
      accion: 'correccion-factura',
      totalAnterior: Number(existing.total),
      totalNuevo: totals.total,
    });

    // Vuelve a generar el PNG/PDF de la factura para que refleje la correccion.
    try {
      await this.invoicesService.generateForSale(id);
    } catch (error) {
      this.logger.error(`Fallo al regenerar factura tras editar venta ${id}: ${error}`);
    }

    return this.findOne(id);
  }

  /**
   * Elimina una venta y su factura, devolviendo las piezas al inventario.
   *
   * Requiere ADMIN (guard en el controller) y ademas la clave del propio
   * admin, igual que corregir una factura: borrar una venta mueve reportes,
   * inventario y posiblemente una deuda de cliente.
   *
   * Lo que hay que borrar a mano (no cae por cascada):
   *  - `invoices` y `payments` tienen llave foranea hacia `sales` sin
   *    onDelete, asi que Postgres rechazaria el borrado.
   *  - `client_debts.sale_id` ni siquiera es una llave foranea (es una
   *    columna suelta), asi que la deuda quedaria apuntando a una venta que
   *    ya no existe — un cobro fantasma imposible de rastrear.
   * `sale_items` y `orders` si estan en cascada.
   */
  async remove(id: string, dto: DeleteSaleDto, userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado.');
    const passwordOk = await bcrypt.compare(dto.adminPassword, user.passwordHash);
    if (!passwordOk) {
      throw new ForbiddenException('Clave de administrador incorrecta.');
    }

    const sale = await this.prisma.sale.findUnique({
      where: { id },
      include: { items: true, invoice: true },
    });
    if (!sale) throw new NotFoundException('Venta no encontrada.');

    const debt = await this.prisma.clientDebt.findFirst({ where: { saleId: id } });
    if (debt && Number(debt.amountPaid) > 0) {
      // Borrarla eliminaria el rastro de dinero que el cliente ya entrego.
      // Se avisa en vez de destruirlo en silencio.
      throw new BadRequestException(
        `No se puede eliminar esta factura: el cliente ya abono RD$ ${Number(debt.amountPaid).toFixed(2)} ` +
          `a esta cuenta. Borrarla haria desaparecer el registro de ese dinero. Corrige la factura en vez de eliminarla.`,
      );
    }

    await this.prisma.$transaction(async (tx) => {
      // Devuelve al inventario lo que esta venta habia descontado.
      for (const item of sale.items) {
        if (item.productId) {
          await tx.product.updateMany({
            where: { id: item.productId },
            data: { stock: { increment: item.cantidad } },
          });
        }
      }

      await tx.payment.deleteMany({ where: { saleId: id } });
      if (debt) await tx.clientDebt.delete({ where: { id: debt.id } });
      await tx.invoice.deleteMany({ where: { saleId: id } });
      await tx.sale.delete({ where: { id } });
    });

    await this.audit.log('Sale', id, 'DELETE', userId, {
      numeroFactura: sale.invoice?.numero,
      total: Number(sale.total),
      piezasDevueltas: sale.items
        .filter((i) => i.productId)
        .map((i) => ({ productId: i.productId, cantidad: i.cantidad })),
    });

    return { id, deleted: true, numeroFactura: sale.invoice?.numero ?? null };
  }

  findAll(params: { from?: string; to?: string; clientId?: string }) {
    const where: Prisma.SaleWhereInput = {};
    if (params.from || params.to) {
      // "hasta" incluye el dia completo (hasta las 23:59:59.999 local); antes
      // se tomaba como medianoche UTC y las ventas del propio dia elegido no
      // aparecian en el listado. Ver common/date-range.ts.
      where.fecha = {
        gte: params.from ? parseFromDate(params.from) : undefined,
        lte: params.to ? parseToDate(params.to) : undefined,
      };
    }
    if (params.clientId) where.clientId = params.clientId;

    return this.prisma.sale.findMany({
      where,
      orderBy: { fecha: 'desc' },
      take: 200,
      include: {
        client: { select: { id: true, nombre: true, telefono: true } },
        invoice: true,
        items: true,
      },
    });
  }

  async findOne(id: string) {
    const sale = await this.prisma.sale.findUnique({
      where: { id },
      include: {
        client: true,
        user: { select: { id: true, nombre: true } },
        items: true,
        invoice: true,
        payments: true,
      },
    });
    if (!sale) throw new NotFoundException('Venta no encontrada.');
    return sale;
  }

  /**
   * Descuenta el stock de los items que vienen del catalogo, fallando de
   * forma ruidosa si alguno no tiene existencias suficientes.
   *
   * El descuento va con `where: { stock: { gte: cantidad } }` para que la
   * verificacion y el descuento ocurran en la MISMA operacion atomica (si se
   * consultara el stock antes y se descontara despues, dos cajas vendiendo la
   * ultima pieza a la vez podrian pasar ambas la verificacion). Cuando
   * `updateMany` reporta 0 filas afectadas es justamente porque el stock no
   * alcanzaba, y ahi se lanza el error que antes faltaba.
   */
  private async descontarStock(
    tx: Prisma.TransactionClient,
    items: { productId?: string; cantidad: number; descripcion: string }[],
  ) {
    for (const item of items) {
      if (!item.productId) continue;

      const { count } = await tx.product.updateMany({
        where: { id: item.productId, stock: { gte: item.cantidad } },
        data: { stock: { decrement: item.cantidad } },
      });

      if (count === 0) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
          select: { nombre: true, stock: true },
        });
        const nombre = product?.nombre ?? item.descripcion;
        throw new BadRequestException(
          `No hay stock suficiente de "${nombre}": quedan ${product?.stock ?? 0} y se intentaron vender ${item.cantidad}.`,
        );
      }
    }
  }

  /** Trae el costo actual del catalogo para los items que vienen de un producto (ignora items manuales). */
  private async getCostByProductId(items: { productId?: string }[]): Promise<Map<string, number>> {
    const productIds = [...new Set(items.map((i) => i.productId).filter((id): id is string => Boolean(id)))];
    if (productIds.length === 0) return new Map();
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, costoUnitario: true },
    });
    return new Map(products.map((p) => [p.id, Number(p.costoUnitario)]));
  }

  private async getTasaImpuestoDefault(): Promise<number> {
    const profile = await this.prisma.businessProfile.findFirst();
    return profile ? Number(profile.tasaImpuesto) : DEFAULT_TAX_RATE;
  }

  /**
   * Numero consecutivo de factura para el año en curso (FAC-2026-00007).
   *
   * Se toma del MAXIMO numero existente + 1, no de un `count()`:
   *  - Con count, si alguna vez se borra una factura (o se restaura un
   *    respaldo mas viejo), el conteo baja y se vuelve a emitir un numero ya
   *    usado — chocando con el indice unico de `numero` y tumbando la venta.
   *  - Ademas se toma un advisory lock de Postgres, que se libera solo al
   *    terminar la transaccion: sin el, dos cajeros cobrando al mismo tiempo
   *    leen el mismo maximo, piden el mismo numero, y a uno de los dos le
   *    revienta la venta entera por el indice unico.
   */
  private async generateInvoiceNumber(tx: Prisma.TransactionClient): Promise<string> {
    const year = new Date().getFullYear();
    const prefix = `FAC-${year}-`;

    await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${`invoice-number-${year}`}))`;

    const last = await tx.invoice.findFirst({
      where: { numero: { startsWith: prefix } },
      orderBy: { numero: 'desc' },
      select: { numero: true },
    });

    const lastNumber = last ? parseInt(last.numero.slice(prefix.length), 10) : 0;
    const next = Number.isFinite(lastNumber) ? lastNumber + 1 : 1;
    return `${prefix}${String(next).padStart(5, '0')}`;
  }
}
