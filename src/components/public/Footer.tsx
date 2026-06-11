import { SOCIAL_LINKS } from '@/lib/socialLinks';

export function Footer() {
  return (
    <footer className="bg-navy-deep text-surface/70">
      <div className="container-section flex flex-col items-center gap-6 py-10 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <p className="font-display text-base font-semibold text-surface">
            Fábio <span className="text-gold">Fortuny</span>
          </p>
          <p className="mt-1 text-sm">Consultor de Tecnologia &amp; CX · São Paulo, SP, Brasil</p>
        </div>

        <div className="flex items-center gap-4">
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
      </div>

      <div className="border-t border-surface/10 py-4 text-center text-xs text-surface/50">
        © {new Date().getFullYear()} Fábio Fortuny. Todos os direitos reservados.
      </div>
    </footer>
  );
}
