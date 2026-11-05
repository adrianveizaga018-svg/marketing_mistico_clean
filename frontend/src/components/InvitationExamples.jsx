import React from 'react';

// Ejemplos de invitaciones (nombres ficticios). Cuando el sistema de invitaciones esté listo,
// agrega "demoUrl" a cada una y aparecerá el botón "Ver invitación en vivo".
const examples = [
  { id: 'quince', label: 'Quinceañero', name: 'Valentina', image: '/img/inv-quince.webp', alt: 'Invitación digital de quinceañero en celular, morada con corona dorada', demoUrl: '' },
  { id: 'boda', label: 'Boda', name: 'Ana & Luis', image: '/img/inv-boda.webp', alt: 'Invitación digital de boda en celular, color crema con foto de los novios', demoUrl: '' },
  { id: 'cumple', label: 'Cumpleaños infantil', name: 'Mateo cumple 5', image: '/img/inv-cumple.webp', alt: 'Invitación digital de cumpleaños infantil en celular, con globos de colores', demoUrl: '' },
];

const InvitationExamples = () => (
  <section className="py-12 md:py-16">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
        <p className="text-[#c9a961] text-xs uppercase tracking-[0.2em] font-black mb-3">Ejemplos</p>
        <h2 className="text-white text-[1.75rem] sm:text-4xl font-black tracking-tight mb-3">Así se ven tus invitaciones</h2>
        <p className="text-white/70">Cada diseño se adapta a tu evento: tus fotos, tus colores y tus datos.</p>
      </div>

      {/* Celular: los 3 ejemplos en una sola imagen */}
      <img
        src="/img/svc-invitaciones.webp"
        alt="Tres ejemplos de invitaciones digitales en celular: quinceañero, boda y cumpleaños infantil"
        width="800"
        height="500"
        loading="lazy"
        decoding="async"
        className="md:hidden w-full rounded-2xl"
      />

      {/* Tablet y escritorio: cada ejemplo grande */}
      <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-10 max-w-5xl mx-auto items-end">
        {examples.map((ex, i) => (
          <figure key={ex.id} className={`text-center ${i === 1 ? 'md:-translate-y-6' : ''}`}>
            <img src={ex.image} alt={ex.alt} width="382" height="762" loading="lazy" decoding="async" className="w-full max-w-[280px] mx-auto drop-shadow-[0_25px_40px_rgba(0,0,0,0.6)]" />
            <figcaption className="mt-5">
              <p className="text-[#c9a961] text-xs uppercase tracking-[0.18em] font-black">{ex.label}</p>
              <p className="text-white font-bold">{ex.name}</p>
              {ex.demoUrl ? (
                <a href={ex.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-sm font-bold text-black bg-[#c9a961] hover:bg-[#d4af37] px-5 py-2.5 rounded-full">
                  Ver invitación en vivo
                </a>
              ) : (
                <p className="text-white/45 text-xs mt-1">Demo en vivo muy pronto</p>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default InvitationExamples;
