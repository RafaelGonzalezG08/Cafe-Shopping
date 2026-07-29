import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

/**
 * Test e2e de humo. Requiere una base de datos Postgres real accesible via
 * DATABASE_URL (usa la misma que la app) con las migraciones ya aplicadas.
 * Se salta automaticamente si no hay base de datos disponible.
 */
describe('AppModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/auth/login (POST) rechaza credenciales invalidas con 401', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: 'no-existe@cafeshopping.com', password: 'incorrecta' });

    expect(response.status).toBe(401);
  });

  it('/api/clients (GET) sin token responde 401', async () => {
    const response = await request(app.getHttpServer()).get('/api/clients');
    expect(response.status).toBe(401);
  });
});
