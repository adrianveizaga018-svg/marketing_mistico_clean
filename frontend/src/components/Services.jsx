import React from 'react';
import { TrendingUp, Video, Megaphone, Code, Laptop, CheckCircle } from 'lucide-react';
import { servicesData } from '../data/mockData';

const iconMap = {
  TrendingUp: TrendingUp,
  Video: Video,
  Megaphone: Megaphone,
  Code: Code,
  Laptop: Laptop
};

const Services = () => {
  return (
    <section id="servicios" className="py-24 bg-black relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Servicios que <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#c9a961] to-[#d4af37]">Impulsan Crecimiento</span>
          </h2>
          <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto font-medium">
            No vendemos tareas, implementamos sistemas de adquisición de clientes diseñados para escalar tu visión.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            
            return (
              <div 
                key={service.id}
                className="group relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 transition-all duration-500 hover:border-[#c9a961]/40 shadow-2xl hover:shadow-[#c9a961]/5 overflow-hidden"
              >
                {/* Decorative glow */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#c9a961]/10 rounded-full blur-3xl group-hover:bg-[#c9a961]/20 transition-all duration-500"></div>

                {/* Icon */}
                <div className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 text-[#c9a961] mb-8 group-hover:scale-110 transition-transform duration-500">
                  <IconComponent size={32} />
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-black text-white mb-6 group-hover:text-[#c9a961] transition-colors tracking-tight">
                  {service.title}
                </h3>

                {/* Problem & Solution Container */}
                <div className="space-y-6 mb-8">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:border-white/10 transition-colors">
                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-black mb-1">El Desafío</p>
                    <p className="text-white/70 text-sm leading-relaxed">{service.problem}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#c9a961]/5 border border-[#c9a961]/10 group-hover:border-[#c9a961]/20 transition-colors">
                    <p className="text-[#c9a961] text-[10px] uppercase tracking-widest font-black mb-1">Nuestra Alquimia</p>
                    <p className="text-white/80 text-sm leading-relaxed">{service.solution}</p>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="space-y-3">
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c9a961] shadow-[0_0_10px_#c9a961]"></div>
                      <span className="text-white/50 text-xs font-medium tracking-wide">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-24">
          <p className="text-white/40 mb-8 font-medium">¿Llevamos tu marca al siguiente nivel?</p>
          <button 
            onClick={() => document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#c9a961] hover:bg-[#d4af37] text-black font-black text-sm uppercase tracking-[0.2em] px-12 py-5 rounded-full transition-all hover:scale-105 shadow-[0_0_30px_rgba(201,169,97,0.2)] hover:shadow-[0_0_50px_rgba(201,169,97,0.4)]"
          >
            Agenda una Asesoría Gratuita
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
