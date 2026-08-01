export type Role = 'ADMIN' | 'CAJERO' | 'CONTABILIDAD';

export type MetodoPago = 'EFECTIVO' | 'TARJETA' | 'TRANSFERENCIA' | 'CREDITO' | 'OTRO';

export type EstadoFactura = 'PENDIENTE' | 'GENERADA' | 'ENVIADA' | 'ERROR';

export type EstadoDeuda = 'PENDIENTE' | 'PARCIAL' | 'PAGADA' | 'VENCIDA';

export interface AuthUser {
  id: string;
  nombre: string;
  email: string;
  role: Role;
}

export interface Client {
  id: string;
  nombre: string;
  telefono: string;
  email?: string | null;
  direccion?: string | null;
  notas?: string | null;
  createdAt: string;
  deudaPendiente?: number;
  debts?: ClientDebt[];
  sales?: Sale[];
}

export interface Product {
  id: string;
  sku: string;
  nombre: string;
  precioUnitario: number;
  // Solo presente cuando el backend responde a un usuario ADMIN.
  costoUnitario?: number;
  stock: number;
  imageUrl?: string | null;
  activo: boolean;
}

export interface ProductMargin {
  productId: string | null;
  nombre: string;
  sku: string | null;
  unidades: number;
  ingresos: number;
  costo: number;
  utilidad: number;
  margenPct: number;
}

export interface CostsReport {
  totales: { ingresos: number; costo: number; utilidad: number; margenPct: number };
  productos: ProductMargin[];
}

export interface SaleItem {
  id: string;
  productId?: string | null;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  total: number;
}

export interface Invoice {
  id: string;
  numero: string;
  estado: EstadoFactura;
  pdfUrl?: string | null;
  pngUrl?: string | null;
  sentWhatsappAt?: string | null;
  ultimoError?: string | null;
}

export interface Sale {
  id: string;
  fecha: string;
  subtotal: number;
  impuestos: number;
  total: number;
  metodoPago: MetodoPago;
  client?: Client | null;
  items: SaleItem[];
  invoice?: Invoice | null;
}

export interface ClientDebt {
  id: string;
  clientId?: string;
  cliente?: string;
  telefono?: string;
  client?: { id: string; nombre: string; telefono: string; lastReminderSentAt?: string | null } | null;
  sale?: {
    id: string;
    fecha: string;
    total: number;
    invoice?: { numero: string; pngUrl?: string | null; estado: EstadoFactura } | null;
  } | null;
  amountTotal?: number;
  amountPaid?: number;
  montoTotal?: number;
  montoPagado?: number;
  saldo?: number;
  dueDate?: string | null;
  vencimiento?: string | null;
  status: EstadoDeuda;
}

export interface Expense {
  id: string;
  fecha: string;
  categoria: string;
  descripcion: string;
  monto: number;
  user?: { nombre: string };
}

export interface DashboardSummary {
  ventasHoy: { total: number; cantidad: number };
  deudaTotalPendiente: number;
  gastosDelMes: number;
  gastosRecientes: Expense[];
}

export interface BusinessProfile {
  id: string;
  nombre: string;
  logoUrl?: string | null;
  direccion?: string | null;
  identifFiscal?: string | null;
  tasaImpuesto: number;
}
