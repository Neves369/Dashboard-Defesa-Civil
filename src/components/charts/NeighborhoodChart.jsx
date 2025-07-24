import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const NeighborhoodChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Atendimentos',
        data: Object.values(data),
        backgroundColor: '#3498db',
        borderRadius: 5,
        borderSkipped: false,
        hoverBackgroundColor: '#2d82bbff'
      }
    ]
  };

  // Calcula o valor máximo dos dados
  const maxValue = Math.max(...Object.values(data));

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#2ecc71',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return `Atendimentos: ${context.parsed.y.toLocaleString('pt-BR')}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: maxValue + 21,
        grid: {
          color: 'rgba(0,0,0,0.08)'
        },
        ticks: {
          color: '#555',
          callback: function(value) {
            return value.toLocaleString('pt-BR');
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#555',
          maxRotation: 45,
          minRotation: 0
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  // Plugin customizado para exibir valores acima das barras
  const drawValuesPlugin = {
    id: 'drawValues',
    afterDatasetsDraw: (chart) => {
      const { ctx } = chart;
      chart.getDatasetMeta(0).data.forEach((bar, i) => {
        const value = chartData.datasets[0].data[i];
        ctx.save();
        ctx.font = 'bold 12px sans-serif';
        ctx.fillStyle = '#0073c0ff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(
          value.toLocaleString('pt-BR'),
          bar.x,
          bar.y - 6
        );
        ctx.restore();
      });
    }
  };

  return <Bar data={chartData} options={options} plugins={[drawValuesPlugin]} />;
};

export default NeighborhoodChart;

