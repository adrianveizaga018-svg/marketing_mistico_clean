import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { 
  Calendar, MapPin, Clock, Music, Volume2, VolumeX, QrCode, 
  Gift, Heart, Send, CheckCircle2, XCircle, Share2, AlertCircle, Sparkles,
  Camera, MessageSquare, Image as ImageIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import QRCodeModal from '../components/QRCodeModal';
import GiftQRModal from '../components/GiftQRModal';

// Reduce la foto en el celular antes de subirla (máx. 1600px, JPG 80%): sube rápido y no llena el hosting.
const compressImage = (file, maxSide = 1600, quality = 0.8) =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('No se pudo leer la imagen'));
    };
    img.src = url;
  });

const PublicInvitation = () => {
  // Los links personales llegan como /i/slug/CODIGO (los genera el panel); también aceptamos ?t=CODIGO.
  const { slug, token: pathToken } = useParams();
  const [searchParams] = useSearchParams();
  const token = pathToken || searchParams.get('t') || '';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // RSVP Form State
  const [attending, setAttending] = useState(true);
  const [people, setPeople] = useState(1);
  const [customName, setCustomName] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [rsvpDone, setRsvpDone] = useState(false);
  const [passCode, setPassCode] = useState(null);

  // Modales
  const [showQRModal, setShowQRModal] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);

  // Música
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  // Sprint 2: Galería colaborativa & Muro de dedicatorias
  const [photos, setPhotos] = useState([]);
  const [wallMessages, setWallMessages] = useState([]);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [wallAuthor, setWallAuthor] = useState('');
  const [wallText, setWallText] = useState('');
  const [postingWall, setPostingWall] = useState(false);
  const [wallNotice, setWallNotice] = useState('');

  useEffect(() => {
    fetchInvitation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, token]);

  const isDemo = !!data?.invitation?.is_demo;
  const guest = data?.guest || null;
  const galleryQuery = `slug=${encodeURIComponent(slug)}${token ? `&t=${encodeURIComponent(token)}` : ''}`;

  const loadGalleryAndWall = () => {
    fetch(`/api/galeria.php?action=photos&${galleryQuery}`)
      .then((r) => r.json())
      .then((list) => Array.isArray(list) && setPhotos(list))
      .catch(() => {});

    fetch(`/api/galeria.php?action=wall&${galleryQuery}`)
      .then((r) => r.json())
      .then((list) => Array.isArray(list) && setWallMessages(list))
      .catch(() => {});
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !data?.invitation) return;
    if (!file.type.startsWith('image/')) {
      alert('Elige una foto (JPG, PNG o WEBP)');
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      alert('La foto es demasiado pesada');
      return;
    }
    setUploadingPhoto(true);
    try {
      const imageBase64 = await compressImage(file);
      const uploaderName = guest?.name || customName || 'Invitado';
      if (isDemo) {
        // Demo: la foto se ve solo en este celular, no se guarda en el servidor.
        setPhotos((prev) => [{ id: `demo-${Date.now()}`, file_path: imageBase64, uploader_name: uploaderName }, ...prev]);
        confetti({ particleCount: 60, spread: 60 });
        return;
      }
      const res = await fetch('/api/galeria.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'upload_photo',
          slug,
          t: token || undefined,
          uploader_name: uploaderName,
          image_base64: imageBase64,
        }),
      });
      const json = await res.json();
      if (res.ok && json.status === 'ok') {
        setPhotos((prev) => [json, ...prev]);
        confetti({ particleCount: 60, spread: 60 });
      } else {
        alert(json.message || 'No se pudo subir la foto, intenta de nuevo');
      }
    } catch (err) {
      alert('No se pudo subir la foto, revisa tu conexión');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handlePostWallMessage = async (e) => {
    e.preventDefault();
    if (!wallText.trim() || !data?.invitation) return;
    const author = wallAuthor.trim() || guest?.name || customName || 'Amigo';
    if (isDemo) {
      setWallMessages((prev) => [{ id: `demo-${Date.now()}`, author_name: author, message: wallText.trim(), created_at: new Date().toISOString() }, ...prev]);
      setWallText('');
      return;
    }
    setPostingWall(true);
    try {
      const res = await fetch('/api/galeria.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'post_message',
          slug,
          t: token || undefined,
          author_name: author,
          message: wallText.trim(),
        }),
      });
      const json = await res.json();
      if (res.ok && json.status === 'ok') {
        // Los mensajes pasan por la aprobación del anfitrión antes de mostrarse a todos.
        setWallText('');
        setWallNotice('¡Gracias! Tu mensaje aparecerá en el muro cuando los anfitriones lo aprueben 💛');
      } else {
        alert(json.message || 'Error al enviar mensaje');
      }
    } catch (err) {
      alert('Error de conexión');
    } finally {
      setPostingWall(false);
    }
  };

  const fetchInvitation = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `/api/invitacion.php?slug=${encodeURIComponent(slug)}${token ? `&t=${encodeURIComponent(token)}` : ''}`;
      const res = await fetch(url);
      const json = await res.json();
      if (!res.ok || json.status === 'error') {
        setError(json.message || 'Invitación no encontrada');
      } else {
        setData(json);
        if (!json.invitation?.is_demo) {
          loadGalleryAndWall();
        }
        if (json.guest?.rsvp) {
          setRsvpDone(true);
          setAttending(json.guest.rsvp.attending);
          setPeople(json.guest.rsvp.people);
          setPassCode(json.guest.rsvp.pass_code);
        } else if (json.guest) {
          setPeople(json.guest.passes || 1);
        }
      }
    } catch (err) {
      setError('Error al cargar la invitación');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data?.invitation?.music_url) {
      const a = new Audio(data.invitation.music_url);
      a.loop = true;
      setAudio(a);
      return () => {
        a.pause();
      };
    }
  }, [data]);

  const toggleMusic = () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleRSVP = async (e) => {
    e.preventDefault();
    if (isDemo) {
      // Demo: simulamos la confirmación para que el visitante vea el flujo completo.
      setRsvpDone(true);
      setPassCode(attending ? 'DEMO-PASE-QR' : null);
      if (attending) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/confirmar.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          t: token || undefined,
          name: token ? undefined : customName,
          attending: attending ? 1 : 0,
          people: attending ? people : 0,
          message,
        }),
      });
      const resData = await res.json();
      if (res.ok && resData.status === 'success') {
        setRsvpDone(true);
        setPassCode(resData.pass_code);
        if (attending) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      } else {
        alert(resData.message || 'Error al guardar respuesta');
      }
    } catch (err) {
      alert('Error de conexión');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#070709] text-white">
        <div className="w-12 h-12 border-4 border-[#c9a961]/20 border-t-[#c9a961] rounded-full animate-spin mb-4"></div>
        <p className="text-white/60 font-medium text-sm tracking-widest uppercase">Cargando invitación...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#070709] text-white p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mb-4">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Invitación no disponible</h2>
        <p className="text-white/60 max-w-sm mb-6">{error || 'Verifica el enlace recibido o consulta al anfitrión.'}</p>
        <a href="/" className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider">
          Ir al inicio
        </a>
      </div>
    );
  }

  const { invitation } = data;
  const eventDate = invitation.event_at ? new Date(invitation.event_at) : null;
  const formattedDate = eventDate ? eventDate.toLocaleDateString('es-BO', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  }) : '';
  const formattedTime = eventDate ? eventDate.toLocaleTimeString('es-BO', {
    hour: '2-digit', minute: '2-digit'
  }) : '';

  return (
    <div className="min-h-screen bg-[#070709] text-white selection:bg-[#c9a961]/30 font-sans pb-20">
      {/* Botón flotante de música */}
      {audio && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#c9a961] text-black flex items-center justify-center shadow-[0_0_20px_rgba(201,169,97,0.4)] hover:scale-110 transition-transform"
          title={isPlaying ? "Pausar música" : "Reproducir música"}
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
          aria-pressed={isPlaying}
        >
          {isPlaying ? <Volume2 size={22} /> : <VolumeX size={22} />}
        </button>
      )}

      {/* Hero Cover */}
      <div className="relative w-full h-[65vh] min-h-[460px] overflow-hidden flex items-end justify-center pb-12">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${invitation.cover_image || '/img/inv-boda.webp'})`,
            filter: 'brightness(0.65)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/40 to-transparent"></div>

        <div className="relative z-10 text-center px-4 max-w-xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#c9a961]/20 border border-[#c9a961]/40 text-[#c9a961] font-bold text-xs uppercase tracking-[0.25em] mb-4 backdrop-blur-md">
            {invitation.event_type || 'Nuestra Celebración'}
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-2 drop-shadow-lg">
            {invitation.honorees || invitation.title}
          </h1>
          <p className="text-lg text-white/90 font-light drop-shadow">
            {invitation.title}
          </p>

          {guest && (
            <div className="mt-6 inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-2.5">
              <p className="text-xs text-white/60 uppercase tracking-widest font-bold">Invitación especial para:</p>
              <p className="text-white font-black text-base">{guest.name}</p>
              <span className="text-[11px] text-[#c9a961] font-semibold">
                Válido para {guest.passes} {guest.passes === 1 ? 'pase' : 'pases'}
                {guest.table ? ` · Mesa ${guest.table}` : ''}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-12 -mt-4 relative z-20">
        {/* Mensaje de bienvenida */}
        {invitation.message && (
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 text-center backdrop-blur-md shadow-xl">
            <Heart size={28} className="mx-auto text-[#c9a961] mb-4" />
            <p className="text-white/80 leading-relaxed italic text-base sm:text-lg">
              "{invitation.message}"
            </p>
          </div>
        )}

        {/* Detalles del Evento (Fecha, Hora, Lugar) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#c9a961]/10 border border-[#c9a961]/30 text-[#c9a961] flex items-center justify-center shrink-0">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-wider font-bold">Fecha y Hora</p>
              <p className="text-white font-bold capitalize mt-0.5">{formattedDate}</p>
              <p className="text-[#c9a961] font-black text-sm mt-0.5">{formattedTime} hrs</p>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#c9a961]/10 border border-[#c9a961]/30 text-[#c9a961] flex items-center justify-center shrink-0">
              <MapPin size={24} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-white/40 uppercase tracking-wider font-bold">Lugar del Evento</p>
              <p className="text-white font-bold mt-0.5">{invitation.venue || 'Salón de Eventos'}</p>
              {invitation.address && <p className="text-xs text-white/60 mt-0.5">{invitation.address}</p>}
              {invitation.maps_url && (
                <a
                  href={invitation.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2.5 text-xs text-[#c9a961] hover:underline font-bold"
                >
                  Ver en Google Maps →
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Dress code & Itinerario */}
        {invitation.dress_code && (
          <div className="bg-gradient-to-r from-white/[0.02] to-white/[0.04] border border-white/10 rounded-3xl p-6 text-center">
            <p className="text-xs text-[#c9a961] uppercase tracking-[0.2em] font-black mb-1">Código de Vestimenta</p>
            <p className="text-white text-lg font-bold">{invitation.dress_code}</p>
          </div>
        )}

        {/* Sección de Mesa de Regalos con QR Bolivia */}
        {invitation.gifts && (
          <div className="bg-gradient-to-br from-[#c9a961]/10 via-white/[0.02] to-transparent border border-[#c9a961]/30 rounded-3xl p-6 sm:p-8 text-center">
            <Gift size={32} className="mx-auto text-[#c9a961] mb-3" />
            <h3 className="text-xl font-black text-white mb-2">Mesa de Regalos</h3>
            <p className="text-sm text-white/70 max-w-md mx-auto mb-5">
              Tu cariño y presencia son nuestro mejor regalo. Si deseas hacernos un presente en efectivo digital, puedes hacerlo fácilmente aquí.
            </p>
            <button
              onClick={() => setShowGiftModal(true)}
              className="py-3.5 px-7 rounded-full bg-[#c9a961] hover:bg-[#d4af37] text-black font-black text-sm uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(201,169,97,0.3)] hover:scale-105"
            >
              🎁 Ver QR de Regalo en Dinero
            </button>
          </div>
        )}

        {/* Formulario RSVP / Estado de Confirmación */}
        <div id="rsvp" className="bg-[#0e0e12] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-6">
            <span className="text-[#c9a961] text-xs uppercase tracking-[0.2em] font-black">Confirmación de Asistencia</span>
            <h3 className="text-2xl font-black text-white mt-1">¿Nos acompañas?</h3>
            {invitation.rsvp_deadline && (
              <p className="text-xs text-white/50 mt-1">
                Por favor confirmar antes del {new Date(invitation.rsvp_deadline).toLocaleDateString('es-BO')}
              </p>
            )}
          </div>

          {rsvpDone ? (
            <div className="text-center py-6 animate-fadeIn">
              {attending ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="text-xl font-black text-white mb-1">¡Confirmaste tu asistencia!</h4>
                  <p className="text-white/70 text-sm max-w-sm mx-auto mb-6">
                    Te esperamos con muchas ganas. Has confirmado {people} {people === 1 ? 'pase' : 'pases'}.
                  </p>

                  {passCode && (
                    <div className="bg-white/[0.04] border border-[#c9a961]/40 rounded-2xl p-5 max-w-xs mx-auto mb-6">
                      <p className="text-[11px] text-[#c9a961] uppercase tracking-widest font-black mb-1">
                        Tu Código de Ingreso
                      </p>
                      <p className="text-2xl font-mono font-black text-white tracking-widest">{passCode}</p>
                      <button
                        onClick={() => setShowQRModal(true)}
                        className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#c9a961] text-black font-black text-xs transition-all hover:bg-[#d4af37]"
                      >
                        <QrCode size={16} /> Ver mi Pase QR para Entrada
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 text-white/40 flex items-center justify-center mx-auto mb-4">
                    <XCircle size={36} />
                  </div>
                  <h4 className="text-xl font-black text-white mb-1">Respuesta registrada</h4>
                  <p className="text-white/60 text-sm max-w-sm mx-auto">
                    Lamentamos que no puedas acompañarnos, ¡te tendremos presente en el corazón!
                  </p>
                </>
              )}
            </div>
          ) : (
            <form onSubmit={handleRSVP} className="space-y-5">
              {!guest && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                    Tu Nombre y Apellido
                  </label>
                  <input
                    type="text"
                    required
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Ej. Carlos Mendoza"
                    className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#c9a961]"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`py-3.5 px-4 rounded-2xl font-black text-sm transition-all border ${
                    attending
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                      : 'bg-white/[0.03] border-white/10 text-white/50 hover:bg-white/5'
                  }`}
                >
                  ✓ Sí, asistiré
                </button>
                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`py-3.5 px-4 rounded-2xl font-black text-sm transition-all border ${
                    !attending
                      ? 'bg-red-500/20 border-red-500 text-red-300'
                      : 'bg-white/[0.03] border-white/10 text-white/50 hover:bg-white/5'
                  }`}
                >
                  ✕ No podré ir
                </button>
              </div>

              {attending && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                    Número de Personas ({guest ? `Hasta ${guest.passes} pases` : 'Confirmadas'})
                  </label>
                  <select
                    value={people}
                    onChange={(e) => setPeople(parseInt(e.target.value, 10))}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-[#c9a961]"
                  >
                    {Array.from({ length: guest ? guest.passes : 5 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n} className="bg-[#0e0e12] text-white">
                        {n} {n === 1 ? 'Persona' : 'Personas'}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                  Mensaje o buenos deseos (Opcional)
                </label>
                <textarea
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe un mensaje para los agasajados..."
                  className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#c9a961]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-full bg-[#c9a961] hover:bg-[#d4af37] text-black font-black text-sm uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(201,169,97,0.3)] disabled:opacity-50"
              >
                {submitting ? 'Enviando...' : 'Confirmar Asistencia'}
              </button>
            </form>
          )}
        </div>

        {/* Sprint 2: 📸 Galería de Fotos Colaborativa en Vivo */}
        <div className="bg-[#0e0e12] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[#c9a961] text-xs uppercase tracking-[0.2em] font-black">Álbum en Vivo</span>
              <h3 className="text-2xl font-black text-white mt-0.5">Fotos de los Invitados</h3>
              <p className="text-xs text-white/50">¡Comparte tus mejores momentos de la fiesta con los novios y todos los invitados!</p>
            </div>
            <label className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#c9a961] hover:bg-[#d4af37] text-black font-black text-xs uppercase tracking-wider cursor-pointer transition-all shadow-md shrink-0">
              <Camera size={16} />
              {uploadingPhoto ? 'Subiendo...' : 'Subir mi Foto'}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                disabled={uploadingPhoto}
                className="hidden"
              />
            </label>
          </div>

          {photos.length === 0 ? (
            <div className="border border-dashed border-white/10 rounded-2xl p-8 text-center">
              <ImageIcon size={32} className="mx-auto text-white/30 mb-2" />
              <p className="text-xs text-white/40">Sé el primero en subir una foto a la galería de este evento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {photos.map((p) => (
                <div key={p.id} className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 aspect-square group">
                  <img
                    src={p.file_path}
                    alt={p.uploader_name || 'Foto de invitado'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  {p.uploader_name && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <p className="text-[10px] text-white/90 font-bold truncate">Por: {p.uploader_name}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sprint 2: 💬 Muro de Mensajes & Dedicatorias */}
        <div className="bg-[#0e0e12] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-[#c9a961] text-xs uppercase tracking-[0.2em] font-black">Libro de Visitas Digital</span>
            <h3 className="text-2xl font-black text-white mt-0.5">Muro de Dedicatorias</h3>
            <p className="text-xs text-white/50">Deja tus palabras de felicitación para que queden guardadas para siempre.</p>
          </div>

          <form onSubmit={handlePostWallMessage} className="space-y-3">
            {!guest && (
              <input
                type="text"
                value={wallAuthor}
                onChange={(e) => setWallAuthor(e.target.value)}
                placeholder="Tu nombre (Ej. Prima Laura)"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-[#c9a961]"
              />
            )}
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={wallText}
                onChange={(e) => setWallText(e.target.value)}
                placeholder="Escribe tus mejores deseos aquí..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#c9a961]"
              />
              <button
                type="submit"
                disabled={postingWall}
                className="px-5 rounded-xl bg-[#c9a961] hover:bg-[#d4af37] text-black font-black text-xs uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                <Send size={14} />
                {postingWall ? '...' : 'Enviar'}
              </button>
            </div>
          </form>

          {wallNotice && (
            <p role="status" className="text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3">
              {wallNotice}
            </p>
          )}

          {wallMessages.length > 0 && (
            <div className="space-y-3 pt-2">
              {wallMessages.map((m) => (
                <div key={m.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-black text-[#c9a961]">{m.author_name}</p>
                    <span className="text-[10px] text-white/30">{m.created_at ? new Date(m.created_at).toLocaleDateString('es-BO') : ''}</span>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed">{m.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal QR Pase */}
      {passCode && (
        <QRCodeModal
          isOpen={showQRModal}
          onClose={() => setShowQRModal(false)}
          url={passCode}
          title="Tu Pase de Ingreso"
          subtitle={`Muestra este QR en la entrada · ${people} ${people === 1 ? 'pase' : 'pases'}`}
        />
      )}

      {/* Modal Mesa de Regalos */}
      <GiftQRModal
        isOpen={showGiftModal}
        onClose={() => setShowGiftModal(false)}
        gifts={invitation.gifts}
      />
    </div>
  );
};

export default PublicInvitation;
