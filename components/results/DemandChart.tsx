"use client";

import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, ReferenceLine, AreaChart, Area 
} from 'recharts';
import { Card } from '../ui/Card';
import { MONTHS } from '@/lib/constants';

interface DemandChartProps {
  history: any[];
  prediction: {
    month: number;
    year: number;
    score: number;
  };
}

const DemandChart = ({ history, prediction }: DemandChartProps) => {
  // Combine history and prediction for a single trend line
  const data = [
    ...history.map(p => ({
      name: MONTHS.find(m => m.value === p.month)?.label.substring(0, 3),
      demand: p.demand_level,
      type: 'historical'
    })),
    {
      name: MONTHS.find(m => m.value === prediction.month)?.label.substring(0, 3) + ' (P)',
      demand: prediction.score,
      type: 'predicted'
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#162035] border border-white/10 p-3 rounded-xl shadow-2xl">
          <p className="text-xs text-gray-400 mb-1">{label}</p>
          <p className="text-lg font-bold text-white">
            Score: <span className={payload[0].payload.type === 'predicted' ? "text-blue-400" : "text-white"}>
              {payload[0].value.toFixed(1)}
            </span>
          </p>
          <p className="text-[10px] uppercase font-bold text-gray-500">
            {payload[0].payload.type === 'predicted' ? "Machine Learning Output" : "Historical Data Record"}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-8 h-[400px] bg-[#0d1526]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-lg font-heading font-bold text-white">Demand Forecast Trend</h3>
          <p className="text-xs text-gray-500">Comparison of historical patterns vs. AI prediction</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white/20 rounded-full" />
            <span className="text-[10px] text-gray-500 uppercase font-bold">Historical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-[10px] text-gray-500 uppercase font-bold">Predicted</span>
          </div>
        </div>
      </div>

      <div className="w-full h-full pb-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#4b5563', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              domain={[0, 10]} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#4b5563', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="demand" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorDemand)" 
              animationDuration={2000}
            />
            {data.length >= 2 && (
              <ReferenceLine 
                x={data[data.length-2].name} 
                stroke="#4b5563" 
                strokeDasharray="5 5" 
                label={{ position: 'top', value: 'Prediction', fill: '#4b5563', fontSize: 10, fontWeight: 'bold' }} 
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default DemandChart;
