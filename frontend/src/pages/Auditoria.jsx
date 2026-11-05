import React from 'react';
import { ShieldCheck, Globe, Mail, DatabaseBackup, KeyRound, Share2, Cpu, FileCheck2, ChevronDown } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import WhatsAppButton from '../components/WhatsAppButton';
import { auditoriaPage as page } from '../data/paginas';
import { pageMessages } from '../data/sitio';

const icons = { Globe, Mail, DatabaseBackup, KeyRound, Share2, Cpu };
const message = pageMessages['/auditoria'];

// Página de aterrizaje para anuncios: una sola oferta, un solo botón.
const Auditoria = () => (
  <PageLayout title={page.seoTitle} description={page.seoDescription}>
    <PageHero icon={ShieldCheck} eyebrow={page.hero.eyebrow} title={page.hero.title} subtitle={page.hero.subtitle}>
      <div className="inline-flex flex-col items-center gap-1 mb-7 px-8 py-4 rounded-2xl border border-[#c9a961]/40 bg-[#c9a961]/[0.08]">
        <span className="text-[#c9a961] text-4xl font-black">{page.hero.price}</span>
        <span className="text-white/65 text-sm">{page.hero.priceNote}</span>
      </div>
      <div>
        <WhatsAppButton message={message}>Agendar mi diagnóstico</WhatsAppButton>
      </div>
    </PageHero>

    {/* Qué revisamos */}
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <h2 className="text-center text-white text-[1.75rem] sm:text-4xl font-black tracking-tight mb-10">Qué revisamos</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {page.checks.map((c) => {
            const Icon = icons[c.icon];
            return (
              <div key={c.title} className="flex gap-4 bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                <span className="w-11 h-11 shrink-0 rounded-xl bg-[#c9a961]/10 border border-[#c9a961]/30 text-[#c9a961] flex items-center justify-center"><Icon size={21} /></span>
                <div>
                  <h3 className="text-white font-black mb-1">{c.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{c.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Qué recibes + cómo se agenda */}
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-[#c9a961]/30 bg-gradient-to-br from-[#1a1508] to-black p-7">
          <FileCheck2 className="text-[#c9a961] mb-4" size={32} />
          <h2 className="text-white text-2xl font-black mb-5">{page.report.title}</h2>
          <ul className="space-y-3">
            {page.report.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-white/85">
                <span className="mt-2 w-2 h-2 rounded-full bg-[#c9a961] shrink-0" /> {item}
              </li>
            ))}
          </ul>
          <div className="flex gap-2 mt-6" aria-hidden="true">
            {['bg-green-500', 'bg-yellow-400', 'bg-red-500'].map((c) => <span key={c} className={`w-4 h-4 rounded-full ${c}`} />)}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
          <h2 className="text-white text-2xl font-black mb-5">Cómo se agenda</h2>
          <ol className="space-y-5">
            {page.steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="w-9 h-9 shrink-0 rounded-full bg-[#c9a961]/15 border border-[#c9a961]/40 text-[#c9a961] font-black flex items-center justify-center">{i + 1}</span>
                <div>
                  <p className="text-white font-bold">{s.title}</p>
                  <p className="text-white/70 text-sm leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>

    {/* Preguntas */}
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <h2 className="text-center text-white text-[1.75rem] sm:text-4xl font-black tracking-tight mb-8">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {page.faq.map((f) => (
            <details key={f.q} className="group bg-white/[0.03] border border-white/10 rounded-2xl p-5 open:border-[#c9a961]/40">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-white font-bold">
                {f.q}
                <ChevronDown size={18} className="text-[#c9a961] shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="text-white/70 mt-3 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 text-center">
      <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
        <h2 className="text-white text-3xl sm:text-4xl font-black tracking-tight mb-4">Mejor prevenir que perder</h2>
        <p className="text-white/70 text-lg mb-8">Agenda tu diagnóstico hoy y descubre qué hay que proteger primero.</p>
        <WhatsAppButton message={message} variant="green">Agendar por WhatsApp</WhatsAppButton>
      </div>
    </section>
  </PageLayout>
);

export default Auditoria;
