"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain } from 'lucide-react';
import PredictForm from '@/components/predict/PredictForm';
import { Card } from '@/components/ui/Card';

export default function PredictPage() {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left - Hero & Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white leading-tight">
              Run a <span className="text-blue-500">Demand Prediction</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              Fill in the market parameters below. Our machine learning engine will process 
              historical trends and seasonal patterns to deliver a precision demand forecast.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-6 bg-white/[0.02]">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
                <Brain size={20} />
              </div>
              <h4 className="text-white font-bold mb-1">Random Forest ML</h4>
              <p className="text-gray-500 text-xs">Proprietary regressor trained on 300K data points.</p>
            </Card>
            <Card className="p-6 bg-white/[0.02]">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-4">
                <Sparkles size={20} />
              </div>
              <h4 className="text-white font-bold mb-1">Seasonal Logic</h4>
              <p className="text-gray-500 text-xs">Factors in Ramadan and regional festive surges.</p>
            </Card>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/10">
            <h5 className="text-blue-400 font-bold mb-2 uppercase tracking-widest text-[10px]">Upcoming Events</h5>
            <p className="text-sm text-gray-300 italic">
              &quot;The current economic cycle suggests a high sensitivity to petroleum price adjustments in the Punjab region.&quot;
            </p>
          </div>
        </motion.div>

        {/* Right - Form Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 md:p-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
             <PredictForm />
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
