import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 backdrop-blur-lg shadow-[0_4px_30px_rgba(201,169,97,0.15)]' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="cursor-pointer" onClick={() => scrollToSection('hero')}>
              <img
                src="/logo_oficial.webp"
                alt="Marketing Místico"
                className="h-8 sm:h-10 md:h-14 transition-all transform hover:scale-105"
              />
            </div>
            <a 
              href="/gestion-leads" 
              className="text-[#c9a961]/20 hover:text-[#c9a961] transition-all duration-500 mt-1"
              title="Acceso Gestión"
            >
              <ShieldCheck size={14} className="sm:w-4 sm:h-4" />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 mt-1">
            {['Servicios', 'Trabajos', 'Proceso'].map((item) => (
              <button 
                key={item}
                onClick={() => {
                  const targetId = item === 'Trabajos' ? 'videos' : item.toLowerCase();
                  scrollToSection(targetId);
                }} 
                className="relative text-[#c9a961] hover:text-white transition-colors group py-2 text-xs uppercase tracking-[0.2em] font-bold"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c9a961] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contacto')}
              className="bg-[#c9a961] hover:bg-[#d4af37] text-black font-black text-xs uppercase tracking-widest px-8 py-3 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(201,169,97,0.2)] hover:shadow-[0_0_25px_rgba(201,169,97,0.4)]"
            >
              Contactar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-[#c9a961] p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-[#c9a961]/20">
            <div className="flex flex-col gap-4 pt-4">
              <button onClick={() => scrollToSection('servicios')} className="text-[#c9a961] hover:text-white transition-colors text-left">
                Servicios
              </button>
              <button onClick={() => scrollToSection('videos')} className="text-[#c9a961] hover:text-white transition-colors text-left">
                Trabajos
              </button>
              <button onClick={() => scrollToSection('proceso')} className="text-[#c9a961] hover:text-white transition-colors text-left">
                Proceso
              </button>
              <button 
                onClick={() => scrollToSection('contacto')}
                className="bg-[#c9a961] hover:bg-[#d4af37] text-[#1a1f2e] font-semibold px-6 py-2 rounded-full transition-all text-center"
              >
                Contactar
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
