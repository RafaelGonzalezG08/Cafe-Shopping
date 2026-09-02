import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';
import { BootstrapService } from '../src/prisma/bootstrap.service';
import { PrismaService } from '../src/prisma/prisma.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('supertest');

/**
 * Test e2e sobre una base SQLite temporal (la crea y migra test/global-setup.ts).
 * Cubre el camino que mueve dinero: venta → factura → abono → borrado.
 */
describe('AppModule (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    app.setGlobalPrefix('api');
    await app.init();

    prisma = app.get(PrismaService);
    await app.get(BootstrapService).ensureInitialData();

    const login = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: 'admin@cafeshopping.com', password: 'cafe1234' });
    token = login.body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  const auth = (r: any) => r.set('Authorization', `Bearer ${token}`);

  it('rechaza credenciales inválidas con 401', async () => {
    const r = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: 'no-existe@cafeshopping.com', password: 'incorrecta12' });
    expect(r.status).toBe(401);
  });

  it('/api/clients sin token responde 401', async () => {
    const r = await request(app.getHttpServer()).get('/api/clients');
    expect(r.status).toBe(401);
  });

  it('numera las facturas de forma consecutiva', async () => {
    const prod = await prisma.product.create({
      data: { sku: `E2E-${Date.now()}`, nombre: 'Anillo e2e', precioUnitario: 500, stock: 10 },
    });

    const venta = (desc: string) =>
      auth(request(app.getHttpServer()).post('/api/sales')).send({
        metodoPago: 'EFECTIVO',
        generarFactura: false,
        items: [{ productId: prod.id, descripcion: desc, cantidad: 1, precioUnitario: 500 }],
      });

    const a = await venta('primera');
    const b = await venta('segunda');
    expect(a.status).toBe(201);
    expect(b.status).toBe(201);

    const na = parseInt(a.body.invoice.numero.split('-').pop(), 10);
    const nb = parseInt(b.body.invoice.numero.split('-').pop(), 10);
    expect(nb).toBe(na + 1);
  });

  it('venta a crédito crea deuda; el abono la reduce', async () => {
    const cliente = await prisma.client.create({
      data: { nombre: 'Cliente e2e', telefono: '8090000000' },
    });

    const venta = await auth(request(app.getHttpServer()).post('/api/sales')).send({
      metodoPago: 'CREDITO',
      clientId: cliente.id,
      generarFactura: false,
      tasaImpuesto: 0,
      items: [{ descripcion: 'Cadena a crédito', cantidad: 1, precioUnitario: 3000 }],
    });
    expect(venta.status).toBe(201);

    const deudas = await auth(request(app.getHttpServer()).get('/api/client-debts'));
    const deuda = deudas.body.find((d: any) => d.clientId === cliente.id);
    expect(deuda).toBeTruthy();
    expect(Number(deuda.amountTotal)).toBe(3000);

    const abono = await auth(
      request(app.getHttpServer()).post(`/api/client-debts/${deuda.id}/payments`),
    ).send({ amount: 1000, metodo: 'EFECTIVO' });
    expect(abono.status).toBe(201);

    const despues = await prisma.clientDebt.findUnique({ where: { id: deuda.id } });
    expect(Number(despues!.amountPaid)).toBe(1000);
    expect(despues!.status).toBe('PARCIAL');
  });

  it('borrar una venta (admin) devuelve el stock', async () => {
    const prod = await prisma.product.create({
      data: { sku: `E2E-STK-${Date.now()}`, nombre: 'Pulsera e2e', precioUnitario: 800, stock: 5 },
    });

    const venta = await auth(request(app.getHttpServer()).post('/api/sales')).send({
      metodoPago: 'EFECTIVO',
      generarFactura: false,
      items: [{ productId: prod.id, descripcion: 'Pulsera e2e', cantidad: 2, precioUnitario: 800 }],
    });
    expect(venta.status).toBe(201);
    expect((await prisma.product.findUnique({ where: { id: prod.id } }))!.stock).toBe(3);

    const del = await auth(request(app.getHttpServer()).delete(`/api/sales/${venta.body.id}`)).send(
      {
        adminPassword: 'cafe1234',
      },
    );
    expect(del.status).toBe(200);
    expect((await prisma.product.findUnique({ where: { id: prod.id } }))!.stock).toBe(5);
  });

  it('borrar una venta a crédito sin abonos borra también su deuda', async () => {
    const cliente = await prisma.client.create({
      data: { nombre: 'Cliente deuda e2e', telefono: '8091112222' },
    });
    const venta = await auth(request(app.getHttpServer()).post('/api/sales')).send({
      metodoPago: 'CREDITO',
      clientId: cliente.id,
      generarFactura: false,
      tasaImpuesto: 0,
      items: [{ descripcion: 'Anillo a crédito', cantidad: 1, precioUnitario: 1200 }],
    });
    expect(venta.status).toBe(201);
    expect(await prisma.clientDebt.count({ where: { clientId: cliente.id } })).toBe(1);

    const del = await auth(request(app.getHttpServer()).delete(`/api/sales/${venta.body.id}`)).send(
      {
        adminPassword: 'cafe1234',
      },
    );
    expect(del.status).toBe(200);
    expect(await prisma.clientDebt.count({ where: { clientId: cliente.id } })).toBe(0);
  });

  it('borrar una categoría deja sus productos sin categoría (no los borra)', async () => {
    const cat = await prisma.category.create({ data: { nombre: `Cat e2e ${Date.now()}` } });
    const prod = await prisma.product.create({
      data: {
        sku: `E2E-CAT-${Date.now()}`,
        nombre: 'Con categoría',
        precioUnitario: 100,
        stock: 1,
        categoriaId: cat.id,
      },
    });

    const del = await auth(request(app.getHttpServer()).delete(`/api/categories/${cat.id}`));
    expect(del.status).toBe(200);

    const despues = await prisma.product.findUnique({ where: { id: prod.id } });
    expect(despues).not.toBeNull();
    expect(despues!.categoriaId).toBeNull();
  });

  it('rechaza una venta con un producto que ya no existe, con mensaje claro', async () => {
    const r = await auth(request(app.getHttpServer()).post('/api/sales')).send({
      metodoPago: 'EFECTIVO',
      generarFactura: false,
      items: [
        { productId: 'no-existe', descripcion: 'Fantasma', cantidad: 1, precioUnitario: 100 },
      ],
    });
    expect(r.status).toBe(400);
    expect(String(r.body.message)).toMatch(/Fantasma/);
  });

  it('reports/cashflow devuelve saldo en caja y balance total', async () => {
    const r = await auth(request(app.getHttpServer()).get('/api/reports/cashflow'));
    expect(r.status).toBe(200);
    expect(r.body).toHaveProperty('saldoEnCaja');
    expect(r.body).toHaveProperty('balanceTotal');
    // Hubo ventas de contado en los tests anteriores.
    expect(r.body.cobrado).toBeGreaterThan(0);
  });
});
