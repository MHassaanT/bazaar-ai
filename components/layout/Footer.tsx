import React from 'react';
import Link from 'next/link';
import { Zap, Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from '../ui/Button';

const Footer = () => {
  return (
    <footer className="bg-[#060b18] border-t border-white/[0.06] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1 space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="text-blue-500" size={24} fill="currentColor" />
            <span className="text-2xl font-heading font-bold">BazaarAI</span>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed">
            AI-powered market intelligence for Pakistani entrepreneurs. 
            Predict demand trends, analyze price risks, and stay ahead of the market.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-blue-500/20 hover:text-blue-400 transition-all">
              <Twitter size={18} />
            </Link>
            <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-blue-500/20 hover:text-blue-400 transition-all">
              <Linkedin size={18} />
            </Link>
            <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-blue-500/20 hover:text-blue-400 transition-all">
              <Github size={18} />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-white mb-6">Product</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/predict" className="text-gray-500 hover:text-blue-400 transition-colors">Demand Predictor</Link></li>
            <li><Link href="/explore" className="text-gray-500 hover:text-blue-400 transition-colors">Market Explorer</Link></li>
            <li><Link href="/insights" className="text-gray-500 hover:text-blue-400 transition-colors">Trends & Insights</Link></li>
            <li><Link href="#" className="text-gray-500 hover:text-blue-400 transition-colors">API Access</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-white mb-6">Company</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/about" className="text-gray-500 hover:text-blue-400 transition-colors">About Us</Link></li>
            <li><Link href="#" className="text-gray-500 hover:text-blue-400 transition-colors">Methodology</Link></li>
            <li><Link href="#" className="text-gray-500 hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="text-gray-500 hover:text-blue-400 transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-white mb-6">Stay Updated</h4>
          <p className="text-gray-500 text-sm mb-4">Subscribe to our newsletter for weekly market reports.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email address"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm w-full outline-none focus:border-blue-500/50"
            />
            <Button size="sm">Join</Button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-600 text-xs text-center md:text-left">
          © {new Date().getFullYear()} Bazaar AI. Built for Academic Presentation - Pakistan Market Prediction.
        </p>
        <p className="text-gray-600 text-xs">
          Accuracy: ~87% R² (Random Forest)
        </p>
      </div>
    </footer>
  );
};

export default Footer;
