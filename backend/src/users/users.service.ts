import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        nombre: true,
        email: true,
        role: true,
        activo: true,
        createdAt: true,
      },
      orderBy: { nombre: 'asc' },
    });
  }

  /**
   * Cambia la clave del usuario que tiene la sesion abierta.
   *
   * Se pide la clave actual aunque la sesion ya este iniciada: si alguien deja
   * la caja abierta un momento, cualquiera podria cambiarla y dejar al dueño
   * fuera de su propio sistema.
   *
   * Solo permite cambiar la PROPIA clave (el id sale del token, no del
   * cuerpo de la peticion), asi que un cajero no puede tocar la del
   * administrador.
   */
  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado.');

    const correcta = await bcrypt.compare(dto.passwordActual, user.passwordHash);
    if (!correcta) throw new ForbiddenException('La clave actual no es correcta.');

    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash: await bcrypt.hash(dto.passwordNueva, 10) },
    });

    // Nunca se registra la clave, solo que hubo un cambio y cuando.
    await this.audit.log('User', userId, 'UPDATE', userId, { accion: 'cambio-de-clave' });
    return { ok: true };
  }

  async setActive(id: string, activo: boolean, currentUserId: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado.');

    const updated = await this.prisma.user.update({
      where: { id },
      data: { activo },
      select: { id: true, nombre: true, email: true, role: true, activo: true },
    });

    await this.audit.log('User', id, 'UPDATE', currentUserId, { activo });
    return updated;
  }
}
