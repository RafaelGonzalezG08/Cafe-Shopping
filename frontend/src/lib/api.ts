import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/auth.store';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || 'Ocurrio un error inesperado.';

    if (status === 401) {
      useAuthStore.getState().logout();
    }
    if (status !== 401) {
      toast.error(Array.isArray(message) ? message.join(', ') : message);
    }
    return Promise.reject(error);
  },
);

export function apiUrl(path: string) {
  const base = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/api$/, '');
  return `${base}${path}`;
}
