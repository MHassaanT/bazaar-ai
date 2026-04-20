"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Search, ChevronRight } from 'lucide-react';
import { ProductGroup } from '@/lib/types';
import { getProducts } from '@/lib/api';
import { usePredictionStore } from '@/lib/store';
import { cn } from '../ui/Button';

const ProductSelector = () => {
  const [categories, setCategories] = useState<ProductGroup[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  const { selectedProduct, selectedCategory, setFormField } = usePredictionStore();

  useEffect(() => {
    getProducts().then(res => setCategories(res.data));
  }, []);

  const filteredCategories = categories.map(cat => ({
    ...cat,
    products: cat.products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  })).filter(cat => cat.products.length > 0);

  return (
    <div className="space-y-1.5 relative">
      <label className="text-sm font-medium text-gray-400 ml-1">Select Product</label>
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full bg-[#162035] border border-white/[0.08] text-white rounded-xl py-3 px-4 cursor-pointer flex items-center justify-between transition-colors",
          isOpen ? "border-blue-500/50" : "hover:border-white/20"
        )}
      >
        <div className="flex items-center gap-3">
          <Package size={18} className={selectedProduct ? "text-blue-500" : "text-gray-500"} />
          <span className={selectedProduct ? "text-white" : "text-gray-500"}>
            {selectedProduct || "Select item (Sugar, Wheat, Chicken...)"}
          </span>
        </div>
        {selectedCategory && (
          <span className="text-[10px] uppercase tracking-wider bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-md border border-indigo-500/20">
            {selectedCategory}
          </span>
        )}
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute z-30 top-full left-0 right-0 mt-2 bg-[#0d1526] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-3 border-b border-white/[0.05]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                autoFocus
                type="text"
                placeholder="Filter products..."
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-500/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          
          <div className="max-h-[350px] overflow-y-auto">
            {filteredCategories.map(cat => (
              <div key={cat.category} className="p-2">
                <div className="px-3 py-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white/[0.02] rounded-md mb-1">
                  {cat.category}
                </div>
                {cat.products.map(product => (
                  <div
                    key={product.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      setFormField('selectedProduct', product.name);
                      setFormField('selectedCategory', cat.category);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                    className={cn(
                      "group px-3 py-2 flex items-center justify-between cursor-pointer transition-colors hover:bg-white/5 rounded-lg",
                      selectedProduct === product.name && "bg-blue-500/10"
                    )}
                  >
                    <span className="text-sm">{product.name}</span>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] text-gray-500">Unit: {product.unit}</span>
                      <ChevronRight size={14} className="text-blue-500" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductSelector;
