import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Download, Search, ArrowDownCircle, ArrowUpCircle, Scale } from 'lucide-react';
import { api } from '../../lib/api';
import { usePersistedState } from '../../lib/usePersistedState';
import { formatMoney, formatDateTime, METODO_PAGO_LABEL, ESTADO_FACTURA_LABEL } from '../../lib/format';
import { Card, PageHeader, Badge, EmptyState, Select } from '../../components/ui';
import type { MetodoPago, TipoTransaccion, TransaccionesResponse } from '../../types';

const TIPOS: { value: TipoTransaccion; label: string; tone: 'copper' | 'sage' | 'brick' }[] = [
  { value: 'VENTA', label: 'Ventas', tone: 'copper' },
  { value: 'ABONO', label: 'Abonos', tone: 'sage' },
  { value: 'GASTO', label: 'Gastos', tone: 'brick' },
];

const TONE_BY_TIPO: Record<TipoTransaccion, 'copper' | 'sage' | 'brick'> = {
  VENTA: 'copper',
  ABONO: 'sage',
  GASTO: 'brick',
};

const METODOS: MetodoPago[] = ['EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'CREDITO', 'OTRO'];

function isoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

type PresetId = 'hoy' | '7d' | '30d' | 'mes' | 'todo';

function rangoDePreset(preset: PresetId): { from: string; to: string } {
  const hoy = new Date();
  const to = isoDate(hoy);
  switch (preset) {
    case 'hoy':
      return { from: to, to };
    case '7d':
      return { from: isoDate(new Date(hoy.getTime() - 6 * 86400000)), to };
    case '30d':
      return { from: isoDate(new Date(hoy.getTime() - 29 * 86400000)), to };
    case 'mes':
      return { from: isoDate(new Date(hoy.getFullYear(), hoy.getMonth(), 1)), to };
    case 'todo':
      // El negocio no tiene ventas antes de esta fecha; sirve como "sin limite".
      return { from: '2000-01-01', to };
  }
}

const PRESETS: { id: PresetId; label: string }[] = [
  { id: 'hoy', label: 'Hoy' },
  { id: '7d', label: '7 dias' },
  { id: '30d', label: '30 dias' },
  { id: 'mes', label: 'Este mes' },
  { id: 'todo', label: 'Todo' },
];

export default function Transactions() {
  const [from, setFrom] = usePersistedState('transacciones:desde', rangoDePreset('30d').from);
  const [to, setTo] = usePersistedState('transacciones:hasta', rangoDePreset('30d').to);
  const [preset, setPreset] = usePersistedState<PresetId | ''>('transacciones:preset', '30d');
  const [tipos, setTipos] = usePersistedState<TipoTransaccion[]>('transacciones:tipos', []);
  const [metodoPago, setMetodoPago] = usePersistedState<MetodoPago | ''>('transacciones:metodo', '');
  const [q, setQ] = useState('');

  function aplicarPreset(id: PresetId) {
    const r = rangoDePreset(id);
    setFrom(r.from);
    setTo(r.to);
    setPreset(id);
  }

  function toggleTipo(t: TipoTransaccion) {
    setTipos((prev) => {
      const next = prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t];
      // Vacio y "los tres marcados" significan lo mismo (sin filtro): se
      // guarda vacio para que los tres chips se vean seleccionados otra vez.
      return next.length === 0 || next.length === TIPOS.length ? [] : next;
    });
  }

  const params = useMemo(
    () => ({
      from: from || undefined,
      to: to || undefined,
      tipo: tipos.length > 0 ? tipos.join(',') : undefined,
      metodoPago: metodoPago || undefined,
      q: q.trim() || undefined,
    }),
    [from, to, tipos, metodoPago, q],
  );

  const { data, isLoading } = useQuery<TransaccionesResponse>({
    queryKey: ['reports', 'transactions', params],
    queryFn: async () => (await api.get('/reports/transactions', { params })).data,
  });

  const items = data?.items ?? [];

  async function exportarCsv() {
    const response = await api.get('/reports/transactions/export', { params, responseType: 'blob' });
    const url = URL.createObjectURL(response.data as Blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'transacciones.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <PageHeader
        title="Transacciones"
        subtitle="Ventas, abonos y gastos en un solo lugar, del mas reciente al mas viejo"
        action={
          <button
            onClick={exportarCsv}
            className="flex items-center gap-1.5 rounded-lg bg-porcelain-200 px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:bg-porcelain-300"
          >
            <Download size={14} /> Exportar CSV
          </button>
        }
      />

      {/* Resumen del periodo filtrado */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card className="flex items-center gap-3 p-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sage-100 text-sage-600">
            <ArrowUpCircle size={18} />
          </span>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted">Ingresos</p>
            <p className="font-display text-lg font-bold tabular-nums text-sage-600">
              RD$ {formatMoney(data?.totales.ingresos ?? 0)}
            </p>
          </div>
        </Card>
        <Card className="flex items-center gap-3 p-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brick-100 text-brick-600">
            <ArrowDownCircle size={18} />
          </span>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted">Egresos</p>
            <p className="font-display text-lg font-bold tabular-nums text-brick-600">
              RD$ {formatMoney(data?.totales.egresos ?? 0)}
            </p>
          </div>
        </Card>
        <Card className="flex items-center gap-3 p-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-copper-100 text-copper-700">
            <Scale size={18} />
          </span>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted">Neto</p>
            <p className="font-display text-lg font-bold tabular-nums text-ink">
              RD$ {formatMoney(data?.totales.neto ?? 0)}
            </p>
          </div>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="mb-5 space-y-3 p-4">
        <div className="flex flex-wrap items-center gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => aplicarPreset(p.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                preset === p.id ? 'bg-copper-500 text-white' : 'bg-porcelain-200 text-muted hover:bg-porcelain-300'
              }`}
            >
              {p.label}
            </button>
          ))}
          <span className="mx-1 h-5 w-px bg-porcelain-300" />
          <input
            type="date"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setPreset('');
            }}
            className="rounded-lg border border-porcelain-300 px-2.5 py-1.5 text-sm outline-none focus:border-copper-500"
          />
          <span className="text-sm text-muted">a</span>
          <input
            type="date"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setPreset('');
            }}
            className="rounded-lg border border-porcelain-300 px-2.5 py-1.5 text-sm outline-none focus:border-copper-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {TIPOS.map((t) => (
            <button
              key={t.value}
              onClick={() => toggleTipo(t.value)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                tipos.length === 0 || tipos.includes(t.value)
                  ? 'border-transparent bg-copper-100 text-copper-700'
                  : 'border-porcelain-300 text-muted hover:border-copper-400'
              }`}
            >
              {t.label}
            </button>
          ))}

          <Select
            value={metodoPago}
            onChange={(v) => setMetodoPago(v as MetodoPago | '')}
            className="w-44 shrink-0"
            size="sm"
            options={[
              { value: '', label: 'Todos los metodos' },
              ...METODOS.map((m) => ({ value: m, label: METODO_PAGO_LABEL[m] })),
            ]}
          />

          <div className="ml-auto flex min-w-[200px] flex-1 items-center gap-2 rounded-lg border border-porcelain-300 px-2.5 py-1.5 sm:max-w-xs">
            <Search size={14} className="shrink-0 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cliente, factura, cajero..."
              className="w-full min-w-0 text-sm outline-none"
            />
          </div>
        </div>
      </Card>

      {isLoading ? (
        <Card className="h-40 animate-pulse" />
      ) : items.length === 0 ? (
        <EmptyState
          title="Sin transacciones en este filtro"
          description="Ajusta el rango de fechas o los filtros de arriba."
        />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-porcelain-100 text-left text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-4 py-2.5">Fecha</th>
                  <th className="px-4 py-2.5">Tipo</th>
                  <th className="px-4 py-2.5">Detalle</th>
                  <th className="px-4 py-2.5">Cliente</th>
                  <th className="px-4 py-2.5">Usuario</th>
                  <th className="px-4 py-2.5">Metodo</th>
                  <th className="px-4 py-2.5 text-right">Monto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-porcelain-200">
                {items.map((t) => (
                  <tr key={t.id} className="hover:bg-porcelain-100">
                    <td className="whitespace-nowrap px-4 py-2.5 text-muted">{formatDateTime(t.fecha)}</td>
                    <td className="px-4 py-2.5">
                      <Badge tone={TONE_BY_TIPO[t.tipo]}>{TIPOS.find((x) => x.value === t.tipo)?.label}</Badge>
                    </td>
                    <td className="px-4 py-2.5">
                      <p className="text-ink">{t.descripcion}</p>
                      <p className="text-xs text-muted">
                        {t.referencia ?? '-'}
                        {t.estado && ` · ${ESTADO_FACTURA_LABEL[t.estado]}`}
                      </p>
                    </td>
                    <td className="px-4 py-2.5 text-ink">{t.cliente ?? '-'}</td>
                    <td className="px-4 py-2.5 text-muted">{t.usuario ?? '-'}</td>
                    <td className="px-4 py-2.5 text-muted">
                      {t.metodoPago ? METODO_PAGO_LABEL[t.metodoPago] : '-'}
                    </td>
                    <td
                      className={`whitespace-nowrap px-4 py-2.5 text-right font-display font-semibold tabular-nums ${
                        t.signo === 'INGRESO' ? 'text-sage-600' : 'text-brick-600'
                      }`}
                    >
                      {t.signo === 'INGRESO' ? '+' : '-'} RD$ {formatMoney(t.monto)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t border-porcelain-200 px-4 py-2.5 text-xs text-muted">
            {items.length} transaccion{items.length === 1 ? '' : 'es'} en este filtro.
          </p>
        </Card>
      )}
    </div>
  );
}
