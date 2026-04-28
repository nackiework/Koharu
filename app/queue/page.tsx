'use client';

import { useState, useMemo, useEffect } from 'react';
import { Paintbrush, Clock, CheckCircle, Users, Bell, RefreshCw, ClipboardList } from 'lucide-react';
import { QueueItem } from '@/components/queue-item';
import { SummaryCard } from '@/components/summary-card';
import { SearchBar } from '@/components/search-bar';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { currentUser, clientUser, QueueItem as QueueItemType } from '@/lib/data';

type FilterStatus = 'all' | 'doing' | 'waiting' | 'done';

export default function QueuePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [queues, setQueues] = useState<QueueItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);
  
  // Determine current user based on role
  const user = currentUser.role === 'admin' ? currentUser : clientUser;
  const isAdmin = user.role === 'admin';

  // For client view: find their queue item
  const clientQueueItem = useMemo(() => {
    if (isAdmin) return null;
    return queues.find(item => item.name.includes(user.name) || user.name.includes(item.name));
  }, [isAdmin, user, queues]);

  // Filter queue data based on search and status
  const filteredQueue = useMemo(() => {
    return queues.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.artworkType.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, filterStatus, queues]);

  // Calculate summary counts
  const summaryData = useMemo(() => {
    const doing = queues.filter(item => item.status === 'doing').length;
    const waiting = queues.filter(item => item.status === 'waiting').length;
    const done = queues.filter(item => item.status === 'done').length;
    const total = queues.length;
    return { doing, waiting, done, total };
  }, [queues]);

  // Sort queue: doing first, then waiting by position, then done
  const sortedQueue = useMemo(() => {
    return [...filteredQueue].sort((a, b) => {
      const statusOrder = { doing: 0, waiting: 1, done: 2 };
      if (statusOrder[a.status] !== statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return a.position - b.position;
    });
  }, [filteredQueue]);

  // Admin View
  if (isAdmin) {
    return (
      <main className="min-h-screen pb-12 bg-background">
        <div className="max-w-md mx-auto px-6 pt-8">
          {/* Admin Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1.5">
              <h1 className="text-2xl font-black text-[#89AAD7] tracking-tight">Check Q</h1>
            </div>
            <p className="text-sm font-medium text-slate-500">
              ดูและจัดการคิวลูกค้า
            </p>
            <div className="flex items-center gap-1.5 mt-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <RefreshCw className="w-3 h-3" />
              <span>อัปเดตล่าสุด 1 นาทีที่แล้ว</span>
            </div>
          </div>

          {/* Summary Cards - Horizontal Scroll */}
          <div className="mb-8 -mx-6 px-6">
            <div className="flex gap-4 overflow-x-auto pb-4 pt-2 scrollbar-hide snap-x">
              <div className="snap-start"><SummaryCard icon={Paintbrush} count={summaryData.doing} label="กำลังวาด" variant="doing" /></div>
              <div className="snap-start"><SummaryCard icon={Clock} count={summaryData.waiting} label="รอคิว" variant="waiting" /></div>
              <div className="snap-start"><SummaryCard icon={CheckCircle} count={summaryData.done} label="เสร็จแล้ว" variant="done" /></div>
              <div className="snap-start pr-6"><SummaryCard icon={Users} count={summaryData.total} label="คิวทั้งหมด" variant="total" /></div>
            </div>
          </div>

          {/* Search + Filter */}
          <div className="flex gap-3 mb-6 bg-white p-2 rounded-[2rem] border border-[#BAD1EC] shadow-sm">
            <div className="flex-1">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="ค้นหาชื่อลูกค้า..."
              />
            </div>
            <Select value={filterStatus} onValueChange={(val) => setFilterStatus(val as FilterStatus)}>
              <SelectTrigger className="w-[120px] h-12 rounded-[1.5rem] bg-slate-50 border-0 shadow-none font-bold text-sm text-slate-600 focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="ทั้งหมด" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-slate-100 shadow-xl">
                <SelectItem value="all" className="font-medium rounded-xl focus:bg-primary/10">ทั้งหมด</SelectItem>
                <SelectItem value="doing" className="font-medium rounded-xl focus:bg-primary/10">กำลังวาด</SelectItem>
                <SelectItem value="waiting" className="font-medium rounded-xl focus:bg-primary/10">รอคิว</SelectItem>
                <SelectItem value="done" className="font-medium rounded-xl focus:bg-primary/10">เสร็จแล้ว</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Queue List */}
          <div className="space-y-3 mb-8">
            {sortedQueue.length > 0 ? (
              sortedQueue.map((item) => (
                <QueueItem 
                  key={item.id} 
                  item={item}
                  showActions={true}
                />
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Paintbrush className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>ไม่พบข้อมูลที่ค้นหา</p>
              </div>
            )}
          </div>
        </div>
        

      </main>
    );
  }

  // Client View
  return (
    <main className="min-h-screen pb-12 bg-background">
      <div className="max-w-md mx-auto px-6 pt-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1.5">
            <h1 className="text-2xl font-black text-[#89AAD7] tracking-tight">Check Q</h1>
          </div>
          <p className="text-sm font-medium text-slate-500">
            ติดตามสถานะงานวาดของคุณ
          </p>
        </div>
        {/* Your Position Highlight */}
        {clientQueueItem && (
          <div className="bg-gradient-to-br from-[#C3E0F4] to-white rounded-[2rem] p-6 mb-8 border border-[#BAD1EC] shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <p className="text-sm font-bold text-slate-500 mb-2 relative z-10">คุณอยู่คิวที่</p>
            <div className="flex items-baseline gap-3 relative z-10">
              <span className="text-6xl font-black text-primary tracking-tighter">
                #{clientQueueItem.position || '-'}
              </span>
              {clientQueueItem.status === 'doing' && (
                <span className="px-3 py-1 bg-white text-[#0284C7] text-[10px] uppercase tracking-widest rounded-full font-black shadow-sm">
                  กำลังวาด
                </span>
              )}
              {clientQueueItem.status === 'done' && (
                <span className="px-3 py-1 bg-white text-slate-400 text-[10px] uppercase tracking-widest rounded-full font-black shadow-sm">
                  เสร็จแล้ว
                </span>
              )}
            </div>
            <div className="mt-5 pt-5 border-t border-slate-200/50 relative z-10">
              <div className="flex items-center gap-2">
                <Paintbrush className="w-4 h-4 text-[#0284C7]" />
                <span className="text-slate-700 font-bold">{clientQueueItem.artworkType}</span>
              </div>
              {clientQueueItem.deadline && (
                <p className="text-xs font-medium text-slate-500 mt-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  กำหนดส่ง: {new Date(clientQueueItem.deadline).toLocaleDateString('th-TH', { 
                    day: 'numeric', 
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Queue Summary */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 mb-8">
          <h2 className="font-black text-slate-800 mb-4 tracking-tight">สถานะคิวทั้งหมด</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 rounded-2xl bg-[#E3F0FA]">
              <div className="text-2xl font-black text-[#89AAD7] mb-1">{summaryData.doing}</div>
              <div className="text-[10px] font-bold text-[#5A7A9E] uppercase tracking-widest">กำลังวาด</div>
            </div>
            <div className="text-center p-3 rounded-2xl bg-[#E3F0FA]">
              <div className="text-2xl font-black text-[#A4BFDF] mb-1">{summaryData.waiting}</div>
              <div className="text-[10px] font-bold text-[#5A7A9E] uppercase tracking-widest">รอคิว</div>
            </div>
            <div className="text-center p-3 rounded-2xl bg-[#E3F0FA]">
              <div className="text-2xl font-black text-[#5A7A9E] mb-1">{summaryData.done}</div>
              <div className="text-[10px] font-bold text-[#5A7A9E] uppercase tracking-widest">เสร็จแล้ว</div>
            </div>
          </div>
        </div>

        {/* Queue List Preview */}
        <div className="mb-8">
          <h2 className="font-black text-slate-800 mb-4 tracking-tight">รายการคิว</h2>
          <div className="space-y-3">
            {sortedQueue.filter(item => item.status !== 'done').slice(0, 5).map((item) => (
              <QueueItem 
                key={item.id} 
                item={item}
                isCurrentUser={item.clientId === user.id || item.name === user.name}
              />
            ))}
          </div>
        </div>

        {/* Notification Box */}
        <div className="bg-[#F8FAFC] rounded-[2rem] p-6 border-2 border-dashed border-slate-200 mb-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 text-slate-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-600 leading-relaxed">
                เมื่อถึงคิวของคุณ เราจะแจ้งเตือนผ่านช่องทางที่คุณลงทะเบียนไว้
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-5 h-12 rounded-2xl border-slate-200 text-slate-600 font-bold hover:bg-slate-100/50"
          >
            ตั้งค่าการแจ้งเตือน
          </Button>
        </div>
      </div>
      

    </main>
  );
}
