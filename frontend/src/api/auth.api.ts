import { api } from '../lib/api';
import type { AuthUser } from '../types';

export const authApi = {
  login: (email: string, password: string) =>
    api
      .post<{ accessToken: string; user: AuthUser }>('/auth/login', { email, password })
      .then((r) => r.data),
};
