"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, MapPin, Zap, TrendingUp, ShieldCheck, Database } from 'lucide-react';
import { Card } from '../ui/Card';

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any; title: string; description: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <Card className="p-8 h-full flex flex-col gap-5 border-white/[0.05] bg-white/[0.02]">
      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
        <Icon size={24} />
      </div>
      <div className="space-y-3">
        <h3 className="text-xl font-heading font-semibold text-white">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      </div>
    </Card>
  </motion.div>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: BrainCircuit,
      title: "AI Demand Forecasting",
      description: "Our Random Forest model is trained on 300K+ real market data points from Pakistan, providing high-precision demand scores.",
      delay: 0.1
    },
    {
      icon: MapPin,
      title: "City-Level Precision",
      description: "Localized intelligence for Karachi, Lahore, Faisalabad, and 9 more cities across all 4 provinces of Pakistan.",
      delay: 0.2
    },
    {
      icon: Zap,
      title: "Festive Intelligence",
      description: "Automatically factors in Ramadan, Eid-ul-Fitr, and Eid-ul-Adha surges to ensure you are never caught off-guard.",
      delay: 0.3
    },
    {
      icon: TrendingUp,
      title: "Price Risk Analysis",
      description: "Identify inflationary risks and price volatility before they impact your procurement bottom line.",
      delay: 0.4
    },
    {
      icon: Database,
      title: "Massive Dataset",
      description: "Built on historical data spanning years of Pakistani market behavior, capturing seasonal and macroeconomic trends.",
      delay: 0.5
    },
    {
      icon: ShieldCheck,
      title: "Inventory Optimization",
      description: "Get 'Buy' or 'Reduce Stock' recommendations based on predicted market saturation and demand levels.",
      delay: 0.6
    }
  ];

  return (
    <section className="py-24 bg-[#060b18]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white">
            Everything you need to <span className="text-blue-500">invest smarter</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Bazaar AI combines advanced machine learning with deep cultural data to give you the most accurate market picture in Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
