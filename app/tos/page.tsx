'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { 
  ClipboardList, 
  Wallet, 
  Palette, 
  RefreshCw, 
  Clock, 
  Ban, 
  Mail,
  Heart,
  Check,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { profileData } from '@/lib/data';

interface TosSection {
  icon: React.ElementType;
  title: string;
  items: string[];
  iconColor: string;
  iconBg: string;
}

const tosSections: TosSection[] = [
  {
    icon: ClipboardList,
    title: 'การสั่งงาน',
    iconColor: 'text-pastel-pink',
    iconBg: 'bg-pastel-pink-bg',
    items: [
      'กรุณาแจ้งรายละเอียดงานให้ครบถ้วน',
      'ส่งรูปอ้างอิง (Reference) เพื่อความแม่นยำ',
      'ระบุประเภทงานที่ต้องการ (เช่น chibi / portrait)',
    ],
  },
  {
    icon: Wallet,
    title: 'การชำระเงิน',
    iconColor: 'text-pastel-green',
    iconBg: 'bg-pastel-green-bg',
    items: [
      'ชำระเงินก่อนเริ่มงาน (100% หรือมัดจำ 50%)',
      'ไม่สามารถขอคืนเงินได้หลังเริ่มงาน',
    ],
  },
  {
    icon: Palette,
    title: 'ขั้นตอนการทำงาน',
    iconColor: 'text-pastel-purple',
    iconBg: 'bg-pastel-purple-bg',
    items: [
      'เริ่มจากสเก็ตช์ → ลงสี → ส่งงาน',
      'ลูกค้าสามารถแก้ไขได้ในขั้นสเก็ตช์',
    ],
  },
  {
    icon: RefreshCw,
    title: 'การแก้ไขงาน',
    iconColor: 'text-pastel-blue',
    iconBg: 'bg-pastel-blue-bg',
    items: [
      'แก้ไขฟรี 2 ครั้ง',
      'เกินจากนี้มีค่าใช้จ่ายเพิ่มเติม',
    ],
  },
  {
    icon: Clock,
    title: 'ระยะเวลา',
    iconColor: 'text-pastel-orange',
    iconBg: 'bg-pastel-orange-bg',
    items: [
      'ใช้เวลาประมาณ 3–7 วัน',
      'ขึ้นอยู่กับจำนวนคิวในขณะนั้น',
      'แจ้งล่วงหน้าหากมีความล่าช้า',
    ],
  },
  {
    icon: Ban,
    title: 'ข้อห้าม',
    iconColor: 'text-destructive',
    iconBg: 'bg-destructive/10',
    items: [
      'ไม่รับงานเร่งด่วน',
      'ไม่รับงานที่ไม่เหมาะสม / ผิดกฎหมาย',
    ],
  },
  {
    icon: Mail,
    title: 'การติดต่อ',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
    items: [
      'ช่องทาง: Line / Email',
      'ตอบกลับภายใน 24 ชั่วโมง',
    ],
  },
];

export default function TosPage() {
  const [accepted, setAccepted] = useState(false);

  return (
    <main className="min-h-screen pb-12">
      <div className="max-w-md mx-auto px-5 pt-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/"
            className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 active:scale-90 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-slate-500" />
          </Link>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">ข้อตกลง (T.O.S)</h1>
        </div>
        {/* Sections */}
        <div className="space-y-4 mb-6">
          {tosSections.map((section, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-5 shadow-sm border border-border/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  section.iconBg
                )}>
                  <section.icon className={cn("w-5 h-5", section.iconColor)} />
                </div>
                <h2 className="font-semibold text-foreground">{section.title}</h2>
              </div>
              <ul className="space-y-2.5">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Highlight Box */}
        <div className="bg-gradient-to-r from-accent to-secondary rounded-2xl p-5 mb-6 border border-primary/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#F8B4C4]" />
            </div>
            <p className="text-sm text-foreground font-medium leading-relaxed">
              การสั่งงานถือว่าลูกค้ายอมรับเงื่อนไขทั้งหมดข้างต้น
            </p>
          </div>
        </div>

        {/* Accept Button */}
        <button
          onClick={() => setAccepted(!accepted)}
          className={cn(
            "w-full py-4 rounded-2xl font-semibold text-sm transition-all shadow-sm",
            accepted
              ? "bg-[#A8D5BA] text-white"
              : "bg-gradient-to-r from-primary to-blue-gradient-from text-white hover:opacity-90"
          )}
        >
          <span className="flex items-center justify-center gap-2">
            {accepted ? (
              <>
                <Check className="w-5 h-5" />
                ยอมรับเงื่อนไขแล้ว
              </>
            ) : (
              'ฉันยอมรับเงื่อนไข'
            )}
          </span>
        </button>

        {accepted && (
          <p className="text-center text-sm text-muted-foreground mt-3">
            ขอบคุณที่อ่านเงื่อนไขของเรา
          </p>
        )}
      </div>
      

    </main>
  );
}
