import { google } from 'googleapis';

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

export async function listFolders(parentFolderId: string) {
  const allFolders: any[] = [];
  let pageToken: string | undefined = undefined;

  do {
    const res: any = await drive.files.list({
      q: `'${parentFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'nextPageToken, files(id, name, modifiedTime)',
      pageSize: 100, // Increase to the max allowed
      orderBy: 'modifiedTime desc',
      pageToken: pageToken,
    });

    if (res.data.files) {
      allFolders.push(...res.data.files);
    }

    pageToken = res.data.nextPageToken;
  } while (pageToken);

  return allFolders;
}


export async function listImages(folderId: string) {
  const res = await drive.files.list({
    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
    fields: 'files(id, name, mimeType, webContentLink, thumbnailLink, createdTime)',
  });

  return res.data.files || [];
}

export async function getThumbnailImage(folderId: string) {
  const images = await listImages(folderId);
  return images[0]?.id || null;
}
