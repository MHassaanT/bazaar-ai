'use client';
import { useAuth } from '@/lib/auth-context';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { motion } from 'framer-motion';
import { User, LogOut, Settings, LayoutDashboard, History, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function UserMenu() {
  const { user, signOut } = useAuth();
  const [creditsText, setCreditsText] = useState('...');
  
  useEffect(() => {
    if (user) {
      api.get('/api/users/me').then(res => {
        const data = res.data;
        if (data.plan === 'pro') {
          setCreditsText('∞');
        } else {
          setCreditsText(`${data.credits_remaining} / ${data.credits_total}`);
        }
      }).catch(() => setCreditsText('?'));
    }
  }, [user]);

  if (!user) return null;

  const initials = user.displayName ? user.displayName.substring(0, 2).toUpperCase() : 'U';

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-3 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors focus:outline-none">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-medium text-white shadow-lg overflow-hidden">
            {user.photoURL ? <img src={user.photoURL} alt="avatar" /> : initials}
          </div>
          <div className="flex flex-col items-start hidden sm:flex">
            <span className="text-sm font-medium text-white leading-tight">{user.displayName || 'User'}</span>
            <span className="text-xs text-blue-400 font-medium flex items-center gap-1">
              <Zap size={10} fill="currentColor" /> {creditsText} Credits
            </span>
          </div>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content 
          className="min-w-[220px] bg-[#060b18] border border-white/10 rounded-xl p-2 shadow-2xl z-50 text-white animate-in slide-in-from-top-2 fade-in"
          sideOffset={8}
          align="end"
        >
          <div className="px-2 py-2 mb-2 border-b border-white/10 sm:hidden">
             <span className="block text-sm font-medium text-white truncate">{user.displayName || 'User'}</span>
             <span className="block text-xs text-blue-400 mt-1 flex items-center gap-1"><Zap size={10} fill="currentColor" /> {creditsText} Credits</span>
          </div>

          <DropdownMenu.Item className="outline-none">
            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
              <LayoutDashboard size={16} className="text-gray-400" />
              Dashboard
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Item className="outline-none">
            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
              <History size={16} className="text-gray-400" />
              My History
            </Link>
          </DropdownMenu.Item>
          
          <DropdownMenu.Item className="outline-none">
             <div className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-white/10 cursor-pointer transition-colors text-gray-400">
               <Settings size={16} />
               Settings (Soon)
             </div>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="h-px bg-white/10 my-2" />

          <DropdownMenu.Item className="outline-none" onClick={signOut}>
            <div className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-red-500/10 text-red-400 cursor-pointer transition-colors">
              <LogOut size={16} />
              Sign Out
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
