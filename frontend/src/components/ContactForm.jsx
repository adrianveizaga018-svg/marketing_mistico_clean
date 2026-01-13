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
    <section id="contacto" className="py-20 bg-[#0f1419]">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Side - Info */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Solicita tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a961] to-[#d4af37]">Asesoría Gratuita</span>
              </h2>
              
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Completa el formulario y uno de nuestros estrategas te contactará en menos de 24 horas para analizar tu caso.
              </p>

              {/* Benefits */}
              <div className="space-y-4">
                {[
                  'Análisis gratuito de tu situación actual',
                  'Estrategia personalizada para tu negocio',
                  'Propuesta con objetivos y costos claros',
                  'Sin compromisos ni presión de venta'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-[#c9a961] flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="mt-12 bg-[#1a1f2e] border border-[#c9a961]/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#c9a961]"></div>
                  <div>
                    <div className="font-bold text-white">Carlos Méndez</div>
                    <div className="text-sm text-gray-400">CEO, TechStart</div>
                  </div>
                </div>
                <p className="text-gray-300 italic">
                  "En 3 meses triplicamos nuestras ventas. El equipo de Marketing Místico realmente entiende cómo generar resultados."
                </p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="bg-[#1a1f2e] rounded-2xl p-8 border border-[#c9a961]/20 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {formFields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-gray-300 font-semibold mb-2">
                      {field.label} {field.required && <span className="text-[#c9a961]">*</span>}
                    </label>
                    
                    {field.type === 'select' ? (
                      <select
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        className="w-full bg-[#0f1419] border border-[#c9a961]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#c9a961] focus:ring-2 focus:ring-[#c9a961]/20 transition-all"
                      >
                        <option value="">Selecciona un servicio</option>
                        {field.options.map((option) => (
                          <option key={option} value={option}>{option}</option>
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
                        className="w-full bg-[#0f1419] border border-[#c9a961]/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#c9a961] focus:ring-2 focus:ring-[#c9a961]/20 transition-all"
                      />
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#c9a961] hover:bg-[#d4af37] text-[#1a1f2e] font-bold py-4 rounded-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#c9a961]/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Solicitar Asesoría'}
                  <Send size={20} />
                </button>
              </form>

              <p className="text-center text-gray-500 text-sm mt-6">
                Tus datos están protegidos. No compartimos información con terceros.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
