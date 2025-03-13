export default async function BlogPost({ params }: { params: Promise<{ folderId: string }> }) {
  const { folderId } = await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/folders/${folderId}`);

  const images = await res.json();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((image: any) => (
          <a key={image.id} href={image.webContentLink} target="_blank" rel="noopener noreferrer">
            <img
              src={`/api/image/${image.id}` || 'https://via.placeholder.com/300'}
              alt={image.name}
              className="w-full h-48 object-cover rounded shadow"
            />
          </a>
        ))}
      </div>
    </main>
  );
}
