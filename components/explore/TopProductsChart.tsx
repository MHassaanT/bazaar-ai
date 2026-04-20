"use client";

import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { Card } from '../ui/Card';

const TopProductsChart = ({ city }: { city?: string }) => {
  const displayCity = city || "All Regions";
  const data = [
    { name: 'Wheat Flour', value: 9.4 },
    { name: 'Sugar', value: 8.8 },
    { name: 'Fresh Milk', value: 8.5 },
    { name: 'Chicken', value: 8.1 },
    { name: 'Cooking Oil', value: 7.9 },
    { name: 'Potatoes', value: 7.5 },
    { name: 'Onions', value: 7.2 },
    { name: 'Basmati Rice', value: 6.8 },
  ];

  return (
    <Card className="p-8 h-[400px] bg-[#0d1526]">
       <div className="mb-8">
        <h3 className="text-xl font-heading font-bold text-white">High Demand Staples</h3>
        <p className="text-sm text-gray-500">Top trending commodities for selected region</p>
      </div>

      <div className="w-full h-full pb-14">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            layout="vertical"
            margin={{ top: 0, right: 30, left: 40, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={false} />
            <XAxis 
              type="number"
              domain={[0, 10]}
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#4b5563', fontSize: 10 }}
            />
            <YAxis 
              type="category"
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#fff', fontSize: 11, fontWeight: 'medium' }}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.02)' }}
              contentStyle={{ backgroundColor: '#162035', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={2000}>
               {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#barGradient)`} />
              ))}
            </Bar>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity={1} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TopProductsChart;
