import { Link } from 'react-router-dom';
import { ArrowRight, Headset, Brain, Layers, CalendarCheck } from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import { Reveal } from '@/components/shared/Reveal';
import { useSiteContent } from '@/hooks/siteConfigContext';

const AREA_ICONS = [Headset, Brain, Layers, CalendarCheck];

export default function FullSolutions() {
  const { fullSolutions } = useSiteContent();

  return (
    <>
      <SEO
        title="Full Solutions"
        description="Full Solutions — empresa de Fabio Santos reunindo consultoria em CX, Zendesk, Inteligência Artificial e projetos próprios."
      />

      {/* Hero */}
      <section className="bg-navy-deep py-24 text-surface">
        <div className="container-section max-w-4xl">
          <Reveal>
            <p className="section-eyebrow">Nossa empresa</p>
            <h1 className="text-4xl font-bold md:text-5xl">Full Solutions</h1>
            <p className="mt-6 text-lg leading-relaxed text-surface/80">{fullSolutions.intro}</p>
          </Reveal>
        </div>
      </section>

      {/* Missão */}
      <section className="bg-surface py-24">
        <div className="container-section max-w-4xl">
          <Reveal>
            <p className="section-eyebrow">Missão</p>
            <h2 className="text-3xl font-bold md:text-4xl">O que nos move</h2>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">{fullSolutions.mission}</p>
          </Reveal>
        </div>
      </section>

      {/* Áreas de atuação */}
      <section className="bg-navy-medium py-24 text-surface">
        <div className="container-section">
          <Reveal>
            <p className="section-eyebrow">Áreas de atuação</p>
            <h2 className="text-3xl font-bold md:text-4xl">Onde atuamos</h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {fullSolutions.areas.map((area, i) => {
              const Icon = AREA_ICONS[i % AREA_ICONS.length];
              return (
                <Reveal key={area.title} delay={i * 0.08}>
                  <div className="card h-full border-surface/15 bg-surface/5">
                    <Icon className="text-gold" size={28} />
                    <h3 className="mt-3 font-display text-lg font-semibold">{area.title}</h3>
                    <p className="mt-2 text-sm text-surface/70">{area.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-surface py-24">
        <div className="container-section text-center">
          <Reveal>
            <h2 className="text-3xl font-bold md:text-4xl">Quer conversar sobre uma parceria ou projeto?</h2>
            <p className="mx-auto mt-4 max-w-xl text-text-secondary">
              Fale com a Full Solutions e descubra como podemos ajudar.
            </p>
            <div className="mt-8">
              <Link to="/contato" className="btn-primary">
                Entrar em Contato
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
