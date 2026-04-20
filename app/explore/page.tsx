"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CityHeatmap from '@/components/explore/CityHeatmap';
import CityCompareChart from '@/components/explore/CityCompareChart';
import TopProductsChart from '@/components/explore/TopProductsChart';
import { getHeatmapData, getCities, getProducts } from '@/lib/api';
import { HeatmapData, City, ProductGroup } from '@/lib/types';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Select } from '@/components/ui/Select';
import { MapPin, ShoppingBag } from 'lucide-react';

export default function ExplorePage() {
  const [heatmapData, setHeatmapData] = useState<HeatmapData | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [products, setProducts] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial data fetch
    Promise.all([
      getHeatmapData(),
      getCities(),
      getProducts()
    ]).then(([heatmapRes, citiesRes, productsRes]) => {
      setHeatmapData(heatmapRes.data);
      setCities(citiesRes.data);
      
      // Flatten product groups into a simple list of unique product names
      const allProducts = Array.from(new Set(
        productsRes.data.flatMap(group => group.products.map(p => p.name))
      )).sort();
      setProducts(allProducts);
    }).finally(() => setIsLoading(false));
  }, []);

  // Update heatmap when selection changes
  useEffect(() => {
    if (!isLoading) {
      getHeatmapData(selectedCity || undefined, selectedProduct || undefined)
        .then(res => setHeatmapData(res.data));
    }
  }, [selectedCity, selectedProduct]);

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white">
              Market <span className="text-blue-500">Explorer</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Dive deep into regional market dynamics. Compare cities and identify 
              the best arbitrage opportunities across Pakistan.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 bg-[#0d1526]/50 p-6 rounded-2xl border border-white/[0.05] backdrop-blur-sm">
            <div className="w-full sm:w-64">
              <Select 
                label="Region / City" 
                icon={<MapPin size={18} />}
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">All Regions</option>
                {cities.map(city => (
                  <option key={city.name} value={city.name}>{city.name}</option>
                ))}
              </Select>
            </div>
            <div className="w-full sm:w-64">
              <Select 
                label="Product Category" 
                icon={<ShoppingBag size={18} />}
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option value="">All Products</option>
                {products.map(product => (
                  <option key={product} value={product}>{product}</option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="h-96 flex items-center justify-center">
            <LoadingSpinner size="xl" />
          </div>
        ) : (
          <>
            {heatmapData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CityHeatmap data={heatmapData} />
              </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <CityCompareChart product={selectedProduct} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <TopProductsChart city={selectedCity} />
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
