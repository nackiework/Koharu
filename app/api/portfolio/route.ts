import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbywTSyD7cEgtNw5Zg_-CmK1iyMWzD-wHMQY3WHH1dDEyHh5LpDpHCQ-G_HLzFMUqrZFwg/exec';
    
    let response;
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        response = await fetch(SCRIPT_URL, { 
          next: { revalidate: 0 },
          cache: 'no-store',
          signal: AbortSignal.timeout(15000) // 15s timeout
        });
        if (response.ok) break;
      } catch (e) {
        console.log(`Attempt ${attempts + 1} failed:`, e);
      }
      attempts++;
      if (attempts < maxAttempts) await new Promise(r => setTimeout(r, 1000));
    }
    
    if (!response || !response.ok) {
      throw new Error('Failed to fetch from Google Apps Script after multiple attempts');
    }
    
    const data = await response.json();
    
    // If data is from the new recursive script { success: true, data: { ... } }
    if (data.success && data.data) {
      return NextResponse.json(data);
    }

    // Fallback for categories format
    if (data.categories) {
      return NextResponse.json(data);
    }

    // Fallback for flat array format
    if (Array.isArray(data)) {
      const folders: any = {};
      data.forEach((item: any) => {
        const cat = item.category || 'General';
        if (!folders[cat]) {
          folders[cat] = { name: cat, folders: {}, images: [] };
        }
        folders[cat].images.push({
          id: item.id,
          name: item.title.replace(/สำเนาของ |Copy of /g, '').replace(/\.[^/.]+$/, "")
        });
      });
      return NextResponse.json({ 
        success: true, 
        data: { name: 'Root', folders, images: [] } 
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Portfolio API Error:', error);
    return NextResponse.json({ success: false, data: { name: 'Root', folders: {}, images: [] } }, { status: 500 });
  }
}
