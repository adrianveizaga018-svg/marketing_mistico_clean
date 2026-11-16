import React, { useState } from 'react';
import { QrCode, CheckCircle2, AlertCircle, RefreshCw, Users, ShieldCheck } from 'lucide-react';

const QRScanner = () => {
  const [code, setCode] = useState('');
  const [invitationId, setInvitationId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleCheckin = async (e) => {
    e.preventDefault();
    if (!code.trim() || !invitationId.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/admin/checkin.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code.trim(),
          invitation_id: parseInt(invitationId, 10),
        }),
      });
      const data = await res.json();
      setResult(data);
      if (res.ok && data.status === 'ok') {
        setCode('');
      }
    } catch (err) {
      setResult({ status: 'error', message: 'Error de conexión con el servidor' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white p-4 sm:p-8 flex flex-col items-center justify-center selection:bg-[#c9a961]/30">
      <div className="w-full max-w-md bg-[#0e0e12] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-[#c9a961]/10 border border-[#c9a961]/30 text-[#c9a961] rounded-2xl flex items-center justify-center mx-auto mb-3">
            <QrCode size={30} />
          </div>
          <h1 className="text-2xl font-black text-white">Control de Puerta</h1>
          <p className="text-xs text-white/50 uppercase tracking-widest font-bold mt-1">Escáner & Check-in de Pases</p>
        </div>

        <form onSubmit={handleCheckin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-white/70 mb-1.5">
              ID de la Invitación
            </label>
            <input
              type="number"
              required
              value={invitationId}
              onChange={(e) => setInvitationId(e.target.value)}
              placeholder="Ej. 1"
              className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#c9a961]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-white/70 mb-1.5">
              Código de Pase (12 dígitos o link completo)
            </label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ej. aB3xK9L2pQ1r"
              className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-white/30 font-mono text-center text-lg focus:outline-none focus:border-[#c9a961]"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-[#c9a961] hover:bg-[#d4af37] text-black font-black text-sm uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(201,169,97,0.25)] flex items-center justify-center gap-2"
          >
            {loading ? <RefreshCw className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
            {loading ? 'Validando...' : 'Verificar e Ingresar'}
          </button>
        </form>

        {result && (
          <div className="mt-6 animate-fadeIn">
            {result.status === 'ok' && (
              <div className="bg-emerald-500/10 border border-emerald-500/40 rounded-2xl p-5 text-center">
                <CheckCircle2 size={36} className="text-emerald-400 mx-auto mb-2" />
                <h3 className="text-lg font-black text-emerald-300">¡Ingreso Autorizado!</h3>
                <p className="text-xl font-bold text-white mt-1">{result.name}</p>
                <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold">
                  <Users size={14} /> {result.people} {result.people === 1 ? 'Persona' : 'Personas'}
                </div>
              </div>
            )}

            {result.status === 'already' && (
              <div className="bg-amber-500/10 border border-amber-500/40 rounded-2xl p-5 text-center">
                <AlertCircle size={36} className="text-amber-400 mx-auto mb-2" />
                <h3 className="text-lg font-black text-amber-300">Pase Ya Utilizado</h3>
                <p className="text-base font-bold text-white mt-1">{result.name}</p>
                <p className="text-xs text-amber-200/80 mt-1">{result.message}</p>
              </div>
            )}

            {(result.status === 'invalid' || result.status === 'declined' || result.status === 'error') && (
              <div className="bg-red-500/10 border border-red-500/40 rounded-2xl p-5 text-center">
                <AlertCircle size={36} className="text-red-400 mx-auto mb-2" />
                <h3 className="text-lg font-black text-red-300">Acceso No Válido</h3>
                <p className="text-sm text-red-200 mt-1">{result.message}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScanner;
