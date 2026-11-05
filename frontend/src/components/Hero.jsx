import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Cpu } from 'lucide-react';
import { homeHero, pillars, owner } from '../data/sitio';
import { waLink, whatsappMessages } from '../data/contacto';
import WhatsAppIcon from './WhatsAppIcon';
import RobotScene from './RobotScene';
import { scrollToSection } from './Navbar';
import metaPixel from '../lib/metaPixel';

const Hero = () => (
  <section id="hero" className="relative overflow-hidden bg-black min-h-[100svh] flex items-center">
    {/* Robot animado (sin video). En celular va detrás del texto, tenue. */}
    <div className="absolute inset-0 md:left-[38%] opacity-35 md:opacity-100 pointer-events-none">
      <RobotScene />
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 md:via-black/40 to-transparent pointer-events-none" />
    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

    <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10 pt-28 pb-14">
      <div className="max-w-xl">
        <p className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-2 rounded-full mb-6 text-white/85 text-[11px] sm:text-xs uppercase tracking-[0.14em] font-bold">
          <Cpu size={14} className="text-[#c9a961]" />
          {homeHero.eyebrow}
        </p>

        <h1 className="text-[2.15rem] leading-[1.08] sm:text-5xl lg:text-[3.6rem] font-black tracking-tight text-balance mb-5">
          <span className="text-white">{homeHero.title} </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a961] via-[#f3e3b5] to-[#c9a961]">{homeHero.titleHighlight}</span>
        </h1>

        <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-8 max-w-[34rem]">{homeHero.subtitle}</p>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <a
            href={waLink(whatsappMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => metaPixel.trackWhatsAppClick()}
            className="bg-gradient-to-r from-[#c9a961] via-[#f3e3b5] to-[#c9a961] text-black font-black text-[13px] sm:text-sm uppercase tracking-[0.08em] px-7 py-4 rounded-full flex items-center justify-center gap-2.5 min-h-[56px] shadow-[0_0_30px_rgba(201,169,97,0.3)] transition-transform hover:scale-[1.03] active:scale-[0.97] whitespace-nowrap"
          >
            <WhatsAppIcon size={20} />
            {homeHero.cta}
          </a>
          <button
            onClick={() => scrollToSection('pilares')}
            className="border border-white/25 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm px-7 py-3.5 rounded-full flex items-center justify-center gap-2 min-h-[52px] transition-colors"
          >
            Ver cómo te ayudamos <ArrowDown size={16} className="text-[#c9a961]" />
          </button>
        </div>

        {/* Quién atiende */}
        <div className="flex items-center gap-3 mb-7">
          <img src={owner.avatar} alt={owner.name || owner.role} width="96" height="96" className="w-12 h-12 rounded-full object-cover ring-2 ring-[#c9a961]/70" />
          <p className="text-white/85 text-sm leading-snug">
            {owner.name ? <strong className="text-white">{owner.name}</strong> : 'Te atiende directamente un'}
            {owner.name ? ` · ${owner.role}` : ` ${owner.role.toLowerCase()}`}
            <span className="block text-white/55 text-xs">Hablas con quien hace el trabajo</span>
          </p>
        </div>

        {/* Atajos a los 3 pilares */}
        <ul className="flex flex-wrap gap-2 mb-8">
          {pillars.map((p) => (
            <li key={p.id}>
              <Link to={p.path} className="inline-block text-[13px] font-bold text-white border border-[#c9a961]/40 bg-[#c9a961]/10 hover:bg-[#c9a961]/20 px-3.5 py-1.5 rounded-full transition-colors">
                {p.name}
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-bold mb-2">Han confiado en nosotros</p>
        <p className="text-white/70 text-sm leading-relaxed">{homeHero.trustedBy.join(' · ')}</p>
      </div>
    </div>
  </section>
);

export default Hero;
