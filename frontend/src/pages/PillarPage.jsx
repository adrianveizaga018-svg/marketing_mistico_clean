import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp, Cpu, ShieldCheck, Bot, GraduationCap, SearchCheck, Wrench, DatabaseBackup,
  Check, AlertCircle, Users, ArrowRight, ArrowUpRight,
} from 'lucide-react';
import PageLayout from '../components/PageLayout';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { pillarPages } from '../data/pilares';
import { pageMessages } from '../data/sitio';
import { waLink } from '../data/contacto';
import { scrollToSection } from '../components/Navbar';
import metaPixel from '../lib/metaPixel';

const Offer = lazy(() => import('../components/Offer'));
const icons = { TrendingUp, Cpu, ShieldCheck, Bot, GraduationCap, SearchCheck, Wrench, DatabaseBackup };

const ExtraLink = ({ link }) => {
  const cls = 'inline-flex items-center justify-center gap-2 border border-white/25 text-white hover:bg-white/10 font-semibold text-sm px-6 py-3.5 rounded-full transition-colors min-h-[48px]';
  if (link.to) {
    return <Link to={link.to} className={cls}>{link.label} <ArrowRight size={16} className="text-[#c9a961]" /></Link>;
  }
  return <a href={link.url} target="_blank" rel="noopener noreferrer" className={cls}>{link.label} <ArrowUpRight size={16} className="text-[#c9a961]" /></a>;
};

const ServiceBlock = ({ service, reverse }) => {
  const Icon = icons[service.icon];
  return (
    <article id={service.id} className="scroll-mt-24 grid md:grid-cols-2 gap-6 md:gap-12 items-center py-10 md:py-14 border-t border-white/10 first:border-t-0">
      <div className={`${reverse ? 'md:order-2' : ''} ${service.image ? '' : 'hidden md:block'}`}>
        {service.image ? (
          <img src={service.image} alt={service.imageAlt || service.name} width="800" height="500" loading="lazy" decoding="async" className="w-full aspect-[16/10] object-cover object-top rounded-3xl border border-white/10" />
        ) : (
          <div className="hidden md:flex w-full aspect-[16/10] rounded-3xl border border-[#c9a961]/25 bg-gradient-to-br from-[#1a1508] via-[#0b0905] to-black items-center justify-center">
            {Icon && <Icon size={84} strokeWidth={1.2} className="text-[#c9a961]/80" />}
          </div>
        )}
      </div>
      <div>
        <h2 className="flex items-center gap-3 text-white text-2xl sm:text-3xl font-black tracking-tight mb-5">
          {!service.image && Icon && (
            <span className="md:hidden w-11 h-11 shrink-0 rounded-xl bg-[#c9a961]/10 border border-[#c9a961]/30 text-[#c9a961] flex items-center justify-center">
              <Icon size={22} />
            </span>
          )}
          {service.name}
        </h2>
        <p className="flex items-start gap-2.5 text-white/85 mb-5">
          <AlertCircle size={19} className="text-[#c9a961] mt-0.5 shrink-0" />
          <span><strong className="text-white">El problema:</strong> {service.problem}</span>
        </p>
        <p className="text-white font-bold mb-2.5">Qué incluye</p>
        <ul className="space-y-2 mb-5">
          {service.includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-white/80 text-[15px]">
              <Check size={17} className="text-[#c9a961] mt-0.5 shrink-0" /> {item}
            </li>
          ))}
        </ul>
        <p className="flex items-start gap-2.5 text-white/75 text-[15px] mb-7">
          <Users size={18} className="text-[#c9a961] mt-0.5 shrink-0" />
          <span><strong className="text-white">Para quién es:</strong> {service.forWho}</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={waLink(service.message)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => metaPixel.trackWhatsAppClick()}
            className="inline-flex items-center justify-center gap-2 bg-[#c9a961] hover:bg-[#d4af37] text-black font-black text-sm px-6 py-3.5 rounded-full transition-colors min-h-[48px]"
          >
            <WhatsAppIcon size={18} /> Consultar por WhatsApp
          </a>
          {service.extraLink && <ExtraLink link={service.extraLink} />}
        </div>
      </div>
    </article>
  );
};

const PillarPage = ({ pillarId }) => {
  const page = pillarPages[pillarId];
  const PillarIcon = icons[page.icon];
  const message = pageMessages[page.path];

  return (
    <PageLayout title={page.seoTitle} description={page.seoDescription}>
      {/* Encabezado */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#c9a961]/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex w-14 h-14 rounded-2xl bg-[#c9a961]/10 border border-[#c9a961]/30 text-[#c9a961] items-center justify-center mb-5">
              <PillarIcon size={28} />
            </span>
            <p className="text-[#c9a961] text-xs uppercase tracking-[0.2em] font-black mb-3">{page.eyebrow}</p>
            <h1 className="text-white text-[2.1rem] leading-tight sm:text-5xl md:text-6xl font-black tracking-tight mb-5 text-balance">{page.title}</h1>
            <p className="text-white/75 text-lg leading-relaxed mb-8">{page.subtitle}</p>
            {/* Índice de servicios */}
            <div className="flex flex-wrap justify-center gap-2">
              {page.services.map((s) => (
                <button key={s.id} onClick={() => scrollToSection(s.id)} className="text-[13px] font-semibold text-white/85 border border-white/15 bg-white/[0.04] hover:border-[#c9a961]/50 px-3.5 py-2 rounded-full transition-colors">
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="pb-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {page.services.map((s, i) => (
              <ServiceBlock key={s.id} service={s} reverse={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Caso real (Organiza) */}
      {page.caseStudy && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <a href={page.caseStudy.url} target="_blank" rel="noopener noreferrer" className="group max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center rounded-3xl border border-[#c9a961]/30 bg-gradient-to-br from-[#1a1508] to-black p-6 md:p-10">
              <img src={page.caseStudy.image} alt={page.caseStudy.client} width="800" height="500" loading="lazy" className="w-full rounded-2xl border border-white/10" />
              <div>
                <p className="text-[#c9a961] text-xs uppercase tracking-[0.2em] font-black mb-3">Caso de éxito</p>
                <h2 className="text-white text-2xl sm:text-3xl font-black mb-3">{page.caseStudy.title}</h2>
                <p className="text-white/75 mb-3">{page.caseStudy.text}</p>
                <p className="text-white/55 text-sm mb-5">Resultado: {page.caseStudy.result}</p>
                <span className="inline-flex items-center gap-1.5 text-white font-bold group-hover:text-[#c9a961]">{page.caseStudy.linkLabel} <ArrowUpRight size={16} /></span>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* Planes mensuales (Vende más) */}
      {page.showPlans && (
        <Suspense fallback={null}>
          <Offer />
        </Suspense>
      )}

      {/* Cierre */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-2xl">
          <h2 className="text-white text-3xl sm:text-4xl font-black tracking-tight mb-4">¿No sabes por dónde empezar?</h2>
          <p className="text-white/70 text-lg mb-8">Cuéntanos tu caso por WhatsApp y te decimos qué te conviene. Sin costo y sin compromiso.</p>
          <a
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => metaPixel.trackWhatsAppClick()}
            className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1fbe5b] text-white font-black px-8 py-4 rounded-full transition-colors min-h-[56px]"
          >
            <WhatsAppIcon size={22} /> Escribir por WhatsApp
          </a>
        </div>
      </section>
    </PageLayout>
  );
};

export default PillarPage;
