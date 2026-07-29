import { useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Plus, ImagePlus, Gem, X, Pencil, Search } from 'lucide-react';
import { api, apiUrl } from '../../lib/api';
import { formatMoney } from '../../lib/format';
import { Button, Card, PageHeader, EmptyState } from '../../components/ui';
import type { Product } from '../../types';

type ProductFormValues = {
  nombre: string;
  precioUnitario: string;
  stock: string;
  file: File | null;
};

function buildFormData(values: ProductFormValues) {
  const formData = new FormData();
  formData.append('nombre', values.nombre.trim());
  formData.append('precioUnitario', values.precioUnitario);
  formData.append('stock', String(Number(values.stock) || 0));
  if (values.file) formData.append('file', values.file);
  return formData;
}

export default function Products() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [search, setSearch] = useState('');

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['products', 'all'],
    queryFn: async () => (await api.get('/products', { params: { all: true } })).data,
  });

  const filteredProducts = products.filter((product) => {
    const query = search.trim().toLowerCase();
    if (!query) return true;
    return product.nombre.toLowerCase().includes(query) || product.sku.toLowerCase().includes(query);
  });

  const createProduct = useMutation({
    mutationFn: async (values: ProductFormValues) =>
      (
        await api.post('/products', buildFormData(values), {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      ).data,
    onSuccess: () => {
      toast.success('Producto creado.');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setShowForm(false);
    },
  });

  const updateProduct = useMutation({
    mutationFn: async ({ id, values }: { id: string; values: ProductFormValues }) =>
      (
        await api.put(`/products/${id}`, buildFormData(values), {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      ).data,
    onSuccess: () => {
      toast.success('Producto actualizado.');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setEditing(null);
    },
  });

  function imageSrc(product: Product) {
    if (!product.imageUrl) return null;
    return product.imageUrl.startsWith('http') ? product.imageUrl : apiUrl(product.imageUrl);
  }

  return (
    <div>
      <PageHeader
        title="Productos"
        subtitle="Catalogo con codigo unico y foto por pieza"
        action={
          <Button onClick={() => setShowForm(true)}>
            <Plus size={16} /> Nuevo producto
          </Button>
        }
      />

      <div className="relative mb-4 max-w-sm">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre o codigo..."
          className="w-full rounded-lg border border-porcelain-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-copper-500"
        />
      </div>

      {isLoading ? (
        <Card className="h-40 animate-pulse" />
      ) : products.length === 0 ? (
        <EmptyState title="Sin productos" description="Registra tu primera pieza para empezar." />
      ) : filteredProducts.length === 0 ? (
        <EmptyState title="Sin resultados" description={`No hay productos que coincidan con "${search}".`} />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <button
                type="button"
                onClick={() => setEditing(product)}
                className="group relative flex h-36 w-full items-center justify-center bg-porcelain-200"
                title="Editar producto"
              >
                {imageSrc(product) ? (
                  <img src={imageSrc(product)!} alt={product.nombre} className="h-full w-full object-cover" />
                ) : (
                  <Gem size={28} className="text-muted" />
                )}
                <span className="absolute inset-0 flex items-center justify-center bg-espresso-950/0 opacity-0 transition-opacity group-hover:bg-espresso-950/40 group-hover:opacity-100">
                  <Pencil size={20} className="text-white" />
                </span>
              </button>
              <div className="p-3">
                <p className="font-mono text-[11px] font-semibold text-copper-600">{product.sku}</p>
                <p className="truncate text-sm font-medium text-ink">{product.nombre}</p>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="font-display font-bold tabular-nums text-ink">
                    RD$ {formatMoney(product.precioUnitario)}
                  </span>
                  <span className="text-xs text-muted">Stock: {product.stock}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {showForm && (
        <ProductModal
          title="Nuevo producto"
          submitLabel="Crear producto"
          isPending={createProduct.isPending}
          onClose={() => setShowForm(false)}
          onSubmit={(values) => createProduct.mutate(values)}
        />
      )}

      {editing && (
        <ProductModal
          title="Editar producto"
          submitLabel="Guardar cambios"
          isPending={updateProduct.isPending}
          initial={{
            nombre: editing.nombre,
            precioUnitario: String(editing.precioUnitario),
            stock: String(editing.stock),
            file: null,
          }}
          currentImage={imageSrc(editing)}
          onClose={() => setEditing(null)}
          onSubmit={(values) => updateProduct.mutate({ id: editing.id, values })}
        />
      )}
    </div>
  );
}

function ProductModal({
  title,
  submitLabel,
  isPending,
  initial,
  currentImage,
  onClose,
  onSubmit,
}: {
  title: string;
  submitLabel: string;
  isPending: boolean;
  initial?: ProductFormValues;
  currentImage?: string | null;
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => void;
}) {
  const [form, setForm] = useState<ProductFormValues>(
    initial ?? { nombre: '', precioUnitario: '', stock: '', file: null },
  );
  const [preview, setPreview] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.nombre.trim() || !Number(form.precioUnitario)) {
      toast.error('Completa el nombre y un precio valido.');
      return;
    }
    onSubmit(form);
  }

  function handleFile(file: File | null) {
    setForm((f) => ({ ...f, file }));
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  const photoToShow = preview ?? currentImage ?? null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-espresso-950/50 p-4">
      <Card className="w-full max-w-sm p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display font-bold text-ink">{title}</h2>
          <button onClick={onClose} className="rounded p-1 text-muted hover:bg-porcelain-200">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">Foto</label>
            <label className="group relative flex h-32 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-porcelain-300 bg-porcelain-100">
              {photoToShow ? (
                <img src={photoToShow} alt="Vista previa" className="h-full w-full object-cover" />
              ) : (
                <span className="flex flex-col items-center gap-1 text-muted">
                  <ImagePlus size={22} />
                  <span className="text-xs">Subir foto</span>
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>
          {!initial && (
            <p className="text-xs text-muted">
              El codigo (SKU) se genera automaticamente a partir del nombre, por ejemplo{' '}
              <span className="font-mono">AN-0001</span> para "Anillo...".
            </p>
          )}
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">Nombre *</label>
            <input
              value={form.nombre}
              onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
              placeholder="Anillo oro 18k con zafiro"
              className="w-full rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">Precio *</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.precioUnitario}
                onChange={(e) => setForm((f) => ({ ...f, precioUnitario: e.target.value }))}
                className="w-full rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">Stock</label>
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
                className="w-full rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Guardando...' : submitLabel}
          </Button>
        </form>
      </Card>
    </div>
  );
}
