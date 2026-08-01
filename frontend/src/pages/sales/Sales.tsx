import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { MessageCircle, Download, Loader2, Eye, X, CreditCard, Banknote, Pencil, Trash2 } from 'lucide-react';
import { api, apiUrl } from '../../lib/api';
import { formatMoney, formatDateTime, METODO_PAGO_LABEL } from '../../lib/format';
import { Card, PageHeader, Badge, EmptyState, Button } from '../../components/ui';
import { useAuthStore } from '../../store/auth.store';
import type { EstadoFactura, Sale } from '../../types';

const ESTADO_TONE: Record<EstadoFactura, 'neutral' | 'copper' | 'sage' | 'brick'> = {
  PENDIENTE: 'neutral',
  GENERADA: 'copper',
  ENVIADA: 'sage',
  ERROR: 'brick',
};

export default function Sales() {
  const queryClient = useQueryClient();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  const { data: sales = [], isLoading } = useQuery<Sale[]>({
    queryKey: ['sales', from, to],
    queryFn: async () => (await api.get('/sales', { params: { from: from || undefined, to: to || undefined } })).data,
  });

  const sendWhatsapp = useMutation({
    mutationFn: async (saleId: string) => (await api.post(`/sales/${saleId}/send-invoice-whatsapp`)).data,
    onSuccess: () => {
      toast.success('Factura reenviada.');
      queryClient.invalidateQueries({ queryKey: ['sales'] });
    },
  });

  return (
    <div>
      <PageHeader title="Ventas" subtitle="Historial de ventas y estado de facturacion" />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <label className="text-xs font-medium text-muted">Desde</label>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-lg border border-porcelain-300 px-2.5 py-1.5 text-sm outline-none focus:border-copper-500" />
        <label className="text-xs font-medium text-muted">Hasta</label>
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="rounded-lg border border-porcelain-300 px-2.5 py-1.5 text-sm outline-none focus:border-copper-500" />
      </div>

      {isLoading ? (
        <Card className="h-40 animate-pulse" />
      ) : sales.length === 0 ? (
        <EmptyState title="Sin ventas en este rango" description="Registra una venta desde el Punto de venta." />
      ) : (
        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-porcelain-100 text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-2.5">Fecha</th>
                <th className="px-4 py-2.5">Cliente</th>
                <th className="px-4 py-2.5">Metodo</th>
                <th className="px-4 py-2.5">Factura</th>
                <th className="px-4 py-2.5 text-right">Total</th>
                <th className="px-4 py-2.5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-porcelain-200">
              {sales.map((sale) => (
                <tr
                  key={sale.id}
                  onClick={() => setSelectedSale(sale)}
                  className="cursor-pointer hover:bg-porcelain-100"
                >
                  <td className="px-4 py-2.5 text-ink">{formatDateTime(sale.fecha)}</td>
                  <td className="px-4 py-2.5 text-ink">{sale.client?.nombre ?? 'Consumidor final'}</td>
                  <td className="px-4 py-2.5">
                    <Badge tone={sale.metodoPago === 'CREDITO' ? 'brick' : 'sage'}>
                      {METODO_PAGO_LABEL[sale.metodoPago]}
                    </Badge>
                  </td>
                  <td className="px-4 py-2.5">
                    {sale.invoice && (
                      <Badge tone={ESTADO_TONE[sale.invoice.estado]}>{sale.invoice.numero}</Badge>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-right font-display font-semibold tabular-nums text-ink">
                    RD$ {formatMoney(sale.total)}
                  </td>
                  <td className="px-4 py-2.5" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedSale(sale)}
                        className="rounded-lg p-1.5 text-muted hover:bg-porcelain-200"
                        title="Ver detalle"
                      >
                        <Eye size={15} />
                      </button>
                      {sale.invoice?.pngUrl && (
                        <a
                          href={sale.invoice.pngUrl.startsWith('http') ? sale.invoice.pngUrl : apiUrl(sale.invoice.pngUrl)}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-lg p-1.5 text-muted hover:bg-porcelain-200"
                          title="Descargar PNG"
                        >
                          <Download size={15} />
                        </a>
                      )}
                      {sale.client?.telefono && (
                        <button
                          onClick={() => sendWhatsapp.mutate(sale.id)}
                          disabled={sendWhatsapp.isPending}
                          className="rounded-lg p-1.5 text-sage-600 hover:bg-sage-100"
                          title="Reenviar por WhatsApp"
                        >
                          {sendWhatsapp.isPending && sendWhatsapp.variables === sale.id ? (
                            <Loader2 size={15} className="animate-spin" />
                          ) : (
                            <MessageCircle size={15} />
                          )}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {selectedSale && <SaleDetailModal sale={selectedSale} onClose={() => setSelectedSale(null)} />}
    </div>
  );
}

function SaleDetailModal({ sale, onClose }: { sale: Sale; onClose: () => void }) {
  const { user } = useAuthStore();
  const esCredito = sale.metodoPago === 'CREDITO';
  const [editing, setEditing] = useState(false);

  if (editing) {
    return <EditSaleModal sale={sale} onClose={() => setEditing(false)} onDone={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-espresso-950/50 p-4">
      <Card className="max-h-[85vh] w-full max-w-md overflow-y-auto">
        <div className="flex items-center justify-between border-b border-porcelain-200 p-5">
          <div>
            <p className="font-display font-bold text-ink">{sale.invoice?.numero ?? 'Venta'}</p>
            <p className="text-xs text-muted">{formatDateTime(sale.fecha)}</p>
          </div>
          <div className="flex items-center gap-1">
            {user?.role === 'ADMIN' && (
              <button
                onClick={() => setEditing(true)}
                className="rounded-lg p-1.5 text-muted hover:bg-porcelain-200"
                title="Corregir factura (requiere clave de administrador)"
              >
                <Pencil size={16} />
              </button>
            )}
            <button onClick={onClose} className="rounded p-1 text-muted hover:bg-porcelain-200">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="p-5">
          {/* Metodo de pago bien visible: contado o credito */}
          <div
            className={`mb-4 flex items-center gap-2.5 rounded-lg p-3 ${
              esCredito ? 'bg-brick-100 text-brick-600' : 'bg-sage-100 text-sage-600'
            }`}
          >
            {esCredito ? <CreditCard size={18} /> : <Banknote size={18} />}
            <div>
              <p className="text-sm font-bold">
                {esCredito ? 'Venta a credito' : `Venta de contado (${METODO_PAGO_LABEL[sale.metodoPago]})`}
              </p>
              {esCredito && <p className="text-xs opacity-80">El cliente debe el total de esta factura.</p>}
            </div>
          </div>

          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">Cliente</p>
          <p className="mb-4 text-sm text-ink">{sale.client?.nombre ?? 'Consumidor final'}</p>

          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Piezas seleccionadas</p>
          <div className="mb-4 divide-y divide-porcelain-200 rounded-lg border border-porcelain-200">
            {sale.items.map((item) => (
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

          <div className="space-y-1 border-t border-porcelain-200 pt-3 text-sm tabular-nums">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span>RD$ {formatMoney(sale.subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Impuestos</span>
              <span>RD$ {formatMoney(sale.impuestos)}</span>
            </div>
            <div className="flex justify-between font-display text-lg font-bold text-copper-600">
              <span>Total</span>
              <span>RD$ {formatMoney(sale.total)}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

interface EditableLine {
  productId?: string;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
}

function EditSaleModal({ sale, onClose, onDone }: { sale: Sale; onClose: () => void; onDone: () => void }) {
  const queryClient = useQueryClient();
  const [lines, setLines] = useState<EditableLine[]>(
    sale.items.map((i) => ({
      productId: i.productId ?? undefined,
      descripcion: i.descripcion,
      // Los Decimal de Prisma llegan como string por JSON (ej. "650.00"); si no se
      // normalizan aqui, una linea que el usuario nunca toca (p.ej. porque solo
      // borro otra) se manda como string y el backend la rechaza al validar.
      cantidad: Number(i.cantidad),
      precioUnitario: Number(i.precioUnitario),
    })),
  );
  const [adminPassword, setAdminPassword] = useState('');

  const subtotal = lines.reduce((sum, l) => sum + l.cantidad * l.precioUnitario, 0);

  function updateLine(index: number, patch: Partial<EditableLine>) {
    setLines((prev) => prev.map((l, i) => (i === index ? { ...l, ...patch } : l)));
  }

  function removeLine(index: number) {
    setLines((prev) => prev.filter((_, i) => i !== index));
  }

  const saveEdit = useMutation({
    mutationFn: async () => {
      if (lines.length === 0) throw new Error('La factura debe tener al menos un producto.');
      const { data } = await api.put(`/sales/${sale.id}`, {
        adminPassword,
        items: lines.map((l) => ({
          productId: l.productId,
          descripcion: l.descripcion,
          cantidad: l.cantidad,
          precioUnitario: l.precioUnitario,
        })),
      });
      return data as Sale;
    },
    onSuccess: () => {
      toast.success('Factura corregida y regenerada.');
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      onDone();
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message ?? 'No se pudo corregir la factura.';
      toast.error(Array.isArray(msg) ? msg.join(' ') : msg);
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-espresso-950/50 p-4">
      <Card className="max-h-[85vh] w-full max-w-md overflow-y-auto">
        <div className="flex items-center justify-between border-b border-porcelain-200 p-5">
          <div>
            <p className="font-display font-bold text-ink">Corregir {sale.invoice?.numero ?? 'factura'}</p>
            <p className="text-xs text-muted">Ajusta cantidad/precio, o quita una linea equivocada.</p>
          </div>
          <button onClick={onClose} className="rounded p-1 text-muted hover:bg-porcelain-200">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-2 p-5">
          {lines.map((line, index) => (
            <div key={index} className="flex items-center gap-2 rounded-lg border border-porcelain-200 p-2.5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-ink">{line.descripcion}</p>
              </div>
              <input
                type="number"
                min={1}
                value={line.cantidad}
                onChange={(e) => updateLine(index, { cantidad: Math.max(1, Number(e.target.value) || 1) })}
                className="w-16 rounded-lg border border-porcelain-300 px-2 py-1 text-right text-sm outline-none focus:border-copper-500"
                title="Cantidad"
              />
              <input
                type="number"
                min={0}
                step="0.01"
                value={line.precioUnitario}
                onChange={(e) => updateLine(index, { precioUnitario: Math.max(0, Number(e.target.value) || 0) })}
                className="w-24 rounded-lg border border-porcelain-300 px-2 py-1 text-right text-sm outline-none focus:border-copper-500"
                title="Precio unitario"
              />
              <button
                onClick={() => removeLine(index)}
                className="rounded-lg p-1.5 text-brick-500 hover:bg-brick-100"
                title="Quitar esta linea"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}

          <div className="flex justify-between border-t border-porcelain-200 pt-3 text-sm font-semibold text-ink">
            <span>Nuevo subtotal</span>
            <span>RD$ {formatMoney(Math.round(subtotal * 100) / 100)}</span>
          </div>
          <p className="text-xs text-muted">
            Los impuestos y el total se recalculan automaticamente con la tasa configurada, y la factura (PNG/PDF) se
            regenera al guardar.
          </p>

          <div className="pt-2">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
              Clave de administrador
            </label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Confirma tu clave para guardar la correccion"
              className="w-full rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
            />
          </div>

          <Button
            className="w-full"
            disabled={saveEdit.isPending || !adminPassword || lines.length === 0}
            onClick={() => saveEdit.mutate()}
          >
            {saveEdit.isPending ? <Loader2 size={16} className="animate-spin" /> : null}
            {saveEdit.isPending ? 'Guardando...' : 'Guardar correccion'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
