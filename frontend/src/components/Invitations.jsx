import React from 'react';
import { Check, MapPin, Clock, CalendarHeart, ExternalLink } from 'lucide-react';
import { invitationsSection, invitationPackages, invitationSteps } from '../data/landing';
import { waLink, whatsappMessages } from '../data/contacto';
import SectionHeader from './SectionHeader';
import WhatsAppIcon from './WhatsAppIcon';
import metaPixel from '../lib/metaPixel';

const packageMessage = (pkg) =>
  `Hola Marketing Místico 👋 Quiero la invitación digital ${pkg.name} (Bs ${pkg.price}). Mi evento es: `;

// Celular de muestra (ilustrativo) para que el cliente imagine su invitación.
const PhoneMockup = () => (
  <div className="relative mx-auto w-[220px] sm:w-[240px] shrink-0" aria-hidden="true">
    <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-white/10 border border-white/20 text-white/70 text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full backdrop-blur">
      Ejemplo
    </span>
    <div className="rounded-[2.2rem] border-[6px] border-[#1f1f1f] bg-gradient-to-b from-[#1a1508] via-[#0d0b07] to-black shadow-[0_0_60px_rgba(201,169,97,0.18)] overflow-hidden">
      <div className="h-5 flex justify-center pt-1.5"><div className="w-16 h-1.5 rounded-full bg-[#2a2a2a]" /></div>
      <div className="px-5 pt-5 pb-6 text-center">
        <p className="text-[#c9a961] text-[10px] uppercase tracking-[0.3em] font-bold">Nuestra boda</p>
        <p className="text-white text-2xl font-black mt-2 leading-tight">Ana <span className="text-[#c9a961]">&</span> Luis</p>
        <div className="h-px w-16 bg-[#c9a961]/50 mx-auto my-4" />
        <div className="grid grid-cols-4 gap-1.5 mb-4">
          {[['24', 'días'], ['06', 'hrs'], ['15', 'min'], ['40', 'seg']].map(([n, l]) => (
            <div key={l} className="bg-white/5 rounded-lg py-1.5">
              <p className="text-white text-sm font-black">{n}</p>
              <p className="text-white/50 text-[9px]">{l}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2 text-left text-[11px] text-white/75 mb-5">
          <p className="flex items-center gap-2"><CalendarHeart size={13} className="text-[#c9a961]" /> Sábado 14 de febrero</p>
          <p className="flex items-center gap-2"><Clock size={13} className="text-[#c9a961]" /> 19:30</p>
          <p className="flex items-center gap-2"><MapPin size={13} className="text-[#c9a961]" /> Ver ubicación en el mapa</p>
        </div>
        <div className="bg-[#c9a961] text-black text-[11px] font-black rounded-full py-2.5">Confirmar asistencia</div>
      </div>
    </div>
  </div>
);

const PackageCard = ({ pkg }) => (
  <article
    className={`relative flex flex-col rounded-3xl p-6 sm:p-7 h-full border ${
      pkg.highlighted
        ? 'bg-gradient-to-b from-[#c9a961]/[0.12] to-white/[0.02] border-[#c9a961]/60 shadow-[0_0_40px_rgba(201,169,97,0.12)]'
        : 'bg-white/[0.03] border-white/10'
    }`}
  >
    {pkg.highlighted && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c9a961] text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap">
        Recomendado
      </span>
    )}
    <h3 className="text-white text-xl font-black">{pkg.name}</h3>
    <p className="text-white/60 text-sm mt-1 mb-4">{pkg.tagline}</p>
    <p className="flex items-baseline gap-1.5 mb-1">
      <span className="text-white/60 text-lg font-bold">Bs</span>
      <span className="text-[#c9a961] text-5xl font-black tracking-tight tabular-nums">{pkg.price}</span>
    </p>
    <p className="text-white/55 text-[13px] mb-5">Pago único · {pkg.delivery}</p>

    <ul className="space-y-2.5 mb-7">
      {pkg.features.map((f) => (
        <li key={f} className="flex items-start gap-2.5 text-white/85 text-[15px] leading-snug">
          <Check size={17} className="text-[#c9a961] mt-0.5 shrink-0" />
          {f}
        </li>
      ))}
    </ul>

    <a
      href={waLink(packageMessage(pkg))}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => metaPixel.trackWhatsAppClick()}
      className={`mt-auto w-full inline-flex items-center justify-center gap-2 font-black text-sm px-5 py-3.5 rounded-full transition-colors min-h-[50px] ${
        pkg.highlighted
          ? 'bg-[#c9a961] hover:bg-[#d4af37] text-black'
          : 'border border-[#c9a961]/50 text-[#c9a961] hover:bg-[#c9a961] hover:text-black'
      }`}
    >
      <WhatsAppIcon size={17} />
      Quiero la {pkg.name}
    </a>
  </article>
);

const Invitations = () => (
  <section id="invitaciones" className="py-16 md:py-24 bg-gradient-to-b from-black via-[#0b0905] to-black relative overflow-hidden scroll-mt-16">
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#c9a961]/[0.06] blur-[140px] rounded-full pointer-events-none" />
    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center max-w-6xl mx-auto mb-12 md:mb-16">
        <div className="text-center lg:text-left">
          <SectionHeader {...invitationsSection} className="lg:mx-0 lg:text-left !mb-6" />
          <ul className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
            {invitationsSection.events.map((e) => (
              <li key={e} className="text-[13px] text-white/80 border border-white/10 bg-white/[0.03] px-3 py-1.5 rounded-full">{e}</li>
            ))}
          </ul>
          <ol className="grid sm:grid-cols-3 gap-4 text-left">
            {invitationSteps.map((step, i) => (
              <li key={step.title} className="flex sm:flex-col gap-3 sm:gap-2">
                <span className="w-8 h-8 shrink-0 rounded-full bg-[#c9a961]/15 border border-[#c9a961]/40 text-[#c9a961] text-sm font-black flex items-center justify-center">{i + 1}</span>
                <div>
                  <p className="text-white font-bold">{step.title}</p>
                  <p className="text-white/60 text-sm leading-relaxed">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <PhoneMockup />
      </div>

      <div className="grid md:grid-cols-3 gap-6 md:gap-5 lg:gap-6 max-w-6xl mx-auto pt-3">
        {invitationPackages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>

      <div className="text-center mt-8 space-y-4">
        <p className="text-white/55 text-sm">{invitationsSection.note}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {invitationsSection.demoUrl && (
            <a
              href={invitationsSection.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white border border-white/25 hover:bg-white/10 font-semibold text-sm px-6 py-3 rounded-full transition-colors"
            >
              Ver una invitación de ejemplo <ExternalLink size={15} />
            </a>
          )}
          <a
            href={waLink(whatsappMessages.invitaciones)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => metaPixel.trackWhatsAppClick()}
            className="text-[#c9a961] font-bold underline underline-offset-4 text-[15px]"
          >
            ¿Necesitas algo distinto? Pide tu invitación a medida
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Invitations;
