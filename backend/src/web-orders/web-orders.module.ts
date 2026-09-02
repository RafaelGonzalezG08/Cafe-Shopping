import { Module } from '@nestjs/common';
import { WebOrdersController } from './web-orders.controller';
import { WebOrdersService } from './web-orders.service';
import { WebOrdersRelayService } from './web-orders-relay.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuditModule } from '../audit/audit.module';
import { SalesModule } from '../sales/sales.module';

@Module({
  imports: [PrismaModule, AuditModule, SalesModule],
  controllers: [WebOrdersController],
  providers: [WebOrdersService, WebOrdersRelayService],
})
export class WebOrdersModule {}
