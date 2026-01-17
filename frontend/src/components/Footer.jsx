import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { footerData } from '../data/mockData';
import metaPixel from '../lib/metaPixel';
import WhatsAppWidget from './WhatsAppWidget';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-[#c9a961]/20 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center">
          {/* 1. Brand & Info */}
          <div className="space-y-6 flex flex-col items-center">
            <img
              src="/logo_oficial.webp"
              alt="Marketing Místico"
              className="h-14"
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
              Combinamos la magia de la creatividad con la ciencia de los datos. Tu socio estratégico para dominar el mercado digital en Bolivia y el mundo.
            </p>
            <div className="flex items-center justify-center gap-2 text-[#c9a961]/80 text-sm">
              <MapPin size={16} />
              <span>La Paz, Bolivia</span>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center justify-center gap-2">
              <span className="w-8 h-[2px] bg-[#c9a961]"></span> Explorar <span className="w-8 h-[2px] bg-[#c9a961]"></span>
            </h3>
            <ul className="space-y-4">
              {['Inicio', 'Nosotros', 'Portafolio', 'Casos de Éxito', 'Agendar Cita'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-[#c9a961] transition-colors text-sm flex items-center justify-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-[1px] bg-[#c9a961] transition-all"></span>
                    {item}
                    <span className="w-0 group-hover:w-2 h-[1px] bg-[#c9a961] transition-all"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center justify-center gap-2">
              <span className="w-8 h-[2px] bg-[#c9a961]"></span> Servicios <span className="w-8 h-[2px] bg-[#c9a961]"></span>
            </h3>
            <ul className="space-y-4">
              {['Publicidad en Redes', 'Desarrollo Web Premium', 'Producción Audiovisual', 'Branding Corporativo', 'Estrategia Digital'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-[#c9a961] transition-colors text-sm flex items-center justify-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-[1px] bg-[#c9a961] transition-all"></span>
                    {item}
                    <span className="w-0 group-hover:w-2 h-[1px] bg-[#c9a961] transition-all"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact & Socials */}
          <div className="flex flex-col items-center">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center justify-center gap-2">
              <span className="w-8 h-[2px] bg-[#c9a961]"></span> Conecta <span className="w-8 h-[2px] bg-[#c9a961]"></span>
            </h3>
            <div className="space-y-4 mb-8 w-full flex flex-col items-center">
              <a href={`mailto:${footerData.email}`} className="flex items-center justify-center gap-3 text-gray-400 hover:text-[#c9a961] transition-colors text-sm group w-full">
                <Mail size={18} className="group-hover:animate-bounce" />
                <span className="break-all">{footerData.email}</span>
              </a>
              <a href={`https://wa.me/${footerData.whatsapp.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 text-gray-400 hover:text-[#c9a961] transition-colors text-sm group w-full">
                <Phone size={18} className="group-hover:animate-pulse" />
                <span>{footerData.whatsapp}</span>
              </a>
            </div>
            
            <div className="flex justify-center gap-3">
              {footerData.social.map((social, index) => {
                return (
                  <a 
                    key={index} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-lg bg-[#1a1f2e] border border-white/5 flex items-center justify-center text-gray-400 hover:bg-[#c9a961] hover:text-black hover:border-[#c9a961] transition-all"
                  >
                     {social.name === 'Facebook' && <Facebook size={18} />}
                     {social.name === 'Instagram' && <Instagram size={18} />}
                     {social.name === 'Linkedin' && <Linkedin size={18} />}
                     {social.name === 'TikTok' && (
                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                         <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                       </svg>
                     )}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#c9a961]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © {currentYear} Marketing Místico. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-[#c9a961] transition-colors">Privacidad</a>
            <a href="#" className="hover:text-[#c9a961] transition-colors">Términos</a>
          </div>
        </div>
      </div>

      {/* WhatsApp Concierge Widget */}
      <WhatsAppWidget />
    </footer>
  );
};

export default Footer;
