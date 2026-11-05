import React from 'react';
import { Check } from 'lucide-react';
import { plans, plansSection } from '../data/landing';
import { waLink } from '../data/contacto';
import SectionHeader from './SectionHeader';
import WhatsAppIcon from './WhatsAppIcon';
import metaPixel from '../lib/metaPixel';

const PlanCard = ({ plan }) => (
  <article
    className={`relative flex flex-col rounded-3xl p-6 h-full border ${
      plan.highlighted
        ? 'bg-gradient-to-b from-[#c9a961]/[0.12] to-white/[0.02] border-[#c9a961]/60'
        : 'bg-white/[0.03] border-white/10'
    }`}
  >
    {plan.highlighted && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c9a961] text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap">
        Recomendado
      </span>
    )}
    <h3 className="text-white text-xl font-black">{plan.name}</h3>
    <p className="text-white/60 text-sm mt-1 mb-4">{plan.tagline}</p>
    <p className="mb-5">
      <span className="text-[#c9a961] text-4xl font-black tracking-tight tabular-nums">{plan.price}</span>
      <span className="text-white/60 font-bold">{plan.period}</span>
    </p>
    <ul className="space-y-2 mb-6">
      {plan.features.map((f) => (
        <li key={f} className="flex items-start gap-2 text-white/85 text-sm leading-snug">
          <Check size={16} className="text-[#c9a961] mt-0.5 shrink-0" />
          {f}
        </li>
      ))}
    </ul>
    <a
      href={waLink(`Hola Marketing Místico 👋 Me interesa el plan ${plan.name} de publicidad mensual.`)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => metaPixel.trackWhatsAppClick()}
      className={`mt-auto w-full inline-flex items-center justify-center gap-2 font-black text-sm px-5 py-3 rounded-full transition-colors min-h-[46px] ${
        plan.highlighted
          ? 'bg-[#c9a961] hover:bg-[#d4af37] text-black'
          : 'border border-[#c9a961]/50 text-[#c9a961] hover:bg-[#c9a961] hover:text-black'
      }`}
    >
      <WhatsAppIcon size={17} />
      {plan.price === 'A cotizar' ? 'Pedir cotización' : `Quiero el plan ${plan.name}`}
    </a>
  </article>
);

const Offer = () => (
  <section id="oferta" className="py-12 md:py-20 bg-gradient-to-b from-black via-[#0a0a0a] to-black scroll-mt-16">
    <div className="container mx-auto px-4 sm:px-6">
      <SectionHeader {...plansSection} />
      <div className="grid md:grid-cols-3 gap-6 md:gap-5 lg:gap-6 max-w-6xl mx-auto pt-3">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
      <p className="text-center text-white/55 text-sm max-w-2xl mx-auto mt-6 md:mt-8 leading-relaxed">{plansSection.note}</p>
    </div>
  </section>
);

export default Offer;
