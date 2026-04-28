import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new NextResponse('Missing ID', { status: 400 });
  }

  // Use the Thumbnail API for much faster loading (800px width is perfect for portfolio cards)
  const googleDriveUrl = `https://drive.google.com/thumbnail?id=${id}&sz=w800`;

  try {
    const response = await fetch(googleDriveUrl);

    if (!response.ok) {
      // Fallback to direct download if thumbnail fails
      const directUrl = `https://docs.google.com/uc?id=${id}&export=download`;
      const directRes = await fetch(directUrl);
      if (!directRes.ok) throw new Error('Failed to fetch from Google Drive');
      
      const blob = await directRes.blob();
      return new NextResponse(blob, {
        headers: {
          'Content-Type': directRes.headers.get('content-type') || 'image/png',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    const blob = await response.blob();
    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    console.error('Image Proxy Error:', error);
    // Fallback to a thumbnail if the direct download fails
    return NextResponse.redirect(`https://drive.google.com/thumbnail?id=${id}&sz=w800`);
  }
}
