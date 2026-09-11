import { useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { X, Banknote, MessageCircle, Loader2, Trash2 } from 'lucide-react';
import { api } from '../../lib/api';
import { formatMoney, formatDate, formatDateTime, ESTADO_DEUDA_LABEL, METODO_PAGO_LABEL } from '../../lib/format';
import { Button, Card, PageHeader, Badge, EmptyState, Select, ConfirmPasswordModal } from '../../components/ui';
import { FacturaImagen } from '../../components/FacturaImagen';
import { useAuthStore } from '../../store/auth.store';
import type { ClientDebt, EstadoDeuda, MetodoPago, Payment, Sale } from '../../types';

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
        <>
          {/* Celular: tarjetas. El detalle completo (abonos, factura) vive en DebtDetailModal. */}
          <div className="space-y-2 md:hidden">
            {debts.map((debt) => {
              const total = Number(debt.amountTotal ?? 0);
              const pagado = Number(debt.amountPaid ?? 0);
              const saldo = Math.max(0, total - pagado);
              return (
                <Card
                  key={debt.id}
                  className="cursor-pointer p-3.5 active:shadow-neu-pressed"
                  onClick={() => setSelected(debt)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-ink">{debt.client?.nombre ?? 'Cliente'}</p>
                      {debt.client?.telefono && <p className="text-xs text-muted">{debt.client.telefono}</p>}
                    </div>
                    <span className="shrink-0 font-display font-semibold tabular-nums text-ink">
                      RD$ {formatMoney(saldo)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <Badge tone={ESTADO_TONE[debt.status]}>{ESTADO_DEUDA_LABEL[debt.status]}</Badge>
                    <span className="text-xs text-muted">
                      {debt.dueDate ? `Vence ${formatDate(debt.dueDate)}` : 'Sin fecha de vencimiento'}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* PC: tabla, sin cambios. */}
          <Card className="hidden overflow-hidden md:block">
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
        </>
      )}

      {selected && <DebtDetailModal debt={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function ReminderButton({ debt, className }: { debt: ClientDebt; className: string }) {
  const queryClient = useQueryClient();

  const sendReminder = useMutation({
    mutationFn: async () =>
      (await api.post(`/client-debts/${debt.id}/remind`, undefined, { skipErrorToast: true })).data,
    onSuccess: () => {
      toast.success('Recordatorio en cola. Se enviará por WhatsApp en unos segundos.');
      queryClient.invalidateQueries({ queryKey: ['client-debts'] });
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message ?? 'No se pudo poner el recordatorio en cola.';
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
        {sendReminder.isPending ? 'Encolando...' : 'Recordatorio por WhatsApp'}
      </button>
    </div>
  );
}

function DebtDetailModal({ debt, onClose }: { debt: ClientDebt; onClose: () => void }) {
  const queryClient = useQueryClient();
  const role = useAuthStore((s) => s.user?.role);
  // Igual que en Transacciones: eliminar un abono es una correccion contable,
  // no una tarea de caja. El backend ya lo rechaza para CAJERO; esto solo
  // evita mostrarle un boton que le va a devolver un error 403.
  const puedeEliminarAbonos = role === 'ADMIN' || role === 'CONTABILIDAD';
  const [amount, setAmount] = useState('');
  const [metodo, setMetodo] = useState<MetodoPago>('EFECTIVO');
  const [imgRefreshKey, setImgRefreshKey] = useState(0);
  const [abonoAEliminar, setAbonoAEliminar] = useState<Payment | null>(null);
  const saleId = debt.sale?.id;

  const { data: sale, isLoading } = useQuery<Sale>({
    queryKey: ['sale', saleId],
    queryFn: async () => (await api.get(`/sales/${saleId}`)).data,
    enabled: Boolean(saleId),
  });

  // El total/abonado/saldo se calculan de `sale` (que se refresca al
  // registrar o eliminar un abono), no del `debt` que llego por prop: ese es
  // una foto fija del momento en que se abrio el modal y quedaria mostrando
  // numeros viejos despues de cualquiera de las dos acciones.
  const abonos = [...(sale?.payments ?? [])].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime(),
  );
  const total = sale ? Number(sale.total) : Number(debt.amountTotal ?? 0);
  const pagado = sale ? abonos.reduce((sum, p) => sum + Number(p.amount), 0) : Number(debt.amountPaid ?? 0);
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

  const deletePayment = useMutation({
    mutationFn: async (password: string) =>
      (
        await api.delete(`/client-debts/payments/${abonoAEliminar!.id}`, {
          data: { password },
          skipErrorToast: true,
        })
      ).data,
    onSuccess: () => {
      toast.success('Abono eliminado. El saldo de la cuenta se actualizo.');
      queryClient.invalidateQueries({ queryKey: ['client-debts'] });
      queryClient.invalidateQueries({ queryKey: ['sale', saleId] });
      setAbonoAEliminar(null);
      setImgRefreshKey((k) => k + 1);
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message ?? 'No se pudo eliminar el abono.';
      toast.error(Array.isArray(msg) ? msg.join(' ') : msg);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-espresso-950/50 p-4">
      <Card className="grid max-h-[85vh] w-full max-w-3xl grid-cols-1 overflow-hidden md:grid-cols-2">
        <div className="flex max-h-[85vh] min-w-0 flex-col overflow-y-auto overflow-x-hidden border-b border-porcelain-200 p-5 md:border-b-0 md:border-r">
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

          {abonos.length > 0 && (
            <>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Historial de abonos</p>
              <div className="mb-4 divide-y divide-porcelain-200 rounded-lg border border-porcelain-200">
                {abonos.map((p) => (
                  <div key={p.id} className="flex items-center justify-between px-3 py-2 text-sm">
                    <div>
                      <p className="text-ink">RD$ {formatMoney(p.amount)}</p>
                      <p className="text-xs text-muted">
                        {formatDateTime(p.fecha)} &middot; {METODO_PAGO_LABEL[p.metodo]}
                      </p>
                    </div>
                    {puedeEliminarAbonos && (
                      <button
                        onClick={() => setAbonoAEliminar(p)}
                        className="rounded p-1.5 text-muted hover:bg-brick-100 hover:text-brick-600"
                        title="Eliminar abono"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {saldo > 0.01 ? (
            <form onSubmit={handleSubmit} className="mt-auto space-y-2.5 rounded-lg bg-porcelain-100 p-3.5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Registrar abono</p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={`Max. ${formatMoney(saldo)}`}
                  className="min-w-0 flex-1 rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
                />
                <Select
                  value={metodo}
                  onChange={(v) => setMetodo(v as MetodoPago)}
                  options={(['EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'OTRO'] as MetodoPago[]).map((m) => ({
                    value: m,
                    label: METODO_PAGO_LABEL[m],
                  }))}
                  className="w-full shrink-0 sm:w-36"
                />
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
            <FacturaImagen
              pngUrl={sale?.invoice?.pngUrl}
              refreshKey={imgRefreshKey}
              className="max-h-[70vh] shadow-ticket"
            />
          </div>
          {saldo > 0.01 && <ReminderButton debt={debt} className="mt-3" />}
        </div>
      </Card>

      {abonoAEliminar && (
        <ConfirmPasswordModal
          titulo="Eliminar abono"
          mensaje={
            <>
              Se eliminara el abono de RD$ {formatMoney(abonoAEliminar.amount)} del{' '}
              {formatDateTime(abonoAEliminar.fecha)}. El saldo pendiente de la cuenta va a subir de nuevo.
            </>
          }
          pendiente={deletePayment.isPending}
          onConfirm={(password) => deletePayment.mutate(password)}
          onClose={() => setAbonoAEliminar(null)}
        />
      )}
    </div>
  );
}
