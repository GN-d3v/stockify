import { useState, useMemo } from 'react';
import { Search, Truck, MapPin, Plus, X } from 'lucide-react';
import Modal from '../components/Modal';

const ALL_SHIPMENTS = [
  { tracking: 'TRK-2948', dest: 'Milano, IT', courier: 'DHL', status: 'In Transito', date: '24/05/2024', weight: '2.4 kg', progress: 65 },
  { tracking: 'TRK-9921', dest: 'Lione, FR', courier: 'UPS', status: 'In Consegna', date: '24/05/2024', weight: '0.8 kg', progress: 90 },
  { tracking: 'TRK-3829', dest: 'Madrid, ES', courier: 'FedEx', status: 'Spedito', date: '23/05/2024', weight: '5.1 kg', progress: 30 },
  { tracking: 'TRK-1102', dest: 'Berlino, DE', courier: 'DHL', status: 'Consegnato', date: '22/05/2024', weight: '1.2 kg', progress: 100 },
  { tracking: 'TRK-4451', dest: 'Roma, IT', courier: 'BRT', status: 'In Transito', date: '23/05/2024', weight: '3.6 kg', progress: 50 },
];

const STATUS_COLOR: Record<string, string> = {
  'In Transito': 'bg-blue-500',
  'In Consegna': 'bg-amber-500',
  'Spedito': 'bg-purple-500',
  'Consegnato': 'bg-emerald-500',
};

const STATUS_BADGE: Record<string, string> = {
  'In Transito': 'bg-blue-100 text-blue-700',
  'In Consegna': 'bg-amber-100 text-amber-700',
  'Spedito': 'bg-purple-100 text-purple-700',
  'Consegnato': 'bg-emerald-100 text-emerald-700',
};

export const Spedizioni = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ dest: '', corriere: 'DHL', peso: '', note: '' });

  const filtered = useMemo(() => ALL_SHIPMENTS.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = s.tracking.toLowerCase().includes(q) || s.dest.toLowerCase().includes(q) || s.courier.toLowerCase().includes(q);
    const matchStatus = !filterStatus || s.status === filterStatus;
    return matchSearch && matchStatus;
  }), [search, filterStatus]);

  const statuses = ['In Transito', 'In Consegna', 'Spedito', 'Consegnato'];

  return (
    <div className="space-y-6">
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Nuova Spedizione">
        <div className="space-y-4">
          <div>
            <label htmlFor="ns-dest" className="block text-xs font-black text-slate-500 uppercase mb-2">Destinazione</label>
            <input id="ns-dest" value={form.dest} onChange={e => setForm({ ...form, dest: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm" placeholder="Es. Roma, IT" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="ns-corriere" className="block text-xs font-black text-slate-500 uppercase mb-2">Corriere</label>
              <select id="ns-corriere" value={form.corriere} onChange={e => setForm({ ...form, corriere: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm appearance-none">
                <option>DHL</option><option>UPS</option><option>FedEx</option><option>BRT</option><option>SDA</option>
              </select>
            </div>
            <div>
              <label htmlFor="ns-peso" className="block text-xs font-black text-slate-500 uppercase mb-2">Peso (kg)</label>
              <input id="ns-peso" type="number" value={form.peso} onChange={e => setForm({ ...form, peso: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm" placeholder="0.0" />
            </div>
          </div>
          <div>
            <label htmlFor="ns-note" className="block text-xs font-black text-slate-500 uppercase mb-2">Note</label>
            <textarea id="ns-note" value={form.note} onChange={e => setForm({ ...form, note: e.target.value })}
              rows={2} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm resize-none" placeholder="Istruzioni per il corriere..." />
          </div>
          <button onClick={() => { alert(`Spedizione creata! Tracking: TRK-${Math.floor(Math.random() * 9000 + 1000)}`); setModalOpen(false); setForm({ dest: '', corriere: 'DHL', peso: '', note: '' }); }}
            className="w-full py-4 rounded-2xl bg-brand-500 text-white font-black shadow-lg shadow-brand-200 hover:bg-brand-600 transition-colors mt-2">
            Crea Spedizione
          </button>
        </div>
      </Modal>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Truck className="w-6 h-6 text-brand-500" />Monitoraggio Spedizioni
        </h2>
        <button onClick={() => setModalOpen(true)} className="bg-brand-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-brand-600 transition-colors font-bold shadow-lg shadow-brand-200">
          <Plus className="w-5 h-5" />Nuova Spedizione
        </button>
      </div>

      {/* Filtri rapidi */}
      <div className="flex flex-wrap gap-3">
        <button onClick={() => setFilterStatus('')}
          className={`px-4 py-2 rounded-xl text-sm font-black transition-all ${!filterStatus ? 'bg-brand-500 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-300'}`}>
          Tutte ({ALL_SHIPMENTS.length})
        </button>
        {statuses.map(s => (
          <button key={s} onClick={() => setFilterStatus(filterStatus === s ? '' : s)}
            className={`px-4 py-2 rounded-xl text-sm font-black transition-all ${filterStatus === s ? 'bg-brand-500 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-300'}`}>
            {s} ({ALL_SHIPMENTS.filter(sh => sh.status === s).length})
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-[1.5rem] shadow-soft border border-slate-100">
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Cerca per Tracking o Destinazione..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm transition-all" />
            <Search className="absolute left-3 top-2.5 text-slate-400 w-5 h-5" />
            {search && <button onClick={() => setSearch('')} className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>}
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map((ship) => (
            <div key={ship.tracking} className="p-5 rounded-2xl border border-slate-100 hover:border-brand-200 hover:shadow-md transition-all cursor-pointer group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${STATUS_COLOR[ship.status] || 'bg-slate-400'} animate-pulse shadow-sm`}></div>
                  <div>
                    <p className="font-black text-brand-600 text-sm">#{ship.tracking}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-500 font-bold mt-0.5">
                      <MapPin className="w-3 h-3" />{ship.dest}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 flex-wrap">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Corriere</p>
                    <p className="text-sm font-black text-slate-700">{ship.courier}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Peso</p>
                    <p className="text-sm font-black text-slate-700">{ship.weight}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Data</p>
                    <p className="text-sm font-black text-slate-700">{ship.date}</p>
                  </div>
                  <span className={`px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-tighter ${STATUS_BADGE[ship.status] || 'bg-slate-100 text-slate-600'}`}>
                    {ship.status}
                  </span>
                </div>
              </div>
              {/* Barra di progresso */}
              <div className="mt-4">
                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase mb-1">
                  <span>Spedito</span><span>In Transito</span><span>In Consegna</span><span>Consegnato</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-700 ${STATUS_COLOR[ship.status] || 'bg-slate-400'}`} style={{ width: `${ship.progress}%` }}></div>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Truck className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 font-bold">Nessuna spedizione trovata</p>
            </div>
          )}
        </div>
        <p className="text-xs text-slate-400 font-bold mt-4">{filtered.length} di {ALL_SHIPMENTS.length} spedizioni</p>
      </div>
    </div>
  );
};
