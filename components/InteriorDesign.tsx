"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";

type InteriorProject = Project & {
  num: string;
  image: string;
  alt: string;
  tag: string;
};

function LatestDesignsSkeleton() {
  return (
    <section className="bg-background py-5 sm:py-10 px-6 sm:px-10 lg:px-20">
      <div className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 max-w-6xl mx-auto">
        <div className="space-y-3">
          <Skeleton className="h-3 w-24 rounded-full" />
          <Skeleton className="h-10 sm:h-12 w-64 sm:w-96 rounded-xl" />
        </div>
        <Skeleton className="h-6 w-36 rounded-full" />
      </div>

      <div
        className="hidden sm:flex gap-1.5 max-w-6xl mx-auto"
        style={{ height: "520px" }}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-[1.25rem] ${
              index === 1 ? "flex-[1.4]" : "flex-1"
            }`}
          >
            <Skeleton className="h-full w-full rounded-[1.25rem]" />
            <div className="absolute inset-x-0 bottom-0 p-5 space-y-3">
              <Skeleton className="h-3 w-16 rounded-full bg-white/20" />
              <Skeleton className="h-6 w-40 rounded-full bg-white/20" />
              <Skeleton className="h-3 w-32 rounded-full bg-white/15" />
            </div>
          </div>
        ))}
      </div>

      <div className="sm:hidden flex flex-col gap-4 max-w-7xl mx-auto">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-xl">
            <Skeleton className="h-52 w-full rounded-none" />
            <div className="bg-subtle px-5 py-4 border-t-[3px] border-primary space-y-3">
              <Skeleton className="h-3 w-24 rounded-full" />
              <Skeleton className="h-6 w-48 rounded-full" />
              <Skeleton className="h-4 w-full rounded-full" />
              <Skeleton className="h-4 w-5/6 rounded-full" />
              <Skeleton className="h-4 w-28 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function LatestDesigns() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [projects, setProjects] = useState<InteriorProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects?category=Interior%20Design")
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
            image: project.images?.[0] || "/interior2.jpg",
            alt: project.title,
            tag: project.subcategory || project.category,
          })),
        );
        setLoading(false);
      })
      .catch(() => {
        setProjects([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <LatestDesignsSkeleton />;
  if (projects.length === 0) return null;

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
            Portfolio
          </p>
          <h1 className="font-bold text-foreground leading-[1.1]">
            Latest Interior Design
          </h1>
          <div className="h-0.5 w-56 bg-accent mt-1 rounded-full" />
        </div>
        <Link
          href="/interior-design"
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
        className="hidden sm:flex gap-1.5 max-w-6xl mx-auto"
        style={{ height: "520px" }}
      >
        {projects.map((project) => {
          const isHovered = hoveredId === project.id;
          const isOtherHovered = hoveredId !== null && !isHovered;

          return (
            <motion.div
              key={project.id}
              className="relative overflow-hidden cursor-pointer group"
              animate={{
                flex: isHovered ? 2.8 : isOtherHovered ? 0.6 : 1,
              }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Image
                src={project.image}
                alt={project.alt}
                fill
                sizes="(max-width: 1280px) 33vw, 25vw"
                className="object-cover"
                style={{
                  transform: isHovered ? "scale(1.04)" : "scale(1)",
                  filter: isHovered ? "brightness(0.48)" : "brightness(0.72)",
                  transition:
                    "transform 0.7s cubic-bezier(0.4,0,0.2,1), filter 0.6s ease",
                }}
              />

              <div
                className="absolute top-0 left-0 right-0 h-0.75 bg-primary origin-left"
                style={{
                  transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                  transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
                }}
              />

              <AnimatePresence>
                {!isHovered && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-4 left-4 text-white/40 text-type-meta tracking-widest"
                  >
                    {project.num}
                  </motion.span>
                )}
              </AnimatePresence>

              <div
                className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-16"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
                }}
              >
                <AnimatePresence>
                  {isHovered && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.3, delay: 0.05 }}
                      className="text-white/60 text-type-prose font-medium uppercase tracking-[0.16em] mb-1"
                    >
                      {project.tag}
                    </motion.p>
                  )}
                </AnimatePresence>

                <h3 className="text-white text-type-h3 tracking-wide">
                  {project.title}
                </h3>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, delay: 0.08 }}
                      className="overflow-hidden"
                    >
                      <Link
                        href={`/interior-design/${project.id}`}
                        className="inline-flex items-center gap-2 text-white cursor-pointer hover:text-primary text-type-eyebrow font-medium uppercase tracking-widest border-b border-white/40 pb-0.5"
                      >
                        View project
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M1 7h12M8 3l5 4-5 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="square"
                          />
                        </svg>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="sm:hidden flex flex-col gap-px max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.1 }}
          >
            <div className="relative h-52 overflow-hidden">
              <Image
                src={project.image}
                alt={project.alt}
                fill
                sizes="100vw"
                className="object-cover"
                style={{ filter: "brightness(0.8)" }}
              />
            </div>
            <div className="bg-subtle px-5 py-4 border-t-[3px] border-primary">
              <p className="text-primary text-type-eyebrow font-medium uppercase tracking-widest mb-1">
                {project.tag}
              </p>
              <h3 className="text-foreground text-type-h3 tracking-wide mb-2">
                {project.title}
              </h3>
              <Link
                href={`/interior-design/${project.id}`}
                className="inline-flex items-center gap-2 text-primary text-type-eyebrow font-medium uppercase tracking-widest"
              >
                View project
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}
