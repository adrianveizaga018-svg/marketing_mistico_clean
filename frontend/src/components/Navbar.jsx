import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { waLink } from '../data/contacto';
import { navItems, pageMessages } from '../data/sitio';
import metaPixel from '../lib/metaPixel';

// Las secciones cargan de forma diferida: si el id interno aún no existe,
// usamos el ancla del contenedor (data-anchor), que siempre está en el DOM.
export const scrollToSection = (id) => {
  const element = document.getElementById(id) || document.querySelector(`[data-anchor="${id}"]`);
  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => setIsOpen(false), [pathname]);

  // "/#contacto": si ya estamos en inicio, baja; si no, va a inicio y luego baja.
  const goHash = (e, path) => {
    e.preventDefault();
    const id = path.split('#')[1];
    setIsOpen(false);
    if (pathname === '/') scrollToSection(id);
    else navigate(path);
  };

  const message = pageMessages[pathname] || pageMessages['/'];
  const linkClass = ({ isActive }) =>
    `py-2 text-xs uppercase tracking-[0.16em] font-bold transition-colors ${isActive ? 'text-[#c9a961]' : 'text-white/80 hover:text-[#c9a961]'}`;

  const renderItem = (item, mobile = false) => {
    const mobileClass = 'block text-white hover:text-[#c9a961] py-3.5 px-1 font-semibold text-base border-b border-white/5';
    if (item.path.includes('#')) {
      return (
        <a key={item.path} href={item.path} onClick={(e) => goHash(e, item.path)} className={mobile ? mobileClass : linkClass({ isActive: false })}>
          {item.label}
        </a>
      );
    }
    return (
      <NavLink key={item.path} to={item.path} end className={mobile ? ({ isActive }) => `${mobileClass} ${isActive ? '!text-[#c9a961]' : ''}` : linkClass}>
        {item.label}
      </NavLink>
    );
  };

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${isScrolled || isOpen ? 'bg-black/95 backdrop-blur-lg shadow-[0_4px_30px_rgba(201,169,97,0.12)]' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" aria-label="Marketing Místico, inicio">
            <img src="/logo_nav.webp" alt="Marketing Místico" width="168" height="56" className="h-9 sm:h-10 md:h-11 w-auto" />
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => renderItem(item))}
            <a
              href={waLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => metaPixel.trackWhatsAppClick()}
              className="inline-flex items-center gap-2 bg-[#c9a961] hover:bg-[#d4af37] text-black font-black text-xs uppercase tracking-widest px-5 py-3 rounded-full transition-colors"
            >
              <WhatsAppIcon size={16} /> Escríbenos
            </a>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <a
              href={waLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => metaPixel.trackWhatsAppClick()}
              className="inline-flex items-center gap-1.5 bg-[#c9a961] text-black font-black text-[11px] uppercase tracking-wider px-4 h-10 rounded-full"
            >
              <WhatsAppIcon size={15} /> WhatsApp
            </a>
            <button
              className="text-[#c9a961] w-11 h-11 flex items-center justify-center -mr-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {isOpen && <div className="lg:hidden border-t border-[#c9a961]/20 mt-3 py-2">{navItems.map((item) => renderItem(item, true))}</div>}
      </div>
    </nav>
  );
};

export default Navbar;
