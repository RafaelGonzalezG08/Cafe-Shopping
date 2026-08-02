import { useQuery } from '@tanstack/react-query';
import { Gem } from 'lucide-react';
import { api } from '../../lib/api';
import { usePersistedState } from '../../lib/usePersistedState';
import { formatMoney } from '../../lib/format';
import { Card, PageHeader, Badge, EmptyState } from '../../components/ui';
import type { CostsReport } from '../../types';

export default function Costs() {
  // Igual que en Reportes: el periodo consultado se recuerda al navegar.
  const [from, setFrom] = usePersistedState('costos:desde', '');
  const [to, setTo] = usePersistedState('costos:hasta', '');
  const params = { from: from || undefined, to: to || undefined };

  const { data, isLoading } = useQuery<CostsReport>({
    queryKey: ['reports', 'costs', from, to],
    queryFn: async () => (await api.get('/reports/costs', { params })).data,
  });

  const totales = data?.totales;
  const productos = data?.productos ?? [];

  return (
    <div>
      <PageHeader
        title="Costos"
        subtitle="Costo, utilidad y margen por pieza vendida - visible solo para administradores"
      />

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="rounded-lg border border-porcelain-300 px-2.5 py-1.5 text-sm outline-none focus:border-copper-500"
        />
        <span className="text-sm text-muted">a</span>
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="rounded-lg border border-porcelain-300 px-2.5 py-1.5 text-sm outline-none focus:border-copper-500"
        />
      </div>
      <p className="mb-5 -mt-3 text-xs text-muted">
        {from || to ? 'Usando el rango de fechas de arriba.' : 'Mostrando los ultimos 30 dias.'}
      </p>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card className="p-4">
          <p className="text-xs font-medium uppercase text-muted">Ingresos</p>
          <p className="mt-1 font-display text-xl font-bold tabular-nums text-ink">
            RD$ {formatMoney(totales?.ingresos ?? 0)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium uppercase text-muted">Costo</p>
          <p className="mt-1 font-display text-xl font-bold tabular-nums text-brick-500">
            RD$ {formatMoney(totales?.costo ?? 0)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium uppercase text-muted">Utilidad</p>
          <p className="mt-1 font-display text-xl font-bold tabular-nums text-sage-600">
            RD$ {formatMoney(totales?.utilidad ?? 0)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium uppercase text-muted">Margen</p>
          <p className="mt-1 font-display text-xl font-bold tabular-nums text-copper-600">
            {(totales?.margenPct ?? 0).toFixed(1)}%
          </p>
        </Card>
      </div>

      <Card className="p-4">
        <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-muted">
          Margen por producto
        </h2>
        {isLoading ? (
          <div className="h-40 animate-pulse rounded-lg bg-porcelain-200" />
        ) : productos.length === 0 ? (
          <EmptyState
            title="Sin ventas en este rango"
            description="El margen se calcula sobre piezas vendidas; asigna un costo a tus productos en Productos para verlo aqui."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-porcelain-200 text-xs uppercase text-muted">
                  <th className="py-2 pr-3 font-semibold">Producto</th>
                  <th className="py-2 pr-3 font-semibold">Unidades</th>
                  <th className="py-2 pr-3 font-semibold">Ingresos</th>
                  <th className="py-2 pr-3 font-semibold">Costo</th>
                  <th className="py-2 pr-3 font-semibold">Utilidad</th>
                  <th className="py-2 pr-3 font-semibold">Margen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-porcelain-200">
                {productos.map((p) => (
                  <tr key={p.productId ?? p.nombre}>
                    <td className="py-2.5 pr-3">
                      <div className="flex items-center gap-2">
                        <Gem size={14} className="shrink-0 text-copper-500" />
                        <div className="min-w-0">
                          <p className="truncate text-ink">{p.nombre}</p>
                          {p.sku && <p className="font-mono text-[11px] text-muted">{p.sku}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 pr-3 tabular-nums text-ink">{p.unidades}</td>
                    <td className="py-2.5 pr-3 tabular-nums text-ink">RD$ {formatMoney(p.ingresos)}</td>
                    <td className="py-2.5 pr-3 tabular-nums text-muted">RD$ {formatMoney(p.costo)}</td>
                    <td className="py-2.5 pr-3 tabular-nums font-semibold text-sage-600">
                      RD$ {formatMoney(p.utilidad)}
                    </td>
                    <td className="py-2.5 pr-3">
                      <Badge tone={p.margenPct < 20 ? 'brick' : p.margenPct < 40 ? 'copper' : 'sage'}>
                        {p.margenPct.toFixed(1)}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
