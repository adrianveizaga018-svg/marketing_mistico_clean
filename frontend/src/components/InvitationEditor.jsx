import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Calendar, MapPin, Music, Image as ImageIcon, Gift, 
  ArrowLeft, Check, Plus, Trash2, Smartphone 
} from 'lucide-react';

const InvitationEditor = ({ invitation, onBack, onSaved, isAdmin = false }) => {
  const isEditing = !!invitation?.id;

  // Solo el admin asigna el evento a la cuenta de un cliente.
  const [ownerId, setOwnerId] = useState(invitation?.owner_id ? String(invitation.owner_id) : '');
  const [clients, setClients] = useState([]);
  useEffect(() => {
    if (!isAdmin) return;
    fetch('/api/admin/clientes.php', { credentials: 'same-origin' })
      .then((r) => r.json())
      .then((list) => Array.isArray(list) && setClients(list))
      .catch(() => {});
  }, [isAdmin]);

  const [title, setTitle] = useState(invitation?.title || '');
  const [honorees, setHonorees] = useState(invitation?.honorees || '');
  const [eventType, setEventType] = useState(invitation?.event_type || 'boda');
  const [template, setTemplate] = useState(invitation?.template || 'boda');
  const [eventAt, setEventAt] = useState(invitation?.event_at ? invitation.event_at.replace(' ', 'T').slice(0, 16) : '');
  const [venue, setVenue] = useState(invitation?.venue || '');
  const [address, setAddress] = useState(invitation?.address || '');
  const [mapsUrl, setMapsUrl] = useState(invitation?.maps_url || '');
  const [dressCode, setDressCode] = useState(invitation?.dress_code || '');
  const [message, setMessage] = useState(invitation?.message || '');
  const [coverImage, setCoverImage] = useState(invitation?.cover_image || '');
  const [musicUrl, setMusicUrl] = useState(invitation?.music_url || '');
  const [openLink, setOpenLink] = useState(!!invitation?.open_link);
  const [rsvpDeadline, setRsvpDeadline] = useState(invitation?.rsvp_deadline ? invitation.rsvp_deadline.replace(' ', 'T').slice(0, 16) : '');

  // Gifts structure
  const [giftNotes, setGiftNotes] = useState(invitation?.gifts?.notes || '');
  const [giftQrs, setGiftQrs] = useState(invitation?.gifts?.qrs || []);
  const [giftBanks, setGiftBanks] = useState(invitation?.gifts?.banks || []);

  const [saving, setSaving] = useState(false);

  // New QR / Bank row states
  const addGiftQR = () => {
    setGiftQrs([...giftQrs, { name: 'Simple QR', image: '', holder: '' }]);
  };
  const updateGiftQR = (idx, field, val) => {
    const next = [...giftQrs];
    next[idx][field] = val;
    setGiftQrs(next);
  };
  const removeGiftQR = (idx) => {
    setGiftQrs(giftQrs.filter((_, i) => i !== idx));
  };

  const addGiftBank = () => {
    setGiftBanks([...giftBanks, { bank: 'Banco BNB', account: '', holder: '', type: 'Caja de Ahorros' }]);
  };
  const updateGiftBank = (idx, field, val) => {
    const next = [...giftBanks];
    next[idx][field] = val;
    setGiftBanks(next);
  };
  const removeGiftBank = (idx) => {
    setGiftBanks(giftBanks.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const giftsData = (giftQrs.length > 0 || giftBanks.length > 0 || giftNotes.trim()) ? {
      notes: giftNotes,
      qrs: giftQrs,
      banks: giftBanks,
    } : null;

    const payload = {
      action: isEditing ? 'update' : 'create',
      ...(isEditing && { id: invitation.id }),
      title,
      honorees,
      event_type: eventType,
      template,
      event_at: eventAt ? eventAt.replace('T', ' ') + ':00' : null,
      venue,
      address,
      maps_url: mapsUrl || null,
      dress_code: dressCode || null,
      message: message || null,
      cover_image: coverImage || null,
      music_url: musicUrl || null,
      open_link: openLink ? 1 : 0,
      ...(isAdmin && { owner_id: ownerId ? parseInt(ownerId, 10) : null }),
      rsvp_deadline: rsvpDeadline ? rsvpDeadline.replace('T', ' ') + ':00' : null,
      gifts: giftsData,
    };

    try {
      const res = await fetch('/api/admin/invitaciones.php', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        onSaved(data);
      } else {
        alert(data.message || 'Error al guardar');
      }
    } catch (err) {
      alert('Error de conexión');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs text-[#c9a961] hover:underline font-bold mb-2"
          >
            <ArrowLeft size={14} /> Volver
          </button>
          <h2 className="text-2xl font-black text-white">
            {isEditing ? 'Editar Invitación' : 'Crear Nueva Invitación'}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Datos Principales */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5">
          <h3 className="text-sm uppercase tracking-widest text-[#c9a961] font-black">
            1. Datos del Evento
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-white/70 mb-1.5">Tipo de Evento</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#c9a961]"
              >
                <option value="boda" className="bg-[#0e0e12]">Boda / Matrimonio</option>
                <option value="quinceanero" className="bg-[#0e0e12]">Quinceañero</option>
                <option value="cumpleanos" className="bg-[#0e0e12]">Cumpleaños</option>
                <option value="bautizo" className="bg-[#0e0e12]">Bautizo / Comunión</option>
                <option value="graduacion" className="bg-[#0e0e12]">Graduación</option>
                <option value="fiesta" className="bg-[#0e0e12]">Fiesta / Corporativo</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-white/70 mb-1.5">Nombre de Homenajeados</label>
              <input
                type="text"
                required
                value={honorees}
                onChange={(e) => setHonorees(e.target.value)}
                placeholder="Ej. Ana & Luis"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#c9a961]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-white/70 mb-1.5">Título de la Invitación</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. ¡Nos Casamos! Acompáñanos a celebrar nuestro gran día"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#c9a961]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-white/70 mb-1.5">Mensaje o Dedicatoria</label>
            <textarea
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hay momentos en la vida que son inolvidables, y compartirlos con ustedes los hace eternos..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-xs focus:outline-none focus:border-[#c9a961]"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-white/70 mb-1.5">Fecha y Hora</label>
              <input
                type="datetime-local"
                required
                value={eventAt}
                onChange={(e) => setEventAt(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#c9a961]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white/70 mb-1.5">Fecha Límite RSVP</label>
              <input
                type="datetime-local"
                value={rsvpDeadline}
                onChange={(e) => setRsvpDeadline(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#c9a961]"
              />
            </div>
          </div>
        </div>

        {/* Lugar y Detalles */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5">
          <h3 className="text-sm uppercase tracking-widest text-[#c9a961] font-black">
            2. Lugar & Ubicación
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-white/70 mb-1.5">Nombre del Salón / Lugar</label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Ej. Salón Magnolia"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#c9a961]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white/70 mb-1.5">Dirección</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ej. Av. América #123, Cochabamba"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#c9a961]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-white/70 mb-1.5">Link de Google Maps</label>
              <input
                type="url"
                value={mapsUrl}
                onChange={(e) => setMapsUrl(e.target.value)}
                placeholder="https://maps.app.goo.gl/..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#c9a961]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white/70 mb-1.5">Código de Vestimenta (Dress code)</label>
              <input
                type="text"
                value={dressCode}
                onChange={(e) => setDressCode(e.target.value)}
                placeholder="Ej. Formal / Elegante (Traje oscuro)"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#c9a961]"
              />
            </div>
          </div>
        </div>

        {/* Multimedia & Estilo */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5">
          <h3 className="text-sm uppercase tracking-widest text-[#c9a961] font-black">
            3. Portada, Música & Enlace Abierto
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-white/70 mb-1.5">Imagen de Portada (URL)</label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="/img/inv-boda.webp o URL"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#c9a961]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white/70 mb-1.5">Música de Fondo (URL .mp3)</label>
              <input
                type="url"
                value={musicUrl}
                onChange={(e) => setMusicUrl(e.target.value)}
                placeholder="https://ejemplo.com/cancion.mp3"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#c9a961]"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={openLink}
                onChange={(e) => setOpenLink(e.target.checked)}
                className="w-4 h-4 accent-[#c9a961] rounded"
              />
              <span className="text-xs text-white/80">
                <strong>Permitir confirmar sin invitación previa (Enlace Abierto)</strong> — ideal si compartirás el link en redes sociales o grupos de WhatsApp.
              </span>
            </label>
          </div>

          {isAdmin && (
            <div className="pt-2">
              <label htmlFor="owner-select" className="block text-xs font-bold text-white/70 mb-1.5">
                Cliente dueño del evento
              </label>
              <select
                id="owner-select"
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#c9a961]"
              >
                <option value="" className="bg-[#0e0e12]">Sin asignar (solo lo ves tú)</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#0e0e12]">
                    {c.name} · {c.email}{Number(c.active) === 1 ? '' : ' (desactivado)'}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-white/40 mt-1.5">
                El cliente verá este evento al entrar al panel con su email. Crea cuentas en el botón "Clientes".
              </p>
            </div>
          )}
        </div>

        {/* Mesa de Regalos con QR de Dinero (Bolivia) */}
        <div className="bg-gradient-to-br from-[#c9a961]/5 to-transparent border border-[#c9a961]/30 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm uppercase tracking-widest text-[#c9a961] font-black">
                4. 💸 Mesa de Regalos en Dinero (QRs Bolivia)
              </h3>
              <p className="text-xs text-white/60 mt-1">
                Sube tus QRs de cobro (Simple, BNB, BCP, Tigo Money) o tus cuentas bancarias.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-white/70 mb-1.5">Nota o frase de regalos</label>
            <input
              type="text"
              value={giftNotes}
              onChange={(e) => setGiftNotes(e.target.value)}
              placeholder="El mejor regalo es tu presencia, pero si deseas hacernos un presente..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#c9a961]"
            />
          </div>

          {/* QRs de cobro */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-white">QRs Bancarios (Simple / Billeteras)</span>
              <button
                type="button"
                onClick={addGiftQR}
                className="inline-flex items-center gap-1.5 text-xs text-[#c9a961] font-bold hover:underline"
              >
                <Plus size={14} /> Agregar QR
              </button>
            </div>

            <div className="space-y-3">
              {giftQrs.map((qr, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                  <input
                    type="text"
                    value={qr.name}
                    onChange={(e) => updateGiftQR(idx, 'name', e.target.value)}
                    placeholder="Nombre (Ej. Simple / BNB)"
                    className="bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white text-xs"
                  />
                  <input
                    type="text"
                    value={qr.image}
                    onChange={(e) => updateGiftQR(idx, 'image', e.target.value)}
                    placeholder="URL imagen QR (/img/qr.png)"
                    className="bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white text-xs"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={qr.holder}
                      onChange={(e) => updateGiftQR(idx, 'holder', e.target.value)}
                      placeholder="Titular de la cuenta"
                      className="flex-1 bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => removeGiftQR(idx)}
                      className="p-2 text-red-400 hover:text-white transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cuentas bancarias */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-white">Cuentas Bancarias</span>
              <button
                type="button"
                onClick={addGiftBank}
                className="inline-flex items-center gap-1.5 text-xs text-[#c9a961] font-bold hover:underline"
              >
                <Plus size={14} /> Agregar Cuenta
              </button>
            </div>

            <div className="space-y-3">
              {giftBanks.map((b, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
                  <input
                    type="text"
                    value={b.bank}
                    onChange={(e) => updateGiftBank(idx, 'bank', e.target.value)}
                    placeholder="Banco (Ej. BNB)"
                    className="bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white text-xs"
                  />
                  <input
                    type="text"
                    value={b.account}
                    onChange={(e) => updateGiftBank(idx, 'account', e.target.value)}
                    placeholder="Número de cuenta"
                    className="bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white text-xs font-mono"
                  />
                  <input
                    type="text"
                    value={b.holder}
                    onChange={(e) => updateGiftBank(idx, 'holder', e.target.value)}
                    placeholder="Nombre del Titular"
                    className="bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white text-xs"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={b.type}
                      onChange={(e) => updateGiftBank(idx, 'type', e.target.value)}
                      placeholder="Tipo (Caja de ahorro)"
                      className="flex-1 bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => removeGiftBank(idx)}
                      className="p-2 text-red-400 hover:text-white transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="py-3.5 px-6 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="py-3.5 px-8 rounded-2xl bg-[#c9a961] hover:bg-[#d4af37] text-black font-black text-xs uppercase tracking-wider shadow-lg transition-all"
          >
            {saving ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Invitación')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvitationEditor;
