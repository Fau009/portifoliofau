import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/especialidades', label: 'Especialidades' },
  { to: '/projetos', label: 'Projetos' },
  { to: '/tecnologias', label: 'Tecnologias' },
  { to: '/contato', label: 'Contato' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-navy-deep/95 shadow-lg shadow-black/10 backdrop-blur' : 'bg-navy-deep/80 backdrop-blur-sm'
      }`}
    >
      <div className="container-section flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-lg font-bold tracking-tight text-surface">
          Fábio<span className="text-gold"> Fortuny</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `font-display text-sm font-medium transition-colors ${
                  isActive ? 'text-gold' : 'text-surface/80 hover:text-gold-light'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="text-surface md:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-surface/10 bg-navy-deep md:hidden">
          <div className="container-section flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 font-display text-sm font-medium transition-colors ${
                    isActive ? 'bg-gold/10 text-gold' : 'text-surface/80 hover:bg-surface/5 hover:text-gold-light'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
