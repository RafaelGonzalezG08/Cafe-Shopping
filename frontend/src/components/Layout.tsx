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
  Settings,
  LogOut,
  Coffee,
  HandCoins,
} from 'lucide-react';
import { useAuthStore } from '../store/auth.store';
import { api, apiUrl } from '../lib/api';
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
  { to: '/cobros', label: 'Cobros', icon: HandCoins, roles: ['ADMIN', 'CAJERO', 'CONTABILIDAD'] },
  { to: '/clientes', label: 'Clientes', icon: Users },
  { to: '/gastos', label: 'Gastos', icon: Wallet, roles: ['ADMIN', 'CONTABILIDAD'] },
  { to: '/reportes', label: 'Reportes', icon: BarChart3, roles: ['ADMIN', 'CONTABILIDAD'] },
  { to: '/configuracion', label: 'Configuracion', icon: Settings, roles: ['ADMIN'] },
];

export function Layout() {
  const { user, logout } = useAuthStore();

  const { data: profile } = useQuery<BusinessProfile>({
    queryKey: ['settings', 'business-profile'],
    queryFn: async () => (await api.get('/settings/business-profile')).data,
    staleTime: 60_000,
  });

  const visibleItems = NAV_ITEMS.filter((item) => !item.roles || (user && item.roles.includes(user.role)));
  const logoSrc = profile?.logoUrl
    ? profile.logoUrl.startsWith('http')
      ? profile.logoUrl
      : apiUrl(profile.logoUrl)
    : null;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-porcelain-100">
      <aside className="flex w-64 shrink-0 flex-col bg-espresso-900 text-porcelain-100">
        <div className="flex items-center gap-2.5 px-5 py-6">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-copper-500">
            {logoSrc ? (
              <img src={logoSrc} alt="Logo" className="h-full w-full object-cover" />
            ) : (
              <Coffee size={18} strokeWidth={2.25} className="text-porcelain-50" />
            )}
          </div>
          <div>
            <p className="font-display text-[15px] font-bold leading-none tracking-tight">
              {profile?.nombre || 'Cafe Shopping'}
            </p>
            <p className="mt-1 text-[11px] text-porcelain-300/60">Punto de venta</p>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 px-3">
          {visibleItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-copper-500/15 text-copper-100'
                    : 'text-porcelain-300/70 hover:bg-espresso-800 hover:text-porcelain-100'
                }`
              }
            >
              <Icon size={17} strokeWidth={2} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-espresso-700 px-3 py-4">
          <div className="mb-2 flex items-center gap-2.5 rounded-lg px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-copper-500/20 font-display text-xs font-bold text-copper-100">
              {user?.nombre?.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-porcelain-100">{user?.nombre}</p>
              <p className="truncate text-[11px] text-porcelain-300/60">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-porcelain-300/70 transition-colors hover:bg-espresso-800 hover:text-porcelain-100"
          >
            <LogOut size={17} strokeWidth={2} />
            Cerrar sesion
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-6 py-8 md:px-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
