"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchFolders() {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/folders`
      );
      const temp = await res.json();
      const sortedFiles = temp.sort((a: any, b: any) => {
        const numA = parseInt(a.name.match(/^\d+/)?.[0] || "0", 10);
        const numB = parseInt(b.name.match(/^\d+/)?.[0] || "0", 10);

        if (numA !== numB) {
          return numA - numB;
        }

        return a.name.localeCompare(b.name);
      });
      setFolders(sortedFiles);
      setLoading(false);
    }

    fetchFolders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full content-center text-center">
        Loading ...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8">
      {folders.map((folder: any) => (
        <Card
          key={folder.id}
          onClick={() => router.push(`/blog/${folder.id}`)}
          className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
        >
          <img
            src={
              `/api/image/${folder.thumbnail}` ||
              "https://via.placeholder.com/300"
            }
            alt={folder.name}
            className="w-full h-48 object-cover"
          />
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-bold">{folder.name}</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Last edited: {new Date(folder.modifiedTime).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
