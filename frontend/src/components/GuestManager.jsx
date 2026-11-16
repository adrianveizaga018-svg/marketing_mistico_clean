import React, { useState, useEffect } from 'react';
import { 
  Users, UserPlus, FileSpreadsheet, ArrowLeft, Send, CheckCircle2, 
  XCircle, Clock, Trash2, Edit2, ExternalLink, QrCode, Search, Download 
} from 'lucide-react';
import QRCodeModal from '../components/QRCodeModal';

// Plantilla modelo para Excel / Google Sheets (el separador "," lo entiende el importador).
const CSV_TEMPLATE = [
  'nombre_completo,telefono,passes,mesa',
  'Juan Pérez Mamani,70012345,2,Mesa 1',
  'Familia Quispe Rojas,71234567,4,Mesa 3',
  'María Gómez,,1,',
].join('\r\n');

const downloadCsvTemplate = () => {
  // BOM para que Excel muestre bien las tildes.
  const blob = new Blob(['﻿' + CSV_TEMPLATE], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'plantilla_invitados.csv';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const GuestManager = ({ invitation, onBack }) => {
  const [guests, setGuests] = useState([]);
  const [totals, setTotals] = useState({ guests: 0, passes: 0, confirmed: 0, declined: 0, arrived: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Form states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestPasses, setGuestPasses] = useState(1);
  const [guestTable, setGuestTable] = useState('');
  const [csvText, setCsvText] = useState('');

  const loadCsvFile = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.size > 1024 * 1024) {
      alert('El archivo es muy grande (máximo 1 MB)');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setCsvText(String(reader.result).replace(/^﻿/, ''));
    reader.readAsText(file, 'utf-8');
  };

  // QR Modal
  const [qrModalData, setQrModalData] = useState(null);

  useEffect(() => {
    fetchGuests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitation.id]);

  const fetchGuests = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/invitados.php?invitation_id=${invitation.id}`, {
        credentials: 'same-origin',
      });
      const data = await res.json();
      if (res.ok && data.guests) {
        setGuests(data.guests);
        setTotals(data.totals);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGuest = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/invitados.php', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add',
          invitation_id: invitation.id,
          name: guestName,
          phone: guestPhone,
          passes: guestPasses,
          table: guestTable,
        }),
      });
      if (res.ok) {
        setGuestName('');
        setGuestPhone('');
        setGuestPasses(1);
        setGuestTable('');
        setShowAddModal(false);
        fetchGuests();
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.message || 'No se pudo agregar el invitado');
      }
    } catch (err) {
      alert('Error al agregar invitado');
    }
  };

  const handleImportCSV = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/invitados.php', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'import',
          invitation_id: invitation.id,
          csv: csvText,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setCsvText('');
        setShowImportModal(false);
        const skipped = data.skipped_lines?.length ? ` (${data.skipped_lines.length} filas omitidas por límite)` : '';
        alert(`Importados con éxito: ${data.added ?? 0} invitados${skipped}`);
        fetchGuests();
      } else {
        alert(data.message || 'Error al importar');
      }
    } catch (err) {
      alert('Error al importar archivo');
    }
  };

  const handleDeleteGuest = async (id) => {
    if (!window.confirm('¿Eliminar este invitado?')) return;
    try {
      const res = await fetch('/api/admin/invitados.php', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id }),
      });
      if (res.ok) fetchGuests();
    } catch (err) {
      console.error(err);
    }
  };

  const markSent = (id, waUrl) => {
    fetch('/api/admin/invitados.php', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'mark_sent', id }),
    }).then(() => fetchGuests());
    window.open(waUrl, '_blank');
  };

  const filteredGuests = guests.filter(g => 
    g.name.toLowerCase().includes(search.toLowerCase()) || 
    (g.phone && g.phone.includes(search))
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs text-[#c9a961] hover:underline font-bold mb-2"
          >
            <ArrowLeft size={14} /> Volver a Invitaciones
          </button>
          <h2 className="text-2xl font-black text-white">{invitation.title}</h2>
          <p className="text-xs text-white/50">{invitation.honorees} · {invitation.event_at}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={downloadCsvTemplate}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold border border-white/10 transition-all"
          >
            <Download size={16} /> Descargar plantilla Excel/CSV
          </button>
          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold border border-white/10 transition-all"
          >
            <FileSpreadsheet size={16} /> Importar CSV
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#c9a961] hover:bg-[#d4af37] text-black rounded-xl text-xs font-black transition-all shadow-md"
          >
            <UserPlus size={16} /> Agregar Invitado
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
          <p className="text-[11px] text-white/40 uppercase font-black tracking-wider">Invitados</p>
          <p className="text-2xl font-black text-white mt-1">{totals.guests}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
          <p className="text-[11px] text-white/40 uppercase font-black tracking-wider">Pases Totales</p>
          <p className="text-2xl font-black text-[#c9a961] mt-1">{totals.passes}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
          <p className="text-[11px] text-emerald-400 uppercase font-black tracking-wider">Confirmados</p>
          <p className="text-2xl font-black text-emerald-400 mt-1">{totals.confirmed}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
          <p className="text-[11px] text-red-400 uppercase font-black tracking-wider">No Asistirán</p>
          <p className="text-2xl font-black text-red-400 mt-1">{totals.declined}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 col-span-2 sm:col-span-1">
          <p className="text-[11px] text-[#c9a961] uppercase font-black tracking-wider">Llegaron</p>
          <p className="text-2xl font-black text-white mt-1">{totals.arrived}</p>
        </div>
      </div>

      {/* Search and Table */}
      <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar invitado o teléfono..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-2 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#c9a961]"
            />
          </div>
          <a
            href={`/api/admin/confirmados.php?invitation_id=${invitation.id}&format=csv`}
            download
            className="flex items-center gap-1.5 text-xs text-white/70 hover:text-[#c9a961] font-bold"
          >
            <Download size={14} /> Exportar Excel
          </a>
        </div>

        {loading ? (
          <div className="text-center py-12 text-white/40 text-xs">Cargando invitados...</div>
        ) : filteredGuests.length === 0 ? (
          <div className="text-center py-12 text-white/40 text-xs">No hay invitados registrados todavía.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-white/40 uppercase font-bold tracking-wider">
                  <th className="pb-3 px-4">Invitado</th>
                  <th className="pb-3 px-4">Teléfono</th>
                  <th className="pb-3 px-4 text-center">Pases</th>
                  <th className="pb-3 px-4">Mesa</th>
                  <th className="pb-3 px-4">Estado</th>
                  <th className="pb-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredGuests.map((g) => (
                  <tr key={g.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-bold text-white">
                      {g.name}
                      {g.message && <p className="text-[11px] text-[#c9a961] italic font-normal mt-0.5">"{g.message}"</p>}
                    </td>
                    <td className="py-3 px-4 text-white/60 font-mono">{g.phone || '-'}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-white/5 font-bold text-white">
                        {g.passes}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-white/70">{g.table || '-'}</td>
                    <td className="py-3 px-4">
                      {g.status === 'confirmo' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-[10px]">
                          <CheckCircle2 size={12} /> Confirmó ({g.people})
                        </span>
                      )}
                      {g.status === 'no_asistira' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 font-bold text-[10px]">
                          <XCircle size={12} /> No asistirá
                        </span>
                      )}
                      {g.status === 'llego' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#c9a961]/20 text-[#c9a961] font-bold text-[10px]">
                          ✓ Ingresó
                        </span>
                      )}
                      {g.status === 'abrio' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 font-bold text-[10px]">
                          Visto
                        </span>
                      )}
                      {g.status === 'enviado' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-white/60 font-bold text-[10px]">
                          Enviado
                        </span>
                      )}
                      {g.status === 'no_enviado' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 text-white/40 font-bold text-[10px]">
                          Sin enviar
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {g.phone && (
                          <button
                            onClick={() => markSent(g.id, g.whatsapp)}
                            className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all"
                            title="Enviar WhatsApp"
                          >
                            <Send size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => setQrModalData({ url: g.link, name: g.name })}
                          className="p-1.5 rounded-lg bg-white/5 text-[#c9a961] hover:bg-[#c9a961] hover:text-black transition-all"
                          title="Ver QR"
                        >
                          <QrCode size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteGuest(g.id)}
                          className="p-1.5 rounded-lg bg-white/5 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                          title="Eliminar"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Agregar Invitado */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0e0e12] border border-white/15 rounded-3xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-black text-white mb-4">Agregar Invitado</h3>
            <form onSubmit={handleAddGuest} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white/70 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Ej. Tía María"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-[#c9a961]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/70 mb-1">WhatsApp (Bolivia)</label>
                <input
                  type="text"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="Ej. 70012345"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs font-mono focus:outline-none focus:border-[#c9a961]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/70 mb-1">Pases Asignados</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={guestPasses}
                  onChange={(e) => setGuestPasses(parseInt(e.target.value, 10) || 1)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-[#c9a961]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/70 mb-1">Mesa (opcional)</label>
                <input
                  type="text"
                  maxLength={40}
                  value={guestTable}
                  onChange={(e) => setGuestTable(e.target.value)}
                  placeholder="Ej. Mesa 5 / Familia"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-[#c9a961]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="py-2.5 rounded-xl bg-[#c9a961] hover:bg-[#d4af37] text-black text-xs font-black"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Importar CSV */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0e0e12] border border-white/15 rounded-3xl p-6 max-w-md w-full">
            <h3 className="text-lg font-black text-white mb-2">Importar Invitados masivo</h3>
            <p className="text-xs text-white/60 mb-4">
              Columnas: <code className="text-[#c9a961]">nombre_completo, telefono, passes, mesa</code> (separado por coma o punto y coma).
              Llena la plantilla en Excel, guárdala como CSV y súbela, o pega las filas aquí.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                type="button"
                onClick={downloadCsvTemplate}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10"
              >
                <Download size={14} /> Descargar plantilla
              </button>
              <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 cursor-pointer">
                <FileSpreadsheet size={14} /> Cargar archivo .csv
                <input type="file" accept=".csv,text/csv,text/plain" onChange={loadCsvFile} className="hidden" />
              </label>
            </div>
            <form onSubmit={handleImportCSV} className="space-y-4">
              <textarea
                rows="6"
                required
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                placeholder={"Juan Pérez, 70012345, 2, Mesa 1\nMaría Gómez, 71234567, 1, Mesa 4"}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-xs font-mono focus:outline-none focus:border-[#c9a961]"
              ></textarea>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="py-2.5 rounded-xl bg-[#c9a961] hover:bg-[#d4af37] text-black text-xs font-black"
                >
                  Importar Lista
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal QR */}
      {qrModalData && (
        <QRCodeModal
          isOpen={!!qrModalData}
          onClose={() => setQrModalData(null)}
          url={qrModalData.url}
          title={qrModalData.name}
          subtitle="Enlace personalizado para este invitado"
        />
      )}
    </div>
  );
};

export default GuestManager;
