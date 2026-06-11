import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { applyTheme, defaultTheme } from '@/hooks/useSiteConfig';
import { useSiteContent } from '@/hooks/siteConfigContext';
import type { ThemeColors } from '@/types';

const FIELDS: { key: keyof ThemeColors; label: string }[] = [
  { key: 'navyDeep', label: 'Navy Deep (primária)' },
  { key: 'navyMedium', label: 'Navy Medium (primária 2)' },
  { key: 'gold', label: 'Gold (accent principal)' },
  { key: 'goldLight', label: 'Light Gold (accent secundário)' },
  { key: 'surface', label: 'Surface (superfície clara)' },
  { key: 'textPrimary', label: 'Texto primário' },
  { key: 'textSecondary', label: 'Texto secundário' },
];

export default function ThemeManager() {
  const { theme, refetch } = useSiteContent();
  const [draft, setDraft] = useState<ThemeColors>(theme);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (key: keyof ThemeColors, value: string) => {
    const next = { ...draft, [key]: value };
    setDraft(next);
    applyTheme(next); // preview em tempo real
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await supabase.from('site_config').upsert({ key: 'theme', value: draft });
    await refetch();
    setSaving(false);
    setSaved(true);
  };

  const handleReset = () => {
    setDraft(defaultTheme);
    applyTheme(defaultTheme);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Tema & Cores</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Personalize a paleta de cores do site. As mudanças são aplicadas em tempo real para preview.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card space-y-4">
          {FIELDS.map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between gap-4">
              <label className="font-display text-sm font-medium">{label}</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={draft[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="h-9 w-9 cursor-pointer rounded border border-text-secondary/20"
                />
                <input
                  type="text"
                  value={draft[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-24 rounded-md border border-text-secondary/20 px-2 py-1.5 font-mono text-xs focus:border-gold focus:outline-none"
                />
              </div>
            </div>
          ))}

          <div className="flex items-center gap-4 pt-2">
            <button type="button" onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-60">
              {saving ? 'Salvando...' : 'Salvar tema'}
            </button>
            <button type="button" onClick={handleReset} className="btn-secondary">
              Restaurar padrão
            </button>
            {saved && <span className="text-sm text-green-700">Tema salvo!</span>}
          </div>
        </div>

        {/* Preview */}
        <div className="overflow-hidden rounded-lg border border-text-secondary/15">
          <div className="p-6" style={{ backgroundColor: draft.navyDeep, color: draft.surface }}>
            <p className="font-mono text-xs uppercase tracking-widest" style={{ color: draft.gold }}>
              Preview
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold">Fábio Fortuny</h3>
            <p className="mt-1 text-sm" style={{ color: draft.goldLight }}>
              Especialista em CX
            </p>
            <button
              type="button"
              className="mt-4 rounded-md px-4 py-2 font-display text-sm font-semibold"
              style={{ backgroundColor: draft.gold, color: draft.navyDeep }}
            >
              Ver Projetos
            </button>
          </div>
          <div className="p-6" style={{ backgroundColor: draft.surface, color: draft.textPrimary }}>
            <h4 className="font-display text-lg font-semibold">Seção clara</h4>
            <p className="mt-1 text-sm" style={{ color: draft.textSecondary }}>
              Texto secundário de exemplo para validar contraste e legibilidade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
