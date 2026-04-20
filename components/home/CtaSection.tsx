"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import Link from 'next/link';

const CtaSection = () => {
  return (
    <section className="py-24 bg-[#060b18] px-6">
      <div className="max-w-5xl mx-auto rounded-3xl p-12 md:p-20 relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-900 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white leading-tight">
            Ready to find your next market?
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl font-light">
            Join hundreds of Pakistani traders and entrepreneurs using AI to gain a competitive edge. 
            Start predicting for free today.
          </p>
          <div className="pt-4">
            <Link href="/predict">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 h-16 px-12 text-lg shadow-none">
                Start Predicting Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
