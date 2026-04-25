"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  client: string;
  description: string;
  images: string[];
  status: string;
  date: string;
  created_at: string;
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function InteriorDesignDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setProject(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProject();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-gray-mid text-type-prose font-light tracking-widest uppercase">
            Loading project
          </p>
        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-primary text-type-eyebrow uppercase tracking-widest mb-3">
            404
          </p>
          <h1 className="text-foreground font-bold mb-4">
            Project not found
          </h1>
          <Link
            href="/interior-design"
            className="inline-flex items-center gap-2 text-primary text-type-eyebrow uppercase tracking-widest border-b border-primary pb-0.5"
          >
            Back to Interior Design
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 7h12M8 3l5 4-5 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </Link>
        </div>
      </main>
    );
  }

  const images = project.images ?? [];

  return (
    <main className="min-h-screen bg-background">
      {/* ── Hero image ── */}
      <section className="relative w-full h-[55vh] sm:h-[70vh] overflow-hidden bg-[#111]">
        <div className="absolute top-0 left-0 right-0 h-0.75 bg-primary z-10" />

        {images.length > 0 ? (
          <Image
            src={images[activeImage]}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover transition-opacity duration-500"
            style={{ filter: "brightness(0.6)" }}
          />
        ) : (
          <div className="w-full h-full bg-[#1a1a1a]" />
        )}

        {/* Dark gradient bottom */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

        {/* Back link */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/interior-design"
            className="inline-flex items-center gap-2 text-white/70 text-type-eyebrow uppercase tracking-widest hover:text-white transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path
                d="M13 7H1M6 3L1 7l5 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
            Interior Design
          </Link>
        </div>

        {/* Status badge */}
        <div className="absolute top-6 right-6 z-10">
          <span
            className="text-type-eyebrow font-medium uppercase tracking-widest px-3 py-1.5"
            style={{
              background:
                project.status === "Ongoing"
                  ? "#005f75"
                  : "rgba(255,255,255,0.15)",
              color: "#fff",
            }}
          >
            {project.status}
          </span>
        </div>

        {/* Title overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute bottom-8 left-6 sm:left-10 lg:left-20 right-6 z-10"
        >
          <p className="text-primary text-type-eyebrow uppercase tracking-[0.2em] mb-2">
            {project.subcategory}
          </p>
          <h1 className="text-white text-type-hero font-heading font-bold leading-[1.05] max-w-3xl">
            {project.title}
          </h1>
        </motion.div>

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-8 right-6 sm:right-10 lg:right-20 z-10 text-white/40 text-type-eyebrow uppercase tracking-widest">
            {String(activeImage + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </div>
        )}
      </section>

      {/* ── Image gallery thumbnails ── */}
      {images.length > 1 && (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="px-6 sm:px-10 lg:px-20 py-4 bg-[#0f0f0f] flex gap-2 overflow-x-auto"
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className="relative shrink-0 w-20 h-14 sm:w-28 sm:h-20 overflow-hidden focus:outline-none"
              style={{
                border:
                  activeImage === i
                    ? "2px solid #005f75"
                    : "2px solid transparent",
                opacity: activeImage === i ? 1 : 0.5,
                transition: "opacity 0.25s, border-color 0.25s",
              }}
            >
              <Image
                src={img}
                alt={`View ${i + 1}`}
                fill
                className="object-cover"
                sizes="112px"
              />
            </button>
          ))}

          {/* Expand button */}
          <button
            onClick={() => setLightbox(true)}
            className="shrink-0 w-20 h-14 sm:w-28 sm:h-20 bg-[#1a1a1a] border border-white/10 flex flex-col items-center justify-center gap-1 hover:bg-[#222] transition-colors focus:outline-none"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M1 6V1h5M10 1h5v5M15 10v5h-5M6 15H1v-5"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="square"
                opacity="0.5"
              />
            </svg>
            <span className="text-white/40 text-type-eyebrow uppercase tracking-widest">
              Expand
            </span>
          </button>
        </motion.section>
      )}

      {/* ── Main content ── */}
      <section className="px-6 sm:px-10 lg:px-20 py-14 sm:py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          {/* Left — description */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <p className="text-primary text-type-eyebrow uppercase tracking-[0.2em] mb-4">
              About this project
            </p>
            <p className="text-foreground text-type-lead sm:text-type-prose-lg font-light leading-relaxed mb-10">
              {project.description}
            </p>

            {/* Full image grid — all images */}
            {images.length > 0 && (
              <div>
                <p className="text-gray-mid text-type-eyebrow uppercase tracking-[0.2em] mb-4">
                  Project images
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {images.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                      className={`relative overflow-hidden cursor-pointer group ${
                        i === 0 && images.length % 2 !== 0
                          ? "sm:col-span-2"
                          : ""
                      }`}
                      onClick={() => {
                        setActiveImage(i);
                        setLightbox(true);
                      }}
                    >
                      <div
                        className={`relative w-full ${i === 0 && images.length % 2 !== 0 ? "aspect-16/7" : "aspect-4/3"}`}
                      >
                        <Image
                          src={img}
                          alt={`${project.title} image ${i + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-600 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>
                      <div className="absolute top-0 left-0 right-0 h-0.75 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right — project details sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="border-t-[3px] border-primary pt-6 sticky top-24">
              <p className="text-primary text-type-eyebrow uppercase tracking-[0.2em] mb-6">
                Project details
              </p>

              <dl className="flex flex-col gap-5">
                {[
                  { label: "Client", value: project.client },
                  { label: "Category", value: project.category },
                  { label: "Type", value: project.subcategory },
                  { label: "Status", value: project.status },
                  { label: "Date", value: formatDate(project.date) },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="border-b border-foreground/8 pb-5"
                  >
                    <dt className="text-gray-mid text-type-eyebrow uppercase tracking-widest mb-1">
                      {label}
                    </dt>
                    <dd className="text-foreground text-type-prose font-light">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* CTA */}
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="flex items-center justify-between w-full bg-primary text-white px-5 py-4 text-type-eyebrow font-medium uppercase tracking-widest hover:bg-primary-dark transition-colors"
                >
                  Start a similar project
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7h12M8 3l5 4-5 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col"
            onClick={() => setLightbox(false)}
          >
            {/* Close */}
            <div
              className="flex items-center justify-between px-6 py-4 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-white/40 text-type-eyebrow uppercase tracking-widest">
                {String(activeImage + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </p>
              <button
                onClick={() => setLightbox(false)}
                className="text-white/50 hover:text-white transition-colors text-type-eyebrow uppercase tracking-widest flex items-center gap-2"
              >
                Close
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </button>
            </div>

            {/* Main image */}
            <div
              className="flex-1 relative flex items-center justify-center px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full max-w-5xl">
                <Image
                  src={images[activeImage]}
                  alt={project.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {/* Prev / Next */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImage(
                        (i) => (i - 1 + images.length) % images.length,
                      )
                    }
                    className="absolute left-4 sm:left-8 text-white/50 hover:text-white transition-colors p-2"
                  >
                    <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M13 7H1M6 3L1 7l5 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="square"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      setActiveImage((i) => (i + 1) % images.length)
                    }
                    className="absolute right-4 sm:right-8 text-white/50 hover:text-white transition-colors p-2"
                  >
                    <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M1 7h12M8 3l5 4-5 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="square"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div
                className="flex gap-2 px-6 py-4 overflow-x-auto shrink-0 justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className="relative shrink-0 w-16 h-12 overflow-hidden focus:outline-none"
                    style={{
                      border:
                        activeImage === i
                          ? "2px solid #005f75"
                          : "2px solid transparent",
                      opacity: activeImage === i ? 1 : 0.4,
                      transition: "opacity 0.2s",
                    }}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
