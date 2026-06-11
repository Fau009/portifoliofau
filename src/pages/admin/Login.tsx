import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { SEO } from '@/components/shared/SEO';

export default function AdminLogin() {
  const { signIn, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && isAuthenticated) {
    return <Navigate to="/fau-admin/dashboard" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError('Credenciais inválidas. Verifique seu e-mail e senha.');
      setSubmitting(false);
    } else {
      navigate('/fau-admin/dashboard');
    }
  };

  return (
    <>
      <SEO title="Acesso Restrito" />
      <div className="flex min-h-screen items-center justify-center bg-navy-deep px-6 text-surface">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="rounded-full border border-gold/40 p-3">
              <Lock className="text-gold" size={24} />
            </div>
            <h1 className="mt-4 font-display text-2xl font-bold">Acesso Restrito</h1>
            <p className="mt-1 text-sm text-surface/60">Painel administrativo</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-surface/10 bg-surface/5 p-6">
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
                className="w-full rounded-md border border-surface/15 bg-navy-medium px-4 py-2.5 text-sm text-surface focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block font-display text-sm font-medium">
                Senha
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-surface/15 bg-navy-medium px-4 py-2.5 text-sm text-surface focus:border-gold focus:outline-none"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
              {submitting ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
