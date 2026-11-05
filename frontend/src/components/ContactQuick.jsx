import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { waLink, whatsappMessages, WHATSAPP_DISPLAY } from '../data/contacto';
import WhatsAppIcon from './WhatsAppIcon';
import { owner } from '../data/sitio';
import metaPixel from '../lib/metaPixel';

const NEEDS = [
  'Vender más (publicidad, web, diseño)',
  'Organizar mi negocio (sistemas)',
  'Proteger mi negocio (auditoría, mantenimiento)',
  'Invitaciones digitales',
  'Todavía no sé, quiero asesoría',
];

// Contacto corto: WhatsApp directo o un formulario de 3 campos.
const ContactQuick = () => {
  const [form, setForm] = useState({ nombre: '', whatsapp: '', servicio: '' });
  const [state, setState] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setState('sending');
    setError('');
    try {
      const res = await fetch('/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, email: '', pais: 'Bolivia' }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.status !== 'success') throw new Error(data.message || 'No se pudo enviar');
      metaPixel.trackEvent?.('Lead');
      setState('sent');
    } catch (err) {
      setError('No pudimos enviar tu mensaje. Escríbenos por WhatsApp, te respondemos igual.');
      setState('error');
    }
  };

  const field = 'w-full bg-white/[0.04] border border-white/15 focus:border-[#c9a961] rounded-xl px-4 py-3.5 text-white text-base outline-none transition-colors';

  return (
    <section id="contacto" className="py-16 md:py-24 bg-black scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div>
            <figure className="flex items-center gap-4 mb-6">
              <img src={owner.photo} alt={owner.name || owner.role} width="640" height="800" loading="lazy" className="w-24 sm:w-32 aspect-[4/5] object-cover rounded-2xl border-2 border-[#c9a961]/60 shadow-[0_0_30px_rgba(201,169,97,0.25)]" />
              <figcaption>
                <p className="text-white font-black text-lg leading-tight">{owner.name ? `Hola, soy ${owner.name}` : 'Te respondo yo'}</p>
                <p className="text-white/60 text-sm">{owner.role} · Marketing Místico</p>
              </figcaption>
            </figure>
            <p className="text-[#c9a961] text-xs uppercase tracking-[0.2em] font-black mb-3">Contacto</p>
            <h2 className="text-white text-[1.9rem] sm:text-5xl font-black tracking-tight leading-tight mb-4">Cuéntanos qué necesitas</h2>
            <p className="text-white/70 text-lg leading-relaxed mb-7">Te respondemos por WhatsApp con una propuesta clara y sin costo.</p>
            <a
              href={waLink(whatsappMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => metaPixel.trackWhatsAppClick()}
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1fbe5b] text-white font-black px-7 py-4 rounded-full transition-colors min-h-[56px]"
            >
              <WhatsAppIcon size={22} /> WhatsApp {WHATSAPP_DISPLAY}
            </a>
          </div>

          <form onSubmit={submit} className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4" noValidate={false}>
            {state === 'sent' ? (
              <div className="text-center py-8">
                <CheckCircle className="mx-auto text-[#c9a961] mb-3" size={44} />
                <p className="text-white text-xl font-black mb-1">¡Gracias, {form.nombre.split(' ')[0]}!</p>
                <p className="text-white/70">Te escribiremos al {form.whatsapp} por WhatsApp.</p>
              </div>
            ) : (
              <>
                <p className="text-white font-bold">¿Prefieres que te escribamos?</p>
                <label className="block">
                  <span className="block text-white/70 text-sm mb-1.5">Tu nombre</span>
                  <input required maxLength={120} autoComplete="name" value={form.nombre} onChange={update('nombre')} className={field} />
                </label>
                <label className="block">
                  <span className="block text-white/70 text-sm mb-1.5">Tu celular (WhatsApp)</span>
                  <input required type="tel" inputMode="tel" maxLength={20} autoComplete="tel" placeholder="Ej. 70012345" value={form.whatsapp} onChange={update('whatsapp')} className={field} />
                </label>
                <label className="block">
                  <span className="block text-white/70 text-sm mb-1.5">¿Qué necesitas?</span>
                  <select required value={form.servicio} onChange={update('servicio')} className={`${field} appearance-none`}>
                    <option value="" className="bg-black">Elige una opción</option>
                    {NEEDS.map((n) => <option key={n} value={n} className="bg-black">{n}</option>)}
                  </select>
                </label>
                {error && <p role="alert" className="text-red-300 text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={state === 'sending'}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#c9a961] hover:bg-[#d4af37] disabled:opacity-60 text-black font-black px-6 py-4 rounded-full transition-colors min-h-[52px]"
                >
                  <Send size={17} /> {state === 'sending' ? 'Enviando…' : 'Quiero que me escriban'}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactQuick;
