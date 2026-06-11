import { Gamepad2, Heart, Trophy, Church } from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import { Reveal } from '@/components/shared/Reveal';
import { useSiteContent } from '@/hooks/siteConfigContext';

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
  const { content } = useSiteContent();

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
