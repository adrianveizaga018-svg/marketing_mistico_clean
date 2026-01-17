import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Authority from '../components/Authority';
import Videos from '../components/Videos';
import Testimonials from '../components/Testimonials';
import GraphicsCarousel from '../components/GraphicsCarousel';
import Services from '../components/Services';
import Process from '../components/Process';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import PromoBanner from '../components/PromoBanner';
import MysticCursor from '../components/MysticCursor';

const Home = () => {
  return (
    <div className="bg-black relative min-h-screen overflow-hidden">
      <MysticCursor />
      {/* Ambient Background Auras */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#c9a961]/5 rounded-full blur-[120px] animate-ambient"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-[#c9a961]/3 rounded-full blur-[150px] animate-ambient" style={{ animationDelay: '-5s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] bg-white/[0.02] rounded-full blur-[120px] animate-ambient" style={{ animationDelay: '-10s' }}></div>
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Authority />
        <Videos />
        <Testimonials />
        <Process />
        <GraphicsCarousel />
        <Services />
        <FAQ />
        <PromoBanner />
        <CTA />
        <ContactForm />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
