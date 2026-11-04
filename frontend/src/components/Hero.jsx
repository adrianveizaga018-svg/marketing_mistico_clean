import React, { useState, useEffect } from 'react';
import { ArrowDown, MapPin, Check } from 'lucide-react';
import { heroData } from '../data/mockData';
import { waLink, whatsappMessages } from '../data/contacto';
import WhatsAppIcon from './WhatsAppIcon';
import { scrollToSection } from './Navbar';
import metaPixel from '../lib/metaPixel';

const Hero = () => {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  // El video (2 MB) solo se carga en pantallas grandes: en celular se ahorra datos y carga más rápido.
  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (media.matches && !reducedMotion) setShouldLoadVideo(true);
  }, []);

  return (
    <section id="hero" className="relative flex items-center overflow-hidden min-h-[100svh] bg-black">
      <div className={`absolute inset-y-0 right-0 w-full md:w-[95%] h-full transition-opacity duration-1000 ${shouldLoadVideo ? 'opacity-100' : 'opacity-0'}`}>
        {shouldLoadVideo && (
          <video
            width="1920"
            height="1080"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            aria-hidden="true"
            className="w-full h-full object-cover pointer-events-none"
            style={{ objectPosition: '70% center' }}
          >
            <source src="/video_header.webm" type="video/webm" />
            <source src="/video_header.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent z-[1]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-[1]"></div>
      {/* Tapa la marca de agua del video (esquina inferior derecha) */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[50%] h-[30%] bg-gradient-to-t from-black via-black/80 to-transparent blur-[20px]"></div>
        <div className="absolute top-0 right-0 w-[20%] h-full bg-gradient-to-l from-black via-black/50 to-transparent"></div>
      </div>
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute top-1/4 left-[-10%] w-[60%] h-[60%] bg-[#7c3aed]/10 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[35%] h-[35%] bg-[#c9a961]/15 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:pl-20 lg:pl-32 relative z-10 pt-24 sm:pt-28 pb-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-2 rounded-full mb-5 sm:mb-7">
            <MapPin size={14} className="text-[#c9a961]" />
            <span className="text-white/85 text-[11px] sm:text-xs uppercase tracking-[0.14em] font-bold">Agencia digital en La Paz, Bolivia</span>
          </div>

          <h1 className="text-[2.1rem] leading-[1.08] sm:text-5xl lg:text-6xl font-black mb-5 sm:mb-6 tracking-tight text-balance">
            <span className="text-white">{heroData.title} </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a961] via-[#fff5d1] to-[#c9a961]">
              {heroData.titleHighlight}
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed mb-3 max-w-[30rem]">
            {heroData.subtitle}
          </p>
          <p className="text-sm sm:text-base text-white/65 leading-relaxed mb-7 sm:mb-9 max-w-[30rem]">
            {heroData.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
            <a
              href={waLink(whatsappMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => metaPixel.trackWhatsAppClick()}
              className="group bg-gradient-to-r from-[#c9a961] via-[#f3e3b5] to-[#c9a961] text-black font-black text-[13px] sm:text-sm uppercase tracking-[0.06em] sm:tracking-[0.12em] px-6 sm:px-8 py-4 whitespace-nowrap rounded-full transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] shadow-[0_0_30px_rgba(201,169,97,0.3)] flex items-center justify-center gap-2.5 min-h-[56px]"
            >
              <WhatsAppIcon size={20} />
              {heroData.ctaPrimary}
            </a>
            <button
              onClick={() => scrollToSection('servicios')}
              className="bg-white/5 border border-white/25 text-white hover:bg-white/10 font-semibold text-sm px-7 py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 min-h-[52px]"
            >
              Ver servicios
              <ArrowDown size={16} className="text-[#c9a961]" />
            </button>
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-white/70 text-[13px] mb-9 sm:mb-11">
            {['Cotización sin costo', 'Sin contratos largos', 'Atención directa por WhatsApp'].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check size={14} className="text-[#c9a961]" /> {t}
              </li>
            ))}
          </ul>

          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-bold mb-3">Han confiado en nosotros</p>
            <div className="flex flex-wrap gap-2">
              {heroData.trustedBy.map((client) => (
                <span key={client} className="text-[12px] sm:text-[13px] font-semibold text-white/80 border border-white/10 bg-white/[0.03] px-3 py-1.5 rounded-full">
                  {client}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
