import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';

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
