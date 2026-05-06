import { 
  LayoutDashboard, 
  Package, 
  ArrowLeftRight, 
  ShoppingCart, 
  Users, 
  Truck, 
  BarChart3, 
  Settings,
  Box,
  X
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Package, label: 'Inventario', path: '/inventario' },
    { icon: ArrowLeftRight, label: 'Movimenti', path: '/movimenti' },
    { icon: ShoppingCart, label: 'Ordini', path: '/ordini' },
    { icon: Users, label: 'Fornitori', path: '/fornitori' },
    { icon: Truck, label: 'Spedizioni', path: '/spedizioni' },
    { icon: BarChart3, label: 'Report', path: '/report' },
  ];

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-30 w-72 bg-[#0f172a] text-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out transform
    md:relative md:translate-x-0 md:shadow-none
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  `;

  return (
    <aside className={sidebarClasses}>
      <div className="p-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="bg-brand-600 p-2 rounded-xl shadow-lg shadow-brand-600/20">
            <Box className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter">STOCKIFY</span>
        </div>
        <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white transition-colors p-1">
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1.5 mt-8 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => { if(window.innerWidth < 768) onClose(); }}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3.5 rounded-xl font-bold transition-all duration-200 ${
                isActive 
                  ? 'bg-brand-600 text-white shadow-xl shadow-brand-600/30' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 bg-[#1e293b]/30">
        <NavLink
          to="/impostazioni"
          onClick={() => { if(window.innerWidth < 768) onClose(); }}
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-3.5 rounded-xl font-bold transition-all duration-200 ${
              isActive 
                ? 'bg-brand-600 text-white shadow-lg' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`
          }
        >
          <Settings className="w-5 h-5" />
          <span>Impostazioni</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
