-- ==========================================================
-- Seed inicial: projetos
-- ==========================================================

insert into public.projects (title, category, description, technologies, external_url, featured, status)
values
  ('MadeiraMadeira', 'bcr', 'Fluxo de pesquisa de satisfação via WhatsApp com validação de bugs e automações avançadas no Zendesk.', array['Zendesk','WhatsApp','Automações','CX'], null, true, 'published'),
  ('LG Lugar de Gente', 'bcr', '4 AI Agents avançados no Ultimate.ai com fluxogramas Graphviz e documentação técnica completa.', array['Ultimate.ai','AI Agents','Graphviz','Documentação'], null, true, 'published'),
  ('Ajinomoto / Aminoforlife', 'bcr', 'Pesquisa de satisfação customizada, com configuração end-to-end no Zendesk.', array['Zendesk','CX','Pesquisa de Satisfação'], null, false, 'published'),
  ('Motiva', 'bcr', 'Monitoramento proativo de erros via API, com alertas operacionais em tempo real.', array['APIs REST','Monitoramento','Automação'], null, false, 'published'),
  ('iFood Pago', 'bcr', 'AI Agent avançado, com construção de textos institucionais e tom de voz da marca.', array['Ultimate.ai','AI Agents','Tom de Voz'], null, true, 'published'),
  ('Fortuny One', 'personal', 'Plataforma premium de gestão financeira pessoal e familiar para o mercado brasileiro.', array['React','Firebase','Supabase'], 'https://fortunyone.com.br', true, 'published'),
  ('QualityHub BCR.CX', 'personal', 'Plataforma interna de qualidade e treinamento para toda a área de consultoria.', array['React','Vite','TypeScript','Supabase','Vercel'], null, true, 'published'),
  ('FitApp', 'personal', 'App de gestão fitness multi-perfil (Aluno, Personal, Nutricionista, Admin) com módulo financeiro. Em desenvolvimento.', array['React','TypeScript','Supabase'], null, false, 'published'),
  ('Estruturação de Eventos de Médio e Grande Porte', 'events', 'Planejamento operacional, gestão de equipes, controle financeiro, segurança e atendimento ao público em eventos de médio e grande porte.', array['Planejamento','Operações','Gestão de Equipes'], null, false, 'published')
on conflict do nothing;
