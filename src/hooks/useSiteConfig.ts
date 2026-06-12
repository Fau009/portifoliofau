import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type {
  AboutExtra,
  FullSolutionsContent,
  HeroContent,
  SpecialtyItem,
  TechnologiesContent,
  ThemeColors,
} from '@/types';

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

export const defaultHero: HeroContent = {
  eyebrow: 'Olá, eu sou',
  name: 'Fabio Santos',
  taglinePrefix: 'fundador da',
  taglineLinkText: 'Full Solutions',
  taglineLinkUrl: '/full-solutions',
  ctaPrimary: { text: 'Ver Projetos', link: '/projetos' },
  ctaSecondary: { text: 'Entrar em Contato', link: '/contato' },
};

export const defaultSpecialties: SpecialtyItem[] = [
  {
    id: 'cx',
    icon: 'Headset',
    title: 'Customer Experience (CX)',
    highlight: false,
    summary: 'Estruturação de operações, fluxos omnichannel, SLA e jornadas do cliente.',
    topics: [
      'Estruturação de operações',
      'Fluxos omnichannel',
      'SLA e gestão de qualidade',
      'Jornadas do cliente',
      'KPIs e métricas operacionais',
    ],
    subItems: [],
  },
  {
    id: 'zendesk',
    icon: 'Star',
    title: 'Zendesk Specialist',
    highlight: true,
    summary: 'Support, Guide, Explore, Messaging e AI Agents — todas as certificações Zendesk.',
    topics: [],
    subItems: [
      {
        title: 'Support',
        topics: ['Triggers e automações', 'Campos customizados', 'SLAs', 'Macros', 'Views', 'Gestão de tickets'],
      },
      { title: 'Guide', topics: ['Help Center', 'Base de conhecimento', 'Autoatendimento'] },
      { title: 'Explore', topics: ['Dashboards', 'Relatórios gerenciais', 'Métricas operacionais'] },
      { title: 'Messaging', topics: ['Canais digitais', 'Web Widget', 'Identificação de usuários'] },
      { title: 'AI Agents', topics: ['Intent recognition', 'Fluxos inteligentes', 'Metadata', 'Treinamento de IA'] },
    ],
  },
  {
    id: 'ia',
    icon: 'Brain',
    title: 'Inteligência Artificial',
    highlight: false,
    summary: 'Chatbots, agentes autônomos, OpenAI, Claude/Anthropic e prompt engineering.',
    topics: [
      'Chatbots e agentes autônomos',
      'OpenAI / GPT',
      'Claude / Anthropic',
      'Prompt engineering',
      'Bases de conhecimento',
    ],
    subItems: [],
  },
  {
    id: 'dev',
    icon: 'Code2',
    title: 'Desenvolvimento & Integrações',
    highlight: false,
    summary: 'APIs REST, Webhooks, Firebase, Supabase, React/TypeScript.',
    topics: [
      'APIs REST',
      'Webhooks',
      'Firebase / Firestore',
      'Supabase',
      'React / TypeScript',
      'Integrações entre plataformas (Zendesk, IA, sistemas corporativos)',
    ],
    subItems: [],
  },
  {
    id: 'gestao',
    icon: 'ClipboardList',
    title: 'Gestão de Projetos',
    highlight: false,
    summary: 'Levantamento de requisitos, desenho de solução, configuração, testes e go-live.',
    topics: [
      'Levantamento de requisitos',
      'Desenho de solução',
      'Configuração',
      'Testes',
      'Treinamento',
      'Pós-implantação e go-live',
    ],
    subItems: [],
  },
];

export const defaultTechnologies: TechnologiesContent = {
  categories: [
    { id: 'cx', label: 'Customer Experience' },
    { id: 'ai', label: 'Inteligência Artificial' },
    { id: 'dev', label: 'Desenvolvimento' },
    { id: 'infra', label: 'Infraestrutura & Deploy' },
    { id: 'design', label: 'Design' },
  ],
  items: [
    { name: 'Zendesk', level: 98, category: 'cx' },
    { name: 'Supabase', level: 90, category: 'infra' },
    { name: 'Firebase', level: 80, category: 'infra' },
    { name: 'React', level: 88, category: 'dev' },
    { name: 'TypeScript', level: 85, category: 'dev' },
    { name: 'Vite', level: 85, category: 'dev' },
    { name: 'Tailwind CSS', level: 85, category: 'dev' },
    { name: 'Vercel', level: 85, category: 'infra' },
    { name: 'OpenAI', level: 85, category: 'ai' },
    { name: 'Claude / Anthropic', level: 85, category: 'ai' },
    { name: 'Ultimate.ai', level: 90, category: 'ai' },
    { name: 'Automações (Make, Zapier, n8n)', level: 85, category: 'ai' },
    { name: 'Python', level: 65, category: 'dev' },
    { name: 'APIs REST', level: 85, category: 'dev' },
    { name: 'GitHub', level: 85, category: 'dev' },
    { name: 'Figma', level: 70, category: 'design' },
  ],
};

export const defaultAboutExtra: AboutExtra = {
  timeline: [
    {
      period: '2013 — 2014',
      title: 'Faturamento',
      place: 'Correios',
      description:
        'Registro e organização de documentos enviados por parceiros comerciais, garantindo a integridade dos dados.',
    },
    {
      period: '2015 — 2017',
      title: 'Analista Customer Service',
      place: 'BCR.CX',
      description:
        'Atendimento multicanal (telefone, e-mail, chat e redes sociais), vendas no e-commerce e gestão de reclamações no Reclame Aqui.',
    },
    {
      period: '2017',
      title: 'Back Office',
      place: 'BCR.CX',
      description:
        'Atendimento a clientes VIP, relação com transportadoras e fornecedores, gestão de documentação e resolução de problemas operacionais.',
    },
    {
      period: '2017',
      title: 'Supervisor de Operações',
      place: 'BCR.CX',
      description: 'Gestão e desenvolvimento de equipe, criação de treinamentos, melhoria de processos e definição de métricas de desempenho.',
    },
    {
      period: '2018 — Atualidade',
      title: 'Digital Head Solutions Consultant',
      place: 'BCR.CX',
      description:
        'Liderança da equipe responsável pela implementação e suporte de plataformas de atendimento para clientes de grande porte como Adobe, Lacoste, Bauducco, Pandora e Natura.',
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
  const [hero, setHero] = useState<HeroContent>(defaultHero);
  const [specialties, setSpecialties] = useState<SpecialtyItem[]>(defaultSpecialties);
  const [technologies, setTechnologies] = useState<TechnologiesContent>(defaultTechnologies);
  const [aboutExtra, setAboutExtra] = useState<AboutExtra>(defaultAboutExtra);
  const [loading, setLoading] = useState(true);

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('site_config').select('key, value');

    if (data) {
      const themeRow = data.find((row) => row.key === 'theme');
      const contentRow = data.find((row) => row.key === 'content');
      const fullSolutionsRow = data.find((row) => row.key === 'full_solutions');
      const heroRow = data.find((row) => row.key === 'hero');
      const specialtiesRow = data.find((row) => row.key === 'specialties');
      const technologiesRow = data.find((row) => row.key === 'technologies');
      const aboutExtraRow = data.find((row) => row.key === 'about_extra');

      const mergedTheme = { ...defaultTheme, ...(themeRow?.value as Partial<ThemeColors>) };
      const mergedContent = { ...defaultContent, ...(contentRow?.value as Partial<typeof defaultContent>) };
      const mergedFullSolutions = {
        ...defaultFullSolutions,
        ...(fullSolutionsRow?.value as Partial<FullSolutionsContent>),
      };
      const mergedHero = { ...defaultHero, ...(heroRow?.value as Partial<HeroContent>) };
      const mergedSpecialties = (specialtiesRow?.value as SpecialtyItem[] | undefined) ?? defaultSpecialties;
      const mergedTechnologies = {
        ...defaultTechnologies,
        ...(technologiesRow?.value as Partial<TechnologiesContent>),
      };
      const mergedAboutExtra = { ...defaultAboutExtra, ...(aboutExtraRow?.value as Partial<AboutExtra>) };

      setTheme(mergedTheme);
      setContent(mergedContent);
      setFullSolutions(mergedFullSolutions);
      setHero(mergedHero);
      setSpecialties(mergedSpecialties);
      setTechnologies(mergedTechnologies);
      setAboutExtra(mergedAboutExtra);
      applyTheme(mergedTheme);
    } else {
      applyTheme(defaultTheme);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  return { theme, content, fullSolutions, hero, specialties, technologies, aboutExtra, loading, refetch: fetchConfig };
}
