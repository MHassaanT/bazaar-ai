import { create } from 'zustand';
import { PredictResponse } from './types';

interface PredictionState {
  // Form values
  selectedCity: string | null;
  selectedProduct: string | null;
  selectedCategory: string | null;
  selectedBusinessType: string | null;
  targetMonth: number;
  targetYear: number;

  // Global app state
  predictionResult: PredictResponse | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setFormField: (field: string, value: any) => void;
  setPredictionResult: (result: PredictResponse | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetForm: () => void;
}

export const usePredictionStore = create<PredictionState>((set) => ({
  selectedCity: null,
  selectedProduct: null,
  selectedCategory: null,
  selectedBusinessType: null,
  targetMonth: new Date().getMonth() + 1,
  targetYear: 2024,

  predictionResult: null,
  isLoading: false,
  error: null,

  setFormField: (field, value) => set((state) => ({ ...state, [field]: value })),
  setPredictionResult: (result) => set({ predictionResult: result }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error: error }),
  resetForm: () => set({
    selectedCity: null,
    selectedProduct: null,
    selectedCategory: null,
    selectedBusinessType: null,
    predictionResult: null,
    error: null
  }),
}));
