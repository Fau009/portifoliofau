-- ==========================================================
-- Rebrand: Fabio Santos / Full Solutions
-- Atualiza o tema (preto/branco + accent grafite-cobre) e os
-- textos de conteúdo padrão já salvos em site_config.
-- ==========================================================

update public.site_config
set value = '{
  "navyDeep": "#0A0A0A",
  "navyMedium": "#1A1A1A",
  "gold": "#8C7A6B",
  "goldLight": "#B5A797",
  "surface": "#FAFAFA",
  "textPrimary": "#111111",
  "textSecondary": "#6B6B6B"
}'::jsonb
where key = 'theme';

update public.site_config
set value = '{
  "hero_subtitle": "Consultor de tecnologia especializado em Customer Experience, Zendesk e Inteligência Artificial — fundador da Full Solutions, com múltiplas frentes de atuação em consultoria e produtos digitais.",
  "about_professional": "Fabio é consultor de tecnologia especializado em Customer Experience, Zendesk, Inteligência Artificial e Transformação Digital. Fundador da Full Solutions, atua há mais de uma década na área de consultoria da BCR.CX, onde detém todas as certificações Zendesk disponíveis (Admin Expert, implementação, pré-vendas e vendas). Lidera o Squad de Sustentação e Manutenção, gerencia um grande portfólio de contratos e recentemente assumiu responsabilidade expandida cobrindo qualidade e treinamento para toda a área de consultoria.",
  "about_personal": "Quando não está estruturando operações de CX, Fabio gosta de mergulhar no universo geek (animes, séries, mangás e games), acompanhar esportes, e passar tempo com a família e a igreja."
}'::jsonb
where key = 'content';

-- ==========================================================
-- Seed: conteúdo da página Full Solutions
-- ==========================================================
insert into public.site_config (key, value)
values (
  'full_solutions',
  '{
    "intro": "Full Solutions é a empresa criada por Fabio Santos para reunir consultoria em tecnologia, projetos próprios e iniciativas digitais sob uma mesma marca.",
    "mission": "Conectar tecnologia, experiência do cliente e inteligência artificial para criar soluções práticas — desde consultorias de CX e Zendesk até produtos digitais próprios.",
    "areas": [
      {"title": "Consultoria em CX & Zendesk", "description": "Estruturação de operações, implementação e otimização de plataformas de atendimento."},
      {"title": "Inteligência Artificial Aplicada", "description": "Agentes de IA, automações e integrações que tornam operações mais eficientes."},
      {"title": "Produtos Digitais", "description": "Desenvolvimento de plataformas próprias, como Fortuny One e QualityHub BCR.CX."},
      {"title": "Eventos & Operações", "description": "Planejamento e estruturação operacional de eventos de médio e grande porte."}
    ]
  }'::jsonb
)
on conflict (key) do nothing;
