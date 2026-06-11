# CLAUDE.md

Convenções técnicas para trabalhar neste repositório com Claude Code.

## Stack

- **Frontend:** React 19 + Vite + TypeScript + Tailwind CSS v4 (configuração via `@theme` em `src/index.css`, sem `tailwind.config.js`)
- **Roteamento:** React Router v7 (`BrowserRouter`)
- **Backend:** Supabase (Postgres + Auth + Storage + RLS)
- **Animações:** Framer Motion (componente `Reveal` para fade-in on scroll)
- **SEO:** `react-helmet-async` (componente `SEO`)
- **Ícones:** `lucide-react`
- **Deploy:** Vercel

## Estrutura de pastas

```
src/
├── components/
│   ├── public/   # Header, Footer, Layout, ProjectCard, RotatingTitle
│   ├── admin/    # AdminLayout, ProtectedRoute
│   └── shared/   # SEO, Reveal
├── pages/
│   ├── public/   # Home, About, Specialties, Projects, Technologies, Contact, NotFound
│   └── admin/    # Login, Dashboard, ProjectsManager, ContentManager, ThemeManager, PagesManager, ImagesManager, MessagesManager
├── hooks/        # useAuth, useProjects, useSiteConfig, useContactMessages, siteConfigContext
├── lib/          # supabaseClient, mockData
└── types/        # Tipos compartilhados (Project, ThemeColors, etc.)
```

## Convenções

- Alias `@/` aponta para `src/` (configurado em `vite.config.ts` e `tsconfig.app.json`).
- Componentes funcionais com TypeScript, sem classes.
- Estilos exclusivamente via classes utilitárias Tailwind. Classes reutilizáveis ficam em `@layer components` (`src/index.css`): `.container-section`, `.btn-primary`, `.btn-secondary`, `.card`, `.section-eyebrow`.
- Cores e fontes do tema são definidas como variáveis CSS (`--color-*`, `--font-*`) no bloco `@theme`. O painel admin (`/fau-admin/tema`) sobrescreve essas variáveis em runtime via `applyTheme()`.
- Toda página pública usa o componente `<SEO title="..." description="..." />`.
- Animações de entrada usam `<Reveal delay={...}>`, mantendo timing sutil (≤ 0.7s, easing `easeOut`).
- Hooks de dados (`useProjects`, etc.) fazem fallback para `mockData.ts` quando o Supabase não está configurado/disponível — útil para desenvolvimento local sem credenciais.

## Painel administrativo

- Rota oculta: `/fau-admin` (login) → `/fau-admin/dashboard` (após autenticação).
- Protegido por `ProtectedRoute` + Supabase Auth (e-mail/senha).
- Toda escrita em `projects`, `site_config`, `pages`, `contact_messages` exige usuário autenticado (RLS — ver `supabase/migrations/0001_initial_schema.sql`).
- Upload de imagens vai para o bucket `site-images` no Supabase Storage.

## Banco de dados

- Migrations em `supabase/migrations/`. Rode na ordem numérica no SQL Editor do Supabase ou via Supabase CLI.
- `0001_initial_schema.sql`: tabelas, RLS, bucket de storage, seeds de tema/conteúdo.
- `0002_seed_projects.sql`: seed dos projetos reais do portfólio.

## Comandos

```bash
npm run dev       # ambiente de desenvolvimento
npm run build     # build de produção (tsc -b && vite build)
npm run lint      # ESLint
npm run preview   # preview do build
```
