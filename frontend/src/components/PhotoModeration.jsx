import React, { useState, useEffect, useCallback } from 'react';
import { Camera, Check, X, CheckCheck, RefreshCw } from 'lucide-react';

const API = '/api/admin/fotos.php';

// Moderación de fotos de invitados: nada sale en la galería ni en el proyector sin aprobación.
const PhotoModeration = ({ invitationId }) => {
  const [photos, setPhotos] = useState([]);
  const [pending, setPending] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}?invitation_id=${invitationId}`, { credentials: 'same-origin' });
      const data = await res.json();
      if (res.ok && Array.isArray(data.photos)) {
        setPhotos(data.photos);
        setPending(data.pending || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [invitationId]);

  useEffect(() => {
    load();
  }, [load]);

  const act = async (action, id) => {
    if (action === 'reject' && !window.confirm('¿Borrar esta foto? No se podrá recuperar.')) return;
    setBusyId(id ?? 'all');
    try {
      const res = await fetch(API, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id ? { action, id } : { action, invitation_id: invitationId }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.message || 'No se pudo actualizar la foto');
      }
      await load();
    } catch (err) {
      alert('Error de conexión');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <section className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Camera size={18} className="text-[#c9a961]" /> Fotos de los invitados
            {pending > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-[11px] font-black">
                {pending} por aprobar
              </span>
            )}
          </h3>
          <p className="text-xs text-white/50">
            Las fotos solo se muestran en la galería y en la pantalla en vivo cuando tú las apruebas.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white"
            title="Refrescar fotos"
            aria-label="Refrescar fotos"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
          {pending > 0 && (
            <button
              onClick={() => act('approve_all')}
              disabled={busyId === 'all'}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs font-black disabled:opacity-50"
            >
              <CheckCheck size={14} /> Aprobar todas
            </button>
          )}
        </div>
      </div>

      {loading && photos.length === 0 ? (
        <p className="text-center py-6 text-white/40 text-xs">Cargando fotos...</p>
      ) : photos.length === 0 ? (
        <p className="text-center py-6 text-white/40 text-xs">Todavía nadie subió fotos a este evento.</p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((p) => (
            <li
              key={p.id}
              className={`relative rounded-2xl overflow-hidden border ${p.approved ? 'border-white/10' : 'border-amber-500/50'}`}
            >
              <a href={p.file_path} target="_blank" rel="noopener noreferrer" className="block aspect-square bg-white/5">
                <img src={p.file_path} alt={`Foto de ${p.uploader_name || 'invitado'}`} loading="lazy" className="w-full h-full object-cover" />
              </a>
              <span
                className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-black ${
                  p.approved ? 'bg-emerald-500/90 text-black' : 'bg-amber-400 text-black'
                }`}
              >
                {p.approved ? 'Publicada' : 'Pendiente'}
              </span>
              <div className="flex items-center justify-between gap-2 p-2 bg-black/60">
                <p className="text-[10px] text-white/80 font-bold truncate">{p.uploader_name || 'Invitado'}</p>
                <div className="flex gap-1 shrink-0">
                  {!p.approved && (
                    <button
                      onClick={() => act('approve', p.id)}
                      disabled={busyId === p.id}
                      className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 disabled:opacity-50"
                      title="Aprobar y publicar"
                      aria-label={`Aprobar foto de ${p.uploader_name || 'invitado'}`}
                    >
                      <Check size={13} />
                    </button>
                  )}
                  <button
                    onClick={() => act('reject', p.id)}
                    disabled={busyId === p.id}
                    className="p-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-400 disabled:opacity-50"
                    title="Borrar foto"
                    aria-label={`Borrar foto de ${p.uploader_name || 'invitado'}`}
                  >
                    <X size={13} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PhotoModeration;
