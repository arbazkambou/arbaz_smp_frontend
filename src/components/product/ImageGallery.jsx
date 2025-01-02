"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ImageGallery({ images }) {
  const [activeImage, setActiveImage] = useState(images[0]);
  if (!images || images?.length === 0) return <p>No image found</p>;
  return (
    <div className="w-full space-y-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-green-200">
        <Image
          src={activeImage.url}
          alt="Product image"
          layout="fill"
          objectFit="cover"
          className="transition-all duration-300 ease-in-out"
        />
      </div>
      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(image)}
            className={cn(
              "relative aspect-square w-full overflow-hidden rounded-md border",
              activeImage.public_id === image.public_id
                ? "border-green-600 ring-2 ring-green-600"
                : "border-green-200 hover:border-green-400"
            )}
          >
            <Image
              src={image.url}
              alt={`Product thumbnail ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
