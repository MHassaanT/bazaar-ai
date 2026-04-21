'use client';
import { useAuth } from '@/lib/auth-context';
import api from '@/lib/api';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, TrendingUp, TrendingDown, Minus, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      Promise.all([
        api.get('/api/users/me'),
        api.get('/api/history/my')
      ]).then(([resProfile, resHistory]) => {
        setProfile(resProfile.data);
        setHistory(resHistory.data);
      }).finally(() => setLoading(false));
    }
  }, [user]);

  const handleDelete = async (id: str) => {
    try {
      await api.delete(`/api/history/${id}`);
      setHistory(h => h.filter(item => item.id !== id));
    } catch(e) {}
  };

  if (!user || loading) return <div className="min-h-screen animate-pulse" />;

  const isPro = profile?.plan === 'pro';

  return (
    <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Left Column Profile Card */}
      <div className="w-full md:w-80 flex-shrink-0">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl sticky top-28">
           <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 text-white shadow-lg shadow-blue-500/20 text-center uppercase">
               {user.displayName ? user.displayName.substring(0,2) : 'U'}
           </div>
           <h2 className="text-xl font-bold text-center text-white mb-1">{user.displayName || 'User'}</h2>
           <p className="text-gray-400 text-sm text-center mb-6">{user.email}</p>
           
           <div className="bg-[#060b18] rounded-xl p-4 border border-white/5 mb-6 text-center">
              {isPro ? (
                  <>
                    <h3 className="text-blue-400 font-bold flex items-center justify-center gap-2 mb-2"><Zap className="w-4 h-4 fill-current"/> Pro Plan</h3>
                    <p className="text-sm text-white">Unlimited Predictions</p>
                  </>
              ) : (
                  <>
                    <h3 className="text-white font-medium flex items-center justify-center gap-1 mb-2"><Zap className="w-4 h-4 text-blue-400 fill-current"/> {profile?.credits_remaining} / {profile?.credits_total} Credits</h3>
                    <div className="w-full bg-white/10 h-2 rounded-full mb-4 overflow-hidden">
                       <div className="bg-blue-500 h-full rounded-full" style={{ width: `${((profile?.credits_used || 0)/(profile?.credits_total || 15))*100}%` }}></div>
                    </div>
                    <Link href="/pricing"><button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors font-medium">Upgrade to Pro</button></Link>
                  </>
              )}
           </div>
           
           <p className="text-xs text-gray-500 text-center">Member since {new Date(user.metadata.creationTime || Date.now()).toLocaleDateString()}</p>
        </div>
      </div>
      
      {/* Right Column History */}
      <div className="flex-1 pl-4 md:pl-0">
         <div className="flex items-center gap-3 mb-6">
            <h1 className="text-2xl font-bold text-white">Your Recent Predictions</h1>
            <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-full border border-blue-500/20">Last 30 days</span>
         </div>
         
         {history.length === 0 ? (
            <div className="border border-white/10 bg-white/5 border-dashed rounded-2xl p-12 text-center">
              <Clock className="w-12 h-12 text-gray-500 mx-auto mb-4"/>
              <h3 className="text-lg font-medium text-white mb-2">No predictions yet</h3>
              <p className="text-gray-400 mb-6 max-w-sm mx-auto">Start exploring Pakistan's markets to see your history appear here.</p>
              <Link href="/predict"><button className="px-6 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors">Predict a market <ArrowRight className="inline w-4 h-4 ml-1"/></button></Link>
            </div>
         ) : (
            <div className="flex flex-col gap-4 pb-20">
              {history.map((item, i) => (
                <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay: i*0.05}} key={item.id} className="group relative bg-[#0d1526] hover:bg-[#121c33] transition-colors border border-white/5 rounded-xl p-5 flex flex-col md:flex-row items-center gap-4 shadow-sm hover:shadow-xl hover:shadow-blue-900/10 cursor-pointer" onClick={() => window.location.href='/predict'}>
                  <div className="flex-1 w-full md:w-auto">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-lg font-bold text-white">{item.city} &middot; {item.product}</h4>
                      <span className="text-xs text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">{item.business_type}</span>
                    </div>
                    <div className="text-sm text-gray-400 mb-3">Target Date: Month {item.target_month}, {item.target_year}</div>
                    <p className="text-sm text-gray-300 line-clamp-1 italic text-white/50">{item.recommendation}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 md:gap-4 md:items-end w-full md:w-auto mt-4 md:mt-0">
                    <div className="flex flex-col gap-1 items-start md:items-end">
                       <span className={`text-xs px-2 py-0.5 rounded font-medium ${item.demand_label.includes('High')?'bg-green-500/20 text-green-400':item.demand_label.includes('Low')?'bg-red-500/20 text-red-400':'bg-amber-500/20 text-amber-400'}`}>Demand: {item.demand_label}</span>
                       <span className="flex items-center text-xs text-gray-400 gap-1">{item.demand_trend.includes('Rising')?<TrendingUp className="w-3 h-3 text-green-400"/>:item.demand_trend.includes('Declining')?<TrendingDown className="w-3 h-3 text-red-400"/>:<Minus className="w-3 h-3"/>} {item.demand_trend}</span>
                    </div>
                    <button onClick={(e) => {e.stopPropagation(); handleDelete(item.id)}} className="md:ml-4 text-gray-500 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-500/10 self-center">
                      <Trash2 className="w-5 h-5"/>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
         )}
      </div>
    </div>
  );
}
