import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

export async function GET(req: NextRequest, { params }: { params: { imageId: string } }) {
  try {
    const { imageId } = await params
    const fileId = imageId;

    const res = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' }
    );

    const stream = res.data;

    return new NextResponse(stream as any, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=86400', // 1 day cache
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
  }
}
