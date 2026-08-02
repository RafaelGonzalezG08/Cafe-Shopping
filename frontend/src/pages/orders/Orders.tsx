import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { PackageCheck, Package, Truck, CalendarClock, AlertTriangle, X, Phone } from 'lucide-react';
import { api } from '../../lib/api';
import { usePersistedState } from '../../lib/usePersistedState';
import { formatMoney, formatDate, ESTADO_PEDIDO_LABEL } from '../../lib/format';
import { Button, Card, PageHeader, Badge, EmptyState } from '../../components/ui';
import { useAuthStore } from '../../store/auth.store';
import type { EstadoPedido, Order, UrgenciaPedido } from '../../types';

/** Color e etiqueta de cada nivel de urgencia (lo calcula el backend). */
const URGENCIA: Record<UrgenciaPedido, { tone: 'brick' | 'copper' | 'sage' | 'neutral'; texto: string }> = {
  ATRASADO: { tone: 'brick', texto: 'Atrasado' },
  HOY: { tone: 'copper', texto: 'Entrega hoy' },
  PROXIMO: { tone: 'sage', texto: 'Programado' },
  SIN_FECHA: { tone: 'neutral', texto: 'Sin fecha' },
};

const FILTROS: { valor: EstadoPedido | 'TODOS'; texto: string }[] = [
  { valor: 'TODOS', texto: 'Todos' },
  { valor: 'PENDIENTE', texto: 'Pendientes' },
  { valor: 'EMPACADO', texto: 'Empacados' },
];

export default function Orders() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const [filtro, setFiltro] = usePersistedState<EstadoPedido | 'TODOS'>('pedidos:filtro', 'TODOS');
  const [entregando, setEntregando] = useState<Order | null>(null);

  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ['orders', filtro],
    queryFn: async () =>
      (await api.get('/orders', { params: { estado: filtro === 'TODOS' ? undefined : filtro } })).data,
  });

  function refrescar() {
    queryClient.invalidateQueries({ queryKey: ['orders'] });
    queryClient.invalidateQueries({ queryKey: ['dashboard'] });
  }

  const actualizar = useMutation({
    mutationFn: async ({ id, cambios }: { id: string; cambios: Record<string, unknown> }) =>
      (await api.patch(`/orders/${id}`, cambios)).data,
    onSuccess: (_data, variables) => {
      if (variables.cambios.estado === 'ENTREGADO') {
        toast.success('Pedido entregado. La factura queda como registro de la venta.');
        setEntregando(null);
      } else {
        toast.success('Pedido actualizado.');
      }
      refrescar();
    },
  });

  const cancelar = useMutation({
    mutationFn: async (id: string) => (await api.delete(`/orders/${id}`)).data,
    onSuccess: () => {
      toast.success('Pedido cancelado. La venta y su factura no se tocaron.');
      refrescar();
    },
  });

  return (
    <div>
      <PageHeader
        title="Pedidos"
        subtitle="Piezas comprometidas que todavia no estan en manos del cliente"
      />

      <div className="mb-5 flex flex-wrap gap-1.5">
        {FILTROS.map((f) => (
          <button
            key={f.valor}
            onClick={() => setFiltro(f.valor)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              filtro === f.valor ? 'bg-copper-500 text-white' : 'bg-porcelain-200 text-muted hover:bg-porcelain-300'
            }`}
          >
            {f.texto}
          </button>
        ))}
      </div>

      {isLoading ? (
        <Card className="h-40 animate-pulse" />
      ) : orders.length === 0 ? (
        <EmptyState
          title="Sin pedidos por entregar"
          description="Al cobrar en el punto de venta puedes marcar la venta como pedido y ponerle fecha de entrega."
        />
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const urgencia = URGENCIA[order.urgencia];
            return (
              <Card
                key={order.id}
                className={`p-4 ${order.urgencia === 'ATRASADO' ? 'border-brick-500' : ''}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <Badge tone={order.estado === 'EMPACADO' ? 'sage' : 'copper'}>
                        {ESTADO_PEDIDO_LABEL[order.estado]}
                      </Badge>
                      <Badge tone={urgencia.tone}>
                        {order.urgencia === 'ATRASADO' && <AlertTriangle size={11} className="mr-1" />}
                        {urgencia.texto}
                      </Badge>
                      {order.sale?.invoice && (
                        <span className="font-mono text-[11px] text-muted">{order.sale.invoice.numero}</span>
                      )}
                    </div>

                    <p className="font-display font-bold text-ink">
                      {order.sale?.client?.nombre ?? 'Consumidor final'}
                    </p>
                    {order.sale?.client?.telefono && (
                      <p className="flex items-center gap-1 text-xs text-muted">
                        <Phone size={11} /> {order.sale.client.telefono}
                      </p>
                    )}

                    <ul className="mt-2 space-y-0.5 text-sm text-ink">
                      {order.sale?.items.map((item) => (
                        <li key={item.id}>
                          {item.cantidad} x {item.descripcion}
                        </li>
                      ))}
                    </ul>

                    {order.notas && <p className="mt-2 text-xs italic text-muted">Nota: {order.notas}</p>}
                  </div>

                  <div className="text-right">
                    <p className="font-display text-lg font-bold tabular-nums text-copper-600">
                      RD$ {formatMoney(order.sale?.total ?? 0)}
                    </p>
                    <label className="mt-2 block text-[11px] font-semibold uppercase tracking-wide text-muted">
                      Fecha de entrega
                    </label>
                    <input
                      type="date"
                      value={order.fechaEntrega ? order.fechaEntrega.slice(0, 10) : ''}
                      onChange={(e) =>
                        actualizar.mutate({ id: order.id, cambios: { fechaEntrega: e.target.value || undefined } })
                      }
                      className="rounded-lg border border-porcelain-300 px-2 py-1 text-sm outline-none focus:border-copper-500"
                    />
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 border-t border-porcelain-200 pt-3">
                  {order.estado === 'PENDIENTE' && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => actualizar.mutate({ id: order.id, cambios: { estado: 'EMPACADO' } })}
                      disabled={actualizar.isPending}
                    >
                      <Package size={15} /> Marcar empacado
                    </Button>
                  )}
                  {order.estado === 'EMPACADO' && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => actualizar.mutate({ id: order.id, cambios: { estado: 'PENDIENTE' } })}
                      disabled={actualizar.isPending}
                    >
                      Volver a pendiente
                    </Button>
                  )}
                  <Button size="sm" onClick={() => setEntregando(order)} disabled={actualizar.isPending}>
                    <Truck size={15} /> Entregar
                  </Button>
                  {user?.role === 'ADMIN' && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => cancelar.mutate(order.id)}
                      disabled={cancelar.isPending}
                    >
                      Cancelar pedido
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {entregando && (
        <ConfirmarEntrega
          order={entregando}
          isPending={actualizar.isPending}
          onClose={() => setEntregando(null)}
          onConfirm={() => actualizar.mutate({ id: entregando.id, cambios: { estado: 'ENTREGADO' } })}
        />
      )}
    </div>
  );
}

/**
 * Entregar borra el pedido (queda solo la factura), asi que se confirma antes:
 * no hay forma de "des-entregar" desde la interfaz.
 */
function ConfirmarEntrega({
  order,
  isPending,
  onClose,
  onConfirm,
}: {
  order: Order;
  isPending: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-espresso-950/50 p-4">
      <Card className="w-full max-w-sm p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display font-bold text-ink">Confirmar entrega</h2>
          <button onClick={onClose} className="rounded p-1 text-muted hover:bg-porcelain-200">
            <X size={18} />
          </button>
        </div>

        <div className="mb-4 flex items-start gap-2.5 rounded-lg bg-sage-100 p-3 text-sage-700">
          <PackageCheck size={18} className="mt-0.5 shrink-0" />
          <p className="text-sm">
            El pedido de <strong>{order.sale?.client?.nombre ?? 'consumidor final'}</strong> sale del listado y
            la factura {order.sale?.invoice?.numero ?? ''} queda como el registro de la venta.
          </p>
        </div>

        <p className="mb-4 text-xs text-muted">
          Esto no se puede deshacer desde aqui: si te equivocas, tendras que crear el pedido de nuevo.
        </p>

        <div className="flex gap-2">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Cancelar
          </Button>
          <Button className="flex-1" onClick={onConfirm} disabled={isPending}>
            <CalendarClock size={15} /> {isPending ? 'Entregando...' : 'Si, entregado'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
