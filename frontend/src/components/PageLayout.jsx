import React, { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar, { scrollToSection } from './Navbar';

const Footer = lazy(() => import('./Footer'));

// Estructura común de todas las páginas: menú, fondo, contenido y pie.
const PageLayout = ({ children, title, description }) => {
  const { pathname, hash } = useLocation();

  // Título y descripción de cada página (para la pestaña y para Google).
  useEffect(() => {
    if (title) document.title = title;
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);

  // Al cambiar de página: arriba del todo, o a la sección del "#".
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const t = setTimeout(() => scrollToSection(id), 350);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);

  return (
    <div className="bg-black relative min-h-screen">
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#c9a961]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[40%] bg-[#c9a961]/[0.04] rounded-full blur-[140px]" />
      </div>
      <div className="relative z-10">
        <Navbar />
        <main>{children}</main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
};

export default PageLayout;
