"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FolderOpen, Loader2 } from "lucide-react";

type GalleryItem = {
  id: string;
  src: string;
  title: string;
  description: string;
};

export default function ManageGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchItems() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("/api/gallery");
        if (!res.ok) throw new Error("Failed to load gallery images");

        const data = (await res.json()) as GalleryItem[];
        if (!cancelled) setItems(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load gallery images");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchItems();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-1 font-bold text-foreground">Manage Gallery</h1>
      <p className="mb-8 text-type-prose text-gray-mid">
        This section no longer accepts manual gallery uploads. The landing page automatically
        shows 4 images pulled from the most recently added project images.
      </p>

      <div className="mb-8 rounded-xl border border-line/20 bg-subtle p-5">
        <h2 className="mb-2 font-semibold text-foreground">How It Works</h2>
        <p className="text-type-prose leading-6 text-gray-mid">
          To change these images, upload photos inside <span className="font-medium text-foreground">Manage Projects</span>.
          The gallery uses project images only, so there is nothing to upload here anymore.
        </p>
      </div>

      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-semibold text-foreground">Landing Page Images</h2>
        <span className="text-type-prose text-gray-mid">{items.length} / 4 available</span>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 py-8 text-type-prose text-gray-mid">
          <Loader2 size={18} className="animate-spin" />
          Loading gallery preview...
        </div>
      ) : error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-type-prose text-red-600">
          {error}
        </p>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-line/20 bg-background px-5 py-8 text-center">
          <FolderOpen size={22} className="mx-auto mb-3 text-gray-mid" />
          <p className="text-type-prose text-foreground">No project images available yet.</p>
          <p className="mt-1 text-type-meta text-gray-mid">
            Add images to a project and the first 4 will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl border border-primary/30 bg-background"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-type-eyebrow font-bold text-background">
                  Slot {idx + 1}
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-type-prose font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 line-clamp-2 text-type-meta text-gray-mid">
                  {item.description || "Project image selected from uploaded project photos."}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
