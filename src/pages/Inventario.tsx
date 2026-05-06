import { useState, useMemo } from 'react';
import { Search, Filter, Plus, Package, X, ChevronDown } from 'lucide-react';
import Modal from '../components/Modal';

const ALL_ITEMS = [
  { sku: 'SKU-001', name: 'Scatole Cartone 40x40', category: 'Imballaggio', stock: 45, unit: 'pz', price: '0.50€', status: 'In Esaurimento' },
  { sku: 'SKU-002', name: 'Nastro Imballaggio', category: 'Cancelleria', stock: 12, unit: 'rotoli', price: '1.20€', status: 'Critico' },
  { sku: 'SKU-003', name: 'Pellicola Estensibile', category: 'Imballaggio', stock: 150, unit: 'rotoli', price: '5.00€', status: 'Disponibile' },
  { sku: 'SKU-004', name: "Buste Bolle d'aria", category: 'Imballaggio', stock: 28, unit: 'pz', price: '0.15€', status: 'In Esaurimento' },
  { sku: 'SKU-005', name: 'Etichette Termiche', category: 'Cancelleria', stock: 500, unit: 'pz', price: '0.05€', status: 'Disponibile' },
  { sku: 'SKU-006', name: 'Sacchi Polietilene', category: 'Imballaggio', stock: 0, unit: 'pz', price: '0.08€', status: 'Esaurito' },
  { sku: 'SKU-007', name: 'Marker Permanente', category: 'Cancelleria', stock: 80, unit: 'pz', price: '1.50€', status: 'Disponibile' },
];

export const Inventario = () => {
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterCat, setFilterCat] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ nome: '', sku: '', categoria: 'Imballaggio', qty: '', unit: 'pz', prezzo: '' });

  const filtered = useMemo(() => ALL_ITEMS.filter(i => {
    const q = search.toLowerCase();
    const matchSearch = i.sku.toLowerCase().includes(q) || i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q);
    const matchCat = !filterCat || i.category === filterCat;
    const matchStatus = !filterStatus || i.status === filterStatus;
    return matchSearch && matchCat && matchStatus;
  }), [search, filterCat, filterStatus]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Disponibile': return <span className="px-2.5 py-1 text-xs font-bold bg-emerald-100 text-emerald-700 rounded-full">Disponibile</span>;
      case 'In Esaurimento': return <span className="px-2.5 py-1 text-xs font-bold bg-amber-100 text-amber-700 rounded-full">In Esaurimento</span>;
      case 'Critico': return <span className="px-2.5 py-1 text-xs font-bold bg-red-100 text-red-700 rounded-full">Critico</span>;
      case 'Esaurito': return <span className="px-2.5 py-1 text-xs font-bold bg-slate-100 text-slate-600 rounded-full">Esaurito</span>;
      default: return null;
    }
  };

  const activeFilters = [filterCat, filterStatus].filter(Boolean).length;

  return (
    <div className="space-y-6">
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Nuovo Articolo">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="inv-nome" className="block text-xs font-black text-slate-500 uppercase mb-2">Nome Articolo</label>
              <input id="inv-nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm" placeholder="Es. Scatole 30x20" />
            </div>
            <div>
              <label htmlFor="inv-sku" className="block text-xs font-black text-slate-500 uppercase mb-2">SKU</label>
              <input id="inv-sku" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm" placeholder="Es. SKU-008" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="inv-cat" className="block text-xs font-black text-slate-500 uppercase mb-2">Categoria</label>
              <select id="inv-cat" value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm appearance-none">
                <option>Imballaggio</option><option>Cancelleria</option><option>Servizi</option><option>Altro</option>
              </select>
            </div>
            <div>
              <label htmlFor="inv-unit" className="block text-xs font-black text-slate-500 uppercase mb-2">Unità</label>
              <select id="inv-unit" value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm appearance-none">
                <option>pz</option><option>rotoli</option><option>kg</option><option>lt</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="inv-qty" className="block text-xs font-black text-slate-500 uppercase mb-2">Quantità Iniziale</label>
              <input id="inv-qty" type="number" value={form.qty} onChange={e => setForm({ ...form, qty: e.target.value })} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm" placeholder="0" />
            </div>
            <div>
              <label htmlFor="inv-prezzo" className="block text-xs font-black text-slate-500 uppercase mb-2">Prezzo Unitario</label>
              <input id="inv-prezzo" value={form.prezzo} onChange={e => setForm({ ...form, prezzo: e.target.value })} className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm" placeholder="0.00€" />
            </div>
          </div>
          <button onClick={() => { alert(`Articolo "${form.nome || 'Nuovo'}" aggiunto!`); setModalOpen(false); setForm({ nome: '', sku: '', categoria: 'Imballaggio', qty: '', unit: 'pz', prezzo: '' }); }}
            className="w-full py-4 rounded-2xl bg-brand-500 text-white font-black shadow-lg shadow-brand-200 hover:bg-brand-600 transition-colors mt-2">
            Aggiungi Articolo
          </button>
        </div>
      </Modal>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Package className="w-6 h-6 text-brand-500" />Gestione Inventario
        </h2>
        <button onClick={() => setModalOpen(true)} className="bg-brand-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-brand-600 transition-colors font-bold shadow-lg shadow-brand-200">
          <Plus className="w-5 h-5" />Nuovo Articolo
        </button>
      </div>

      <div className="bg-white p-6 rounded-[1.5rem] shadow-soft border border-slate-100">
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Cerca per SKU o Nome..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm transition-all" />
            <Search className="absolute left-3 top-2.5 text-slate-400 w-5 h-5" />
            {search && <button onClick={() => setSearch('')} className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>}
          </div>
          <div className="relative">
            <button onClick={() => setFilterOpen(!filterOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl hover:bg-slate-50 transition-colors font-bold text-sm ${activeFilters > 0 ? 'border-brand-500 text-brand-600 bg-brand-50' : 'border-slate-200 text-slate-600'}`}>
              <Filter className="w-4 h-4" />Filtri
              {activeFilters > 0 && <span className="w-5 h-5 bg-brand-500 text-white rounded-full text-[10px] flex items-center justify-center font-black">{activeFilters}</span>}
              <ChevronDown className={`w-4 h-4 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
            </button>
            {filterOpen && (
              <div className="absolute right-0 top-12 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-10 w-64 space-y-4">
                <div>
                  <label htmlFor="f-cat" className="block text-xs font-black text-slate-500 uppercase mb-2">Categoria</label>
                  <select id="f-cat" value={filterCat} onChange={e => setFilterCat(e.target.value)} className="w-full p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm appearance-none">
                    <option value="">Tutte</option><option>Imballaggio</option><option>Cancelleria</option><option>Servizi</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="f-status" className="block text-xs font-black text-slate-500 uppercase mb-2">Stato</label>
                  <select id="f-status" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="w-full p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm appearance-none">
                    <option value="">Tutti</option><option>Disponibile</option><option>In Esaurimento</option><option>Critico</option><option>Esaurito</option>
                  </select>
                </div>
                <button onClick={() => { setFilterCat(''); setFilterStatus(''); setFilterOpen(false); }} className="w-full py-2 text-sm font-bold text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Azzera filtri</button>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="text-left border-b border-slate-100 bg-slate-50/50">
              <tr>
                <th className="pb-3 pt-2 px-2 text-[10px] font-black text-slate-500 uppercase tracking-wider">SKU</th>
                <th className="pb-3 pt-2 px-2 text-[10px] font-black text-slate-500 uppercase tracking-wider">Nome Articolo</th>
                <th className="pb-3 pt-2 px-2 text-[10px] font-black text-slate-500 uppercase tracking-wider">Categoria</th>
                <th className="pb-3 pt-2 px-2 text-[10px] font-black text-slate-500 uppercase tracking-wider">Giacenza</th>
                <th className="pb-3 pt-2 px-2 text-[10px] font-black text-slate-500 uppercase tracking-wider">Prezzo Unit.</th>
                <th className="pb-3 pt-2 px-2 text-[10px] font-black text-slate-500 uppercase tracking-wider text-right">Stato</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.sku} className="hover:bg-slate-50/80 transition-colors cursor-pointer">
                  <td className="py-4 px-2 text-sm font-bold text-brand-600">{item.sku}</td>
                  <td className="py-4 px-2 text-sm font-bold text-slate-800">{item.name}</td>
                  <td className="py-4 px-2 text-sm text-slate-500">{item.category}</td>
                  <td className="py-4 px-2 text-sm font-black text-slate-800">{item.stock} <span className="text-slate-400 font-normal">{item.unit}</span></td>
                  <td className="py-4 px-2 text-sm text-slate-600">{item.price}</td>
                  <td className="py-4 px-2 text-right">{getStatusBadge(item.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Package className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 font-bold">Nessun articolo trovato</p>
            </div>
          )}
        </div>
        <p className="text-xs text-slate-400 font-bold mt-4">{filtered.length} di {ALL_ITEMS.length} articoli</p>
      </div>
    </div>
  );
};
