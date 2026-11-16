import React, { useState } from 'react';
import { Gift, Copy, Check, ExternalLink, QrCode } from 'lucide-react';

const GiftQRModal = ({ isOpen, onClose, gifts }) => {
  const [copiedBank, setCopiedBank] = useState(null);
  const [selectedQR, setSelectedQR] = useState(null);

  if (!isOpen || !gifts) return null;

  // gifts puede ser un objeto estructurado o texto libre
  // Estructura esperada:
  // {
  //   qrs: [{ name: "Simple / BCP", image: "/img/qr-simple.png", holder: "Ana y Luis" }],
  //   banks: [{ bank: "Banco BNB", account: "150-12345678", holder: "Ana Silva", type: "Caja de Ahorros" }],
  //   notes: "Tu presencia es nuestro mejor regalo..."
  // }
  const isStructured = typeof gifts === 'object' && (gifts.qrs || gifts.banks || gifts.notes);
  const qrs = isStructured ? (gifts.qrs || []) : [];
  const banks = isStructured ? (gifts.banks || []) : [];
  const notes = isStructured ? gifts.notes : (typeof gifts === 'string' ? gifts : '');

  const copyAccount = (acc, idx) => {
    navigator.clipboard.writeText(acc);
    setCopiedBank(idx);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0e0e11] border border-[#c9a961]/30 rounded-3xl p-6 sm:p-8 text-left shadow-[0_0_60px_rgba(201,169,97,0.15)] max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all text-sm"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#c9a961]/10 border border-[#c9a961]/30 flex items-center justify-center text-[#c9a961]">
            <Gift size={26} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white">Mesa de Regalos</h3>
            <p className="text-xs text-[#c9a961] font-bold uppercase tracking-wider">Regalo en efectivo digital</p>
          </div>
        </div>

        {notes && (
          <p className="text-white/70 text-sm italic mb-6 leading-relaxed bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
            "{notes}"
          </p>
        )}

        {/* Sección de QRs de Bolivia (Simple, BNB, Tigo Money, etc.) */}
        {qrs.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs uppercase tracking-widest text-white/40 font-black mb-3">
              Pago con QR Bancario (Bolivia)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {qrs.map((qr, i) => (
                <div
                  key={i}
                  className="bg-white/[0.03] border border-white/10 hover:border-[#c9a961]/50 rounded-2xl p-4 text-center cursor-pointer transition-all group"
                  onClick={() => setSelectedQR(qr)}
                >
                  {qr.image ? (
                    <img
                      src={qr.image}
                      alt={qr.name}
                      className="w-32 h-32 mx-auto object-contain bg-white rounded-xl p-2 mb-2 group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-32 h-32 mx-auto bg-[#c9a961]/10 border border-[#c9a961]/30 rounded-xl flex items-center justify-center text-[#c9a961] mb-2">
                      <QrCode size={48} />
                    </div>
                  )}
                  <p className="text-sm font-black text-white">{qr.name}</p>
                  {qr.holder && <p className="text-xs text-white/50">{qr.holder}</p>}
                  <span className="inline-block mt-2 text-[11px] text-[#c9a961] font-bold">
                    Toca para agrandar
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cuentas bancarias */}
        {banks.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs uppercase tracking-widest text-white/40 font-black mb-3">
              Transferencia Bancaria
            </h4>
            <div className="space-y-3">
              {banks.map((b, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-black text-white">{b.bank}</p>
                    <p className="text-xs text-[#c9a961] font-mono mt-0.5">{b.account}</p>
                    {(b.holder || b.type) && (
                      <p className="text-[11px] text-white/50 mt-1">
                        {b.holder} {b.type ? `· ${b.type}` : ''}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => copyAccount(b.account, i)}
                    className="flex items-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-[#c9a961] hover:text-black text-white text-xs font-bold transition-all shrink-0"
                  >
                    {copiedBank === i ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    {copiedBank === i ? 'Copiado' : 'Copiar'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-xs text-white/40">
            ¡Muchas gracias por acompañarnos en nuestro día especial!
          </p>
        </div>

        {/* Modal de QR en pantalla completa */}
        {selectedQR && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 animate-fadeIn" onClick={() => setSelectedQR(null)}>
            <div className="relative bg-[#0e0e11] border border-[#c9a961] rounded-3xl p-6 text-center max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedQR(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 text-white text-sm"
              >
                ✕
              </button>
              <h4 className="text-lg font-black text-white mb-1">{selectedQR.name}</h4>
              {selectedQR.holder && <p className="text-xs text-white/60 mb-4">{selectedQR.holder}</p>}
              <div className="bg-white p-3 rounded-2xl inline-block shadow-2xl mb-4">
                <img src={selectedQR.image} alt={selectedQR.name} className="w-64 h-64 object-contain" />
              </div>
              <p className="text-xs text-[#c9a961] font-bold">
                Escanea desde tu app bancaria (Simple, BNB, BCP, etc.)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftQRModal;
