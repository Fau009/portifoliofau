import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { SiteConfigContext } from '@/hooks/siteConfigContext';

export function PublicLayout() {
  const siteConfig = useSiteConfig();

  return (
    <SiteConfigContext.Provider value={siteConfig}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pt-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </SiteConfigContext.Provider>
  );
}
