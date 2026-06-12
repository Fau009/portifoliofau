-- ==========================================================
-- Novas seções editáveis pelo admin: Hero (Home), Especialidades,
-- Tecnologias e Linha do tempo (Sobre).
-- ==========================================================

insert into public.site_config (key, value) values (
  'hero',
  '{
    "eyebrow": "Olá, eu sou",
    "name": "Fabio Santos",
    "taglinePrefix": "fundador da",
    "taglineLinkText": "Full Solutions",
    "taglineLinkUrl": "/full-solutions",
    "ctaPrimary": { "text": "Ver Projetos", "link": "/projetos" },
    "ctaSecondary": { "text": "Entrar em Contato", "link": "/contato" }
  }'::jsonb
)
on conflict (key) do update set value = excluded.value;

insert into public.site_config (key, value) values (
  'specialties',
  '[
    {
      "id": "cx",
      "icon": "Headset",
      "title": "Customer Experience (CX)",
      "highlight": false,
      "summary": "Estruturação de operações, fluxos omnichannel, SLA e jornadas do cliente.",
      "topics": [
        "Estruturação de operações",
        "Fluxos omnichannel",
        "SLA e gestão de qualidade",
        "Jornadas do cliente",
        "KPIs e métricas operacionais"
      ],
      "subItems": []
    },
    {
      "id": "zendesk",
      "icon": "Star",
      "title": "Zendesk Specialist",
      "highlight": true,
      "summary": "Support, Guide, Explore, Messaging e AI Agents — todas as certificações Zendesk.",
      "topics": [],
      "subItems": [
        { "title": "Support", "topics": ["Triggers e automações", "Campos customizados", "SLAs", "Macros", "Views", "Gestão de tickets"] },
        { "title": "Guide", "topics": ["Help Center", "Base de conhecimento", "Autoatendimento"] },
        { "title": "Explore", "topics": ["Dashboards", "Relatórios gerenciais", "Métricas operacionais"] },
        { "title": "Messaging", "topics": ["Canais digitais", "Web Widget", "Identificação de usuários"] },
        { "title": "AI Agents", "topics": ["Intent recognition", "Fluxos inteligentes", "Metadata", "Treinamento de IA"] }
      ]
    },
    {
      "id": "ia",
      "icon": "Brain",
      "title": "Inteligência Artificial",
      "highlight": false,
      "summary": "Chatbots, agentes autônomos, OpenAI, Claude/Anthropic e prompt engineering.",
      "topics": [
        "Chatbots e agentes autônomos",
        "OpenAI / GPT",
        "Claude / Anthropic",
        "Prompt engineering",
        "Bases de conhecimento"
      ],
      "subItems": []
    },
    {
      "id": "dev",
      "icon": "Code2",
      "title": "Desenvolvimento & Integrações",
      "highlight": false,
      "summary": "APIs REST, Webhooks, Firebase, Supabase, React/TypeScript.",
      "topics": [
        "APIs REST",
        "Webhooks",
        "Firebase / Firestore",
        "Supabase",
        "React / TypeScript",
        "Integrações entre plataformas (Zendesk, IA, sistemas corporativos)"
      ],
      "subItems": []
    },
    {
      "id": "gestao",
      "icon": "ClipboardList",
      "title": "Gestão de Projetos",
      "highlight": false,
      "summary": "Levantamento de requisitos, desenho de solução, configuração, testes e go-live.",
      "topics": [
        "Levantamento de requisitos",
        "Desenho de solução",
        "Configuração",
        "Testes",
        "Treinamento",
        "Pós-implantação e go-live"
      ],
      "subItems": []
    }
  ]'::jsonb
)
on conflict (key) do update set value = excluded.value;

insert into public.site_config (key, value) values (
  'technologies',
  '{
    "categories": [
      { "id": "cx", "label": "Customer Experience" },
      { "id": "ai", "label": "Inteligência Artificial" },
      { "id": "dev", "label": "Desenvolvimento" },
      { "id": "infra", "label": "Infraestrutura & Deploy" },
      { "id": "design", "label": "Design" }
    ],
    "items": [
      { "name": "Zendesk", "level": 98, "category": "cx" },
      { "name": "Supabase", "level": 90, "category": "infra" },
      { "name": "Firebase", "level": 80, "category": "infra" },
      { "name": "React", "level": 88, "category": "dev" },
      { "name": "TypeScript", "level": 85, "category": "dev" },
      { "name": "Vite", "level": 85, "category": "dev" },
      { "name": "Tailwind CSS", "level": 85, "category": "dev" },
      { "name": "Vercel", "level": 85, "category": "infra" },
      { "name": "OpenAI", "level": 85, "category": "ai" },
      { "name": "Claude / Anthropic", "level": 85, "category": "ai" },
      { "name": "Ultimate.ai", "level": 90, "category": "ai" },
      { "name": "Automações (Make, Zapier, n8n)", "level": 85, "category": "ai" },
      { "name": "Python", "level": 65, "category": "dev" },
      { "name": "APIs REST", "level": 85, "category": "dev" },
      { "name": "GitHub", "level": 85, "category": "dev" },
      { "name": "Figma", "level": 70, "category": "design" }
    ]
  }'::jsonb
)
on conflict (key) do update set value = excluded.value;

insert into public.site_config (key, value) values (
  'about_extra',
  '{
    "timeline": [
      {
        "period": "2013 — 2014",
        "title": "Faturamento",
        "place": "Correios",
        "description": "Registro e organização de documentos enviados por parceiros comerciais, garantindo a integridade dos dados."
      },
      {
        "period": "2015 — 2017",
        "title": "Analista Customer Service",
        "place": "BCR.CX",
        "description": "Atendimento multicanal (telefone, e-mail, chat e redes sociais), vendas no e-commerce e gestão de reclamações no Reclame Aqui."
      },
      {
        "period": "2017",
        "title": "Back Office",
        "place": "BCR.CX",
        "description": "Atendimento a clientes VIP, relação com transportadoras e fornecedores, gestão de documentação e resolução de problemas operacionais."
      },
      {
        "period": "2017",
        "title": "Supervisor de Operações",
        "place": "BCR.CX",
        "description": "Gestão e desenvolvimento de equipe, criação de treinamentos, melhoria de processos e definição de métricas de desempenho."
      },
      {
        "period": "2018 — Atualidade",
        "title": "Digital Head Solutions Consultant",
        "place": "BCR.CX",
        "description": "Liderança da equipe responsável pela implementação e suporte de plataformas de atendimento para clientes de grande porte como Adobe, Lacoste, Bauducco, Pandora e Natura."
      }
    ]
  }'::jsonb
)
on conflict (key) do update set value = excluded.value;
