import { api } from '../lib/api';
import type { Sale } from '../types';

export interface EditarVentaDto {
  adminPassword: string;
  clientId: string | null;
  items: { productId?: string | null; descripcion: string; cantidad: number; precioUnitario: number }[];
}

export const salesApi = {
  list: (params: { from?: string; to?: string }) => api.get<Sale[]>('/sales', { params }).then((r) => r.data),
  get: (id: string) => api.get<Sale>(`/sales/${id}`).then((r) => r.data),
  sendWhatsapp: (saleId: string) => api.post(`/sales/${saleId}/send-invoice-whatsapp`).then((r) => r.data),
  delete: (id: string, adminPassword: string) =>
    api.delete(`/sales/${id}`, { data: { adminPassword }, skipErrorToast: true }).then((r) => r.data),
  edit: (id: string, dto: EditarVentaDto) =>
    api.put<Sale>(`/sales/${id}`, dto, { skipErrorToast: true }).then((r) => r.data),
};
