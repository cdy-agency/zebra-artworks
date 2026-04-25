"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/supabase";

type ConstructionProject = Project & {
  num: string;
  image: string;
  alt: string;
  tall: boolean;
  displayCategory: string;
  meta: string;
};

function ProjectCard({
  project,
  index,
}: {
  project: ConstructionProject;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/construction/${project.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.55,
          delay: index * 0.06,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="relative overflow-hidden cursor-pointer break-inside-avoid mb-2"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={`relative w-full ${project.tall ? "aspect-4/5" : "aspect-4/3"}`}
        >
          <Image
            src={project.image}
            alt={project.alt}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover"
            style={{
              transform: hovered ? "scale(1.05)" : "scale(1)",
              filter: hovered ? "brightness(0.38)" : "brightness(0.75)",
              transition:
                "transform 0.65s cubic-bezier(0.4,0,0.2,1), filter 0.5s ease",
            }}
          />
        </div>

        <div
          className="absolute top-0 left-0 w-0.75 bg-primary origin-bottom"
          style={{
            height: hovered ? "100%" : "0%",
            transition: "height 0.5s cubic-bezier(0.4,0,0.2,1)",
          }}
        />

        <span
          className="absolute top-2.5 left-3 text-white/30 text-type-eyebrow tracking-widest transition-opacity duration-300"
          style={{ opacity: hovered ? 0 : 1 }}
        >
          {project.num}
        </span>

        <span className="absolute top-2.5 right-3 text-type-eyebrow font-medium uppercase tracking-widest bg-black/55 text-white/60 px-2 py-1">
          {project.displayCategory}
        </span>

        <div
          className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-14"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          <p className="text-primary text-type-eyebrow font-medium uppercase tracking-widest mb-1">
            {project.displayCategory}
          </p>
          <h3 className="text-white font-heading text-type-prose leading-snug mb-1">
            {project.title}
          </h3>
          <p className="text-white/40 text-type-eyebrow tracking-widest uppercase">
            {project.meta}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

export default function ConstructionPage() {
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
          data.map((project, index) => ({
            ...project,
            num: String(index + 1).padStart(2, "0"),
            image: project.images?.[0] || "/construction1.jpg",
            alt: project.title,
            tall: index % 4 === 0 || index % 4 === 3,
            displayCategory: project.subcategory || project.category,
            meta: project.client || project.status || project.category,
          }))
        );
        setLoading(false);
      })
      .catch(() => {
        setProjects([]);
        setLoading(false);
      });
  }, []);

  const stats = [
    { num: `${projects.length}`, label: "Projects" },
    {
      num: `${projects.filter((project) => project.status === "Completed").length}`,
      label: "Completed",
    },
    {
      num: `${projects.filter((project) => project.status === "Ongoing").length}`,
      label: "Ongoing",
    },
    {
      num: `${new Set(projects.map((project) => project.subcategory)).size}`,
      label: "Types",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <section className="relative w-full py-40 -mt-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/construction1.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/65" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 max-w-6xl mx-auto px-6 pt-28 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <p className="text-primary text-type-eyebrow font-medium uppercase tracking-[0.2em] mb-4">
              Our work
            </p>
            <h1 className="text-white text-type-hero font-heading font-bold leading-[1.05]">
              Architecture
              <br />
              &amp; Construction
            </h1>
          </div>
        </motion.div>

        <div
          className="absolute bottom-2 right-8 font-bold leading-none select-none pointer-events-none"
          style={{
            fontSize: "clamp(80px, 14vw, 160px)",
            color: "rgba(255,255,255,0.03)",
          }}
        >
          {loading ? "" : projects.length}
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-primary grid grid-cols-4"
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className="text-center py-4 px-3 border-r border-white/15 last:border-r-0"
          >
            <p className="text-white font-heading text-type-h3 font-bold leading-none mb-1">
              {loading ? "--" : stat.num}
            </p>
            <p className="text-white/60 text-type-eyebrow font-medium uppercase tracking-widest">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      <section className="max-w-6xl mx-auto px-6 pt-20 pb-32">
        <div className="columns-2 md:columns-3" style={{ columnGap: "8px" }}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
