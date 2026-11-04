import React from 'react';
import { processSection, processSteps } from '../data/landing';
import SectionHeader from './SectionHeader';

const Process = () => (
  <section id="proceso" className="py-12 md:py-20 bg-gradient-to-b from-black via-[#0a0a0a] to-black scroll-mt-16">
    <div className="container mx-auto px-4 sm:px-6">
      <SectionHeader {...processSection} />
      <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 max-w-6xl mx-auto">
        {processSteps.map((step, i) => (
          <li key={step.title} className="flex sm:block gap-4 bg-white/[0.03] border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-6">
            <span className="block text-[#c9a961] text-2xl md:text-4xl font-black tabular-nums md:mb-3 shrink-0">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="text-white text-base md:text-lg font-black mb-1 md:mb-2">{step.title}</h3>
              <p className="text-white/65 text-sm md:text-[15px] leading-snug md:leading-relaxed">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Process;
