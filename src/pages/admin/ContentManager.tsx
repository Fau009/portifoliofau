import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { defaultContent, defaultFullSolutions, defaultHero } from '@/hooks/useSiteConfig';
import type { HeroContent } from '@/types';

export default function ContentManager() {
  const [content, setContent] = useState(defaultContent);
  const [fullSolutions, setFullSolutions] = useState(defaultFullSolutions);
  const [hero, setHero] = useState<HeroContent>(defaultHero);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase
      .from('site_config')
      .select('key, value')
      .in('key', ['content', 'full_solutions', 'hero'])
      .then(({ data }) => {
        const contentRow = data?.find((row) => row.key === 'content');
        const fullSolutionsRow = data?.find((row) => row.key === 'full_solutions');
        const heroRow = data?.find((row) => row.key === 'hero');
        if (contentRow?.value) setContent({ ...defaultContent, ...(contentRow.value as typeof defaultContent) });
        if (fullSolutionsRow?.value) {
          setFullSolutions({ ...defaultFullSolutions, ...(fullSolutionsRow.value as typeof defaultFullSolutions) });
        }
        if (heroRow?.value) setHero({ ...defaultHero, ...(heroRow.value as Partial<HeroContent>) });
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await supabase.from('site_config').upsert([
      { key: 'content', value: content },
      { key: 'full_solutions', value: fullSolutions },
      { key: 'hero', value: hero },
    ]);
    setSaving(false);
    setSaved(true);
  };

  const updateArea = (index: number, field: 'title' | 'description', value: string) => {
    setFullSolutions((prev) => ({
      ...prev,
      areas: prev.areas.map((area, i) => (i === index ? { ...area, [field]: value } : area)),
    }));
  };

  if (loading) return <p className="text-text-secondary">Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Conteúdo</h1>
      <p className="mt-1 text-sm text-text-secondary">Edite os textos das principais seções do site.</p>

      <div className="mt-8 space-y-6">
        <div className="card">
          <label className="mb-3 block font-display text-sm font-medium">Hero (Home) — Apresentação</label>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-text-secondary">Texto de saudação (eyebrow)</label>
              <input
                type="text"
                value={hero.eyebrow}
                onChange={(e) => setHero({ ...hero, eyebrow: e.target.value })}
                className="w-full rounded-md border border-text-secondary/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-text-secondary">Nome</label>
              <input
                type="text"
                value={hero.name}
                onChange={(e) => setHero({ ...hero, name: e.target.value })}
                className="w-full rounded-md border border-text-secondary/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-text-secondary">Texto antes do link (tagline)</label>
              <input
                type="text"
                value={hero.taglinePrefix}
                onChange={(e) => setHero({ ...hero, taglinePrefix: e.target.value })}
                className="w-full rounded-md border border-text-secondary/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block text-xs text-text-secondary">Texto do link</label>
                <input
                  type="text"
                  value={hero.taglineLinkText}
                  onChange={(e) => setHero({ ...hero, taglineLinkText: e.target.value })}
                  className="w-full rounded-md border border-text-secondary/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-text-secondary">Link</label>
                <input
                  type="text"
                  value={hero.taglineLinkUrl}
                  onChange={(e) => setHero({ ...hero, taglineLinkUrl: e.target.value })}
                  className="w-full rounded-md border border-text-secondary/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                />
              </div>
            </div>
          </div>

          <label className="mb-3 mt-6 block font-display text-sm font-medium">Hero (Home) — Botões</label>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-text-secondary/15 p-4">
              <p className="mb-2 text-xs font-semibold text-text-secondary">Botão principal</p>
              <label className="mb-1 block text-xs text-text-secondary">Texto</label>
              <input
                type="text"
                value={hero.ctaPrimary.text}
                onChange={(e) => setHero({ ...hero, ctaPrimary: { ...hero.ctaPrimary, text: e.target.value } })}
                className="w-full rounded-md border border-text-secondary/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
              />
              <label className="mb-1 mt-2 block text-xs text-text-secondary">Link</label>
              <input
                type="text"
                value={hero.ctaPrimary.link}
                onChange={(e) => setHero({ ...hero, ctaPrimary: { ...hero.ctaPrimary, link: e.target.value } })}
                className="w-full rounded-md border border-text-secondary/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <div className="rounded-md border border-text-secondary/15 p-4">
              <p className="mb-2 text-xs font-semibold text-text-secondary">Botão secundário</p>
              <label className="mb-1 block text-xs text-text-secondary">Texto</label>
              <input
                type="text"
                value={hero.ctaSecondary.text}
                onChange={(e) => setHero({ ...hero, ctaSecondary: { ...hero.ctaSecondary, text: e.target.value } })}
                className="w-full rounded-md border border-text-secondary/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
              />
              <label className="mb-1 mt-2 block text-xs text-text-secondary">Link</label>
              <input
                type="text"
                value={hero.ctaSecondary.link}
                onChange={(e) => setHero({ ...hero, ctaSecondary: { ...hero.ctaSecondary, link: e.target.value } })}
                className="w-full rounded-md border border-text-secondary/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
              />
            </div>
          </div>
        </div>

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

        <div className="card">
          <label className="mb-1.5 block font-display text-sm font-medium">Full Solutions — Introdução</label>
          <textarea
            rows={3}
            value={fullSolutions.intro}
            onChange={(e) => setFullSolutions({ ...fullSolutions, intro: e.target.value })}
            className="w-full resize-none rounded-md border border-text-secondary/20 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
          />
        </div>

        <div className="card">
          <label className="mb-1.5 block font-display text-sm font-medium">Full Solutions — Missão</label>
          <textarea
            rows={3}
            value={fullSolutions.mission}
            onChange={(e) => setFullSolutions({ ...fullSolutions, mission: e.target.value })}
            className="w-full resize-none rounded-md border border-text-secondary/20 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
          />
        </div>

        <div className="card">
          <label className="mb-3 block font-display text-sm font-medium">Full Solutions — Áreas de atuação</label>
          <div className="grid gap-4 sm:grid-cols-2">
            {fullSolutions.areas.map((area, i) => (
              <div key={i} className="rounded-md border border-text-secondary/15 p-4">
                <input
                  type="text"
                  value={area.title}
                  onChange={(e) => updateArea(i, 'title', e.target.value)}
                  placeholder="Título"
                  className="w-full rounded-md border border-text-secondary/20 px-3 py-2 text-sm font-semibold focus:border-gold focus:outline-none"
                />
                <textarea
                  rows={2}
                  value={area.description}
                  onChange={(e) => updateArea(i, 'description', e.target.value)}
                  placeholder="Descrição"
                  className="mt-2 w-full resize-none rounded-md border border-text-secondary/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                />
              </div>
            ))}
          </div>
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
