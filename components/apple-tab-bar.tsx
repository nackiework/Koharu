'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, Users, Sparkles, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/', icon: Home, label: 'Home', color: 'text-pastel-blue', bgColor: 'bg-pastel-blue-bg' },
  { href: '/commission', icon: Sparkles, label: 'Comms', color: 'text-pastel-pink', bgColor: 'bg-pastel-pink-bg' },
  { href: '/portfolio', icon: Briefcase, label: 'Works', color: 'text-pastel-orange', bgColor: 'bg-pastel-orange-bg' },
  { href: '/queue', icon: Users, label: 'Queue', color: 'text-pastel-purple', bgColor: 'bg-pastel-purple-bg' },
  { href: '/profile', icon: User, label: 'Profile', color: 'text-slate-500', bgColor: 'bg-slate-100' },
];

export function AppleTabBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 px-6 pointer-events-none">
      <nav className="max-w-md mx-auto h-20 bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.05)] rounded-[2.5rem] flex items-center justify-between px-3 pointer-events-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex items-center justify-center transition-all duration-300"
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-300",
                  isActive ? cn(item.bgColor, item.color) : "text-slate-400"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-all duration-300",
                  isActive ? "scale-110" : "scale-100"
                )} />
                
                {isActive && (
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </motion.div>
              
              {/* Highlight bar for active state if needed, but the expanding BG is enough */}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
