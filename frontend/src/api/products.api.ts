import { api } from '../lib/api';
import type { Product } from '../types';

export const productsApi = {
  list: () => api.get<Product[]>('/products').then((r) => r.data),
};
