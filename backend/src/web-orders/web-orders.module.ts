import { Module } from '@nestjs/common';
import { WebOrdersController } from './web-orders.controller';
import { WebOrdersService } from './web-orders.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [PrismaModule, AuditModule],
  controllers: [WebOrdersController],
  providers: [WebOrdersService],
})
export class WebOrdersModule {}
