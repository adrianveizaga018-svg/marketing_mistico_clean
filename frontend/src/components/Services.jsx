import React from 'react';
import { Globe, Cpu, Megaphone, PenTool, Camera, MailOpen, Check, ArrowDown } from 'lucide-react';
import { services, servicesSection } from '../data/landing';
import { waLink, whatsappMessages } from '../data/contacto';
import SectionHeader from './SectionHeader';
import WhatsAppIcon from './WhatsAppIcon';
import { scrollToSection } from './Navbar';
import metaPixel from '../lib/metaPixel';

const iconMap = { Globe, Cpu, Megaphone, PenTool, Camera, MailOpen };

const ServiceCard = ({ service }) => {
  const Icon = iconMap[service.icon];
  return (
    <article className="relative flex flex-col bg-white/[0.03] border border-white/10 hover:border-[#c9a961]/40 rounded-3xl p-6 sm:p-7 transition-colors h-full">
      {service.isNew && (
        <span className="absolute top-5 right-5 bg-[#c9a961] text-black text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
          Nuevo
        </span>
      )}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-xl bg-[#c9a961]/10 border border-[#c9a961]/25 flex items-center justify-center text-[#c9a961] shrink-0">
          <Icon size={22} />
        </div>
        <p className="text-[#c9a961] text-xs uppercase tracking-[0.14em] font-black">{service.name}</p>
      </div>

      <h3 className="text-xl sm:text-[1.35rem] font-black text-white leading-snug mb-3 text-balance">{service.benefit}</h3>
      <p className="text-white/65 text-[15px] leading-relaxed mb-5">{service.description}</p>

      <ul className="space-y-2.5 mb-6">
        {service.points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-white/85 text-[15px]">
            <Check size={17} className="text-[#c9a961] mt-0.5 shrink-0" />
            {point}
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        {service.anchor ? (
          <button
            onClick={() => scrollToSection(service.anchor)}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#c9a961] hover:bg-[#d4af37] text-black font-black text-sm px-5 py-3.5 rounded-full transition-colors min-h-[48px]"
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
            className="w-full inline-flex items-center justify-center gap-2 border border-[#c9a961]/50 text-[#c9a961] hover:bg-[#c9a961] hover:text-black font-black text-sm px-5 py-3.5 rounded-full transition-colors min-h-[48px]"
          >
            <WhatsAppIcon size={17} />
            {service.cta}
          </a>
        )}
      </div>
    </article>
  );
};

const Services = () => (
  <section id="servicios" className="py-16 md:py-24 bg-black relative scroll-mt-16">
    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      <SectionHeader {...servicesSection} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      <p className="text-center text-white/60 mt-10 text-[15px]">
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
