'use client';
import { motion } from 'framer-motion';
import { Check, X, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

export default function PricingPage() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [complete, setComplete] = useState(false);

  const handleUpgrade = (e: any) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
        setIsProcessing(false);
        setComplete(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
       <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Simple, transparent pricing</h1>
          <p className="text-lg text-gray-400">Start predicting the future of Pakistani markets for free. Upgrade when you need unlimited insights.</p>
       </div>
       
       <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Free Card */}
          <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden backdrop-blur-xl">
             <h3 className="text-xl text-gray-400 font-medium mb-2">Starter</h3>
             <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl font-bold text-white">Free</span>
             </div>
             <p className="text-gray-500 mb-8 pb-8 border-b border-white/10">Forever free</p>
             
             <ul className="space-y-4 mb-8">
                {['15 total predictions', '12 Pakistani cities', '71 products', '30-day search history'].map(feature => (
                    <li key={feature} className="flex gap-3 text-gray-300"><Check className="w-5 h-5 text-green-400 shrink-0"/> {feature}</li>
                ))}
                {['Smart AI recommendations', 'Unlimited predictions', 'Priority support'].map(feature => (
                    <li key={feature} className="flex gap-3 text-gray-600"><X className="w-5 h-5 shrink-0"/> {feature}</li>
                ))}
             </ul>
             
             {user ? (
                <Button variant="outline" className="w-full opacity-50 cursor-not-allowed">Your Current Plan</Button>
             ) : (
                <Link href="/auth/signup"><Button variant="outline" className="w-full">Get Started</Button></Link>
             )}
          </motion.div>
          
          {/* Pro Card */}
          <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} className="bg-gradient-to-b from-[#0e172e] to-[#0a1122] border-[2px] border-blue-500/50 rounded-3xl p-8 relative overflow-hidden shadow-2xl shadow-blue-900/20 transform md:scale-105">
             <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
             <div className="absolute top-4 right-4 bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Most Popular</div>
             
             <h3 className="text-xl text-blue-400 font-medium mb-2">Pro</h3>
             <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl font-bold text-white">$5</span>
                <span className="text-gray-400 mb-1">/month</span>
             </div>
             <p className="text-gray-500 mb-8 pb-8 border-b border-white/10">Billed monthly</p>
             
             <ul className="space-y-4 mb-8">
                {['Unlimited predictions', '12 Pakistani cities', '71 products', 'Full search history', 'AI Smart Recommendations', 'Reverse location finder', 'Priority support'].map(feature => (
                    <li key={feature} className="flex gap-3 text-white"><Check className="w-5 h-5 text-blue-400 shrink-0"/> {feature}</li>
                ))}
             </ul>
             
             <Dialog.Root open={showModal} onOpenChange={setShowModal}>
               <Dialog.Trigger asChild>
                 <Button className="w-full shadow-lg shadow-blue-500/25">Upgrade to Pro</Button>
               </Dialog.Trigger>
               <Dialog.Portal>
                 <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-in fade-in" />
                 <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0d1526] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl z-50 animate-in zoom-in-95">
                   {complete ? (
                      <div className="text-center py-6">
                         <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="w-8 h-8 text-blue-500"/>
                         </div>
                         <h2 className="text-xl font-bold text-white mb-2">Payment gateway integration coming soon.</h2>
                         <p className="text-gray-400 mb-6">Thank you for your interest in Bazaar AI Pro! We're rolling out payments soon.</p>
                         <Button onClick={() => setShowModal(false)} className="w-full">Close</Button>
                      </div>
                   ) : (
                      <form onSubmit={handleUpgrade}>
                         <div className="flex items-center gap-3 mb-6">
                            <CreditCard className="text-blue-500" />
                            <h2 className="text-xl font-bold text-white">Upgrade to Pro</h2>
                         </div>
                         <div className="space-y-4 mb-6">
                            <div><label className="block text-xs text-gray-400 mb-1">Name on card</label><input required className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white" placeholder="John Doe"/></div>
                            <div><label className="block text-xs text-gray-400 mb-1">Card number</label><input required type="text" maxLength={16} className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white font-mono placeholder:font-sans" placeholder="0000 0000 0000 0000"/></div>
                            <div className="flex gap-4">
                               <div className="flex-1"><label className="block text-xs text-gray-400 mb-1">Expiry</label><input required maxLength={5} className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white font-mono placeholder:font-sans" placeholder="MM/YY"/></div>
                               <div className="flex-1"><label className="block text-xs text-gray-400 mb-1">CVC</label><input required maxLength={3} className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white font-mono placeholder:font-sans" placeholder="123"/></div>
                            </div>
                         </div>
                         <Button type="submit" disabled={isProcessing} className="w-full">{isProcessing ? 'Processing...' : 'Subscribe - $5/mo'}</Button>
                      </form>
                   )}
                 </Dialog.Content>
               </Dialog.Portal>
             </Dialog.Root>
          </motion.div>
       </div>
    </div>
  );
}
