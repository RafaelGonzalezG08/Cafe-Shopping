import { useQuery } from '@tanstack/react-query';
import { DollarSign, AlertCircle, Wallet, ShoppingBag } from 'lucide-react';
import { api } from '../lib/api';
import { formatMoney, formatDate } from '../lib/format';
import { Card, PageHeader } from '../components/ui';
import type { DashboardSummary } from '../types';

function KpiCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  icon: typeof DollarSign;
  tone: 'copper' | 'brick' | 'sage' | 'rose';
}) {
  const toneStyles = {
    copper: 'bg-copper-100 text-copper-700',
    brick: 'bg-brick-100 text-brick-600',
    sage: 'bg-sage-100 text-sage-600',
    rose: 'bg-rose-100 text-rose-600',
  }[tone];

  return (
    <Card className="p-5">
      <div className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg ${toneStyles}`}>
        <Icon size={18} />
      </div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold tabular-nums text-ink">{value}</p>
    </Card>
  );
}

export default function Dashboard() {
  const { data, isLoading } = useQuery<DashboardSummary>({
    queryKey: ['dashboard'],
    queryFn: async () => (await api.get('/reports/dashboard')).data,
    refetchInterval: 60_000,
  });

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Resumen del negocio en tiempo real" />

      {isLoading || !data ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="h-28 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              label="Ventas de hoy"
              value={`RD$ ${formatMoney(data.ventasHoy.total)}`}
              icon={DollarSign}
              tone="copper"
            />
            <KpiCard
              label="Transacciones hoy"
              value={String(data.ventasHoy.cantidad)}
              icon={ShoppingBag}
              tone="rose"
            />
            <KpiCard
              label="Deuda pendiente"
              value={`RD$ ${formatMoney(data.deudaTotalPendiente)}`}
              icon={AlertCircle}
              tone="brick"
            />
            <KpiCard
              label="Gastos del mes"
              value={`RD$ ${formatMoney(data.gastosDelMes)}`}
              icon={Wallet}
              tone="copper"
            />
          </div>

          <Card className="mt-6 p-5">
            <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-muted">
              Gastos recientes
            </h2>
            {data.gastosRecientes.length === 0 ? (
              <p className="text-sm text-muted">Aun no hay gastos registrados.</p>
            ) : (
              <div className="divide-y divide-porcelain-200">
                {data.gastosRecientes.map((g) => (
                  <div key={g.id} className="flex items-center justify-between py-2.5 text-sm">
                    <div>
                      <p className="font-medium text-ink">{g.descripcion}</p>
                      <p className="text-xs text-muted">
                        {g.categoria} &middot; {formatDate(g.fecha)}
                      </p>
                    </div>
                    <p className="font-display font-semibold tabular-nums text-ink">
                      RD$ {formatMoney(g.monto)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
