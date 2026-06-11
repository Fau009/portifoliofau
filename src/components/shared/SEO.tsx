import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
}

const SITE_NAME = 'Fábio Fortuny | Fau';

export function SEO({ title, description }: SEOProps) {
  const fullTitle = `${title} · ${SITE_NAME}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:site_name" content={SITE_NAME} />}
      {description && <meta property="og:description" content={description} />}
    </Helmet>
  );
}
