export interface CarData {
  MARCA: string;
  MODELO: string;
  IMAGENES: string;
  Precio: string;
  LINK: string;
  CALIDAD: string;
  'PRECIO CON PERDIDA': string;
  PERDIDA: string;
  Revisor: string;
  'Re-revisor': string;
  'Review Quality OK?': string;
  EXPLICACION: string;
}

export interface QualityAnalysis {
  quality: string;
  count: number;
  totalValue: number;
  lossPercentage: number;
  estimatedLoss: number;
  items: CarData[];
}