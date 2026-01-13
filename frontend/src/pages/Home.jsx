import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Authority from '../components/Authority';
import Videos from '../components/Videos';
import Services from '../components/Services';
import Process from '../components/Process';
import CTA from '../components/CTA';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="bg-[#0f1419]">
      <Navbar />
      <Hero />
      <Authority />
      <Videos />
      <Services />
      <Process />
      <CTA />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Home;
