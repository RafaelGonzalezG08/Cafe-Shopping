import { ReportsService } from './reports.service';

/**
 * `cashflow()` hace 4 agregaciones sobre la base. Aquí se mockea Prisma para
 * comprobar la aritmética de "saldo en caja" (dinero recibido de verdad) vs
 * "balance total" (todas las ventas).
 */
function crearService(datos: {
  ventasTotal: number;
  contadoTotal: number;
  abonosTotal: number;
  gastosTotal: number;
}) {
  const prisma = {
    sale: {
      aggregate: jest.fn(({ where }: any) => {
        // La consulta de contado lleva metodoPago: { in: [...] }.
        const esContado = where?.metodoPago?.in;
        return Promise.resolve({
          _sum: { total: esContado ? datos.contadoTotal : datos.ventasTotal },
        });
      }),
    },
    payment: {
      aggregate: jest.fn().mockResolvedValue({ _sum: { amount: datos.abonosTotal } }),
    },
    expense: {
      aggregate: jest.fn().mockResolvedValue({ _sum: { monto: datos.gastosTotal } }),
    },
  };
  return new ReportsService(prisma as any);
}

describe('ReportsService.cashflow', () => {
  it('saldo en caja = contado + abonos - gastos; balance total = todas las ventas - gastos', async () => {
    // Vendido 10.000 (de eso, 6.000 al contado). Cobrado además 1.500 en abonos.
    // Gastos 2.000.
    const svc = crearService({
      ventasTotal: 10000,
      contadoTotal: 6000,
      abonosTotal: 1500,
      gastosTotal: 2000,
    });
    const r = await svc.cashflow();

    expect(r.ingresos).toBe(10000);
    expect(r.egresos).toBe(2000);
    expect(r.balanceTotal).toBe(8000); // 10000 - 2000
    expect(r.cobrado).toBe(7500); // 6000 + 1500
    expect(r.saldoEnCaja).toBe(5500); // 7500 - 2000
    expect(r.neto).toBe(r.balanceTotal); // compatibilidad
  });

  it('sin ventas ni gastos todo queda en cero (no NaN)', async () => {
    const svc = crearService({
      ventasTotal: null as any,
      contadoTotal: null as any,
      abonosTotal: null as any,
      gastosTotal: null as any,
    });
    const r = await svc.cashflow();
    expect(r).toMatchObject({
      ingresos: 0,
      egresos: 0,
      neto: 0,
      cobrado: 0,
      saldoEnCaja: 0,
      balanceTotal: 0,
    });
  });

  it('el saldo en caja puede ser negativo si se gastó más de lo cobrado', async () => {
    const svc = crearService({
      ventasTotal: 5000,
      contadoTotal: 1000,
      abonosTotal: 0,
      gastosTotal: 3000,
    });
    const r = await svc.cashflow();
    expect(r.saldoEnCaja).toBe(-2000); // 1000 - 3000
    expect(r.balanceTotal).toBe(2000); // 5000 - 3000
  });
});
