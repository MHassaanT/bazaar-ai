"use client";

import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, Cell 
} from 'recharts';
import { Card } from '../ui/Card';

const CityCompareChart = ({ product }: { product?: string }) => {
  const displayProduct = product || "All Products";
  // Demo data for comparison
  const data = [
    { name: 'Karachi', demand: 8.5, price: 420 },
    { name: 'Lahore', demand: 7.8, price: 410 },
    { name: 'Faisalabad', demand: 9.2, price: 405 },
    { name: 'Islamabad', demand: 6.4, price: 440 },
    { name: 'Peshawar', demand: 7.1, price: 415 },
  ];

  return (
    <Card className="p-8 h-[400px] bg-[#0d1526]">
       <div className="mb-8">
        <h3 className="text-xl font-heading font-bold text-white">City Comparison</h3>
        <p className="text-sm text-gray-500">Demand level comparison for {displayProduct}</p>
      </div>

      <div className="w-full h-full pb-14">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#4b5563', fontSize: 12 }}
            />
            <YAxis 
              domain={[0, 10]}
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#4b5563', fontSize: 12 }}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.02)' }}
              contentStyle={{ backgroundColor: '#162035', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
              itemStyle={{ color: '#fff', fontSize: '12px' }}
            />
            <Bar dataKey="demand" radius={[8, 8, 0, 0]} animationDuration={1500}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 2 ? '#3b82f6' : '#1e2d45'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default CityCompareChart;
