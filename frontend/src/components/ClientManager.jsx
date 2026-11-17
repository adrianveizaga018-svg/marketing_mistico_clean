import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, UserPlus, KeyRound, Power, Copy, Check, Users, X } from 'lucide-react';

const API = '/api/admin/clientes.php';

// Contraseña aleatoria fácil de dictar (sin 0/O ni 1/l).
const generatePassword = (length = 10) => {
  const alphabet = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const values = new Uint32Array(length);
  window.crypto.getRandomValues(values);
  return Array.from(values, (v) => alphabet[v % alphabet.length]).join('');
};

const accessMessage = ({ name, email, password }) =>
  `Hola ${name} 👋 Este es tu acceso al panel de tu invitación digital (Marketing Místico):\n\n` +
  `🔗 ${window.location.origin}/panel-invitaciones\n📧 Email: ${email}\n🔑 Contraseña: ${password}\n\n` +
  'Desde ahí cargas a tus invitados, envías los links por WhatsApp, ves quién confirmó y apruebas los mensajes del muro.';

const inputClass =
  'w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-[#c9a961]';

const post = async (body) => {
  const res = await fetch(API, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'No se pudo guardar');
  return data;
};

// Solo admin: cuentas de clientes. El evento se asigna desde "Editar" → "Cliente dueño del evento".
const ClientManager = ({ onBack }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  // Credenciales recién creadas / reseteadas: se muestran una sola vez para enviarlas al cliente.
  const [credentials, setCredentials] = useState(null);
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API, { credentials: 'same-origin' });
      const data = await res.json();
      if (res.ok && Array.isArray(data)) setClients(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setForm({ name: '', email: '', password: generatePassword() });
    setError('');
    setShowCreate(true);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await post({ action: 'create', ...form });
      setShowCreate(false);
      setCredentials({ ...form, email: form.email.trim().toLowerCase() });
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const resetPassword = async (client) => {
    if (!window.confirm(`¿Crear una contraseña nueva para ${client.name}? La anterior dejará de funcionar.`)) return;
    const password = generatePassword();
    try {
      await post({ action: 'set_password', id: client.id, password });
      setCredentials({ name: client.name, email: client.email, password });
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleActive = async (client) => {
    const active = Number(client.active) !== 1;
    if (!active && !window.confirm(`¿Desactivar a ${client.name}? Ya no podrá entrar al panel.`)) return;
    try {
      await post({ action: 'toggle', id: client.id, active });
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  const copyCredentials = async () => {
    try {
      await navigator.clipboard.writeText(accessMessage(credentials));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      alert('No se pudo copiar; selecciona el texto manualmente.');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <button onClick={onBack} className="inline-flex items-center gap-2 text-xs text-[#c9a961] hover:underline font-bold mb-2">
            <ArrowLeft size={14} /> Volver a Invitaciones
          </button>
          <h2 className="text-2xl font-black text-white">Clientes</h2>
          <p className="text-xs text-white/50">
            Cada cliente entra con su email y solo ve los eventos que le asignes (Editar evento → "Cliente dueño del evento").
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#c9a961] hover:bg-[#d4af37] text-black rounded-xl text-xs font-black shadow-md"
        >
          <UserPlus size={16} /> Nuevo cliente
        </button>
      </div>

      {credentials && (
        <div className="bg-emerald-500/[0.07] border border-emerald-500/30 rounded-3xl p-6 space-y-4" role="status">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-black text-emerald-300">Acceso listo para {credentials.name}</h3>
              <p className="text-xs text-white/60">
                Envíaselo ahora: la contraseña no se vuelve a mostrar (si se pierde, crea una nueva).
              </p>
            </div>
            <button
              onClick={() => setCredentials(null)}
              className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10"
              aria-label="Cerrar"
            >
              <X size={16} />
            </button>
          </div>
          <pre className="whitespace-pre-wrap break-words bg-black/30 rounded-xl p-4 text-xs text-white/85 font-mono">
            {accessMessage(credentials)}
          </pre>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={copyCredentials}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copiado' : 'Copiar mensaje'}
            </button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(accessMessage(credentials))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black"
            >
              Enviar por WhatsApp
            </a>
          </div>
        </div>
      )}

      <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6">
        {loading ? (
          <p className="text-center py-10 text-white/40 text-xs">Cargando clientes...</p>
        ) : clients.length === 0 ? (
          <div className="text-center py-10">
            <Users size={32} className="mx-auto text-white/30 mb-2" />
            <p className="text-xs text-white/50">Todavía no hay clientes. Crea el primero con "Nuevo cliente".</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-white/40 uppercase font-bold tracking-wider">
                  <th className="pb-3 px-4">Cliente</th>
                  <th className="pb-3 px-4">Email</th>
                  <th className="pb-3 px-4 text-center">Eventos</th>
                  <th className="pb-3 px-4">Estado</th>
                  <th className="pb-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {clients.map((c) => {
                  const active = Number(c.active) === 1;
                  return (
                    <tr key={c.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-bold text-white">{c.name}</td>
                      <td className="py-3 px-4 text-white/70">{c.email}</td>
                      <td className="py-3 px-4 text-center text-white">{Number(c.events) || 0}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-white/40'
                          }`}
                        >
                          {active ? 'Activo' : 'Desactivado'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => resetPassword(c)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70"
                            title="Nueva contraseña"
                            aria-label={`Nueva contraseña para ${c.name}`}
                          >
                            <KeyRound size={14} />
                          </button>
                          <button
                            onClick={() => toggleActive(c)}
                            className={`p-2 rounded-lg ${active ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400' : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400'}`}
                            title={active ? 'Desactivar acceso' : 'Activar acceso'}
                            aria-label={`${active ? 'Desactivar' : 'Activar'} a ${c.name}`}
                          >
                            <Power size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="new-client-title">
          <div className="bg-[#0e0e12] border border-white/15 rounded-3xl p-6 max-w-sm w-full">
            <h3 id="new-client-title" className="text-lg font-black text-white mb-4">Nuevo cliente</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label htmlFor="client-name" className="block text-xs font-bold text-white/70 mb-1">Nombre</label>
                <input
                  id="client-name"
                  required
                  maxLength={120}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ej. Paola Mendoza"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="client-email" className="block text-xs font-bold text-white/70 mb-1">Email (para entrar al panel)</label>
                <input
                  id="client-email"
                  type="email"
                  required
                  maxLength={160}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="cliente@gmail.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="client-password" className="block text-xs font-bold text-white/70 mb-1">Contraseña (mínimo 8)</label>
                <div className="flex gap-2">
                  <input
                    id="client-password"
                    required
                    minLength={8}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className={`${inputClass} font-mono`}
                  />
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, password: generatePassword() })}
                    className="px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-[11px] font-bold shrink-0"
                  >
                    Generar
                  </button>
                </div>
              </div>
              {error && <p className="text-xs text-red-400" role="alert">{error}</p>}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button type="button" onClick={() => setShowCreate(false)} className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold">
                  Cancelar
                </button>
                <button type="submit" disabled={saving} className="py-2.5 rounded-xl bg-[#c9a961] hover:bg-[#d4af37] text-black text-xs font-black disabled:opacity-50">
                  {saving ? 'Creando...' : 'Crear cliente'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManager;
