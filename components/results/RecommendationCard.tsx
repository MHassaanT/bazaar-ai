"use client";

import React from 'react';
import { Card } from '../ui/Card';
import { CheckCircle2, AlertTriangle, Info, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../ui/Button';

interface RecommendationCardProps {
  recommendation: string;
  detail: string;
  score: number;
}

const RecommendationCard = ({ recommendation, detail, score }: RecommendationCardProps) => {
  const isHigh = score > 6.5;
  const isLow = score < 3.5;
  
  const Icon = isHigh ? CheckCircle2 : isLow ? TrendingDown : Info;
  
  return (
    <Card className={cn(
      "p-8 h-full flex flex-col justify-center border-l-4",
      isHigh ? "border-l-emerald-500 bg-emerald-500/5" : 
      isLow ? "border-l-red-500 bg-red-500/5" : 
      "border-l-blue-500 bg-blue-500/5"
    )}>
      <div className="flex items-start gap-4">
        <div className={cn(
          "p-3 rounded-2xl",
          isHigh ? "bg-emerald-500/10 text-emerald-500" : 
          isLow ? "bg-red-500/10 text-red-500" : 
          "bg-blue-500/10 text-blue-500"
        )}>
          <Icon size={32} />
        </div>
        <div className="space-y-2">
          <span className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">AI Strategic Recommendation</span>
          <h3 className={cn(
            "text-2xl font-heading font-bold",
            isHigh ? "text-emerald-400" : isLow ? "text-red-400" : "text-blue-400"
          )}>
            {recommendation}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            {detail}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default RecommendationCard;
