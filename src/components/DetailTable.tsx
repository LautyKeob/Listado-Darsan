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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Base</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pérdida Estimada</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio con Pérdida</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item, index) => {
              const price = Number(item.Precio) || 0;
              const loss = Math.round(price * lossPercentage / 100);
              const finalPrice = price - loss;

              return (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€{Math.round(price)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€{loss}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€{Math.round(finalPrice)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                    <a href={item.LINK} target="_blank" rel="noopener noreferrer">Ver anuncio</a>
                  </td>
                </tr>
              );
            })}
            <tr className="bg-gray-50 font-semibold">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€{Math.round(totalValue)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€{Math.round(totalLoss)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€{Math.round(totalValue - totalLoss)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetailTable;