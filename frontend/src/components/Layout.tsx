import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  LayoutDashboard,
  ShoppingCart,
  Gem,
  Users,
  Receipt,
  Wallet,
  BarChart3,
  History,
  PiggyBank,
  Package,
  Settings,
  LogOut,
  HandCoins,
  Moon,
  Sun,
  X,
} from 'lucide-react';
import { useAuthStore } from '../store/auth.store';
import { api, apiUrl, urlConToken } from '../lib/api';
import { useTheme } from '../lib/useTheme';
import { Button, Card } from './ui';
import type { BusinessProfile, Role } from '../types';

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  roles?: Role[];
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/pos', label: 'Punto de venta', icon: ShoppingCart, roles: ['ADMIN', 'CAJERO'] },
  { to: '/productos', label: 'Productos', icon: Gem, roles: ['ADMIN'] },
  { to: '/ventas', label: 'Ventas', icon: Receipt },
  { to: '/pedidos', label: 'Pedidos', icon: Package },
  { to: '/cobros', label: 'Cobros', icon: HandCoins, roles: ['ADMIN', 'CAJERO', 'CONTABILIDAD'] },
  { to: '/clientes', label: 'Clientes', icon: Users },
  { to: '/gastos', label: 'Gastos', icon: Wallet, roles: ['ADMIN', 'CONTABILIDAD'] },
  { to: '/reportes', label: 'Reportes', icon: BarChart3, roles: ['ADMIN', 'CONTABILIDAD'] },
  { to: '/transacciones', label: 'Transacciones', icon: History, roles: ['ADMIN', 'CONTABILIDAD'] },
  { to: '/costos', label: 'Costos', icon: PiggyBank, roles: ['ADMIN'] },
];

/** Solo ADMIN administra la configuracion del negocio. */
const ROLES_CONFIGURACION: Role[] = ['ADMIN'];

export function Layout() {
  const { user, logout } = useAuthStore();
  const { esOscuro, alternar } = useTheme();
  const [confirmandoSalir, setConfirmandoSalir] = useState(false);

  const { data: profile } = useQuery<BusinessProfile>({
    queryKey: ['settings', 'business-profile'],
    queryFn: async () => (await api.get('/settings/business-profile')).data,
    staleTime: 60_000,
  });

  const visibleItems = NAV_ITEMS.filter((item) => !item.roles || (user && item.roles.includes(user.role)));
  const puedeVerConfiguracion = Boolean(user && ROLES_CONFIGURACION.includes(user.role));
  const logoSrc = profile?.logoUrl
    ? urlConToken(profile.logoUrl.startsWith('http') ? profile.logoUrl : apiUrl(profile.logoUrl))
    : null;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-porcelain-100">
      <aside className="z-10 flex h-screen w-72 shrink-0 flex-col bg-porcelain-side text-ink shadow-[8px_0_24px_-16px_rgba(20,10,16,0.35)]">
        <div className="flex shrink-0 items-center gap-2.5 px-5 py-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-copper-400 to-copper-600 shadow-neu-sm">
            {logoSrc ? (
              <img src={logoSrc} alt="Logo" className="h-full w-full object-cover" />
            ) : (
              <Gem size={18} strokeWidth={2.25} className="text-white" />
            )}
          </div>
          <div>
            <p className="font-display text-[15px] font-bold leading-none tracking-tight text-ink">
              {profile?.nombre || 'Cafe Shopping'}
            </p>
            <p className="mt-1 font-lema text-[13px] italic leading-none text-copper-600">
              un placer al comprar
            </p>
          </div>
        </div>

        <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 pb-2">
          {visibleItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-porcelain-side text-copper-700 shadow-neu-inset'
                    : 'text-muted hover:text-ink'
                }`
              }
            >
              <Icon size={18} strokeWidth={2} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mx-3 mb-3 mt-2 shrink-0 border-t border-porcelain-300 px-0 pt-3">
          <div className="mb-2 flex items-center gap-2.5 rounded-xl bg-porcelain-side px-3 py-2 shadow-neu-inset">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-copper-400 to-copper-600 font-display text-xs font-bold text-white">
              {user?.nombre?.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">{user?.nombre}</p>
              <p className="truncate text-[11px] uppercase tracking-wide text-muted">{user?.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setConfirmandoSalir(true)}
              className="flex flex-1 items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted transition-all hover:text-brick-600 active:shadow-neu-pressed"
            >
              <LogOut size={17} strokeWidth={2} />
              Cerrar sesion
            </button>
            <button
              onClick={alternar}
              title={esOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              aria-label={esOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="flex shrink-0 items-center justify-center rounded-xl p-2.5 text-muted shadow-neu-sm transition-all hover:text-ink active:shadow-neu-pressed"
            >
              {esOscuro ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
            </button>
            {puedeVerConfiguracion && (
              <NavLink
                to="/configuracion"
                title="Configuracion"
                className={({ isActive }) =>
                  `flex shrink-0 items-center justify-center rounded-xl p-2.5 transition-all ${
                    isActive
                      ? 'text-copper-700 shadow-neu-inset'
                      : 'text-muted hover:text-ink shadow-neu-sm active:shadow-neu-pressed'
                  }`
                }
              >
                <Settings size={18} strokeWidth={2} />
              </NavLink>
            )}
          </div>
        </div>
      </aside>

      {confirmandoSalir && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-espresso-950/50 p-4">
          <Card className="w-full max-w-sm p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display font-bold text-ink">Cerrar sesion</h2>
              <button
                onClick={() => setConfirmandoSalir(false)}
                className="rounded p-1 text-muted hover:bg-porcelain-200"
              >
                <X size={18} />
              </button>
            </div>
            <p className="mb-4 text-sm text-muted">Seguro que quieres cerrar tu sesion?</p>
            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1" onClick={() => setConfirmandoSalir(false)}>
                Cancelar
              </Button>
              <Button variant="danger" className="flex-1" onClick={logout}>
                <LogOut size={16} />
                Cerrar sesion
              </Button>
            </div>
          </Card>
        </div>
      )}

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-6 py-8 md:px-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
