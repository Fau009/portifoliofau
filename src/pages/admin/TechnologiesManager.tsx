import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { defaultTechnologies } from '@/hooks/useSiteConfig';
import type { TechnologiesContent } from '@/types';

export default function TechnologiesManager() {
  const [technologies, setTechnologies] = useState<TechnologiesContent>(defaultTechnologies);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase
      .from('site_config')
      .select('key, value')
      .eq('key', 'technologies')
      .maybeSingle()
      .then(({ data }) => {
        if (data?.value) setTechnologies({ ...defaultTechnologies, ...(data.value as Partial<TechnologiesContent>) });
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await supabase.from('site_config').upsert([{ key: 'technologies', value: technologies }]);
    setSaving(false);
    setSaved(true);
  };

  const updateCategory = (index: number, field: 'id' | 'label', value: string) => {
    setTechnologies((prev) => ({
      ...prev,
      categories: prev.categories.map((c, i) => (i === index ? { ...c, [field]: value } : c)),
    }));
  };

  const moveCategory = (index: number, direction: -1 | 1) => {
    setTechnologies((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.categories.length) return prev;
      const categories = [...prev.categories];
      [categories[index], categories[target]] = [categories[target], categories[index]];
      return { ...prev, categories };
    });
  };

  const removeCategory = (index: number) => {
    setTechnologies((prev) => ({ ...prev, categories: prev.categories.filter((_, i) => i !== index) }));
  };

  const addCategory = () => {
    setTechnologies((prev) => ({
      ...prev,
      categories: [...prev.categories, { id: `categoria-${Date.now()}`, label: 'Nova categoria' }],
    }));
  };

  const updateItem = (index: number, field: 'name' | 'level' | 'category', value: string | number) => {
    setTechnologies((prev) => ({
      ...prev,
      items: prev.items.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }));
  };

  const removeItem = (index: number) => {
    setTechnologies((prev) => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
  };

  const addItem = () => {
    setTechnologies((prev) => ({
      ...prev,
      items: [...prev.items, { name: 'Nova tecnologia', level: 50, category: prev.categories[0]?.id ?? '' }],
    }));
  };

  if (loading) return <p className="text-text-secondary">Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Tecnologias</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Edite as categorias (seções) e as tecnologias exibidas na página "Tecnologias".
      </p>

      <div className="mt-8 space-y-6">
        <div className="card">
          <div className="mb-3 flex items-center justify-between">
            <label className="block font-display text-sm font-medium">Categorias</label>
            <button
              type="button"
              onClick={addCategory}
              className="flex items-center gap-1 text-xs font-semibold text-gold hover:text-gold-light"
            >
              <Plus size={14} /> Adicionar categoria
            </button>
          </div>

          <div className="space-y-2">
            {technologies.categories.map((category, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={category.label}
                  onChange={(e) => updateCategory(index, 'label', e.target.value)}
                  placeholder="Nome da categoria"
                  className="w-full rounded-md border border-text-secondary/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                />
                <input
                  type="text"
                  value={category.id}
                  onChange={(e) => updateCategory(index, 'id', e.target.value)}
                  placeholder="id"
                  className="w-32 shrink-0 rounded-md border border-text-secondary/20 px-3 py-2 font-mono text-xs focus:border-gold focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => moveCategory(index, -1)}
                  disabled={index === 0}
                  className="rounded-md p-1.5 text-text-secondary hover:bg-text-secondary/10 disabled:opacity-30"
                  aria-label="Mover para cima"
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => moveCategory(index, 1)}
                  disabled={index === technologies.categories.length - 1}
                  className="rounded-md p-1.5 text-text-secondary hover:bg-text-secondary/10 disabled:opacity-30"
                  aria-label="Mover para baixo"
                >
                  <ArrowDown size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => removeCategory(index)}
                  className="rounded-md p-1.5 text-red-600 hover:bg-red-50"
                  aria-label="Remover categoria"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="mb-3 flex items-center justify-between">
            <label className="block font-display text-sm font-medium">Tecnologias</label>
            <button
              type="button"
              onClick={addItem}
              className="flex items-center gap-1 text-xs font-semibold text-gold hover:text-gold-light"
            >
              <Plus size={14} /> Adicionar tecnologia
            </button>
          </div>

          <div className="space-y-2">
            {technologies.items.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateItem(index, 'name', e.target.value)}
                  placeholder="Nome"
                  className="w-full rounded-md border border-text-secondary/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                />
                <select
                  value={item.category}
                  onChange={(e) => updateItem(index, 'category', e.target.value)}
                  className="w-48 shrink-0 rounded-md border border-text-secondary/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                >
                  {technologies.categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={item.level}
                  onChange={(e) => updateItem(index, 'level', Number(e.target.value))}
                  className="w-20 shrink-0 rounded-md border border-text-secondary/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                />
                <span className="shrink-0 text-xs text-text-secondary">%</span>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="shrink-0 rounded-md p-1.5 text-red-600 hover:bg-red-50"
                  aria-label="Remover tecnologia"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button type="button" onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? 'Salvando...' : 'Salvar alterações'}
          </button>
          {saved && <span className="text-sm text-green-700">Tecnologias salvas com sucesso!</span>}
        </div>
      </div>
    </div>
  );
}
