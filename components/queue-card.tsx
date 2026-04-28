'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { QueueItem } from '@/lib/data';

interface QueueCardProps {
  item: QueueItem;
  isCurrentUser?: boolean;
}

export function QueueCard({ item, isCurrentUser }: QueueCardProps) {
  const statusColors = {
    doing: 'bg-[#81C784] text-white',
    waiting: 'bg-[#FFD54F] text-[#3D3D3D]',
    done: 'bg-muted text-muted-foreground',
  };

  const statusLabels = {
    doing: 'In Progress',
    waiting: 'Waiting',
    done: 'Completed',
  };

  return (
    <Link href={`/queue/${item.id}`}>
      <div 
        className={cn(
          "flex items-center gap-4 p-4 rounded-2xl transition-all",
          isCurrentUser 
            ? "bg-primary/10 border-2 border-primary/30" 
            : "bg-card hover:bg-accent"
        )}
      >
        <div 
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg",
            item.status === 'doing' ? "bg-[#81C784] text-white" : "bg-muted text-muted-foreground"
          )}
        >
          {item.position}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className={cn(
            "font-medium truncate",
            isCurrentUser && "text-primary"
          )}>
            {item.name} {isCurrentUser && '(You)'}
          </p>
          {item.projectName && (
            <p className="text-sm text-muted-foreground truncate">{item.projectName}</p>
          )}
        </div>
        
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap",
          statusColors[item.status]
        )}>
          {statusLabels[item.status]}
        </span>
      </div>
    </Link>
  );
}
