import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { MigrationsService } from './prisma/migrations.service';
import { BootstrapService } from './prisma/bootstrap.service';
import { UPLOADS_DIR } from './common/paths';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  // Aplica las migraciones pendientes antes de atender peticiones. En la
  // version con Docker de esto se encargaba `prisma migrate deploy` en el
  // arranque del contenedor; aqui se hace en proceso para no tener que
  // empaquetar el CLI de Prisma en la app de escritorio (ver
  // MigrationsService). PRISMA_MIGRATIONS_DIR lo define Electron, que sabe
  // donde quedaron los archivos dentro de la instalacion.
  const migrationsDir =
    process.env.PRISMA_MIGRATIONS_DIR || join(process.cwd(), 'prisma', 'migrations');
  await app.get(MigrationsService).applyPending(migrationsDir);

  // Instalacion nueva: crea el primer administrador y el perfil del negocio.
  // Sin esto la base quedaba vacia y nadie podia iniciar sesion.
  await app.get(BootstrapService).ensureInitialData();

  const configuredOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';

  app.use(helmet({ crossOriginResourcePolicy: false }));
  app.enableCors({
    origin: configuredOrigin.split(',').map((o) => o.trim()),
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  // Sirve los archivos generados localmente (fallback cuando no hay S3 configurado)
  app.use('/uploads', express.static(UPLOADS_DIR));

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Cafe Shopping API')
    .setDescription(
      'API para el sistema de punto de venta, facturacion y reportes de Cafe Shopping.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Cafe Shopping API escuchando en http://localhost:${port}/api`);
  // eslint-disable-next-line no-console
  console.log(`Documentacion Swagger en http://localhost:${port}/api/docs`);
}
bootstrap();
