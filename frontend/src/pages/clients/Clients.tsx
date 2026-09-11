import { useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Plus, Search, Phone, Mail, X, Trash2, Loader2, Check, Download } from 'lucide-react';
import { api } from '../../lib/api';
import { usePersistedState, limpiarBorrador } from '../../lib/usePersistedState';
import { formatMoney, formatDate, ESTADO_DEUDA_LABEL, METODO_PAGO_LABEL } from '../../lib/format';
import { Button, Card, PageHeader, Badge, EmptyState } from '../../components/ui';
import { useAuthStore } from '../../store/auth.store';
import type { Client, MetodoPago } from '../../types';

export default function Clients() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const esAdmin = user?.role === 'ADMIN';
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  // Seleccion multiple: para borrar varios clientes sin historial de una
  // vez, en lugar de entrar a cada uno por separado.
  const [modoSeleccion, setModoSeleccion] = useState(false);
  const [seleccionados, setSeleccionados] = useState<Set<string>>(new Set());

  function toggleSeleccion(id: string) {
    setSeleccionados((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const { data: clients = [], isLoading } = useQuery<Client[]>({
    queryKey: ['clients', 'all', search],
    queryFn: async () => (await api.get('/clients', { params: { search: search || undefined } })).data,
  });

  const bulkEliminar = useMutation({
    mutationFn: async () =>
      (await api.post('/clients/bulk/eliminar', { ids: [...seleccionados] })).data as {
        eliminados: number;
        omitidos: { id: string; nombre: string; motivo: string }[];
      },
    onSuccess: (data) => {
      toast.success(
        data.omitidos.length > 0
          ? `${data.eliminados} eliminados. ${data.omitidos.length} no se pudieron (ya tienen historial).`
          : `${data.eliminados} clientes eliminados.`,
      );
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setSeleccionados(new Set());
      if (selectedId && seleccionados.has(selectedId)) setSelectedId(null);
    },
    onError: () => toast.error('No se pudo completar la eliminacion.'),
  });

  const { data: selectedClient } = useQuery<Client>({
    queryKey: ['clients', selectedId],
    queryFn: async () => (await api.get(`/clients/${selectedId}`)).data,
    enabled: Boolean(selectedId),
  });

  const createClient = useMutation({
    mutationFn: async (payload: Partial<Client>) => (await api.post('/clients', payload)).data,
    onSuccess: () => {
      toast.success('Cliente creado.');
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      // Ya se guardo de verdad: el borrador deja de tener sentido.
      limpiarBorrador('clientes:nuevo');
      setShowForm(false);
    },
  });

  async function exportarCsv() {
    const response = await api.get('/clients/export', { responseType: 'blob' });
    const url = URL.createObjectURL(response.data as Blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'clientes.xlsx';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <PageHeader
        title="Clientes"
        subtitle="Historial de compras y deudas por cliente"
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={exportarCsv}>
              <Download size={16} /> Exportar Excel
            </Button>
            {esAdmin && (
              <Button
                variant="secondary"
                onClick={() => {
                  setModoSeleccion((v) => !v);
                  setSeleccionados(new Set());
                }}
              >
                {modoSeleccion ? 'Cancelar seleccion' : 'Seleccionar varios'}
              </Button>
            )}
            <Button onClick={() => setShowForm(true)}>
              <Plus size={16} /> Nuevo cliente
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="buscador mb-4">
            <Search size={16} className="shrink-0 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, telefono o correo..."
            />
          </div>

          {modoSeleccion && seleccionados.size > 0 && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-copper-300 bg-copper-50 px-3 py-2">
              <span className="text-sm font-semibold text-copper-700">{seleccionados.size} seleccionados</span>
              <Button
                size="sm"
                className="ml-auto !bg-brick-600 hover:!bg-brick-700"
                disabled={bulkEliminar.isPending}
                onClick={() => bulkEliminar.mutate()}
              >
                {bulkEliminar.isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                Eliminar
              </Button>
            </div>
          )}

          {isLoading ? (
            <Card className="h-40 animate-pulse" />
          ) : clients.length === 0 ? (
            <EmptyState title="Sin clientes" description="Registra tu primer cliente para empezar." />
          ) : (
            <Card className="divide-y divide-porcelain-200 overflow-hidden">
              {clients.map((c) => (
                <button
                  key={c.id}
                  onClick={() => (modoSeleccion ? toggleSeleccion(c.id) : setSelectedId(c.id))}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-porcelain-100 ${
                    selectedId === c.id ? 'bg-copper-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {modoSeleccion && (
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
                          seleccionados.has(c.id)
                            ? 'border-copper-600 bg-copper-600 text-white'
                            : 'border-porcelain-400'
                        }`}
                      >
                        {seleccionados.has(c.id) && <Check size={13} strokeWidth={3} />}
                      </span>
                    )}
                    <div>
                      <p className="text-sm font-medium text-ink">{c.nombre}</p>
                      <p className="flex items-center gap-1 text-xs text-muted">
                        <Phone size={11} /> {c.telefono}
                      </p>
                    </div>
                  </div>
                  {Boolean(c.deudaPendiente) && (
                    <Badge tone="brick">Debe RD$ {formatMoney(c.deudaPendiente!)}</Badge>
                  )}
                </button>
              ))}
            </Card>
          )}
        </div>

        <div>
          {selectedClient ? (
            <ClientDetail client={selectedClient} onDeleted={() => setSelectedId(null)} />
          ) : (
            <Card className="p-6 text-center text-sm text-muted">
              Selecciona un cliente para ver su historial y deudas.
            </Card>
          )}
        </div>
      </div>

      {showForm && (
        <NewClientModal onClose={() => setShowForm(false)} onSubmit={(payload) => createClient.mutate(payload)} />
      )}
    </div>
  );
}

function ClientDetail({ client, onDeleted }: { client: Client; onDeleted: () => void }) {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const esAdmin = user?.role === 'ADMIN';
  const [abonoAmount, setAbonoAmount] = useState<Record<string, string>>({});
  const [confirmandoBorrado, setConfirmandoBorrado] = useState(false);

  // Borrar un cliente es solo de ADMIN (@Roles(Role.ADMIN) en
  // clients.controller.ts). El backend ademas se niega si el cliente ya tiene
  // ventas o deudas — ese mensaje es el que se muestra tal cual, porque
  // explica exactamente por que no se puede.
  const deleteClient = useMutation({
    mutationFn: async () => (await api.delete(`/clients/${client.id}`)).data,
    onSuccess: () => {
      toast.success('Cliente eliminado.');
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      onDeleted();
    },
    onSettled: () => setConfirmandoBorrado(false),
  });

  const registerPayment = useMutation({
    mutationFn: async ({ debtId, amount, metodo }: { debtId: string; amount: number; metodo: MetodoPago }) =>
      (await api.post(`/client-debts/${debtId}/payments`, { amount, metodo })).data,
    onSuccess: () => {
      toast.success('Abono registrado.');
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });

  const pendingDebts = (client.debts ?? []).filter((d) => d.status !== 'PAGADA');

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <p className="font-display font-bold text-ink">{client.nombre}</p>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
          <Phone size={13} /> {client.telefono}
        </p>
        {client.email && (
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted">
            <Mail size={13} /> {client.email}
          </p>
        )}
      </Card>

      {pendingDebts.length > 0 && (
        <Card className="p-4">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Deudas pendientes</h3>
          <div className="space-y-3">
            {pendingDebts.map((d) => {
              const saldo = Number(d.amountTotal ?? 0) - Number(d.amountPaid ?? 0);
              return (
                <div key={d.id} className="rounded-lg border border-porcelain-200 p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <Badge tone={d.status === 'VENCIDA' ? 'brick' : 'copper'}>
                      {ESTADO_DEUDA_LABEL[d.status]}
                    </Badge>
                    <span className="font-display font-bold tabular-nums text-ink">
                      RD$ {formatMoney(saldo)}
                    </span>
                  </div>
                  {d.dueDate && (
                    <p className="mt-1 text-xs text-muted">Vence: {formatDate(d.dueDate)}</p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Monto"
                      value={abonoAmount[d.id] ?? ''}
                      onChange={(e) => setAbonoAmount((prev) => ({ ...prev, [d.id]: e.target.value }))}
                      className="w-24 rounded-lg border border-porcelain-300 px-2 py-1 text-xs outline-none focus:border-copper-500"
                    />
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        const amount = Number(abonoAmount[d.id]);
                        if (!amount || amount <= 0) return toast.error('Ingresa un monto valido.');
                        registerPayment.mutate({ debtId: d.id, amount, metodo: 'EFECTIVO' });
                      }}
                    >
                      Registrar abono
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Historial de compras</h3>
        {!client.sales || client.sales.length === 0 ? (
          <p className="text-sm text-muted">Sin compras registradas.</p>
        ) : (
          <div className="divide-y divide-porcelain-200">
            {client.sales.map((s) => (
              <div key={s.id} className="flex items-center justify-between py-2 text-sm">
                <div>
                  <p className="text-ink">{formatDate(s.fecha)}</p>
                  <p className="text-xs text-muted">{METODO_PAGO_LABEL[s.metodoPago]}</p>
                </div>
                <p className="font-display font-semibold tabular-nums text-ink">RD$ {formatMoney(s.total)}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {esAdmin && (
        <Card className="p-4">
          {confirmandoBorrado ? (
            <>
              <p className="mb-2 text-sm font-semibold text-ink">Eliminar a {client.nombre}?</p>
              <p className="mb-3 text-xs text-muted">
                Esto no se puede deshacer. Si el cliente ya tiene ventas o deudas registradas, el sistema no lo va a
                dejar borrar (haria desaparecer el rastro de facturas a su nombre).
              </p>
              <div className="flex gap-2">
                <Button variant="secondary" className="flex-1" onClick={() => setConfirmandoBorrado(false)}>
                  Cancelar
                </Button>
                <Button
                  variant="danger"
                  className="flex-1"
                  disabled={deleteClient.isPending}
                  onClick={() => deleteClient.mutate()}
                >
                  {deleteClient.isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                  Si, eliminar
                </Button>
              </div>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmandoBorrado(true)}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg py-1.5 text-sm font-medium text-brick-500 hover:bg-brick-100"
            >
              <Trash2 size={15} /> Eliminar cliente
            </button>
          )}
        </Card>
      )}
    </div>
  );
}

function NewClientModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (payload: Partial<Client>) => void;
}) {
  // El cliente a medio escribir sobrevive si se cierra el modal sin querer.
  const [form, setForm] = usePersistedState('clientes:nuevo', {
    nombre: '',
    telefono: '',
    email: '',
    direccion: '',
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.nombre.trim() || !form.telefono.trim()) {
      toast.error('Nombre y telefono son obligatorios.');
      return;
    }
    // Si el correo o la direccion quedan en blanco no se envian (en vez de
    // mandar "" o "N/A"), asi el backend los trata como realmente opcionales.
    onSubmit({
      nombre: form.nombre.trim(),
      telefono: form.telefono.trim(),
      email: form.email.trim() || undefined,
      direccion: form.direccion.trim() || undefined,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-espresso-950/50 p-4">
      <Card className="w-full max-w-sm p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display font-bold text-ink">Nuevo cliente</h2>
          <button onClick={onClose} className="rounded p-1 text-muted hover:bg-porcelain-200">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          {(['nombre', 'telefono', 'email', 'direccion'] as const).map((field) => (
            <div key={field}>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
                {field}
                {(field === 'nombre' || field === 'telefono') && ' *'}
              </label>
              <input
                value={form[field]}
                onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))}
                placeholder={field === 'email' ? 'Opcional' : field === 'direccion' ? 'Opcional' : undefined}
                className="w-full rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
              />
            </div>
          ))}
          <Button type="submit" className="w-full">
            Guardar cliente
          </Button>
        </form>
      </Card>
    </div>
  );
}
