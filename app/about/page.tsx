"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Brain, Cpu, Database, Network } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: "Data Quality", value: "98.2%", icon: Database },
    { label: "Processing Latency", value: "<120ms", icon: Cpu },
    { label: "ML Confidence", value: "87.4%", icon: Brain },
    { label: "Feature Matrix", value: "20x20", icon: Network },
  ];

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white">
            Intelligence for the <br />
            <span className="text-blue-500">Modern Trader</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Bazaar AI was built to solve the information asymmetry in the Pakistani retail 
            and agricultural markets. By combining cultural patterns with advanced math, 
            we empower business owners to make data-driven decisions.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="p-6 text-center space-y-3">
              <stat.icon size={24} className="mx-auto text-blue-500" />
              <div className="text-2xl font-heading font-bold text-white">{stat.value}</div>
              <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">{stat.label}</div>
            </Card>
          ))}
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-heading font-bold text-white text-center">Technical Methodology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-blue-400 font-bold">Random Forest Regressor</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Utilizing an ensemble of 50 decision trees, our model analyzes non-linear 
                relationships between variables like regional inflation, provincial populations, 
                and commodity categories.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-indigo-400 font-bold">Temporal Feature Engineering</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                We apply specialized transforms to handle Islamic lunar events (Ramadan, Eids) 
                which shift dates annually, ensuring seasonal intelligence remains accurate 
                year-over-year.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
