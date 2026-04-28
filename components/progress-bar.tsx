'use client';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  className?: string;
}

export function ProgressBar({ value, className }: ProgressBarProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">Progress</span>
        <span className="text-sm font-medium">{value}%</span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#81C784] rounded-full transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
