import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { ThemeColors } from '@/types';

export const defaultTheme: ThemeColors = {
  navyDeep: '#0A1628',
  navyMedium: '#0D2137',
  gold: '#C9A84C',
  goldLight: '#E8C97A',
  surface: '#F8F7F4',
  textPrimary: '#1A1A2E',
  textSecondary: '#64748B',
};

export const defaultContent = {
  hero_subtitle:
    'Consultor de tecnologia especializado em Customer Experience, Zendesk e Inteligência Artificial — transformando operações em experiências memoráveis.',
  about_professional:
    'Fábio é consultor de tecnologia especializado em Customer Experience, Zendesk, Inteligência Artificial e Transformação Digital. Co-fundador da área de consultoria da BCR.CX há mais de uma década, detém todas as certificações Zendesk disponíveis (Admin Expert, implementação, pré-vendas e vendas). Lidera o Squad de Sustentação e Manutenção, gerencia um grande portfólio de contratos e recentemente assumiu responsabilidade expandida cobrindo qualidade e treinamento para toda a área de consultoria.',
  about_personal:
    'Quando não está estruturando operações de CX, Fau gosta de mergulhar no universo geek (animes, séries, mangás e games), acompanhar esportes, e passar tempo com a família e a igreja.',
};

const THEME_VAR_MAP: Record<keyof ThemeColors, string> = {
  navyDeep: '--color-navy-deep',
  navyMedium: '--color-navy-medium',
  gold: '--color-gold',
  goldLight: '--color-gold-light',
  surface: '--color-surface',
  textPrimary: '--color-text-primary',
  textSecondary: '--color-text-secondary',
};

export function applyTheme(theme: Partial<ThemeColors>) {
  const root = document.documentElement;
  for (const [key, cssVar] of Object.entries(THEME_VAR_MAP) as [keyof ThemeColors, string][]) {
    const value = theme[key];
    if (value) root.style.setProperty(cssVar, value);
  }
}

export function useSiteConfig() {
  const [theme, setTheme] = useState<ThemeColors>(defaultTheme);
  const [content, setContent] = useState<typeof defaultContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('site_config').select('key, value');

    if (data) {
      const themeRow = data.find((row) => row.key === 'theme');
      const contentRow = data.find((row) => row.key === 'content');

      const mergedTheme = { ...defaultTheme, ...(themeRow?.value as Partial<ThemeColors>) };
      const mergedContent = { ...defaultContent, ...(contentRow?.value as Partial<typeof defaultContent>) };

      setTheme(mergedTheme);
      setContent(mergedContent);
      applyTheme(mergedTheme);
    } else {
      applyTheme(defaultTheme);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  return { theme, content, loading, refetch: fetchConfig };
}
