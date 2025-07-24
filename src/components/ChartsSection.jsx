import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import MonthlyChart from './charts/MonthlyChart';
import CategoryChart from './charts/CategoryChart';
import AreaChart from './charts/AreaChart';
import NeighborhoodChart from './charts/NeighborhoodChart';
import OriginChart from './charts/OriginChart';
import OccurrenceChart from './charts/OccurrenceChart';

const ChartsSection = ({ data, year }) => {
  if (!data) return null;

  return (
    <div className="space-y-8">
      {/* Gráfico Mensal */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-600 text-center border-b pb-3">
            Atendimentos por Mês {year === '2025' ? '(Jan-Jun 2025)' : ''}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="chart-container">
            <MonthlyChart data={data.por_mes} />
          </div>
        </CardContent>
      </Card>

      {/* Gráficos em Grid 2x2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-600 text-center border-b pb-3">
              Por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="chart-container small">
              <CategoryChart data={data.por_categoria} />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-600 text-center border-b pb-3">
              Por Área
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="chart-container small">
              <AreaChart data={data.por_area} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Bairros */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-600 text-center border-b pb-3">
            Top 10 Bairros com Mais Atendimentos
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="chart-container">
            <NeighborhoodChart data={data.por_bairro} />
          </div>
        </CardContent>
      </Card>

      {/* Gráficos em Grid 2x2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-600 text-center border-b pb-3">
              Por Origem
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="chart-container small">
              <OriginChart data={data.por_origem} />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-600 text-center border-b pb-3">
              Tipos de Ocorrência
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="chart-container small">
              <OccurrenceChart data={data.por_ocorrencia} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChartsSection;

