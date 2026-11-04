import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Globe, Cpu, Megaphone, PenTool, Camera, MailOpen, MessageCircle, ChevronRight } from 'lucide-react';
import { waLink, whatsappMessages } from '../data/contacto';
import WhatsAppIcon from './WhatsAppIcon';
import metaPixel from '../lib/metaPixel';

// Cada opción abre WhatsApp con un mensaje ya escrito según el servicio.
const options = [
  { id: 'web', label: 'Página web', icon: Globe },
  { id: 'sistemas', label: 'Sistema a medida', icon: Cpu },
  { id: 'publicidad', label: 'Publicidad Facebook / TikTok', icon: Megaphone },
  { id: 'diseno', label: 'Diseño y branding', icon: PenTool },
  { id: 'fotovideo', label: 'Foto y video', icon: Camera },
  { id: 'invitaciones', label: 'Invitación digital', icon: MailOpen },
  { id: 'general', label: 'Otra consulta', icon: MessageCircle },
];

const HIDDEN_ROUTES = ['/gestion-leads'];

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    const onClick = (e) => panelRef.current && !panelRef.current.contains(e.target) && setIsOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [isOpen]);

  if (HIDDEN_ROUTES.includes(pathname)) return null;

  return (
    <div ref={panelRef} className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end">
      {isOpen && (
        <div
          role="dialog"
          aria-label="Escríbenos por WhatsApp"
          className="mb-3 w-[min(340px,calc(100vw-2rem))] bg-[#0b0b0b] border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden animate-pop"
        >
          <div className="bg-gradient-to-r from-[#1a1508] to-black px-5 py-4 border-b border-white/10 flex items-start justify-between gap-3">
            <div>
              <p className="text-white font-black text-base">¿En qué te ayudamos?</p>
              <p className="text-white/60 text-[13px] mt-0.5">Elige un servicio y te abrimos WhatsApp con el mensaje listo.</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar"
              className="text-white/50 hover:text-white w-8 h-8 -mr-1 flex items-center justify-center shrink-0"
            >
              <X size={20} />
            </button>
          </div>
          <ul className="p-2 max-h-[60vh] overflow-y-auto">
            {options.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <a
                  href={waLink(whatsappMessages[id])}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    metaPixel.trackWhatsAppClick();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-white/[0.06] transition-colors group"
                >
                  <span className="w-9 h-9 rounded-xl bg-[#c9a961]/10 text-[#c9a961] flex items-center justify-center shrink-0">
                    <Icon size={18} />
                  </span>
                  <span className="flex-1 text-white text-[15px] font-semibold">{label}</span>
                  <ChevronRight size={16} className="text-white/30 group-hover:text-[#c9a961]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Cerrar opciones de WhatsApp' : 'Escríbenos por WhatsApp'}
        aria-expanded={isOpen}
        className={`h-14 sm:h-16 rounded-full flex items-center justify-center gap-2 shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 active:scale-95 ${
          isOpen ? 'w-14 sm:w-16 bg-white text-black' : 'bg-[#25D366] text-white pl-4 pr-5'
        }`}
      >
        {isOpen ? (
          <X size={26} />
        ) : (
          <>
            <WhatsAppIcon size={28} />
            <span className="font-black text-sm hidden sm:inline">¿Hablamos?</span>
          </>
        )}
      </button>
    </div>
  );
};

export default WhatsAppWidget;
