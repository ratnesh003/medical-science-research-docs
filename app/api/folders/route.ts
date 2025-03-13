import { NextResponse } from 'next/server';
import { listFolders, getThumbnailImage } from '@/lib/googleDrive';

export const revalidate = 60; // ISR for 60 seconds

export async function GET() {
  try {
    const folders = await listFolders(process.env.GOOGLE_DRIVE_FOLDER_ID!);

    const foldersWithThumbnails = await Promise.all(
      folders.map(async (folder) => {
        const thumbnail = await getThumbnailImage(folder.id || "");
        return {
          id: folder.id,
          name: folder.name,
          modifiedTime: folder.modifiedTime,
          thumbnail,
        };
      })
    );

    return NextResponse.json(foldersWithThumbnails);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch folders' }, { status: 500 });
  }
}
