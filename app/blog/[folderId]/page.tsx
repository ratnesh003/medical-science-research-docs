"use client";

import FeedbackForm from "@/components/feedback-form";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

export default function BlogPost({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      const { folderId } = await params;
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/folders/${folderId}`
      );
      const tempImages = await res.json();
      setImages(tempImages);
      setLoading(false);
    }

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="text-primary h-screen w-full text-center content-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((image: any, idx: number) => (
          <Dialog key={image.id}>
            <DialogTrigger>
              <img
                src={
                  `/api/image/${image.id}` || "https://via.placeholder.com/300"
                }
                alt={image.name}
                className="w-full h-48 md:h-64 object-cover rounded shadow"
              />
            </DialogTrigger>
            <DialogContent className="block">
              <Carousel
                opts={{
                  // align: "start",
                  loop: true,
                  startIndex: idx
                }}
              >
                <CarouselContent>
                  {images.map((pic: any) => (
                    <CarouselItem key={pic.id} className="w-fit">
                      <img
                        src={
                          `/api/image/${pic.id}` ||
                          "https://via.placeholder.com/300"
                        }
                        alt={pic.name}
                        className="w-full h-full md:max-h-[450px] object-contain rounded shadow"
                      />
                      <DialogHeader className="mt-2">
                        <DialogTitle>{pic.name}</DialogTitle>
                        <DialogDescription>
                          Uploade at:{" "}
                          {new Date(pic.createdTime).toLocaleDateString()}
                        </DialogDescription>
                      </DialogHeader>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </DialogContent>
          </Dialog>
        ))}
        {images.length == 0 && <p>Error in Loading Images</p>}
      </div>
      <FeedbackForm/>
    </main>
  );
}
