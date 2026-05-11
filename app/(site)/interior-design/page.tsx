"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/supabase";
import { interiorServices } from "@/components/services/Services";
import { ServiceCard } from "@/components/services/ServiceCard";
import ProcessSection from "@/components/services/Processsection";
import TestimonialsSection from "@/components/services/Testimonialssection";
import ReadySection from "@/components/ReadToConnect";
import DepartmentContactStrip from "@/components/DepartmentContactStrip";

type InteriorProject = Project & {
  num: string;
  image: string;
  alt: string;
  tall: boolean;
  displayCategory: string;
};

function ProjectCard({
  project,
  index,
}: {
  project: InteriorProject;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/interior-design/${project.id}`} className="block">
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
              transform: hovered ? "scale(1.04)" : "scale(1)",
              filter: hovered ? "brightness(0.42)" : "brightness(0.82)",
              transition:
                "transform 0.6s cubic-bezier(0.4,0,0.2,1), filter 0.5s ease",
            }}
          />
        </div>

        <div
          className="absolute top-0 left-0 right-0 h-0.75 bg-primary origin-left"
          style={{
            transform: hovered ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
          }}
        />

        <span
          className="absolute top-3 right-3 text-white/30 text-type-eyebrow tracking-widest transition-opacity duration-300"
          style={{ opacity: hovered ? 0 : 1 }}
        >
          {project.num}
        </span>

        <div
          className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-14 transition-all duration-350"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          <p className="text-white/50 text-type-eyebrow font-medium uppercase tracking-[0.16em] mb-1">
            {project.displayCategory}
          </p>
          <h3 className="text-white font-heading text-type-prose leading-snug">
            {project.title}
          </h3>
        </div>
      </motion.div>
    </Link>
  );
}

export default function InteriorDesignPage() {
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
          data.map((project, index) => ({
            ...project,
            num: String(index + 1).padStart(2, "0"),
            image: project.images?.[0] || "/interior2.jpg",
            alt: project.title,
            tall: index % 4 === 0 || index % 4 === 3,
            displayCategory: project.subcategory || project.category,
          })),
        );
        setLoading(false);
      })
      .catch(() => {
        setProjects([]);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <section className="relative flex min-h-95 flex-col justify-end overflow-hidden sm:min-h-110">
        <Image
          src="/hero-interior.JPG"
          alt="Interior design hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{ filter: "brightness(0.35)" }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-28 pb-12 sm:px-8"
        >
          <p className="landing-eyebrow mb-4">Portfolio</p>
          <h1 className="mb-4 text-type-hero-mega font-bold leading-[1.05] text-white">
            Interior Design
          </h1>
          <p className="max-w-sm text-type-prose-sm leading-relaxed text-white/50">
            Refined spaces shaped through detail, comfort, and contemporary design.
          </p>
        </motion.div>
      </section>

      <section className="landing-section bg-background">
        <div className="landing-container">
          <div>
            <h2 className="landing-title">Interior Design Department</h2>
            <div className="landing-rule mb-6" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {interiorServices.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      <section className="landing-container px-6 pt-10 pb-32 sm:px-10 lg:px-0">
        <div>
          <h2 className="landing-title">Interior Design Portfolio</h2>
          <div className="landing-rule mb-6" />
        </div>
        <div
          className="columns-2 md:columns-3 gap-2"
          style={{ columnGap: "8px" }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>
      <DepartmentContactStrip department="interior" />
      <ProcessSection />
      <TestimonialsSection category="Interior Design" />
      <ReadySection />
    </main>
  );
}
