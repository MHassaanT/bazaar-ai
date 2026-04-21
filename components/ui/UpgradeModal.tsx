'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { Zap } from 'lucide-react';
import { Button } from './Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function UpgradeModal({ open, onOpenChange }: { open: boolean, onOpenChange: (o: boolean) => void }) {
  const router = useRouter();
  
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[#060b18]/90 backdrop-blur-sm z-50 animate-in fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0d1526] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl shadow-blue-500/10 z-50 animate-in zoom-in-95">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-amber-500 fill-current" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">You've used all 15 free predictions</h2>
            <p className="text-gray-400 mb-8 text-sm">
              Upgrade to Bazaar AI Pro to continue predicting markets with unlimited access and unlock Smart Recommendations.
            </p>
            
            <div className="flex flex-col w-full gap-3">
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-500" onClick={() => {onOpenChange(false); router.push('/pricing')}}>
                Upgrade to Pro →
              </Button>
              <Button size="lg" variant="outline" className="w-full" onClick={() => {onOpenChange(false); router.push('/dashboard')}}>
                View My History
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
