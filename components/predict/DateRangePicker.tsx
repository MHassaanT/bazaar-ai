"use client";

import React from 'react';
import { Calendar } from 'lucide-react';
import { Select } from '../ui/Select';
import { MONTHS, YEARS } from '@/lib/constants';
import { usePredictionStore } from '@/lib/store';

const DateRangePicker = () => {
  const { targetMonth, targetYear, setFormField } = usePredictionStore();

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-400 ml-1">Target Forecast Date</label>
      <div className="grid grid-cols-2 gap-4">
        <Select
          icon={<Calendar size={18} />}
          value={targetMonth}
          onChange={(e) => setFormField('targetMonth', parseInt(e.target.value))}
        >
          {MONTHS.map(m => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </Select>
        <Select
          value={targetYear}
          onChange={(e) => setFormField('targetYear', parseInt(e.target.value))}
        >
          {YEARS.map(y => (
            <option key={y.value} value={y.value}>{y.label}</option>
          ))}
        </Select>
      </div>
      
      {/* Seasonal Alert */}
      {(targetMonth === 3 || targetMonth === 4) && (
        <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex gap-3 animate-pulse">
          <div className="mt-0.5 text-amber-500">🕌</div>
          <div className="space-y-1">
            <div className="text-xs font-bold text-amber-500 uppercase tracking-wider">Ramadan Period Detected</div>
            <p className="text-[10px] text-amber-500/80 leading-tight">
              Expect high volatility in food demand. The model will account for historical seasonal surges.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
