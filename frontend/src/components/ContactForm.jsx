import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { formFields } from '../data/mockData';
import { useToast } from '../hooks/use-toast';

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    whatsapp: '',
    servicio: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      toast({
        title: "¡Solicitud Enviada!",
        description: "Nos pondremos en contacto contigo pronto.",
      });
      setFormData({ nombre: '', email: '', whatsapp: '', servicio: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contacto" className="py-24 bg-black relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#c9a961]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Side - Info */}
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
                Solicita tu <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#c9a961] to-[#d4af37]">Asesoría de Éxito</span>
              </h2>
              
              <p className="text-xl text-white/50 mb-12 leading-relaxed font-medium">
                No somos una agencia más, somos tu socio estratégico. Completa el formulario y auditemos tu marca hoy mismo.
              </p>

              {/* Benefits - Premium Style */}
              <div className="space-y-6 mb-16">
                {[
                  'Análisis profundo de tu ecosistema digital',
                  'Hoja de ruta estratégica personalizada',
                  'Auditoría de pauta publicitaria actual',
                  'Objetivos de escalabilidad claros'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-[#c9a961]/20 border border-[#c9a961]/40 flex items-center justify-center group-hover:bg-[#c9a961] transition-all duration-300">
                      <CheckCircle className="text-[#c9a961] group-hover:text-black" size={14} />
                    </div>
                    <span className="text-white/70 font-bold tracking-tight">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Testimonial - Glass Card */}
              <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#c9a961]/5 rounded-full blur-2xl"></div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c9a961] to-[#d4af37] p-[2px]">
                    <div className="bg-black w-full h-full rounded-2xl flex items-center justify-center text-white font-black">CM</div>
                  </div>
                  <div>
                    <div className="font-black text-white text-lg">Carlos Méndez</div>
                    <div className="text-xs text-[#c9a961] uppercase tracking-widest font-black">CEO, TechStart</div>
                  </div>
                </div>
                <p className="text-white/60 italic text-lg leading-relaxed font-medium">
                  "En 3 meses triplicamos nuestras ventas. El equipo de Marketing Místico realmente entiende cómo generar resultados exponenciales."
                </p>
              </div>
            </div>

            {/* Right Side - Form Card */}
            <div className="bg-white/[0.02] backdrop-blur-2xl rounded-[3rem] p-10 md:p-14 border border-white/10 shadow-3xl relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#c9a961]/10 rounded-full blur-[80px]"></div>
              
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
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
                        <option value="" className="bg-black">Selecciona un servicio</option>
                        {field.options.map((option) => (
                          <option key={option} value={option} className="bg-black">{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        placeholder={field.label}
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
                  {isSubmitting ? 'Procesando Alquimia...' : 'Solicitar Auditoría'}
                  <Send size={20} />
                </button>
              </form>

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
