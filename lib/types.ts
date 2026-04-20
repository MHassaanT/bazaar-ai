/**
 * Bazaar AI — TypeScript Type Definitions
 */

export interface City {
  name: string;
  province: string;
  population_m: number;
  lat: number;
  lon: number;
}

export interface Product {
  name: string;
  category: string;
  unit: string;
}

export interface ProductGroup {
  category: string;
  products: Product[];
}

export interface BusinessType {
  name: string;
  icon: string;
}

export interface HistoricalPoint {
  year: number;
  month: number;
  demand_level: number;
  price_pkr: number;
  demand_label?: string;
}

export interface PredictRequest {
  city: string;
  product: string;
  category: string;
  business_type: string;
  target_month: number;
  target_year: number;
  include_historical?: boolean;
}

export interface PredictResponse {
  city: string;
  product: string;
  predicted_demand_level: number;
  demand_label: string;
  demand_trend: string;
  price_pkr: number;
  price_risk_score: number;
  price_risk_label: string;
  recommendation: string;
  recommendation_detail: string;
  confidence: number;
  is_ramadan_period: boolean;
  is_festive_period: boolean;
  historical_data: HistoricalPoint[];
  insights: string[];
  model_used: string;
  season: string;
}

export interface HeatmapCell {
  city: string;
  product: string;
  demand_level: number;
  demand_label: string;
}

export interface HeatmapData {
  cities: string[];
  products: string[];
  data: HeatmapCell[];
}
