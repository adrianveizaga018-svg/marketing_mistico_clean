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
    <section id="servicios" className="py-20 bg-gradient-to-b from-[#0f1419] via-[#1a1f2e] to-[#0f1419]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Servicios que <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a961] to-[#d4af37]">Generan Resultados</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            No vendemos tareas, vendemos crecimiento medible para tu negocio
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            const isGold = service.color === 'gold';
            
            return (
              <div 
                key={service.id}
                className="group relative bg-[#1a1f2e] rounded-2xl p-8 border border-[#c9a961]/10 hover:border-[#c9a961]/30 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#c9a961]/20"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl mb-6 ${
                  isGold 
                    ? 'bg-[#c9a961]/20 text-[#c9a961]' 
                    : 'bg-[#7c3aed]/20 text-[#7c3aed]'
                }`}>
                  <IconComponent size={32} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#c9a961] transition-colors">
                  {service.title}
                </h3>

                {/* Problem */}
                <div className="mb-4">
                  <p className="text-red-400 font-semibold mb-2">❌ El Problema:</p>
                  <p className="text-gray-400 text-sm">{service.problem}</p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <p className="text-[#c9a961] font-semibold mb-2">✓ Nuestra Solución:</p>
                  <p className="text-gray-300 text-sm">{service.solution}</p>
                </div>

                {/* Benefits */}
                <div className="space-y-2">
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="text-[#c9a961] flex-shrink-0 mt-0.5" size={16} />
                      <span className="text-gray-400 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#7c3aed] to-[#c9a961] opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">¿No estás seguro qué servicio necesitas?</p>
          <button 
            onClick={() => document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#c9a961] hover:bg-[#d4af37] text-[#1a1f2e] font-bold px-8 py-4 rounded-full transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#c9a961]/50"
          >
            Agenda una Asesoría Gratuita
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
