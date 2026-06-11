# PROJETO.md — Portfólio Fabio Santos / Full Solutions

## Visão geral

Site estático moderno (React + Vite + Supabase) que apresenta Fabio Santos como
consultor de tecnologia, especialista em Customer Experience (CX), Zendesk Specialist,
e fundador da **Full Solutions** (empresa que reúne consultoria, IA aplicada, produtos
digitais como Fortuny One/QualityHub BCR.CX e eventos) — com uma seção dedicada à vida
fora do trabalho (geek, esportes, família e fé).

O site possui um painel administrativo oculto (`/fau-admin`) para personalização visual
(cores/tema), gestão de projetos do portfólio, conteúdo das páginas (incluindo a página
Full Solutions), páginas extras e mensagens recebidas pelo formulário de contato.

## Identidade visual

| Token | Cor |
| --- | --- |
| Preto (primária) | `#0A0A0A` |
| Preto Médio | `#1A1A1A` |
| Grafite-Cobre (accent principal) | `#8C7A6B` |
| Grafite-Cobre Claro (accent secundário) | `#B5A797` |
| Surface (clara) | `#FAFAFA` |
| Texto primário | `#111111` |
| Texto secundário | `#6B6B6B` |

Tipografia: **Plus Jakarta Sans** (display/headings), **Inter** (body), **JetBrains Mono** (detalhes técnicos).

Estilo: hero/header em preto com accent grafite-cobre sutil, seções claras/escuras
alternadas, cards com borda sutil + hover no accent, micro-animações (fade-in on
scroll), paleta predominantemente preto/branco — postura executiva e sofisticada.

## Páginas públicas

1. **Home (`/`)** — Hero com nome, título dinâmico rotacionando, subtítulo, CTAs e redes sociais; especialidades em destaque; projetos em destaque; CTA final.
2. **Sobre (`/sobre`)** — Bloco profissional (trajetória BCR.CX, Fortuny One, QualityHub) e bloco pessoal ("Além do Trabalho": geek, esportes, família, fé).
3. **Especialidades (`/especialidades`)** — Tabs: CX, Zendesk Specialist (destaque, com sub-áreas Support/Guide/Explore/Messaging/AI Agents), IA, Dev & Integrações, Gestão de Projetos.
4. **Full Solutions (`/full-solutions`)** — Página da empresa: introdução, missão e áreas de atuação (Consultoria CX & Zendesk, IA Aplicada, Produtos Digitais, Eventos & Operações), todas editáveis via painel admin.
5. **Projetos (`/projetos`)** — Grid de cards com filtro por categoria (BCR.CX / Pessoal / Eventos).
6. **Tecnologias (`/tecnologias`)** — Grid de tecnologias agrupadas por categoria, com nível de expertise.
7. **Contato (`/contato`)** — Formulário (grava em `contact_messages` via Supabase) + links diretos e localização.

## Painel administrativo (`/fau-admin`)

- **Login** via Supabase Auth (e-mail + senha).
- **Dashboard** — resumo: total de projetos, mensagens recebidas, última atualização do tema.
- **Projetos** — CRUD completo (título, categoria, descrição, tecnologias, link, imagem de capa via Supabase Storage, destaque, status).
- **Conteúdo** — edição dos textos do Hero, da página Sobre e da página Full Solutions (introdução, missão, áreas de atuação).
- **Tema & Cores** — editor visual de paleta com preview em tempo real, salvo em `site_config`.
- **Páginas** — CRUD de páginas simples (slug, título, conteúdo, publicado/rascunho).
- **Imagens** — upload e gerenciamento de imagens no bucket `site-images`.
- **Mensagens** — lista de mensagens de contato, marcar como lida, excluir.

## Próximos passos sugeridos

- Criar projeto Supabase, rodar as migrations em `supabase/migrations/` e configurar `.env`.
- Criar usuário admin em Supabase Auth (e-mail/senha) para acessar `/fau-admin`.
- Substituir links de redes sociais (placeholders) pelos reais em `Header.tsx`, `Footer.tsx`, `Home.tsx` e `Contact.tsx`.
- Adicionar imagens reais de capa para os projetos via painel admin.
- Deploy na Vercel com as variáveis de ambiente configuradas.
