"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart2, TrendingUp } from 'lucide-react';
import { Button } from '../ui/Button';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#060b18]">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px]"
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* All-caps label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20"
        >
          <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">AI-Powered Market Intelligence</span>
        </motion.div>

        {/* Giant heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white leading-tight mb-6"
        >
          Predict Pakistan&apos;s <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500">
            Market Demand
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          Leverage real-time ML forecasting to stay ahead of market trends, 
          avoid shortages, and optimize your procurement strategy.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/predict">
            <Button size="lg" className="w-full sm:w-auto h-14 px-10 group">
              Start Predicting
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/explore">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto h-14 px-10">
              Explore Markets
            </Button>
          </Link>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 pt-10 border-t border-white/[0.06] flex flex-wrap justify-center gap-12"
        >
          <div className="flex items-center gap-3 text-gray-500">
            <TrendingUp size={18} className="text-blue-500" />
            <span className="text-sm">Real-time Predictions</span>
          </div>
          <div className="flex items-center gap-3 text-gray-500">
            <BarChart2 size={18} className="text-indigo-500" />
            <span className="text-sm">300K+ Data Points</span>
          </div>
          <div className="flex items-center gap-3 text-gray-500">
            <TrendingUp size={18} className="text-emerald-500" />
            <span className="text-sm">High-Resolution City Data</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <ArrowRight size={24} className="rotate-90" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
