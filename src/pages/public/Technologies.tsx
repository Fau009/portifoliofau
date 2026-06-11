import { SEO } from '@/components/shared/SEO';
import { Reveal } from '@/components/shared/Reveal';
import { mockTechnologies } from '@/lib/mockData';

const CATEGORY_LABELS: Record<string, string> = {
  cx: 'Customer Experience',
  dev: 'Desenvolvimento',
  infra: 'Infraestrutura & Deploy',
  ai: 'Inteligência Artificial',
  design: 'Design',
};

const CATEGORY_ORDER = ['cx', 'ai', 'dev', 'infra', 'design'];

export default function Technologies() {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: mockTechnologies.filter((t) => t.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <SEO
        title="Tecnologias"
        description="Stack técnico e ferramentas dominadas por Fábio Fortuny: Zendesk, Supabase, React, IA e mais."
      />

      <section className="bg-navy-deep py-24 text-surface">
        <div className="container-section">
          <Reveal>
            <p className="section-eyebrow">Stack & Ferramentas</p>
            <h1 className="text-4xl font-bold md:text-5xl">Tecnologias</h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-section space-y-12">
          {grouped.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 0.05}>
              <h2 className="font-display text-xl font-bold text-navy-deep">
                {CATEGORY_LABELS[group.category]}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((tech) => (
                  <div key={tech.name} className="card">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-semibold">{tech.name}</span>
                      <span className="font-mono text-xs text-gold">{tech.level}%</span>
                    </div>
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-text-secondary/10">
                      <div
                        className="h-full rounded-full bg-gold"
                        style={{ width: `${tech.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
