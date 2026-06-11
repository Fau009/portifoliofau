import { useEffect, useState } from 'react';
import { FolderKanban, Mail, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useProjects } from '@/hooks/useProjects';
import { useContactMessages } from '@/hooks/useContactMessages';

export default function AdminDashboard() {
  const { projects } = useProjects({ includeAll: true });
  const { messages } = useContactMessages();
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('site_config')
      .select('updated_at')
      .order('updated_at', { ascending: false })
      .limit(1)
      .then(({ data }) => {
        if (data && data[0]) setLastUpdate(data[0].updated_at as string);
      });
  }, []);

  const unreadCount = messages.filter((m) => !m.read).length;

  const cards = [
    {
      label: 'Total de projetos',
      value: projects.length,
      icon: FolderKanban,
    },
    {
      label: 'Mensagens recebidas',
      value: messages.length,
      sub: unreadCount > 0 ? `${unreadCount} não lida(s)` : 'Todas lidas',
      icon: Mail,
    },
    {
      label: 'Última atualização do tema',
      value: lastUpdate ? new Date(lastUpdate).toLocaleDateString('pt-BR') : '—',
      icon: Clock,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-text-secondary">Resumo geral do portfólio.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ label, value, sub, icon: Icon }) => (
          <div key={label} className="card">
            <Icon className="text-gold" size={24} />
            <p className="mt-3 text-sm text-text-secondary">{label}</p>
            <p className="mt-1 text-2xl font-bold">{value}</p>
            {sub && <p className="mt-1 text-xs text-text-secondary">{sub}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
