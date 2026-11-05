import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Cpu, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { pillars } from '../data/sitio';
import SectionHeader from './SectionHeader';

const icons = { TrendingUp, Cpu, ShieldCheck };

const Pillars = () => (
  <section id="pilares" className="py-16 md:py-24 bg-black scroll-mt-16">
    <div className="container mx-auto px-4 sm:px-6">
      <SectionHeader
        eyebrow="Cómo te ayudamos"
        title="Tres formas de hacer crecer tu negocio"
        subtitle="Elige por dónde empezar. Te decimos con honestidad qué te conviene."
      />
      <div className="grid md:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto">
        {pillars.map((p) => {
          const Icon = icons[p.icon];
          return (
            <article key={p.id} className="flex flex-col bg-white/[0.03] border border-white/10 hover:border-[#c9a961]/40 rounded-3xl p-7 transition-colors">
              <span className="w-12 h-12 rounded-2xl bg-[#c9a961]/10 border border-[#c9a961]/30 text-[#c9a961] flex items-center justify-center mb-5">
                <Icon size={24} />
              </span>
              <h3 className="text-white text-2xl font-black mb-2">{p.name}</h3>
              <p className="text-white/70 leading-relaxed mb-5">{p.phrase}</p>
              <ul className="space-y-2.5 mb-7">
                {p.examples.map((e) => (
                  <li key={e} className="flex items-start gap-2.5 text-white/85 text-[15px]">
                    <Check size={17} className="text-[#c9a961] mt-0.5 shrink-0" /> {e}
                  </li>
                ))}
              </ul>
              <Link
                to={p.path}
                className="mt-auto inline-flex items-center justify-center gap-2 border border-[#c9a961]/50 text-[#c9a961] hover:bg-[#c9a961] hover:text-black font-black text-sm px-5 py-3.5 rounded-full transition-colors min-h-[48px]"
              >
                Ver más <ArrowRight size={16} />
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default Pillars;
