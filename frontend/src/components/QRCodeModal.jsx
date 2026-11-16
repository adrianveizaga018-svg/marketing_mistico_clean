import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, Copy, Check, ExternalLink } from 'lucide-react';

const QRCodeModal = ({ isOpen, onClose, url, title, subtitle }) => {
  const canvasRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && canvasRef.current && url) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 240,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      }, (err) => {
        if (err) console.error(err);
      });
    }
  }, [isOpen, url]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `qr-${title || 'invitacion'}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm bg-[#0e0e11] border border-[#c9a961]/30 rounded-3xl p-6 text-center shadow-[0_0_50px_rgba(201,169,97,0.15)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all text-sm"
        >
          ✕
        </button>

        <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-[#c9a961]/10 border border-[#c9a961]/30 flex items-center justify-center text-[#c9a961]">
          <QrCode size={26} />
        </div>

        <h3 className="text-xl font-black text-white">{title || 'Pase QR'}</h3>
        {subtitle && <p className="text-xs text-white/60 mt-1 mb-5">{subtitle}</p>}

        <div className="bg-white p-3 rounded-2xl inline-block shadow-lg my-2">
          <canvas ref={canvasRef} className="block rounded-lg"></canvas>
        </div>

        <p className="text-[11px] text-white/40 mt-3 mb-6 break-all font-mono px-2">
          {url}
        </p>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-white/10 transition-all"
          >
            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            {copied ? 'Copiado' : 'Copiar link'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#c9a961] hover:bg-[#d4af37] text-black font-black text-xs transition-all shadow-md"
          >
            <Download size={16} />
            Descargar
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
