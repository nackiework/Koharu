'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  Paintbrush, 
  Palette, 
  Sparkles, 
  Heart, 
  Star, 
  MessageCircle,
  ArrowLeft,
  ChevronRight,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { profileData } from '@/lib/data';

interface CommissionPackage {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
  features: string[];
}

const packages: CommissionPackage[] = [
  {
    id: 'chibi',
    title: 'Chibi Style',
    description: 'ตัวละครตัวจิ๋ว น่ารัก ตะมุตะมิ',
    price: 'เริ่มต้น 150.-',
    icon: Palette,
    color: 'text-pastel-pink',
    bgColor: 'bg-pastel-pink-bg',
    borderColor: 'border-pastel-pink/20',
    features: ['ขนาด 1000x1000 px', 'พื้นหลังสีพื้น/ใส', 'แก้ได้ 2 ครั้ง'],
  },
  {
    id: 'bustup',
    title: 'Bust-up',
    description: 'ภาพวาดตั้งแต่ช่วงหัวถึงหน้าอก',
    price: 'เริ่มต้น 350.-',
    icon: Heart,
    color: 'text-pastel-purple',
    bgColor: 'bg-pastel-purple-bg',
    borderColor: 'border-pastel-purple/20',
    features: ['ขนาด A4 300dpi', 'ลงสีเต็มรูปแบบ', 'ส่งไฟล์ PNG/JPG'],
  },
  {
    id: 'halfbody',
    title: 'Half-body',
    description: 'ภาพวาดตั้งแต่ช่วงหัวถึงเอว',
    price: 'เริ่มต้น 550.-',
    icon: Paintbrush,
    color: 'text-pastel-blue',
    bgColor: 'bg-pastel-blue-bg',
    borderColor: 'border-pastel-blue/20',
    features: ['รายละเอียดเสื้อผ้าครบ', 'โพสท่าตามสั่ง', 'ใช้เชิงพาณิชย์ x2'],
  },
  {
    id: 'fullbody',
    title: 'Full-body',
    description: 'ภาพวาดเต็มตัว ตั้งแต่หัวจรดเท้า',
    price: 'เริ่มต้น 850.-',
    icon: Sparkles,
    color: 'text-pastel-green',
    bgColor: 'bg-pastel-green-bg',
    borderColor: 'border-pastel-green/20',
    features: ['รายละเอียดจัดเต็ม', 'พร็อพไม่ซับซ้อนฟรี', 'แถมไฟล์สเก็ตช์'],
  },
];

export default function CommissionPage() {
  return (
    <main className="min-h-screen pb-12 bg-background">
      <div className="max-w-md mx-auto px-5 pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/"
            className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 active:scale-90 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-slate-500" />
          </Link>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">Commission</h1>
          <div className="w-10 h-10" /> {/* Spacer */}
        </div>

        {/* Hero Section */}
        <div className="relative rounded-[2.5rem] overflow-hidden mb-8 shadow-xl shadow-primary/5">
          <div className="absolute inset-0 bg-gradient-to-br from-[#BAD1EC] to-[#E3F0FA]" />
          <div className="relative z-10 p-8 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden mb-4 shadow-lg">
              <Image 
                src={profileData.avatar} 
                alt="Artist" 
                width={80} 
                height={80} 
                className="object-cover"
              />
            </div>
            <h2 className="text-xl font-black text-slate-800 mb-1">ยินดีต้อนรับค่ะ! ✨</h2>
            <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[200px]">
              เลือกสไตล์ที่ชอบแล้วทักมาคุยรายละเอียดกันได้เลยนะคะ
            </p>
          </div>
        </div>

        {/* Commission Packages */}
        <div className="space-y-4 mb-8">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Package Menu</h3>
          {packages.map((pkg) => (
            <div 
              key={pkg.id}
              className={cn(
                "group relative bg-white rounded-[2rem] p-5 border-2 transition-all hover:shadow-md active:scale-[0.98]",
                pkg.borderColor
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110",
                  pkg.bgColor
                )}>
                  <pkg.icon className={cn("w-7 h-7", pkg.color)} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-black text-slate-800">{pkg.title}</h4>
                    <span className={cn("text-xs font-black px-3 py-1 rounded-full", pkg.bgColor, pkg.color)}>
                      {pkg.price}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">{pkg.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {pkg.features.map((feat, i) => (
                      <span key={i} className="text-[9px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md flex items-center gap-1">
                        <Star className="w-2 h-2 fill-current" /> {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How to order */}
        <div className="bg-[#FFF9F0] rounded-[2rem] p-6 border-2 border-[#FFEBCD] mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#FFB74D]/20 flex items-center justify-center">
              <Info className="w-5 h-5 text-[#FFB74D]" />
            </div>
            <h3 className="font-black text-slate-800">วิธีสั่งงาน</h3>
          </div>
          <ul className="space-y-3">
            {[
              'เลือกแพ็กเกจที่ต้องการ',
              'ทักแชทสอบถามคิวว่าง',
              'บรีฟรายละเอียดและส่ง Reference',
              'ชำระมัดจำเพื่อยืนยันคิว'
            ].map((step, i) => (
              <li key={i} className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[10px] font-black text-[#FFB74D] border border-[#FFEBCD]">
                  {i + 1}
                </div>
                {step}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <a 
          href={profileData.socials.line}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full py-5 rounded-[2rem] bg-[#89AAD7] text-white font-black text-sm shadow-lg shadow-[#89AAD7]/20 hover:bg-[#7899C6] transition-all active:scale-95 mb-4"
        >
          <MessageCircle className="w-5 h-5" />
          สั่งงานทาง Line
        </a>
        <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          หรือติดต่อทาง Facebook / IG ในหน้า Profile
        </p>
      </div>


    </main>
  );
}
