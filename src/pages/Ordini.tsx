import { useState, useMemo } from 'react';
import { Search, ShoppingCart, Truck, CheckCircle, Clock, X, ChevronDown } from 'lucide-react';

const ALL_ORDERS = [
  { id: 'ORD-5521', customer: 'Amazon Logistics', date: '24/05/2024', total: '1.250,00€', status: 'In Elaborazione', items: 12 },
  { id: 'ORD-5520', customer: 'Ebay Seller X', date: '24/05/2024', total: '450,00€', status: 'Spedito', items: 4 },
  { id: 'ORD-5519', customer: 'Local Shop Milano', date: '23/05/2024', total: '890,00€', status: 'Consegnato', items: 7 },
  { id: 'ORD-5518', customer: 'Vinted User 12', date: '23/05/2024', total: '25,00€', status: 'In Elaborazione', items: 1 },
  { id: 'ORD-5517', customer: 'Tech Store Roma', date: '22/05/2024', total: '3.400,00€', status: 'Annullato', items: 28 },
  { id: 'ORD-5516', customer: 'Warehouse Direct', date: '21/05/2024', total: '780,00€', status: 'Consegnato', items: 6 },
  { id: 'ORD-5515', customer: 'Fast Delivery srl', date: '20/05/2024', total: '1.120,00€', status: 'Spedito', items: 9 },
];

export const Ordini = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filtered = useMemo(() => ALL_ORDERS.filter(o => {
    const q = search.toLowerCase();
    const matchSearch = o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q);
    const matchStatus = !filterStatus || o.status === filterStatus;
    return matchSearch && matchStatus;
  }), [search, filterStatus]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Elaborazione': return <span className="px-2.5 py-1 text-[10px] font-black bg-blue-100 text-blue-700 rounded-lg flex items-center gap-1 w-fit"><Clock className="w-3 h-3" />In Elaborazione</span>;
      case 'Spedito': return <span className="px-2.5 py-1 text-[10px] font-black bg-orange-100 text-orange-700 rounded-lg flex items-center gap-1 w-fit"><Truck className="w-3 h-3" />Spedito</span>;
      case 'Consegnato': return <span className="px-2.5 py-1 text-[10px] font-black bg-emerald-100 text-emerald-700 rounded-lg flex items-center gap-1 w-fit"><CheckCircle className="w-3 h-3" />Consegnato</span>;
      case 'Annullato': return <span className="px-2.5 py-1 text-[10px] font-black bg-red-100 text-red-700 rounded-lg w-fit">Annullato</span>;
      default: return null;
    }
  };

  const statuses = ['In Elaborazione', 'Spedito', 'Consegnato', 'Annullato'];
  const statusCounts = useMemo(() => Object.fromEntries(statuses.map(s => [s, ALL_ORDERS.filter(o => o.status === s).length])), []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-brand-500" />Ordini Clienti
        </h2>
      </div>

      {/* Filtri rapidi per stato */}
      <div className="flex flex-wrap gap-3">
        <button onClick={() => setFilterStatus('')}
          className={`px-4 py-2 rounded-xl text-sm font-black transition-all ${!filterStatus ? 'bg-brand-500 text-white shadow-md shadow-brand-200' : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-300'}`}>
          Tutti ({ALL_ORDERS.length})
        </button>
        {statuses.map(s => (
          <button key={s} onClick={() => setFilterStatus(filterStatus === s ? '' : s)}
            className={`px-4 py-2 rounded-xl text-sm font-black transition-all ${filterStatus === s ? 'bg-brand-500 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-300'}`}>
            {s} ({statusCounts[s] || 0})
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-[1.5rem] shadow-soft border border-slate-100">
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Cerca per ID o Cliente..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm transition-all" />
            <Search className="absolute left-3 top-2.5 text-slate-400 w-5 h-5" />
            {search && <button onClick={() => setSearch('')} className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>}
          </div>
          <div className="relative">
            <button onClick={() => setFilterOpen(!filterOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl font-bold text-sm transition-colors ${filterStatus ? 'border-brand-500 text-brand-600 bg-brand-50' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              <ChevronDown className={`w-4 h-4 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
              Stato
            </button>
            {filterOpen && (
              <div className="absolute right-0 top-12 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-10 w-52 space-y-1">
                {['', ...statuses].map(s => (
                  <button key={s} onClick={() => { setFilterStatus(s); setFilterOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-colors ${filterStatus === s ? 'bg-brand-500 text-white' : 'hover:bg-slate-50 text-slate-700'}`}>
                    {s || 'Tutti gli stati'}
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
                <th className="pb-3 pt-2 px-2 text-[10px] font-black text-slate-500 uppercase tracking-wider">ID Ordine</th>
                <th className="pb-3 pt-2 px-2 text-[10px] font-black text-slate-500 uppercase tracking-wider">Cliente</th>
                <th className="pb-3 pt-2 px-2 text-[10px] font-black text-slate-500 uppercase tracking-wider">Data</th>
                <th className="pb-3 pt-2 px-2 text-[10px] font-black text-slate-500 uppercase tracking-wider">Articoli</th>
                <th className="pb-3 pt-2 px-2 text-[10px] font-black text-slate-500 uppercase tracking-wider">Totale</th>
                <th className="pb-3 pt-2 px-2 text-[10px] font-black text-slate-500 uppercase tracking-wider text-right">Stato</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((order) => (
                <tr key={order.id} onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                  className={`transition-colors cursor-pointer ${selectedOrder === order.id ? 'bg-brand-50' : 'hover:bg-slate-50/80'}`}>
                  <td className="py-4 px-2 text-sm font-black text-brand-600">#{order.id}</td>
                  <td className="py-4 px-2 text-sm font-bold text-slate-800">{order.customer}</td>
                  <td className="py-4 px-2 text-sm text-slate-500">{order.date}</td>
                  <td className="py-4 px-2 text-sm font-bold text-slate-600">{order.items} art.</td>
                  <td className="py-4 px-2 text-sm font-black text-slate-800">{order.total}</td>
                  <td className="py-4 px-2 text-right flex justify-end">{getStatusBadge(order.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <ShoppingCart className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 font-bold">Nessun ordine trovato</p>
            </div>
          )}
        </div>
        <p className="text-xs text-slate-400 font-bold mt-4">{filtered.length} di {ALL_ORDERS.length} ordini</p>
      </div>
    </div>
  );
};
