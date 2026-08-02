import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  AlertCircle,
  Wallet,
  ShoppingBag,
  Package,
  AlertTriangle,
  CalendarClock,
  ChevronRight,
} from 'lucide-react';
import { api } from '../lib/api';
import { formatMoney, formatDate, ESTADO_PEDIDO_LABEL } from '../lib/format';
import { Card, PageHeader, Badge } from '../components/ui';
import type { DashboardSummary, OrdersSummary } from '../types';

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

/**
 * Bloque de pedidos por entregar.
 *
 * Va ARRIBA de los KPIs y no abajo a proposito: son compromisos con clientes
 * que esperan algo, y a diferencia de las cifras del dia, si se pasan por alto
 * hay alguien esperando. Cuando hay atrasados el bloque se pinta en rojo para
 * que salte a la vista sin tener que leerlo.
 */
function PedidosDestacados() {
  const { data } = useQuery<OrdersSummary>({
    queryKey: ['orders', 'summary'],
    queryFn: async () => (await api.get('/orders/summary')).data,
    refetchInterval: 60_000,
  });

  // Sin pedidos vivos no se muestra nada: un bloque vacio permanente solo
  // gasta espacio y entrena al ojo a ignorar esa zona.
  if (!data || data.total === 0) return null;

  const hayAtrasados = data.atrasados > 0;

  return (
    <Card className={`mb-6 p-5 ${hayAtrasados ? 'border-brick-500 bg-brick-100/40' : ''}`}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-ink">
          {hayAtrasados ? (
            <AlertTriangle size={16} className="text-brick-600" />
          ) : (
            <Package size={16} className="text-copper-600" />
          )}
          Pedidos por entregar
        </h2>
        <Link
          to="/pedidos"
          className="flex items-center gap-1 text-xs font-semibold text-copper-600 hover:text-copper-700"
        >
          Ver todos <ChevronRight size={14} />
        </Link>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {data.atrasados > 0 && (
          <Badge tone="brick">
            <AlertTriangle size={11} className="mr-1" />
            {data.atrasados} atrasado{data.atrasados === 1 ? '' : 's'}
          </Badge>
        )}
        {data.paraHoy > 0 && (
          <Badge tone="copper">
            <CalendarClock size={11} className="mr-1" />
            {data.paraHoy} para hoy
          </Badge>
        )}
        <Badge tone="neutral">{data.pendientes} pendiente{data.pendientes === 1 ? '' : 's'}</Badge>
        <Badge tone="sage">{data.empacados} empacado{data.empacados === 1 ? '' : 's'}</Badge>
      </div>

      <div className="divide-y divide-porcelain-200">
        {data.proximos.map((order) => (
          <div key={order.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
            <div className="min-w-0">
              <p className="truncate font-medium text-ink">
                {order.sale?.client?.nombre ?? 'Consumidor final'}
              </p>
              <p className="truncate text-xs text-muted">
                {order.sale?.items.map((i) => `${i.cantidad} x ${i.descripcion}`).join(', ')}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <Badge
                tone={
                  order.urgencia === 'ATRASADO' ? 'brick' : order.urgencia === 'HOY' ? 'copper' : 'neutral'
                }
              >
                {order.fechaEntrega ? formatDate(order.fechaEntrega) : 'Sin fecha'}
              </Badge>
              <p className="mt-0.5 text-[11px] text-muted">{ESTADO_PEDIDO_LABEL[order.estado]}</p>
            </div>
          </div>
        ))}
      </div>
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

      <PedidosDestacados />

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
