import { useState, type FormEvent } from 'react';
import { Plus, Pencil, Trash2, X, Upload } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useProjects } from '@/hooks/useProjects';
import type { Project, ProjectCategory, ProjectStatus } from '@/types';

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  bcr: 'BCR.CX',
  personal: 'Pessoal',
  events: 'Eventos',
};

interface FormState {
  id?: string;
  title: string;
  category: ProjectCategory;
  description: string;
  technologies: string;
  external_url: string;
  cover_image_url: string;
  featured: boolean;
  status: ProjectStatus;
}

const EMPTY_FORM: FormState = {
  title: '',
  category: 'bcr',
  description: '',
  technologies: '',
  external_url: '',
  cover_image_url: '',
  featured: false,
  status: 'draft',
};

export default function ProjectsManager() {
  const { projects, loading, refetch } = useProjects({ includeAll: true });
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const openNew = () => setForm(EMPTY_FORM);

  const openEdit = (project: Project) => {
    setForm({
      id: project.id,
      title: project.title,
      category: project.category,
      description: project.description ?? '',
      technologies: project.technologies.join(', '),
      external_url: project.external_url ?? '',
      cover_image_url: project.cover_image_url ?? '',
      featured: project.featured,
      status: project.status,
    });
  };

  const closeForm = () => setForm(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este projeto?')) return;
    await supabase.from('projects').delete().eq('id', id);
    refetch();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !form) return;

    setUploading(true);
    const fileName = `projects/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('site-images').upload(fileName, file);

    if (!error) {
      const { data } = supabase.storage.from('site-images').getPublicUrl(fileName);
      setForm({ ...form, cover_image_url: data.publicUrl });
    }
    setUploading(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);

    const payload = {
      title: form.title,
      category: form.category,
      description: form.description || null,
      technologies: form.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      external_url: form.external_url || null,
      cover_image_url: form.cover_image_url || null,
      featured: form.featured,
      status: form.status,
    };

    if (form.id) {
      await supabase.from('projects').update(payload).eq('id', form.id);
    } else {
      await supabase.from('projects').insert(payload);
    }

    setSaving(false);
    setForm(null);
    refetch();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projetos</h1>
          <p className="mt-1 text-sm text-text-secondary">Gerencie os projetos exibidos no portfólio.</p>
        </div>
        <button type="button" onClick={openNew} className="btn-primary">
          <Plus size={18} />
          Novo projeto
        </button>
      </div>

      {loading ? (
        <p className="mt-8 text-text-secondary">Carregando...</p>
      ) : (
        <div className="mt-8 space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="card flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-semibold">{project.title}</h3>
                  <span className="rounded-full border border-text-secondary/20 px-2 py-0.5 font-mono text-xs text-text-secondary">
                    {CATEGORY_LABELS[project.category]}
                  </span>
                  {project.featured && (
                    <span className="rounded-full bg-gold/15 px-2 py-0.5 font-mono text-xs text-gold">Destaque</span>
                  )}
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-xs ${
                      project.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-text-secondary/10 text-text-secondary'
                    }`}
                  >
                    {project.status === 'published' ? 'Publicado' : 'Rascunho'}
                  </span>
                </div>
                {project.description && (
                  <p className="mt-1 text-sm text-text-secondary">{project.description}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(project)}
                  aria-label={`Editar ${project.title}`}
                  className="rounded-md border border-text-secondary/20 p-2 hover:border-gold hover:text-gold"
                >
                  <Pencil size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(project.id)}
                  aria-label={`Excluir ${project.title}`}
                  className="rounded-md border border-text-secondary/20 p-2 hover:border-red-400 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {projects.length === 0 && <p className="text-text-secondary">Nenhum projeto cadastrado.</p>}
        </div>
      )}

      {form && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/60 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">
                {form.id ? 'Editar projeto' : 'Novo projeto'}
              </h2>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block font-display text-sm font-medium">Categoria</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as ProjectCategory })}
                    className="w-full rounded-md border border-text-secondary/20 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
                  >
                    <option value="bcr">BCR.CX</option>
                    <option value="personal">Pessoal</option>
                    <option value="events">Eventos</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block font-display text-sm font-medium">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as ProjectStatus })}
                    className="w-full rounded-md border border-text-secondary/20 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
                  >
                    <option value="draft">Rascunho</option>
                    <option value="published">Publicado</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block font-display text-sm font-medium">Descrição</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full resize-none rounded-md border border-text-secondary/20 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block font-display text-sm font-medium">
                  Tecnologias (separadas por vírgula)
                </label>
                <input
                  value={form.technologies}
                  onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                  placeholder="React, Supabase, Zendesk"
                  className="w-full rounded-md border border-text-secondary/20 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block font-display text-sm font-medium">Link externo</label>
                <input
                  type="url"
                  value={form.external_url}
                  onChange={(e) => setForm({ ...form, external_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full rounded-md border border-text-secondary/20 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block font-display text-sm font-medium">Imagem de capa</label>
                <div className="flex items-center gap-3">
                  <label className="flex cursor-pointer items-center gap-2 rounded-md border border-text-secondary/20 px-4 py-2.5 text-sm hover:border-gold">
                    <Upload size={16} />
                    {uploading ? 'Enviando...' : 'Selecionar imagem'}
                    <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                  </label>
                  {form.cover_image_url && (
                    <img src={form.cover_image_url} alt="" className="h-10 w-10 rounded object-cover" />
                  )}
                </div>
              </div>

              <label className="flex items-center gap-2 font-display text-sm font-medium">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="size-4 accent-gold"
                />
                Projeto em destaque
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
