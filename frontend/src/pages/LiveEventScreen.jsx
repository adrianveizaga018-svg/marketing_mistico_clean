import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Users, Sparkles, Heart, Camera, MessageSquare, 
  Maximize2, Volume2, VolumeX, Clock 
} from 'lucide-react';

const LiveEventScreen = () => {
  const { slug } = useParams();
  const [invitation, setInvitation] = useState(null);
  const [stats, setStats] = useState({ arrived: 0, confirmed: 0 });
  const [photos, setPhotos] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const [currentMsgIdx, setCurrentMsgIdx] = useState(0);
  const [time, setTime] = useState(new Date().toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    fetchData();
    const clockInterval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    // Polling cada 6 segundos para actualizar en vivo asistentes, fotos y mensajes
    const liveInterval = setInterval(() => {
      fetchLiveUpdates();
    }, 6000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(liveInterval);
    };
  }, [slug]);

  // Rotación suave del carrusel de fotos
  useEffect(() => {
    if (photos.length <= 1) return;
    const photoTimer = setInterval(() => {
      setCurrentPhotoIdx((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(photoTimer);
  }, [photos]);

  // Rotación del carrusel de dedicatorias
  useEffect(() => {
    if (messages.length <= 1) return;
    const msgTimer = setInterval(() => {
      setCurrentMsgIdx((prev) => (prev + 1) % messages.length);
    }, 7000);
    return () => clearInterval(msgTimer);
  }, [messages]);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/invitacion.php?slug=${encodeURIComponent(slug)}`);
      const json = await res.json();
      if (res.ok && json.invitation) {
        setInvitation(json.invitation);
        fetchLiveUpdates(json.invitation.id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchLiveUpdates = async (invId) => {
    const id = invId || invitation?.id;
    if (!id) return;
    try {
      // Fotos
      const pRes = await fetch(`/api/galeria.php?action=photos&invitation_id=${id}`);
      const pData = await pRes.json();
      if (Array.isArray(pData) && pData.length > 0) setPhotos(pData);

      // Mensajes
      const mRes = await fetch(`/api/galeria.php?action=wall&invitation_id=${id}`);
      const mData = await mRes.json();
      if (Array.isArray(mData) && mData.length > 0) setMessages(mData);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col justify-between p-6 sm:p-12 overflow-hidden relative select-none">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#c9a961]/10 rounded-full blur-[180px] pointer-events-none"></div>

      {/* Top Bar: Evento & Hora */}
      <header className="relative z-10 flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#c9a961]/15 border border-[#c9a961]/30 flex items-center justify-center text-[#c9a961] shadow-[0_0_30px_rgba(201,169,97,0.2)]">
            <Sparkles size={32} />
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#c9a961] font-black">
              Modo Fiesta En Vivo
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {invitation?.honorees || invitation?.title || 'Celebración Especial'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-3xl sm:text-4xl font-mono font-black text-white">{time}</p>
            <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Hora Local</p>
          </div>
          <button
            onClick={toggleFullScreen}
            className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all border border-white/10"
            title="Pantalla Completa"
          >
            <Maximize2 size={22} />
          </button>
        </div>
      </header>

      {/* Main Screen: Split Proyector */}
      <main className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-8 items-center">
        {/* Lado Izquierdo: Carrusel de Fotos Grandes de los Invitados */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#c9a961]">
              <Camera size={16} /> Fotos de la Fiesta en Tiempo Real
            </span>
            <span className="text-xs text-white/40">
              {photos.length} {photos.length === 1 ? 'foto compartida' : 'fotos compartidas'}
            </span>
          </div>

          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-black/60 rounded-3xl border border-white/10 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)]">
            {photos.length > 0 ? (
              <div className="relative w-full h-full">
                <img
                  src={photos[currentPhotoIdx]?.file_path}
                  alt="Momento especial"
                  className="w-full h-full object-contain sm:object-cover transition-opacity duration-1000"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex items-center justify-between">
                  <p className="text-lg font-black text-white">
                    📸 Foto por: <span className="text-[#c9a961]">{photos[currentPhotoIdx]?.uploader_name || 'Invitado'}</span>
                  </p>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-white/80">
                    {currentPhotoIdx + 1} / {photos.length}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <Camera size={56} className="text-[#c9a961]/40 mb-4 animate-bounce" />
                <h3 className="text-2xl font-black text-white">¡Sube tus fotos a la pantalla!</h3>
                <p className="text-sm text-white/50 max-w-md mt-2">
                  Abre tu invitación en el celular, toca el botón <strong>"Subir mi Foto"</strong> y aparecerá aquí automáticamente.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Lado Derecho: Dedicatorias y Contador */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-center">
          {/* Tarjeta de Dedicatorias en Vivo */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-black text-[#c9a961] mb-4">
              <MessageSquare size={16} /> Muro de Deseos en Pantalla
            </div>

            {messages.length > 0 ? (
              <div className="min-h-[140px] flex flex-col justify-between animate-fadeIn">
                <p className="text-xl sm:text-2xl font-light text-white/90 italic leading-snug">
                  "{messages[currentMsgIdx]?.message}"
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-4">
                  <p className="text-sm font-black text-[#c9a961]">
                    — {messages[currentMsgIdx]?.author_name}
                  </p>
                  <span className="text-[11px] text-white/30 font-mono">
                    {currentMsgIdx + 1} de {messages.length}
                  </span>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-white/40">
                <Heart size={36} className="mx-auto text-[#c9a961]/40 mb-2" />
                <p className="text-sm">Aún no hay dedicatorias publicadas. ¡Escribe la primera desde tu invitación!</p>
              </div>
            )}
          </div>

          {/* Banner con llamado a la acción para los invitados */}
          <div className="bg-gradient-to-br from-[#c9a961]/15 via-white/[0.02] to-transparent border border-[#c9a961]/40 rounded-3xl p-6 text-center">
            <h4 className="text-lg font-black text-white mb-1">
              ¿Quieres que tu foto o mensaje aparezca en pantalla?
            </h4>
            <p className="text-xs text-white/60">
              Escanea el QR de tu mesa o abre tu invitación digital para interactuar en vivo con la fiesta.
            </p>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="relative z-10 border-t border-white/10 pt-4 flex items-center justify-between text-xs text-white/40">
        <p>Sistema Interactivo de Eventos · Marketing Místico</p>
        <p className="text-[#c9a961] font-bold">INVITIX Live Engine</p>
      </footer>
    </div>
  );
};

export default LiveEventScreen;
