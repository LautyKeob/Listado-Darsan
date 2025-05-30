import React from 'react';
import { CarData } from '../types';

interface Props {
  items: CarData[];
  quality: string;
  lossPercentage: number;
}

const DetailTable: React.FC<Props> = ({ items, quality, lossPercentage }) => {
  const totalValue = items.reduce((sum, item) => sum + (Number(item.Precio) || 0), 0);
  const totalLoss = (totalValue * lossPercentage) / 100;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <h2 className="px-6 py-4 text-xl font-semibold text-gray-900">
        Detalle de Items - Calidad: {quality}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Base</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Pérdida</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pérdida Estimada</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio con Pérdida</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Explicación</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item, index) => {
              const price = Number(item.Precio) || 0;
              const loss = (price * lossPercentage) / 100;
              const finalPrice = price - loss;

              return (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.MODELO || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€{price.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lossPercentage}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€{loss.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€{finalPrice.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.EXPLICACION || '-'}</td>
                </tr>
              );
            })}
            <tr className="bg-gray-50 font-semibold">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">TOTAL</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€{totalValue.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">-</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€{totalLoss.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€{(totalValue - totalLoss).toLocaleString('es-ES', { minimumFractionDigits: 2 })}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetailTable;