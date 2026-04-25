"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";

type ConstructionProject = Project & {
  num: string;
  image: string;
  alt: string;
  tag: string;
};

function ConstructionSkeleton() {
  return (
    <section className="bg-background py-20 sm:py-28 px-6 sm:px-10 lg:px-20">
      <div className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 max-w-6xl mx-auto">
        <div className="space-y-3">
          <Skeleton className="h-3 w-24 rounded-full" />
          <Skeleton className="h-10 sm:h-12 w-72 sm:w-120 rounded-xl" />
          <Skeleton className="h-1 w-56 rounded-full" />
        </div>
        <Skeleton className="h-6 w-36 rounded-full" />
      </div>

      <div
        className="hidden sm:grid grid-cols-2 gap-1.5 max-w-6xl mx-auto"
        style={{ height: "520px" }}
      >
        <div className="relative overflow-hidden rounded-[1.25rem]">
          <Skeleton className="h-full w-full rounded-[1.25rem]" />
          <div className="absolute inset-x-0 bottom-0 p-6 space-y-3">
            <Skeleton className="h-3 w-28 rounded-full bg-white/20" />
            <Skeleton className="h-7 w-56 rounded-full bg-white/20" />
            <Skeleton className="h-4 w-full rounded-full bg-white/15" />
            <Skeleton className="h-4 w-4/5 rounded-full bg-white/15" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-1 overflow-hidden rounded-[1.25rem]"
            >
              <Skeleton className="w-[38%] shrink-0 rounded-none" />
              <div className="flex-1 bg-[#111111] px-5 py-4 space-y-3">
                <Skeleton className="h-3 w-12 rounded-full bg-white/10" />
                <Skeleton className="h-6 w-40 rounded-full bg-white/10" />
                <Skeleton className="h-3 w-28 rounded-full bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sm:hidden flex flex-col gap-4 max-w-6xl mx-auto">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex overflow-hidden h-28 rounded-xl">
            <Skeleton className="w-[35%] shrink-0 rounded-none" />
            <div className="flex-1 bg-[#111111] px-4 py-4 space-y-3">
              <Skeleton className="h-3 w-28 rounded-full bg-white/10" />
              <Skeleton className="h-5 w-40 rounded-full bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function LatestConstruction() {
  const [hoveredFeatured, setHoveredFeatured] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [projects, setProjects] = useState<ConstructionProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects?category=Architecture%20%26%20Construction")
      .then((response) => response.json())
      .then((data: Project[] | { error?: string }) => {
        if (!Array.isArray(data)) {
          setProjects([]);
          setLoading(false);
          return;
        }

        setProjects(
          data.slice(0, 4).map((project, index) => ({
            ...project,
            num: String(index + 1).padStart(2, "0"),
            image: project.images?.[0] || "/construction1.jpg",
            alt: project.title,
            tag: project.subcategory || project.category,
          }))
        );
        setLoading(false);
      })
      .catch(() => {
        setProjects([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <ConstructionSkeleton />;
  if (projects.length === 0) return null;

  const featured = projects[0];
  const rows = projects.slice(1);

  return (
    <section className="bg-background py-5 sm:py-10 px-6 sm:px-10 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 max-w-6xl mx-auto"
      >
        <div>
          <p className="text-primary text-type-eyebrow font-medium uppercase tracking-[0.2em] mb-3">
            Our work
          </p>
          <h2 className="font-bold text-foreground leading-[1.1]">
            Latest Architecture & Construction
          </h2>
          <div className="h-0.5 w-56 bg-accent mt-1 rounded-full" />
        </div>
        <Link
          href="/construction"
          className="inline-flex items-center gap-2 text-primary text-type-eyebrow font-medium uppercase tracking-widest border-b border-primary pb-0.5 w-fit transition-colors hover:text-primary-dark shrink-0"
        >
          View all projects
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 7h12M8 3l5 4-5 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="hidden sm:grid grid-cols-2 gap-1.5 max-w-6xl mx-auto"
        style={{ height: "520px" }}
      >
        <Link
          href={`/construction/${featured.id}`}
          className="relative overflow-hidden block"
          onMouseEnter={() => setHoveredFeatured(true)}
          onMouseLeave={() => setHoveredFeatured(false)}
        >
          <Image
            src={featured.image}
            alt={featured.alt}
            fill
            sizes="50vw"
            className="object-cover"
            priority
            style={{
              transform: hoveredFeatured ? "scale(1.04)" : "scale(1)",
              filter: hoveredFeatured ? "brightness(0.45)" : "brightness(0.65)",
              transition:
                "transform 0.7s cubic-bezier(0.4,0,0.2,1), filter 0.5s ease",
            }}
          />

          <div
            className="absolute bottom-0 left-0 w-0.75 bg-primary origin-bottom"
            style={{
              height: hoveredFeatured ? "100%" : "0%",
              transition: "height 0.5s cubic-bezier(0.4,0,0.2,1)",
            }}
          />

          <div
            className="absolute bottom-0 left-0 right-0 px-6 pb-7 pt-20"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 70%, transparent 100%)",
            }}
          >
            <p className="text-white/55 text-type-eyebrow font-medium uppercase tracking-widest mb-2">
              {featured.tag}
            </p>
            <h3 className="text-white font-heading font-bold text-type-h2 leading-snug">
              {featured.title}
            </h3>

            <AnimatePresence>
              {hoveredFeatured && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, delay: 0.06 }}
                  className="overflow-hidden"
                >
                  <p className="text-white/72 text-type-prose font-light leading-relaxed mt-3 mb-4">
                    {featured.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-white text-type-eyebrow font-medium uppercase tracking-widest border-b border-white/40 pb-0.5">
                    View project
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M1 7h12M8 3l5 4-5 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="square"
                      />
                    </svg>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Link>

        <div className="flex flex-col gap-1.5">
          {rows.map((project) => {
            const isHovered = hoveredRow === project.id;
            return (
              <Link
                key={project.id}
                href={`/construction/${project.id}`}
                className="relative flex overflow-hidden flex-1"
                onMouseEnter={() => setHoveredRow(project.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <div className="relative w-[38%] shrink-0 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="20vw"
                    className="object-cover"
                    style={{
                      transform: isHovered ? "scale(1.07)" : "scale(1)",
                      filter: isHovered ? "brightness(0.5)" : "brightness(0.7)",
                      transition:
                        "transform 0.6s cubic-bezier(0.4,0,0.2,1), filter 0.5s ease",
                    }}
                  />
                </div>

                <div
                  className="flex-1 flex flex-col justify-center px-5 py-4 transition-colors duration-400"
                  style={{ background: isHovered ? "#005f75" : "#111111" }}
                >
                  <p className="text-white/35 text-type-eyebrow font-medium uppercase tracking-widest mb-1">
                    {project.num}
                  </p>
                  <h3 className="text-white font-heading font-bold text-type-prose-lg leading-snug mb-1">
                    {project.title}
                  </h3>
                  <p
                    className="text-type-eyebrow font-medium uppercase tracking-widest transition-colors duration-300"
                    style={{
                      color: isHovered
                        ? "rgba(255,255,255,0.65)"
                        : "rgba(255,255,255,0.35)",
                    }}
                  >
                    {project.tag}
                  </p>
                </div>

                <div
                  className="absolute right-4 bottom-4 transition-all duration-300"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "translateX(0)" : "translateX(-6px)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7h12M8 3l5 4-5 4"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>

      <div className="sm:hidden flex flex-col gap-px max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.1 }}
          >
            <Link href={`/construction/${project.id}`} className="flex overflow-hidden h-28">
              <div className="relative w-[35%] shrink-0">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="35vw"
                  className="object-cover"
                  style={{ filter: "brightness(0.75)" }}
                />
              </div>
              <div className="flex-1 bg-[#111] px-4 flex flex-col justify-center">
                <p className="text-white/40 text-type-eyebrow font-medium uppercase tracking-widest mb-1">
                  {project.tag}
                </p>
                <h3 className="text-white font-heading font-bold text-type-prose leading-snug">
                  {project.title}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
