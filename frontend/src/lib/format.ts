export function formatMoney(value: number | string): string {
  return Number(value).toLocaleString('es-DO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatDate(value: string | Date): string {
  return new Date(value).toLocaleDateString('es-DO', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatDateTime(value: string | Date): string {
  return new Date(value).toLocaleString('es-DO', { dateStyle: 'medium', timeStyle: 'short' });
}

export const ESTADO_DEUDA_LABEL: Record<string, string> = {
  PENDIENTE: 'Pendiente',
  PARCIAL: 'Abono parcial',
  PAGADA: 'Pagada',
  VENCIDA: 'Vencida',
};

export const METODO_PAGO_LABEL: Record<string, string> = {
  EFECTIVO: 'Efectivo',
  TARJETA: 'Tarjeta',
  TRANSFERENCIA: 'Transferencia',
  CREDITO: 'Credito',
  OTRO: 'Otro',
};
