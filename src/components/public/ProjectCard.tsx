import { ExternalLink } from 'lucide-react';
import type { Project } from '@/types';

const CATEGORY_LABELS: Record<Project['category'], string> = {
  bcr: 'BCR.CX',
  personal: 'Pessoal',
  events: 'Eventos',
};

interface ProjectCardProps {
  project: Project;
  dark?: boolean;
}

export function ProjectCard({ project, dark = false }: ProjectCardProps) {
  const content = (
    <div
      className={`card flex h-full flex-col ${
        dark
          ? 'border-surface/15 bg-surface/5 hover:border-gold/50 hover:shadow-gold/10'
          : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="section-eyebrow mb-0">{CATEGORY_LABELS[project.category]}</span>
        {project.external_url && <ExternalLink size={16} className="text-gold" />}
      </div>

      <h3 className="mt-2 font-display text-lg font-semibold">{project.title}</h3>

      {project.description && (
        <p className={`mt-2 text-sm ${dark ? 'text-surface/70' : 'text-text-secondary'}`}>
          {project.description}
        </p>
      )}

      {project.technologies.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className={`rounded-full border px-3 py-1 font-mono text-xs ${
                dark ? 'border-surface/15 text-surface/70' : 'border-text-secondary/20 text-text-secondary'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  if (project.external_url) {
    return (
      <a href={project.external_url} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </a>
    );
  }

  return content;
}
