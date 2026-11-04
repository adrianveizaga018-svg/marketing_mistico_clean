import React from 'react';
import { Quote } from 'lucide-react';
import { testimonialsSection, testimonials } from '../data/landing';
import SectionHeader from './SectionHeader';

// Los testimonios son marcadores hasta tener opiniones reales de clientes (ver data/landing.js).
const Testimonials = () => (
  <section id="testimonios" className="py-16 md:py-24 bg-black">
    <div className="container mx-auto px-4 sm:px-6">
      <SectionHeader {...testimonialsSection} />
      <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {testimonials.map((t) => (
          <figure key={t.id} className="bg-white/[0.03] border border-dashed border-[#c9a961]/40 rounded-3xl p-6 sm:p-7 flex flex-col">
            <Quote size={28} className="text-[#c9a961]/60 mb-4" />
            <blockquote className="text-white/85 text-base leading-relaxed mb-6 flex-1">{t.quote}</blockquote>
            <figcaption>
              <p className="text-white font-black">{t.name}</p>
              <p className="text-[#c9a961] text-sm">{t.business}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
