"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import { City } from '@/lib/types';
import { getCities } from '@/lib/api';
import { usePredictionStore } from '@/lib/store';
import { cn } from '../ui/Button';

const CitySelector = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  const { selectedCity, setFormField } = usePredictionStore();

  useEffect(() => {
    getCities().then(res => setCities(res.data));
  }, []);

  const filteredCities = cities.filter(city => 
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.province.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCityData = cities.find(c => c.name === selectedCity);

  return (
    <div className="space-y-1.5 relative">
      <label className="text-sm font-medium text-gray-400 ml-1">Select City</label>
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full bg-[#162035] border border-white/[0.08] text-white rounded-xl py-3 px-4 cursor-pointer flex items-center justify-between transition-colors",
          isOpen ? "border-blue-500/50" : "hover:border-white/20"
        )}
      >
        <div className="flex items-center gap-3">
          <MapPin size={18} className={selectedCity ? "text-blue-500" : "text-gray-500"} />
          <span className={selectedCity ? "text-white" : "text-gray-500"}>
            {selectedCity || "Search cities (Karachi, Lahore...)"}
          </span>
        </div>
        {selectedCityData && (
          <span className="text-[10px] uppercase tracking-wider bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-md border border-blue-500/20">
            {selectedCityData.province}
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
                placeholder="Type to filter..."
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-500/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          
          <div className="max-h-[250px] overflow-y-auto">
            {filteredCities.length > 0 ? (
              filteredCities.map(city => (
                <div
                  key={city.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormField('selectedCity', city.name);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className={cn(
                    "px-4 py-3 flex items-center justify-between cursor-pointer transition-colors hover:bg-white/5",
                    selectedCity === city.name && "bg-blue-500/10"
                  )}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{city.name}</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-tight">{city.province}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400">{city.population_m}M Pop.</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-sm text-gray-500">No cities found</div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CitySelector;
