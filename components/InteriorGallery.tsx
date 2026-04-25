// 📁 src/components/InteriorGallery.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type GalleryItem = {
  id: string;
  projectId: string;
  src: string;
  title: string;
  description: string;
  desc?: string;
};

// Skeleton placeholder (mirrors the real grid exactly)
function GallerySkeleton() {
  return (
    <section className="bg-[#f5f5f5] py-16 px-6">
      {/* Header skeleton */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-6 w-64" />
          </div>
          <Skeleton className="h-12 w-80" />
        </div>
      </div>

      {/* Grid skeleton — same 3-column layout as the real grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Left large */}
        <Skeleton className="md:row-span-2 rounded-xl h-62.5 md:h-130" />
        {/* Top middle */}
        <Skeleton className="rounded-xl h-62.5 md:h-130" />
        {/* Right tall */}
        <Skeleton className="md:row-span-2 rounded-xl h-62.5 md:h-130" />
        {/* Bottom middle */}
        <Skeleton className="rounded-xl h-62.5" />
      </div>
    </section>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function InteriorGallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true); // 👈 track loading state

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => {
        setGallery(data);
        setLoading(false); // 👈 done loading
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); // 👈 stop skeleton even on error
      });
  }, []);

  // Show skeleton while fetching
  if (loading) return <GallerySkeleton />;

  const items = gallery.slice(0, 4);

  // Not enough data after loading — render nothing (or a fallback)
  if (items.length < 4) return null;

  const getDesc = (item: GalleryItem) => item.description || item.desc || "";
  const overlayClassName =
    "absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition duration-500 flex items-end p-4 group-hover:opacity-100 group-focus-visible:opacity-100";
  const imageClassName =
    "w-full object-cover transition-transform duration-500 group-hover:scale-110 group-focus-visible:scale-110";

  return (
    <section className="bg-[#f5f5f5] py-16 px-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <p className="text-type-meta text-primary font-semibold tracking-wide uppercase">
              Highlights
            </p>
            <h2 className="font-bold text-gray-900">
              Our Interior Design Highlights
            </h2>
          </div>
          <p className="text-gray-600 max-w-md text-type-prose leading-relaxed">
            Explore some of our finest interior design works, showcasing creativity,
            elegance, and attention to detail in every space we transform.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Left Large */}
        <Link
          href={`/projects/${items[0].projectId}`}
          className="md:row-span-2 relative overflow-hidden rounded-xl group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={`View details for ${items[0].title}`}
        >
          <Image src={items[0].src} alt={items[0].title} width={300} height={200}
            className={`${imageClassName} h-62.5 md:h-130`}
          />
          <div className={overlayClassName}>
            <div>
              <h3 className="text-white font-heading font-semibold text-type-prose-lg">{items[0].title}</h3>
              <p className="text-white/70 text-type-meta mt-1 line-clamp-2">{getDesc(items[0])}</p>
            </div>
          </div>
        </Link>

        {/* Top Middle */}
        <Link
          href={`/projects/${items[1].projectId}`}
          className="relative overflow-hidden rounded-xl group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={`View details for ${items[1].title}`}
        >
          <Image src={items[1].src} alt={items[1].title} width={300} height={200}
            className={`${imageClassName} h-62.5`}
          />
          <div className={overlayClassName}>
            <div>
              <h3 className="text-white font-heading font-semibold text-type-prose-lg">{items[1].title}</h3>
              <p className="text-white/70 text-type-meta mt-1 line-clamp-2">{getDesc(items[1])}</p>
            </div>
          </div>
        </Link>

        {/* Right Tall */}
        <Link
          href={`/projects/${items[2].projectId}`}
          className="md:row-span-2 relative overflow-hidden rounded-xl group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={`View details for ${items[2].title}`}
        >
          <Image src={items[2].src} alt={items[2].title} width={300} height={200}
            className={`${imageClassName} h-62.5 md:h-130`}
          />
          <div className={overlayClassName}>
            <div>
              <h3 className="text-white font-heading font-semibold text-type-prose-lg">{items[2].title}</h3>
              <p className="text-white/70 text-type-meta mt-1 line-clamp-2">{getDesc(items[2])}</p>
            </div>
          </div>
        </Link>

        {/* Bottom Middle */}
        <Link
          href={`/projects/${items[3].projectId}`}
          className="relative overflow-hidden rounded-xl group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={`View details for ${items[3].title}`}
        >
          <Image src={items[3].src} alt={items[3].title} width={300} height={200}
            className={`${imageClassName} h-62.5`}
          />
          <div className={overlayClassName}>
            <div>
              <h3 className="text-white font-heading font-semibold text-type-prose-lg">{items[3].title}</h3>
              <p className="text-white/70 text-type-meta mt-1 line-clamp-2">{getDesc(items[3])}</p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
