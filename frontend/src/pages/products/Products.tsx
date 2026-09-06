import { useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Plus, ImagePlus, Gem, X, Pencil, Search, Trash2, RotateCcw, Loader2, Sparkles, ArrowRight, Tag, Check, Download } from 'lucide-react';
import { api, apiUrl } from '../../lib/api';
import { usePersistedState, limpiarBorrador } from '../../lib/usePersistedState';
import { formatMoney } from '../../lib/format';
import { coincideBusqueda } from '../../lib/search';
import { Button, Card, PageHeader, EmptyState, Badge, Select } from '../../components/ui';
import { useAuthStore } from '../../store/auth.store';
import type { Category, Material, Product } from '../../types';
import { MATERIAL_LABEL } from '../../types';

type ProductFormValues = {
  nombre: string;
  precioUnitario: string;
  costoUnitario: string;
  material: Material;
  stock: string;
  file: File | null;
};

interface GrupoDuplicado {
  nombre: string;
  precioUnitario: number;
  tamanoFotoBytes: number;
  mantiene: { id: string; sku: string };
  elimina: { id: string; sku: string }[];
}

interface VistaPreviaLimpieza {
  grupos: GrupoDuplicado[];
  sinFoto: { id: string; sku: string; nombre: string }[];
  totalABaja: number;
}

interface VistaPreviaEliminarDuplicados {
  grupos: GrupoDuplicado[];
  totalEliminables: number;
  omitidosPorVentas: { id: string; sku: string; nombre: string }[];
}

const PESTANAS: { valor: 'ACTIVOS' | 'BAJA'; texto: string }[] = [
  { valor: 'ACTIVOS', texto: 'Activos' },
  { valor: 'BAJA', texto: 'Dados de baja' },
];

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
  const [pestana, setPestana] = usePersistedState<'ACTIVOS' | 'BAJA'>('productos:pestana', 'ACTIVOS');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [showCategorias, setShowCategorias] = useState(false);
  // Seleccion multiple: para no tener que dar de baja/reactivar/eliminar
  // pieza por pieza cuando hay muchas. Se limpia sola al cambiar de pestaña
  // o al salir del modo, para no arrastrar una seleccion que ya no se ve.
  const [modoSeleccion, setModoSeleccion] = useState(false);
  const [seleccionados, setSeleccionados] = useState<Set<string>>(new Set());

  function cambiarPestana(valor: 'ACTIVOS' | 'BAJA') {
    setPestana(valor);
    setSeleccionados(new Set());
  }

  function toggleSeleccion(id: string) {
    setSeleccionados((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['products', 'all'],
    queryFn: async () => (await api.get('/products', { params: { all: true } })).data,
  });

  const { data: categorias = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => (await api.get('/categories')).data,
  });
  const categoriaPorId = new Map(categorias.map((c) => [c.id, c.nombre]));

  const productosPestana = products.filter((product) => product.activo === (pestana === 'ACTIVOS'));
  const filteredProducts = productosPestana
    .filter((product) => coincideBusqueda(`${product.nombre} ${product.sku}`, search))
    .filter((product) => !filtroCategoria || product.categoriaId === filtroCategoria);

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

  // "Limpiar duplicados": primero se pide una vista previa (que se daria de
  // baja) y solo se ejecuta si el usuario la confirma. Es baja logica igual
  // que el boton individual, asi que se puede deshacer pieza por pieza si
  // algo se marco de mas.
  const [vistaPrevia, setVistaPrevia] = useState<VistaPreviaLimpieza | null>(null);

  const cargarVistaPrevia = useMutation({
    mutationFn: async () => (await api.get('/products/duplicados/vista-previa')).data as VistaPreviaLimpieza,
    onSuccess: (data) => setVistaPrevia(data),
    onError: () => toast.error('No se pudo revisar los duplicados.'),
  });

  const limpiarDuplicados = useMutation({
    mutationFn: async () => (await api.post('/products/duplicados/limpiar')).data,
    onSuccess: (data) => {
      const total = data.bajaDuplicados + data.bajaSinFoto;
      toast.success(total > 0 ? `${total} piezas dadas de baja.` : 'Nada que limpiar.');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setVistaPrevia(null);
    },
    onError: () => toast.error('No se pudo completar la limpieza.'),
  });

  // "Eliminar duplicados" (solo en la pestaña de dados de baja): a diferencia
  // del boton de arriba, esto SI borra de verdad — es para recuperar espacio
  // de piezas repetidas que ya estaban dadas de baja. El backend se niega a
  // borrar cualquiera que tenga una venta encima (ver products.service.ts),
  // asi que nunca rompe una factura vieja.
  const [vistaPreviaEliminar, setVistaPreviaEliminar] = useState<VistaPreviaEliminarDuplicados | null>(null);

  const cargarVistaPreviaEliminar = useMutation({
    mutationFn: async () =>
      (await api.get('/products/duplicados/vista-previa-eliminar')).data as VistaPreviaEliminarDuplicados,
    onSuccess: (data) => setVistaPreviaEliminar(data),
    onError: () => toast.error('No se pudo revisar los duplicados.'),
  });

  const eliminarDuplicados = useMutation({
    mutationFn: async () => (await api.post('/products/duplicados/eliminar')).data,
    onSuccess: (data) => {
      toast.success(data.eliminados > 0 ? `${data.eliminados} piezas eliminadas.` : 'Nada que eliminar.');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setVistaPreviaEliminar(null);
    },
    onError: () => toast.error('No se pudo completar la eliminacion.'),
  });

  const bulkBaja = useMutation({
    mutationFn: async () => (await api.post('/products/bulk/baja', { ids: [...seleccionados] })).data,
    onSuccess: (data) => {
      toast.success(`${data.actualizados} piezas dadas de baja.`);
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setSeleccionados(new Set());
    },
    onError: () => toast.error('No se pudo completar la baja.'),
  });

  const bulkReactivar = useMutation({
    mutationFn: async () => (await api.post('/products/bulk/reactivar', { ids: [...seleccionados] })).data,
    onSuccess: (data) => {
      toast.success(`${data.actualizados} piezas reactivadas.`);
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setSeleccionados(new Set());
    },
    onError: () => toast.error('No se pudo reactivar.'),
  });

  const bulkEliminar = useMutation({
    mutationFn: async () => (await api.post('/products/bulk/eliminar', { ids: [...seleccionados] })).data,
    onSuccess: (data) => {
      toast.success(
        data.omitidosPorVentas > 0
          ? `${data.eliminados} eliminadas. ${data.omitidosPorVentas} no se pudieron (ya tienen ventas).`
          : `${data.eliminados} piezas eliminadas.`,
      );
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setSeleccionados(new Set());
    },
    onError: () => toast.error('No se pudo completar la eliminacion.'),
  });

  function imageSrc(product: Product) {
    if (!product.imageUrl) return null;
    return product.imageUrl.startsWith('http') ? product.imageUrl : apiUrl(product.imageUrl);
  }

  async function exportarCsv() {
    // Siempre el inventario completo (activos + dados de baja): mas
    // predecible que depender de en cual pestana se este parado al pulsar
    // el boton.
    const response = await api.get('/products/export', {
      params: { all: 'true' },
      responseType: 'blob',
    });
    const url = URL.createObjectURL(response.data as Blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'inventario.xlsx';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <PageHeader
        title="Productos"
        subtitle="Catalogo con codigo unico y foto por pieza"
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={exportarCsv}>
              <Download size={16} /> Exportar Excel
            </Button>
            <Button variant="secondary" onClick={() => setShowCategorias(true)}>
              <Tag size={16} /> Categorias
            </Button>
            {esAdmin && (
              <Button
                variant="secondary"
                onClick={() => cargarVistaPrevia.mutate()}
                disabled={cargarVistaPrevia.isPending}
              >
                <Sparkles size={16} /> {cargarVistaPrevia.isPending ? 'Revisando...' : 'Limpiar duplicados'}
              </Button>
            )}
            <Button onClick={() => setShowForm(true)}>
              <Plus size={16} /> Nuevo producto
            </Button>
          </div>
        }
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {PESTANAS.map((p) => (
            <button
              key={p.valor}
              onClick={() => cambiarPestana(p.valor)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                pestana === p.valor ? 'bg-espresso-700 text-white' : 'bg-porcelain-200 text-muted hover:bg-porcelain-300'
              }`}
            >
              {p.texto}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {esAdmin && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setModoSeleccion((v) => !v);
                setSeleccionados(new Set());
              }}
            >
              {modoSeleccion ? 'Cancelar seleccion' : 'Seleccionar varios'}
            </Button>
          )}
          {esAdmin && pestana === 'BAJA' && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => cargarVistaPreviaEliminar.mutate()}
              disabled={cargarVistaPreviaEliminar.isPending}
            >
              <Trash2 size={14} /> {cargarVistaPreviaEliminar.isPending ? 'Revisando...' : 'Eliminar duplicados'}
            </Button>
          )}
        </div>
      </div>

      {seleccionados.size > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2 rounded-lg border border-copper-300 bg-copper-50 px-3 py-2">
          <span className="text-sm font-semibold text-copper-700">{seleccionados.size} seleccionadas</span>
          <div className="ml-auto flex flex-wrap gap-1.5">
            {pestana === 'ACTIVOS' ? (
              <Button size="sm" variant="secondary" disabled={bulkBaja.isPending} onClick={() => bulkBaja.mutate()}>
                {bulkBaja.isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                Dar de baja
              </Button>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={bulkReactivar.isPending}
                  onClick={() => bulkReactivar.mutate()}
                >
                  {bulkReactivar.isPending ? <Loader2 size={14} className="animate-spin" /> : <RotateCcw size={14} />}
                  Reactivar
                </Button>
                <Button
                  size="sm"
                  className="!bg-brick-600 hover:!bg-brick-700"
                  disabled={bulkEliminar.isPending}
                  onClick={() => bulkEliminar.mutate()}
                >
                  {bulkEliminar.isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  Eliminar de verdad
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        <div className="relative max-w-sm flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o codigo..."
            className="w-full rounded-lg border border-porcelain-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-copper-500"
          />
        </div>
        {categorias.length > 0 && (
          <Select
            value={filtroCategoria}
            onChange={setFiltroCategoria}
            className="w-52"
            options={[
              { value: '', label: 'Todas las categorias' },
              ...categorias.map((c) => ({ value: c.id, label: c.nombre })),
            ]}
          />
        )}
      </div>

      {isLoading ? (
        <Card className="h-40 animate-pulse" />
      ) : productosPestana.length === 0 ? (
        <EmptyState
          title={pestana === 'ACTIVOS' ? 'Sin productos' : 'Sin piezas dadas de baja'}
          description={
            pestana === 'ACTIVOS'
              ? 'Registra tu primera pieza para empezar.'
              : 'Las piezas que des de baja apareceran aqui, y las puedes reactivar cuando quieras.'
          }
        />
      ) : filteredProducts.length === 0 ? (
        <EmptyState title="Sin resultados" description={`No hay productos que coincidan con "${search}".`} />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className={`overflow-hidden ${seleccionados.has(product.id) ? 'ring-2 ring-copper-500' : ''}`}
            >
              <div className="group relative flex h-36 w-full items-center justify-center bg-porcelain-200">
                <button
                  type="button"
                  onClick={() => (modoSeleccion ? toggleSeleccion(product.id) : setEditing(product))}
                  className="absolute inset-0 flex items-center justify-center"
                  title={modoSeleccion ? 'Marcar / desmarcar' : 'Editar producto'}
                >
                  {imageSrc(product) ? (
                    <img src={imageSrc(product)!} alt={product.nombre} className="h-full w-full object-cover" />
                  ) : (
                    <Gem size={28} className="text-muted" />
                  )}
                  <span className="absolute inset-0 flex items-center justify-center bg-espresso-950/0 opacity-0 transition-opacity group-hover:bg-espresso-950/40 group-hover:opacity-100">
                    {modoSeleccion ? (
                      <Check size={20} className="text-white" />
                    ) : (
                      <Pencil size={20} className="text-white" />
                    )}
                  </span>
                </button>
                {/* Insignia de material en la esquina: para confirmar de un
                    vistazo que la pieza quedo con el material correcto,
                    sin tener que abrirla a revisar. */}
                <span
                  className={`pointer-events-none absolute left-1.5 top-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${MATERIAL_COLOR[product.material]}`}
                >
                  {MATERIAL_LABEL[product.material]}
                </span>
                {/* En modo "Seleccionar varios": indicador de marcada (no es un
                    boton aparte — toda la tarjeta marca/desmarca al pulsarla,
                    asi no hay dos zonas de clic encimadas). */}
                {modoSeleccion && (
                  <span
                    className={`pointer-events-none absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      seleccionados.has(product.id)
                        ? 'border-copper-600 bg-copper-600 text-white'
                        : 'border-white bg-black/25 text-white'
                    }`}
                  >
                    {seleccionados.has(product.id) && <Check size={13} strokeWidth={3} />}
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="select-text font-mono text-[11px] font-semibold text-copper-600">{product.sku}</p>
                <p className="select-text truncate text-sm font-medium text-ink">{product.nombre}</p>
                {product.categoriaId && categoriaPorId.get(product.categoriaId) && (
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted">
                    <Tag size={10} /> {categoriaPorId.get(product.categoriaId)}
                  </p>
                )}
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

      {vistaPrevia && (
        <LimpiarDuplicadosModal
          vistaPrevia={vistaPrevia}
          onCancel={() => setVistaPrevia(null)}
          onConfirm={() => limpiarDuplicados.mutate()}
          confirmando={limpiarDuplicados.isPending}
        />
      )}

      {vistaPreviaEliminar && (
        <EliminarDuplicadosModal
          vistaPrevia={vistaPreviaEliminar}
          onCancel={() => setVistaPreviaEliminar(null)}
          onConfirm={() => eliminarDuplicados.mutate()}
          confirmando={eliminarDuplicados.isPending}
        />
      )}

      {showCategorias && (
        <CategoriasModal categorias={categorias} esAdmin={esAdmin} onClose={() => setShowCategorias(false)} />
      )}
    </div>
  );
}

/**
 * Confirmacion antes de dar de baja duplicados y piezas sin foto.
 *
 * Es baja logica (reversible pieza por pieza desde Productos), pero puede
 * afectar muchas piezas de una sola vez, asi que primero se muestra QUE se
 * va a marcar en vez de ejecutarlo directo al pulsar el boton.
 */
function LimpiarDuplicadosModal({
  vistaPrevia,
  onCancel,
  onConfirm,
  confirmando,
}: {
  vistaPrevia: VistaPreviaLimpieza;
  onCancel: () => void;
  onConfirm: () => void;
  confirmando: boolean;
}) {
  const totalRepetidas = vistaPrevia.grupos.reduce((sum, g) => sum + g.elimina.length, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <Card className="flex max-h-[85vh] w-full max-w-lg flex-col p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-muted">
            <Sparkles size={16} /> Limpiar duplicados
          </h3>
          <button type="button" onClick={onCancel} className="rounded p-1 text-muted hover:bg-porcelain-100">
            <X size={16} />
          </button>
        </div>

        {vistaPrevia.totalABaja === 0 ? (
          <p className="text-sm text-muted">
            No se encontraron piezas repetidas ni sin foto. Tu catalogo esta limpio.
          </p>
        ) : (
          <>
            <p className="mb-1 text-sm text-ink">
              Se van a dar de baja <strong>{vistaPrevia.totalABaja}</strong> piezas:{' '}
              {totalRepetidas > 0 && (
                <>
                  <strong>{totalRepetidas}</strong> repetidas (mismo nombre, precio y tamaño de foto)
                  {vistaPrevia.sinFoto.length > 0 && ' y '}
                </>
              )}
              {vistaPrevia.sinFoto.length > 0 && (
                <>
                  <strong>{vistaPrevia.sinFoto.length}</strong> sin foto
                </>
              )}
              .
            </p>
            <p className="mb-3 text-xs text-muted">
              Es baja logica, no un borrado: dejan de venderse y salen del catalogo web, pero se pueden
              reactivar despues, una por una, desde Productos.
            </p>

            <div className="flex-1 overflow-y-auto rounded-lg border border-porcelain-200">
              {vistaPrevia.grupos.map((g, i) => (
                <div key={i} className="border-b border-porcelain-100 px-3 py-2 text-xs last:border-b-0">
                  <p className="font-medium text-ink">
                    {g.nombre} · RD$ {g.precioUnitario.toLocaleString('es-DO')}
                  </p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-1 text-muted">
                    <span className="rounded bg-sage-100 px-1.5 py-0.5 font-mono text-sage-700">
                      {g.mantiene.sku}
                    </span>
                    se conserva
                    {g.elimina.map((p) => (
                      <span key={p.id} className="flex items-center gap-1">
                        <ArrowRight size={10} />
                        <span className="rounded bg-brick-100 px-1.5 py-0.5 font-mono text-brick-600">{p.sku}</span>
                      </span>
                    ))}
                  </p>
                </div>
              ))}
              {vistaPrevia.sinFoto.length > 0 && (
                <div className="px-3 py-2 text-xs">
                  <p className="mb-1 font-medium text-ink">Sin foto:</p>
                  <p className="flex flex-wrap gap-1">
                    {vistaPrevia.sinFoto.map((p) => (
                      <span key={p.id} className="rounded bg-brick-100 px-1.5 py-0.5 font-mono text-brick-600">
                        {p.sku}
                      </span>
                    ))}
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={onCancel}>
            {vistaPrevia.totalABaja === 0 ? 'Cerrar' : 'Cancelar'}
          </Button>
          {vistaPrevia.totalABaja > 0 && (
            <Button
              size="sm"
              className="!bg-brick-600 hover:!bg-brick-700"
              disabled={confirmando}
              onClick={onConfirm}
            >
              {confirmando ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
              Dar de baja {vistaPrevia.totalABaja} piezas
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

/**
 * Confirmacion antes de ELIMINAR de verdad (no baja logica) los duplicados
 * que ya estaban dados de baja. Solo aparece en esa pestaña: es para
 * recuperar el espacio que ocupan, no para retirarlas de la venta (eso ya
 * paso). El backend nunca borra una pieza que tenga una venta encima —
 * esas se listan aparte para que quede claro por que no se pudieron quitar.
 */
function EliminarDuplicadosModal({
  vistaPrevia,
  onCancel,
  onConfirm,
  confirmando,
}: {
  vistaPrevia: VistaPreviaEliminarDuplicados;
  onCancel: () => void;
  onConfirm: () => void;
  confirmando: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <Card className="flex max-h-[85vh] w-full max-w-lg flex-col p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-muted">
            <Trash2 size={16} /> Eliminar duplicados
          </h3>
          <button type="button" onClick={onCancel} className="rounded p-1 text-muted hover:bg-porcelain-100">
            <X size={16} />
          </button>
        </div>

        {vistaPrevia.totalEliminables === 0 && vistaPrevia.omitidosPorVentas.length === 0 ? (
          <p className="text-sm text-muted">No se encontraron piezas duplicadas entre las dadas de baja.</p>
        ) : (
          <>
            {vistaPrevia.totalEliminables > 0 && (
              <p className="mb-1 text-sm text-ink">
                Se van a <strong>eliminar de verdad</strong> <strong>{vistaPrevia.totalEliminables}</strong> piezas
                repetidas (mismo nombre y precio, y la misma foto o ninguna de las dos con foto).
              </p>
            )}
            <p className="mb-3 text-xs text-brick-600">
              Esto NO se puede deshacer, a diferencia de "dar de baja". Solo se borran piezas que nunca se
              vendieron.
            </p>

            <div className="flex-1 overflow-y-auto rounded-lg border border-porcelain-200">
              {vistaPrevia.grupos.map((g, i) => (
                <div key={i} className="border-b border-porcelain-100 px-3 py-2 text-xs last:border-b-0">
                  <p className="font-medium text-ink">
                    {g.nombre} · RD$ {g.precioUnitario.toLocaleString('es-DO')}
                  </p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-1 text-muted">
                    <span className="rounded bg-sage-100 px-1.5 py-0.5 font-mono text-sage-700">
                      {g.mantiene.sku}
                    </span>
                    se conserva
                    {g.elimina.map((p) => (
                      <span key={p.id} className="flex items-center gap-1">
                        <ArrowRight size={10} />
                        <span className="rounded bg-brick-100 px-1.5 py-0.5 font-mono text-brick-600">{p.sku}</span>
                      </span>
                    ))}
                  </p>
                </div>
              ))}
              {vistaPrevia.omitidosPorVentas.length > 0 && (
                <div className="px-3 py-2 text-xs">
                  <p className="mb-1 font-medium text-ink">
                    No se pueden eliminar (ya tienen una venta registrada):
                  </p>
                  <p className="flex flex-wrap gap-1">
                    {vistaPrevia.omitidosPorVentas.map((p) => (
                      <span key={p.id} className="rounded bg-porcelain-200 px-1.5 py-0.5 font-mono text-muted">
                        {p.sku}
                      </span>
                    ))}
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={onCancel}>
            {vistaPrevia.totalEliminables === 0 ? 'Cerrar' : 'Cancelar'}
          </Button>
          {vistaPrevia.totalEliminables > 0 && (
            <Button
              size="sm"
              className="!bg-brick-600 hover:!bg-brick-700"
              disabled={confirmando}
              onClick={onConfirm}
            >
              {confirmando ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
              Eliminar {vistaPrevia.totalEliminables} piezas
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

/**
 * Administrar categorias: crear nuevas y borrar las que ya no hagan falta.
 * Borrar una no borra los productos, solo los deja sin categoria (ver
 * CategoriesService.remove() en el backend).
 */
function CategoriasModal({
  categorias,
  esAdmin,
  onClose,
}: {
  categorias: Category[];
  esAdmin: boolean;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [nombre, setNombre] = useState('');

  const crear = useMutation({
    mutationFn: async () => (await api.post('/categories', { nombre }, { skipErrorToast: true })).data,
    onSuccess: () => {
      toast.success('Categoria creada.');
      setNombre('');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? 'No se pudo crear la categoria.');
    },
  });

  const eliminar = useMutation({
    mutationFn: async (id: string) => (await api.delete(`/categories/${id}`)).data,
    onSuccess: () => {
      toast.success('Categoria eliminada.');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <Card className="w-full max-w-sm p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-muted">
            <Tag size={16} /> Categorias de joyas
          </h3>
          <button type="button" onClick={onClose} className="rounded p-1 text-muted hover:bg-porcelain-100">
            <X size={16} />
          </button>
        </div>

        <p className="mb-3 text-xs text-muted">
          Cada pieza se clasifica sola: si la primera palabra de su nombre coincide exacto con una categoria
          (ej. "Anillo solitario..." con la categoria "Anillo"), se le asigna automaticamente.
        </p>

        <div className="mb-3 max-h-52 divide-y divide-porcelain-200 overflow-y-auto rounded-lg border border-porcelain-200">
          {categorias.length === 0 ? (
            <p className="px-3 py-3 text-sm text-muted">Todavia no hay categorias.</p>
          ) : (
            categorias.map((c) => (
              <div key={c.id} className="flex items-center justify-between px-3 py-2 text-sm">
                <span className="text-ink">{c.nombre}</span>
                {esAdmin && (
                  <button
                    type="button"
                    onClick={() => eliminar.mutate(c.id)}
                    disabled={eliminar.isPending}
                    className="rounded p-1 text-muted hover:bg-brick-100 hover:text-brick-600"
                    title="Eliminar categoria"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (nombre.trim()) crear.mutate();
          }}
          className="flex gap-2"
        >
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de la categoria..."
            className="flex-1 rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
          />
          <Button type="submit" size="sm" disabled={!nombre.trim() || crear.isPending}>
            <Plus size={14} />
          </Button>
        </form>
      </Card>
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
