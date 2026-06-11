import { useState, type FormEvent } from 'react';
import { MessageCircle, MapPin, Send } from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import { Reveal } from '@/components/shared/Reveal';
import { sendContactMessage } from '@/hooks/useContactMessages';
import { GithubIcon, InstagramIcon, LinkedinIcon } from '@/components/shared/BrandIcons';

const SOCIAL_LINKS = [
  { href: 'https://instagram.com/', label: 'Instagram', icon: InstagramIcon },
  { href: 'https://wa.me/5511999999999', label: 'WhatsApp Corporativo', icon: MessageCircle },
  { href: 'https://linkedin.com/in/', label: 'LinkedIn', icon: LinkedinIcon },
  { href: 'https://github.com/', label: 'GitHub', icon: GithubIcon },
];

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const { error } = await sendContactMessage({ name, email, message });

    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <>
      <SEO
        title="Contato"
        description="Entre em contato com Fábio Fortuny para consultorias em CX, Zendesk e projetos de tecnologia."
      />

      <section className="bg-navy-deep py-24 text-surface">
        <div className="container-section">
          <Reveal>
            <p className="section-eyebrow">Vamos conversar</p>
            <h1 className="text-4xl font-bold md:text-5xl">Contato</h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-section grid gap-12 lg:grid-cols-2">
          <Reveal>
            <form onSubmit={handleSubmit} className="card space-y-5">
              <div>
                <label htmlFor="name" className="mb-1.5 block font-display text-sm font-medium">
                  Nome
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-text-secondary/20 bg-white px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block font-display text-sm font-medium">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-text-secondary/20 bg-white px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block font-display text-sm font-medium">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-none rounded-md border border-text-secondary/20 bg-white px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
                />
              </div>

              <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-60">
                {status === 'sending' ? 'Enviando...' : 'Enviar mensagem'}
                <Send size={18} />
              </button>

              {status === 'success' && (
                <p className="text-sm text-green-700">Mensagem enviada com sucesso! Em breve entrarei em contato.</p>
              )}
              {status === 'error' && (
                <p className="text-sm text-red-700">Não foi possível enviar a mensagem. Tente novamente mais tarde.</p>
              )}
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-xl font-bold">Outros canais</h2>
                <div className="mt-4 flex flex-col gap-3">
                  {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-md border border-text-secondary/15 px-4 py-3 transition-colors hover:border-gold hover:text-gold"
                    >
                      <Icon size={20} />
                      <span className="font-display text-sm font-medium">{label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 text-text-secondary">
                <MapPin className="text-gold" size={20} />
                <span>São Paulo, SP, Brasil</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
