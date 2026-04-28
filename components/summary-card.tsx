import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  icon: LucideIcon;
  count: number;
  label: string;
  variant?: 'doing' | 'waiting' | 'done' | 'total';
}

export function SummaryCard({ icon: Icon, count, label, variant = 'total' }: SummaryCardProps) {
  const variants = {
    doing: 'bg-[#C3E0F4] text-[#2C3E5A] shadow-sm',
    waiting: 'bg-[#BAD1EC] text-[#2C3E5A] shadow-sm',
    done: 'bg-[#E3F0FA] border border-[#BAD1EC] text-[#5A7A9E] shadow-sm',
    total: 'bg-white border border-[#BAD1EC] text-[#2C3E5A] shadow-sm',
  };

  const iconVariants = {
    doing: 'bg-white/60 text-[#89AAD7]',
    waiting: 'bg-white/60 text-[#A4BFDF]',
    done: 'bg-white text-[#A4BFDF]',
    total: 'bg-[#E3F0FA] text-[#89AAD7]',
  };

  return (
    <div className={cn(
      "flex-shrink-0 w-[120px] p-5 rounded-[2rem]",
      variants[variant]
    )}>
      <div className={cn(
        "w-10 h-10 rounded-2xl flex items-center justify-center mb-3",
        iconVariants[variant]
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-3xl font-black tracking-tight">{count}</p>
      <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mt-1">{label}</p>
    </div>
  );
}

