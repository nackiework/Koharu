'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, Briefcase, Users, FileText, Sparkles, User, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Drawer, 
  DrawerContent, 
  DrawerTrigger, 
  DrawerClose,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';

// Reusing icons from BottomNav for consistency
function HeartHomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9 3c1.5 0 2.5.5 3 2 .5-1.5 1.5-2 3-2 2.5 0 5 2.5 5 5.5C20 13.5 12 21 12 21z" />
    </svg>
  );
}

const navItems = [
  { href: '/', icon: Home, label: 'หน้าหลัก', color: 'text-pastel-blue bg-pastel-blue-bg' },
  { href: '/commission', icon: Sparkles, label: 'Commission Rates', color: 'text-pastel-pink bg-pastel-pink-bg' },
  { href: '/portfolio', icon: Briefcase, label: 'ผลงาน (Portfolio)', color: 'text-pastel-orange bg-pastel-orange-bg' },
  { href: '/queue', icon: Users, label: 'เช็คคิว (Queue)', color: 'text-pastel-purple bg-pastel-purple-bg' },
  { href: '/tos', icon: FileText, label: 'ข้อตกลง (T.O.S)', color: 'text-pastel-green bg-pastel-green-bg' },
  { href: '/profile', icon: User, label: 'โปรไฟล์', color: 'text-slate-500 bg-slate-100' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-pastel-blue-bg flex items-center justify-center">
          <HeartHomeIcon className="w-5 h-5 text-pastel-blue" />
        </div>
        <span className="font-black text-slate-800 tracking-tight">Koharu</span>
      </Link>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 active:scale-90 transition-all border border-slate-100">
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
        </DrawerTrigger>
        <DrawerContent className="max-w-md mx-auto rounded-t-[2.5rem]">
          <DrawerHeader className="border-b border-slate-50 pb-6">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-xl font-black text-slate-800">Menu</DrawerTitle>
              <DrawerClose asChild>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          
          <div className="px-6 py-8 space-y-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl transition-all group active:scale-[0.98]",
                    isActive ? "bg-slate-50" : "hover:bg-slate-50/50"
                  )}
                >
                  <div className={cn(
                    "w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                    item.color
                  )}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className={cn(
                    "flex-1 font-bold",
                    isActive ? "text-slate-900" : "text-slate-600"
                  )}>
                    {item.label}
                  </span>
                  <ChevronRight className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-slate-400" : "text-slate-200"
                  )} />
                </Link>
              );
            })}
          </div>
          
          <div className="px-10 pb-10 text-center">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
              Koharu Art & Illustration
            </p>
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
