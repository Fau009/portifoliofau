import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { defaultContent } from '@/hooks/useSiteConfig';

export default function ContentManager() {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase
      .from('site_config')
      .select('value')
      .eq('key', 'content')
      .maybeSingle()
      .then(({ data }) => {
        if (data?.value) setContent({ ...defaultContent, ...(data.value as typeof defaultContent) });
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await supabase.from('site_config').upsert({ key: 'content', value: content });
    setSaving(false);
    setSaved(true);
  };

  if (loading) return <p className="text-text-secondary">Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Conteúdo</h1>
      <p className="mt-1 text-sm text-text-secondary">Edite os textos das principais seções do site.</p>

      <div className="mt-8 space-y-6">
        <div className="card">
          <label className="mb-1.5 block font-display text-sm font-medium">Subtítulo do Hero (Home)</label>
          <textarea
            rows={3}
            value={content.hero_subtitle}
            onChange={(e) => setContent({ ...content, hero_subtitle: e.target.value })}
            className="w-full resize-none rounded-md border border-text-secondary/20 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
          />
        </div>

        <div className="card">
          <label className="mb-1.5 block font-display text-sm font-medium">Sobre Mim — Bloco profissional</label>
          <textarea
            rows={6}
            value={content.about_professional}
            onChange={(e) => setContent({ ...content, about_professional: e.target.value })}
            className="w-full resize-none rounded-md border border-text-secondary/20 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
          />
        </div>

        <div className="card">
          <label className="mb-1.5 block font-display text-sm font-medium">Sobre Mim — Além do Trabalho</label>
          <textarea
            rows={4}
            value={content.about_personal}
            onChange={(e) => setContent({ ...content, about_personal: e.target.value })}
            className="w-full resize-none rounded-md border border-text-secondary/20 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <button type="button" onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? 'Salvando...' : 'Salvar alterações'}
          </button>
          {saved && <span className="text-sm text-green-700">Conteúdo salvo com sucesso!</span>}
        </div>
      </div>
    </div>
  );
}
