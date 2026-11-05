import React from 'react';

// Encabezado de las páginas internas: etiqueta, título, subtítulo y contenido extra.
const PageHero = ({ eyebrow, title, subtitle, icon: Icon, children }) => (
  <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#c9a961]/10 rounded-full blur-[130px] pointer-events-none" />
    <div className="container mx-auto px-4 sm:px-6 relative">
      <div className="max-w-3xl mx-auto text-center">
        {Icon && (
          <span className="inline-flex w-14 h-14 rounded-2xl bg-[#c9a961]/10 border border-[#c9a961]/30 text-[#c9a961] items-center justify-center mb-5">
            <Icon size={28} />
          </span>
        )}
        <p className="text-[#c9a961] text-xs uppercase tracking-[0.2em] font-black mb-3">{eyebrow}</p>
        <h1 className="text-white text-[2.1rem] leading-tight sm:text-5xl md:text-6xl font-black tracking-tight mb-5 text-balance">{title}</h1>
        {subtitle && <p className="text-white/75 text-lg leading-relaxed mb-8">{subtitle}</p>}
        {children}
      </div>
    </div>
  </section>
);

export default PageHero;
