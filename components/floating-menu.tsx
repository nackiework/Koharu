'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, Briefcase, Users, FileText, Sparkles, User, ChevronRight, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Drawer, 
  DrawerContent, 
  DrawerTrigger, 
  DrawerClose,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';

const navItems = [
  { href: '/', icon: Home, label: 'หน้าหลัก', color: 'text-pastel-blue bg-pastel-blue-bg' },
  { href: '/commission', icon: Sparkles, label: 'Commission Rates', color: 'text-pastel-pink bg-pastel-pink-bg' },
  { href: '/portfolio', icon: Briefcase, label: 'ผลงาน (Portfolio)', color: 'text-pastel-orange bg-pastel-orange-bg' },
  { href: '/queue', icon: Users, label: 'เช็คคิว (Queue)', color: 'text-pastel-purple bg-pastel-purple-bg' },
  { href: '/tos', icon: FileText, label: 'ข้อตกลง (T.O.S)', color: 'text-pastel-green bg-pastel-green-bg' },
  { href: '/profile', icon: User, label: 'โปรไฟล์', color: 'text-slate-500 bg-slate-100' },
];

export function FloatingMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button 
            className={cn(
              "w-14 h-14 flex items-center justify-center rounded-full shadow-2xl transition-all active:scale-90 animate-bounce-slow",
              open 
                ? "bg-slate-800 rotate-45" 
                : "bg-primary text-white hover:bg-primary/90"
            )}
            style={{ 
              animation: open ? 'none' : 'float 3s ease-in-out infinite',
              boxShadow: '0 10px 25px -5px rgba(137, 170, 215, 0.5)'
            }}
          >
            {open ? <Plus className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </DrawerTrigger>
        <DrawerContent className="max-w-md mx-auto rounded-t-[2.5rem]">
          <DrawerHeader className="border-b border-slate-50 pb-6 text-center">
            <DrawerTitle className="text-xl font-black text-slate-800">Menu</DrawerTitle>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Explore Koharu's World</p>
          </DrawerHeader>
          
          <div className="px-6 py-8 grid grid-cols-2 gap-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex flex-col items-center gap-3 p-5 rounded-[2rem] transition-all group active:scale-[0.95] border border-transparent",
                    isActive ? "bg-slate-50 border-slate-100" : "hover:bg-slate-50/50"
                  )}
                >
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-sm",
                    item.color
                  )}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest text-center",
                    isActive ? "text-slate-900" : "text-slate-500"
                  )}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
          
          <div className="px-10 pb-8 flex flex-col items-center">
            <DrawerClose asChild>
              <button className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
