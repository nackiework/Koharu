"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Settings, Image as ImageIcon, Users, ArrowLeft, Lock, ExternalLink, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { BottomNav } from '@/components/bottom-nav';

const adminOptions = [
  { 
    href: 'https://drive.google.com/drive/folders/1N84ehpXya4utsPzW4bCcM1BCknX_-zjr', 
    icon: ImageIcon, 
    label: 'จัดการผลงาน (Drive)', 
    desc: 'เปิด Google Drive เพื่อจัดการรูปภาพ',
    color: 'bg-blue-500'
  },
  { 
    href: 'https://docs.google.com/spreadsheets/d/1YSq25PtIcs7H5qhlgQpvnjlKsUlu-kUiGEDOlYUBd_s/edit', 
    icon: Users, 
    label: 'จัดการคิวงาน (Sheets)', 
    desc: 'เปิด Google Sheets เพื่ออัปเดตคิว',
    color: 'bg-green-500'
  },
];

export default function AdminHubPage() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'koharu') {
      setIsAuthorized(true);
      toast.success('ยินดีต้อนรับครับแอดมิน! ✨');
    } else {
      toast.error('รหัสผ่านไม่ถูกต้องครับ');
    }
  };

  if (!isAuthorized) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-sm bg-white rounded-[32px] p-8 shadow-xl border border-slate-100 text-center space-y-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800">Admin Login</h1>
            <p className="text-sm text-slate-400">กรุณาใส่รหัสผ่านเพื่อเข้าสู่ระบบจัดการ</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="รหัสผ่าน..." 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 px-6 rounded-2xl border-2 border-slate-100 bg-slate-50 text-center font-bold focus:border-primary outline-none transition-all"
            />
            <button type="submit" className="w-full h-14 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/30 active:scale-95 transition-all">
              เข้าสู่ระบบ
            </button>
          </form>
          <Link href="/" className="inline-block text-xs text-slate-400 hover:text-primary underline">กลับไปหน้าแรก</Link>
        </div>
        <BottomNav />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
      <div className="max-w-md mx-auto px-6 pt-8 text-center sm:text-left">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/profile" className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="text-left">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Admin Hub</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
              ยินดีต้อนรับคุณ Koharu <Sparkles className="w-2.5 h-2.5 text-primary" />
            </p>
          </div>
        </div>

        {/* Admin Options Grid */}
        <div className="space-y-4">
          {adminOptions.map((option) => (
            <a 
              key={option.label}
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 active:scale-[0.98] transition-all hover:shadow-md"
            >
              <div className={`w-14 h-14 rounded-2xl ${option.color} flex items-center justify-center text-white shadow-lg shadow-current/20 group-hover:scale-110 transition-transform`}>
                <option.icon className="w-7 h-7" />
              </div>
              <div className="flex-1 text-left">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  {option.label}
                  <ExternalLink className="w-4 h-4 opacity-30" />
                </h2>
                <p className="text-sm text-slate-400">{option.desc}</p>
              </div>
            </a>
          ))}
        </div>

        <button 
          onClick={() => setIsAuthorized(false)}
          className="mt-12 text-xs font-bold text-slate-400 hover:text-red-400 transition-colors uppercase tracking-widest"
        >
          ออกจากระบบ (Logout)
        </button>
      </div>

      <BottomNav />
    </main>
  );
}
