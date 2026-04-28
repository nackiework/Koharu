"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Briefcase,
  FileText,
  ArrowRight,
  Sparkles,
  Settings,
  Share2,
  Paintbrush,
  Clock
} from "lucide-react";
import { toast } from "sonner";
import { BottomNav } from "@/components/bottom-nav";
import { profileData, clientUser, portfolioData, QueueItem } from "@/lib/data";

export default function HomePage() {
  const [queues, setQueues] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueues = () => {
      fetch('/api/queue')
        .then(res => res.json())
        .then(data => {
          setQueues(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    };

    fetchQueues(); // Initial fetch

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchQueues, 30000);
    return () => clearInterval(interval);
  }, []);

  const user = clientUser;
  const totalQueue = queues.length;
  const activeQueue = queues.filter((q) => q.status !== "done").length;
  const doneQueue = queues.filter((q) => q.status === "done").length;
  const currentlyDoing = queues.find((q) => q.status === "doing");

  const activeQueues = queues
    .filter(q => q.status === 'waiting')
    .sort((a, b) => a.position - b.position);
  const nextUp = activeQueues[0];
  const isUserNext = nextUp?.name === user.name;

  const handleShare = () => {
    const url = window.location.origin;
    navigator.clipboard.writeText(url);
    toast.success("คัดลอกลิงก์เว็บไซต์เรียบร้อยแล้ว!");
  };

  return (
    <main className="min-h-screen pb-24 bg-background">
      <div className="max-w-md mx-auto">
        {/* Hero Header */}
        <div className="px-6 pt-8 pb-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-[1.2rem] overflow-hidden border-2 border-white shadow-lg shadow-primary/10">
                <Image
                  src={profileData.avatar}
                  alt={profileData.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-none">Koharu</h1>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Art & Illustration</p>
              </div>
            </div>
            <button
              onClick={handleShare}
              className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md active:scale-90 transition-all"
            >
              <Share2 className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* Status Banner */}
          <div className="rounded-[2rem] relative overflow-hidden shadow-xl shadow-primary/10 mb-8">
            {/* Background Image */}
            <Image
              src="/baby-blue-banner.jpg"
              alt="Status Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-blue-900/50" />

            <div className="relative z-10 p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-bold text-white/90">Queue Status</span>
                </div>
                <Link
                  href="/queue"
                  className="bg-white/95 backdrop-blur-sm text-slate-700 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg active:scale-95 transition-all hover:bg-white"
                >
                  View All <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                  <p className="text-3xl font-black text-white mb-1">{totalQueue}</p>
                  <p className="text-[9px] text-white/70 font-bold uppercase tracking-widest">Total</p>
                </div>
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                  <p className="text-3xl font-black text-white mb-1">{activeQueue}</p>
                  <p className="text-[9px] text-white/70 font-bold uppercase tracking-widest">Active</p>
                </div>
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                  <p className="text-3xl font-black text-white mb-1">{doneQueue}</p>
                  <p className="text-[9px] text-white/70 font-bold uppercase tracking-widest">Done</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Menu */}
          <div className="mb-8">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-1">Menu</h2>
            <div className="grid grid-cols-4 gap-3">
              <Link href="/queue" className="flex flex-col items-center gap-2.5 group active:scale-90 transition-all">
                <div className="w-14 h-14 rounded-[1.2rem] bg-[#C3E0F4] flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#BAD1EC]/50 transition-all">
                  <Users className="w-6 h-6 text-[#89AAD7]" />
                </div>
                <span className="text-[10px] font-bold text-[#2C3E5A]">Check Q</span>
              </Link>

              <Link href="/portfolio" className="flex flex-col items-center gap-2.5 group active:scale-90 transition-all">
                <div className="w-14 h-14 rounded-[1.2rem] bg-[#BAD1EC] flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#A4BFDF]/50 transition-all">
                  <Briefcase className="w-6 h-6 text-[#2C3E5A]" />
                </div>
                <span className="text-[10px] font-bold text-[#2C3E5A]">Portfolio</span>
              </Link>

              <Link href="/tos" className="flex flex-col items-center gap-2.5 group active:scale-90 transition-all">
                <div className="w-14 h-14 rounded-[1.2rem] bg-[#A4BFDF] flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#89AAD7]/50 transition-all">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] font-bold text-[#2C3E5A]">T.O.S</span>
              </Link>

              <Link href="/admin" className="flex flex-col items-center gap-2.5 group active:scale-90 transition-all">
                <div className="w-14 h-14 rounded-[1.2rem] bg-[#89AAD7] flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#89AAD7]/50 transition-all">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] font-bold text-[#2C3E5A]">Settings</span>
              </Link>
            </div>
          </div>

          {/* Live Activity */}
          <div className="mb-6">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-1">Live Update</h2>

            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
              {/* Currently Doing */}
              <div className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#C3E0F4] flex items-center justify-center flex-shrink-0">
                  <Paintbrush className="w-5 h-5 text-[#89AAD7]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-[#5A7A9E] uppercase tracking-widest mb-0.5">Now Working</p>
                  <p className="text-sm font-black text-[#2C3E5A] truncate">{currentlyDoing?.name || "—"}</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C3E0F4] rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#89AAD7] animate-pulse" />
                  <span className="text-[10px] font-black text-[#89AAD7] uppercase tracking-widest">Live</span>
                </div>
              </div>

              <div className="h-px bg-slate-100 mx-5" />

              {/* Next Up */}
              <div className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#BAD1EC] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#2C3E5A]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-[#5A7A9E] uppercase tracking-widest mb-0.5">Next Up</p>
                  <p className="text-sm font-black text-[#2C3E5A] truncate">
                    {isUserNext ? "You're Next! 🎉" : (nextUp?.name || "—")}
                  </p>
                </div>
                <span className="text-[10px] font-black text-[#89AAD7] bg-[#C3E0F4] px-3 py-1.5 rounded-full uppercase tracking-widest">
                  Pending
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
