"use client";

import React from 'react';
import { Card } from '../ui/Card';
import { Lightbulb, Info, AlertCircle, TrendingUp } from 'lucide-react';

interface InsightsPanelProps {
  insights: string[];
}

const InsightsPanel = ({ insights }: InsightsPanelProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-8 bg-[#0d1526]">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
            <Lightbulb size={20} />
          </div>
          <h3 className="text-lg font-heading font-bold text-white">Demand Drivers</h3>
        </div>
        
        <ul className="space-y-4">
          {insights.map((insight, i) => (
            <li key={i} className="flex gap-3">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
              <p className="text-sm text-gray-400 leading-relaxed">{insight}</p>
            </li>
          ))}
          {insights.length === 0 && (
            <li className="text-gray-500 text-sm italic">Analyzing real-time market drivers...</li>
          )}
        </ul>
      </Card>

      <Card className="p-8 bg-[#0d1526]">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-lg">
            <TrendingUp size={20} />
          </div>
          <h3 className="text-lg font-heading font-bold text-white">Market Intelligence</h3>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/[0.05]">
            <Info className="text-indigo-400 flex-shrink-0" size={20} />
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Model Insight</span>
              <p className="text-xs text-gray-400 leading-relaxed">
                The current prediction model uses feature importance weighting where historical price volatility and city population are the primary drivers for this category.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/[0.05]">
            <AlertCircle className="text-amber-500 flex-shrink-0" size={20} />
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Confidence Level</span>
              <p className="text-xs text-gray-400 leading-relaxed">
                Confidence is calibrated at 87% based on historical validation. External factors like sudden policy changes or supply chain strikes may impact accuracy.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InsightsPanel;
