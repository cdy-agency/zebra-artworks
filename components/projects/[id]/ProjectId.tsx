// FILE: src/app/projects/[id]/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, X, ArrowLeft, ZoomIn } from "lucide-react";
import type { Project } from "@/lib/supabase";
import Navbar from "../../NavBar";
import Footer from "../../Footer";

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === "Completed" ? "bg-green-100 text-green-700" :
    status === "Ongoing"   ? "bg-blue-100 text-blue-700" :
                             "bg-amber-100 text-amber-700";
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${cls}`}>
      {status}
    </span>
  );
}

function Lightbox({ images, startIndex, onClose }: {
  images: string[]; startIndex: number; onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);
  const nav = useCallback((dir: number) =>
    setIdx(i => (i + dir + images.length) % images.length), [images.length]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  nav(-1);
      if (e.key === "ArrowRight") nav(1);
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [nav, onClose]);

  return (
    <div className="fixed inset-0 z-[2000] bg-black/90 flex flex-col items-center justify-center gap-4 p-5"
         onClick={onClose}>
      <button onClick={onClose}
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors">
        <X size={18} />
      </button>
      <img src={images[idx]} alt=""
        className="max-w-[90vw] max-h-[75vh] object-contain rounded-xl"
        onClick={e => e.stopPropagation()} />
      <div className="flex items-center gap-4" onClick={e => e.stopPropagation()}>
        <button onClick={() => nav(-1)}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors">
          <ChevronLeft size={20} />
        </button>
        <span className="text-white/60 text-sm min-w-[50px] text-center">
          {idx + 1} / {images.length}
        </span>
        <button onClick={() => nav(1)}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [project, setProject]         = useState<Project | null>(null);
  const [loading, setLoading]         = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/projects/${id}`)
      .then(r => r.json())
      .then(data => {
        setProject(data.error ? null : data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const images = project?.images ?? [];
  const hasImages = images.length > 0;

  if (loading) return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      </div>
      <Footer />
    </>
  );

  if (!project) return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Project not found</p>
        <button onClick={() => router.push("/projects")}
          className="text-sm text-blue-600 underline">Back to projects</button>
      </div>
      <Footer />
    </>
  );

  return (
    <>
      <Navbar />

      <main className="bg-gray-50 min-h-screen py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Back button */}
          <button onClick={() => router.push("/projects")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
            <ArrowLeft size={15} />
            Back to projects
          </button>

          {/* Main layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

            {/* ── Gallery ── */}
            <div>
              {/* Big main image */}
              <div
                className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-gray-200 border border-gray-200 cursor-zoom-in group"
                onClick={() => hasImages && setLightboxIndex(activeImage)}
              >
                {hasImages ? (
                  <img src={images[activeImage]} alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    No images available
                  </div>
                )}
                {/* Zoom hint */}
                {hasImages && (
                  <div className="absolute bottom-3 right-3 bg-black/45 text-white text-xs px-2.5 py-1.5 rounded-md flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={12} /> View full
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {hasImages && (
                <>
                  <div className="grid grid-cols-5 gap-2 mt-2.5">
                    {images.map((src, i) => (
                      <button key={i} onClick={() => setActiveImage(i)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:-translate-y-0.5
                          ${i === activeImage ? "border-blue-500" : "border-transparent"}`}>
                        <img src={src} alt=""
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 text-right mt-1.5">
                    {images.length} photos
                  </p>
                </>
              )}
            </div>

            {/* ── Info panel ── */}
            <div className="flex flex-col gap-5">

              {/* Title + badges + meta */}
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h1 className="font-serif text-2xl font-medium text-gray-900 leading-snug mb-3">
                  {project.title}
                </h1>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.status && <StatusBadge status={project.status} />}
                  {project.category && (
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                      {project.category}
                    </span>
                  )}
                  {project.subcategory && (
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                      {project.subcategory}
                    </span>
                  )}
                </div>

                <div className="divide-y divide-gray-100">
                  {project.client && (
                    <div className="flex items-center justify-between py-2.5 text-sm">
                      <span className="text-gray-500">Client</span>
                      <span className="font-medium text-gray-900">{project.client}</span>
                    </div>
                  )}
                  {project.date && (
                    <div className="flex items-center justify-between py-2.5 text-sm">
                      <span className="text-gray-500">Date</span>
                      <span className="font-medium text-gray-900">
                        {new Date(project.date).toLocaleDateString("en-GB", {
                          year: "numeric", month: "long"
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {project.description && (
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                    About this project
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {lightboxIndex !== null && (
        <Lightbox images={images} startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)} />
      )}
    </>
  );
}