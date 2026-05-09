"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";

type ConstructionProject = Project & {
  image: string;
  alt: string;
  tag: string;
};

function ConstructionSkeleton() {
  return (
    <section className="landing-section bg-background">
      <div className="landing-section-header">
        <div className="space-y-3">
          <Skeleton className="h-3 w-24 rounded-full" />
          <Skeleton className="h-10 sm:h-12 w-72 sm:w-120 rounded-xl" />
          <Skeleton className="h-1 w-56 rounded-full" />
        </div>
        <Skeleton className="h-6 w-36 rounded-full" />
      </div>

      <div className="landing-container grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index}>
            <Skeleton className="aspect-4/3 sm:aspect-3/2 lg:aspect-4/3 w-full" />
            <div className="sm:hidden bg-subtle px-5 py-4 space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function LatestConstruction() {
  const [projects, setProjects] = useState<ConstructionProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects?category=Architecture%20%26%20Construction")
      .then((res) => res.json())
      .then((data: Project[] | { error?: string }) => {
        if (!Array.isArray(data)) {
          setProjects([]);
          setLoading(false);
          return;
        }
        setProjects(
          data.slice(0, 2).map((project) => ({
            ...project,
            image: project.images?.[0] || "/construction1.jpg",
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

  if (loading) return <ConstructionSkeleton />;
  if (projects.length === 0) return null;

  return (
    <section className="landing-section bg-background">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        className="landing-section-header"
      >
        <div>
          <p className="landing-eyebrow">Our work</p>
          <h2 className="landing-title">
            Latest Architecture &amp; Construction
          </h2>
          <div className="landing-rule" />
        </div>
        <Link href="/construction" className="landing-link">
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

      <div className="landing-container grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="group"
          >
            <Link
              href={`/construction/${project.id}`}
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {/* Image + overlays */}
              <div className="relative overflow-hidden aspect-4/3 sm:aspect-3/2 lg:aspect-4/3">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={index === 0}
                />

                {/* Subtle dark wash */}
                <div className="absolute inset-0 bg-black/25 transition-opacity duration-500 group-hover:opacity-0" />

                {/* Title bar — always visible on desktop, fades on hover */}
                <div className="absolute bottom-0 left-0 right-0 hidden sm:block bg-black/55 px-6 py-4 transition-opacity duration-500 group-hover:opacity-0">
                  <h3 className="text-white text-type-h3 tracking-wide">
                    {project.title}
                  </h3>
                </div>

                {/* Hover overlay — desktop only */}
                <div className="absolute inset-0 hidden sm:flex flex-col justify-end bg-primary/90 px-6 py-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-white text-type-h2 mb-3 tracking-wide">
                    {project.title}
                  </h3>
                  <p className="text-white/85 text-type-prose-sm sm:text-type-prose font-light leading-relaxed mb-5">
                    {project.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-white text-type-ui font-medium uppercase tracking-widest border-b border-white/50 pb-0.5 w-fit">
                    View project
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M1 7h12M8 3l5 4-5 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="square"
                      />
                    </svg>
                  </span>
                </div>

                {/* Top accent line sweeps in on hover */}
                <div className="absolute top-0 left-0 h-0.75 w-0 bg-primary group-hover:w-full transition-all duration-500 ease-out" />
              </div>

              {/* Mobile — visible below image */}
              <div className="sm:hidden bg-subtle px-5 py-4 border-t-[3px] border-primary">
                <h3 className="text-foreground text-type-h3 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-mid text-type-prose font-light leading-relaxed mb-3">
                  {project.description}
                </p>
                <span className="inline-flex items-center gap-2 text-primary text-type-eyebrow font-medium uppercase tracking-widest">
                  View project
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7h12M8 3l5 4-5 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
