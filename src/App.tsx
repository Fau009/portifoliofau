import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PublicLayout } from '@/components/public/PublicLayout';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';

import Home from '@/pages/public/Home';
import About from '@/pages/public/About';
import Specialties from '@/pages/public/Specialties';
import FullSolutions from '@/pages/public/FullSolutions';
import Projects from '@/pages/public/Projects';
import Technologies from '@/pages/public/Technologies';
import Contact from '@/pages/public/Contact';
import NotFound from '@/pages/public/NotFound';

import AdminLogin from '@/pages/admin/Login';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminProjects from '@/pages/admin/ProjectsManager';
import AdminContent from '@/pages/admin/ContentManager';
import AdminSpecialties from '@/pages/admin/SpecialtiesManager';
import AdminTechnologies from '@/pages/admin/TechnologiesManager';
import AdminAbout from '@/pages/admin/AboutManager';
import AdminTheme from '@/pages/admin/ThemeManager';
import AdminPages from '@/pages/admin/PagesManager';
import AdminImages from '@/pages/admin/ImagesManager';
import AdminMessages from '@/pages/admin/MessagesManager';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* Site público */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/especialidades" element={<Specialties />} />
            <Route path="/full-solutions" element={<FullSolutions />} />
            <Route path="/projetos" element={<Projects />} />
            <Route path="/tecnologias" element={<Technologies />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Login admin (sem layout) */}
          <Route path="/fau-admin" element={<AdminLogin />} />

          {/* Painel admin protegido */}
          <Route
            path="/fau-admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="projetos" element={<AdminProjects />} />
            <Route path="conteudo" element={<AdminContent />} />
            <Route path="especialidades" element={<AdminSpecialties />} />
            <Route path="tecnologias" element={<AdminTechnologies />} />
            <Route path="sobre" element={<AdminAbout />} />
            <Route path="tema" element={<AdminTheme />} />
            <Route path="paginas" element={<AdminPages />} />
            <Route path="imagens" element={<AdminImages />} />
            <Route path="mensagens" element={<AdminMessages />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
