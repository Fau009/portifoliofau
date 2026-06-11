import { Link } from 'react-router-dom';
import { SEO } from '@/components/shared/SEO';

export default function NotFound() {
  return (
    <>
      <SEO title="Página não encontrada" />
      <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-surface px-6 text-center">
        <p className="font-mono text-gold">404</p>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">Página não encontrada</h1>
        <p className="mt-3 max-w-md text-text-secondary">
          O conteúdo que você está procurando não existe ou foi movido.
        </p>
        <Link to="/" className="btn-primary mt-8">
          Voltar para o início
        </Link>
      </section>
    </>
  );
}
