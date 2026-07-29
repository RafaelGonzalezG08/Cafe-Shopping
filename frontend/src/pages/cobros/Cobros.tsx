import { useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { X, Banknote, ImageOff, MessageCircle, Loader2 } from 'lucide-react';
import { api, apiUrl } from '../../lib/api';
import { formatMoney, formatDate, formatDateTime, ESTADO_DEUDA_LABEL, METODO_PAGO_LABEL } from '../../lib/format';
import { Button, Card, PageHeader, Badge, EmptyState } from '../../components/ui';
import type { ClientDebt, EstadoDeuda, MetodoPago, Sale } from '../../types';

const ESTADO_TONE: Record<EstadoDeuda, 'neutral' | 'copper' | 'sage' | 'brick' | 'rose'> = {
  PENDIENTE: 'neutral',
  PARCIAL: 'rose',
  PAGADA: 'sage',
  VENCIDA: 'brick',
};

const FILTERS: { value: EstadoDeuda | ''; label: string }[] = [
  { value: '', label: 'Con saldo pendiente' },
  { value: 'PENDIENTE', label: 'Pendientes' },
  { value: 'PARCIAL', label: 'Con abonos' },
  { value: 'VENCIDA', label: 'Vencidas' },
  { value: 'PAGADA', label: 'Saldadas' },
];

export default function Cobros() {
  const [status, setStatus] = useState<EstadoDeuda | ''>('');
  const [selected, setSelected] = useState<ClientDebt | null>(null);

  const { data: debts = [], isLoading } = useQuery<ClientDebt[]>({
    queryKey: ['client-debts', status],
    queryFn: async () => (await api.get('/client-debts', { params: { status: status || undefined } })).data,
  });

  const totalPendiente = debts.reduce(
    (sum, d) => sum + (Number(d.amountTotal ?? 0) - Number(d.amountPaid ?? 0)),
    0,
  );

  return (
    <div>
      <PageHeader
        title="Cobros"
        subtitle="Clientes que le deben al negocio, con su factura y abonos"
        action={
          totalPendiente > 0 ? (
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Total por cobrar</p>
              <p className="font-display text-xl font-bold text-brick-600">RD$ {formatMoney(totalPendiente)}</p>
            </div>
          ) : undefined
        }
      />

      <div className="mb-4 flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setStatus(f.value)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              status === f.value
                ? 'bg-copper-500 text-white'
                : 'bg-porcelain-200 text-muted hover:bg-porcelain-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <Card className="h-40 animate-pulse" />
      ) : debts.length === 0 ? (
        <EmptyState title="Sin cuentas en esta vista" description="No hay clientes con saldo en este filtro." />
      ) : (
        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-porcelain-100 text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-2.5">Cliente</th>
                <th className="px-4 py-2.5">Factura</th>
                <th className="px-4 py-2.5">Vence</th>
                <th className="px-4 py-2.5 text-right">Total</th>
                <th className="px-4 py-2.5 text-right">Abonado</th>
                <th className="px-4 py-2.5 text-right">Saldo</th>
                <th className="px-4 py-2.5">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-porcelain-200">
              {debts.map((debt) => {
                const total = Number(debt.amountTotal ?? 0);
                const pagado = Number(debt.amountPaid ?? 0);
                const saldo = Math.max(0, total - pagado);
                return (
                  <tr
                    key={debt.id}
                    onClick={() => setSelected(debt)}
                    className="cursor-pointer hover:bg-porcelain-100"
                  >
                    <td className="px-4 py-2.5">
                      <p className="font-medium text-ink">{debt.client?.nombre ?? 'Cliente'}</p>
                      {debt.client?.telefono && <p className="text-xs text-muted">{debt.client.telefono}</p>}
                    </td>
                    <td className="px-4 py-2.5 text-muted">{debt.sale?.invoice?.numero ?? '-'}</td>
                    <td className="px-4 py-2.5 text-muted">{debt.dueDate ? formatDate(debt.dueDate) : '-'}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-ink">RD$ {formatMoney(total)}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-sage-600">RD$ {formatMoney(pagado)}</td>
                    <td className="px-4 py-2.5 text-right font-display font-semibold tabular-nums text-ink">
                      RD$ {formatMoney(saldo)}
                    </td>
                    <td className="px-4 py-2.5">
                      <Badge tone={ESTADO_TONE[debt.status]}>{ESTADO_DEUDA_LABEL[debt.status]}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}

      {selected && <DebtDetailModal debt={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function ReminderButton({ debt, className }: { debt: ClientDebt; className: string }) {
  const queryClient = useQueryClient();

  const sendReminder = useMutation({
    mutationFn: async () => (await api.post(`/client-debts/${debt.id}/remind`)).data,
    onSuccess: () => {
      toast.success('Recordatorio enviado por WhatsApp.');
      queryClient.invalidateQueries({ queryKey: ['client-debts'] });
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message ?? 'No se pudo enviar el recordatorio por WhatsApp.';
      toast.error(Array.isArray(msg) ? msg.join(' ') : msg);
    },
  });

  return (
    <div className={className}>
      <button
        onClick={() => sendReminder.mutate()}
        disabled={sendReminder.isPending}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-sage-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sage-600 disabled:cursor-not-allowed disabled:bg-porcelain-300 disabled:text-muted"
      >
        {sendReminder.isPending ? <Loader2 size={16} className="animate-spin" /> : <MessageCircle size={16} />}
        {sendReminder.isPending ? 'Enviando...' : 'Recordatorio por WhatsApp'}
      </button>
    </div>
  );
}

function DebtDetailModal({ debt, onClose }: { debt: ClientDebt; onClose: () => void }) {
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState('');
  const [metodo, setMetodo] = useState<MetodoPago>('EFECTIVO');
  const [imgRefreshKey, setImgRefreshKey] = useState(0);
  const saleId = debt.sale?.id;

  const { data: sale, isLoading } = useQuery<Sale>({
    queryKey: ['sale', saleId],
    queryFn: async () => (await api.get(`/sales/${saleId}`)).data,
    enabled: Boolean(saleId),
  });

  const total = Number(debt.amountTotal ?? 0);
  const pagado = Number(debt.amountPaid ?? 0);
  const saldo = Math.max(0, total - pagado);

  const registerPayment = useMutation({
    mutationFn: async () =>
      (await api.post(`/client-debts/${debt.id}/payments`, { amount: Number(amount), metodo })).data,
    onSuccess: () => {
      toast.success('Abono registrado. La factura se actualizo con el nuevo saldo.');
      queryClient.invalidateQueries({ queryKey: ['client-debts'] });
      queryClient.invalidateQueries({ queryKey: ['sale', saleId] });
      setAmount('');
      setImgRefreshKey((k) => k + 1);
    },
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const value = Number(amount);
    if (!value || value <= 0) {
      toast.error('Ingresa un monto valido.');
      return;
    }
    if (value > saldo + 0.01) {
      toast.error(`El abono no puede superar el saldo pendiente (RD$ ${formatMoney(saldo)}).`);
      return;
    }
    registerPayment.mutate();
  }

  const pngUrlBase = sale?.invoice?.pngUrl
    ? sale.invoice.pngUrl.startsWith('http')
      ? sale.invoice.pngUrl
      : apiUrl(sale.invoice.pngUrl)
    : null;
  const pngUrl = pngUrlBase ? `${pngUrlBase}?v=${imgRefreshKey}` : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-espresso-950/50 p-4">
      <Card className="grid max-h-[85vh] w-full max-w-3xl grid-cols-1 overflow-hidden md:grid-cols-2">
        <div className="flex max-h-[85vh] flex-col overflow-y-auto border-b border-porcelain-200 p-5 md:border-b-0 md:border-r">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-ink">{debt.client?.nombre ?? 'Cliente'}</h2>
              {debt.client?.telefono && <p className="text-xs text-muted">{debt.client.telefono}</p>}
            </div>
            <button onClick={onClose} className="rounded p-1 text-muted hover:bg-porcelain-200 md:hidden">
              <X size={18} />
            </button>
          </div>

          <div className="mb-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-porcelain-100 p-2.5">
              <p className="text-[10px] uppercase tracking-wide text-muted">Total</p>
              <p className="font-display font-bold tabular-nums text-ink">RD$ {formatMoney(total)}</p>
            </div>
            <div className="rounded-lg bg-sage-100 p-2.5">
              <p className="text-[10px] uppercase tracking-wide text-sage-700">Abonado</p>
              <p className="font-display font-bold tabular-nums text-sage-700">RD$ {formatMoney(pagado)}</p>
            </div>
            <div className="rounded-lg bg-brick-100 p-2.5">
              <p className="text-[10px] uppercase tracking-wide text-brick-700">Saldo</p>
              <p className="font-display font-bold tabular-nums text-brick-700">RD$ {formatMoney(saldo)}</p>
            </div>
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Productos de la factura</p>
          {isLoading ? (
            <div className="h-24 animate-pulse rounded-lg bg-porcelain-100" />
          ) : (
            <div className="mb-4 divide-y divide-porcelain-200 rounded-lg border border-porcelain-200">
              {sale?.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between px-3 py-2 text-sm">
                  <div>
                    <p className="text-ink">{item.descripcion}</p>
                    <p className="text-xs text-muted">
                      {item.cantidad} x RD$ {formatMoney(item.precioUnitario)}
                    </p>
                  </div>
                  <p className="font-display font-semibold tabular-nums text-ink">RD$ {formatMoney(item.total)}</p>
                </div>
              ))}
            </div>
          )}

          {saldo > 0.01 ? (
            <form onSubmit={handleSubmit} className="mt-auto space-y-2.5 rounded-lg bg-porcelain-100 p-3.5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Registrar abono</p>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={`Max. ${formatMoney(saldo)}`}
                  className="flex-1 rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
                />
                <select
                  value={metodo}
                  onChange={(e) => setMetodo(e.target.value as MetodoPago)}
                  className="rounded-lg border border-porcelain-300 px-2 text-sm outline-none focus:border-copper-500"
                >
                  {(['EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'OTRO'] as MetodoPago[]).map((m) => (
                    <option key={m} value={m}>
                      {METODO_PAGO_LABEL[m]}
                    </option>
                  ))}
                </select>
              </div>
              <Button type="submit" className="w-full" disabled={registerPayment.isPending}>
                <Banknote size={16} />
                {registerPayment.isPending ? 'Registrando...' : 'Registrar abono'}
              </Button>
            </form>
          ) : (
            <div className="mt-auto rounded-lg bg-sage-100 p-3 text-center text-sm font-semibold text-sage-700">
              Cuenta saldada
            </div>
          )}

          {saldo > 0.01 && (
            <div className="mt-2.5 md:hidden">
              <ReminderButton debt={debt} className="" />
            </div>
          )}
        </div>

        <div className="hidden max-h-[85vh] flex-col overflow-y-auto bg-porcelain-100 p-5 md:flex">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Factura</p>
            <button onClick={onClose} className="rounded p-1 text-muted hover:bg-porcelain-200">
              <X size={18} />
            </button>
          </div>
          {sale?.fecha && <p className="mb-2 text-xs text-muted">{formatDateTime(sale.fecha)}</p>}
          <div className="flex flex-1 items-center justify-center">
            {pngUrl ? (
              <img src={pngUrl} alt="Factura" className="max-h-[70vh] rounded-lg border border-porcelain-300 shadow-ticket" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted">
                <ImageOff size={28} />
                <p className="text-xs">Factura aun no generada.</p>
              </div>
            )}
          </div>
          {saldo > 0.01 && <ReminderButton debt={debt} className="mt-3" />}
        </div>
      </Card>
    </div>
  );
}
