import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { waLink, whatsappMessages } from '../data/contacto';
import metaPixel from '../lib/metaPixel';

const navItems = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'invitaciones', label: 'Invitaciones' },
  { id: 'trabajos', label: 'Trabajos' },
  { id: 'preguntas', label: 'Preguntas' },
];

// Las secciones cargan de forma diferida: si el id interno aún no existe,
// usamos el ancla del contenedor (data-anchor), que siempre está en el DOM.
export const scrollToSection = (id) => {
  const element = document.getElementById(id) || document.querySelector(`[data-anchor="${id}"]`);
  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const goTo = (id) => {
    scrollToSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isMobileMenuOpen ? 'bg-black/95 backdrop-blur-lg shadow-[0_4px_30px_rgba(201,169,97,0.15)]' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <button type="button" onClick={() => goTo('hero')} aria-label="Ir al inicio">
            <img
              src="/logo_oficial.webp"
              alt="Marketing Místico"
              width="168"
              height="56"
              className="h-9 sm:h-10 md:h-12 w-auto"
            />
          </button>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                className="text-white/80 hover:text-[#c9a961] transition-colors py-2 text-xs uppercase tracking-[0.18em] font-bold"
              >
                {item.label}
              </button>
            ))}
            <a
              href={waLink(whatsappMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => metaPixel.trackWhatsAppClick()}
              className="inline-flex items-center gap-2 bg-[#c9a961] hover:bg-[#d4af37] text-black font-black text-xs uppercase tracking-widest px-6 py-3 rounded-full transition-colors"
            >
              <WhatsAppIcon size={16} />
              Escríbenos
            </a>
          </div>

          {/* Mobile: WhatsApp directo + menú */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={waLink(whatsappMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => metaPixel.trackWhatsAppClick()}
              className="inline-flex items-center gap-1.5 bg-[#c9a961] text-black font-black text-[11px] uppercase tracking-wider px-4 h-10 rounded-full"
            >
              <WhatsAppIcon size={15} />
              WhatsApp
            </a>
            <button
              className="text-[#c9a961] w-11 h-11 flex items-center justify-center -mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#c9a961]/20 mt-3">
            <div className="flex flex-col py-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => goTo(item.id)}
                  className="text-white hover:text-[#c9a961] text-left py-3.5 px-1 font-semibold text-base border-b border-white/5"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
