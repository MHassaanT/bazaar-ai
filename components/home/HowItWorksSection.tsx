"use client";

import React from 'react';
import { motion } from 'framer-motion';

const Step = ({ number, title, description, isLast }: { number: string; title: string; description: string; isLast?: boolean }) => (
  <div className="flex-1 relative">
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold text-white mb-6 relative z-10 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
        {number}
      </div>
      <h3 className="text-lg font-heading font-bold text-white mb-3 tracking-wide">{title}</h3>
      <p className="text-gray-500 text-sm max-w-[200px]">{description}</p>
    </div>
    
    {!isLast && (
      <div className="hidden lg:block absolute top-8 left-[calc(50%+4rem)] w-[calc(100%-8rem)] h-[2px] bg-gradient-to-r from-blue-600/50 to-transparent" />
    )}
  </div>
);

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-[#0d1526]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-16">
          How Bazaar AI Works
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-4 justify-between relative">
          <Step 
            number="01" 
            title="Configure" 
            description="Select your target city, product, and business type." 
          />
          <Step 
            number="02" 
            title="Forecast" 
            description="Choose a target date and trigger the prediction engine." 
          />
          <Step 
            number="03" 
            title="Analyze" 
            description="Our RF model runs in real-time to generate a precision score." 
          />
          <Step 
            number="04" 
            title="Decide" 
            description="Execute your market moves with confidence using AI insights." 
            isLast={true}
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
