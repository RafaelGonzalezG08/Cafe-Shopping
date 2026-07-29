import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Registra un cambio en audit_logs. Nunca lanza: una falla al auditar
   * no debe tumbar la operacion de negocio que la origino.
   */
  async log(
    entity: string,
    entityId: string,
    action: 'CREATE' | 'UPDATE' | 'DELETE',
    userId?: string,
    changes?: Prisma.InputJsonValue,
  ): Promise<void> {
    try {
      await this.prisma.auditLog.create({
        data: {
          entity,
          entityId,
          action,
          userId,
          changes: changes ?? undefined,
        },
      });
    } catch (error) {
      this.logger.warn(`No se pudo registrar auditoria para ${entity}:${entityId} - ${error}`);
    }
  }
}
