import { NextResponse } from 'next/server';
import { listImages } from '@/lib/googleDrive';

export const revalidate = 60; // ISR

export async function GET(req: Request, { params }: { params: { folderId: string } }) {
  try {
    const { folderId } = await params
    const images = await listImages(folderId);
    return NextResponse.json(images);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
