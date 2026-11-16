import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Plus, Calendar, Users, MapPin, QrCode, ExternalLink, 
  Trash2, Edit, Copy, Check, LogOut, RefreshCw, ShieldCheck 
} from 'lucide-react';
import GuestManager from '../components/GuestManager';
import InvitationEditor from '../components/InvitationEditor';
import QRCodeModal from '../components/QRCodeModal';

const InvitixDashboard = () => {
  const [auth, setAuth] = useState({ loading: true, user: null });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Dashboard state
  const [invitations, setInvitations] = useState([]);
  const [loadingInvs, setLoadingInvs] = useState(false);
  const [selectedInvForGuests, setSelectedInvForGuests] = useState(null);
  const [selectedInvForEdit, setSelectedInvForEdit] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  // QR Modal
  const [qrModalData, setQrModalData] = useState(null);
  const [copiedSlug, setCopiedSlug] = useState(null);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const res = await fetch('/admin_auth.php', { credentials: 'same-origin' });
      const data = await res.json();
      if (data.authenticated) {
        setAuth({ loading: false, user: data.user || { role: 'admin', name: 'Administrador' } });
        fetchInvitations();
      } else {
        setAuth({ loading: false, user: null });
      }
    } catch (err) {
      setAuth({ loading: false, user: null });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const body = email ? { email, password } : { password };
      const res = await fetch('/admin_auth.php', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok && data.authenticated) {
        setAuth({ loading: false, user: { role: data.role, name: data.name || 'Usuario' } });
        fetchInvitations();
      } else {
        setAuthError(data.message || 'Credenciales incorrectas');
      }
    } catch (err) {
      setAuthError('Error de conexión');
    }
  };

  const handleLogout = async () => {
    await fetch('/admin_auth.php', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    });
    setAuth({ loading: false, user: null });
    setInvitations([]);
  };

  const fetchInvitations = async () => {
    setLoadingInvs(true);
    try {
      const res = await fetch('/api/admin/invitaciones.php', { credentials: 'same-origin' });
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setInvitations(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingInvs(false);
    }
  };

  const copyLink = (link, id) => {
    navigator.clipboard.writeText(link);
    setCopiedSlug(id);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  if (auth.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#070709] text-white">
        <div className="w-12 h-12 border-4 border-[#c9a961]/20 border-t-[#c9a961] rounded-full animate-spin"></div>
      </div>
    );
  }

  // Vista de Login
  if (!auth.user) {
    return (
      <div className="min-h-screen bg-[#070709] text-white flex flex-col justify-center items-center p-4 selection:bg-[#c9a961]/30">
        <div className="w-full max-w-md bg-[#0e0e12] border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-[#c9a961]/10 border border-[#c9a961]/30 text-[#c9a961] rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Sparkles size={28} />
            </div>
            <h1 className="text-2xl font-black text-white">INVITIX</h1>
            <p className="text-xs text-white/50 uppercase tracking-widest font-bold mt-1">Panel de Control de Invitaciones</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-white/70 mb-1">Email (Clientes)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com (dejar vacío si eres admin)"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#c9a961]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white/70 mb-1">Contraseña</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#c9a961]"
              />
            </div>

            {authError && (
              <p className="text-red-400 text-xs font-bold text-center">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#c9a961] hover:bg-[#d4af37] text-black font-black text-xs uppercase tracking-wider transition-all shadow-md"
            >
              Ingresar al Sistema
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Vista de Gestor de Invitados de un evento específico
  if (selectedInvForGuests) {
    return (
      <div className="min-h-screen bg-[#070709] text-white p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">
          <GuestManager
            invitation={selectedInvForGuests}
            onBack={() => {
              setSelectedInvForGuests(null);
              fetchInvitations();
            }}
          />
        </div>
      </div>
    );
  }

  // Vista de Editor de Invitación
  if (isCreating || selectedInvForEdit) {
    return (
      <div className="min-h-screen bg-[#070709] text-white p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">
          <InvitationEditor
            invitation={selectedInvForEdit}
            onBack={() => {
              setIsCreating(false);
              setSelectedInvForEdit(null);
            }}
            onSaved={() => {
              setIsCreating(false);
              setSelectedInvForEdit(null);
              fetchInvitations();
            }}
          />
        </div>
      </div>
    );
  }

  // Vista Principal: Lista de Eventos / Invitaciones
  return (
    <div className="min-h-screen bg-[#070709] text-white selection:bg-[#c9a961]/30">
      {/* Top Navbar */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-md px-6 py-4 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c9a961]/10 border border-[#c9a961]/30 text-[#c9a961] flex items-center justify-center">
              <Sparkles size={20} />
            </div>
            <div>
              <h1 className="text-lg font-black text-white">INVITIX</h1>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
                {auth.user.role === 'admin' ? 'Administrador Maestro' : `Cliente: ${auth.user.name}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchInvitations}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
              title="Refrescar"
            >
              <RefreshCw size={16} className={loadingInvs ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-[#c9a961] hover:bg-[#d4af37] text-black font-black text-xs transition-all shadow-md"
            >
              <Plus size={16} /> Crear Invitación
            </button>
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-all"
              title="Cerrar Sesión"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 sm:p-8 space-y-8">
        <div>
          <h2 className="text-2xl font-black text-white">Mis Invitaciones</h2>
          <p className="text-xs text-white/50">Gestiona tus eventos, revisa confirmaciones y comparte links de invitados.</p>
        </div>

        {loadingInvs ? (
          <div className="text-center py-16 text-white/40 text-xs">Cargando eventos...</div>
        ) : invitations.length === 0 ? (
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-12 text-center max-w-md mx-auto">
            <Sparkles size={40} className="mx-auto text-[#c9a961] mb-3" />
            <h3 className="text-lg font-black text-white">Aún no tienes invitaciones</h3>
            <p className="text-xs text-white/60 mt-1 mb-6">
              Crea tu primera invitación digital con enlace para invitados, pase QR y mesa de regalos.
            </p>
            <button
              onClick={() => setIsCreating(true)}
              className="py-3 px-6 rounded-xl bg-[#c9a961] text-black font-black text-xs uppercase tracking-wider"
            >
              Crear mi Primer Evento
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {invitations.map((inv) => {
              const totals = inv.totals || {};
              const eventDate = inv.event_at ? new Date(inv.event_at).toLocaleDateString('es-BO', {
                month: 'short', day: 'numeric', year: 'numeric'
              }) : '';

              return (
                <div
                  key={inv.id}
                  className="bg-white/[0.03] border border-white/10 hover:border-[#c9a961]/40 rounded-3xl p-6 flex flex-col justify-between transition-all group shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-[#c9a961]/10 text-[#c9a961] text-[10px] font-black uppercase tracking-wider">
                        {inv.event_type || 'Evento'}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setSelectedInvForEdit(inv)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                          title="Editar"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => setQrModalData({ url: inv.link || `${window.location.origin}/i/${inv.slug}`, name: inv.title })}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-[#c9a961] hover:text-black text-[#c9a961] transition-all"
                          title="Ver QR General"
                        >
                          <QrCode size={14} />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-lg font-black text-white group-hover:text-[#c9a961] transition-colors line-clamp-1">
                      {inv.title}
                    </h3>
                    <p className="text-xs text-white/60 font-semibold mb-3">{inv.honorees}</p>

                    <p className="flex items-center gap-2 text-xs text-white/40 mb-4">
                      <Calendar size={14} className="text-[#c9a961]" /> {eventDate}
                    </p>

                    {/* Stats pills */}
                    <div className="grid grid-cols-3 gap-2 bg-black/40 rounded-2xl p-3 mb-5 border border-white/5 text-center">
                      <div>
                        <p className="text-[10px] text-white/40 uppercase font-bold">Invitados</p>
                        <p className="text-base font-black text-white">{totals.guests || 0}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-emerald-400 uppercase font-bold">Confirmados</p>
                        <p className="text-base font-black text-emerald-400">{totals.confirmed || 0}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#c9a961] uppercase font-bold">Llegaron</p>
                        <p className="text-base font-black text-[#c9a961]">{totals.arrived || 0}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <button
                      onClick={() => setSelectedInvForGuests(inv)}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-[#c9a961] hover:text-black text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                    >
                      <Users size={15} /> Administrar Invitados
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => copyLink(inv.link || `${window.location.origin}/i/${inv.slug}`, inv.id)}
                        className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-all"
                      >
                        {copiedSlug === inv.id ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                        {copiedSlug === inv.id ? 'Copiado' : 'Copiar Link'}
                      </button>
                      <a
                        href={`/i/${inv.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-all"
                      >
                        <ExternalLink size={13} /> Ver Invitación
                      </a>
                    </div>

                    <a
                      href={`/en-vivo/${inv.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-[#c9a961]/15 hover:bg-[#c9a961] hover:text-black text-[#c9a961] font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all border border-[#c9a961]/30"
                    >
                      📺 Pantalla En Vivo (Proyector Salón)
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Modal QR General */}
      {qrModalData && (
        <QRCodeModal
          isOpen={!!qrModalData}
          onClose={() => setQrModalData(null)}
          url={qrModalData.url}
          title={qrModalData.name}
          subtitle="Enlace público de la invitación"
        />
      )}
    </div>
  );
};

export default InvitixDashboard;
