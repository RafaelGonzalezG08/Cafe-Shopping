import { Injectable } from '@nestjs/common';
import { EstadoDeuda } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export type GroupBy = 'day' | 'week' | 'month' | 'year';

interface PeriodBucket {
  periodo: string;
  ventas: number;
  subtotal: number;
  impuestos: number;
  total: number;
}

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  private defaultRange(from?: string, to?: string, group: GroupBy = 'day') {
    const toDate = to ? new Date(to) : new Date();
    if (from) {
      return { fromDate: new Date(from), toDate };
    }
    const spanMs: Record<GroupBy, number> = {
      day: 30 * 24 * 60 * 60 * 1000,
      week: 90 * 24 * 60 * 60 * 1000,
      month: 365 * 24 * 60 * 60 * 1000,
      year: 5 * 365 * 24 * 60 * 60 * 1000,
    };
    const fromDate = new Date(toDate.getTime() - spanMs[group]);
    return { fromDate, toDate };
  }

  async salesByPeriod(from: string | undefined, to: string | undefined, group: GroupBy = 'day') {
    const { fromDate, toDate } = this.defaultRange(from, to, group);
    const sales = await this.prisma.sale.findMany({
      where: { fecha: { gte: fromDate, lte: toDate } },
      select: { fecha: true, total: true, subtotal: true, impuestos: true },
    });

    const buckets = new Map<string, PeriodBucket>();
    for (const sale of sales) {
      const key = bucketKey(sale.fecha, group);
      const entry = buckets.get(key) ?? { periodo: key, ventas: 0, subtotal: 0, impuestos: 0, total: 0 };
      entry.ventas += 1;
      entry.subtotal += Number(sale.subtotal);
      entry.impuestos += Number(sale.impuestos);
      entry.total += Number(sale.total);
      buckets.set(key, entry);
    }

    return Array.from(buckets.values())
      .map((b) => ({ ...b, subtotal: round(b.subtotal), impuestos: round(b.impuestos), total: round(b.total) }))
      .sort((a, b) => a.periodo.localeCompare(b.periodo));
  }

  async clientDebts() {
    const debts = await this.prisma.clientDebt.findMany({
      where: { status: { not: EstadoDeuda.PAGADA } },
      include: { client: { select: { id: true, nombre: true, telefono: true } } },
      orderBy: { dueDate: 'asc' },
    });

    return debts.map((d) => ({
      id: d.id,
      cliente: d.client.nombre,
      telefono: d.client.telefono,
      montoTotal: Number(d.amountTotal),
      montoPagado: Number(d.amountPaid),
      saldo: round(Number(d.amountTotal) - Number(d.amountPaid)),
      vencimiento: d.dueDate,
      status: d.status,
    }));
  }

  async expensesByCategory(from?: string, to?: string) {
    const { fromDate, toDate } = this.defaultRange(from, to);
    const expenses = await this.prisma.expense.findMany({
      where: { fecha: { gte: fromDate, lte: toDate } },
      select: { categoria: true, monto: true },
    });

    const byCategory = new Map<string, number>();
    let total = 0;
    for (const expense of expenses) {
      const monto = Number(expense.monto);
      byCategory.set(expense.categoria, (byCategory.get(expense.categoria) ?? 0) + monto);
      total += monto;
    }

    return {
      total: round(total),
      categorias: Array.from(byCategory.entries()).map(([categoria, monto]) => ({
        categoria,
        monto: round(monto),
      })),
    };
  }

  async cashflow(from?: string, to?: string) {
    const { fromDate, toDate } = this.defaultRange(from, to);
    const [ventas, gastos] = await Promise.all([
      this.prisma.sale.aggregate({
        where: { fecha: { gte: fromDate, lte: toDate } },
        _sum: { total: true },
      }),
      this.prisma.expense.aggregate({
        where: { fecha: { gte: fromDate, lte: toDate } },
        _sum: { monto: true },
      }),
    ]);

    const ingresos = Number(ventas._sum.total ?? 0);
    const egresos = Number(gastos._sum.monto ?? 0);
    return { ingresos: round(ingresos), egresos: round(egresos), neto: round(ingresos - egresos) };
  }

  /** Resumen usado por el Dashboard: ventas de hoy, deudas totales y gastos recientes. */
  async dashboardSummary() {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const [ventasHoy, deudas, gastosRecientes, gastosMes] = await Promise.all([
      this.prisma.sale.aggregate({ where: { fecha: { gte: startOfDay } }, _sum: { total: true }, _count: true }),
      this.prisma.clientDebt.aggregate({
        where: { status: { not: EstadoDeuda.PAGADA } },
        _sum: { amountTotal: true, amountPaid: true },
      }),
      this.prisma.expense.findMany({ orderBy: { fecha: 'desc' }, take: 5 }),
      this.prisma.expense.aggregate({
        where: { fecha: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } },
        _sum: { monto: true },
      }),
    ]);

    const deudaTotal = Number(deudas._sum.amountTotal ?? 0) - Number(deudas._sum.amountPaid ?? 0);

    return {
      ventasHoy: { total: round(Number(ventasHoy._sum.total ?? 0)), cantidad: ventasHoy._count },
      deudaTotalPendiente: round(deudaTotal),
      gastosDelMes: round(Number(gastosMes._sum.monto ?? 0)),
      gastosRecientes,
    };
  }

  toCsv(rows: Record<string, unknown>[]): string {
    if (rows.length === 0) return '';
    const headers = Object.keys(rows[0]);
    const escape = (value: unknown) => {
      const str = String(value ?? '');
      return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
    };
    const lines = [headers.join(','), ...rows.map((row) => headers.map((h) => escape(row[h])).join(','))];
    return lines.join('\n');
  }
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

function bucketKey(date: Date, group: GroupBy): string {
  const d = new Date(date);
  if (group === 'day') {
    return d.toISOString().slice(0, 10);
  }
  if (group === 'year') {
    return String(d.getUTCFullYear());
  }
  if (group === 'month') {
    return d.toISOString().slice(0, 7);
  }
  // week: YYYY-Www (semana ISO)
  const target = new Date(d.valueOf());
  const dayNr = (d.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNr + 3);
  const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
  const week = 1 + Math.round(((target.getTime() - firstThursday.getTime()) / 86400000 - 3) / 7);
  return `${target.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}
