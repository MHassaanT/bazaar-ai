"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Store, ShoppingCart, Warehouse, Box, Apple, Milk, 
  Sprout, Pill, Cake, Search, ArrowRight 
} from 'lucide-react';
import { BusinessType } from '@/lib/types';
import { getBusinessTypes, predictDemand } from '@/lib/api';
import { usePredictionStore } from '@/lib/store';
import { Button, cn } from '../ui/Button';
import { Card } from '../ui/Card';
import CitySelector from './CitySelector';
import ProductSelector from './ProductSelector';
import DateRangePicker from './DateRangePicker';
import toast from 'react-hot-toast';

const ICON_MAP: any = {
  Store, ShoppingCart, Warehouse, Box, Apple, Milk, Sprout, Pill, Cake
};

const PredictForm = () => {
  const [businessTypes, setBusinessTypes] = useState<BusinessType[]>([]);
  const router = useRouter();
  
  const { 
    selectedCity, selectedProduct, selectedCategory, 
    selectedBusinessType, targetMonth, targetYear,
    setFormField, setLoading, setPredictionResult, setError, isLoading
  } = usePredictionStore();

  useEffect(() => {
    getBusinessTypes().then(res => setBusinessTypes(res.data));
  }, []);

  const handlePredict = async () => {
    if (!selectedCity || !selectedProduct || !selectedBusinessType) {
      toast.error("Please fill all fields before predicting.");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await predictDemand({
        city: selectedCity,
        product: selectedProduct!,
        category: selectedCategory!,
        business_type: selectedBusinessType,
        target_month: targetMonth,
        target_year: targetYear,
        include_historical: true
      });
      
      setPredictionResult(response.data);
      
      const query = new URLSearchParams({
        city: selectedCity,
        product: selectedProduct!,
        category: selectedCategory!,
        type: selectedBusinessType,
        month: targetMonth.toString(),
        year: targetYear.toString()
      }).toString();
      
      router.push(`/results?${query}`);
    } catch (err: any) {
      const msg = err.response?.data?.detail || "Failed to run prediction. Please ensure the backend is running and the model is trained.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <CitySelector />
        <ProductSelector />
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-400 ml-1">Business Type</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {businessTypes.map(type => {
            const Icon = ICON_MAP[type.icon] || Store;
            const isSelected = selectedBusinessType === type.name;
            
            return (
              <button
                key={type.name}
                onClick={() => setFormField('selectedBusinessType', type.name)}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-200 gap-2 text-center group",
                  isSelected 
                    ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]" 
                    : "bg-[#162035] border-white/[0.08] text-gray-400 hover:border-white/20 hover:text-white"
                )}
              >
                <Icon size={24} className={cn(isSelected ? "text-white" : "text-blue-500 group-hover:scale-110 transition-transform")} />
                <span className="text-xs font-medium">{type.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <DateRangePicker />

      <Button 
        size="lg" 
        className="w-full h-16 text-lg" 
        onClick={handlePredict}
        isLoading={isLoading}
      >
        Predict Market Demand <ArrowRight size={20} className="ml-2" />
      </Button>

      <p className="text-[10px] text-center text-gray-600 uppercase tracking-[0.2em]">
        Model: Random Forest Regressor • Confidence: ~87%
      </p>
    </div>
  );
};

export default PredictForm;
