import { Gamepad2, Heart, Trophy, Church, Briefcase, Award, Quote } from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import { Reveal } from '@/components/shared/Reveal';
import { useSiteContent } from '@/hooks/siteConfigContext';

const CERTIFICATIONS = [
  { title: 'AI Agents | Advanced', date: 'out/2025' },
  { title: 'Zendesk AI Agent (Ultimate) Technical Expert', date: 'ago/2024' },
  { title: 'Zendesk Implementation Expert', date: 'abr/2024' },
  { title: 'Omnichannel Agent', date: 'dez/2023' },
  { title: 'Talk / Voice', date: 'dez/2023' },
  { title: 'Sell for Users', date: 'dez/2023' },
  { title: 'Sell for Admins', date: 'dez/2023' },
  { title: 'Zendesk Partner Sales Specialist', date: 'jul/2023' },
  { title: 'Zendesk Support Administrator Expert I', date: 'mar/2023' },
  { title: 'Messaging', date: 'dez/2022' },
  { title: 'Guide / Self-service', date: 'jul/2022' },
  { title: 'Foundational Support', date: 'fev/2022' },
  { title: 'Zendesk Partner Presales Expert', date: '2022' },
  { title: 'Zendesk Support Administrator Expert', date: '2022' },
];

const PERSONAL_TOPICS = [
  {
    icon: Gamepad2,
    title: 'Universo Geek',
    description: 'Animes, filmes, séries, mangás e games fazem parte da rotina e da inspiração no dia a dia.',
  },
  {
    icon: Trophy,
    title: 'Esportes',
    description: 'Acompanhar e praticar esportes é uma forma de equilíbrio e disciplina pessoal.',
  },
  {
    icon: Heart,
    title: 'Família',
    description: 'A família é a base de tudo — tempo de qualidade é prioridade.',
  },
  {
    icon: Church,
    title: 'Fé',
    description: 'A vida na igreja é parte importante da jornada pessoal e espiritual.',
  },
];

export default function About() {
  const { content, aboutExtra } = useSiteContent();

  return (
    <>
      <SEO
        title="Sobre Mim"
        description="Conheça a trajetória profissional e pessoal de Fabio Santos, consultor de tecnologia, CX e fundador da Full Solutions."
      />

      {/* Bloco profissional */}
      <section className="bg-navy-deep py-24 text-surface">
        <div className="container-section max-w-4xl">
          <Reveal>
            <p className="section-eyebrow">Sobre mim</p>
            <h1 className="text-4xl font-bold md:text-5xl">Trajetória profissional</h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-surface/80">
              {content.about_professional}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="card border-surface/15 bg-surface/5">
                <h3 className="font-display text-lg font-semibold text-gold">Fortuny One</h3>
                <p className="mt-2 text-sm text-surface/70">
                  Plataforma premium de gestão financeira pessoal e familiar para o mercado brasileiro.
                </p>
              </div>
              <div className="card border-surface/15 bg-surface/5">
                <h3 className="font-display text-lg font-semibold text-gold">QualityHub BCR.CX</h3>
                <p className="mt-2 text-sm text-surface/70">
                  Plataforma interna de qualidade e treinamento, construída com React, Vite, TypeScript e Supabase.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 rounded-lg border border-gold/20 bg-surface/5 p-6">
              <Quote className="text-gold" size={28} />
              <p className="mt-3 text-lg leading-relaxed text-surface/80">
                "O que se destaca é que amo o que eu faço — um profissional satisfeito com o próprio trabalho é um
                profissional completo."
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trajetória */}
      <section className="bg-surface py-24">
        <div className="container-section max-w-4xl">
          <Reveal>
            <p className="section-eyebrow">Linha do tempo</p>
            <h2 className="text-3xl font-bold md:text-4xl">Evolução de carreira</h2>
          </Reveal>

          <div className="mt-12 space-y-6 border-l border-text-secondary/15 pl-6">
            {aboutExtra.timeline.map((item, i) => (
              <Reveal key={`${item.title}-${item.period}`} delay={i * 0.06}>
                <div className="relative">
                  <span className="absolute -left-[31px] top-1.5 flex size-4 items-center justify-center rounded-full bg-gold">
                    <Briefcase className="text-navy-deep" size={10} />
                  </span>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold">{item.period}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold">
                    {item.title} <span className="text-text-secondary">· {item.place}</span>
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certificações */}
      <section className="bg-navy-medium py-24 text-surface">
        <div className="container-section">
          <Reveal>
            <p className="section-eyebrow">Especialista Zendesk</p>
            <h2 className="text-3xl font-bold md:text-4xl">Certificações</h2>
            <p className="mt-3 max-w-2xl text-surface/70">
              Certificações Zendesk abrangendo toda a suíte — Support, Guide, Talk, Messaging, Sell, Implementation e AI
              Agents.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CERTIFICATIONS.map((cert, i) => (
              <Reveal key={cert.title} delay={i * 0.03}>
                <div className="flex items-start gap-3 rounded-md border border-surface/15 bg-surface/5 p-4">
                  <Award className="mt-0.5 shrink-0 text-gold" size={20} />
                  <div>
                    <p className="font-display text-sm font-semibold">{cert.title}</p>
                    <p className="text-xs text-surface/60">{cert.date}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bloco pessoal */}
      <section className="bg-surface py-24">
        <div className="container-section max-w-4xl">
          <Reveal>
            <p className="section-eyebrow">Além do trabalho</p>
            <h2 className="text-3xl font-bold md:text-4xl">Quem é Fabio fora do escritório</h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              {content.about_personal}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PERSONAL_TOPICS.map(({ icon: Icon, title, description }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="card h-full">
                  <Icon className="text-gold" size={28} />
                  <h3 className="mt-3 font-display text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-text-secondary">{description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
