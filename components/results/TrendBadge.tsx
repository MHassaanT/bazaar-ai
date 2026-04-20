"use client";

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../ui/Button';

interface TrendBadgeProps {
  trend: string;
}

const TrendBadge = ({ trend }: TrendBadgeProps) => {
  const isRising = trend.toLowerCase().includes('rising');
  const isDeclining = trend.toLowerCase().includes('declining');
  
  const Icon = isRising ? TrendingUp : isDeclining ? TrendingDown : Minus;
  
  return (
    <div className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold tracking-tight",
      isRising ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
      isDeclining ? "bg-red-500/10 text-red-400 border-red-500/20" :
      "bg-blue-500/10 text-blue-400 border-blue-500/20"
    )}>
      <Icon size={16} />
      <span className="uppercase tracking-widest text-[10px]">{trend}</span>
    </div>
  );
};

export default TrendBadge;
