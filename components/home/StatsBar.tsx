"use client";

import React from 'react';
import { AnimatedNumber } from '../ui/AnimatedNumber';

const StatItem = ({ label, value, suffix = "", decimals = 0 }: { label: string; value: number; suffix?: string; decimals?: number }) => (
  <div className="flex flex-col items-center justify-center p-6 space-y-1">
    <div className="text-3xl md:text-4xl font-heading font-bold text-white tracking-tight">
      <AnimatedNumber value={value} suffix={suffix} decimals={decimals} />
    </div>
    <div className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-500">
      {label}
    </div>
  </div>
);

const StatsBar = () => {
  return (
    <section className="bg-[#0b1120] border-y border-white/[0.06] py-12 min-h-[160px] flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
        <StatItem label="Active Cities" value={12} />
        <StatItem label="Products" value={71} />
        <StatItem label="Model Accuracy" value={87.4} suffix="%" decimals={1} />
        <StatItem label="Data Points" value={307} suffix="K+" />
      </div>
    </section>
  );
};

export default StatsBar;
