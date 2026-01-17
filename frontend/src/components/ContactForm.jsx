import React, { useState, useEffect } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { formFields, testimonialsData } from '../data/mockData';
import { useToast } from '../hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import metaPixel from '../lib/metaPixel';

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    pais: '',
    whatsapp: '',
    servicio: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: Booking
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track Lead on Meta Pixel
    metaPixel.trackLead();

    // 1. Fire-and-forget backend save (Non-blocking)
    const apiUrl = process.env.REACT_APP_API_URL || `http://${window.location.hostname}:8000`;
    fetch(`${apiUrl}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then(response => {
        if (response.ok) console.log("Lead saved to specialized DB");
    }).catch(error => {
        console.warn('Backend connection issue (Non-critical):', error);
    });

    // 2. Simulate "Processing" visualization (1.2s fixed)
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
      toast({
        title: "¡Datos Procesados!",
        description: "Accediendo a la agenda en tiempo real...",
      });
    }, 1200);
  };

  const handleConfirmBooking = () => {
    metaPixel.trackSchedule();
    setStep(3);
  };

  return (
    <section id="contacto" className="py-24 bg-black relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#c9a961]/5 blur-[120px] rounded-full pointer-events-none animate-ambient"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Side - Info */}
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
                {step === 1 ? (
                  <>Solicita tu <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#c9a961] to-[#d4af37]">Asesoría de Éxito</span></>
                ) : (
                  <>Reserva tu <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#c9a961] to-[#d4af37]">Espacio en Agenda</span></>
                )}
              </h2>
              
              <p className="text-xl text-white/50 mb-12 leading-relaxed font-medium">
                {step === 1 
                  ? "No somos una agencia más, somos tu socio estratégico. Completa el formulario y auditemos tu marca hoy mismo."
                  : "Nuestra agenda está disponible en tiempo real. Selecciona el horario que más te convenga para nuestro Meet estratégico."}
              </p>

              {/* Step Indicator */}
              <div className="flex items-center gap-4 mb-12">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all duration-500 border-2 ${step === 1 ? 'bg-[#c9a961] border-[#c9a961] text-black scale-110' : 'bg-transparent border-white/20 text-white/40'}`}>1</div>
                <div className="w-12 h-[2px] bg-white/10"></div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all duration-500 border-2 ${step === 2 ? 'bg-[#c9a961] border-[#c9a961] text-black scale-110' : 'bg-transparent border-white/20 text-white/40'}`}>2</div>
              </div>

              {/* Benefits/Info display based on step */}
              <div className="space-y-6 mb-16 transition-opacity duration-500">
                {step === 1 ? (
                  ['Análisis profundo de tu ecosistema', 'Hoja de ruta estratégica', 'Auditoría de pauta actual', 'Objetivos de escalabilidad'].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-4 group">
                      <div className="w-6 h-6 rounded-full bg-[#c9a961]/20 border border-[#c9a961]/40 flex items-center justify-center group-hover:bg-[#c9a961] transition-all duration-300">
                        <CheckCircle className="text-[#c9a961] group-hover:text-black" size={14} />
                      </div>
                      <span className="text-white/70 font-bold tracking-tight">{benefit}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-6 bg-[#c9a961]/5 border border-[#c9a961]/20 rounded-2xl">
                    <p className="text-[#c9a961] font-bold mb-2 uppercase tracking-widest text-xs">✓ Datos Confirmados</p>
                    <p className="text-white/80 text-sm">Hemos guardado tu información. Una vez agendes, recibirás automáticamente un link de **Google Meet** en tu correo.</p>
                  </div>
                )}
              </div>

              {/* Testimonial - Glass Card (Visible only in step 1 or compact) */}
              <div className="hidden md:block h-[240px] relative">
                <AnimatePresence mode='wait'>
                  <motion.div 
                    key={currentTestimonial}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-8 overflow-hidden group hover:border-[#c9a961]/30 transition-colors"
                  >
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#c9a961]/5 rounded-full blur-2xl"></div>
                    <div className="flex items-center gap-4 mb-5 relative z-10">
                      <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-br from-[#c9a961] to-[#d4af37]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                          <CheckCircle className="text-[#c9a961]" size={24} />
                        </div>
                      </div>
                      <div>
                        <div className="font-black text-white text-lg">{testimonialsData[currentTestimonial].name}</div>
                        <div className="text-xs text-[#c9a961] uppercase tracking-widest font-black">{testimonialsData[currentTestimonial].role}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold mt-1">{testimonialsData[currentTestimonial].company}</div>
                      </div>
                    </div>
                    <p className="text-white/60 italic text-sm leading-relaxed font-medium relative z-10">
                      "{testimonialsData[currentTestimonial].content}"
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Side - Morphing Card */}
            <div className="bg-white/[0.02] backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-3xl relative min-h-[600px] flex flex-col justify-center transition-all duration-700">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#c9a961]/10 rounded-full blur-[80px]"></div>
              
              {step === 1 ? (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10 animate-fade-in">
                  {formFields.map((field) => (
                    <div key={field.name} className="relative group">
                      <label className="block text-white/40 text-[10px] uppercase tracking-[0.2em] font-black mb-3 ml-1 group-focus-within:text-[#c9a961] transition-colors">
                        {field.label} {field.required && <span className="text-[#c9a961] text-lg">*</span>}
                      </label>
                      
                      {field.type === 'select' ? (
                        <select
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          required={field.required}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#c9a961]/50 focus:ring-4 focus:ring-[#c9a961]/10 transition-all appearance-none cursor-pointer font-medium"
                        >
                          <option value="" className="bg-black text-white/30">Selecciona un servicio</option>
                          {field.options.map((option) => (
                            <option key={option} value={option} className="bg-black text-white">{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          required={field.required}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/10 focus:outline-none focus:border-[#c9a961]/50 focus:ring-4 focus:ring-[#c9a961]/10 transition-all font-medium"
                        />
                      )}
                    </div>
                  ))}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#c9a961] hover:bg-white text-black font-black text-sm uppercase tracking-[0.2em] py-6 rounded-2xl transition-all duration-500 hover:scale-[1.02] shadow-[0_0_30px_rgba(201,169,97,0.2)] flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Procesando...' : 'Solicitar Auditoría'}
                    <Send size={20} />
                  </button>
                </form>
              ) : step === 2 ? (
                <div className="w-full h-full relative z-10 animate-fade-in flex flex-col">
                  <div className="text-center mb-6">
                    <p className="text-[#c9a961] font-black text-[10px] uppercase tracking-[0.2em] mb-2 animate-pulse">Paso Final</p>
                    <p className="text-white/60 text-xs font-medium">Agenda tu hora y luego haz clic en el botón dorado inferior.</p>
                  </div>

                  <div className="w-full h-[450px] bg-white rounded-2xl overflow-hidden shadow-2xl border border-white/10 group relative">
                    <iframe
                      src={`https://calendar.app.google/qmCnU7s9NLruyVdRA?gv=true&name=${encodeURIComponent(formData.nombre)}&email=${encodeURIComponent(formData.email)}`}
                      style={{ border: 0 }}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      className="relative z-10"
                      title="Google Calendar"
                    ></iframe>
                  </div>
                  
                  <button 
                    onClick={handleConfirmBooking}
                    className="w-full mt-6 bg-[#c9a961] hover:bg-white text-black font-black text-sm uppercase tracking-[0.2em] py-6 rounded-2xl transition-all duration-500 hover:scale-[1.02] shadow-[0_0_30px_rgba(201,169,97,0.3)] flex items-center justify-center gap-3 group"
                  >
                    Confirmar Agendamiento <CheckCircle size={20} />
                  </button>

                  <button 
                    onClick={() => setStep(1)}
                    className="mt-6 text-white/30 hover:text-[#c9a961] text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2 self-center"
                  >
                    ← Corregir mis datos
                  </button>
                </div>
              ) : (
                <div className="w-full h-full relative z-10 animate-scale-up flex flex-col items-center justify-center text-center p-10">
                  <div className="w-24 h-24 bg-[#c9a961] rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(201,169,97,0.4)]">
                    <CheckCircle size={48} className="text-black" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">¡Todo Listo, {formData.nombre.split(' ')[0]}!</h3>
                  <p className="text-white/60 text-lg mb-10 font-medium">Tu sesión mística ha sido agendada con éxito. Revisa tu correo para el link de **Google Meet**.</p>
                  
                  <button 
                    onClick={() => setStep(1)}
                    className="mt-12 text-[#c9a961] hover:text-white text-[10px] font-black uppercase tracking-[0.3em] transition-colors"
                  >
                    Finalizar Flujo ⚡
                  </button>
                </div>
              )}

              <p className="text-center text-white/20 text-[10px] uppercase tracking-widest font-black mt-10">
                Seguridad de datos nivel Premium • 100% Confidencial
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
