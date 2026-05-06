import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Send, Download, AlertCircle, Package, Truck, Clock, User, ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';
import InventoryChart from '../components/InventoryChart';
import { useSearch } from '../context/SearchContext';
import Modal from '../components/Modal';

const SHIPMENTS_DATA = [
  { tracking: 'TRK-2948', dest: 'Milano, IT', courier: 'DHL', status: 'In Transito', progress: 65 },
  { tracking: 'TRK-9921', dest: 'Lione, FR', courier: 'UPS', status: 'In Consegna', progress: 90 },
  { tracking: 'TRK-3829', dest: 'Madrid, ES', courier: 'FedEx', status: 'Spedito', progress: 30 },
];

const MOVEMENTS_DATA = [
  { id: 'MV-9821', type: 'ENTRATA', item: 'Pellicola Estensibile', date: '24/05, 10:15', user: 'L. Bianchi', qty: '+50' },
  { id: 'MV-9820', type: 'USCITA', item: 'Scatole Cartone 60x40', date: '24/05, 09:30', user: 'M. Rossi', qty: '-120' },
  { id: 'MV-9819', type: 'RESO', item: 'Buste Imbottite', date: '23/05, 16:45', user: 'F. Neri', qty: '+5' },
  { id: 'MV-9818', type: 'RETTIFICA', item: 'Nastro Adesivo', date: '23/05, 11:20', user: 'M. Rossi', qty: '-2' },
];

export const Dashboard = () => {
  const { searchTerm } = useSearch();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [movFilter, setMovFilter] = useState<'tutti' | 'entrate'>('tutti');
  const navigate = useNavigate();

  const quickActions = [
    { id: 'nuovo', label: 'Nuovo Arrivo', icon: Plus, color: 'bg-emerald-500', shadow: 'shadow-emerald-200' },
    { id: 'spedizione', label: 'Crea Spedizione', icon: Send, color: 'bg-brand-500', shadow: 'shadow-brand-200' },
    { id: 'report', label: 'Esporta Report', icon: Download, color: 'bg-amber-500', shadow: 'shadow-amber-200' },
  ];

  const filteredShipments = useMemo(() =>
    SHIPMENTS_DATA.filter(s =>
      s.tracking.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.dest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.courier.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  const filteredMovements = useMemo(() => {
    const bySearch = MOVEMENTS_DATA.filter(m =>
      m.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.user.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return movFilter === 'entrate' ? bySearch.filter(m => m.type === 'ENTRATA') : bySearch;
  }, [searchTerm, movFilter]);

  const getShipmentStatusBadge = (status: string) => {
    switch (status) {
      case 'In Transito': return <span className="px-3 py-1 text-[10px] font-black bg-blue-100 text-blue-700 rounded-lg uppercase tracking-tighter shadow-sm ring-1 ring-blue-200">In Transito</span>;
      case 'In Consegna': return <span className="px-3 py-1 text-[10px] font-black bg-emerald-100 text-emerald-700 rounded-lg uppercase tracking-tighter shadow-sm ring-1 ring-emerald-200">In Consegna</span>;
      case 'Spedito': return <span className="px-3 py-1 text-[10px] font-black bg-purple-100 text-purple-700 rounded-lg uppercase tracking-tighter shadow-sm ring-1 ring-purple-200">Spedito</span>;
      default: return <span className="px-3 py-1 text-[10px] font-black bg-slate-100 text-slate-700 rounded-lg uppercase tracking-tighter shadow-sm ring-1 ring-slate-200">{status}</span>;
    }
  };

  const getShipmentProgressColor = (status: string) => {
    switch (status) {
      case 'In Transito': return 'bg-blue-500';
      case 'In Consegna': return 'bg-emerald-500';
      case 'Spedito': return 'bg-purple-500';
      default: return 'bg-slate-400';
    }
  };

  const getStatusBadge = (type: string) => {
    switch (type) {
      case 'ENTRATA': return <span className="px-3 py-1 text-[10px] font-bold bg-emerald-50 text-emerald-600 rounded-lg ring-1 ring-emerald-500/20 uppercase tracking-wider">Entrata</span>;
      case 'USCITA': return <span className="px-3 py-1 text-[10px] font-bold bg-orange-50 text-orange-600 rounded-lg ring-1 ring-orange-500/20 uppercase tracking-wider">Uscita</span>;
      case 'RESO': return <span className="px-3 py-1 text-[10px] font-bold bg-indigo-50 text-indigo-600 rounded-lg ring-1 ring-indigo-500/20 uppercase tracking-wider">Reso</span>;
      case 'RETTIFICA': return <span className="px-3 py-1 text-[10px] font-bold bg-slate-100 text-slate-600 rounded-lg ring-1 ring-slate-500/10 uppercase tracking-wider">Rettifica</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in">
      <Modal isOpen={activeModal === 'nuovo'} onClose={() => setActiveModal(null)} title="Registra Nuovo Arrivo">
        <div className="space-y-4">
          <div>
            <label htmlFor="arrivo-articolo" className="block text-xs font-black text-slate-500 uppercase mb-2">Articolo</label>
            <input id="arrivo-articolo" type="text" className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20" placeholder="Es. Scatole Cartone 40x40" />
          </div>
          <div>
            <label htmlFor="arrivo-qty" className="block text-xs font-black text-slate-500 uppercase mb-2">Quantità</label>
            <input id="arrivo-qty" type="number" className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20" placeholder="0" />
          </div>
          <div>
            <label htmlFor="arrivo-note" className="block text-xs font-black text-slate-500 uppercase mb-2">Note</label>
            <textarea id="arrivo-note" rows={2} className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 resize-none" placeholder="Note opzionali..." />
          </div>
          <button onClick={() => { alert('Arrivo registrato con successo!'); setActiveModal(null); }} className="w-full py-4 rounded-2xl bg-emerald-500 text-white font-black shadow-lg shadow-emerald-200 mt-2 hover:bg-emerald-600 transition-colors">Conferma Carico</button>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'spedizione'} onClose={() => setActiveModal(null)} title="Crea Nuova Spedizione">
        <div className="space-y-4">
          <div>
            <label htmlFor="sped-destinatario" className="block text-xs font-black text-slate-500 uppercase mb-2">Destinatario</label>
            <input id="sped-destinatario" type="text" className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20" placeholder="Nome Azienda o Cliente" />
          </div>
          <div>
            <label htmlFor="sped-indirizzo" className="block text-xs font-black text-slate-500 uppercase mb-2">Indirizzo</label>
            <input id="sped-indirizzo" type="text" className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20" placeholder="Via, Città, CAP" />
          </div>
          <div>
            <label htmlFor="sped-corriere" className="block text-xs font-black text-slate-500 uppercase mb-2">Corriere</label>
            <select id="sped-corriere" className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 appearance-none">
              <option>DHL</option><option>BRT</option><option>UPS</option><option>SDA</option><option>FedEx</option>
            </select>
          </div>
          <button onClick={() => { alert('Spedizione creata! Tracking: TRK-' + Math.floor(Math.random()*9000+1000)); setActiveModal(null); }} className="w-full py-4 rounded-2xl bg-brand-500 text-white font-black shadow-lg shadow-brand-200 mt-2 hover:bg-brand-600 transition-colors">Genera Tracking</button>
        </div>
      </Modal>

      {/* Top Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-soft border border-slate-100 xl:col-span-2 overflow-hidden relative group">
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">Panoramica Inventario</h3>
              <p className="text-sm text-slate-500 font-bold">Stato attuale delle giacenze</p>
            </div>
            <div className="p-3 bg-slate-100 rounded-2xl group-hover:bg-brand-100 transition-colors">
              <Package className="w-6 h-6 text-slate-500 group-hover:text-brand-600 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="relative w-56 h-56 md:w-64 md:h-64">
              <InventoryChart />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-black text-slate-900 tracking-tighter">6.279</span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Totali</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-4 w-full md:w-64">
              {[
                { label: 'Disponibili', val: '3.450', color: 'bg-emerald-500', trend: 'up' },
                { label: 'Scorta bassa', val: '2.415', color: 'bg-brand-500', trend: 'stable' },
                { label: 'Esauriti', val: '414', color: 'bg-brand-danger', trend: 'down' }
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 transition-all border border-slate-100 cursor-pointer" onClick={() => navigate('/inventario')}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-wider">{stat.label}</span>
                    {stat.trend === 'up' && <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />}
                    {stat.trend === 'down' && <ArrowDownRight className="w-3.5 h-3.5 text-brand-danger" />}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900 tracking-tighter">{stat.val}</span>
                    <div className={`w-2.5 h-2.5 rounded-full ${stat.color} shadow-sm`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-soft border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 tracking-tight mb-8">Azioni Rapide</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
            {quickActions.map((action) => (
              <button key={action.id}
                onClick={() => action.id === 'report' ? navigate('/report') : setActiveModal(action.id)}
                className="flex items-center gap-4 w-full p-5 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all border border-transparent hover:border-slate-100 group text-left">
                <div className={`${action.color} p-3.5 rounded-xl text-white shadow-lg ${action.shadow} group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-black text-slate-800 block">{action.label}</span>
                  <span className="text-[11px] text-slate-500 font-bold uppercase tracking-tight">Esegui operazione</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-soft border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-brand-danger" />Alert Scorte
            </h3>
            <span className="px-2.5 py-1 bg-brand-danger text-white text-[10px] font-black rounded-lg uppercase tracking-tighter shadow-md">3 Urgenze</span>
          </div>
          <div className="space-y-4">
            {[
              { id: 'SKU-092', name: 'Scatole Cartone 40x40', qty: 45, min: 100 },
              { id: 'SKU-112', name: 'Nastro Imballaggio', qty: 12, min: 50 },
              { id: 'SKU-045', name: "Buste Bolle d'aria", qty: 28, min: 80 },
            ].map((item) => (
              <div key={item.id} className={`p-4 rounded-2xl border transition-all cursor-pointer ${item.qty < 30 ? 'border-red-200 bg-red-50/50 hover:bg-red-50' : 'border-amber-100 bg-amber-50/30 hover:bg-amber-50'}`} onClick={() => navigate('/inventario')}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-black text-slate-800 leading-tight">{item.name}</p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.id}</p>
                  </div>
                  <div className={`p-1.5 rounded-lg shadow-sm ${item.qty < 30 ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'}`}>
                    <AlertCircle className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex-1 mr-4">
                    <div className="flex justify-between text-[10px] font-black text-slate-500 mb-1 uppercase tracking-tighter">
                      <span>Giacenza</span><span>Minimo: {item.min}</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-200/50 rounded-full overflow-hidden shadow-inner border border-slate-100">
                      <div className={`h-full rounded-full transition-all duration-1000 ${item.qty < 30 ? 'bg-red-500' : 'bg-amber-500'}`} style={{ width: `${(item.qty / item.min) * 100}%` }}></div>
                    </div>
                  </div>
                  <span className={`text-xl font-black tracking-tighter ${item.qty < 30 ? 'text-red-600' : 'text-amber-600'}`}>{item.qty}</span>
                </div>
              </div>
            ))}
            <button onClick={() => navigate('/inventario')} className="w-full py-4 rounded-2xl text-sm font-black text-brand-600 bg-brand-50 hover:bg-brand-100 transition-colors mt-2 border border-brand-100 shadow-sm">
              Gestisci Riordini →
            </button>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-soft border border-slate-100 xl:col-span-2 overflow-hidden">
          <div className="flex items-center justify-between mb-8 px-2">
            <h3 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
              <Truck className="w-6 h-6 text-slate-500" />
              Tracking Spedizioni {searchTerm && <span className="text-sm font-bold text-brand-500 italic">(Filtrato)</span>}
            </h3>
            <button onClick={() => navigate('/spedizioni')} className="text-sm font-black text-brand-600 hover:text-brand-700 underline underline-offset-4">Vedi tutte →</button>
          </div>
          <div className="overflow-x-auto -mx-6 md:-mx-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 md:px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Tracking</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Destinazione</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Corriere</th>
                  <th className="px-6 md:px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Stato</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredShipments.map((ship) => (
                  <tr key={ship.tracking} onClick={() => navigate('/spedizioni')} className="hover:bg-slate-50/80 transition-colors cursor-pointer group">
                    <td className="px-6 md:px-8 py-5 text-sm font-black text-brand-600 tracking-tight flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${getShipmentProgressColor(ship.status)} animate-pulse shadow-sm`}></div>
                      #{ship.tracking}
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-slate-700">{ship.dest}</td>
                    <td className="px-6 py-5">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[11px] font-black text-slate-700 shadow-sm border border-slate-200 group-hover:bg-white transition-colors text-center p-1">{ship.courier}</div>
                    </td>
                    <td className="px-6 md:px-8 py-5 text-right">
                      <div className="inline-flex flex-col items-end">
                        <div className="mb-2.5">{getShipmentStatusBadge(ship.status)}</div>
                        <div className="w-32 h-2.5 bg-slate-200 rounded-full overflow-hidden shadow-inner border border-slate-100">
                          <div className={`h-full shadow-sm transition-all duration-1000 ${getShipmentProgressColor(ship.status)}`} style={{ width: `${ship.progress}%` }}></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredShipments.length === 0 && (
              <div className="p-12 text-center">
                <Info className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-500 font-bold">Nessuna spedizione trovata per "{searchTerm}"</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-soft border border-slate-100">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
            <Clock className="w-6 h-6 text-slate-500" />
            Movimenti Recenti {searchTerm && <span className="text-sm font-bold text-brand-500 italic">(Filtrato)</span>}
          </h3>
          <div className="flex gap-2">
            <button onClick={() => setMovFilter('tutti')} className={`px-4 py-2 text-xs font-black rounded-xl transition-colors ${movFilter === 'tutti' ? 'bg-brand-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Tutti</button>
            <button onClick={() => setMovFilter('entrate')} className={`px-4 py-2 text-xs font-black rounded-xl transition-colors ${movFilter === 'entrate' ? 'bg-emerald-500 text-white shadow-md' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'}`}>Solo Entrate</button>
          </div>
        </div>
        <div className="overflow-x-auto -mx-6 md:-mx-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 md:px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Tipo</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Movimento</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Articolo</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Data / Ora</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Operatore</th>
                <th className="px-6 md:px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Quantità</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMovements.map((mov) => (
                <tr key={mov.id} onClick={() => navigate('/movimenti')} className="hover:bg-slate-50/80 transition-colors cursor-pointer group">
                  <td className="px-6 md:px-8 py-5">{getStatusBadge(mov.type)}</td>
                  <td className="px-6 py-5 text-sm font-black text-slate-500 tracking-tighter">{mov.id}</td>
                  <td className="px-6 py-5"><span className="text-sm font-black text-slate-800">{mov.item}</span></td>
                  <td className="px-6 py-5 text-sm font-bold text-slate-500">{mov.date}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-slate-200 flex items-center justify-center text-slate-500 shadow-sm"><User className="w-4 h-4" /></div>
                      <span className="text-sm font-black text-slate-700">{mov.user}</span>
                    </div>
                  </td>
                  <td className={`px-6 md:px-8 py-5 text-right text-base font-black tracking-tight ${mov.qty.startsWith('+') ? 'text-emerald-600' : 'text-brand-danger'}`}>{mov.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredMovements.length === 0 && (
            <div className="p-12 text-center">
              <Info className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 font-bold">Nessun movimento trovato</p>
            </div>
          )}
        </div>
        <div className="mt-6 text-center">
          <button onClick={() => navigate('/movimenti')} className="px-6 py-3 rounded-2xl text-sm font-black text-brand-600 bg-brand-50 hover:bg-brand-100 transition-colors border border-brand-100">Vedi tutti i movimenti →</button>
        </div>
      </div>
    </div>
  );
};