import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Download, 
  LogOut, 
  Calendar, 
  MapPin, 
  MessageSquare, 
  Lock,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Mail,
  Smartphone
} from 'lucide-react';

const LeadsDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastRefreshed, setLastRefreshed] = useState(null);

  const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD || 'mistico2026';

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === adminPassword) {
      setIsAuthenticated(true);
      fetchLeads();
    } else {
      setError('Contraseña mística incorrecta');
      setTimeout(() => setError(''), 3000);
    }
  };

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const apiUrl = process.env.REACT_APP_API_URL || (isLocal ? `http://${window.location.hostname}:5000` : 'https://api.marketingmistico.com');
      const response = await fetch(`${apiUrl}/api/leads`);
      if (response.ok) {
        const data = await response.json();
        // Sort by timestamp descending
        setLeads(data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
        setLastRefreshed(new Date());
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = () => {
    if (leads.length === 0) return;

    const headers = ['Nombre', 'Email', 'WhatsApp', 'País', 'Servicio', 'Fecha'];
    const csvContent = [
      headers.join(','),
      ...leads.map(lead => [
        `"${lead.nombre}"`,
        `"${lead.email}"`,
        `"${lead.whatsapp}"`,
        `"${lead.pais}"`,
        `"${lead.servicio}"`,
        `"${new Date(lead.timestamp).toLocaleString()}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_marketing_mistico_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter(lead => 
    lead.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.servicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.pais.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#c9a961]/10 rounded-full filter blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#d4af37]/5 rounded-full filter blur-[150px]"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-3xl">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-br from-[#c9a961] to-[#d4af37] rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg transform -rotate-6">
                <Lock className="text-black" size={32} />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tighter mb-2">Acceso Místico</h1>
              <p className="text-white/40 text-sm uppercase tracking-[0.2em] font-bold">Gestión de Leads Premium</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#c9a961] transition-colors" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña Maestra"
                  className="w-full bg-white/[0.05] border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-[#c9a961]/50 focus:ring-4 focus:ring-[#c9a961]/10 transition-all font-bold"
                  autoFocus
                />
              </div>

              {error && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-400 text-xs font-bold text-center uppercase tracking-widest"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                className="w-full bg-[#c9a961] hover:bg-white text-black font-black text-sm uppercase tracking-[0.2em] py-5 rounded-2xl transition-all duration-500 hover:scale-[1.02] shadow-[0_0_30px_rgba(201,169,97,0.2)] flex items-center justify-center gap-3"
              >
                Desbloquear <ArrowRight size={20} />
              </button>
            </form>
            
            <p className="text-center text-white/10 text-[10px] uppercase tracking-widest font-black mt-10">
              Marketing Místico © {new Date().getFullYear()} • Secure Node
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#c9a961]/30">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#c9a961]/5 rounded-full blur-[180px]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/2 rounded-full blur-[150px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-20 bg-black/50 backdrop-blur-xl border-b border-white/5 px-8 py-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#c9a961] to-[#d4af37] rounded-2xl flex items-center justify-center shadow-lg">
              <ShieldCheck className="text-black" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tighter">Panel de Leads</h2>
              <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-[0.2em] font-black">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Node Seguro Activo
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={fetchLeads}
              disabled={isLoading}
              className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-white/60 hover:text-[#c9a961]"
              title="Refrescar datos"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            
            <button 
              onClick={exportToCSV}
              className="bg-white/5 border border-white/10 text-white hover:bg-[#c9a961] hover:text-black font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-all flex items-center gap-2"
            >
              <Download size={16} />
              Exportar CSV
            </button>

            <button 
              onClick={() => setIsAuthenticated(false)}
              className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
              title="Cerrar sesión"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-8 py-12 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 flex items-center gap-6">
            <div className="w-16 h-16 bg-[#c9a961]/10 rounded-2xl flex items-center justify-center">
              <Users className="text-[#c9a961]" size={32} />
            </div>
            <div>
              <div className="text-xs text-white/40 uppercase tracking-widest font-black mb-1">Total Leads</div>
              <div className="text-4xl font-black tracking-tighter">{leads.length}</div>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center">
              <Calendar className="text-blue-400" size={32} />
            </div>
            <div>
              <div className="text-xs text-white/40 uppercase tracking-widest font-black mb-1">Hoy</div>
              <div className="text-4xl font-black tracking-tighter">
                {leads.filter(l => new Date(l.timestamp).toDateString() === new Date().toDateString()).length}
              </div>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 flex items-center gap-6">
            <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center">
              <RefreshCw className="text-green-400" size={32} />
            </div>
            <div>
              <div className="text-xs text-white/40 uppercase tracking-widest font-black mb-1">Última Act.</div>
              <div className="text-sm font-bold tracking-tight text-white/60">
                {lastRefreshed ? lastRefreshed.toLocaleTimeString() : '--:--'}
              </div>
            </div>
          </div>
        </div>

        {/* Filters Toolabar */}
        <div className="mb-8 flex items-center">
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#c9a961] transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por nombre, email, país o servicio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-16 pr-6 py-5 focus:outline-none focus:border-[#c9a961]/30 transition-all font-medium"
            />
          </div>
        </div>

        {/* Table Glass-Card */}
        <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/5">
                  <th className="px-8 py-6 text-left text-[10px] uppercase tracking-widest font-black text-white/40">Datos del Lead</th>
                  <th className="px-8 py-6 text-left text-[10px] uppercase tracking-widest font-black text-white/40">País</th>
                  <th className="px-8 py-6 text-left text-[10px] uppercase tracking-widest font-black text-white/40">Interés</th>
                  <th className="px-8 py-6 text-left text-[10px] uppercase tracking-widest font-black text-white/40">Fecha</th>
                  <th className="px-8 py-6 text-right text-[10px] uppercase tracking-widest font-black text-white/40">Contacto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.map((lead, index) => (
                  <tr key={index} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center font-black text-[#c9a961] border border-white/5">
                          {lead.nombre.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-white text-base tracking-tight">{lead.nombre}</p>
                          <p className="text-white/30 text-xs flex items-center gap-1.5 mt-0.5">
                            <Mail size={12} /> {lead.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-white/60 font-bold text-sm">
                        <MapPin size={14} className="text-[#c9a961]" />
                        {lead.pais}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-[#c9a961]/10 border border-[#c9a961]/20 rounded-lg text-[#c9a961] text-[10px] font-black uppercase tracking-widest">
                        {lead.servicio}
                      </span>
                    </td>
                    <td className="px-8 py-6 font-medium text-white/40 text-sm italic">
                      {new Date(lead.timestamp).toLocaleDateString()}
                      <span className="block text-[10px] opacity-50 mt-1 uppercase tracking-tighter">
                        {new Date(lead.timestamp).toLocaleTimeString()}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <a 
                        href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition-all"
                      >
                       <Smartphone size={14} /> WhatsApp
                      </a>
                    </td>
                  </tr>
                ))}

                {filteredLeads.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <MessageSquare className="text-white/10" size={48} />
                        <p className="text-white/40 font-bold tracking-widest uppercase text-sm">No se encontraron leads mísiticos</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-12 text-center text-white/10 text-[10px] uppercase tracking-[0.3em] font-black">
          Marketing Místico Dashboard • Protocolo de Seguridad Activo
        </p>
      </main>
    </div>
  );
};

export default LeadsDashboard;
