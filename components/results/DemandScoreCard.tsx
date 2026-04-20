"use client";

import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { DEMAND_COLORS } from '@/lib/constants';

interface DemandScoreCardProps {
  score: number;
  label: string;
}

const DemandScoreCard = ({ score, label }: DemandScoreCardProps) => {
  const scoreColors: any = {
    'Extreme': 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]',
    'Very High': 'text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]',
    'High': 'text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]',
    'Medium': 'text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]',
    'Low': 'text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]',
    'Very Low': 'text-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]',
  };

  const colorClass = scoreColors[label] || 'text-white';
  const badgeVariant = (label === 'Extreme' || label === 'Very High' || label === 'High') ? 'red' : 
                   (label === 'Medium') ? 'blue' : 'emerald';

  return (
    <Card className="flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#162035] to-[#0d1526]">
      <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Predicted Demand Score</span>
      
      <div className={`text-7xl font-heading font-black mb-2 ${colorClass}`}>
        {score.toFixed(1)}
      </div>
      
      <div className="text-gray-500 text-sm mb-6">out of 10.0</div>
      
      <Badge variant={badgeVariant as any} className="text-sm px-6 py-1.5 h-auto">
        {label} Demand
      </Badge>
    </Card>
  );
};

export default DemandScoreCard;
