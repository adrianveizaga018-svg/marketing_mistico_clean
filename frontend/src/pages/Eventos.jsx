import React, { lazy, Suspense } from 'react';
import { PartyPopper, Send, CheckCircle, QrCode, ScanLine } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import InvitationExamples from '../components/InvitationExamples';
import WhatsAppButton from '../components/WhatsAppButton';
import { eventosPage } from '../data/paginas';
import { pageMessages } from '../data/sitio';
import { scrollToSection } from '../components/Navbar';

const Invitations = lazy(() => import('../components/Invitations'));
const FAQ = lazy(() => import('../components/FAQ'));
const icons = { Send, CheckCircle, QrCode, ScanLine };

const Eventos = () => (
  <PageLayout title={eventosPage.seoTitle} description={eventosPage.seoDescription}>
    <PageHero
      icon={PartyPopper}
      eyebrow="Eventos"
      title="Invitaciones digitales que tus invitados sí abren"
      subtitle="Bodas, quinceañeros, cumpleaños, bautizos y eventos de empresa. Invitación personal por WhatsApp, confirmación de asistencia y pase QR para la entrada."
    >
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <WhatsAppButton message={pageMessages['/eventos']}>Pedir mi invitación</WhatsAppButton>
        <button onClick={() => scrollToSection('invitaciones')} className="border border-white/25 text-white hover:bg-white/10 font-semibold text-sm px-7 py-4 rounded-full transition-colors min-h-[52px]">
          Ver paquetes y precios
        </button>
      </div>
    </PageHero>

    <InvitationExamples />

    {/* Pases QR y control de asistencia */}
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#c9a961] text-xs uppercase tracking-[0.2em] font-black mb-3">{eventosPage.qrSection.eyebrow}</p>
            <h2 className="text-white text-[1.75rem] sm:text-4xl font-black tracking-tight">{eventosPage.qrSection.title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {eventosPage.qrSection.items.map((item, i) => {
              const Icon = icons[item.icon];
              return (
                <div key={item.title} className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-11 h-11 rounded-xl bg-[#c9a961]/10 border border-[#c9a961]/30 text-[#c9a961] flex items-center justify-center"><Icon size={22} /></span>
                    <span className="text-[#c9a961]/50 text-2xl font-black tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-white text-lg font-black mb-2">{item.title}</h3>
                  <p className="text-white/70 text-[15px] leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>

    <Suspense fallback={null}>
      <Invitations />
      <FAQ ids={[1]} />
    </Suspense>
  </PageLayout>
);

export default Eventos;
