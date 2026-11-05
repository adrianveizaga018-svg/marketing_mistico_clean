import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { waLink } from '../data/contacto';
import metaPixel from '../lib/metaPixel';

// Botón de WhatsApp reutilizable. variant: "gold" (principal), "outline" o "green".
const styles = {
  gold: 'bg-[#c9a961] hover:bg-[#d4af37] text-black',
  outline: 'border border-[#c9a961]/50 text-[#c9a961] hover:bg-[#c9a961] hover:text-black',
  green: 'bg-[#25D366] hover:bg-[#1fbe5b] text-white',
};

const WhatsAppButton = ({ message, children, variant = 'gold', className = '' }) => (
  <a
    href={waLink(message)}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => metaPixel.trackWhatsAppClick()}
    className={`inline-flex items-center justify-center gap-2 font-black text-sm px-7 py-4 rounded-full transition-colors min-h-[52px] ${styles[variant]} ${className}`}
  >
    <WhatsAppIcon size={19} /> {children}
  </a>
);

export default WhatsAppButton;
