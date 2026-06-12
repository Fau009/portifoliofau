import { useState } from 'react';
import { SEO } from '@/components/shared/SEO';
import { Reveal } from '@/components/shared/Reveal';
import { useSiteContent } from '@/hooks/siteConfigContext';
import { renderIcon } from '@/lib/iconMap';

export default function Specialties() {
  const { specialties } = useSiteContent();
  const [active, setActive] = useState(specialties[1]?.id ?? specialties[0]?.id);
  const current = specialties.find((s) => s.id === active) ?? specialties[0];

  return (
    <>
      <SEO
        title="Especialidades"
        description="Áreas de especialização de Fabio Santos: CX, Zendesk, Inteligência Artificial, Desenvolvimento e Gestão de Projetos."
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
              {specialties.map((s) => (
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
                  {renderIcon(s.icon, { size: 16 })}
                  {s.title}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Content */}
          <Reveal key={current.id} delay={0.05}>
            <div className="card mt-8">
              <div className="flex items-center gap-3">
                {renderIcon(current.icon, { className: 'text-gold', size: 28 })}
                <h2 className="font-display text-2xl font-bold">{current.title}</h2>
              </div>

              {current.subItems.length > 0 ? (
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
