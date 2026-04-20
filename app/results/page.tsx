"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { usePredictionStore } from '@/lib/store';
import { getHistory } from '@/lib/api';
import { HistoricalPoint } from '@/lib/types';
import DemandScoreCard from '@/components/results/DemandScoreCard';
import PriceRiskGauge from '@/components/results/PriceRiskGauge';
import RecommendationCard from '@/components/results/RecommendationCard';
import DemandChart from '@/components/results/DemandChart';
import InsightsPanel from '@/components/results/InsightsPanel';
import TrendBadge from '@/components/results/TrendBadge';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Share2, Download } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ResultsPage() {
  const router = useRouter();
  const { predictionResult, selectedCity, selectedProduct } = usePredictionStore();
  const [history, setHistory] = useState<HistoricalPoint[]>([]);

  useEffect(() => {
    if (!predictionResult) {
      router.push('/predict');
      return;
    }

    if (selectedCity && selectedProduct) {
      getHistory(selectedCity, selectedProduct)
        .then(res => setHistory(res.data))
        .catch(() => toast.error("Could not load historical trend data."));
    }
  }, [predictionResult, selectedCity, selectedProduct, router]);

  if (!predictionResult) return null;

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Strip */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
              <button 
                onClick={() => router.push('/predict')}
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <ArrowLeft size={16} /> Edit Prediction
              </button>
              <span>/</span>
              <span className="text-blue-500">{predictionResult.city}</span>
              <span>/</span>
              <span className="text-white">{predictionResult.product}</span>
            </div>
            <div className="flex items-center gap-4">
              <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white">
                Market Analysis Result
              </h1>
              <TrendBadge trend={predictionResult.demand_trend} />
            </div>
          </div>

          <div className="flex gap-3">
             <Button variant="secondary" size="sm">
               <Share2 size={16} className="mr-2" /> Share
             </Button>
             <Button variant="secondary" size="sm">
               <Download size={16} className="mr-2" /> PDF Report
             </Button>
          </div>
        </motion.div>

        {/* Section 1 - Score Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <DemandScoreCard 
            score={predictionResult.predicted_demand_level} 
            label={predictionResult.demand_label} 
          />
          <PriceRiskGauge 
            score={predictionResult.price_risk_score} 
            label={predictionResult.price_risk_label} 
          />
          <RecommendationCard 
            recommendation={predictionResult.recommendation} 
            detail={predictionResult.recommendation_detail}
            score={predictionResult.predicted_demand_level}
          />
        </motion.div>

        {/* Section 2 - Chart */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
        >
          <DemandChart 
            history={history} 
            prediction={{
              month: predictionResult.is_ramadan_period ? 3 : 5, // Simplified logic
              year: 2024,
              score: predictionResult.predicted_demand_level
            }} 
          />
        </motion.div>

        {/* Section 3 - Insights */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
        >
          <InsightsPanel insights={predictionResult.insights} />
        </motion.div>

        <div className="flex justify-center pt-10">
          <Button variant="outline" size="lg" onClick={() => router.push('/explore')}>
            Compare with other cities →
          </Button>
        </div>
      </div>
    </div>
  );
}
