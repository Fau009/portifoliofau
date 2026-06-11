# PROJETO.md — Portfólio Fábio Fortuny ("Fau")

## Visão geral

Site estático moderno (React + Vite + Supabase) que apresenta Fábio Fortuny como
consultor de tecnologia, especialista em Customer Experience (CX), Zendesk Specialist,
empreendedor (Fortuny One, QualityHub BCR.CX) e pessoa — com uma seção dedicada à vida
fora do trabalho (geek, esportes, família e fé).

O site possui um painel administrativo oculto (`/fau-admin`) para personalização visual
(cores/tema), gestão de projetos do portfólio, conteúdo das páginas, páginas extras e
mensagens recebidas pelo formulário de contato.

## Identidade visual

| Token | Cor |
| --- | --- |
| Navy Deep (primária) | `#0A1628` |
| Navy Medium | `#0D2137` |
| Gold (accent principal) | `#C9A84C` |
| Light Gold (accent secundário) | `#E8C97A` |
| Surface (clara) | `#F8F7F4` |
| Texto primário | `#1A1A2E` |
| Texto secundário | `#64748B` |

Tipografia: **Plus Jakarta Sans** (display/headings), **Inter** (body), **JetBrains Mono** (detalhes técnicos).

Estilo: hero/header escuro com accent dourado, seções claras/escuras alternadas, cards
com borda sutil + hover dourado, micro-animações (fade-in on scroll), sem gradientes
vibrantes — postura executiva e sofisticada.

## Páginas públicas

1. **Home (`/`)** — Hero com nome, título dinâmico rotacionando, subtítulo, CTAs e redes sociais; especialidades em destaque; projetos em destaque; CTA final.
2. **Sobre (`/sobre`)** — Bloco profissional (trajetória BCR.CX, Fortuny One, QualityHub) e bloco pessoal ("Além do Trabalho": geek, esportes, família, fé).
3. **Especialidades (`/especialidades`)** — Tabs: CX, Zendesk Specialist (destaque, com sub-áreas Support/Guide/Explore/Messaging/AI Agents), IA, Dev & Integrações, Gestão de Projetos.
4. **Projetos (`/projetos`)** — Grid de cards com filtro por categoria (BCR.CX / Pessoal / Eventos).
5. **Tecnologias (`/tecnologias`)** — Grid de tecnologias agrupadas por categoria, com nível de expertise.
6. **Contato (`/contato`)** — Formulário (grava em `contact_messages` via Supabase) + links diretos e localização.

## Painel administrativo (`/fau-admin`)

- **Login** via Supabase Auth (e-mail + senha).
- **Dashboard** — resumo: total de projetos, mensagens recebidas, última atualização do tema.
- **Projetos** — CRUD completo (título, categoria, descrição, tecnologias, link, imagem de capa via Supabase Storage, destaque, status).
- **Conteúdo** — edição dos textos do Hero e da página Sobre.
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
