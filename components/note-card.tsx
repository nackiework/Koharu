'use client';

import { cn } from '@/lib/utils';
import { User, Shield } from 'lucide-react';
import type { Note } from '@/lib/data';

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  const isAdmin = note.sender === 'admin';
  
  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div 
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            isAdmin ? "bg-primary/10 text-primary" : "bg-accent text-muted-foreground"
          )}
        >
          {isAdmin ? <Shield className="w-5 h-5" /> : <User className="w-5 h-5" />}
        </div>
        <div>
          <p className="font-medium capitalize">{note.sender}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(note.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
        </div>
      </div>
      <p className="text-foreground leading-relaxed">{note.message}</p>
    </div>
  );
}
