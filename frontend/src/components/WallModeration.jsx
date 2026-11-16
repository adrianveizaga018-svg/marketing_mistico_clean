import React, { useState, useEffect, useCallback } from 'react';
import { MessageSquare, Check, X, CheckCheck, RefreshCw } from 'lucide-react';

const API = '/api/admin/muro.php';

const post = (body) =>
  fetch(API, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

// Moderación del muro: los mensajes de los invitados no se ven hasta que el anfitrión los aprueba.
const WallModeration = ({ invitationId }) => {
  const [messages, setMessages] = useState([]);
  const [pending, setPending] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}?invitation_id=${invitationId}`, { credentials: 'same-origin' });
      const data = await res.json();
      if (res.ok && Array.isArray(data.messages)) {
        setMessages(data.messages);
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
    if (action === 'reject' && !window.confirm('¿Borrar este mensaje? No se podrá recuperar.')) return;
    setBusyId(id ?? 'all');
    try {
      const res = await post(id ? { action, id } : { action, invitation_id: invitationId });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.message || 'No se pudo actualizar el mensaje');
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
            <MessageSquare size={18} className="text-[#c9a961]" /> Muro de dedicatorias
            {pending > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-[11px] font-black">
                {pending} por aprobar
              </span>
            )}
          </h3>
          <p className="text-xs text-white/50">
            Los mensajes de los invitados solo se publican en la invitación y en la pantalla en vivo cuando tú los apruebas.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white"
            title="Refrescar mensajes"
            aria-label="Refrescar mensajes"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
          {pending > 0 && (
            <button
              onClick={() => act('approve_all')}
              disabled={busyId === 'all'}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs font-black disabled:opacity-50"
            >
              <CheckCheck size={14} /> Aprobar todos
            </button>
          )}
        </div>
      </div>

      {loading && messages.length === 0 ? (
        <p className="text-center py-6 text-white/40 text-xs">Cargando mensajes...</p>
      ) : messages.length === 0 ? (
        <p className="text-center py-6 text-white/40 text-xs">Todavía nadie dejó un mensaje en el muro.</p>
      ) : (
        <ul className="space-y-2.5">
          {messages.map((m) => (
            <li
              key={m.id}
              className={`flex items-start gap-3 rounded-2xl p-4 border ${
                m.approved ? 'bg-white/[0.02] border-white/5' : 'bg-amber-500/[0.05] border-amber-500/25'
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="text-xs font-black text-[#c9a961]">{m.author_name}</p>
                  <span className={`text-[10px] font-bold ${m.approved ? 'text-emerald-400' : 'text-amber-300'}`}>
                    {m.approved ? 'Publicado' : 'Pendiente'}
                  </span>
                  <span className="text-[10px] text-white/30">{m.created_at}</span>
                </div>
                <p className="text-xs text-white/80 leading-relaxed break-words">{m.message}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {!m.approved && (
                  <button
                    onClick={() => act('approve', m.id)}
                    disabled={busyId === m.id}
                    className="p-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 disabled:opacity-50"
                    title="Aprobar y publicar"
                    aria-label={`Aprobar mensaje de ${m.author_name}`}
                  >
                    <Check size={14} />
                  </button>
                )}
                <button
                  onClick={() => act('reject', m.id)}
                  disabled={busyId === m.id}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 disabled:opacity-50"
                  title="Borrar mensaje"
                  aria-label={`Borrar mensaje de ${m.author_name}`}
                >
                  <X size={14} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default WallModeration;
