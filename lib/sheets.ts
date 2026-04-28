import { QueueItem } from './data';

const SHEET_ID = '1YSq25PtIcs7H5qhlgQpvnjlKsUlu-kUiGEDOlYUBd_s';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

export async function getQueueFromSheets(): Promise<QueueItem[]> {
  try {
    const response = await fetch(CSV_URL, { 
      next: { revalidate: 0 },
      cache: 'no-store' 
    });
    if (!response.ok) throw new Error('Failed to fetch sheet data');
    
    const csvData = await response.text();
    const lines = csvData.split(/\r?\n/);
    
    let headerIndex = -1;
    let colMap: Record<string, number> = {};

    // 1. Find the header row
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      if (line.includes('name') && (line.includes('queue') || line.includes('finish'))) {
        headerIndex = i;
        const cols = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        cols.forEach((col, idx) => {
          const name = col.replace(/^"|"$/g, '').trim().toLowerCase();
          if (name === 'finish') colMap.finish = idx;
          if (name === 'queue') colMap.queue = idx;
          if (name === 'name') colMap.name = idx;
          if (name === 'contact') colMap.contact = idx;
          if (name === 'work') colMap.work = idx;
          if (name === 'status') colMap.status = idx;
          if (name === 'date') colMap.date = idx;
          if (name === 'deadline') colMap.deadline = idx;
        });
        break;
      }
    }

    // Fallback if header not found (use previous hardcoded indices)
    if (headerIndex === -1) {
      headerIndex = 6;
      colMap = { finish: 3, queue: 4, name: 5, contact: 6, work: 7, status: 10, date: 12, deadline: 13 };
    }

    const queueItems: QueueItem[] = [];
    
    // 2. Parse data rows
    for (let i = headerIndex + 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const row = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      const name = row[colMap.name]?.replace(/^"|"$/g, '').trim();
      
      if (!name || name === '') continue;
      
      const finish = row[colMap.finish]?.replace(/^"|"$/g, '').trim().toUpperCase() === 'TRUE';
      const positionStr = row[colMap.queue]?.replace(/^"|"$/g, '').trim();
      const contact = row[colMap.contact]?.replace(/^"|"$/g, '').trim();
      const work = row[colMap.work]?.replace(/^"|"$/g, '').trim();
      const statusText = row[colMap.status]?.replace(/^"|"$/g, '').trim();
      const dateStr = row[colMap.date]?.replace(/^"|"$/g, '').trim();
      const deadlineStr = row[colMap.deadline]?.replace(/^"|"$/g, '').trim();
      
      let status: 'waiting' | 'doing' | 'done' = 'waiting';
      if (finish) {
        status = 'done';
      } else if (statusText === 'รอคิว' || statusText === '') {
        status = 'waiting';
      } else {
        status = 'doing';
      }

      queueItems.push({
        id: i,
        clientId: 0,
        name: name,
        position: parseInt(positionStr) || (queueItems.length + 1),
        status: status,
        artworkType: (work || 'illustration') as any,
        deadline: deadlineStr || dateStr,
        description: contact || work || ''
      });
    }
    
    return queueItems;
  } catch (error) {
    console.error('Error fetching sheets:', error);
    return [];
  }
}
