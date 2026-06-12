import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import { Reveal } from '@/components/shared/Reveal';
import { RotatingTitle } from '@/components/public/RotatingTitle';
import { useSiteContent } from '@/hooks/siteConfigContext';
import { useProjects } from '@/hooks/useProjects';
import { ProjectCard } from '@/components/public/ProjectCard';
import { SOCIAL_LINKS } from '@/lib/socialLinks';

export default function Home() {
  const { content, hero, specialties } = useSiteContent();
  const { projects } = useProjects();
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <SEO
        title="Início"
        description="Fabio Santos — Consultor de Tecnologia e fundador da Full Solutions, especialista em Customer Experience, Zendesk e Inteligência Artificial."
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-deep text-surface">
        <div className="container-section flex min-h-[calc(100vh-4rem)] flex-col items-start justify-center gap-8 py-24">
          <Reveal>
            <p className="section-eyebrow">{hero.eyebrow}</p>
            <h1 className="font-display text-5xl font-bold leading-tight tracking-tight md:text-7xl">
              {hero.name}
            </h1>
            <p className="mt-2 font-display text-2xl font-medium text-surface/80 md:text-3xl">
              {hero.taglinePrefix}{' '}
              <Link to={hero.taglineLinkUrl} className="text-gold-light hover:text-gold">
                {hero.taglineLinkText}
              </Link>
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl font-semibold md:text-4xl">
              <RotatingTitle />
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="max-w-2xl text-base text-surface/70 md:text-lg">
              {content.hero_subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-wrap items-center gap-4">
              <Link to={hero.ctaPrimary.link} className="btn-primary">
                {hero.ctaPrimary.text}
                <ArrowRight size={18} />
              </Link>
              <Link to={hero.ctaSecondary.link} className="btn-secondary text-surface">
                {hero.ctaSecondary.text}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex items-center gap-4 pt-4">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-full border border-surface/15 p-2.5 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Especialidades em destaque */}
      <section className="bg-surface py-24">
        <div className="container-section">
          <Reveal>
            <p className="section-eyebrow">O que eu faço</p>
            <h2 className="text-3xl font-bold md:text-4xl">Áreas de especialização</h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {specialties.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.08}>
                <div className="card h-full">
                  <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary">{item.summary}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-10">
              <Link to="/especialidades" className="inline-flex items-center gap-2 font-display font-semibold text-navy-deep hover:text-gold">
                Ver todas as especialidades
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Projetos em destaque */}
      {featured.length > 0 && (
        <section className="bg-navy-medium py-24 text-surface">
          <div className="container-section">
            <Reveal>
              <p className="section-eyebrow">Portfólio</p>
              <h2 className="text-3xl font-bold md:text-4xl">Projetos em destaque</h2>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {featured.map((project, i) => (
                <Reveal key={project.id} delay={i * 0.1}>
                  <ProjectCard project={project} dark />
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-10">
                <Link to="/projetos" className="inline-flex items-center gap-2 font-display font-semibold text-gold hover:text-gold-light">
                  Ver todos os projetos
                  <ArrowRight size={18} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="bg-surface py-24">
        <div className="container-section text-center">
          <Reveal>
            <h2 className="text-3xl font-bold md:text-4xl">Vamos conversar sobre o seu projeto?</h2>
            <p className="mx-auto mt-4 max-w-xl text-text-secondary">
              Disponível para consultorias, projetos de implementação e parcerias estratégicas.
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
