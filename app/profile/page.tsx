import Image from 'next/image';
import Link from 'next/link';
import { User, Briefcase, Users, MessageSquare, Settings, ChevronRight, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { BottomNav } from '@/components/bottom-nav';
import { StatusBadge } from '@/components/status-badge';
import { cn } from '@/lib/utils';
import { profileData } from '@/lib/data';

const menuItems = [
  { href: '#', icon: User, label: 'Personal Info', color: 'bg-purple-50 text-purple-400' },
  { href: '/portfolio', icon: Briefcase, label: 'Portfolio', color: 'bg-orange-50 text-orange-400' },
  { href: '/admin', icon: Settings, label: 'Settings (Admin)', color: 'bg-blue-50 text-blue-400' },
  { href: '/queue', icon: Users, label: 'My Queue', color: 'bg-emerald-50 text-emerald-400' },
];

export default function ProfilePage() {
  return (
    <main className="min-h-screen pb-24">
      <div className="max-w-md mx-auto px-6 pt-8">
        {/* Header */}


        {/* Profile Card */}
        <div className="bg-card rounded-3xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-20 h-20">
              <Image
                src={profileData.avatar}
                alt={profileData.name}
                fill
                className="object-cover rounded-full border-2 border-primary/20"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{profileData.name}</h2>
              <p className="text-muted-foreground text-sm">{profileData.subtitle}</p>
            </div>
          </div>

          {/* Social Links Row */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <a 
              href={profileData.socials?.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-[#E3F2FD] text-[#89AAD7] hover:bg-[#E3F2FD]/80 transition-all active:scale-95 shadow-sm"
            >
              <Facebook className="w-5 h-5" />
              <span className="text-xs font-bold">FB</span>
            </a>
            <a 
              href={profileData.socials?.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-[#FFF1F2] text-[#F2C1D1] hover:bg-[#FFF1F2]/80 transition-all active:scale-95 shadow-sm"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-xs font-bold">IG</span>
            </a>
            <a 
              href={profileData.socials?.line} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-[#F0FDF4] text-[#B8D8BE] hover:bg-[#F0FDF4]/80 transition-all active:scale-95 shadow-sm"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs font-bold">Line</span>
            </a>
          </div>
        </div>

        {/* Menu List */}
        <div className="bg-card rounded-3xl overflow-hidden shadow-sm">
          {menuItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors group ${
                index !== menuItems.length - 1 ? 'border-b border-slate-50' : ''
              }`}
            >
              <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", item.color)}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="flex-1 font-medium text-foreground">{item.label}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          ))}
        </div>

        {/* App Info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Koharu Queue Tracker v1.0
          </p>
        </div>
      </div>
      
      <BottomNav />
    </main>
  );
}
