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
    'Fabio começou a carreira em 2013 nos Correios e migrou para o atendimento ao cliente em 2015. Ao longo de quase 11 anos na BCR.CX, evoluiu de Analista de Customer Service para Back Office, depois Supervisor de Operações e hoje atua como Digital Head Solutions Consultant, liderando a equipe responsável pela implementação e suporte de plataformas de atendimento para clientes de grande porte como Adobe, Lacoste, Bauducco, Pandora e Natura. É especialista Zendesk com certificações em toda a suíte — Support, Guide, Talk, Messaging, Sell, Implementation e AI Agents —, atua também com Inteligência Artificial e automações (Make, Zapier, n8n), e é fundador da Full Solutions.',
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
