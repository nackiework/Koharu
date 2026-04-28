'use client';

import Image from 'next/image';
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
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BottomNav } from '@/components/bottom-nav';

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
    iconColor: 'text-[#E8A4B8]',
    iconBg: 'bg-[#FFE4E9]',
    items: [
      'กรุณาแจ้งรายละเอียดงานให้ครบถ้วน',
      'ส่งรูปอ้างอิง (Reference) เพื่อความแม่นยำ',
      'ระบุประเภทงานที่ต้องการ (เช่น chibi / portrait)',
    ],
  },
  {
    icon: Wallet,
    title: 'การชำระเงิน',
    iconColor: 'text-[#A8D5BA]',
    iconBg: 'bg-[#E8F5E9]',
    items: [
      'ชำระเงินก่อนเริ่มงาน (100% หรือมัดจำ 50%)',
      'ไม่สามารถขอคืนเงินได้หลังเริ่มงาน',
    ],
  },
  {
    icon: Palette,
    title: 'ขั้นตอนการทำงาน',
    iconColor: 'text-[#B4A7D6]',
    iconBg: 'bg-[#EDE7F6]',
    items: [
      'เริ่มจากสเก็ตช์ → ลงสี → ส่งงาน',
      'ลูกค้าสามารถแก้ไขได้ในขั้นสเก็ตช์',
    ],
  },
  {
    icon: RefreshCw,
    title: 'การแก้ไขงาน',
    iconColor: 'text-[#90CAF9]',
    iconBg: 'bg-[#E3F2FD]',
    items: [
      'แก้ไขฟรี 2 ครั้ง',
      'เกินจากนี้มีค่าใช้จ่ายเพิ่มเติม',
    ],
  },
  {
    icon: Clock,
    title: 'ระยะเวลา',
    iconColor: 'text-[#FFB74D]',
    iconBg: 'bg-[#FFF3E0]',
    items: [
      'ใช้เวลาประมาณ 3–7 วัน',
      'ขึ้นอยู่กับจำนวนคิวในขณะนั้น',
      'แจ้งล่วงหน้าหากมีความล่าช้า',
    ],
  },
  {
    icon: Ban,
    title: 'ข้อห้าม',
    iconColor: 'text-[#E57373]',
    iconBg: 'bg-[#FFEBEE]',
    items: [
      'ไม่รับงานเร่งด่วน',
      'ไม่รับงานที่ไม่เหมาะสม / ผิดกฎหมาย',
    ],
  },
  {
    icon: Mail,
    title: 'การติดต่อ',
    iconColor: 'text-[#4DB6AC]',
    iconBg: 'bg-[#E0F2F1]',
    items: [
      'ช่องทาง: Line / Email',
      'ตอบกลับภายใน 24 ชั่วโมง',
    ],
  },
];

export default function TosPage() {
  const [accepted, setAccepted] = useState(false);

  return (
    <main className="min-h-screen pb-28">
      <div className="max-w-md mx-auto px-5 pt-8">


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
      
      <BottomNav />
    </main>
  );
}
