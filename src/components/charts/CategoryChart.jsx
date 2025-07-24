import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChart = ({ data }) => {
  const cores = [
    '#3498db', '#2ecc71', '#f1c40f', '#e74c3c', '#9b59b6', 
    '#1abc9c', '#f39c12', '#d35400', '#c0392b', '#8e44ad',
    '#27ae60', '#2980b9'
  ];

  // Pegar apenas os 6 primeiros para melhor visualização
  const categories = Object.keys(data).slice(0, 6);
  const values = Object.values(data).slice(0, 6);

  const chartData = {
    labels: categories,
    datasets: [
      {
        data: values,
        backgroundColor: cores.slice(0, categories.length),
        borderWidth: 1,
        borderColor: '#fff',
        hoverBorderWidth: 2,
        hoverBorderColor: '#fff'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          color: '#555',
          font: {
            size: 11
          },
          generateLabels: function(chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                return {
                  text: `${label}`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].borderColor,
                  lineWidth: data.datasets[0].borderWidth,
                  pointStyle: 'circle',
                  hidden: false,
                  index: i
                };
              });
            }
            return [];
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#3498db',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed.toLocaleString('pt-BR')} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '50%'
  };

  return <Doughnut data={chartData} options={options} />;
};

export default CategoryChart;

