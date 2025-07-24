import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MonthlyChart = ({ data }) => {
  const mesesPT = {
    'January': 'Janeiro',
    'February': 'Fevereiro',
    'March': 'Março',
    'April': 'Abril',
    'May': 'Maio',
    'June': 'Junho',
    'July': 'Julho',
    'August': 'Agosto',
    'September': 'Setembro',
    'October': 'Outubro',
    'November': 'Novembro',
    'December': 'Dezembro'
  };

  const chartData = {
    labels: data.map(m => mesesPT[m.Mês_Nome]),
    datasets: [
      {
        label: 'Atendimentos',
        data: data.map(m => m.Quantidade),
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#3498db',
        pointBorderColor: '#fff',
        pointBorderWidth: 1,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

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
        borderColor: '#3498db',
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
          color: '#555'
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  // Plugin customizado para exibir valores nos pontos
  const drawValuesPlugin = {
    id: 'drawValues',
    afterDatasetsDraw: (chart) => {
      const { ctx } = chart;
      chart.getDatasetMeta(0).data.forEach((point, i) => {
        const value = chartData.datasets[0].data[i];
        ctx.save();
        ctx.font = 'bold 12px sans-serif';
        ctx.fillStyle = '#3498db';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(
          value.toLocaleString('pt-BR'),
          point.x,
          point.y - 8
        );
        ctx.restore();
      });
    }
  };

  return <Line data={chartData} options={options} plugins={[drawValuesPlugin]} />;
};

export default MonthlyChart;

