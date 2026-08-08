import { useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Plus, ImagePlus, Gem, X, Pencil, Search, Trash2, RotateCcw, Loader2 } from 'lucide-react';
import { api, apiUrl } from '../../lib/api';
import { usePersistedState, limpiarBorrador } from '../../lib/usePersistedState';
import { formatMoney } from '../../lib/format';
import { coincideBusqueda } from '../../lib/search';
import { Button, Card, PageHeader, EmptyState, Badge } from '../../components/ui';
import { useAuthStore } from '../../store/auth.store';
import type { Material, Product } from '../../types';
import { MATERIAL_LABEL } from '../../types';

type ProductFormValues = {
  nombre: string;
  precioUnitario: string;
  costoUnitario: string;
  material: Material;
  stock: string;
  file: File | null;
};

/** Color de la insignia por material: el mismo lenguaje visual en toda la app y en el catalogo. */
const MATERIAL_COLOR: Record<Material, string> = {
  PLATA: 'bg-slate-500',
  ORO: 'bg-copper-500',
  GOLDFILLED: 'bg-copper-400',
  ACERO: 'bg-slate-400',
  OTRO: 'bg-espresso-700',
};

function buildFormData(values: ProductFormValues) {
  const formData = new FormData();
  formData.append('nombre', values.nombre.trim());
  formData.append('precioUnitario', String(Number(values.precioUnitario) || 0));
  formData.append('costoUnitario', String(Number(values.costoUnitario) || 0));
  formData.append('material', values.material);
  formData.append('stock', String(Number(values.stock) || 0));
  if (values.file) formData.append('file', values.file);
  return formData;
}

function margenPct(product: Product): number | null {
  if (product.costoUnitario === undefined || product.precioUnitario <= 0) return null;
  return ((product.precioUnitario - product.costoUnitario) / product.precioUnitario) * 100;
}

export default function Products() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const esAdmin = user?.role === 'ADMIN';
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [search, setSearch] = useState('');

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['products', 'all'],
    queryFn: async () => (await api.get('/products', { params: { all: true } })).data,
  });

  const filteredProducts = products.filter((product) => coincideBusqueda(`${product.nombre} ${product.sku}`, search));

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
      limpiarBorrador('productos:nuevo');
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
    onSuccess: (_data, variables) => {
      toast.success('Producto actualizado.');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      limpiarBorrador(`productos:editar:${variables.id}`);
      setEditing(null);
    },
  });

  /**
   * Dar de baja una pieza. En el backend es una baja logica (activo = false),
   * no un borrado real: las ventas viejas siguen apuntando al producto, asi
   * que borrarlo de verdad dejaria facturas historicas sin pieza. Deja de
   * venderse y sale del catalogo web, pero se puede reactivar.
   */
  const deleteProduct = useMutation({
    mutationFn: async (id: string) => (await api.delete(`/products/${id}`)).data,
    onSuccess: () => {
      toast.success('Pieza dada de baja. Ya no se vende ni sale en el catalogo web.');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setEditing(null);
    },
  });

  const restoreProduct = useMutation({
    mutationFn: async (id: string) => (await api.put(`/products/${id}`, { activo: true })).data,
    onSuccess: () => {
      toast.success('Pieza reactivada.');
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
            <Card key={product.id} className={`overflow-hidden ${product.activo ? '' : 'opacity-60'}`}>
              <button
                type="button"
                onClick={() => setEditing(product)}
                className="group relative flex h-36 w-full items-center justify-center bg-porcelain-200"
                title="Editar producto"
              >
                {/* Una pieza dada de baja sigue a la vista (para poder
                    reactivarla), pero tiene que distinguirse de un vistazo de
                    las que si estan a la venta. */}
                {!product.activo && (
                  <span className="absolute right-1.5 top-1.5 rounded-full bg-espresso-950/75 px-2 py-0.5 text-[10px] font-bold text-white">
                    Dada de baja
                  </span>
                )}
                {imageSrc(product) ? (
                  <img src={imageSrc(product)!} alt={product.nombre} className="h-full w-full object-cover" />
                ) : (
                  <Gem size={28} className="text-muted" />
                )}
                {/* Insignia de material en la esquina: para confirmar de un
                    vistazo que la pieza quedo con el material correcto,
                    sin tener que abrirla a revisar. */}
                <span
                  className={`absolute left-1.5 top-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${MATERIAL_COLOR[product.material]}`}
                >
                  {MATERIAL_LABEL[product.material]}
                </span>
                <span className="absolute inset-0 flex items-center justify-center bg-espresso-950/0 opacity-0 transition-opacity group-hover:bg-espresso-950/40 group-hover:opacity-100">
                  <Pencil size={20} className="text-white" />
                </span>
              </button>
              <div className="p-3">
                <p className="select-text font-mono text-[11px] font-semibold text-copper-600">{product.sku}</p>
                <p className="select-text truncate text-sm font-medium text-ink">{product.nombre}</p>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="font-display font-bold tabular-nums text-ink">
                    RD$ {formatMoney(product.precioUnitario)}
                  </span>
                  <span className="text-xs text-muted">Stock: {product.stock}</span>
                </div>
                {margenPct(product) !== null && (
                  <div className="mt-1.5">
                    <Badge tone={margenPct(product)! < 20 ? 'brick' : margenPct(product)! < 40 ? 'copper' : 'sage'}>
                      Margen {margenPct(product)!.toFixed(0)}%
                    </Badge>
                  </div>
                )}
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
          persistKey="productos:nuevo"
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
            costoUnitario: String(editing.costoUnitario ?? ''),
            material: editing.material ?? 'OTRO',
            stock: String(editing.stock),
            file: null,
          }}
          currentImage={imageSrc(editing)}
          persistKey={`productos:editar:${editing.id}`}
          onClose={() => setEditing(null)}
          onSubmit={(values) => updateProduct.mutate({ id: editing.id, values })}
          // Dar de baja / reactivar es solo de ADMIN, igual que en el backend
          // (@Roles(Role.ADMIN) en products.controller.ts).
          activo={editing.activo}
          onDelete={esAdmin ? () => deleteProduct.mutate(editing.id) : undefined}
          onRestore={esAdmin ? () => restoreProduct.mutate(editing.id) : undefined}
          bajaPendiente={deleteProduct.isPending || restoreProduct.isPending}
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
  persistKey,
  onClose,
  onSubmit,
  activo = true,
  onDelete,
  onRestore,
  bajaPendiente = false,
}: {
  title: string;
  submitLabel: string;
  isPending: boolean;
  initial?: ProductFormValues;
  currentImage?: string | null;
  persistKey: string;
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => void;
  activo?: boolean;
  /** Solo se pasa a un ADMIN: sin esto no se dibuja el boton. */
  onDelete?: () => void;
  onRestore?: () => void;
  bajaPendiente?: boolean;
}) {
  // Pide confirmar dentro del mismo modal en vez de un window.confirm: el
  // primer clic solo arma el boton, el segundo es el que da de baja.
  const [confirmandoBaja, setConfirmandoBaja] = useState(false);
  // Solo los campos de texto se guardan como borrador: un File no se puede
  // serializar, y aunque se pudiera, "recordar" un archivo que el usuario ya
  // no ve seleccionado seria mas confuso que util. La foto se vuelve a elegir.
  const { file: _initialFile, ...initialTexto } = initial ?? {
    nombre: '',
    precioUnitario: '',
    costoUnitario: '',
    material: 'OTRO' as Material,
    stock: '',
    file: null,
  };
  // El borrador persistido solo tiene sentido al CREAR: no hay "version del
  // servidor" que perder. Al EDITAR si se usara igual, abrir el mismo
  // producto de nuevo restauraria un borrador viejo (o vacio, si se cerro el
  // formulario a medio escribir) por encima de sus datos reales y actuales
  // -sin avisar-, y eso es lo que mandaba precio/costo/stock invalidos al
  // guardar. Al editar, useState arranca siempre desde el producto real.
  const persisted = usePersistedState(persistKey, initialTexto);
  const local = useState(initialTexto);
  const [texto, setTexto] = initial ? local : persisted;
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form: ProductFormValues = { ...texto, file };
  const setForm = (updater: (f: ProductFormValues) => ProductFormValues) => {
    const { file: nuevoFile, ...resto } = updater(form);
    setTexto(resto);
    if (nuevoFile !== file) setFile(nuevoFile);
  };

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.nombre.trim() || !Number(form.precioUnitario)) {
      toast.error('Completa el nombre y un precio valido.');
      return;
    }
    onSubmit(form);
  }

  function handleFile(nuevo: File | null) {
    setFile(nuevo);
    setPreview(nuevo ? URL.createObjectURL(nuevo) : null);
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
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
              Costo de adquisicion
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.costoUnitario}
              onChange={(e) => setForm((f) => ({ ...f, costoUnitario: e.target.value }))}
              placeholder="0.00"
              className="w-full rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
            />
            <p className="mt-1 text-[11px] text-muted">
              Solo lo ves tu (ADMIN). Se usa para calcular el margen en el apartado de Costos.
            </p>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">Material</label>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(MATERIAL_LABEL) as Material[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, material: m }))}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    form.material === m
                      ? `text-white ${MATERIAL_COLOR[m]}`
                      : 'bg-porcelain-200 text-muted hover:bg-porcelain-300'
                  }`}
                >
                  {MATERIAL_LABEL[m]}
                </button>
              ))}
            </div>
            <p className="mt-1 text-[11px] text-muted">
              Se usa para el filtro del catalogo web y la insignia sobre la foto.
            </p>
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Guardando...' : submitLabel}
          </Button>
        </form>

        {!activo && onRestore && (
          <div className="mt-4 border-t border-porcelain-200 pt-3">
            <p className="mb-2 text-xs text-muted">
              Esta pieza esta dada de baja: no se puede vender y no aparece en el catalogo web.
            </p>
            <Button variant="secondary" className="w-full" disabled={bajaPendiente} onClick={onRestore}>
              {bajaPendiente ? <Loader2 size={16} className="animate-spin" /> : <RotateCcw size={16} />}
              Reactivar pieza
            </Button>
          </div>
        )}

        {activo && onDelete && (
          <div className="mt-4 border-t border-porcelain-200 pt-3">
            {confirmandoBaja ? (
              <>
                <p className="mb-2 text-xs text-muted">
                  Deja de venderse y sale del catalogo web. Las facturas donde ya aparece no cambian, y puedes
                  reactivarla despues.
                </p>
                <div className="flex gap-2">
                  <Button variant="secondary" className="flex-1" onClick={() => setConfirmandoBaja(false)}>
                    Cancelar
                  </Button>
                  <Button variant="danger" className="flex-1" disabled={bajaPendiente} onClick={onDelete}>
                    {bajaPendiente ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    Si, dar de baja
                  </Button>
                </div>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmandoBaja(true)}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium text-brick-500 hover:bg-brick-100"
              >
                <Trash2 size={15} /> Eliminar pieza
              </button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
