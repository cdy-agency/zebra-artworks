// 📁 src/components/InteriorGallery.tsx
// Design is UNCHANGED — only the type now uses `description` to match DB,
// while still accepting `desc` as a fallback so old data keeps working.

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryItem = {
  id: string;
  src: string;
  title: string;
  description: string; // DB column name
  desc?: string;       // legacy alias returned by the API normaliser
};

export default function InteriorGallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => setGallery(data))
      .catch(console.error);
  }, []);

  // Keep at most 4 items to match the original layout
  const items = gallery.slice(0, 4);

  if (items.length < 4) return null; // or a loading skeleton

  // Helper so templates never need to worry about which field is populated
  const getDesc = (item: GalleryItem) => item.description || item.desc || "";

  return (
    <section className="bg-[#f5f5f5] py-16 px-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <p className="text-sm text-primary font-semibold tracking-wide uppercase">
              Highlights
            </p>
            <h2 className="text-2xl md:text-2xl font-bold text-gray-900">
              Our Interior Design Highlights
            </h2>
          </div>
          <p className="text-gray-600 max-w-md text-sm leading-relaxed">
            Explore some of our finest interior design works, showcasing creativity,
            elegance, and attention to detail in every space we transform.
          </p>
        </div>
      </div>

      {/* Grid — identical layout as original */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

        {/* Left Large */}
        <div className="md:row-span-2 relative overflow-hidden rounded-xl group">
          <Image src={items[0].src} alt={items[0].title} width={300} height={200}
            className="w-full h-[250px] md:h-[520px] object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-4">
            <div>
              <h3 className="text-white font-semibold text-sm">{items[0].title}</h3>
              <p className="text-white/70 text-xs mt-1">{getDesc(items[0])}</p>
            </div>
          </div>
        </div>

        {/* Top Middle */}
        <div className="relative overflow-hidden rounded-xl group">
          <Image src={items[1].src} alt={items[1].title} width={300} height={200}
            className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-4">
            <div>
              <h3 className="text-white font-semibold text-sm">{items[1].title}</h3>
              <p className="text-white/70 text-xs mt-1">{getDesc(items[1])}</p>
            </div>
          </div>
        </div>

        {/* Right Tall */}
        <div className="md:row-span-2 relative overflow-hidden rounded-xl group">
          <Image src={items[2].src} alt={items[2].title} width={300} height={200}
            className="w-full h-[250px] md:h-[520px] object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-4">
            <div>
              <h3 className="text-white font-semibold text-sm">{items[2].title}</h3>
              <p className="text-white/70 text-xs mt-1">{getDesc(items[2])}</p>
            </div>
          </div>
        </div>

        {/* Bottom Middle */}
        <div className="relative overflow-hidden rounded-xl group">
          <Image src={items[3].src} alt={items[3].title} width={300} height={200}
            className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-4">
            <div>
              <h3 className="text-white font-semibold text-sm">{items[3].title}</h3>
              <p className="text-white/70 text-xs mt-1">{getDesc(items[3])}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}