import { useEffect, useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CheckCircle2, XCircle, Save, UserPlus, DatabaseBackup, Play, ShieldCheck, RotateCcw, AlertTriangle, Image as ImageIcon, Globe, UploadCloud, ArrowRight } from 'lucide-react';
import { api, apiUrl } from '../../lib/api';
import { Button, Card, PageHeader } from '../../components/ui';
import { formatDateTime } from '../../lib/format';
import type { BusinessProfile, Role } from '../../types';

/** Cuantos registros trae un respaldo (lo calcula el backend al generarlo). */
interface BackupContenido {
  productos: number;
  clientes: number;
  ventas: number;
  facturas: number;
  deudas: number;
  gastos: number;
  pedidos: number;
  usuarios: number;
}

interface BackupFile {
  name: string;
  sizeBytes: number;
  createdAt: string;
  /** Si se encontro en esta computadora o en la copia de OneDrive. */
  origen: 'local' | 'nube';
  contenido: BackupContenido | null;
}

interface BackupsStatus {
  lastRun: string | null;
  intervalDays: number;
  retentionDays: number;
  copiaEnNube: boolean;
  files: BackupFile[];
}

interface IntegrationsStatus {
  whatsapp: boolean;
}

interface AppUser {
  id: string;
  nombre: string;
  email: string;
  role: Role;
  activo: boolean;
}

export default function Settings() {
  const queryClient = useQueryClient();

  const { data: profile } = useQuery<BusinessProfile>({
    queryKey: ['settings', 'business-profile'],
    queryFn: async () => (await api.get('/settings/business-profile')).data,
  });

  const { data: integrations } = useQuery<IntegrationsStatus>({
    queryKey: ['settings', 'integrations'],
    queryFn: async () => (await api.get('/settings/integrations-status')).data,
  });

  const { data: users = [] } = useQuery<AppUser[]>({
    queryKey: ['users'],
    queryFn: async () => (await api.get('/users')).data,
  });

  const [form, setForm] = useState({
    nombre: '',
    direccion: '',
    identifFiscal: '',
    tasaImpuesto: '0.18',
    telefonoWhatsapp: '',
    descripcionWeb: '',
    relevoPedidosUrl: '',
    relevoPedidosClave: '',
  });

  useEffect(() => {
    if (profile) {
      setForm({
        nombre: profile.nombre,
        direccion: profile.direccion ?? '',
        identifFiscal: profile.identifFiscal ?? '',
        tasaImpuesto: String(profile.tasaImpuesto),
        telefonoWhatsapp: profile.telefonoWhatsapp ?? '',
        descripcionWeb: profile.descripcionWeb ?? '',
        relevoPedidosUrl: profile.relevoPedidosUrl ?? '',
        relevoPedidosClave: profile.relevoPedidosClave ?? '',
      });
    }
  }, [profile]);

  const updateProfile = useMutation({
    mutationFn: async () =>
      (
        await api.put('/settings/business-profile', {
          ...form,
          tasaImpuesto: Number(form.tasaImpuesto),
        })
      ).data,
    onSuccess: () => {
      toast.success('Datos del negocio actualizados.');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });

  const uploadLogo = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return (await api.post('/settings/business-profile/logo', formData, { skipErrorToast: true })).data;
    },
    onSuccess: () => {
      toast.success('Icono del negocio actualizado.');
      queryClient.invalidateQueries({ queryKey: ['settings', 'business-profile'] });
    },
    onError: () => toast.error('No se pudo subir el icono. Intenta con una imagen mas liviana.'),
  });

  const { data: backups } = useQuery<BackupsStatus>({
    queryKey: ['settings', 'backups'],
    queryFn: async () => (await api.get('/backups')).data,
    refetchInterval: 15000,
  });

  const runBackup = useMutation({
    mutationFn: async () => (await api.post('/backups/run')).data,
    onSuccess: (data) => {
      if (data.ok) {
        toast.success('Respaldo generado correctamente.');
      } else {
        toast.error(data.error || 'No se pudo generar el respaldo.');
      }
      queryClient.invalidateQueries({ queryKey: ['settings', 'backups'] });
    },
  });

  const [restoreTarget, setRestoreTarget] = useState<string | null>(null);
  const restoreBackup = useMutation({
    mutationFn: async (fileName: string) =>
      (await api.post('/backups/restore', { fileName }, { skipErrorToast: true })).data,
    onSuccess: (data) => {
      if (data.ok) {
        toast.success(
          data.restoredUploads
            ? 'Restauracion completada (base de datos y archivos).'
            : 'Restauracion completada (base de datos).',
        );
      } else {
        toast.error(data.error || 'No se pudo restaurar ese respaldo.');
      }
      setRestoreTarget(null);
    },
    onError: () => {
      toast.error('No se pudo restaurar ese respaldo.');
      setRestoreTarget(null);
    },
  });

  const createUser = useMutation({
    mutationFn: async (payload: { nombre: string; email: string; password: string; role: Role }) =>
      (await api.post('/auth/register', payload)).data,
    onSuccess: () => {
      toast.success('Usuario creado.');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return (
    <div>
      <PageHeader title="Configuracion" subtitle="Datos del negocio, integraciones y usuarios" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
        <Card className="p-5">
          <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-muted">
            Datos del negocio
          </h2>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
                Icono del negocio
              </label>
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-porcelain-300 bg-porcelain-100">
                  {profile?.logoUrl ? (
                    <img
                      src={profile.logoUrl.startsWith('http') ? profile.logoUrl : apiUrl(profile.logoUrl)}
                      alt="Icono actual"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImageIcon size={20} className="text-muted" />
                  )}
                </div>
                <label className="cursor-pointer rounded-lg border border-porcelain-300 px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-copper-400 hover:text-copper-600">
                  {uploadLogo.isPending ? 'Subiendo...' : 'Cambiar icono'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadLogo.isPending}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) uploadLogo.mutate(file);
                      e.target.value = '';
                    }}
                  />
                </label>
              </div>
            </div>
            <Field label="Nombre" value={form.nombre} onChange={(v) => setForm((f) => ({ ...f, nombre: v }))} />
            <Field label="Direccion" value={form.direccion} onChange={(v) => setForm((f) => ({ ...f, direccion: v }))} />
            <Field
              label="RNC / ID fiscal"
              value={form.identifFiscal}
              onChange={(v) => setForm((f) => ({ ...f, identifFiscal: v }))}
            />
            <Field
              label="Tasa de impuesto (0.18 = 18%)"
              type="number"
              value={form.tasaImpuesto}
              onChange={(v) => setForm((f) => ({ ...f, tasaImpuesto: v }))}
            />
            <Button onClick={() => updateProfile.mutate()} disabled={updateProfile.isPending}>
              <Save size={16} /> Guardar cambios
            </Button>
          </div>
        </Card>

          <Card className="p-5">
            <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-muted">
              Integraciones
            </h2>
            <IntegrationRow label="WhatsApp (Agente Desktop)" ok={Boolean(integrations?.whatsapp)} />
          </Card>

          <Card className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-muted">
                <DatabaseBackup size={15} /> Respaldos automaticos
              </h2>
              <Button size="sm" variant="secondary" onClick={() => runBackup.mutate()} disabled={runBackup.isPending}>
                <Play size={13} /> {runBackup.isPending ? 'Generando...' : 'Respaldar ahora'}
              </Button>
            </div>
            <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-lg bg-porcelain-100 p-2.5">
                <p className="text-[10px] uppercase tracking-wide text-muted">Ultimo respaldo</p>
                <p className="font-medium text-ink">
                  {backups?.lastRun ? formatDateTime(backups.lastRun) : 'Aun no se ha ejecutado'}
                </p>
              </div>
              <div className="rounded-lg bg-porcelain-100 p-2.5">
                <p className="text-[10px] uppercase tracking-wide text-muted">Frecuencia</p>
                <p className="font-medium text-ink">
                  Cada {backups?.intervalDays ?? 3} dias &middot; se conservan {backups?.retentionDays ?? 30} dias
                </p>
              </div>
            </div>
            <p className="mb-3 flex items-center gap-1.5 text-xs font-medium text-sage-600">
              <ShieldCheck size={13} /> Se guarda solo en disco local — nunca en el bucket S3/R2 (ese es público).
            </p>
            <p className="mt-1 mb-3 text-xs text-muted">
              {backups?.copiaEnNube
                ? 'Cada respaldo se copia tambien a tu OneDrive, para que sobreviva si esta computadora falla. Abajo se listan los de ambos lugares.'
                : 'Los respaldos se guardan solo en esta computadora: no se detecto OneDrive para hacer una copia fuera de ella.'}
            </p>
            {backups?.files && backups.files.length > 0 ? (
              <div className="max-h-64 divide-y divide-porcelain-200 overflow-y-auto rounded-lg border border-porcelain-200">
                {backups.files.slice(0, 10).map((f) => (
                  <div key={f.name} className="px-3 py-2 text-xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-ink">
                        {f.name.startsWith('db-') ? 'Base de datos' : 'Fotos y facturas'}
                        {' · '}
                        {formatDateTime(f.createdAt)}
                      </span>
                      <div className="flex shrink-0 items-center gap-2">
                        {/* De donde salio: importa para saber si se puede
                            restaurar aunque el disco se haya perdido. */}
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            f.origen === 'nube' ? 'bg-sage-100 text-sage-700' : 'bg-porcelain-200 text-muted'
                          }`}
                        >
                          {f.origen === 'nube' ? 'OneDrive' : 'Esta PC'}
                        </span>
                        <span className="text-muted">{(f.sizeBytes / 1024 / 1024).toFixed(1)} MB</span>
                        {/* Solo se ofrece restaurar lo que esta version sabe
                            leer. Los ".sql.gz" son de cuando la base era
                            PostgreSQL: ofrecer el boton y que fallara al
                            pulsarlo, justo en una emergencia, seria peor que
                            no ofrecerlo. */}
                        {f.name.endsWith('.sqlite.gz') && (
                          <button
                            onClick={() => setRestoreTarget(f.name)}
                            className="flex items-center gap-1 rounded-md border border-porcelain-300 px-1.5 py-0.5 text-[11px] font-semibold text-muted transition-colors hover:border-brick-400 hover:text-brick-600"
                          >
                            <RotateCcw size={11} /> Restaurar
                          </button>
                        )}
                        {f.name.startsWith('db-') && !f.name.endsWith('.sqlite.gz') && (
                          <span className="text-[10px] italic text-muted">formato anterior</span>
                        )}
                      </div>
                    </div>
                    {/* Que hay dentro, para no tener que adivinar por el nombre
                        del archivo si el respaldo trae el inventario y los
                        clientes. */}
                    {f.contenido && (
                      <p className="mt-0.5 text-[11px] text-muted">
                        {f.contenido.productos.toLocaleString('es-DO')} productos ·{' '}
                        {f.contenido.clientes.toLocaleString('es-DO')} clientes ·{' '}
                        {f.contenido.ventas.toLocaleString('es-DO')} ventas ·{' '}
                        {f.contenido.facturas.toLocaleString('es-DO')} facturas
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted">Sin respaldos generados todavia.</p>
            )}
          </Card>

          <AgregarDatos />

          {restoreTarget && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
              <Card className="w-full max-w-sm p-5">
                <h3 className="mb-2 flex items-center gap-2 font-display text-sm font-bold text-brick-600">
                  <AlertTriangle size={16} /> Restaurar respaldo
                </h3>
                <p className="mb-1 text-sm text-ink">
                  Vas a restaurar el punto <span className="font-mono text-xs">{restoreTarget}</span>.
                </p>
                <p className="mb-4 text-xs text-muted">
                  Esto reemplaza los datos actuales (ventas, clientes, productos) por los del respaldo. No se puede
                  deshacer. Si quieres conservar lo que hay ahora, genera un respaldo antes de continuar.
                </p>
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" size="sm" onClick={() => setRestoreTarget(null)}>
                    Cancelar
                  </Button>
                  <Button
                    size="sm"
                    className="!bg-brick-600 hover:!bg-brick-700"
                    disabled={restoreBackup.isPending}
                    onClick={() => restoreBackup.mutate(restoreTarget)}
                  >
                    {restoreBackup.isPending ? 'Restaurando...' : 'Si, restaurar'}
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-sm font-bold uppercase tracking-wide text-muted">
                Usuarios y roles
              </h2>
            </div>
            <div className="mb-3 divide-y divide-porcelain-200">
              {users.map((u) => (
                <div key={u.id} className="flex items-center justify-between py-2 text-sm">
                  <div>
                    <p className="text-ink">{u.nombre}</p>
                    <p className="text-xs text-muted">{u.email}</p>
                  </div>
                  <span className="rounded-full bg-porcelain-200 px-2 py-0.5 text-xs font-semibold text-muted">
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
            <NewUserForm onSubmit={(payload) => createUser.mutate(payload)} />
          </Card>

          <CatalogoWeb
            telefonoWhatsapp={form.telefonoWhatsapp}
            descripcionWeb={form.descripcionWeb}
            relevoPedidosUrl={form.relevoPedidosUrl}
            relevoPedidosClave={form.relevoPedidosClave}
            onChange={(campo, valor) => setForm((f) => ({ ...f, [campo]: valor }))}
            onGuardar={() => updateProfile.mutate()}
            guardando={updateProfile.isPending}
          />

          <CambiarClave />
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">{label}</label>
      <input
        type={type}
        step={type === 'number' ? '0.01' : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
      />
    </div>
  );
}

function IntegrationRow({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-ink">{label}</span>
      {ok ? (
        <span className="flex items-center gap-1 text-sage-600">
          <CheckCircle2 size={15} /> Configurado
        </span>
      ) : (
        <span className="flex items-center gap-1 text-brick-500">
          <XCircle size={15} /> No configurado
        </span>
      )}
    </div>
  );
}

/**
 * Catalogo web: datos que solo usa el sitio publico y el boton que lo genera.
 *
 * El sitio se entrega como una carpeta lista para subir en vez de publicarse
 * solo: publicar exige una cuenta de hosting y sus credenciales, y no tiene
 * sentido pedirle eso al programa cuando arrastrar una carpeta al navegador
 * toma diez segundos y no compromete ninguna contraseña.
 */
function CatalogoWeb({
  telefonoWhatsapp,
  descripcionWeb,
  relevoPedidosUrl,
  relevoPedidosClave,
  onChange,
  onGuardar,
  guardando,
}: {
  telefonoWhatsapp: string;
  descripcionWeb: string;
  relevoPedidosUrl: string;
  relevoPedidosClave: string;
  onChange: (
    campo: 'telefonoWhatsapp' | 'descripcionWeb' | 'relevoPedidosUrl' | 'relevoPedidosClave',
    valor: string,
  ) => void;
  onGuardar: () => void;
  guardando: boolean;
}) {
  const [resultado, setResultado] = useState<{
    carpeta: string;
    productos: number;
    excluidasSinFoto: number;
    excluidasSinPrecio: number;
  } | null>(null);

  const generar = useMutation({
    mutationFn: async () => (await api.post('/catalogo/generar', undefined, { skipErrorToast: true })).data,
    onSuccess: (data) => {
      if (data.ok) {
        setResultado({
          carpeta: data.carpeta,
          productos: data.productos,
          excluidasSinFoto: data.excluidasSinFoto ?? 0,
          excluidasSinPrecio: data.excluidasSinPrecio ?? 0,
        });
        toast.success(`Catalogo generado con ${data.productos} piezas.`);
      } else {
        toast.error(data.error || 'No se pudo generar el catalogo.');
      }
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message ?? 'No se pudo generar el catalogo.';
      toast.error(Array.isArray(msg) ? msg.join(' ') : msg);
    },
  });

  return (
    <Card className="p-5">
      <h2 className="mb-1 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-muted">
        <Globe size={15} /> Catalogo web
      </h2>
      <p className="mb-3 text-xs text-muted">
        Genera una pagina publica con tus piezas. Los clientes arman su pedido y te llega por WhatsApp;
        el cobro lo coordinas tu por transferencia.
      </p>

      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
            WhatsApp para pedidos *
          </label>
          <input
            value={telefonoWhatsapp}
            onChange={(e) => onChange('telefonoWhatsapp', e.target.value)}
            placeholder="+1 809 555 1234"
            className="w-full rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
            Frase del negocio
          </label>
          <input
            value={descripcionWeb}
            onChange={(e) => onChange('descripcionWeb', e.target.value)}
            placeholder="Joyeria fina · Envios a todo el pais"
            className="w-full rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
          />
        </div>

        <div className="border-t border-porcelain-200 pt-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
            Pedidos web automaticos (opcional)
          </p>
          <p className="mb-2 text-xs text-muted">
            Sin esto, los pedidos siguen llegando por WhatsApp igual — solo hay que pegar el mensaje en
            Pedidos web. Con esto puesto, la app los revisa y los crea sola cada pocos minutos.
          </p>
          <div className="space-y-2">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
                URL del relevo
              </label>
              <input
                value={relevoPedidosUrl}
                onChange={(e) => onChange('relevoPedidosUrl', e.target.value)}
                placeholder="https://cafe-shopping-pedidos.tu-usuario.workers.dev"
                className="w-full rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
                Clave secreta del relevo
              </label>
              <input
                type="password"
                value={relevoPedidosClave}
                onChange={(e) => onChange('relevoPedidosClave', e.target.value)}
                placeholder="La misma que pusiste en Cloudflare"
                className="w-full rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={onGuardar} disabled={guardando}>
            <Save size={15} /> Guardar datos
          </Button>
          <Button onClick={() => generar.mutate()} disabled={generar.isPending || !telefonoWhatsapp.trim()}>
            <Globe size={15} /> {generar.isPending ? 'Generando...' : 'Generar catalogo'}
          </Button>
        </div>

        {resultado && (
          <div className="rounded-lg bg-sage-100 p-3 text-xs text-sage-700">
            <p className="font-semibold">Catalogo listo con {resultado.productos} piezas.</p>
            <p className="mt-1 break-all">
              Carpeta: <code>{resultado.carpeta}</code>
            </p>
            <p className="mt-2">
              Para ponerlo en linea gratis: entra a <strong>app.netlify.com/drop</strong> y arrastra esa
              carpeta completa a la pagina. Te dara una direccion al instante.
            </p>
            {(resultado.excluidasSinFoto > 0 || resultado.excluidasSinPrecio > 0) && (
              <p className="mt-2 border-t border-sage-600/20 pt-2 text-brick-600">
                Quedaron fuera{' '}
                {resultado.excluidasSinFoto > 0 && (
                  <strong>{resultado.excluidasSinFoto} piezas sin foto</strong>
                )}
                {resultado.excluidasSinFoto > 0 && resultado.excluidasSinPrecio > 0 && ' y '}
                {resultado.excluidasSinPrecio > 0 && (
                  <strong>{resultado.excluidasSinPrecio} sin precio</strong>
                )}
                . Completalas en Productos y vuelve a generar para incluirlas.
              </p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

/**
 * Une el inventario de OTRA computadora (ej. la de mama) con el de esta,
 * a partir de un respaldo .sqlite.gz generado alli en Respaldos automaticos.
 *
 * Solo trae productos: nunca toca lo que ya existe en esta base, solo agrega
 * lo que venga de afuera (renumerando el SKU si ya estaba en uso aqui).
 */
function AgregarDatos() {
  const queryClient = useQueryClient();
  const [archivo, setArchivo] = useState<File | null>(null);
  const [archivoFotos, setArchivoFotos] = useState<File | null>(null);
  const [resultado, setResultado] = useState<{
    total: number;
    agregados: number;
    omitidos: number;
    conFoto: number;
    renumerados: { nombre: string; skuOriginal: string; skuNuevo: string }[];
  } | null>(null);

  const importar = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append('file', archivo!);
      if (archivoFotos) formData.append('fotos', archivoFotos);
      return (await api.post('/data-import/productos', formData, { skipErrorToast: true })).data;
    },
    onSuccess: (data) => {
      setResultado(data);
      setArchivo(null);
      setArchivoFotos(null);
      toast.success(`Listo: ${data.agregados + data.renumerados.length} productos agregados.`);
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message ?? 'No se pudo importar ese archivo.';
      toast.error(Array.isArray(msg) ? msg.join(' ') : msg);
    },
  });

  return (
    <Card className="p-5">
      <h2 className="mb-1 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-muted">
        <UploadCloud size={15} /> Añadir datos
      </h2>
      <p className="mb-3 text-xs text-muted">
        Si tu y otra persona (ej. mama) trabajan cada quien en su propia computadora, usa esto para
        traer el inventario de la otra hacia esta. Lo que ya existe aqui no se toca — solo se agrega
        lo nuevo, y si un codigo se repite se le pone uno nuevo automaticamente.
      </p>

      <div className="space-y-2">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
            Base de datos (obligatorio)
          </label>
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-porcelain-300 px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-copper-400 hover:text-copper-600">
            {archivo ? archivo.name : 'Elegir archivo .sqlite.gz...'}
            <input
              type="file"
              accept=".gz,.sqlite,.db"
              className="hidden"
              disabled={importar.isPending}
              onChange={(e) => {
                const file = e.target.files?.[0];
                setArchivo(file ?? null);
                setResultado(null);
              }}
            />
          </label>
          <p className="mt-1 text-[11px] text-muted">
            El archivo <code>db-....sqlite.gz</code> que se genera en <strong>Respaldos automaticos</strong>{' '}
            de la OTRA computadora.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
            Fotos de los productos (opcional)
          </label>
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-porcelain-300 px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-copper-400 hover:text-copper-600">
            {archivoFotos ? archivoFotos.name : 'Elegir archivo .tar.gz...'}
            <input
              type="file"
              accept=".gz,.tar.gz"
              className="hidden"
              disabled={importar.isPending}
              onChange={(e) => {
                const file = e.target.files?.[0];
                setArchivoFotos(file ?? null);
                setResultado(null);
              }}
            />
          </label>
          <p className="mt-1 text-[11px] text-muted">
            El archivo <code>uploads-....tar.gz</code> (misma fecha que el de arriba, tambien esta en{' '}
            <strong>Respaldos automaticos</strong>) trae las fotos. Sin este, los productos se agregan
            igual pero sin foto — se completan despues desde Productos.
          </p>
        </div>

        <Button size="sm" onClick={() => importar.mutate()} disabled={!archivo || importar.isPending}>
          <UploadCloud size={14} /> {importar.isPending ? 'Importando...' : 'Importar productos'}
        </Button>
      </div>

      {resultado && (
        <div className="mt-3 rounded-lg bg-sage-100 p-3 text-xs text-sage-700">
          <p className="font-semibold">
            {resultado.total} productos en el archivo · {resultado.agregados} agregados tal cual
            {resultado.renumerados.length > 0 && ` · ${resultado.renumerados.length} renumerados`}
            {resultado.omitidos > 0 && ` · ${resultado.omitidos} omitidos`}
          </p>
          <p className="mt-1">
            {resultado.conFoto > 0
              ? `${resultado.conFoto} de ${resultado.agregados + resultado.renumerados.length} llegaron con foto.`
              : 'Ninguno llego con foto — se completan despues desde Productos.'}
          </p>
          {resultado.renumerados.length > 0 && (
            <div className="mt-2 max-h-40 space-y-1 overflow-y-auto border-t border-sage-600/20 pt-2">
              <p className="text-[11px] text-muted">
                Estos ya existian con ese codigo en esta base, asi que se les asigno uno nuevo:
              </p>
              {resultado.renumerados.map((r, i) => (
                <p key={i} className="flex items-center gap-1 font-mono text-[11px]">
                  {r.nombre}: {r.skuOriginal} <ArrowRight size={10} /> {r.skuNuevo}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

/**
 * Cambio de la propia clave.
 *
 * Cualquier rol puede usarlo (cada quien la suya). Es lo primero que deberia
 * hacer el dueño en una instalacion nueva: la aplicacion arranca con una
 * clave inicial conocida y publicada en la guia.
 */
function CambiarClave() {
  const [actual, setActual] = useState('');
  const [nueva, setNueva] = useState('');
  const [repetir, setRepetir] = useState('');

  const cambiar = useMutation({
    mutationFn: async () =>
      (
        await api.patch(
          '/users/me/password',
          { passwordActual: actual, passwordNueva: nueva },
          { skipErrorToast: true },
        )
      ).data,
    onSuccess: () => {
      toast.success('Clave actualizada.');
      setActual('');
      setNueva('');
      setRepetir('');
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message ?? 'No se pudo cambiar la clave.';
      toast.error(Array.isArray(msg) ? msg.join(' ') : msg);
    },
  });

  function enviar(e: FormEvent) {
    e.preventDefault();
    if (nueva.length < 6) {
      toast.error('La clave nueva debe tener al menos 6 caracteres.');
      return;
    }
    if (nueva !== repetir) {
      toast.error('La clave nueva y su repeticion no coinciden.');
      return;
    }
    cambiar.mutate();
  }

  return (
    <Card className="p-5">
      <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-muted">
        Cambiar mi clave
      </h2>
      <form onSubmit={enviar} className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
            Clave actual
          </label>
          <input
            type="password"
            value={actual}
            onChange={(e) => setActual(e.target.value)}
            className="w-full rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
            Clave nueva
          </label>
          <input
            type="password"
            value={nueva}
            onChange={(e) => setNueva(e.target.value)}
            placeholder="Minimo 6 caracteres"
            className="w-full rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
            Repetir la clave nueva
          </label>
          <input
            type="password"
            value={repetir}
            onChange={(e) => setRepetir(e.target.value)}
            className="w-full rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
          />
        </div>
        <Button type="submit" className="w-full" disabled={!actual || !nueva || cambiar.isPending}>
          {cambiar.isPending ? 'Guardando...' : 'Cambiar clave'}
        </Button>
      </form>
    </Card>
  );
}

function NewUserForm({
  onSubmit,
}: {
  onSubmit: (payload: { nombre: string; email: string; password: string; role: Role }) => void;
}) {
  const [form, setForm] = useState({ nombre: '', email: '', password: '', role: 'CAJERO' as Role });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!form.nombre || !form.email || form.password.length < 6) {
          toast.error('Completa nombre, correo y una contraseña de al menos 6 caracteres.');
          return;
        }
        onSubmit(form);
        setForm({ nombre: '', email: '', password: '', role: 'CAJERO' });
      }}
      className="space-y-2 border-t border-porcelain-200 pt-3"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">Agregar usuario</p>
      <input
        placeholder="Nombre"
        value={form.nombre}
        onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
        className="w-full rounded-lg border border-porcelain-300 px-3 py-1.5 text-sm outline-none focus:border-copper-500"
      />
      <input
        placeholder="Correo"
        type="email"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        className="w-full rounded-lg border border-porcelain-300 px-3 py-1.5 text-sm outline-none focus:border-copper-500"
      />
      <div className="flex gap-2">
        <input
          placeholder="Contraseña"
          type="password"
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          className="flex-1 rounded-lg border border-porcelain-300 px-3 py-1.5 text-sm outline-none focus:border-copper-500"
        />
        <select
          value={form.role}
          onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as Role }))}
          className="rounded-lg border border-porcelain-300 px-2 py-1.5 text-sm outline-none focus:border-copper-500"
        >
          <option value="CAJERO">Cajero</option>
          <option value="CONTABILIDAD">Contabilidad</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>
      <Button type="submit" size="sm" variant="secondary" className="w-full">
        <UserPlus size={14} /> Crear usuario
      </Button>
    </form>
  );
}
