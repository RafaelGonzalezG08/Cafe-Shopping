import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  async findAll(search?: string) {
    const clients = await this.prisma.client.findMany({
      where: search
        ? {
            OR: [
              { nombre: { contains: search, mode: 'insensitive' } },
              { telefono: { contains: search } },
              { email: { contains: search, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: { nombre: 'asc' },
      include: {
        debts: { where: { status: { not: 'PAGADA' } } },
      },
    });

    return clients.map((client) => ({
      ...client,
      deudaPendiente: client.debts.reduce(
        (sum, debt) => sum + Number(debt.amountTotal) - Number(debt.amountPaid),
        0,
      ),
    }));
  }

  async findOne(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: {
        debts: { orderBy: { createdAt: 'desc' } },
        sales: {
          orderBy: { createdAt: 'desc' },
          take: 20,
          include: { invoice: true },
        },
      },
    });
    if (!client) throw new NotFoundException('Cliente no encontrado.');
    return client;
  }

  async create(dto: CreateClientDto, userId?: string) {
    const client = await this.prisma.client.create({ data: dto });
    await this.audit.log('Client', client.id, 'CREATE', userId, dto as any);
    return client;
  }

  async update(id: string, dto: UpdateClientDto, userId?: string) {
    await this.ensureExists(id);
    const client = await this.prisma.client.update({ where: { id }, data: dto });
    await this.audit.log('Client', id, 'UPDATE', userId, dto as any);
    return client;
  }

  /**
   * Borra un cliente que todavia no tiene historial.
   *
   * Si ya tiene ventas o deudas NO se borra: la base tiene llaves foraneas
   * desde `sales`/`client_debts` hacia `clients`, asi que el borrado fallaba
   * con un error crudo de Postgres (500 sin explicacion). Y aunque no
   * fallara, borrarlo destruiria el rastro de facturas ya emitidas a su
   * nombre. Se avisa con un mensaje claro en su lugar.
   */
  async remove(id: string, userId?: string) {
    await this.ensureExists(id);

    const [ventas, deudas] = await Promise.all([
      this.prisma.sale.count({ where: { clientId: id } }),
      this.prisma.clientDebt.count({ where: { clientId: id } }),
    ]);

    if (ventas > 0 || deudas > 0) {
      throw new BadRequestException(
        `No se puede borrar este cliente porque ya tiene historial (${ventas} venta(s) y ${deudas} deuda(s)). ` +
          `Borrarlo eliminaria el rastro de facturas ya emitidas a su nombre.`,
      );
    }

    await this.prisma.client.delete({ where: { id } });
    await this.audit.log('Client', id, 'DELETE', userId);
    return { id, deleted: true };
  }

  private async ensureExists(id: string) {
    const found = await this.prisma.client.findUnique({ where: { id } });
    if (!found) throw new NotFoundException('Cliente no encontrado.');
    return found;
  }
}
