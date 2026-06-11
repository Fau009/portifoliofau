import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { FullSolutionsContent, ThemeColors } from '@/types';

export const defaultTheme: ThemeColors = {
  navyDeep: '#0A0A0A',
  navyMedium: '#1A1A1A',
  gold: '#8C7A6B',
  goldLight: '#B5A797',
  surface: '#FAFAFA',
  textPrimary: '#111111',
  textSecondary: '#6B6B6B',
};

export const defaultContent = {
  hero_subtitle:
    'Consultor de tecnologia especializado em Customer Experience, Zendesk e Inteligência Artificial — fundador da Full Solutions, com múltiplas frentes de atuação em consultoria e produtos digitais.',
  about_professional:
    'Fabio é consultor de tecnologia especializado em Customer Experience, Zendesk, Inteligência Artificial e Transformação Digital. Fundador da Full Solutions, atua há mais de uma década na área de consultoria da BCR.CX, onde detém todas as certificações Zendesk disponíveis (Admin Expert, implementação, pré-vendas e vendas). Lidera o Squad de Sustentação e Manutenção, gerencia um grande portfólio de contratos e recentemente assumiu responsabilidade expandida cobrindo qualidade e treinamento para toda a área de consultoria.',
  about_personal:
    'Quando não está estruturando operações de CX, Fabio gosta de mergulhar no universo geek (animes, séries, mangás e games), acompanhar esportes, e passar tempo com a família e a igreja.',
};

export const defaultFullSolutions: FullSolutionsContent = {
  intro:
    'Full Solutions é a empresa criada por Fabio Santos para reunir consultoria em tecnologia, projetos próprios e iniciativas digitais sob uma mesma marca.',
  mission:
    'Conectar tecnologia, experiência do cliente e inteligência artificial para criar soluções práticas — desde consultorias de CX e Zendesk até produtos digitais próprios.',
  areas: [
    {
      title: 'Consultoria em CX & Zendesk',
      description:
        'Estruturação de operações, implementação e otimização de plataformas de atendimento.',
    },
    {
      title: 'Inteligência Artificial Aplicada',
      description:
        'Agentes de IA, automações e integrações que tornam operações mais eficientes.',
    },
    {
      title: 'Produtos Digitais',
      description:
        'Desenvolvimento de plataformas próprias, como Fortuny One e QualityHub BCR.CX.',
    },
    {
      title: 'Eventos & Operações',
      description:
        'Planejamento e estruturação operacional de eventos de médio e grande porte.',
    },
  ],
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
  const [fullSolutions, setFullSolutions] = useState<FullSolutionsContent>(defaultFullSolutions);
  const [loading, setLoading] = useState(true);

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('site_config').select('key, value');

    if (data) {
      const themeRow = data.find((row) => row.key === 'theme');
      const contentRow = data.find((row) => row.key === 'content');
      const fullSolutionsRow = data.find((row) => row.key === 'full_solutions');

      const mergedTheme = { ...defaultTheme, ...(themeRow?.value as Partial<ThemeColors>) };
      const mergedContent = { ...defaultContent, ...(contentRow?.value as Partial<typeof defaultContent>) };
      const mergedFullSolutions = {
        ...defaultFullSolutions,
        ...(fullSolutionsRow?.value as Partial<FullSolutionsContent>),
      };

      setTheme(mergedTheme);
      setContent(mergedContent);
      setFullSolutions(mergedFullSolutions);
      applyTheme(mergedTheme);
    } else {
      applyTheme(defaultTheme);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  return { theme, content, fullSolutions, loading, refetch: fetchConfig };
}
