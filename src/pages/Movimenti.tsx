import { useState, useMemo } from 'react';
import { Search, Filter, History, User, X, ChevronDown } from 'lucide-react';

const ALL_MOVEMENTS = [
  { id: 'MV-9821', type: 'ENTRATA', item: 'Pellicola Estensibile', date: '24/05/2024', user: 'L. Bianchi', qty: '+50' },
  { id: 'MV-9820', type: 'USCITA', item: 'Scatole Cartone 60x40', date: '24/05/2024', user: 'M. Rossi', qty: '-120' },
  { id: 'MV-9819', type: 'RESO', item: 'Buste Imbottite', date: '23/05/2024', user: 'F. Neri', qty: '+5' },
  { id: 'MV-9818', type: 'RETTIFICA', item: 'Nastro Adesivo', date: '23/05/2024', user: 'M. Rossi', qty: '-2' },
  { id: 'MV-9817', type: 'ENTRATA', item: 'Etichette Termiche', date: '22/05/2024', user: 'L. Bianchi', qty: '+1000' },
  { id: 'MV-9816', type: 'USCITA', item: 'Pellicola Estensibile', date: '22/05/2024', user: 'F. Neri', qty: '-30' },
  { id: 'MV-9815', type: 'RESO', item: 'Scatole Cartone 40x40', date: '21/05/2024', user: 'M. Rossi', qty: '+10' },
  { id: 'MV-9814', type: 'ENTRATA', item: 'Sacchi Polietilene', date: '21/05/2024', user: 'L. Bianchi', qty: '+200' },
];

export const Movimenti = () => {
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState('');

  const filtered = useMemo(() => ALL_MOVEMENTS.filter(m => {
    const q = search.toLowerCase();
    const matchSearch = m.id.toLowerCase().includes(q) || m.item.toLowerCase().includes(q) || m.user.toLowerCase().includes(q);
    const matchType = !filterType || m.type === filterType;
    return matchSearch && matchType;
  }), [search, filterType]);

  const getStatusBadge = (type: string) => {
    switch (type) {
      case 'ENTRATA': return <span className="px-2.5 py-1 text-[10px] font-black bg-emerald-100 text-emerald-700 rounded-lg uppercase tracking-wider">Entrata</span>;
      case 'USCITA': return <span className="px-2.5 py-1 text-[10px] font-black bg-orange-100 text-orange-700 rounded-lg uppercase tracking-wider">Uscita</span>;
      case 'RESO': return <span className="px-2.5 py-1 text-[10px] font-black bg-indigo-100 text-indigo-700 rounded-lg uppercase tracking-wider">Reso</span>;
      case 'RETTIFICA': return <span className="px-2.5 py-1 text-[10px] font-black bg-slate-100 text-slate-600 rounded-lg uppercase tracking-wider">Rettifica</span>;
      default: return null;
    }
  };

  const counts = useMemo(() => ({
    entrate: ALL_MOVEMENTS.filter(m => m.type === 'ENTRATA').length,
    uscite: ALL_MOVEMENTS.filter(m => m.type === 'USCITA').length,
  }), []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <History className="w-6 h-6 text-brand-500" />Movimenti di Magazzino
        </h2>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Totale', val: ALL_MOVEMENTS.length, color: 'text-slate-800', bg: 'bg-slate-50', active: !filterType, onClick: () => setFilterType('') },
          { label: 'Entrate', val: counts.entrate, color: 'text-emerald-700', bg: 'bg-emerald-50', active: filterType === 'ENTRATA', onClick: () => setFilterType(filterType === 'ENTRATA' ? '' : 'ENTRATA') },
          { label: 'Uscite', val: counts.uscite, color: 'text-orange-700', bg: 'bg-orange-50', active: filterType === 'USCITA', onClick: () => setFilterType(filterType === 'USCITA' ? '' : 'USCITA') },
          { label: 'Resi', val: ALL_MOVEMENTS.filter(m => m.type === 'RESO').length, color: 'text-indigo-700', bg: 'bg-indigo-50', active: filterType === 'RESO', onClick: () => setFilterType(filterType === 'RESO' ? '' : 'RESO') },
        ].map(s => (
          <button key={s.label} onClick={s.onClick}
            className={`p-4 rounded-2xl border text-left transition-all ${s.active ? 'border-brand-500 shadow-md ring-2 ring-brand-500/20' : 'border-slate-100 hover:shadow-md'} ${s.bg} bg-white`}>
            <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`text-2xl font-black tracking-tighter ${s.color}`}>{s.val}</p>
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-[1.5rem] shadow-soft border border-slate-100">
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Cerca per ID o Articolo..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm transition-all" />
            <Search className="absolute left-3 top-2.5 text-slate-400 w-5 h-5" />
            {search && <button onClick={() => setSearch('')} className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>}
          </div>
          <div className="relative">
            <button onClick={() => setFilterOpen(!filterOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl font-bold text-sm transition-colors ${filterType ? 'border-brand-500 text-brand-600 bg-brand-50' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              <Filter className="w-4 h-4" />Tipo
              <ChevronDown className={`w-4 h-4 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
            </button>
            {filterOpen && (
              <div className="absolute right-0 top-12 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-10 w-52 space-y-2">
                {['', 'ENTRATA', 'USCITA', 'RESO', 'RETTIFICA'].map(t => (
                  <button key={t} onClick={() => { setFilterType(t); setFilterOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-colors ${filterType === t ? 'bg-brand-500 text-white' : 'hover:bg-slate-50 text-slate-700'}`}>
                    {t || 'Tutti i tipi'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="text-left border-b border-slate-100 bg-slate-50/50">
              <tr>
                <th className="pb-3 pt-2 px-2 text-[10px] font-black text-slate-500 uppercase tracking-wider">Tipo</th>
                <th className="pb-3 pt-2 px-2 text-[10px] font-black text-slate-500 uppercase tracking-wider">ID</th>
                <th className="pb-3 pt-2 px-2 text-[10px] font-black text-slate-500 uppercase tracking-wider">Articolo</th>
                <th className="pb-3 pt-2 px-2 text-[10px] font-black text-slate-500 uppercase tracking-wider">Data</th>
                <th className="pb-3 pt-2 px-2 text-[10px] font-black text-slate-500 uppercase tracking-wider">Operatore</th>
                <th className="pb-3 pt-2 px-2 text-[10px] font-black text-slate-500 uppercase tracking-wider text-right">Quantità</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((mov) => (
                <tr key={mov.id} className="hover:bg-slate-50/80 transition-colors cursor-pointer">
                  <td className="py-4 px-2">{getStatusBadge(mov.type)}</td>
                  <td className="py-4 px-2 text-sm font-bold text-slate-500">{mov.id}</td>
                  <td className="py-4 px-2 text-sm font-bold text-slate-800">{mov.item}</td>
                  <td className="py-4 px-2 text-sm text-slate-500">{mov.date}</td>
                  <td className="py-4 px-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-slate-200 flex items-center justify-center"><User className="w-3.5 h-3.5 text-slate-500" /></div>
                      {mov.user}
                    </div>
                  </td>
                  <td className={`py-4 px-2 text-right text-sm font-black ${mov.qty.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>{mov.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <History className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 font-bold">Nessun movimento trovato</p>
            </div>
          )}
        </div>
        <p className="text-xs text-slate-400 font-bold mt-4">{filtered.length} di {ALL_MOVEMENTS.length} movimenti</p>
      </div>
    </div>
  );
};
