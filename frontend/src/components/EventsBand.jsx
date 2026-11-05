import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { eventsBand } from '../data/sitio';

const EventsBand = () => (
  <section className="py-14 md:py-20 bg-black">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center rounded-3xl border border-[#c9a961]/30 bg-gradient-to-br from-[#1a1508] via-[#0b0905] to-black p-7 md:p-12">
        <div>
          <p className="text-[#c9a961] text-xs uppercase tracking-[0.2em] font-black mb-3">{eventsBand.eyebrow}</p>
          <h2 className="text-white text-[1.75rem] sm:text-4xl font-black tracking-tight leading-tight mb-4 text-balance">{eventsBand.title}</h2>
          <p className="text-white/70 leading-relaxed mb-6 max-w-xl">{eventsBand.text}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 mb-7">
            {eventsBand.points.map((pt) => (
              <li key={pt} className="flex items-center gap-2 text-white/85 text-sm">
                <Check size={16} className="text-[#c9a961]" /> {pt}
              </li>
            ))}
          </ul>
          <Link
            to={eventsBand.path}
            className="inline-flex items-center gap-2 bg-[#c9a961] hover:bg-[#d4af37] text-black font-black text-sm px-7 py-3.5 rounded-full transition-colors min-h-[48px]"
          >
            Ver invitaciones y paquetes <ArrowRight size={16} />
          </Link>
        </div>
        <img
          src="/img/svc-invitaciones.webp"
          alt="Tres ejemplos de invitaciones digitales en celular: boda, quinceañero y cumpleaños infantil"
          width="800"
          height="500"
          loading="lazy"
          decoding="async"
          className="order-first md:order-none w-full md:w-[420px] rounded-2xl border border-white/10"
        />
      </div>
    </div>
  </section>
);

export default EventsBand;
