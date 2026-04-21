'use client';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import Link from 'next/link';

export default function CtaSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-blue-900/10 blur-[100px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto rounded-3xl p-10 md:p-16 bg-gradient-to-br from-blue-900/40 via-indigo-900/20 to-blue-900/40 border border-white/10 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-8"
      >
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start predicting Pakistan's markets today
          </h2>
          <p className="text-blue-200/80 text-lg">
            Make data-driven decisions with AI-powered forecasting. Get ahead of market trends before your competition does.
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link href="/auth/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full">Create Free Account</Button>
            </Link>
            <Link href="/auth/login" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full">Sign In</Button>
            </Link>
          </div>
          <p className="text-sm text-gray-400">
            Free forever &middot; No credit card required &middot; 15 predictions included
          </p>
        </div>
      </motion.div>
    </section>
  );
}
