import React, { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { TrendingUp, MapPin, Phone, Calendar } from 'lucide-react';

const StatsCards = ({ data }) => {
  const [animatedValues, setAnimatedValues] = useState({
    total: 0,
    bairros: 0,
    pico: 0,
    emergenciais: 0
  });

  useEffect(() => {
    if (!data) return;

    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;

    const targets = {
      total: data.total_registros,
      bairros: data.bairros_atendidos,
      pico: Math.max(...data.por_mes.map(m => m.Quantidade)),
      emergenciais: data.por_origem['Protocolo 199 Emergencial'] || 0
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedValues({
        total: Math.floor(targets.total * easeOut),
        bairros: Math.floor(targets.bairros * easeOut),
        pico: Math.floor(targets.pico * easeOut),
        emergenciais: Math.floor(targets.emergenciais * easeOut)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedValues(targets);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [data]);

  if (!data) return null;

  const picoMes = data.por_mes.reduce((max, mes) => 
    mes.Quantidade > max.Quantidade ? mes : max
  );

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

  const stats = [
    {
      title: 'Total de Atendimentos',
      value: animatedValues.total.toLocaleString('pt-BR'),
      icon: TrendingUp,
      color: 'bg-blue-500',
      highlight: true
    },
    {
      title: 'Bairros Atendidos',
      value: animatedValues.bairros.toLocaleString('pt-BR'),
      icon: MapPin,
      color: 'bg-green-500'
    },
    {
      title: `Pico em ${mesesPT[picoMes.Mês_Nome]}`,
      value: animatedValues.pico.toLocaleString('pt-BR'),
      icon: Calendar,
      color: 'bg-yellow-500'
    },
    {
      title: 'Chamadas 199',
      value: animatedValues.emergenciais.toLocaleString('pt-BR'),
      icon: Phone,
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={index} 
            className={`stat-card ${stat.highlight ? 'bg-blue-500 text-white' : 'bg-white'} border-0 shadow-lg`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${stat.highlight ? 'text-blue-100' : 'text-gray-600'} uppercase tracking-wide`}>
                    {stat.title}
                  </p>
                  <p className={`text-3xl font-bold mt-2 animate-counter ${stat.highlight ? 'text-white' : 'text-gray-600'}`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.highlight ? 'bg-blue-400' : stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;

