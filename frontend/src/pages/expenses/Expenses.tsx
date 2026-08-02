import { type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Plus, Trash2 } from 'lucide-react';
import { api } from '../../lib/api';
import { usePersistedState } from '../../lib/usePersistedState';
import { formatMoney, formatDate } from '../../lib/format';
import { Button, Card, PageHeader, EmptyState } from '../../components/ui';
import type { Expense } from '../../types';

export default function Expenses() {
  const queryClient = useQueryClient();
  // El gasto a medio escribir sobrevive si se sale de la pantalla sin querer.
  const [form, setForm] = usePersistedState('gastos:nuevo', { categoria: '', descripcion: '', monto: '' });

  const { data: expenses = [], isLoading } = useQuery<Expense[]>({
    queryKey: ['expenses'],
    queryFn: async () => (await api.get('/expenses')).data,
  });

  const createExpense = useMutation({
    mutationFn: async () =>
      (await api.post('/expenses', { ...form, monto: Number(form.monto) })).data,
    onSuccess: () => {
      toast.success('Gasto registrado.');
      setForm({ categoria: '', descripcion: '', monto: '' });
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const deleteExpense = useMutation({
    mutationFn: async (id: string) => api.delete(`/expenses/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.categoria.trim() || !form.descripcion.trim() || !Number(form.monto)) {
      toast.error('Completa categoria, descripcion y un monto valido.');
      return;
    }
    createExpense.mutate();
  }

  return (
    <div>
      <PageHeader title="Gastos" subtitle="Registro de gastos operativos del negocio" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          {isLoading ? (
            <Card className="h-40 animate-pulse" />
          ) : expenses.length === 0 ? (
            <EmptyState title="Sin gastos registrados" />
          ) : (
            <Card className="divide-y divide-porcelain-200 overflow-hidden">
              {expenses.map((g) => (
                <div key={g.id} className="flex items-center justify-between px-4 py-3 text-sm">
                  <div>
                    <p className="font-medium text-ink">{g.descripcion}</p>
                    <p className="text-xs text-muted">
                      {g.categoria} &middot; {formatDate(g.fecha)} &middot; {g.user?.nombre}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-display font-semibold tabular-nums text-ink">
                      RD$ {formatMoney(g.monto)}
                    </p>
                    <button
                      onClick={() => deleteExpense.mutate(g.id)}
                      className="rounded p-1 text-muted hover:bg-brick-100 hover:text-brick-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </Card>
          )}
        </div>

        <Card className="h-fit p-4">
          <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-muted">
            Nuevo gasto
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">Categoria</label>
              <input
                value={form.categoria}
                onChange={(e) => setForm((f) => ({ ...f, categoria: e.target.value }))}
                placeholder="Suministros, renta, servicios..."
                className="w-full rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">Descripcion</label>
              <input
                value={form.descripcion}
                onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))}
                className="w-full rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">Monto</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.monto}
                onChange={(e) => setForm((f) => ({ ...f, monto: e.target.value }))}
                className="w-full rounded-lg border border-porcelain-300 px-3 py-2 text-sm outline-none focus:border-copper-500"
              />
            </div>
            <Button type="submit" disabled={createExpense.isPending} className="w-full">
              <Plus size={16} /> Registrar gasto
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
