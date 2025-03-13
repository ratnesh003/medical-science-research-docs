"use client"

import { useEffect, useState } from "react";

export default function BlogPost({ params }: { params: Promise<{ folderId: string }> }) {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchImages() {
      const { folderId } = await params
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/folders/${folderId}`);
      const tempImages = await res.json();
      setImages(tempImages)
      setLoading(false)
    }

    fetchImages()
  }, [])

  if(loading) {
    return (
      <div className="text-primary h-screen w-full text-center content-center">
        Loading...
      </div>
    )
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gallery</h1>
      <div className="flex flex-wrap gap-4">
        {images.map((image: any) => (
          <a key={image.id} href={image.webContentLink} target="_blank">
            <img
              src={`/api/image/${image.id}` || 'https://via.placeholder.com/300'}
              alt={image.name}
              className="w-full h-48 md:h-64 object-cover rounded shadow"
            />
          </a>
        ))}
      </div>
    </main>
  );
}
