import React from 'react';
import { processSection, processSteps } from '../data/landing';
import { waLink, whatsappMessages } from '../data/contacto';
import SectionHeader from './SectionHeader';
import WhatsAppIcon from './WhatsAppIcon';
import metaPixel from '../lib/metaPixel';

const Process = () => (
  <section id="proceso" className="py-16 md:py-24 bg-gradient-to-b from-black via-[#0a0a0a] to-black scroll-mt-16">
    <div className="container mx-auto px-4 sm:px-6">
      <SectionHeader {...processSection} />
      <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
        {processSteps.map((step, i) => (
          <li key={step.title} className="relative bg-white/[0.03] border border-white/10 rounded-3xl p-6">
            <span className="block text-[#c9a961] text-4xl font-black tabular-nums mb-3">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="text-white text-lg font-black mb-2">{step.title}</h3>
            <p className="text-white/65 text-[15px] leading-relaxed">{step.text}</p>
          </li>
        ))}
      </ol>
      <div className="text-center mt-10">
        <a
          href={waLink(whatsappMessages.general)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => metaPixel.trackWhatsAppClick()}
          className="inline-flex items-center gap-2 bg-[#c9a961] hover:bg-[#d4af37] text-black font-black text-sm px-7 py-4 rounded-full transition-colors min-h-[52px]"
        >
          <WhatsAppIcon size={18} />
          Empezar con el paso 1
        </a>
      </div>
    </div>
  </section>
);

export default Process;
