import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const location = useLocation();
  const { searchTerm, setSearchTerm } = useSearch();
  
  const getPageTitle = (path: string) => {
    switch (path) {
      case '/': return 'Dashboard Principale';
      case '/inventario': return 'Gestione Inventario';
      case '/movimenti': return 'Storico Movimenti';
      case '/ordini': return 'Gestione Ordini';
      case '/fornitori': return 'Anagrafica Fornitori';
      case '/spedizioni': return 'Logistica e Spedizioni';
      case '/report': return 'Analisi e Report';
      case '/impostazioni': return 'Impostazioni Sistema';
      default: return 'Stockify';
    }
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 py-4 flex justify-between items-center z-10 sticky top-0 shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-slate-100 rounded-lg md:hidden text-slate-700 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          {getPageTitle(location.pathname)}
        </h1>
      </div>

      <div className="flex items-center space-x-3 md:space-x-6">
        <div className="relative hidden lg:block">
          <input 
            type="text" 
            placeholder="Cerca in Stockify..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-50 text-sm rounded-xl px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:bg-white border border-slate-200 focus:border-brand-500 w-72 transition-all placeholder:text-slate-500 text-slate-700"
          />
          <Search className="absolute left-3.5 top-3 text-slate-500 w-4 h-4" />
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="p-2.5 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all relative group border border-transparent hover:border-brand-100">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-brand-danger rounded-full border-2 border-white"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-2 md:pl-6 border-l border-slate-200">
            <div className="relative group cursor-pointer">
              <img 
                src="https://ui-avatars.com/api/?name=Mario+Rossi&background=3b82f6&color=fff" 
                alt="User" 
                className="w-10 h-10 rounded-xl shadow-lg ring-2 ring-slate-100 group-hover:ring-brand-500/30 transition-all object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-success border-2 border-slate-50 rounded-full shadow-sm"></div>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-black text-slate-800 leading-tight">Mario Rossi</p>
              <p className="text-[11px] font-bold text-brand-600 uppercase tracking-wider">Amministratore</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-500 hidden sm:block" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
