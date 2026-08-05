import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { EstadoPedidoWeb } from '../common/enums';
import { parsearPedidoWeb, ItemPedidoWeb } from './parser';
import { CreateWebOrderDto } from './dto/create-web-order.dto';
import { UpdateWebOrderDto } from './dto/update-web-order.dto';

/** Fila de web_orders con `items` ya vuelto a ser un arreglo, listo para la interfaz. */
function conItems<T extends { items: string }>(pedido: T) {
  return { ...pedido, items: JSON.parse(pedido.items) as ItemPedidoWeb[] };
}

@Injectable()
export class WebOrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  /**
   * Interpreta el mensaje pegado y crea el pedido.
   *
   * El codigo del mensaje (ej. "PED-K3F7Q2") es el unico hilo entre lo que el
   * cliente escribio por WhatsApp y esta fila, asi que si ya existe uno con
   * ese codigo no se crea de nuevo (pegar el mismo mensaje dos veces no debe
   * duplicar el pedido).
   */
  async create(dto: CreateWebOrderDto, userId?: string) {
    const parseado = parsearPedidoWeb(dto.texto);
    if (!parseado) {
      throw new BadRequestException(
        'No se reconoce ese texto como un pedido del catalogo. Pega el mensaje completo, ' +
          'tal como lo mando el cliente por WhatsApp (con el numero de pedido y el total).',
      );
    }

    const existente = await this.prisma.webOrder.findUnique({ where: { codigo: parseado.codigo } });
    if (existente) {
      throw new ConflictException(`El pedido ${parseado.codigo} ya estaba registrado.`);
    }

    const creado = await this.prisma.webOrder.create({
      data: {
        codigo: parseado.codigo,
        items: JSON.stringify(parseado.items),
        total: parseado.total,
        textoOriginal: dto.texto.trim(),
      },
    });

    await this.audit.log('WebOrder', creado.id, 'CREATE', userId, {
      codigo: creado.codigo,
      total: parseado.total,
      items: parseado.items.length,
    });
    return conItems(creado);
  }

  async findAll(estado?: EstadoPedidoWeb) {
    const pedidos = await this.prisma.webOrder.findMany({
      where: estado ? { estado } : undefined,
      orderBy: { createdAt: 'desc' },
    });
    return pedidos.map(conItems);
  }

  async update(id: string, dto: UpdateWebOrderDto, userId?: string) {
    const pedido = await this.prisma.webOrder.findUnique({ where: { id } });
    if (!pedido) throw new NotFoundException('Pedido web no encontrado.');

    const actualizado = await this.prisma.webOrder.update({
      where: { id },
      data: { estado: dto.estado },
    });

    await this.audit.log('WebOrder', id, 'UPDATE', userId, { estado: dto.estado });
    return conItems(actualizado);
  }

  async remove(id: string, userId?: string) {
    const pedido = await this.prisma.webOrder.findUnique({ where: { id } });
    if (!pedido) throw new NotFoundException('Pedido web no encontrado.');

    await this.prisma.webOrder.delete({ where: { id } });
    await this.audit.log('WebOrder', id, 'DELETE', userId, { codigo: pedido.codigo });
    return { id, deleted: true };
  }
}
