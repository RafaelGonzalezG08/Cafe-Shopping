import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { MigrationsService } from './migrations.service';

@Global()
@Module({
  providers: [PrismaService, MigrationsService],
  exports: [PrismaService, MigrationsService],
})
export class PrismaModule {}
