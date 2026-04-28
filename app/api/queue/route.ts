export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getQueueFromSheets } from '@/lib/sheets';

export async function GET() {
  const data = await getQueueFromSheets();
  return NextResponse.json(data);
}
