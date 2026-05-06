import { useState } from 'react';
import { Settings, User, Bell, Shield, Database, Globe, ChevronRight, ChevronDown, Save, X } from 'lucide-react';

interface SectionState {
  open: boolean;
}

export const Impostazioni = () => {
  const [sections, setSections] = useState<Record<string, SectionState>>({});
  const [saved, setSaved] = useState<string | null>(null);

  // Stato dei form
  const [profilo, setProfilo] = useState({ nome: 'Mario Rossi', email: 'mario.rossi@stockify.it', ruolo: 'Amministratore', tel: '+39 02 1234567' });
  const [notifiche, setNotifiche] = useState({ email: true, push: false, soglia: '20', frequenza: 'giornaliero' });
  const [localizzazione, setLocalizzazione] = useState({ lingua: 'it', valuta: 'EUR', timezone: 'Europe/Rome' });

  const toggle = (id: string) => setSections(prev => ({ ...prev, [id]: { open: !prev[id]?.open } }));
  const isOpen = (id: string) => !!sections[id]?.open;

  const handleSave = (section: string) => {
    setSaved(section);
    setTimeout(() => setSaved(null), 2000);
  };

  const settingsSections = [
    {
      id: 'profilo', title: 'Profilo Utente', desc: 'Gestisci informazioni personali e password', icon: User,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="p-nome" className="block text-xs font-black text-slate-500 uppercase mb-2">Nome Completo</label>
              <input id="p-nome" value={profilo.nome} onChange={e => setProfilo({ ...profilo, nome: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm" />
            </div>
            <div>
              <label htmlFor="p-ruolo" className="block text-xs font-black text-slate-500 uppercase mb-2">Ruolo</label>
              <select id="p-ruolo" value={profilo.ruolo} onChange={e => setProfilo({ ...profilo, ruolo: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm appearance-none">
                <option>Amministratore</option><option>Magazziniere</option><option>Responsabile</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="p-email" className="block text-xs font-black text-slate-500 uppercase mb-2">Email</label>
            <input id="p-email" type="email" value={profilo.email} onChange={e => setProfilo({ ...profilo, email: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm" />
          </div>
          <div>
            <label htmlFor="p-tel" className="block text-xs font-black text-slate-500 uppercase mb-2">Telefono</label>
            <input id="p-tel" type="tel" value={profilo.tel} onChange={e => setProfilo({ ...profilo, tel: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm" />
          </div>
          <div>
            <label htmlFor="p-pwd" className="block text-xs font-black text-slate-500 uppercase mb-2">Nuova Password</label>
            <input id="p-pwd" type="password"
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm" placeholder="Lascia vuoto per non modificare" />
          </div>
        </div>
      ),
    },
    {
      id: 'notifiche', title: 'Notifiche', desc: 'Scegli come e quando ricevere gli avvisi di scorta', icon: Bell,
      content: (
        <div className="space-y-4">
          {[
            { id: 'n-email', label: 'Notifiche via Email', desc: 'Ricevi avvisi scorta via email', checked: notifiche.email, onChange: (v: boolean) => setNotifiche({ ...notifiche, email: v }) },
            { id: 'n-push', label: 'Notifiche Push', desc: 'Notifiche nel browser', checked: notifiche.push, onChange: (v: boolean) => setNotifiche({ ...notifiche, push: v }) },
          ].map(item => (
            <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="text-sm font-black text-slate-700">{item.label}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
              <button onClick={() => item.onChange(!item.checked)}
                className={`w-12 h-6 rounded-full transition-colors relative ${item.checked ? 'bg-brand-500' : 'bg-slate-300'}`}>
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${item.checked ? 'translate-x-6' : 'translate-x-0.5'}`}></span>
              </button>
            </div>
          ))}
          <div>
            <label htmlFor="n-soglia" className="block text-xs font-black text-slate-500 uppercase mb-2">Soglia Scorta Minima</label>
            <input id="n-soglia" type="number" value={notifiche.soglia} onChange={e => setNotifiche({ ...notifiche, soglia: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm" />
          </div>
          <div>
            <label htmlFor="n-freq" className="block text-xs font-black text-slate-500 uppercase mb-2">Frequenza Report</label>
            <select id="n-freq" value={notifiche.frequenza} onChange={e => setNotifiche({ ...notifiche, frequenza: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm appearance-none">
              <option value="giornaliero">Giornaliero</option><option value="settimanale">Settimanale</option><option value="mensile">Mensile</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      id: 'sicurezza', title: 'Sicurezza', desc: 'Configura accesso a due fattori e permessi', icon: Shield,
      content: (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-sm font-black text-amber-700">Autenticazione a 2 fattori non attiva</p>
            <p className="text-xs text-amber-600 mt-0.5">Attivala per proteggere il tuo account</p>
          </div>
          <button onClick={() => alert('Configurazione 2FA in arrivo!')} className="w-full py-3 rounded-xl border-2 border-dashed border-brand-300 text-brand-600 font-black text-sm hover:bg-brand-50 transition-colors">
            + Attiva Autenticazione 2FA
          </button>
          <div>
            <label htmlFor="s-session" className="block text-xs font-black text-slate-500 uppercase mb-2">Durata Sessione</label>
            <select id="s-session" className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm appearance-none">
              <option>8 ore</option><option>24 ore</option><option>7 giorni</option><option>30 giorni</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      id: 'dati', title: 'Dati e Backup', desc: 'Esporta i tuoi dati o gestisci importazione automatica', icon: Database,
      content: (
        <div className="space-y-3">
          {[
            { label: 'Esporta Inventario (CSV)', action: () => alert('Inventario esportato!') },
            { label: 'Esporta Movimenti (CSV)', action: () => alert('Movimenti esportati!') },
            { label: 'Esporta Ordini (CSV)', action: () => alert('Ordini esportati!') },
            { label: 'Backup completo (JSON)', action: () => alert('Backup scaricato!') },
          ].map(item => (
            <button key={item.label} onClick={item.action}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-brand-50 border border-slate-100 hover:border-brand-200 transition-all text-left group">
              <span className="text-sm font-bold text-slate-700 group-hover:text-brand-700">{item.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-500" />
            </button>
          ))}
        </div>
      ),
    },
    {
      id: 'localizzazione', title: 'Localizzazione', desc: 'Imposta lingua, valuta e fuso orario', icon: Globe,
      content: (
        <div className="space-y-4">
          <div>
            <label htmlFor="l-lingua" className="block text-xs font-black text-slate-500 uppercase mb-2">Lingua</label>
            <select id="l-lingua" value={localizzazione.lingua} onChange={e => setLocalizzazione({ ...localizzazione, lingua: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm appearance-none">
              <option value="it">Italiano</option><option value="en">English</option><option value="fr">Français</option>
            </select>
          </div>
          <div>
            <label htmlFor="l-valuta" className="block text-xs font-black text-slate-500 uppercase mb-2">Valuta</label>
            <select id="l-valuta" value={localizzazione.valuta} onChange={e => setLocalizzazione({ ...localizzazione, valuta: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm appearance-none">
              <option>EUR</option><option>USD</option><option>GBP</option>
            </select>
          </div>
          <div>
            <label htmlFor="l-tz" className="block text-xs font-black text-slate-500 uppercase mb-2">Fuso Orario</label>
            <select id="l-tz" value={localizzazione.timezone} onChange={e => setLocalizzazione({ ...localizzazione, timezone: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm appearance-none">
              <option>Europe/Rome</option><option>Europe/London</option><option>America/New_York</option>
            </select>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4 max-w-3xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="w-6 h-6 text-brand-500" />Impostazioni Sistema
        </h2>
      </div>

      <div className="space-y-3">
        {settingsSections.map((section) => (
          <div key={section.id} className="bg-white rounded-[1.5rem] shadow-soft border border-slate-100 overflow-hidden">
            <button onClick={() => toggle(section.id)}
              className="w-full flex items-center justify-between p-6 hover:bg-slate-50/50 transition-colors text-left group">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl transition-colors ${isOpen(section.id) ? 'bg-brand-100 text-brand-600' : 'bg-slate-100 text-slate-500 group-hover:bg-brand-50 group-hover:text-brand-600'}`}>
                  <section.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-800">{section.title}</h3>
                  <p className="text-sm text-slate-500">{section.desc}</p>
                </div>
              </div>
              {isOpen(section.id) ? <ChevronDown className="w-5 h-5 text-brand-500" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
            </button>

            {isOpen(section.id) && (
              <div className="px-6 pb-6 border-t border-slate-100">
                <div className="pt-5">
                  {section.content}
                  {section.id !== 'dati' && (
                    <div className="flex gap-3 mt-6">
                      <button onClick={() => handleSave(section.id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm transition-all ${saved === section.id ? 'bg-emerald-500 text-white' : 'bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-200'}`}>
                        {saved === section.id ? <><X className="w-4 h-4" />Salvato!</> : <><Save className="w-4 h-4" />Salva modifiche</>}
                      </button>
                      <button onClick={() => toggle(section.id)} className="px-5 py-2.5 rounded-xl font-black text-sm border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                        Annulla
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
