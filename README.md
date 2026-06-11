# Fabio Santos — Portfólio Pessoal & Full Solutions

Site de portfólio profissional de **Fabio Santos**, consultor de tecnologia
especializado em Customer Experience, Zendesk e Inteligência Artificial, e fundador
da **Full Solutions**. Inclui uma página dedicada à Full Solutions e um painel
administrativo oculto para personalização de tema, conteúdo, projetos e mensagens
de contato.

## Stack

- **Frontend:** React 19 + Vite + TypeScript + Tailwind CSS v4
- **Roteamento:** React Router v7
- **Backend:** Supabase (Postgres + Auth + Storage + Row Level Security)
- **Animações:** Framer Motion
- **SEO:** react-helmet-async
- **Deploy:** Vercel

## Estrutura do projeto

```
src/
├── components/
│   ├── public/    # Header, Footer, Layout, ProjectCard, RotatingTitle
│   ├── admin/     # AdminLayout, ProtectedRoute
│   └── shared/    # SEO, Reveal (animações)
├── pages/
│   ├── public/    # Home, Sobre, Especialidades, Projetos, Tecnologias, Contato
│   └── admin/     # Login, Dashboard, gerenciadores (Projetos, Conteúdo, Tema, Páginas, Imagens, Mensagens)
├── hooks/         # useAuth, useProjects, useSiteConfig, useContactMessages
├── lib/           # supabaseClient, mockData
└── types/         # Tipos TypeScript compartilhados

supabase/
└── migrations/    # SQL: schema, RLS, storage, seeds
```

## Como rodar localmente

### Pré-requisitos

- Node.js 20+
- Conta no [Supabase](https://supabase.com) (opcional para desenvolvimento — há fallback para dados mockados)

### Passos

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# edite .env com as credenciais do seu projeto Supabase

# 3. Rodar o servidor de desenvolvimento
npm run dev
```

O site ficará disponível em `http://localhost:5173`.

> **Sem Supabase configurado:** as páginas públicas funcionam normalmente com dados
> mockados (`src/lib/mockData.ts`). O painel admin (`/fau-admin`) requer Supabase
> configurado e um usuário criado no Supabase Auth.

## Variáveis de ambiente

| Variável | Descrição |
| --- | --- |
| `VITE_SUPABASE_URL` | URL do projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Chave pública (anon) do Supabase |

## Configurando o Supabase

1. Crie um novo projeto em [supabase.com](https://supabase.com).
2. No **SQL Editor**, rode as migrations na ordem:
   - `supabase/migrations/0001_initial_schema.sql`
   - `supabase/migrations/0002_seed_projects.sql`
3. Em **Authentication → Users**, crie um usuário (e-mail/senha) — será o login do painel admin.
4. Copie a **URL** e a **anon key** do projeto (Settings → API) para o `.env`.

## Painel administrativo

- Acesso: `/fau-admin` (rota oculta, sem links públicos).
- Login com e-mail/senha do Supabase Auth.
- Após login, redireciona para `/fau-admin/dashboard`.
- Funcionalidades: Dashboard, CRUD de Projetos, Conteúdo (textos editáveis), Tema &
  Cores (com preview em tempo real), Páginas customizadas, Imagens (Supabase Storage)
  e Mensagens de contato.

## Scripts disponíveis

```bash
npm run dev       # ambiente de desenvolvimento com HMR
npm run build     # build de produção (tsc -b && vite build)
npm run lint      # executa o ESLint
npm run preview   # preview local do build de produção
```

## Deploy na Vercel

1. Faça push do repositório para o GitHub.
2. Em [vercel.com](https://vercel.com), importe o repositório.
3. Framework preset: **Vite**.
4. Configure as variáveis de ambiente (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) em **Settings → Environment Variables**.
5. Deploy.

> Build command: `npm run build` · Output directory: `dist`

## Licença

Todos os direitos reservados — Fabio Santos / Full Solutions.
