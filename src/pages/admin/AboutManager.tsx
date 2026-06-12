import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { defaultAboutExtra } from '@/hooks/useSiteConfig';
import type { AboutExtra } from '@/types';

export default function AboutManager() {
  const [aboutExtra, setAboutExtra] = useState<AboutExtra>(defaultAboutExtra);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase
      .from('site_config')
      .select('key, value')
      .eq('key', 'about_extra')
      .maybeSingle()
      .then(({ data }) => {
        if (data?.value) setAboutExtra({ ...defaultAboutExtra, ...(data.value as Partial<AboutExtra>) });
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await supabase.from('site_config').upsert([{ key: 'about_extra', value: aboutExtra }]);
    setSaving(false);
    setSaved(true);
  };

  const updateItem = (index: number, field: keyof AboutExtra['timeline'][number], value: string) => {
    setAboutExtra((prev) => ({
      ...prev,
      timeline: prev.timeline.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }));
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    setAboutExtra((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.timeline.length) return prev;
      const timeline = [...prev.timeline];
      [timeline[index], timeline[target]] = [timeline[target], timeline[index]];
      return { ...prev, timeline };
    });
  };

  const removeItem = (index: number) => {
    setAboutExtra((prev) => ({ ...prev, timeline: prev.timeline.filter((_, i) => i !== index) }));
  };

  const addItem = () => {
    setAboutExtra((prev) => ({
      ...prev,
      timeline: [...prev.timeline, { period: '', title: '', place: '', description: '' }],
    }));
  };

  if (loading) return <p className="text-text-secondary">Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Sobre — Linha do tempo</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Edite os marcos da evolução de carreira exibidos na página "Sobre".
      </p>

      <div className="mt-8 space-y-4">
        {aboutExtra.timeline.map((item, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold text-text-secondary">Item {index + 1}</p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveItem(index, -1)}
                  disabled={index === 0}
                  className="rounded-md p-1.5 text-text-secondary hover:bg-text-secondary/10 disabled:opacity-30"
                  aria-label="Mover para cima"
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(index, 1)}
                  disabled={index === aboutExtra.timeline.length - 1}
                  className="rounded-md p-1.5 text-text-secondary hover:bg-text-secondary/10 disabled:opacity-30"
                  aria-label="Mover para baixo"
                >
                  <ArrowDown size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="rounded-md p-1.5 text-red-600 hover:bg-red-50"
                  aria-label="Remover item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-text-secondary">Período</label>
                <input
                  type="text"
                  value={item.period}
                  onChange={(e) => updateItem(index, 'period', e.target.value)}
                  placeholder="ex: 2018 — Atualidade"
                  className="w-full rounded-md border border-text-secondary/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-text-secondary">Cargo</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateItem(index, 'title', e.target.value)}
                  className="w-full rounded-md border border-text-secondary/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs text-text-secondary">Empresa / Local</label>
                <input
                  type="text"
                  value={item.place}
                  onChange={(e) => updateItem(index, 'place', e.target.value)}
                  className="w-full rounded-md border border-text-secondary/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs text-text-secondary">Descrição</label>
                <textarea
                  rows={3}
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  className="w-full resize-none rounded-md border border-text-secondary/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-2 rounded-md border border-dashed border-text-secondary/30 px-4 py-3 text-sm font-semibold text-text-secondary hover:border-gold hover:text-gold"
        >
          <Plus size={16} /> Adicionar item
        </button>

        <div className="flex items-center gap-4">
          <button type="button" onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? 'Salvando...' : 'Salvar alterações'}
          </button>
          {saved && <span className="text-sm text-green-700">Linha do tempo salva com sucesso!</span>}
        </div>
      </div>
    </div>
  );
}
