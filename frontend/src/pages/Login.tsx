import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gem, Loader2 } from 'lucide-react';
import { api } from '../lib/api';
import { useAuthStore } from '../store/auth.store';
import { Button } from '../components/ui';

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('admin@cafeshopping.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data.accessToken, data.user);
      navigate('/');
    } catch {
      setError('Correo o contraseña incorrectos.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-porcelain-100 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-copper-400 to-copper-600 shadow-neu-sm">
            <Gem size={24} className="text-white" />
          </div>
          <h1 className="font-display text-xl font-bold text-ink">Cafe Shopping</h1>
          <p className="mt-1 text-sm text-muted">Inicia sesion para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl2 bg-porcelain-100 p-6 shadow-neu">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
            Correo
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full rounded-lg px-3 py-2.5 text-sm outline-none"
            placeholder="tucorreo@cafeshopping.com"
          />

          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
            Contraseña
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-2 w-full rounded-lg px-3 py-2.5 text-sm outline-none"
            placeholder="••••••••"
          />

          {error && <p className="mb-3 text-sm text-brick-500">{error}</p>}

          <Button type="submit" disabled={loading} className="mt-3 w-full">
            {loading && <Loader2 size={16} className="animate-spin" />}
            Entrar
          </Button>

          <p className="mt-4 text-center text-xs text-muted">
            Usuario demo (tras el seed): admin@cafeshopping.com / cafe1234
          </p>
        </form>
      </div>
    </div>
  );
}
