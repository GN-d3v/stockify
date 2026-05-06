import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Package, ShoppingCart, Download } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, Filler);

const MONTHS = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
const VENDITE = [4200, 5100, 3800, 6200, 7100, 5900, 8200, 6700, 9100, 7800, 10200, 12450];
const ORDINI = [32, 41, 29, 51, 58, 47, 63, 55, 74, 61, 88, 128];

export const Report = () => {
  const stats = [
    { label: 'Totale Vendite', value: '12.450,00€', icon: DollarSign, trend: '+12%', color: 'text-emerald-600', bg: 'bg-emerald-50', positive: true },
    { label: 'Articoli Movimentati', value: '4.520', icon: Package, trend: '+5%', color: 'text-brand-600', bg: 'bg-brand-50', positive: true },
    { label: 'Ordini Completati', value: '128', icon: ShoppingCart, trend: '-2%', color: 'text-orange-600', bg: 'bg-orange-50', positive: false },
  ];

  const chartData = {
    labels: MONTHS,
    datasets: [
      {
        label: 'Vendite (€)',
        data: VENDITE,
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: '#3b82f6',
        borderRadius: 8,
        borderWidth: 0,
        yAxisID: 'y',
      },
      {
        label: 'Ordini',
        data: ORDINI,
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: '#10b981',
        borderRadius: 8,
        borderWidth: 0,
        yAxisID: 'y1',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index' as const, intersect: false },
    plugins: {
      legend: { position: 'top' as const, labels: { font: { size: 12, weight: 'bold' as const }, usePointStyle: true, pointStyleWidth: 8 } },
      tooltip: { backgroundColor: '#1e293b', padding: 12, cornerRadius: 12, titleFont: { size: 13, weight: 'bold' as const }, bodyFont: { size: 12 } },
    },
    scales: {
      y: { type: 'linear' as const, display: true, position: 'left' as const, grid: { color: '#f1f5f9' }, ticks: { callback: (v: number | string) => `€${Number(v).toLocaleString('it-IT')}`, font: { size: 11 } } },
      y1: { type: 'linear' as const, display: true, position: 'right' as const, grid: { drawOnChartArea: false }, ticks: { font: { size: 11 } } },
      x: { grid: { display: false }, ticks: { font: { size: 11, weight: 'bold' as const } } },
    },
  };

  const topItems = [
    { name: 'Pellicola Estensibile', vendite: '3.240€', qty: 648, pct: 85 },
    { name: 'Scatole Cartone 40x40', vendite: '2.100€', qty: 4200, pct: 70 },
    { name: 'Etichette Termiche', vendite: '1.875€', qty: 37500, pct: 58 },
    { name: 'Nastro Imballaggio', vendite: '960€', qty: 800, pct: 42 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-brand-500" />Report e Analisi
        </h2>
        <button onClick={() => alert('Report esportato in formato CSV!')}
          className="bg-brand-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-brand-600 transition-colors font-bold shadow-lg shadow-brand-200">
          <Download className="w-4 h-4" />Esporta CSV
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[1.5rem] shadow-soft border border-slate-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-black flex items-center gap-1 px-2.5 py-1 rounded-lg ${stat.positive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                {stat.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.trend}
              </span>
            </div>
            <p className="text-sm text-slate-500 font-bold mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Grafico mensile */}
      <div className="bg-white p-6 md:p-8 rounded-[1.5rem] shadow-soft border border-slate-100">
        <h3 className="text-lg font-black text-slate-800 mb-6">Andamento Mensile 2024</h3>
        <div className="h-72">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Top articoli */}
      <div className="bg-white p-6 md:p-8 rounded-[1.5rem] shadow-soft border border-slate-100">
        <h3 className="text-lg font-black text-slate-800 mb-6">Top Articoli per Vendite</h3>
        <div className="space-y-5">
          {topItems.map((item, i) => (
            <div key={item.name}>
              <div className="flex justify-between items-baseline mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-brand-100 text-brand-600 text-[10px] font-black flex items-center justify-center">#{i + 1}</span>
                  <span className="text-sm font-black text-slate-800">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-slate-800">{item.vendite}</span>
                  <span className="text-xs text-slate-400 font-bold ml-2">({item.qty} pz)</span>
                </div>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-500 rounded-full transition-all duration-700" style={{ width: `${item.pct}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
