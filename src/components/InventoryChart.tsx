import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const InventoryChart = () => {
  const data = {
    labels: ['Disponibili', 'Scorta bassa', 'Esauriti'],
    datasets: [
      {
        data: [3450, 2415, 414],
        backgroundColor: [
          '#10b981', // emerald-500
          '#3b82f6', // brand-500
          '#ef4444', // brand-danger
        ],
        hoverBackgroundColor: [
          '#059669',
          '#2563eb',
          '#dc2626',
        ],
        borderWidth: 0,
        borderRadius: 10,
        spacing: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1e293b',
        padding: 12,
        titleFont: { size: 14, weight: 'bold' as const },
        bodyFont: { size: 13 },
        cornerRadius: 12,
        displayColors: true,
      }
    },
    cutout: '85%',
  };

  return (
    <div className="w-full h-full">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default InventoryChart;
