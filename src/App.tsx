import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import QualityTable from './components/QualityTable';
import DetailTable from './components/DetailTable';
import QualityCharts from './components/QualityCharts';
import { CarData, QualityAnalysis } from './types';

function App() {
  const [data, setData] = useState<CarData[]>([]);
  const [selectedQuality, setSelectedQuality] = useState<string | null>(null);
  const [qualityAnalysis, setQualityAnalysis] = useState<QualityAnalysis[]>([]);

  useEffect(() => {
    fetch('/Calidad de publicaciones - Anuncios Honda Darsan.csv')
      .then(response => response.text())
      .then(csvText => {
        const results = Papa.parse<CarData>(csvText, {
          header: true,
          skipEmptyLines: true,
        });
        setData(results.data);
        calculateQualityAnalysis(results.data);
      });
  }, []);

  const calculateQualityAnalysis = (carData: CarData[]) => {
    const qualityCategories = ['MUY BIEN', 'BIEN', 'REGULAR', 'MALA', 'MUY MALA'];
    const qualityLossPercentages: { [key: string]: number } = {
      'MUY BIEN': 0,
      'BIEN': 2.5,
      'REGULAR': 5,
      'MALA': 7.5,
      'MUY MALA': 10,
    };

    const analysis = qualityCategories.map(quality => {
      const items = carData.filter(item => item.CALIDAD === quality);
      const totalValue = items.reduce((sum, item) => sum + (Number(item.Precio) || 0), 0);
      const lossPercentage = qualityLossPercentages[quality];
      const estimatedLoss = (totalValue * lossPercentage) / 100;

      return {
        quality,
        count: items.length,
        totalValue,
        lossPercentage,
        estimatedLoss,
        items,
      };
    });

    setQualityAnalysis(analysis);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Análisis de Pérdidas por Calidad</h1>
        
        <div className="mb-8">
          <QualityCharts analysis={qualityAnalysis} />
        </div>

        <QualityTable 
          analysis={qualityAnalysis}
          onSelectQuality={setSelectedQuality}
          selectedQuality={selectedQuality}
        />

        {selectedQuality && (
          <div className="mt-8">
            <DetailTable 
              items={qualityAnalysis.find(a => a.quality === selectedQuality)?.items || []}
              quality={selectedQuality}
              lossPercentage={qualityAnalysis.find(a => a.quality === selectedQuality)?.lossPercentage || 0}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;