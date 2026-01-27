import React from 'react';
import { Link } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';
import ProjectCarousel from '../components/ProjectCarousel';
import Footer from '../components/Footer';
import MysticCursor from '../components/MysticCursor';
import { graphicsData, videosPortfolioData, brandingPortfolioData, webPortfolioData } from '../data/mockData';

const Portfolio = () => {
  return (
    <div className="bg-black relative min-h-screen lg:cursor-none">
      <MysticCursor />
      
      {/* Ambient Background Auras */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#c9a961]/5 rounded-full blur-[120px] animate-ambient"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-[#c9a961]/3 rounded-full blur-[150px] animate-ambient" style={{ animationDelay: '-5s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] bg-white/[0.02] rounded-full blur-[120px] animate-ambient" style={{ animationDelay: '-10s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header with Back Button */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-white/70 hover:text-[#c9a961] transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-semibold uppercase tracking-wider">Volver al Inicio</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <img src="/logo_oficial.webp" alt="Marketing Místico" className="h-8 w-auto" />
              <span className="text-white font-black text-lg tracking-tight hidden sm:block">Portfolio</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-24 pb-12">
          {/* Hero Section */}
          <section className="py-16 md:py-20 text-center">
            <div className="container mx-auto px-6">
              <div className="inline-flex items-center gap-2 bg-[#c9a961]/10 border border-[#c9a961]/20 px-5 py-2.5 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-[#c9a961] animate-pulse"></span>
                <span className="text-[#c9a961] text-xs uppercase tracking-widest font-black">Nuestros Trabajos</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
                Portfolio de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a961] via-[#fff5d1] to-[#c9a961] animate-shimmer bg-[length:200%_auto]">Diseño</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-medium mb-8">
                Explora nuestra colección de creatividades de alto impacto diseñadas para capturar atención y convertir clics en clientes reales.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-12">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-[#c9a961] mb-2">150+</div>
                  <div className="text-sm text-white/50 uppercase tracking-wider font-bold">Proyectos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-[#c9a961] mb-2">15+</div>
                  <div className="text-sm text-white/50 uppercase tracking-wider font-bold">Industrias</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-[#c9a961] mb-2">98%</div>
                  <div className="text-sm text-white/50 uppercase tracking-wider font-bold">Satisfacción</div>
                </div>
              </div>
            </div>
          </section>

          {/* Graphics Section */}
          <ProjectCarousel 
            id="graficos"
            title='Diseño <span class="text-transparent bg-clip-text bg-gradient-to-b from-[#c9a961] to-[#d4af37]">Publicitario</span>'
            subtitle="Creatividades de alto impacto diseñadas para capturar atención y convertir."
            data={graphicsData}
          />

          {/* Videos Section */}
          <ProjectCarousel 
            id="videos"
            title='Producción <span class="text-transparent bg-clip-text bg-gradient-to-b from-[#c9a961] to-[#d4af37]">Audiovisual</span>'
            subtitle="Contenido dinámico que cuenta historias y conecta emocionalmente con tu audiencia."
            data={videosPortfolioData}
          />



          {/* Web Section - Grid Layout */}
          <section id="web" className="py-24 bg-black relative overflow-hidden">
             <div className="container mx-auto px-6 relative z-10">
               <div className="text-center mb-16 animate-fade-in">
                 <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
                   Desarrollo <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#c9a961] to-[#d4af37]">Web & Apps</span>
                 </h2>
                 <p className="text-lg text-white/50 max-w-2xl mx-auto font-medium">
                   Soluciones tecnológicas a medida para automatizar y escalar tu negocio.
                 </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                 {webPortfolioData.map((item) => (
                   <div 
                     key={item.id}
                     className="group relative bg-white/[0.03] border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-[#c9a961]/40 shadow-2xl h-[400px] cursor-pointer"
                     onClick={() => window.open(item.link, '_blank')}
                   >
                     {/* Image Container */}
                     <div className="h-[280px] overflow-hidden bg-white/5 relative">
                       <img 
                         src={item.image} 
                         alt={item.title}
                         loading="lazy"
                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                       
                       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         <div className="w-16 h-16 rounded-full bg-[#c9a961]/90 flex items-center justify-center">
                           <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                           </svg>
                         </div>
                       </div>
                     </div>

                     {/* Info Overlay */}
                     <div className="absolute bottom-0 left-0 right-0 p-8 pt-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black via-black/80 to-transparent">
                       <div className="mb-2">
                         <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#c9a961] bg-[#c9a961]/10 px-3 py-1 rounded-full border border-[#c9a961]/20">
                           {item.category}
                         </span>
                       </div>
                       <h3 className="text-xl font-black text-white group-hover:text-[#c9a961] transition-colors tracking-tight leading-tight mb-1">
                         {item.title}
                       </h3>
                       <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">{item.client}</p>
                       <p className="text-[#c9a961] text-[11px] mt-2 group-hover:underline">Visitar Sitio Web →</p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-6 text-center">
              <div className="max-w-3xl mx-auto bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                  ¿Listo para Resultados como Estos?
                </h2>
                <p className="text-white/60 text-lg mb-8">
                  Agenda una asesoría gratuita y descubre cómo podemos transformar tu marca
                </p>
                <a
                  href="https://calendar.app.google/7Kjy2fZJmhGaNFef6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-[#c9a961] via-[#fff5d1] to-[#c9a961] animate-shimmer bg-[length:200%_auto] text-black font-black text-sm uppercase tracking-[0.2em] px-12 py-5 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(201,169,97,0.4)] hover:shadow-[0_0_50px_rgba(201,169,97,0.6)]"
                >
                  Agenda tu Asesoría Gratuita
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;
