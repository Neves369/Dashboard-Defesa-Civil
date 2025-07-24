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

const OccurrenceChart = ({ data }) => {
  const cores = ['#3498db', '#2ecc71', '#f1c40f', '#e74c3c', '#9b59b6'];
  
  // Pegar apenas os 5 primeiros para melhor visualização
  const labels = Object.keys(data).slice(0, 5);
  const values = Object.values(data).slice(0, 5);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Ocorrências',
        data: values,
        backgroundColor: cores.slice(0, labels.length),
        borderRadius: 5,
        borderSkipped: false,
        hoverBackgroundColor: cores.slice(0, labels.length).map(color => color + 'CC')
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
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
            return `Ocorrências: ${context.parsed.x.toLocaleString('pt-BR')}`;
          }
        }
      }
    },
    scales: {
      x: {
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
      y: {
        grid: {
          display: false
        },
        ticks: {
          color: '#555',
          callback: function(value, index) {
            const label = this.getLabelForValue(value);
            return label.length > 20 ? label.substring(0, 17) + '...' : label;
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default OccurrenceChart;

