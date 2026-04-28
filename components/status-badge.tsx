'use client';

import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  isOpen: boolean;
  className?: string;
}

export function StatusBadge({ isOpen, className }: StatusBadgeProps) {
  return (
    <div 
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
        isOpen 
          ? "bg-[#81C784]/20 text-[#4CAF50]" 
          : "bg-[#E57373]/20 text-[#E57373]",
        className
      )}
    >
      <span 
        className={cn(
          "w-2 h-2 rounded-full",
          isOpen ? "bg-[#4CAF50]" : "bg-[#E57373]"
        )} 
      />
      {isOpen ? 'Open for Work' : 'Currently Busy'}
    </div>
  );
}
