import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Palette,
  Files,
  Image as ImageIcon,
  Mail,
  LogOut,
  ExternalLink,
  Layers,
  Cpu,
  BookOpen,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const NAV_ITEMS = [
  { to: '/fau-admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/fau-admin/projetos', label: 'Projetos', icon: FolderKanban },
  { to: '/fau-admin/conteudo', label: 'Conteúdo', icon: FileText },
  { to: '/fau-admin/especialidades', label: 'Especialidades', icon: Layers },
  { to: '/fau-admin/tecnologias', label: 'Tecnologias', icon: Cpu },
  { to: '/fau-admin/sobre', label: 'Sobre', icon: BookOpen },
  { to: '/fau-admin/tema', label: 'Tema & Cores', icon: Palette },
  { to: '/fau-admin/paginas', label: 'Páginas', icon: Files },
  { to: '/fau-admin/imagens', label: 'Imagens', icon: ImageIcon },
  { to: '/fau-admin/mensagens', label: 'Mensagens', icon: Mail },
];

export function AdminLayout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/fau-admin');
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="flex w-64 shrink-0 flex-col bg-navy-deep text-surface">
        <div className="flex h-16 items-center px-6">
          <span className="font-display text-lg font-bold">
            Fau<span className="text-gold">Admin</span>
          </span>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 font-display text-sm font-medium transition-colors ${
                  isActive ? 'bg-gold/10 text-gold' : 'text-surface/70 hover:bg-surface/5 hover:text-surface'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-1 px-3 pb-6">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 font-display text-sm font-medium text-surface/70 transition-colors hover:bg-surface/5 hover:text-surface"
          >
            <ExternalLink size={18} />
            Ver site
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 font-display text-sm font-medium text-surface/70 transition-colors hover:bg-surface/5 hover:text-surface"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
