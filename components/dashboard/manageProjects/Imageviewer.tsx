"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageViewerProps {
  images: string[];
  startIndex: number;
  onClose: () => void;
}

export function ImageViewer({ images, startIndex, onClose }: ImageViewerProps) {
  const [idx, setIdx] = useState(startIndex);

  const nav = useCallback(
    (dir: number) => setIdx((i) => (i + dir + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") nav(-1);
      if (e.key === "ArrowRight") nav(1);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [nav, onClose]);

  return (
    <div
      className="fixed inset-0 z-2000 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center gap-5 p-5"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
      >
        <X size={18} />
      </button>

      {/* Image */}
      <div
        className="relative w-full max-w-4xl"
        style={{ height: "70vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[idx]}
          alt={`Project image ${idx + 1}`}
          fill
          className="object-contain rounded-xl"
          sizes="(max-width: 768px) 100vw, 90vw"
          priority
        />
      </div>

      {/* Controls */}
      <div
        className="flex items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => nav(-1)}
          className="w-10 h-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm text-white/60 min-w-15 text-center">
          {idx + 1} / {images.length}
        </span>
        <button
          onClick={() => nav(1)}
          className="w-10 h-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Strip thumbnails */}
      {images.length > 1 && (
        <div
          className="flex items-center gap-2 overflow-x-auto max-w-full pb-1"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`relative w-12 h-12 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                i === idx
                  ? "border-primary scale-110"
                  : "border-white/20 opacity-50 hover:opacity-80"
              }`}
            >
              <Image
                src={src}
                alt={`Thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="48px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
