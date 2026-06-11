import { useState } from 'react';
import { SEO } from '@/components/shared/SEO';
import { Reveal } from '@/components/shared/Reveal';
import { ProjectCard } from '@/components/public/ProjectCard';
import { useProjects } from '@/hooks/useProjects';
import type { ProjectCategory } from '@/types';

const FILTERS: { id: ProjectCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'bcr', label: 'BCR.CX' },
  { id: 'personal', label: 'Pessoal' },
  { id: 'events', label: 'Eventos' },
];

export default function Projects() {
  const { projects, loading } = useProjects();
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <SEO
        title="Projetos"
        description="Portfólio de projetos de Fabio Santos e da Full Solutions: clientes BCR.CX, projetos pessoais e eventos."
      />

      <section className="bg-navy-deep py-24 text-surface">
        <div className="container-section">
          <Reveal>
            <p className="section-eyebrow">Portfólio</p>
            <h1 className="text-4xl font-bold md:text-5xl">Projetos</h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-section">
          <Reveal>
            <div className="flex flex-wrap gap-3">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={`rounded-full border px-4 py-2 font-display text-sm font-medium transition-colors ${
                    filter === f.id
                      ? 'border-gold bg-gold text-navy-deep'
                      : 'border-text-secondary/20 text-text-secondary hover:border-gold/60 hover:text-text-primary'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>

          {loading ? (
            <p className="mt-12 text-text-secondary">Carregando projetos...</p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project, i) => (
                <Reveal key={project.id} delay={(i % 6) * 0.06}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <p className="mt-12 text-text-secondary">Nenhum projeto encontrado nesta categoria.</p>
          )}
        </div>
      </section>
    </>
  );
}
