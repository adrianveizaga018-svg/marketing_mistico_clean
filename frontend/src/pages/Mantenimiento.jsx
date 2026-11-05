import React from 'react';
import { Wrench, Check, Pencil } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import WhatsAppButton from '../components/WhatsAppButton';
import { mantenimientoPage as page } from '../data/paginas';
import { pageMessages } from '../data/sitio';

const Mantenimiento = () => (
  <PageLayout title={page.seoTitle} description={page.seoDescription}>
    <PageHero icon={Wrench} eyebrow={page.hero.eyebrow} title={page.hero.title} subtitle={page.hero.subtitle} />

    <section className="pb-12 md:pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-6 md:gap-5 lg:gap-6 max-w-6xl mx-auto pt-3">
          {page.plans.map((plan) => (
            <article
              key={plan.id}
              className={`relative flex flex-col rounded-3xl p-6 border ${plan.highlighted ? 'bg-gradient-to-b from-[#c9a961]/[0.12] to-white/[0.02] border-[#c9a961]/60' : 'bg-white/[0.03] border-white/10'}`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c9a961] text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Recomendado</span>
              )}
              <h2 className="text-white text-xl font-black">{plan.name}</h2>
              <p className="text-white/60 text-sm mt-1 mb-4">{plan.tagline}</p>
              <p className="mb-5">
                <span className="text-[#c9a961] text-4xl font-black">{plan.price}</span>
                <span className="text-white/60 font-bold">/mes</span>
              </p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-white/85 text-sm leading-snug">
                    <Check size={16} className="text-[#c9a961] mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <WhatsAppButton
                message={`Hola Marketing Místico 👋 Me interesa el plan de mantenimiento ${plan.name}.`}
                variant={plan.highlighted ? 'gold' : 'outline'}
                className="mt-auto w-full"
              >
                Quiero el plan {plan.name}
              </WhatsAppButton>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
          <Pencil className="text-[#c9a961] mb-4" size={28} />
          <h2 className="text-white text-2xl font-black mb-5">{page.smallChanges.title}</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {page.smallChanges.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-white/80">
                <Check size={17} className="text-[#c9a961] mt-0.5 shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <section className="py-16 text-center">
      <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
        <h2 className="text-white text-3xl sm:text-4xl font-black tracking-tight mb-4">¿No sabes qué plan te conviene?</h2>
        <p className="text-white/70 text-lg mb-8">Cuéntanos qué web o sistema tienes y te recomendamos el plan justo.</p>
        <WhatsAppButton message={pageMessages['/mantenimiento']} variant="green">Escribir por WhatsApp</WhatsAppButton>
      </div>
    </section>
  </PageLayout>
);

export default Mantenimiento;
