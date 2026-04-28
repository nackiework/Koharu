'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/', image: '/icons/bunny.jpg', label: 'Home', color: 'text-pastel-blue', bgColor: 'bg-pastel-blue-bg' },
  { href: '/commission', image: '/icons/milk.jpg', label: 'Comms', color: 'text-pastel-pink', bgColor: 'bg-pastel-pink-bg' },
  { href: '/portfolio', image: '/icons/book.jpg', label: 'Works', color: 'text-pastel-orange', bgColor: 'bg-pastel-orange-bg' },
  { href: '/queue', image: '/icons/fluffy.jpg', label: 'Queue', color: 'text-pastel-purple', bgColor: 'bg-pastel-purple-bg' },
  { href: '/profile', image: '/icons/cat.jpg', label: 'Profile', color: 'text-slate-500', bgColor: 'bg-slate-100' },
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
                  "flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300",
                  isActive ? cn(item.bgColor, item.color) : "text-slate-400"
                )}
              >
                <div className={cn(
                  "relative w-7 h-7 overflow-hidden rounded-xl transition-all duration-300 shadow-sm",
                  isActive ? "scale-110 ring-2 ring-white/50" : "scale-100 opacity-70 grayscale-[0.2]"
                )}>
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {isActive && (
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap overflow-hidden mr-1"
                  >
                    {item.label}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
