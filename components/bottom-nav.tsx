'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

// Custom Kawaii SVG Icons
function HeartHomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9 3c1.5 0 2.5.5 3 2 .5-1.5 1.5-2 3-2 2.5 0 5 2.5 5 5.5C20 13.5 12 21 12 21z" />
    </svg>
  );
}

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Star shape for portfolio */}
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}

function HeartBubbleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Queue - cute clipboard with heart */}
      <rect x="5" y="3" rx="2" width="14" height="18" />
      <path d="M9 3V1h6v2" />
      <path d="M12 10c1-1.5 3-1.5 3 .5s-3 4-3 4-3-2-3-4 2-2 3-.5z" />
    </svg>
  );
}

function RibbonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* T.O.S - cute scroll/ribbon */}
      <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
      <path d="M8 10h8" />
      <path d="M8 14h5" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}

function BunnyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Cute bunny face for Profile */}
      <circle cx="12" cy="14" r="6" />
      {/* Ears */}
      <path d="M9 8c-.5-3-1-6 0-6s2 3 1.5 6" />
      <path d="M15 8c.5-3 1-6 0-6s-2 3-1.5 6" />
      {/* Eyes */}
      <circle cx="10" cy="13" r="0.8" fill="currentColor" />
      <circle cx="14" cy="13" r="0.8" fill="currentColor" />
      {/* Mouth */}
      <path d="M11 15.5a1 1 0 002 0" />
    </svg>
  );
}

const navItems = [
  { href: '/', icon: HeartHomeIcon, label: 'Home' },
  { href: '/portfolio', icon: PaletteIcon, label: 'Portfolio' },
  { href: '/queue', icon: HeartBubbleIcon, label: 'Queue' },
  { href: '/tos', icon: RibbonIcon, label: 'T.O.S' },
  { href: '/profile', icon: BunnyIcon, label: 'Profile' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-50">
      <div className="max-w-md mx-auto flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all",
                isActive 
                  ? "text-primary scale-110" 
                  : "text-slate-400 hover:text-slate-600 active:scale-95"
              )}
            >
              <item.icon className={cn("w-6 h-6 transition-transform", isActive && "animate-[bounce_0.5s_ease-in-out]")} />
              <span className={cn(
                "text-[10px] font-bold tracking-wide",
                isActive ? "text-primary" : "text-slate-400"
              )}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
