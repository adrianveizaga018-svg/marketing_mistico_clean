import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import { footerData } from '../data/mockData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-[#c9a961]/20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo & Tagline */}
          <div>
            <img
              src="/logo_oficial.webp"
              alt="Marketing Místico"
              className="h-12 mb-4"
            />
            <p className="text-gray-400 leading-relaxed">
              {footerData.tagline}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[#c9a961] font-bold text-lg mb-4">Contacto</h3>
            <div className="space-y-3">
              <a href={`mailto:${footerData.email}`} className="flex items-center gap-2 text-gray-400 hover:text-[#c9a961] transition-colors">
                <Mail size={18} />
                <span>{footerData.email}</span>
              </a>
              <a href={`https://wa.me/${footerData.whatsapp.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-[#c9a961] transition-colors">
                <Phone size={18} />
                <span>{footerData.whatsapp}</span>
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-[#c9a961] font-bold text-lg mb-4">Síguenos</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#1a1f2e] border border-[#c9a961]/30 flex items-center justify-center hover:bg-[#c9a961] hover:border-[#c9a961] transition-all group">
                <Facebook size={18} className="text-[#c9a961] group-hover:text-[#1a1f2e]" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#1a1f2e] border border-[#c9a961]/30 flex items-center justify-center hover:bg-[#c9a961] hover:border-[#c9a961] transition-all group">
                <Instagram size={18} className="text-[#c9a961] group-hover:text-[#1a1f2e]" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#1a1f2e] border border-[#c9a961]/30 flex items-center justify-center hover:bg-[#c9a961] hover:border-[#c9a961] transition-all group">
                <Linkedin size={18} className="text-[#c9a961] group-hover:text-[#1a1f2e]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#c9a961]/20 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Marketing Místico. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a 
        href={`https://wa.me/${footerData.whatsapp.replace(/\s/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-40 group"
      >
        <Phone className="text-white" size={28} />
        <span className="absolute -top-12 right-0 bg-[#1a1f2e] text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          ¡Chatea con nosotros!
        </span>
      </a>
    </footer>
  );
};

export default Footer;
