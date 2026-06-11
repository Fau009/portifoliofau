import { Trash2, Mail, MailOpen } from 'lucide-react';
import { useContactMessages } from '@/hooks/useContactMessages';

export default function MessagesManager() {
  const { messages, loading, markAsRead, removeMessage } = useContactMessages();

  return (
    <div>
      <h1 className="text-2xl font-bold">Mensagens de Contato</h1>
      <p className="mt-1 text-sm text-text-secondary">Mensagens recebidas pelo formulário de contato.</p>

      {loading ? (
        <p className="mt-8 text-text-secondary">Carregando...</p>
      ) : (
        <div className="mt-8 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`card ${msg.read ? '' : 'border-gold/40 bg-gold/5'}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-semibold">{msg.name}</h3>
                    {!msg.read && <span className="rounded-full bg-gold/20 px-2 py-0.5 font-mono text-xs text-gold">Nova</span>}
                  </div>
                  <a href={`mailto:${msg.email}`} className="text-sm text-text-secondary hover:text-gold">
                    {msg.email}
                  </a>
                  <p className="mt-2 text-sm text-text-primary">{msg.message}</p>
                  <p className="mt-2 font-mono text-xs text-text-secondary">
                    {new Date(msg.created_at).toLocaleString('pt-BR')}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => markAsRead(msg.id, !msg.read)}
                    aria-label={msg.read ? 'Marcar como não lida' : 'Marcar como lida'}
                    className="rounded-md border border-text-secondary/20 p-2 hover:border-gold hover:text-gold"
                  >
                    {msg.read ? <Mail size={16} /> : <MailOpen size={16} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeMessage(msg.id)}
                    aria-label="Excluir mensagem"
                    className="rounded-md border border-text-secondary/20 p-2 hover:border-red-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {messages.length === 0 && <p className="text-text-secondary">Nenhuma mensagem recebida ainda.</p>}
        </div>
      )}
    </div>
  );
}
