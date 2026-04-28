'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Paintbrush, Palette, PenTool, MessageSquare, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { QueueItem as QueueItemType } from '@/lib/data';

interface QueueItemProps {
  item: QueueItemType;
  isCurrentUser?: boolean;
  showActions?: boolean;
  onStartDrawing?: (id: number) => void;
  onMarkDone?: (id: number) => void;
}

export function QueueItem({ item, isCurrentUser, showActions, onStartDrawing, onMarkDone }: QueueItemProps) {
  const statusColors = {
    doing: 'bg-secondary text-foreground',
    waiting: 'bg-accent text-foreground',
    done: 'bg-background text-muted-foreground',
  };

  const statusLabels = {
    doing: 'กำลังวาด',
    waiting: 'รอคิว',
    done: 'เสร็จแล้ว',
  };

  const artworkTypeIcons = {
    'ภาพเหมือน': Paintbrush,
    'chibi': Palette,
    'illustration': PenTool,
    'ภาพครึ่งตัว': Paintbrush,
    'ภาพเต็มตัว': Paintbrush,
  };

  const ArtworkIcon = artworkTypeIcons[item.artworkType] || Paintbrush;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
  };

  const content = (
    <div 
      className={cn(
        "flex items-center gap-4 p-5 rounded-[2rem] transition-all",
        isCurrentUser 
          ? "bg-primary/5 border-2 border-primary/20 shadow-sm" 
          : "bg-white border border-slate-100 shadow-sm hover:shadow-md"
      )}
    >
      {/* Queue Number */}
      <div 
        className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm flex-shrink-0",
          item.status === 'doing' 
            ? "bg-[#C3E0F4] text-[#89AAD7]" 
            : item.status === 'done'
            ? "bg-[#E3F0FA] text-[#A4BFDF]"
            : "bg-[#BAD1EC] text-[#2C3E5A]"
        )}
      >
        {item.status === 'done' ? '✓' : `#${item.position}`}
      </div>

      {/* Soft Pastel Status Heart */}
      <div className={cn(
        "relative w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-white shadow-sm overflow-hidden transition-all duration-500 group-hover:scale-110",
        item.status === 'doing' 
          ? "bg-pastel-blue-bg" 
          : item.status === 'done'
          ? "bg-pastel-green-bg"
          : "bg-pastel-pink-bg"
      )}>
        <Heart className={cn(
          "w-5 h-5 fill-current transition-transform duration-700",
          item.status === 'doing' 
            ? "text-pastel-blue" 
            : item.status === 'done'
            ? "text-pastel-green"
            : "text-pastel-pink"
        )} />
      </div>
      
      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={cn(
            "font-semibold truncate text-sm",
            isCurrentUser && "text-primary"
          )}>
            {item.name}
          </p>
          {isCurrentUser && (
            <span className="px-2 py-0.5 bg-primary text-primary-foreground text-[10px] rounded-full font-medium">
              คุณ
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <MessageSquare className="w-3 h-3 text-muted-foreground" />
          <p className="text-xs text-muted-foreground truncate">
            {item.description || item.artworkType}
          </p>
        </div>
      </div>
      
      {/* Right Section */}
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        <span className={cn(
          "px-2.5 py-1 rounded-full text-[10px] font-medium",
          statusColors[item.status]
        )}>
          {statusLabels[item.status]}
        </span>
        <span className="text-[10px] text-muted-foreground">
          {formatDate(item.startDate)}
        </span>
      </div>
    </div>
  );

  if (showActions) {
    return (
      <div className="space-y-2">
        {content}
        {item.status !== 'done' && (
          <div className="flex gap-2 pl-14">
            {item.status === 'waiting' && onStartDrawing && (
              <button
                onClick={() => onStartDrawing(item.id)}
                className="text-xs px-3 py-1.5 rounded-full bg-[#A8D5BA]/20 text-[#2D5A3D] hover:bg-[#A8D5BA]/40 transition-colors"
              >
                เริ่มวาด
              </button>
            )}
            {item.status === 'doing' && onMarkDone && (
              <button
                onClick={() => onMarkDone(item.id)}
                className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-accent transition-colors"
              >
                เสร็จแล้ว
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link href={`/queue/${item.id}`}>
      {content}
    </Link>
  );
}
