import React from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer, CartesianGrid } from 'recharts';
import { QualityAnalysis } from '../types';

interface Props {
  analysis: QualityAnalysis[];
}

const COLORS = {
  'MUY BIEN': '#22c55e',
  'BIEN': '#84cc16',
  'REGULAR': '#eab308',
  'MALA': '#f97316',
  'MUY MALA': '#ef4444',
};

const QualityCharts: React.FC<Props> = ({ analysis }) => {
  const pieData = analysis.map(item => ({
    name: item.quality,
    value: item.count
  }));

  const barData = analysis.map(item => ({
    name: item.quality,
    'Pérdida Estimada': item.estimatedLoss
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Distribución por Calidad</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={(entry) => `${entry.name}: ${entry.value}`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Pérdidas por Calidad</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `€${Number(value).toLocaleString('es-ES', { minimumFractionDigits: 2 })}`} />
            <Bar dataKey="Pérdida Estimada">
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default QualityCharts;