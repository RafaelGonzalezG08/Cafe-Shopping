import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { Check, ChevronDown, Loader2, Trash2, X } from 'lucide-react';

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-xl2 border border-porcelain-300 bg-white shadow-ticket ${className}`}
      {...props}
    />
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

const BADGE_STYLES: Record<string, string> = {
  neutral: 'bg-porcelain-200 text-muted',
  copper: 'bg-copper-100 text-copper-700',
  sage: 'bg-sage-100 text-sage-600',
  brick: 'bg-brick-100 text-brick-600',
  rose: 'bg-rose-100 text-rose-600',
};

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: keyof typeof BADGE_STYLES }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${BADGE_STYLES[tone]}`}>
      {children}
    </span>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md';
}

const VARIANT_STYLES: Record<string, string> = {
  primary: 'bg-copper-500 text-white hover:bg-copper-600 disabled:bg-copper-400/60',
  secondary: 'bg-porcelain-200 text-ink hover:bg-porcelain-300',
  ghost: 'text-muted hover:bg-porcelain-200',
  danger: 'bg-brick-500 text-white hover:bg-brick-600',
};

export function Button({ variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
        size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2.5 text-sm'
      } ${VARIANT_STYLES[variant]} ${className}`}
      {...props}
    />
  );
}

export interface SelectOption {
  value: string;
  label: string;
}

/**
 * Reemplazo del <select> nativo: el de Windows se abre con su propio menu
 * azul del sistema operativo, que no se puede pintar con los colores de la
 * app. Este se ve y se comporta igual en cualquier PC, con el mismo lenguaje
 * visual (bordes, focus, hover) que el resto de los controles.
 */
export function Select({
  value,
  onChange,
  options,
  className = '',
  size = 'md',
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
  size?: 'sm' | 'md';
}) {
  const [abierto, setAbierto] = useState(false);
  const [posicion, setPosicion] = useState<{ top: number; left: number; width: number } | null>(null);
  const boton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const actual = options.find((o) => o.value === value);

  // El panel se renderiza en un portal (fuera del arbol de este componente)
  // porque varias pantallas lo usan dentro de contenedores con overflow-hidden
  // (ej. las secciones plegables de Configuracion, que lo necesitan para la
  // animacion de alto): sin el portal, ese overflow le cortaba el menu.
  useLayoutEffect(() => {
    if (!abierto || !boton.current) return;
    function actualizarPosicion() {
      const r = boton.current!.getBoundingClientRect();
      const izquierdaMax = window.innerWidth - r.width - 8;
      setPosicion({ top: r.bottom + 4, left: Math.min(r.left, Math.max(izquierdaMax, 8)), width: r.width });
    }
    actualizarPosicion();
    window.addEventListener('resize', actualizarPosicion);
    window.addEventListener('scroll', actualizarPosicion, true);
    return () => {
      window.removeEventListener('resize', actualizarPosicion);
      window.removeEventListener('scroll', actualizarPosicion, true);
    };
  }, [abierto]);

  useEffect(() => {
    if (!abierto) return;
    function alClickFuera(e: MouseEvent) {
      const objetivo = e.target as Node;
      if (boton.current?.contains(objetivo) || panel.current?.contains(objetivo)) return;
      setAbierto(false);
    }
    function alEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setAbierto(false);
    }
    document.addEventListener('mousedown', alClickFuera);
    document.addEventListener('keydown', alEscape);
    return () => {
      document.removeEventListener('mousedown', alClickFuera);
      document.removeEventListener('keydown', alEscape);
    };
  }, [abierto]);

  return (
    <div className={className}>
      <button
        ref={boton}
        type="button"
        onClick={() => setAbierto((a) => !a)}
        className={`flex w-full items-center justify-between gap-2 rounded-lg border bg-white text-left text-sm outline-none transition-colors ${
          size === 'sm' ? 'px-2.5 py-1.5' : 'px-3 py-2'
        } ${abierto ? 'border-copper-500' : 'border-porcelain-300 hover:border-copper-400'}`}
      >
        <span className="truncate text-ink">{actual?.label ?? ''}</span>
        <ChevronDown
          size={15}
          className={`shrink-0 text-muted transition-transform ${abierto ? 'rotate-180' : ''}`}
        />
      </button>

      {abierto &&
        posicion &&
        createPortal(
          <div
            ref={panel}
            style={{ top: posicion.top, left: posicion.left, minWidth: posicion.width }}
            className="fixed z-50 max-h-64 w-max max-w-[calc(100vw-16px)] overflow-y-auto rounded-lg border border-porcelain-300 bg-white py-1 shadow-ticket"
          >
            {options.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => {
                  onChange(o.value);
                  setAbierto(false);
                }}
                className={`flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm transition-colors ${
                  o.value === value ? 'bg-copper-50 font-semibold text-copper-700' : 'text-ink hover:bg-porcelain-100'
                }`}
              >
                {o.label}
                {o.value === value && <Check size={14} className="shrink-0" />}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl2 border border-dashed border-porcelain-300 py-14 text-center">
      <p className="font-display font-semibold text-ink">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>}
    </div>
  );
}

/**
 * Confirmacion generica para eliminar algo sensible (una venta, un abono, un
 * gasto): pide la clave de quien esta logueado como ultimo freno antes de
 * borrar. Un solo componente para las tres pantallas en vez de repetir el
 * mismo formulario tres veces.
 */
export function ConfirmPasswordModal({
  titulo,
  mensaje,
  etiquetaClave = 'Clave',
  textoBoton = 'Eliminar',
  pendiente,
  onConfirm,
  onClose,
}: {
  titulo: string;
  mensaje?: ReactNode;
  etiquetaClave?: string;
  textoBoton?: string;
  pendiente: boolean;
  onConfirm: (password: string) => void;
  onClose: () => void;
}) {
  const [password, setPassword] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-espresso-950/50 p-4">
      <Card className="w-full max-w-sm p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display font-bold text-ink">{titulo}</h2>
          <button onClick={onClose} className="rounded p-1 text-muted hover:bg-porcelain-200">
            <X size={18} />
          </button>
        </div>

        {mensaje && <div className="mb-4 rounded-lg bg-brick-100 p-3 text-sm text-brick-700">{mensaje}</div>}

        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
          {etiquetaClave}
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Confirma tu clave"
          autoFocus
          className="mb-4 w-full rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
        />

        <div className="flex gap-2">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            className="flex-1"
            disabled={!password || pendiente}
            onClick={() => onConfirm(password)}
          >
            {pendiente ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
            {pendiente ? 'Eliminando...' : textoBoton}
          </Button>
        </div>
      </Card>
    </div>
  );
}
