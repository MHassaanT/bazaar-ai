"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface PriceRiskGaugeProps {
  score: number;
  label: string;
}

const PriceRiskGauge = ({ score, label }: PriceRiskGaugeProps) => {
  const data = [
    { value: score },
    { value: 100 - score },
  ];

  const getColor = (s: number) => {
    if (s > 75) return '#ef4444'; // Red
    if (s > 45) return '#f59e0b'; // Amber
    return '#10b981'; // Emerald
  };

  const getVariant = (l: string) => {
    if (l.includes('High')) return 'red';
    if (l.includes('Medium')) return 'amber';
    return 'emerald';
  };

  return (
    <Card className="p-8 flex flex-col items-center justify-center relative bg-[#0d1526]">
      <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Market Price Risk</span>
      
      <div className="w-full h-48 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="80%"
              startAngle={180}
              endAngle={0}
              innerRadius={65}
              outerRadius={85}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={getColor(score)} />
              <Cell fill="rgba(255,255,255,0.05)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
          <span className="text-4xl font-heading font-extrabold text-white">{score.toFixed(0)}%</span>
        </div>
      </div>

      <Badge variant={getVariant(label) as any} className="mt-2">
        {label}
      </Badge>
    </Card>
  );
};

export default PriceRiskGauge;
