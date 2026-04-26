"use client";

import Image from "next/image";
import { X } from "lucide-react";

interface PreviewThumbProps {
  src: string;
  onRemove: () => void;
}

export function PreviewThumb({ src, onRemove }: PreviewThumbProps) {
  return (
    <div className="relative aspect-square rounded-lg overflow-hidden border border-line/20 group">
      <Image
        src={src}
        alt="Project preview"
        fill
        className="object-cover transition-transform duration-200 group-hover:scale-105"
        sizes="80px"
      />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="absolute top-1 right-1 w-5 h-5 bg-white/90 hover:bg-red-100 text-gray-600 hover:text-red-600 rounded-full flex items-center justify-center shadow-sm transition-colors opacity-0 group-hover:opacity-100"
      >
        <X size={10} />
      </button>
    </div>
  );
}
