import React from 'react';
import { Globe, Cpu, Megaphone, PenTool, Camera, MailOpen, Check, ArrowDown } from 'lucide-react';
import { services, servicesSection } from '../data/landing';
import { waLink, whatsappMessages } from '../data/contacto';
import SectionHeader from './SectionHeader';
import SwipeHint from './SwipeHint';
import WhatsAppIcon from './WhatsAppIcon';
import { scrollToSection } from './Navbar';
import metaPixel from '../lib/metaPixel';

const iconMap = { Globe, Cpu, Megaphone, PenTool, Camera, MailOpen };

const ServiceCard = ({ service }) => {
  const Icon = iconMap[service.icon];
  return (
    <article className="relative flex flex-col bg-white/[0.03] border border-white/10 hover:border-[#c9a961]/40 rounded-3xl overflow-hidden transition-colors h-full">
      <div className="relative aspect-[16/10] bg-white/5 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          width="800"
          height="500"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-black/60 border border-[#c9a961]/40 flex items-center justify-center text-[#c9a961]">
            <Icon size={16} />
          </span>
          <span className="text-white text-xs uppercase tracking-[0.14em] font-black drop-shadow">{service.name}</span>
        </div>
        {service.isNew && (
          <span className="absolute top-3 right-3 bg-[#c9a961] text-black text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
            Nuevo
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <h3 className="text-lg sm:text-xl font-black text-white leading-snug mb-3 text-balance">{service.benefit}</h3>
        <ul className="space-y-2 mb-5">
          {service.points.map((point) => (
            <li key={point} className="flex items-start gap-2 text-white/80 text-sm">
              <Check size={16} className="text-[#c9a961] mt-0.5 shrink-0" />
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          {service.anchor ? (
            <button
              onClick={() => scrollToSection(service.anchor)}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#c9a961] hover:bg-[#d4af37] text-black font-black text-sm px-5 py-3 rounded-full transition-colors min-h-[46px]"
            >
              Ver paquetes y precios
              <ArrowDown size={16} />
            </button>
          ) : (
            <a
              href={waLink(whatsappMessages[service.message])}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => metaPixel.trackWhatsAppClick()}
              className="w-full inline-flex items-center justify-center gap-2 border border-[#c9a961]/50 text-[#c9a961] hover:bg-[#c9a961] hover:text-black font-black text-sm px-5 py-3 rounded-full transition-colors min-h-[46px]"
            >
              <WhatsAppIcon size={17} />
              {service.cta}
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

const Services = () => (
  <section id="servicios" className="py-12 md:py-20 bg-black relative scroll-mt-16">
    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      <SectionHeader {...servicesSection} />
      <div className="snap-row md:grid-cols-2 lg:grid-cols-3 md:gap-6 max-w-6xl mx-auto">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      <SwipeHint text="Desliza para ver los 6 servicios" />
      <p className="text-center text-white/60 mt-6 md:mt-10 text-[15px]">
        ¿No sabes qué necesitas?{' '}
        <a
          href={waLink(whatsappMessages.general)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => metaPixel.trackWhatsAppClick()}
          className="text-[#c9a961] font-bold underline underline-offset-4"
        >
          Cuéntanos tu caso y te orientamos gratis
        </a>
      </p>
    </div>
  </section>
);

export default Services;
