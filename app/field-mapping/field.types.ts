export interface Coordinate {
  lat: number;
  lng: number;
}

export interface FieldData {
  id: string;
  name: string;
  boundary: Coordinate[];
  area: number; // in acres
  perimeter: number; // in meters
  status: 'draft' | 'saved';
  lastAnalysis?: AnalysisResult;
}

export interface AnalysisResult {
  healthIndex: number; // 0-100
  moisture: 'Low' | 'Medium' | 'High';
  ndvi: number; // 0-1
  riskLevel: 'Low' | 'Moderate' | 'High';
  timestamp: string;
}
