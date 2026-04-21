"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';
import { Button, cn } from '../ui/Button';
import { useAuth } from '@/lib/auth-context';
import UserMenu from '@/components/auth/UserMenu';

const NavLink = ({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) => (
  <Link 
    href={href}
    className={cn(
      "relative px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap",
      active ? "text-blue-400" : "text-gray-400 hover:text-white"
    )}
  >
    {children}
    {active && (
      <motion.div 
        layoutId="nav-underline"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
      />
    )}
  </Link>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Predict', href: '/predict' },
    { name: 'Explore', href: '/explore' },
    { name: 'Smart AI', href: '/smart-recommendations' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
      isScrolled 
        ? "bg-[#060b18]/80 backdrop-blur-md border-white/[0.08] py-3" 
        : "bg-transparent border-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-2 rounded-lg group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all">
            <Zap size={20} className="text-white" fill="white" />
          </div>
          <span className="text-xl font-heading font-bold tracking-tight">
            Bazaar<span className="text-blue-500">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink 
              key={item.href} 
              href={item.href} 
              active={pathname === item.href}
            >
              {item.name}
            </NavLink>
          ))}
          <div className="ml-4 pl-4 border-l border-white/[0.1] flex items-center gap-3">
             <AuthActions />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0d1526] border-b border-white/[0.08] overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={cn(
                    "text-lg font-medium",
                    pathname === item.href ? "text-blue-400" : "text-gray-300"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <hr className="border-white/[0.06]" />
              <div onClick={() => setIsMobileMenuOpen(false)}>
                 <AuthActions mobile />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

function AuthActions({ mobile = false }: { mobile?: boolean }) {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />;
  
  if (user) {
    return (
       <div className={cn("flex", mobile ? "flex-col items-start gap-4" : "items-center")}>
         <UserMenu />
       </div>
    );
  }

  return (
    <div className={cn("flex gap-3", mobile ? "flex-col w-full" : "items-center")}>
      <Link href="/auth/login" className={mobile ? "w-full" : ""}>
         <Button variant="outline" className={mobile ? "w-full" : ""}>Sign In</Button>
      </Link>
      <Link href="/auth/signup" className={mobile ? "w-full" : ""}>
         <Button className={mobile ? "w-full" : ""}>Get Started</Button>
      </Link>
    </div>
  );
}

export default Navbar;
