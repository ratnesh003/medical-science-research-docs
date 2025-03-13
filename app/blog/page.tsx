export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/folders`);

  const folders = await res.json();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8">
      {folders.map((folder: any) => (
        <a
          key={folder.id}
          href={`/blog/${folder.id}`}
          className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
        >
          <img
            src={`/api/image/${folder.thumbnail}` || 'https://via.placeholder.com/300'}
            alt={folder.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-bold">{folder.name}</h2>
            <p className="text-sm text-gray-500">Last edited: {new Date(folder.modifiedTime).toLocaleDateString()}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
