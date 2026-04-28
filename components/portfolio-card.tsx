'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { PortfolioItem } from '@/lib/data';

interface PortfolioCardProps {
  item: PortfolioItem;
  className?: string;
}

export function PortfolioCard({ item, className }: PortfolioCardProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // The most certain way: Proxy through our own server
  const imageUrl = `/api/portfolio/image?id=${item.id}`;

  // Clean up title: remove "สำเนาของ", "Copy of", and extensions
  const displayTitle = item.title
    .replace(/สำเนาของ\s?/g, '')
    .replace(/Copy of\s?/g, '')
    .replace(/\.[^/.]+$/, "");

  return (
    <div 
      className={cn(
        "group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-primary/5 flex flex-col h-full animate-in fade-in slide-in-from-bottom-4",
        className
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
        {!loaded && !error && (
          <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
            <span className="text-[10px] font-bold text-slate-400 animate-pulse uppercase tracking-widest">Loading</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>
        )}
        <Image
          src={error ? '/placeholder.svg' : imageUrl}
          alt={item.title}
          fill
          unoptimized={true}
          className={cn(
            "object-cover transition-all duration-1000 group-hover:scale-110",
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
          onLoadingComplete={() => setLoaded(true)}
          onError={() => {
            setError(true);
            setLoaded(true);
          }}
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        
        {/* Category Badge on Image */}
        <div className="absolute top-2 left-2">
          <span className="px-2 py-0.5 bg-white/80 backdrop-blur-md text-[9px] font-bold text-primary rounded-full shadow-sm border border-white/50">
            {item.category}
          </span>
        </div>
      </div>
      <div className="p-3 flex-1 flex flex-col justify-between">
        <h3 className="text-xs font-bold text-foreground line-clamp-2 leading-tight hover:text-primary transition-colors cursor-default">
          {displayTitle}
        </h3>
      </div>
    </div>
  );
}
