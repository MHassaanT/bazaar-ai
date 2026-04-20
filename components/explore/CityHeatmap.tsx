"use client";

import React from 'react';
import { Card } from '../ui/Card';
import { HeatmapData } from '@/lib/types';
import { cn } from '../ui/Button';

interface CityHeatmapProps {
  data: HeatmapData;
}

const CityHeatmap = ({ data }: CityHeatmapProps) => {
  const getCellColor = (score: number) => {
    if (score >= 8.5) return 'bg-red-500/80';
    if (score >= 7.0) return 'bg-orange-500/70';
    if (score >= 5.5) return 'bg-amber-500/60';
    if (score >= 4.0) return 'bg-blue-500/50';
    if (score >= 2.5) return 'bg-emerald-500/40';
    return 'bg-green-500/30';
  };

  return (
    <Card className="p-8 overflow-x-auto bg-[#0d1526]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-heading font-bold text-white">City × Product Heatmap</h3>
          <p className="text-sm text-gray-500">Regional demand distribution across top commodities</p>
        </div>
        <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
          <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500/30 rounded" /> Low</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500/50 rounded" /> Mid</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500/80 rounded" /> Peak</div>
        </div>
      </div>

      <table className="w-full border-separate border-spacing-1">
        <thead>
          <tr>
            <th className="p-2 text-left text-xs font-bold text-gray-500 sticky left-0 bg-[#0d1526] z-10">City</th>
            {data.products.map(product => (
              <th key={product} className="p-2 text-center text-[10px] font-bold text-gray-400 uppercase tracking-tighter w-12 h-12 overflow-hidden">
                <div className="rotate-[-45deg] whitespace-nowrap">{product.split(' ')[0]}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.cities.map(city => (
            <tr key={city}>
              <td className="p-2 text-xs font-bold text-white sticky left-0 bg-[#0d1526] z-10 border-r border-white/5">{city}</td>
              {data.products.map(product => {
                const cell = data.data.find(d => d.city === city && d.product === product);
                const score = cell?.demand_level || 0;
                return (
                  <td key={product} className="p-0">
                    <div 
                      title={`${city} - ${product}: ${score.toFixed(1)}`}
                      className={cn(
                        "w-full aspect-square rounded-sm border border-black/10 transition-transform hover:scale-110 hover:z-20 cursor-help",
                        getCellColor(score)
                      )}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default CityHeatmap;
