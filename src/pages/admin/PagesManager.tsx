import { useEffect, useState, type FormEvent } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import type { CustomPage } from '@/types';

interface FormState {
  id?: string;
  slug: string;
  title: string;
  content: string;
  published: boolean;
}

const EMPTY_FORM: FormState = { slug: '', title: '', content: '', published: false };

export default function PagesManager() {
  const [pages, setPages] = useState<CustomPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchPages = async () => {
    setLoading(true);
    const { data } = await supabase.from('pages').select('*').order('created_at', { ascending: false });
    setPages((data ?? []) as CustomPage[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const openNew = () => setForm(EMPTY_FORM);

  const openEdit = (page: CustomPage) =>
    setForm({
      id: page.id,
      slug: page.slug,
      title: page.title,
      content: page.content ?? '',
      published: page.published,
    });

  const closeForm = () => setForm(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta página?')) return;
    await supabase.from('pages').delete().eq('id', id);
    fetchPages();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);

    const payload = {
      slug: form.slug,
      title: form.title,
      content: form.content,
      published: form.published,
    };

    if (form.id) {
      await supabase.from('pages').update(payload).eq('id', form.id);
    } else {
      await supabase.from('pages').insert(payload);
    }

    setSaving(false);
    setForm(null);
    fetchPages();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Páginas</h1>
          <p className="mt-1 text-sm text-text-secondary">Crie páginas simples com conteúdo livre.</p>
        </div>
        <button type="button" onClick={openNew} className="btn-primary">
          <Plus size={18} />
          Nova página
        </button>
      </div>

      {loading ? (
        <p className="mt-8 text-text-secondary">Carregando...</p>
      ) : (
        <div className="mt-8 space-y-3">
          {pages.map((page) => (
            <div key={page.id} className="card flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-semibold">{page.title}</h3>
                  <span className="font-mono text-xs text-text-secondary">/{page.slug}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-xs ${
                      page.published ? 'bg-green-100 text-green-700' : 'bg-text-secondary/10 text-text-secondary'
                    }`}
                  >
                    {page.published ? 'Publicado' : 'Rascunho'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(page)}
                  aria-label={`Editar ${page.title}`}
                  className="rounded-md border border-text-secondary/20 p-2 hover:border-gold hover:text-gold"
                >
                  <Pencil size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(page.id)}
                  aria-label={`Excluir ${page.title}`}
                  className="rounded-md border border-text-secondary/20 p-2 hover:border-red-400 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {pages.length === 0 && <p className="text-text-secondary">Nenhuma página criada.</p>}
        </div>
      )}

      {form && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/60 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">{form.id ? 'Editar página' : 'Nova página'}</h2>
              <button type="button" onClick={closeForm} aria-label="Fechar">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block font-display text-sm font-medium">Título</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-md border border-text-secondary/20 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block font-display text-sm font-medium">Slug (URL)</label>
                <input
                  required
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="minha-pagina"
                  className="w-full rounded-md border border-text-secondary/20 px-4 py-2.5 text-sm font-mono focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block font-display text-sm font-medium">Conteúdo (HTML/Markdown)</label>
                <textarea
                  rows={8}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full resize-none rounded-md border border-text-secondary/20 px-4 py-2.5 font-mono text-sm focus:border-gold focus:outline-none"
                />
              </div>

              <label className="flex items-center gap-2 font-display text-sm font-medium">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="size-4 accent-gold"
                />
                Publicada
              </label>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-primary flex-1 disabled:opacity-60">
                  {saving ? 'Salvando...' : 'Salvar'}
                </button>
                <button type="button" onClick={closeForm} className="btn-secondary">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
