import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { ctaData } from '../data/mockData';
import metaPixel from '../lib/metaPixel';
import { waLink, whatsappMessages } from '../data/contacto';
import WhatsAppIcon from './WhatsAppIcon';

const CTA = () => (
  <section className="py-14 md:py-20 bg-black relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#c9a961]/10 rounded-full blur-[120px] pointer-events-none" />
    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-[2rem] leading-tight sm:text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
          {ctaData.title}
        </h2>
        <p className="text-base md:text-xl text-white/70 mb-6 md:mb-8 leading-snug max-w-xl mx-auto">
          {ctaData.subtitle}
        </p>
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-8 text-white/75 text-sm">
          {ctaData.features.map((feature) => (
            <li key={feature} className="flex items-center gap-1.5">
              <Check size={15} className="text-[#c9a961]" /> {feature.replace(/^✓\s*/, '')}
            </li>
          ))}
        </ul>
        <a
          href={waLink(whatsappMessages.general)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => metaPixel.trackWhatsAppClick()}
          className="group inline-flex items-center gap-3 bg-[#c9a961] hover:bg-[#d4af37] text-black font-black text-sm md:text-base uppercase tracking-[0.12em] px-8 md:px-12 py-4 md:py-5 rounded-full transition-colors shadow-[0_0_40px_rgba(201,169,97,0.3)] min-h-[56px]"
        >
          <WhatsAppIcon size={20} />
          {ctaData.buttonText}
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
        </a>
      </div>
    </div>
  </section>
);

export default CTA;
