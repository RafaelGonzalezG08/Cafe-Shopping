import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

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

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl2 border border-dashed border-porcelain-300 py-14 text-center">
      <p className="font-display font-semibold text-ink">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>}
    </div>
  );
}
