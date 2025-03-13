"use client"

import { useEffect, useState } from "react";

export default function HomePage() {

  const [folders, setFolders] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchFolders() {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/folders`);
      const temp = await res.json();
      setFolders(temp)
      setLoading(false)
    }

    fetchFolders()
  }, [])

  if(loading) {
    return (
      <div className="min-h-screen w-full content-center text-center">
        Loading ...
      </div>
    )
  }

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
