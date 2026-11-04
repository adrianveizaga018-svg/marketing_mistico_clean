import React from 'react';

const SectionHeader = ({ eyebrow, title, subtitle, className = '' }) => (
  <div className={`text-center max-w-3xl mx-auto mb-10 md:mb-14 ${className}`}>
    {eyebrow && (
      <p className="text-[#c9a961] text-xs uppercase tracking-[0.2em] font-black mb-3">{eyebrow}</p>
    )}
    <h2 className="text-[1.75rem] leading-tight sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 text-balance">
      {title}
    </h2>
    {subtitle && <p className="text-base md:text-lg text-white/65 leading-relaxed text-pretty">{subtitle}</p>}
  </div>
);

export default SectionHeader;
