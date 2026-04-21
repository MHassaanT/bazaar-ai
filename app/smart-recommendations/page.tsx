'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { MapPin, ShoppingBag, Crown, Loader2, ArrowRight } from 'lucide-react';
import api from '@/lib/api';
import Link from 'next/link';

export default function SmartRecommendations() {
  const { user } = useAuth();
  const [mode, setMode] = useState<'city' | 'product' | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [loadingPro, setLoadingPro] = useState(true);
  
  const [cities, setCities] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [businessTypes, setBusinessTypes] = useState<any[]>([]);
  
  // Forms
  const [targetM, setTargetM] = useState(new Date().getMonth() + 1);
  const [targetY, setTargetY] = useState(new Date().getFullYear());
  const [cityInput, setCityInput] = useState('');
  const [productInput, setProductInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [businessTypeInput, setBusinessTypeInput] = useState('');
  
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      api.get('/api/users/me').then(res => {
        setIsPro(res.data.plan === 'pro');
      }).finally(() => setLoadingPro(false));
    }
    
    // Load metadata
    api.get('/api/cities').then(res => setCities(res.data));
    api.get('/api/products').then(res => setProducts(res.data));
    api.get('/api/business-types').then(res => setBusinessTypes(res.data));
  }, [user]);

  const handleCitySearch = async () => {
    setLoading(true);
    try {
      const res = await api.post('/api/recommend/best-cities', {
         product: productInput,
         category: categoryInput,
         business_type: businessTypeInput,
         target_month: targetM,
         target_year: targetY
      });
      setResults({ type: 'city', data: res.data });
    } catch(e) {}
    setLoading(false);
  };

  const handleProductSearch = async () => {
    setLoading(true);
    try {
      const res = await api.post('/api/recommend/best-products', {
         city: cityInput,
         target_month: targetM,
         target_year: targetY
      });
      setResults({ type: 'product', data: res.data });
    } catch(e) {}
    setLoading(false);
  };

  if (loadingPro) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-500"/></div>;

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-5xl mx-auto">
       <div className="text-center mb-12 relative">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-500 border border-amber-500/20 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <Crown size={16} /> Pro Feature
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">AI Smart Recommendations</h1>
          <p className="text-gray-400 text-lg">Let our AI find the best market opportunity for you — automatically</p>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Mode A */}
          <div 
             onClick={() => setMode('city')}
             className={`p-6 rounded-2xl border transition-all cursor-pointer ${mode === 'city' ? 'bg-blue-900/20 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.15)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
          >
             <MapPin className={`w-8 h-8 mb-4 ${mode === 'city' ? 'text-blue-400' : 'text-gray-400'}`} />
             <h3 className="text-xl font-bold text-white mb-2">Where should I sell?</h3>
             <p className="text-gray-400 text-sm">Give us your product and target date — we'll rank the best Pakistani cities for you</p>
          </div>
          
          {/* Mode B */}
          <div 
             onClick={() => setMode('product')}
             className={`p-6 rounded-2xl border transition-all cursor-pointer ${mode === 'product' ? 'bg-blue-900/20 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.15)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
          >
             <ShoppingBag className={`w-8 h-8 mb-4 ${mode === 'product' ? 'text-blue-400' : 'text-gray-400'}`} />
             <h3 className="text-xl font-bold text-white mb-2">What should I sell?</h3>
             <p className="text-gray-400 text-sm">Give us your city and target date — we'll recommend the best products and business types</p>
          </div>
       </div>
       
       <AnimatePresence mode="wait">
         {mode && (
           <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} exit={{opacity:0, height:0}} className="relative">
             {!isPro && (
               <div className="absolute inset-0 z-10 backdrop-blur-sm bg-[#060b18]/60 flex flex-col items-center justify-center rounded-2xl border border-white/10">
                 <Crown className="w-12 h-12 text-amber-500 mb-4" />
                 <h3 className="text-xl font-bold text-white mb-2">This feature requires Bazaar AI Pro</h3>
                 <p className="text-gray-400 mb-6">Upgrade to unlock full Smart Recommendations.</p>
                 <Link href="/pricing"><button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-colors">Upgrade to Pro</button></Link>
               </div>
             )}
             
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                {mode === 'city' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Product</label>
                      <select className="w-full bg-[#0d1526] border border-white/10 rounded-xl p-3 text-white appearance-none" onChange={e => {
                         const val = e.target.value;
                         setProductInput(val);
                         // Find category
                         for(let g of products) {
                           for(let p of g.products) {
                             if(p.name === val) { setCategoryInput(g.category); break; }
                           }
                         }
                      }}>
                         <option value="">Select Product...</option>
                         {products.map(g => (
                           <optgroup key={g.category} label={g.category}>
                             {g.products.map((p: any) => <option key={p.name} value={p.name}>{p.name}</option>)}
                           </optgroup>
                         ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Business Type</label>
                      <select className="w-full bg-[#0d1526] border border-white/10 rounded-xl p-3 text-white appearance-none" onChange={e => setBusinessTypeInput(e.target.value)}>
                         <option value="">Select Business...</option>
                         {businessTypes.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Target Month</label>
                      <input type="number" min="1" max="12" value={targetM} onChange={e=>setTargetM(parseInt(e.target.value))} className="w-full bg-[#0d1526] border border-white/10 rounded-xl p-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Target Year</label>
                      <input type="number" min="2024" max="2030" value={targetY} onChange={e=>setTargetY(parseInt(e.target.value))} className="w-full bg-[#0d1526] border border-white/10 rounded-xl p-3 text-white" />
                    </div>
                    <div className="md:col-span-2 pt-4">
                      <button disabled={!productInput || !businessTypeInput || loading} onClick={handleCitySearch} className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Find Best Cities <ArrowRight/></>}
                      </button>
                    </div>
                  </div>
                )}
                
                {mode === 'product' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                       <label className="block text-sm text-gray-400 mb-2">City</label>
                       <select className="w-full bg-[#0d1526] border border-white/10 rounded-xl p-3 text-white appearance-none" onChange={e => setCityInput(e.target.value)}>
                         <option value="">Select City...</option>
                         {cities.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Target Month</label>
                      <input type="number" min="1" max="12" value={targetM} onChange={e=>setTargetM(parseInt(e.target.value))} className="w-full bg-[#0d1526] border border-white/10 rounded-xl p-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Target Year</label>
                      <input type="number" min="2024" max="2030" value={targetY} onChange={e=>setTargetY(parseInt(e.target.value))} className="w-full bg-[#0d1526] border border-white/10 rounded-xl p-3 text-white" />
                    </div>
                    <div className="md:col-span-2 pt-4">
                      <button disabled={!cityInput || loading} onClick={handleProductSearch} className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Find Best Products <ArrowRight/></>}
                      </button>
                    </div>
                  </div>
                )}
             </div>
             
             {/* Results rendering (simplified for brevity) */}
             {results && results.type === 'city' && (
                <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                   <h2 className="text-2xl font-bold text-white mb-6">Top Cities for {results.data.product}</h2>
                   <div className="space-y-4">
                      {results.data.recommendations.map((r: any) => (
                        <div key={r.city} className="flex flex-col md:flex-row items-center gap-4 bg-[#0d1526] p-4 rounded-xl border border-white/5">
                           <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold ${r.rank===1?'bg-amber-500 text-white':r.rank===2?'bg-gray-300 text-gray-900':r.rank===3?'bg-orange-700 text-white':'bg-white/10 text-white'}`}>
                              #{r.rank}
                           </div>
                           <div className="flex-1 text-center md:text-left">
                              <h4 className="text-lg font-bold text-white">{r.city}</h4>
                              <p className="text-sm text-gray-400">{r.recommendation}</p>
                           </div>
                           <div className="flex gap-2">
                              <span className="px-3 py-1 rounded bg-blue-500/20 text-blue-400 text-sm font-medium">Demand: {r.demand_label}</span>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             )}
             
             {results && results.type === 'product' && (
                <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                   <h2 className="text-2xl font-bold text-white mb-6">Top Opportunities in {results.data.city}</h2>
                   <div className="space-y-4">
                      {results.data.top_recommendations.map((r: any) => (
                        <div key={r.product} className="flex flex-col md:flex-row items-center gap-4 bg-[#0d1526] p-4 rounded-xl border border-white/5">
                           <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold ${r.rank===1?'bg-amber-500 text-white':r.rank===2?'bg-gray-300 text-gray-900':r.rank===3?'bg-orange-700 text-white':'bg-white/10 text-white'}`}>
                              #{r.rank}
                           </div>
                           <div className="flex-1 text-center md:text-left">
                              <h4 className="text-lg font-bold text-white">{r.product}</h4>
                              <p className="text-sm text-gray-400">{r.business_type} &middot; {r.recommendation}</p>
                           </div>
                           <div className="flex gap-2">
                              <span className="px-3 py-1 rounded bg-blue-500/20 text-blue-400 text-sm font-medium">Demand: {r.demand_label}</span>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             )}
             
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
}
