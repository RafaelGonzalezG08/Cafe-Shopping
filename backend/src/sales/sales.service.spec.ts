import { SalesService } from './sales.service';

describe('SalesService.calculateTotals', () => {
  it('calcula subtotal, impuestos y total para un solo item', () => {
    const totals = SalesService.calculateTotals(
      [{ cantidad: 2, precioUnitario: 100 }],
      0.18,
    );
    expect(totals.subtotal).toBe(200);
    expect(totals.impuestos).toBe(36);
    expect(totals.total).toBe(236);
  });

  it('suma correctamente varios items con cantidades distintas', () => {
    const totals = SalesService.calculateTotals(
      [
        { cantidad: 3, precioUnitario: 120.5 },
        { cantidad: 1, precioUnitario: 45 },
      ],
      0.18,
    );
    // subtotal = 361.5 + 45 = 406.5
    expect(totals.subtotal).toBe(406.5);
    expect(totals.impuestos).toBeCloseTo(73.17, 2);
    expect(totals.total).toBeCloseTo(479.67, 2);
  });

  it('con tasa de impuesto 0 el total es igual al subtotal', () => {
    const totals = SalesService.calculateTotals([{ cantidad: 5, precioUnitario: 10 }], 0);
    expect(totals.subtotal).toBe(50);
    expect(totals.impuestos).toBe(0);
    expect(totals.total).toBe(50);
  });

  it('redondea a 2 decimales', () => {
    const totals = SalesService.calculateTotals([{ cantidad: 3, precioUnitario: 33.333 }], 0.18);
    expect(Number.isInteger(totals.subtotal * 100)).toBe(true);
    expect(Number.isInteger(totals.impuestos * 100)).toBe(true);
    expect(Number.isInteger(totals.total * 100)).toBe(true);
  });
});
