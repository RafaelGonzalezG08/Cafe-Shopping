import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/auth.store';

declare module 'axios' {
  export interface AxiosRequestConfig {
    /**
     * Marca una peticion cuyo error muestra el propio componente (con un
     * mensaje mas especifico). Sin esto, el interceptor de abajo tambien
     * mostraba su toast y el usuario veia el MISMO error dos veces.
     */
    skipErrorToast?: boolean;
  }
}

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
    if (status !== 401 && !error?.config?.skipErrorToast) {
      toast.error(Array.isArray(message) ? message.join(', ') : message);
    }
    return Promise.reject(error);
  },
);

export function apiUrl(path: string) {
  const base = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/api$/, '');
  return `${base}${path}`;
}
