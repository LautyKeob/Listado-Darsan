import React from 'react';
import { QualityAnalysis } from '../types';

interface Props {
  analysis: QualityAnalysis[];
  onSelectQuality: (quality: string) => void;
  selectedQuality: string | null;
}

const QualityTable: React.FC<Props> = ({ analysis, onSelectQuality, selectedQuality }) => {
  const totalCount = analysis.reduce((sum, item) => sum + item.count, 0);
  const totalValue = analysis.reduce((sum, item) => sum + item.totalValue, 0);
  const totalLoss = analysis.reduce((sum, item) => sum + item.estimatedLoss, 0);

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'MUY BIEN': return 'bg-green-100 hover:bg-green-200';
      case 'BIEN': return 'bg-lime-100 hover:bg-lime-200';
      case 'REGULAR': return 'bg-yellow-100 hover:bg-yellow-200';
      case 'MALA': return 'bg-orange-100 hover:bg-orange-200';
      case 'MUY MALA': return 'bg-red-100 hover:bg-red-200';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calidad</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Pérdida</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pérdida Estimada</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {analysis.map((item) => (
            <tr 
              key={item.quality}
              className={`${getQualityColor(item.quality)} cursor-pointer ${selectedQuality === item.quality ? 'ring-2 ring-indigo-500' : ''}`}
              onClick={() => onSelectQuality(item.quality)}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.quality}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.count}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€{Math.round(item.totalValue)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lossPercentage}%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€{Math.round(item.estimatedLoss)}</td>
            </tr>
          ))}
          <tr className="bg-gray-50 font-semibold">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">TOTAL</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{totalCount}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€{Math.round(totalValue)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">-</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€{Math.round(totalLoss)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default QualityTable;