import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Download } from 'lucide-react';
import { api } from '../../lib/api';
import { usePersistedState } from '../../lib/usePersistedState';
import { formatMoney, formatDate, ESTADO_DEUDA_LABEL } from '../../lib/format';
import { Button, Card, PageHeader, Badge, EmptyState } from '../../components/ui';
import type { ClientDebt } from '../../types';

interface SalesPeriod {
  periodo: string;
  ventas: number;
  subtotal: number;
  impuestos: number;
  total: number;
}

interface ExpensesReport {
  total: number;
  categorias: { categoria: string; monto: number }[];
}

interface Cashflow {
  ingresos: number;
  egresos: number;
  neto: number;
}

export default function Reports() {
  // Los filtros se recuerdan: al volver de revisar otra pantalla, el reporte
  // sigue en el mismo periodo en vez de resetearse a los ultimos 30 dias.
  const [group, setGroup] = usePersistedState<'day' | 'week' | 'month' | 'year'>('reportes:agrupar', 'day');
  const [from, setFrom] = usePersistedState('reportes:desde', '');
  const [to, setTo] = usePersistedState('reportes:hasta', '');

  const params = { from: from || undefined, to: to || undefined };

  const { data: salesReport = [] } = useQuery<SalesPeriod[]>({
    queryKey: ['reports', 'sales', group, from, to],
    queryFn: async () => (await api.get('/reports/sales', { params: { ...params, group } })).data,
  });

  const { data: debts = [] } = useQuery<ClientDebt[]>({
    queryKey: ['reports', 'debts'],
    queryFn: async () => (await api.get('/reports/clients/debts')).data,
  });

  const { data: expensesReport } = useQuery<ExpensesReport>({
    queryKey: ['reports', 'expenses', from, to],
    queryFn: async () => (await api.get('/reports/expenses', { params })).data,
  });

  const { data: cashflow } = useQuery<Cashflow>({
    queryKey: ['reports', 'cashflow', from, to],
    queryFn: async () => (await api.get('/reports/cashflow', { params })).data,
  });

  async function exportCsv() {
    const response = await api.get('/reports/sales/export', {
      params: { ...params, group },
      responseType: 'blob',
    });
    const url = URL.createObjectURL(response.data as Blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'reporte-ventas.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <PageHeader
        title="Reportes"
        subtitle="Ventas, deudas, gastos y flujo de caja"
        action={
          <Button variant="secondary" onClick={exportCsv}>
            <Download size={16} /> Exportar CSV
          </Button>
        }
      />

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-lg border border-porcelain-300 px-2.5 py-1.5 text-sm outline-none focus:border-copper-500" />
        <span className="text-sm text-muted">a</span>
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="rounded-lg border border-porcelain-300 px-2.5 py-1.5 text-sm outline-none focus:border-copper-500" />
        <div className="ml-2 flex gap-1">
          {(['day', 'week', 'month', 'year'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGroup(g)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                group === g ? 'bg-copper-500 text-white' : 'bg-porcelain-200 text-muted'
              }`}
            >
              {{ day: 'Dia', week: 'Semana', month: 'Mensual', year: 'Anual' }[g]}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-5 -mt-3 text-xs text-muted">
        {from || to
          ? 'Usando el rango de fechas de arriba.'
          : { day: 'Mostrando los ultimos 30 dias.', week: 'Mostrando las ultimas ~12 semanas.', month: 'Mostrando el ultimo año.', year: 'Mostrando los ultimos 5 años.' }[
              group
            ]}
      </p>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <p className="text-xs font-medium uppercase text-muted">Ingresos</p>
          <p className="mt-1 font-display text-xl font-bold tabular-nums text-sage-600">
            RD$ {formatMoney(cashflow?.ingresos ?? 0)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium uppercase text-muted">Egresos</p>
          <p className="mt-1 font-display text-xl font-bold tabular-nums text-brick-500">
            RD$ {formatMoney(cashflow?.egresos ?? 0)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium uppercase text-muted">Flujo neto</p>
          <p className="mt-1 font-display text-xl font-bold tabular-nums text-ink">
            RD$ {formatMoney(cashflow?.neto ?? 0)}
          </p>
        </Card>
      </div>

      <Card className="mb-6 p-4">
        <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-muted">
          Ventas por periodo
        </h2>
        {salesReport.length === 0 ? (
          <EmptyState title="Sin ventas en este rango" />
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesReport}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E6C7C9" />
                <XAxis dataKey="periodo" tick={{ fontSize: 11, fill: '#93767C' }} />
                <YAxis tick={{ fontSize: 11, fill: '#93767C' }} />
                <Tooltip
                  formatter={(value: number) => `RD$ ${formatMoney(value)}`}
                  contentStyle={{ borderRadius: 8, borderColor: '#E6C7C9', fontSize: 13 }}
                />
                <Bar dataKey="total" fill="#B75D66" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-4">
          <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-muted">
            Clientes con deudas
          </h2>
          {debts.length === 0 ? (
            <p className="text-sm text-muted">No hay deudas pendientes.</p>
          ) : (
            <div className="max-h-80 divide-y divide-porcelain-200 overflow-y-auto pr-1">
              {debts.map((d) => (
                <div key={d.id} className="flex items-center justify-between py-2 text-sm">
                  <div>
                    <p className="text-ink">{d.cliente}</p>
                    {d.vencimiento && <p className="text-xs text-muted">Vence: {formatDate(d.vencimiento)}</p>}
                  </div>
                  <div className="text-right">
                    <p className="font-display font-semibold tabular-nums text-ink">
                      RD$ {formatMoney(d.saldo ?? 0)}
                    </p>
                    <Badge tone={d.status === 'VENCIDA' ? 'brick' : 'copper'}>
                      {ESTADO_DEUDA_LABEL[d.status]}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-4">
          <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-muted">
            Gastos por categoria
          </h2>
          {!expensesReport || expensesReport.categorias.length === 0 ? (
            <p className="text-sm text-muted">Sin gastos en este rango.</p>
          ) : (
            <div className="max-h-80 divide-y divide-porcelain-200 overflow-y-auto pr-1">
              {expensesReport.categorias.map((c) => (
                <div key={c.categoria} className="flex items-center justify-between py-2 text-sm">
                  <span className="text-ink">{c.categoria}</span>
                  <span className="font-display font-semibold tabular-nums text-ink">
                    RD$ {formatMoney(c.monto)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
