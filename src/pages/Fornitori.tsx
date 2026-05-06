import { useState, useMemo } from 'react';
import { Search, Plus, Users, Mail, Phone, X } from 'lucide-react';
import Modal from '../components/Modal';

const ALL_SUPPLIERS = [
  { id: 'SUP-001', name: 'Packaging Pro srl', contact: 'Mario Verdi', email: 'mario@packagingpro.it', phone: '+39 02 1234567', category: 'Imballaggio', active: true },
  { id: 'SUP-002', name: 'Office Depot', contact: 'Anna Neri', email: 'anna@officedepot.it', phone: '+39 06 7654321', category: 'Cancelleria', active: true },
  { id: 'SUP-003', name: 'Logistics Solutions', contact: 'Luca Bianchi', email: 'l.bianchi@logsolutions.com', phone: '+39 011 9876543', category: 'Servizi', active: true },
  { id: 'SUP-004', name: 'EcoBox Italia', contact: 'Sara Romano', email: 's.romano@ecobox.it', phone: '+39 051 3456789', category: 'Imballaggio', active: false },
];

export const Fornitori = () => {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', contact: '', email: '', phone: '', category: 'Imballaggio' });

  const filtered = useMemo(() => ALL_SUPPLIERS.filter(s => {
    const q = search.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.contact.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.category.toLowerCase().includes(q);
  }), [search]);

  return (
    <div className="space-y-6">
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Nuovo Fornitore">
        <div className="space-y-4">
          <div>
            <label htmlFor="sup-name" className="block text-xs font-black text-slate-500 uppercase mb-2">Nome Azienda</label>
            <input id="sup-name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm" placeholder="Es. Fornitore srl" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="sup-contact" className="block text-xs font-black text-slate-500 uppercase mb-2">Referente</label>
              <input id="sup-contact" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm" placeholder="Nome Cognome" />
            </div>
            <div>
              <label htmlFor="sup-cat" className="block text-xs font-black text-slate-500 uppercase mb-2">Categoria</label>
              <select id="sup-cat" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm appearance-none">
                <option>Imballaggio</option><option>Cancelleria</option><option>Servizi</option><option>Altro</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="sup-email" className="block text-xs font-black text-slate-500 uppercase mb-2">Email</label>
            <input id="sup-email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm" placeholder="email@azienda.it" />
          </div>
          <div>
            <label htmlFor="sup-phone" className="block text-xs font-black text-slate-500 uppercase mb-2">Telefono</label>
            <input id="sup-phone" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm" placeholder="+39 02 1234567" />
          </div>
          <button onClick={() => { alert(`Fornitore "${form.name || 'Nuovo'}" aggiunto!`); setModalOpen(false); setForm({ name: '', contact: '', email: '', phone: '', category: 'Imballaggio' }); }}
            className="w-full py-4 rounded-2xl bg-brand-500 text-white font-black shadow-lg shadow-brand-200 hover:bg-brand-600 transition-colors mt-2">
            Salva Fornitore
          </button>
        </div>
      </Modal>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Users className="w-6 h-6 text-brand-500" />Anagrafica Fornitori
        </h2>
        <button onClick={() => setModalOpen(true)} className="bg-brand-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-brand-600 transition-colors font-bold shadow-lg shadow-brand-200">
          <Plus className="w-5 h-5" />Nuovo Fornitore
        </button>
      </div>

      <div className="bg-white p-6 rounded-[1.5rem] shadow-soft border border-slate-100">
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Cerca fornitore..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm transition-all" />
            <Search className="absolute left-3 top-2.5 text-slate-400 w-5 h-5" />
            {search && <button onClick={() => setSearch('')} className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((sup) => (
            <div key={sup.id} className="p-5 rounded-2xl border border-slate-100 hover:border-brand-200 hover:shadow-md transition-all cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-black text-slate-800 group-hover:text-brand-600 transition-colors">{sup.name}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{sup.id} · {sup.category}</p>
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-black rounded-full ${sup.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                  {sup.active ? 'Attivo' : 'Inattivo'}
                </span>
              </div>
              <p className="text-sm font-bold text-slate-600 mb-3">{sup.contact}</p>
              <div className="space-y-1.5">
                <a href={`mailto:${sup.email}`} onClick={e => e.stopPropagation()}
                  className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 font-bold">
                  <Mail className="w-3.5 h-3.5" />{sup.email}
                </a>
                <a href={`tel:${sup.phone}`} onClick={e => e.stopPropagation()}
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-bold">
                  <Phone className="w-3.5 h-3.5" />{sup.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Users className="w-10 h-10 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400 font-bold">Nessun fornitore trovato</p>
          </div>
        )}
        <p className="text-xs text-slate-400 font-bold mt-4">{filtered.length} di {ALL_SUPPLIERS.length} fornitori</p>
      </div>
    </div>
  );
};
