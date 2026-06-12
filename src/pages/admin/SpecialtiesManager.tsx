import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { defaultSpecialties } from '@/hooks/useSiteConfig';
import { ICON_OPTIONS, renderIcon } from '@/lib/iconMap';
import type { SpecialtyItem } from '@/types';

export default function SpecialtiesManager() {
  const [specialties, setSpecialties] = useState<SpecialtyItem[]>(defaultSpecialties);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase
      .from('site_config')
      .select('key, value')
      .eq('key', 'specialties')
      .maybeSingle()
      .then(({ data }) => {
        if (data?.value) setSpecialties(data.value as SpecialtyItem[]);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await supabase.from('site_config').upsert([{ key: 'specialties', value: specialties }]);
    setSaving(false);
    setSaved(true);
  };

  const updateSpecialty = (index: number, patch: Partial<SpecialtyItem>) => {
    setSpecialties((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  };

  const moveSpecialty = (index: number, direction: -1 | 1) => {
    setSpecialties((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const removeSpecialty = (index: number) => {
    setSpecialties((prev) => prev.filter((_, i) => i !== index));
  };

  const addSpecialty = () => {
    setSpecialties((prev) => [
      ...prev,
      {
        id: `especialidade-${Date.now()}`,
        icon: 'Sparkles',
        title: 'Nova especialidade',
        highlight: false,
        summary: '',
        topics: [],
        subItems: [],
      },
    ]);
  };

  const addSubItem = (index: number) => {
    updateSpecialty(index, {
      subItems: [...specialties[index].subItems, { title: 'Nova seção', topics: [] }],
    });
  };

  const updateSubItem = (index: number, subIndex: number, field: 'title' | 'topics', value: string | string[]) => {
    const subItems = specialties[index].subItems.map((sub, i) => (i === subIndex ? { ...sub, [field]: value } : sub));
    updateSpecialty(index, { subItems });
  };

  const removeSubItem = (index: number, subIndex: number) => {
    updateSpecialty(index, { subItems: specialties[index].subItems.filter((_, i) => i !== subIndex) });
  };

  if (loading) return <p className="text-text-secondary">Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Especialidades</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Edite as categorias exibidas em "Especialidades" e nos cards da Home. Categorias com seções internas (como o
        Zendesk) substituem a lista de tópicos por essas seções.
      </p>

      <div className="mt-8 space-y-6">
        {specialties.map((specialty, index) => {
          return (
            <div key={specialty.id} className="card">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {renderIcon(specialty.icon, { className: 'text-gold', size: 20 })}
                  <h3 className="font-display font-semibold">{specialty.title || 'Sem título'}</h3>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveSpecialty(index, -1)}
                    disabled={index === 0}
                    className="rounded-md p-1.5 text-text-secondary hover:bg-text-secondary/10 disabled:opacity-30"
                    aria-label="Mover para cima"
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSpecialty(index, 1)}
                    disabled={index === specialties.length - 1}
                    className="rounded-md p-1.5 text-text-secondary hover:bg-text-secondary/10 disabled:opacity-30"
                    aria-label="Mover para baixo"
                  >
                    <ArrowDown size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSpecialty(index)}
                    className="rounded-md p-1.5 text-red-600 hover:bg-red-50"
                    aria-label="Remover especialidade"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs text-text-secondary">Título</label>
                  <input
                    type="text"
                    value={specialty.title}
                    onChange={(e) => updateSpecialty(index, { title: e.target.value })}
                    className="w-full rounded-md border border-text-secondary/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-text-secondary">Ícone</label>
                  <div className="flex items-center gap-2">
                    {renderIcon(specialty.icon, { className: 'shrink-0 text-gold', size: 20 })}
                    <select
                      value={specialty.icon}
                      onChange={(e) => updateSpecialty(index, { icon: e.target.value })}
                      className="w-full rounded-md border border-text-secondary/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                    >
                      {ICON_OPTIONS.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-1 block text-xs text-text-secondary">
                  Resumo (usado nos cards da Home)
                </label>
                <textarea
                  rows={2}
                  value={specialty.summary}
                  onChange={(e) => updateSpecialty(index, { summary: e.target.value })}
                  className="w-full resize-none rounded-md border border-text-secondary/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                />
              </div>

              <div className="mt-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={specialty.highlight}
                    onChange={(e) => updateSpecialty(index, { highlight: e.target.checked })}
                  />
                  Destacar na lista de especialidades
                </label>
              </div>

              <div className="mt-4">
                <label className="mb-1 block text-xs text-text-secondary">
                  Tópicos (um por linha) — ignorados se houver seções internas abaixo
                </label>
                <textarea
                  rows={4}
                  value={specialty.topics.join('\n')}
                  onChange={(e) => updateSpecialty(index, { topics: e.target.value.split('\n') })}
                  className="w-full resize-none rounded-md border border-text-secondary/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                />
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-xs text-text-secondary">Seções internas (ex: Support, Guide...)</label>
                  <button
                    type="button"
                    onClick={() => addSubItem(index)}
                    className="flex items-center gap-1 text-xs font-semibold text-gold hover:text-gold-light"
                  >
                    <Plus size={14} /> Adicionar seção
                  </button>
                </div>

                <div className="space-y-3">
                  {specialty.subItems.map((sub, subIndex) => (
                    <div key={subIndex} className="rounded-md border border-text-secondary/15 p-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={sub.title}
                          onChange={(e) => updateSubItem(index, subIndex, 'title', e.target.value)}
                          placeholder="Título da seção"
                          className="w-full rounded-md border border-text-secondary/20 px-3 py-2 text-sm font-semibold focus:border-gold focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => removeSubItem(index, subIndex)}
                          className="shrink-0 rounded-md p-1.5 text-red-600 hover:bg-red-50"
                          aria-label="Remover seção"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <textarea
                        rows={3}
                        value={sub.topics.join('\n')}
                        onChange={(e) => updateSubItem(index, subIndex, 'topics', e.target.value.split('\n'))}
                        placeholder="Tópicos (um por linha)"
                        className="mt-2 w-full resize-none rounded-md border border-text-secondary/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          onClick={addSpecialty}
          className="flex items-center gap-2 rounded-md border border-dashed border-text-secondary/30 px-4 py-3 text-sm font-semibold text-text-secondary hover:border-gold hover:text-gold"
        >
          <Plus size={16} /> Adicionar especialidade
        </button>

        <div className="flex items-center gap-4">
          <button type="button" onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? 'Salvando...' : 'Salvar alterações'}
          </button>
          {saved && <span className="text-sm text-green-700">Especialidades salvas com sucesso!</span>}
        </div>
      </div>
    </div>
  );
}
