export type UserRole = 'admin' | 'client';

export interface User {
  id: number;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface QueueItem {
  id: number;
  clientId: number;
  name: string;
  position: number;
  status: 'waiting' | 'doing' | 'done';
  artworkType: 'ภาพเหมือน' | 'chibi' | 'illustration' | 'ภาพครึ่งตัว' | 'ภาพเต็มตัว';
  startDate?: string;
  deadline?: string;
  description?: string;
  progress?: number;
  avatar?: string;
  projectName?: string;
}

export interface Note {
  id: number;
  sender: 'admin' | 'client';
  message: string;
  date: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: 'Branding' | 'Social Media' | 'Print' | 'Web Design';
  image: string;
}

// Current user - change role to 'client' to see client view
export const currentUser: User = {
  id: 1,
  name: "Koharu",
  role: "admin", // Change to "client" to test client view
  avatar: "/profile.jpg"
};

// For testing client view - this would be the logged in client
export const clientUser: User = {
  id: 103,
  name: "Koharu",
  role: "client",
  avatar: "/profile.jpg"
};

export const queueData: QueueItem[] = [
  { 
    id: 1,
    clientId: 101,
    name: "สมชาย ใจดี", 
    position: 1, 
    status: "doing",
    artworkType: "ภาพเหมือน",
    startDate: "2026-04-15",
    deadline: "2026-04-30",
    description: "ภาพเหมือนครึ่งตัว พื้นหลังสีพาสเทล",
    progress: 60,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  { 
    id: 2,
    clientId: 102,
    name: "มานี รักเรียน", 
    position: 2, 
    status: "doing",
    artworkType: "chibi",
    startDate: "2026-04-20",
    deadline: "2026-05-05",
    description: "Chibi คู่รัก 2 ตัว พื้นหลังใส",
    progress: 30,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  },
  { 
    id: 3,
    clientId: 103,
    name: "Koharu", 
    position: 3, 
    status: "waiting",
    artworkType: "illustration",
    startDate: "2026-05-05",
    deadline: "2026-05-20",
    description: "Illustration ตัวละครแฟนตาซี",
    progress: 0,
    avatar: "/profile.jpg"
  },
  { 
    id: 4,
    clientId: 104,
    name: "นารี ดีใจ", 
    position: 4, 
    status: "waiting",
    artworkType: "ภาพเหมือน",
    startDate: "2026-05-12",
    deadline: "2026-05-27",
    description: "ภาพเหมือนเต็มตัว ชุดแต่งงาน",
    progress: 0,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
  },
  { 
    id: 5,
    clientId: 105,
    name: "ประยุทธ์ มั่นคง", 
    position: 0, 
    status: "done",
    artworkType: "chibi",
    startDate: "2026-03-10",
    deadline: "2026-03-25",
    description: "Chibi ครอบครัว 4 คน",
    progress: 100,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face"
  },
  { 
    id: 6,
    clientId: 106,
    name: "สุดา แสนสวย", 
    position: 0, 
    status: "done",
    artworkType: "ภาพครึ่งตัว",
    startDate: "2026-03-25",
    deadline: "2026-04-10",
    description: "ภาพครึ่งตัว สไตล์อนิเมะ",
    progress: 100,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
  },
  { 
    id: 7,
    clientId: 107,
    name: "กานต์ สว่างใจ", 
    position: 5, 
    status: "waiting",
    artworkType: "ภาพเต็มตัว",
    startDate: "2026-05-20",
    deadline: "2026-06-05",
    description: "ภาพเต็มตัว OC ตัวละครเกม",
    progress: 0,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  }
];

export const notesData: Note[] = [
  {
    id: 1,
    sender: "admin",
    message: "ขอบคุณที่รอนะคะ กำลังเริ่มสเก็ตช์ให้แล้วค่ะ",
    date: "2026-04-20"
  },
  {
    id: 2,
    sender: "client",
    message: "รอได้เลยค่ะ ไม่รีบ",
    date: "2026-04-21"
  },
  {
    id: 3,
    sender: "admin",
    message: "คาดว่าจะเริ่มวาดวันที่ 5 พ.ค. นะคะ",
    date: "2026-04-25"
  }
];

export const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: "Sunrise Coffee",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Nature's Path",
    category: "Social Media",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Urban Style",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Summer Campaign",
    category: "Social Media",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    title: "Annual Report",
    category: "Print",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    title: "Tech Startup",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
  }
];

export const profileData = {
  name: "Koharu",
  subtitle: "Artist / Illustrator",
  avatar: "/profile.jpg",
  isOpen: true,
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    line: "https://line.me"
  }
};
