import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EstadoDeuda } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { InvoicesService } from '../invoices/invoices.service';
import { RegisterPaymentDto } from './dto/register-payment.dto';

@Injectable()
export class ClientDebtsService {
  private readonly logger = new Logger(ClientDebtsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
    private readonly invoicesService: InvoicesService,
  ) {}

  /** Usado por SalesService cuando una venta se registra con metodoPago = CREDITO. */
  async createFromSale(clientId: string, saleId: string, amountTotal: number, dueDate?: Date) {
    return this.prisma.clientDebt.create({
      data: {
        clientId,
        saleId,
        amountTotal,
        dueDate,
        status: EstadoDeuda.PENDIENTE,
      },
    });
  }

  async findAll(status?: EstadoDeuda) {
    const debts = await this.prisma.clientDebt.findMany({
      where: status ? { status } : { status: { not: EstadoDeuda.PAGADA } },
      include: {
        client: { select: { id: true, nombre: true, telefono: true, lastReminderSentAt: true } },
      },
      orderBy: { dueDate: 'asc' },
    });

    // ClientDebt.saleId es solo un string (sin relacion formal de Prisma hacia
    // Sale) para no requerir otra migracion; se resuelve con un segundo query.
    const saleIds = debts.map((d) => d.saleId).filter((id): id is string => Boolean(id));
    const sales = saleIds.length
      ? await this.prisma.sale.findMany({
          where: { id: { in: saleIds } },
          select: { id: true, fecha: true, total: true, invoice: { select: { numero: true, pngUrl: true, estado: true } } },
        })
      : [];
    const saleById = new Map(sales.map((s) => [s.id, s]));

    return debts.map((debt) => ({ ...debt, sale: debt.saleId ? saleById.get(debt.saleId) ?? null : null }));
  }

  async registerPayment(debtId: string, dto: RegisterPaymentDto, userId?: string) {
    const debt = await this.prisma.clientDebt.findUnique({ where: { id: debtId } });
    if (!debt) throw new NotFoundException('Deuda no encontrada.');

    const saldoPendiente = Number(debt.amountTotal) - Number(debt.amountPaid);
    if (dto.amount > saldoPendiente + 0.01) {
      throw new BadRequestException(
        `El abono (${dto.amount}) supera el saldo pendiente (${saldoPendiente.toFixed(2)}).`,
      );
    }

    const nuevoPagado = Number(debt.amountPaid) + dto.amount;
    const nuevoEstado: EstadoDeuda =
      nuevoPagado >= Number(debt.amountTotal) - 0.01
        ? EstadoDeuda.PAGADA
        : EstadoDeuda.PARCIAL;

    const [updated] = await this.prisma.$transaction([
      this.prisma.clientDebt.update({
        where: { id: debtId },
        data: { amountPaid: nuevoPagado, status: nuevoEstado },
      }),
      this.prisma.payment.create({
        data: {
          saleId: debt.saleId as string,
          amount: dto.amount,
          metodo: dto.metodo,
        },
      }),
    ]);

    await this.audit.log('ClientDebt', debtId, 'UPDATE', userId, {
      abono: dto.amount,
      nuevoEstado,
    });

    // Regenera la factura para que el PNG/PDF refleje el abono y el saldo
    // actualizado. No tumbamos el abono si falla el renderizado: ya quedo
    // registrado en la base y la factura puede regenerarse despues.
    if (debt.saleId) {
      try {
        await this.invoicesService.generateForSale(debt.saleId);
      } catch (error) {
        this.logger.error(`Fallo al regenerar factura tras abono de la deuda ${debtId}: ${error}`);
      }
    }

    return updated;
  }

  /**
   * Envia un recordatorio de cobro por WhatsApp para una deuda (usa el mismo
   * agente .ahk que el envio normal de facturas: adjunta el PNG + el texto
   * del recordatorio en un solo mensaje).
   *
   * Ya no tiene limite de "1 cada 24h": se guarda igual `lastReminderSentAt`
   * como referencia informativa (para mostrar "ultimo recordatorio: hace
   * X"), pero no bloquea el envio.
   */
  async sendReminder(debtId: string, userId?: string) {
    const debt = await this.prisma.clientDebt.findUnique({
      where: { id: debtId },
      include: { client: true },
    });
    if (!debt) throw new NotFoundException('Deuda no encontrada.');

    if (debt.status === EstadoDeuda.PAGADA) {
      throw new BadRequestException('Esta deuda ya esta saldada. No se puede enviar un recordatorio.');
    }
    if (!debt.client.telefono) {
      throw new BadRequestException('El cliente no tiene un telefono registrado.');
    }
    if (!debt.saleId) {
      throw new BadRequestException('Esta deuda no tiene una venta/factura asociada.');
    }

    const saldo = Math.max(0, Number(debt.amountTotal) - Number(debt.amountPaid));

    await this.invoicesService.sendDebtReminder(debt.saleId, saldo, userId);

    await this.prisma.client.update({
      where: { id: debt.clientId },
      data: { lastReminderSentAt: new Date() },
    });

    await this.audit.log('Client', debt.clientId, 'UPDATE', userId, {
      accion: 'recordatorio-whatsapp',
      debtId,
    });

    return this.prisma.clientDebt.findUnique({ where: { id: debtId }, include: { client: true } });
  }

  /** Marca como vencidas las deudas cuya fecha limite ya paso. Corre automaticamente cada dia a la 1:00am. */
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async marcarVencidas() {
    const result = await this.prisma.clientDebt.updateMany({
      where: {
        status: { in: [EstadoDeuda.PENDIENTE, EstadoDeuda.PARCIAL] },
        dueDate: { lt: new Date() },
      },
      data: { status: EstadoDeuda.VENCIDA },
    });
    if (result.count > 0) {
      this.logger.log(`${result.count} deuda(s) marcadas como VENCIDA.`);
    }
    return result.count;
  }
}
