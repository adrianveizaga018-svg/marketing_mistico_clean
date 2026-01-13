import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
      isScrolled ? 'bg-[#0f1419]/95 backdrop-blur-lg border-b border-[#c9a961]/20 shadow-2xl' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
            <img 
              src="/logo_oficial.png" 
              alt="Marketing Místico" 
              className="h-8 md:h-10 transition-all transform hover:scale-105"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('servicios')} className="text-[#c9a961] hover:text-white transition-colors">
              Servicios
            </button>
            <button onClick={() => scrollToSection('videos')} className="text-[#c9a961] hover:text-white transition-colors">
              Trabajos
            </button>
            <button onClick={() => scrollToSection('proceso')} className="text-[#c9a961] hover:text-white transition-colors">
              Proceso
            </button>
            <button 
              onClick={() => scrollToSection('contacto')}
              className="bg-[#c9a961] hover:bg-[#d4af37] text-[#1a1f2e] font-semibold px-6 py-2 rounded-full transition-all hover:scale-105"
            >
              Contactar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-[#c9a961]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
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
