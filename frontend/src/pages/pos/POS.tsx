import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Minus, Plus, Search, Trash2, MessageCircle, Loader2, Receipt, X, Gem, Check } from 'lucide-react';
import { api, apiUrl } from '../../lib/api';
import { formatMoney, METODO_PAGO_LABEL } from '../../lib/format';
import { Button, Card } from '../../components/ui';
import type { Client, MetodoPago, Product, Sale } from '../../types';

interface CartLine {
  key: string;
  productId?: string;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
}

const METODOS: MetodoPago[] = ['EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'CREDITO', 'OTRO'];

export default function POS() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<CartLine[]>([]);
  const [manualDesc, setManualDesc] = useState('');
  const [manualPrice, setManualPrice] = useState('');
  const [clientSearch, setClientSearch] = useState('');
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | undefined>();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [metodoPago, setMetodoPago] = useState<MetodoPago>('EFECTIVO');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [completedSale, setCompletedSale] = useState<Sale | null>(null);

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => (await api.get('/products')).data,
  });

  const { data: businessProfile } = useQuery<{ tasaImpuesto: number }>({
    queryKey: ['settings', 'business-profile'],
    queryFn: async () => (await api.get('/settings/business-profile')).data,
    staleTime: 60_000,
  });
  const tasaImpuesto = businessProfile?.tasaImpuesto ?? 0;

  const { data: clients = [] } = useQuery<Client[]>({
    queryKey: ['clients', clientSearch],
    queryFn: async () => (await api.get('/clients', { params: { search: clientSearch || undefined } })).data,
    enabled: metodoPago === 'CREDITO' || clientSearch.length > 0 || clientModalOpen,
  });

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          p.nombre.toLowerCase().includes(search.toLowerCase()) ||
          p.sku.toLowerCase().includes(search.toLowerCase()),
      ),
    [products, search],
  );

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, l) => sum + l.cantidad * l.precioUnitario, 0);
    const impuestos = Math.round(subtotal * tasaImpuesto * 100) / 100;
    return { subtotal: Math.round(subtotal * 100) / 100, impuestos, total: Math.round((subtotal + impuestos) * 100) / 100 };
  }, [cart, tasaImpuesto]);

  function addProduct(product: Product) {
    setCart((prev) => {
      const existing = prev.find((l) => l.productId === product.id);
      if (existing) {
        return prev.map((l) => (l.productId === product.id ? { ...l, cantidad: l.cantidad + 1 } : l));
      }
      return [
        ...prev,
        {
          key: product.id,
          productId: product.id,
          descripcion: product.nombre,
          cantidad: 1,
          precioUnitario: Number(product.precioUnitario),
        },
      ];
    });
  }

  function addManualItem() {
    const price = Number(manualPrice);
    if (!manualDesc.trim() || !price || price <= 0) {
      toast.error('Ingresa una descripcion y un precio valido.');
      return;
    }
    setCart((prev) => [
      ...prev,
      { key: `manual-${Date.now()}`, descripcion: manualDesc.trim(), cantidad: 1, precioUnitario: price },
    ]);
    setManualDesc('');
    setManualPrice('');
  }

  function updateQty(key: string, delta: number) {
    setCart((prev) =>
      prev
        .map((l) => (l.key === key ? { ...l, cantidad: l.cantidad + delta } : l))
        .filter((l) => l.cantidad > 0),
    );
  }

  function removeLine(key: string) {
    setCart((prev) => prev.filter((l) => l.key !== key));
  }

  function resetSale() {
    setCart([]);
    setSelectedClientId(undefined);
    setSelectedClient(null);
    setClientSearch('');
    setMetodoPago('EFECTIVO');
    setFechaVencimiento('');
    setCompletedSale(null);
  }

  const createSale = useMutation({
    mutationFn: async () => {
      const { data } = await api.post('/sales', {
        clientId: selectedClientId,
        metodoPago,
        fechaVencimiento: metodoPago === 'CREDITO' && fechaVencimiento ? fechaVencimiento : undefined,
        items: cart.map((l) => ({
          productId: l.productId,
          descripcion: l.descripcion,
          cantidad: l.cantidad,
          precioUnitario: l.precioUnitario,
        })),
      });
      return data as Sale;
    },
    onSuccess: (sale) => {
      toast.success('Venta registrada.');
      setCompletedSale(sale);
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  if (completedSale) {
    return <InvoicePreview sale={completedSale} onNewSale={resetSale} />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
      {/* Catalogo */}
      <div>
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-porcelain-300 bg-white px-3 py-2.5">
          <Search size={16} className="text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o codigo..."
            className="w-full text-sm outline-none"
            autoFocus
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => addProduct(product)}
              className="flex flex-col items-start overflow-hidden rounded-xl2 border border-porcelain-300 bg-white text-left transition-colors hover:border-copper-400 hover:bg-copper-50"
            >
              <div className="flex h-24 w-full items-center justify-center bg-porcelain-200">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl.startsWith('http') ? product.imageUrl : apiUrl(product.imageUrl)}
                    alt={product.nombre}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Gem size={22} className="text-muted" />
                )}
              </div>
              <div className="p-3.5">
                <span className="font-mono text-[10px] font-semibold text-copper-600">{product.sku}</span>
                <p className="text-sm font-medium leading-snug text-ink">{product.nombre}</p>
                <span className="mt-1.5 block font-display text-base font-bold tabular-nums text-copper-600">
                  RD$ {formatMoney(product.precioUnitario)}
                </span>
                <span className="mt-0.5 block text-xs text-muted">Stock: {product.stock}</span>
              </div>
            </button>
          ))}
        </div>

        <Card className="mt-4 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
            Agregar item manual
          </p>
          <div className="flex flex-wrap gap-2">
            <input
              value={manualDesc}
              onChange={(e) => setManualDesc(e.target.value)}
              placeholder="Descripcion"
              className="flex-1 rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
            />
            <input
              value={manualPrice}
              onChange={(e) => setManualPrice(e.target.value)}
              placeholder="Precio"
              type="number"
              min="0"
              step="0.01"
              className="w-28 rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
              onKeyDown={(e) => e.key === 'Enter' && addManualItem()}
            />
            <Button variant="secondary" onClick={addManualItem} type="button">
              Agregar
            </Button>
          </div>
        </Card>
      </div>

      {/* Carrito */}
      <Card className="flex h-fit flex-col p-4">
        <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-muted">
          Carrito ({cart.length})
        </h2>

        {cart.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted">Selecciona productos del catalogo</p>
        ) : (
          <div className="mb-3 max-h-64 space-y-2 overflow-y-auto pr-1">
            {cart.map((line) => (
              <div key={line.key} className="flex items-center gap-2 text-sm">
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-ink">{line.descripcion}</p>
                  <p className="text-xs text-muted tabular-nums">RD$ {formatMoney(line.precioUnitario)} c/u</p>
                </div>
                <button onClick={() => updateQty(line.key, -1)} className="rounded p-1 text-muted hover:bg-porcelain-200">
                  <Minus size={14} />
                </button>
                <span className="w-5 text-center tabular-nums">{line.cantidad}</span>
                <button onClick={() => updateQty(line.key, 1)} className="rounded p-1 text-muted hover:bg-porcelain-200">
                  <Plus size={14} />
                </button>
                <button onClick={() => removeLine(line.key)} className="rounded p-1 text-brick-500 hover:bg-brick-100">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mb-3 space-y-1 border-t border-porcelain-200 pt-3 text-sm tabular-nums">
          <div className="flex justify-between text-muted">
            <span>Subtotal</span>
            <span>RD$ {formatMoney(totals.subtotal)}</span>
          </div>
          <div className="flex justify-between text-muted">
            <span>Impuestos ({Math.round(tasaImpuesto * 100)}%)</span>
            <span>RD$ {formatMoney(totals.impuestos)}</span>
          </div>
          <div className="flex justify-between font-display text-lg font-bold text-copper-600">
            <span>Total</span>
            <span>RD$ {formatMoney(totals.total)}</span>
          </div>
        </div>

        <div className="mb-3">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">Metodo de pago</p>
          <div className="grid grid-cols-3 gap-1.5">
            {METODOS.map((m) => (
              <button
                key={m}
                onClick={() => setMetodoPago(m)}
                className={`rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors ${
                  metodoPago === m
                    ? 'border-copper-500 bg-copper-100 text-copper-700'
                    : 'border-porcelain-300 text-muted hover:border-copper-400'
                }`}
              >
                {METODO_PAGO_LABEL[m]}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
            Cliente {metodoPago === 'CREDITO' && <span className="text-brick-500">(requerido)</span>}
          </p>

          {selectedClient ? (
            <div className="mb-1.5 flex items-center justify-between rounded-lg border border-sage-500 bg-sage-100 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-500 text-white">
                  <Check size={12} strokeWidth={3} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-sage-700">{selectedClient.nombre}</p>
                  <p className="text-xs text-sage-600">{selectedClient.telefono}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedClientId(undefined);
                  setSelectedClient(null);
                  setClientSearch('');
                }}
                className="rounded p-1 text-sage-600 hover:bg-sage-500/10"
                title="Quitar cliente"
              >
                <X size={15} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setClientModalOpen(true)}
              className="mb-1.5 flex w-full items-center gap-2 rounded-lg border border-porcelain-300 px-3 py-2 text-left text-sm text-muted outline-none transition-colors hover:border-copper-400 focus:border-copper-500"
            >
              <Search size={15} /> Buscar cliente...
            </button>
          )}

          {clientModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
              <Card className="flex max-h-[70vh] w-full max-w-md flex-col p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-display text-sm font-bold uppercase tracking-wide text-muted">
                    Buscar cliente
                  </h3>
                  <button
                    type="button"
                    onClick={() => setClientModalOpen(false)}
                    className="rounded p-1 text-muted hover:bg-porcelain-100"
                  >
                    <X size={16} />
                  </button>
                </div>
                <input
                  autoFocus
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  placeholder="Nombre o telefono..."
                  className="mb-3 w-full rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
                />
                <div className="flex-1 overflow-y-auto rounded-lg border border-porcelain-200">
                  {clients.length === 0 ? (
                    <p className="px-3 py-3 text-sm text-muted">
                      {clientSearch ? 'Sin resultados.' : 'Escribe para buscar un cliente.'}
                    </p>
                  ) : (
                    clients.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setSelectedClientId(c.id);
                          setSelectedClient(c);
                          setClientModalOpen(false);
                        }}
                        className="block w-full border-b border-porcelain-100 px-3 py-2.5 text-left text-sm last:border-b-0 hover:bg-porcelain-100"
                      >
                        <span className="font-medium text-ink">{c.nombre}</span>{' '}
                        <span className="text-xs text-muted">{c.telefono}</span>
                      </button>
                    ))
                  )}
                </div>
              </Card>
            </div>
          )}

          {metodoPago === 'CREDITO' && (
            <input
              type="date"
              value={fechaVencimiento}
              onChange={(e) => setFechaVencimiento(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
            />
          )}
        </div>

        <Button
          disabled={cart.length === 0 || (metodoPago === 'CREDITO' && !selectedClientId) || createSale.isPending}
          onClick={() => createSale.mutate()}
          className="w-full"
        >
          {createSale.isPending ? <Loader2 size={16} className="animate-spin" /> : <Receipt size={16} />}
          Cobrar RD$ {formatMoney(totals.total)}
        </Button>
      </Card>
    </div>
  );
}

function InvoicePreview({
  sale,
  onNewSale,
}: {
  sale: Sale;
  onNewSale: () => void;
}) {
  const png = sale.invoice?.pngUrl;
  const imageSrc = png?.startsWith('http') ? png : png ? apiUrl(png) : undefined;

  const sendWhatsapp = useMutation({
    mutationFn: async () => (await api.post(`/sales/${sale.id}/send-invoice-whatsapp`)).data,
    onSuccess: () => {
      toast.success('Factura enviada por WhatsApp.');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? 'No se pudo enviar la factura por WhatsApp.');
    },
  });

  return (
    <div className="mx-auto max-w-md">
      <Card className="overflow-hidden">
        <div className="bg-sage-100 px-5 py-4 text-center">
          <p className="font-display text-sm font-bold text-sage-600">Venta registrada &middot; {sale.invoice?.numero}</p>
        </div>
        <div className="p-5">
          {imageSrc ? (
            <img src={imageSrc} alt="Factura" className="mx-auto rounded-lg border border-porcelain-200" />
          ) : (
            <p className="py-8 text-center text-sm text-muted">
              La factura se esta generando o no se pudo renderizar. Puedes reintentar el envio.
            </p>
          )}
          <div className="receipt-edge mt-0" />
        </div>
        <div className="space-y-2 p-5 pt-0">
          {sale.client?.telefono ? (
            <Button
              className="w-full"
              onClick={() => sendWhatsapp.mutate()}
              disabled={sendWhatsapp.isPending}
            >
              {sendWhatsapp.isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <MessageCircle size={16} />
              )}
              {sendWhatsapp.isPending ? 'Enviando...' : 'Enviar por WhatsApp'}
            </Button>
          ) : (
            <Button className="w-full" disabled>
              <MessageCircle size={16} /> Sin telefono de cliente
            </Button>
          )}
          <Button variant="secondary" className="w-full" onClick={onNewSale}>
            <X size={16} />
            Nueva venta
          </Button>
        </div>
      </Card>
    </div>
  );
}
