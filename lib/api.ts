import axios from 'axios';
import { 
  PredictRequest, 
  PredictResponse, 
  City, 
  ProductGroup, 
  BusinessType, 
  HeatmapData, 
  HistoricalPoint 
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Add request interceptor
api.interceptors.request.use(async (config) => {
  const { auth } = await import('./firebase');
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const predictDemand = (data: PredictRequest) => 
  api.post<PredictResponse>('/api/predict', data);

export const getCities = () => 
  api.get<City[]>('/api/cities');

export const getProducts = () => 
  api.get<ProductGroup[]>('/api/products');

export const getBusinessTypes = () => 
  api.get<BusinessType[]>('/api/business-types');

export const getHeatmapData = (city?: string, product?: string) => {
  const params = new URLSearchParams();
  if (city) params.append('city', city);
  if (product) params.append('product', product);
  return api.get<HeatmapData>(`/api/explore/heatmap${params.toString() ? `?${params.toString()}` : ''}`);
};

export const getHistory = (city: string, product: string) => 
  api.get<HistoricalPoint[]>(`/api/history/${encodeURIComponent(city)}/${encodeURIComponent(product)}`);

export default api;
