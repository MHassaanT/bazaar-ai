"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePredictionStore } from '@/lib/store';
import { getHistory, predictDemand } from '@/lib/api';
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

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { 
    predictionResult, selectedCity, selectedProduct, 
    setPredictionResult, setFormField, setLoading, isLoading 
  } = usePredictionStore();
  const [history, setHistory] = useState<HistoricalPoint[]>([]);
  const [isUrlFetching, setIsUrlFetching] = useState(false);

  useEffect(() => {
    const fetchFromUrl = async () => {
      const city = searchParams.get('city');
      const product = searchParams.get('product');
      const category = searchParams.get('category');
      const type = searchParams.get('type');
      const month = searchParams.get('month');
      const year = searchParams.get('year');

      if (!predictionResult && city && product) {
        setIsUrlFetching(true);
        try {
          // Sync store with URL params for consistency
          setFormField('selectedCity', city);
          setFormField('selectedProduct', product);
          setFormField('selectedCategory', category);
          setFormField('selectedBusinessType', type);
          setFormField('targetMonth', parseInt(month || '4'));
          setFormField('targetYear', parseInt(year || '2024'));

          const res = await predictDemand({
            city,
            product,
            category: category || 'General',
            business_type: type || 'Retail',
            target_month: parseInt(month || '4'),
            target_year: parseInt(year || '2024'),
            include_historical: true
          });
          setPredictionResult(res.data);
        } catch (err) {
          toast.error("Could not load prediction from shared link.");
          router.push('/predict');
        } finally {
          setIsUrlFetching(false);
        }
      } else if (!predictionResult && !city) {
        // No result and no URL params, redirect back
        router.push('/predict');
      }
    };

    fetchFromUrl();
  }, [predictionResult, searchParams, setPredictionResult, setFormField, router]);

  useEffect(() => {
    if (predictionResult && predictionResult.city && predictionResult.product) {
      getHistory(predictionResult.city, predictionResult.product)
        .then(res => setHistory(res.data))
        .catch(() => toast.error("Could not load historical trend data."));
    }
  }, [predictionResult]);

  const handleShare = async () => {
    if (!predictionResult) return;

    const shareData = {
      title: 'BazaarAI Market Analysis',
      text: `Market analysis for ${predictionResult.product} in ${predictionResult.city}: ${predictionResult.demand_label} demand, ${predictionResult.price_risk_label} price risk.`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          toast.error('Could not share. Link copied to clipboard instead.');
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handleExportPDF = () => {
    window.print();
  };

  if (isUrlFetching || isLoading) {
    return (
      <div className="pt-32 pb-20 px-6 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-gray-400 font-medium animate-pulse">Analyzing Market Patterns...</p>
        </div>
      </div>
    );
  }

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
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-2 no-print">
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

          <div className="flex gap-3 no-print">
             <Button variant="secondary" size="sm" onClick={handleShare}>
               <Share2 size={16} className="mr-2" /> Share
             </Button>
             <Button variant="secondary" size="sm" onClick={handleExportPDF}>
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

        <div className="flex justify-center pt-10 no-print">
          <Button variant="outline" size="lg" onClick={() => router.push('/explore')}>
            Compare with other cities →
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="pt-32 pb-20 px-6 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        </div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
