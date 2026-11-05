import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cases } from '../data/sitio';
import SectionHeader from './SectionHeader';

const Cases = () => (
  <section id="casos" className="py-16 md:py-24 bg-black scroll-mt-16">
    <div className="container mx-auto px-4 sm:px-6">
      <SectionHeader eyebrow="Casos de éxito" title="Proyectos reales en Bolivia" />
      <div className="grid md:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto">
        {cases.map((c) => (
          <a
            key={c.id}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col bg-white/[0.03] border border-white/10 hover:border-[#c9a961]/40 rounded-3xl overflow-hidden transition-colors"
          >
            <div className="aspect-[16/10] overflow-hidden bg-white/5">
              <img src={c.image} alt={`Proyecto ${c.client}`} width="800" height="500" loading="lazy" decoding="async" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <p className="text-[#c9a961] text-[11px] uppercase tracking-[0.16em] font-black mb-1.5">{c.client} · {c.pillar}</p>
              <h3 className="text-white text-lg font-black leading-snug mb-2">{c.title}</h3>
              <p className="text-white/65 text-sm leading-relaxed mb-3">{c.text}</p>
              {c.result && <p className="text-white/50 text-sm mb-4">Resultado: {c.result}</p>}
              <span className="mt-auto inline-flex items-center gap-1.5 text-white font-bold text-sm group-hover:text-[#c9a961] transition-colors">
                {c.linkLabel} <ArrowUpRight size={16} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Cases;
