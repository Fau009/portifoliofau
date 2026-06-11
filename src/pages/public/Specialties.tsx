import { useState } from 'react';
import { Headset, Brain, Code2, ClipboardList, Star } from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import { Reveal } from '@/components/shared/Reveal';

interface Specialty {
  id: string;
  icon: typeof Headset;
  title: string;
  highlight?: boolean;
  topics: string[];
  subItems?: { title: string; topics: string[] }[];
}

const SPECIALTIES: Specialty[] = [
  {
    id: 'cx',
    icon: Headset,
    title: 'Customer Experience (CX)',
    topics: [
      'Estruturação de operações',
      'Fluxos omnichannel',
      'SLA e gestão de qualidade',
      'Jornadas do cliente',
      'KPIs e métricas operacionais',
    ],
  },
  {
    id: 'zendesk',
    icon: Star,
    title: 'Zendesk Specialist',
    highlight: true,
    topics: [],
    subItems: [
      { title: 'Support', topics: ['Triggers e automações', 'Campos customizados', 'SLAs', 'Macros', 'Views', 'Gestão de tickets'] },
      { title: 'Guide', topics: ['Help Center', 'Base de conhecimento', 'Autoatendimento'] },
      { title: 'Explore', topics: ['Dashboards', 'Relatórios gerenciais', 'Métricas operacionais'] },
      { title: 'Messaging', topics: ['Canais digitais', 'Web Widget', 'Identificação de usuários'] },
      { title: 'AI Agents', topics: ['Intent recognition', 'Fluxos inteligentes', 'Metadata', 'Treinamento de IA'] },
    ],
  },
  {
    id: 'ia',
    icon: Brain,
    title: 'Inteligência Artificial',
    topics: [
      'Chatbots e agentes autônomos',
      'OpenAI / GPT',
      'Claude / Anthropic',
      'Prompt engineering',
      'Bases de conhecimento',
    ],
  },
  {
    id: 'dev',
    icon: Code2,
    title: 'Desenvolvimento & Integrações',
    topics: [
      'APIs REST',
      'Webhooks',
      'Firebase / Firestore',
      'Supabase',
      'React / TypeScript',
      'Integrações entre plataformas (Zendesk, IA, sistemas corporativos)',
    ],
  },
  {
    id: 'gestao',
    icon: ClipboardList,
    title: 'Gestão de Projetos',
    topics: [
      'Levantamento de requisitos',
      'Desenho de solução',
      'Configuração',
      'Testes',
      'Treinamento',
      'Pós-implantação e go-live',
    ],
  },
];

export default function Specialties() {
  const [active, setActive] = useState(SPECIALTIES[1].id);
  const current = SPECIALTIES.find((s) => s.id === active) ?? SPECIALTIES[0];
  const Icon = current.icon;

  return (
    <>
      <SEO
        title="Especialidades"
        description="Áreas de especialização de Fábio Fortuny: CX, Zendesk, Inteligência Artificial, Desenvolvimento e Gestão de Projetos."
      />

      <section className="bg-navy-deep py-24 text-surface">
        <div className="container-section">
          <Reveal>
            <p className="section-eyebrow">O que eu faço</p>
            <h1 className="text-4xl font-bold md:text-5xl">Especialidades</h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-section">
          {/* Tabs */}
          <Reveal>
            <div className="flex flex-wrap gap-3">
              {SPECIALTIES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActive(s.id)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 font-display text-sm font-medium transition-colors ${
                    active === s.id
                      ? 'border-gold bg-gold text-navy-deep'
                      : 'border-text-secondary/20 text-text-secondary hover:border-gold/60 hover:text-text-primary'
                  } ${s.highlight ? 'ring-1 ring-gold/30' : ''}`}
                >
                  <s.icon size={16} />
                  {s.title}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Content */}
          <Reveal key={current.id} delay={0.05}>
            <div className="card mt-8">
              <div className="flex items-center gap-3">
                <Icon className="text-gold" size={28} />
                <h2 className="font-display text-2xl font-bold">{current.title}</h2>
              </div>

              {current.subItems ? (
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {current.subItems.map((sub) => (
                    <div key={sub.title} className="rounded-md border border-gold/20 bg-gold/5 p-4">
                      <h3 className="font-display font-semibold text-gold">{sub.title}</h3>
                      <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                        {sub.topics.map((topic) => (
                          <li key={topic} className="flex items-start gap-2">
                            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {current.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2 text-text-secondary">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                      {topic}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
