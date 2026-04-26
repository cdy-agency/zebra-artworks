"use client";

import { useRef } from "react";
import Image from "next/image";
import { X, ImagePlus } from "lucide-react";

interface Props {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function ImageUploadGrid({ images, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        onChange([...images, src]);
      };
      reader.readAsDataURL(file);
    });
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <div>
      <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-gray-mid">
        Images ({images.length})
      </p>

      <div className="grid grid-cols-3 gap-2">
        {/* Existing images */}
        {images.map((src, i) => (
          <div
            key={i}
            className="group relative aspect-4/3 overflow-hidden rounded-lg border border-line/20 bg-subtle"
          >
            <Image
              src={src}
              alt={`Image ${i + 1}`}
              fill
              sizes="150px"
              className="object-cover"
            />
            {/* Order badge */}
            <span className="absolute top-1 left-1 rounded bg-background/90 px-1.5 text-[9px] leading-4 text-gray-mid shadow-sm">
              {String(i + 1).padStart(2, "0")}
            </span>
            {/* Remove */}
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full border border-line/20 bg-background/95 p-0.5 text-gray-mid shadow-sm transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500"
            >
              <X size={11} />
            </button>
          </div>
        ))}

        {/* Add more */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex aspect-4/3 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-line/40 bg-background text-gray-mid transition-colors hover:border-primary/60 hover:bg-primary/5 hover:text-primary"
        >
          <ImagePlus size={18} />
          <span className="text-[9px] uppercase tracking-widest">Add</span>
        </button>
      </div>

      {/* Drop zone hint */}
      {images.length === 0 && (
        <div
          className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line/40 bg-background p-6 text-gray-mid transition-colors hover:border-primary/40 hover:text-primary"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFiles(e.dataTransfer.files);
          }}
        >
          <ImagePlus size={22} />
          <p className="text-[10px] uppercase tracking-widest">
            Click or drag images here
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
