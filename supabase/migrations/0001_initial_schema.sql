-- ==========================================================
-- Fau Portfolio - Schema inicial
-- ==========================================================

-- Extensão necessária para gen_random_uuid()
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------
-- Tabela: projects
-- ----------------------------------------------------------
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  category text not null check (category in ('bcr', 'personal', 'events')),
  description text,
  technologies text[] default '{}',
  external_url text,
  cover_image_url text,
  featured boolean default false,
  status text default 'draft' check (status in ('published', 'draft')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- ----------------------------------------------------------
-- Tabela: site_config
-- ----------------------------------------------------------
create table if not exists public.site_config (
  key text primary key,
  value jsonb not null,
  updated_at timestamp with time zone default now()
);

-- ----------------------------------------------------------
-- Tabela: pages
-- ----------------------------------------------------------
create table if not exists public.pages (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  content text,
  published boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- ----------------------------------------------------------
-- Tabela: contact_messages
-- ----------------------------------------------------------
create table if not exists public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  read boolean default false,
  created_at timestamp with time zone default now()
);

-- ----------------------------------------------------------
-- Trigger genérico para updated_at
-- ----------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at_projects
  before update on public.projects
  for each row execute function public.set_updated_at();

create trigger set_updated_at_pages
  before update on public.pages
  for each row execute function public.set_updated_at();

create trigger set_updated_at_site_config
  before update on public.site_config
  for each row execute function public.set_updated_at();

-- ==========================================================
-- Row Level Security
-- ==========================================================

alter table public.projects enable row level security;
alter table public.site_config enable row level security;
alter table public.pages enable row level security;
alter table public.contact_messages enable row level security;

-- ----------------------------------------------------------
-- projects: leitura pública de itens publicados,
-- escrita apenas para usuários autenticados (admin)
-- ----------------------------------------------------------
create policy "Projetos publicados são públicos"
  on public.projects for select
  using (status = 'published');

create policy "Admins podem ver todos os projetos"
  on public.projects for select
  to authenticated
  using (true);

create policy "Admins podem inserir projetos"
  on public.projects for insert
  to authenticated
  with check (true);

create policy "Admins podem atualizar projetos"
  on public.projects for update
  to authenticated
  using (true)
  with check (true);

create policy "Admins podem excluir projetos"
  on public.projects for delete
  to authenticated
  using (true);

-- ----------------------------------------------------------
-- site_config: leitura pública, escrita apenas autenticados
-- ----------------------------------------------------------
create policy "Configurações do site são públicas"
  on public.site_config for select
  using (true);

create policy "Admins podem inserir configurações"
  on public.site_config for insert
  to authenticated
  with check (true);

create policy "Admins podem atualizar configurações"
  on public.site_config for update
  to authenticated
  using (true)
  with check (true);

create policy "Admins podem excluir configurações"
  on public.site_config for delete
  to authenticated
  using (true);

-- ----------------------------------------------------------
-- pages: leitura pública de páginas publicadas,
-- gestão completa para autenticados
-- ----------------------------------------------------------
create policy "Páginas publicadas são públicas"
  on public.pages for select
  using (published = true);

create policy "Admins podem ver todas as páginas"
  on public.pages for select
  to authenticated
  using (true);

create policy "Admins podem inserir páginas"
  on public.pages for insert
  to authenticated
  with check (true);

create policy "Admins podem atualizar páginas"
  on public.pages for update
  to authenticated
  using (true)
  with check (true);

create policy "Admins podem excluir páginas"
  on public.pages for delete
  to authenticated
  using (true);

-- ----------------------------------------------------------
-- contact_messages: qualquer pessoa pode inserir (formulário
-- de contato), apenas autenticados podem ler/gerenciar
-- ----------------------------------------------------------
create policy "Qualquer pessoa pode enviar mensagem de contato"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);

create policy "Admins podem ver mensagens de contato"
  on public.contact_messages for select
  to authenticated
  using (true);

create policy "Admins podem atualizar mensagens de contato"
  on public.contact_messages for update
  to authenticated
  using (true)
  with check (true);

create policy "Admins podem excluir mensagens de contato"
  on public.contact_messages for delete
  to authenticated
  using (true);

-- ==========================================================
-- Storage: bucket para imagens (capas de projetos, galeria)
-- ==========================================================
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

create policy "Imagens do site são públicas para leitura"
  on storage.objects for select
  using (bucket_id = 'site-images');

create policy "Admins podem enviar imagens"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'site-images');

create policy "Admins podem atualizar imagens"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'site-images');

create policy "Admins podem excluir imagens"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'site-images');

-- ==========================================================
-- Seed inicial: configuração de tema padrão
-- ==========================================================
insert into public.site_config (key, value)
values (
  'theme',
  '{
    "navyDeep": "#0A1628",
    "navyMedium": "#0D2137",
    "gold": "#C9A84C",
    "goldLight": "#E8C97A",
    "surface": "#F8F7F4",
    "textPrimary": "#1A1A2E",
    "textSecondary": "#64748B"
  }'::jsonb
)
on conflict (key) do nothing;

-- ==========================================================
-- Seed inicial: conteúdo editável (Hero, Sobre)
-- ==========================================================
insert into public.site_config (key, value)
values (
  'content',
  '{
    "hero_subtitle": "Consultor de tecnologia especializado em Customer Experience, Zendesk e Inteligência Artificial — transformando operações em experiências memoráveis.",
    "about_professional": "Fábio é consultor de tecnologia especializado em Customer Experience, Zendesk, Inteligência Artificial e Transformação Digital. Co-fundador da área de consultoria da BCR.CX há mais de uma década, detém todas as certificações Zendesk disponíveis (Admin Expert, implementação, pré-vendas e vendas). Lidera o Squad de Sustentação e Manutenção, gerencia um grande portfólio de contratos e recentemente assumiu responsabilidade expandida cobrindo qualidade e treinamento para toda a área de consultoria.",
    "about_personal": "Quando não está estruturando operações de CX, Fau gosta de mergulhar no universo geek (animes, séries, mangás e games), acompanhar esportes, e passar tempo com a família e a igreja."
  }'::jsonb
)
on conflict (key) do nothing;
