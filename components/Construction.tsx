"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: 1,
    num: "01",
    tag: "Commercial · Kigali",
    title: "Kigali Business Tower",
    description:
      "A 12-storey mixed-use development in the heart of Kigali. Designed around natural ventilation, local materials, and a curtain-wall façade that reflects the city skyline.",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80&auto=format&fit=crop",
    alt: "Kigali business tower modern architecture",
    featured: true,
  },
  {
    id: 2,
    num: "02",
    tag: "Residential · Kigali",
    title: "Nyarutarama Villa",
    description:
      "A private family villa combining indoor-outdoor living with clean architectural lines.",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=700&q=80&auto=format&fit=crop",
    alt: "Nyarutarama residential villa exterior",
    featured: false,
  },
  {
    id: 3,
    num: "03",
    tag: "Corporate · Kigali",
    title: "Norrsken House Annex",
    description:
      "Corporate expansion block built to complement the existing Norrsken campus with precision finishing.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80&auto=format&fit=crop",
    alt: "Modern corporate office construction",
    featured: false,
  },
  {
    id: 4,
    num: "04",
    tag: "Multi-unit · Kigali",
    title: "Kimironko Apartments",
    description:
      "A contemporary multi-unit residential block delivering quality affordable housing in Kigali.",
    image:
      "https://images.unsplash.com/photo-1523217582562-09d05e10e3bd?w=700&q=80&auto=format&fit=crop",
    alt: "Kimironko modern apartment block",
    featured: false,
  },
];

const featured = projects[0];
const rows = projects.slice(1);

export default function LatestConstruction() {
  const [hoveredFeatured, setHoveredFeatured] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <section className="bg-background py-20 sm:py-28 px-6 sm:px-10 lg:px-20">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 max-w-7xl mx-auto"
      >
        <div>
          <p className="text-primary text-xs font-medium uppercase tracking-[0.2em] mb-3">
            Our work
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-[1.1]">
            Latest Architecture & Construction
          </h2>
          <div className="h-0.5 w-56 bg-accent mt-1 rounded-full" />
        </div>
        <Link
          href="/constructions"
          className="inline-flex items-center gap-2 text-primary text-xs font-medium uppercase tracking-widest border-b border-primary pb-0.5 w-fit transition-colors hover:text-primary-dark shrink-0"
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

      {/* Desktop grid — featured left + stacked rows right */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="hidden sm:grid grid-cols-2 gap-1.5 max-w-7xl mx-auto"
        style={{ height: "520px" }}
      >
        {/* Featured card */}
        <Link
          href="/constructions"
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

          {/* Left accent bar */}
          <div
            className="absolute bottom-0 left-0 w-0.75 bg-primary origin-bottom"
            style={{
              height: hoveredFeatured ? "100%" : "0%",
              transition: "height 0.5s cubic-bezier(0.4,0,0.2,1)",
            }}
          />

          {/* Content */}
          <div
            className="absolute bottom-0 left-0 right-0 px-6 pb-7 pt-20"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 70%, transparent 100%)",
            }}
          >
            <p className="text-white/55 text-[10px] font-medium uppercase tracking-widest mb-2">
              {featured.tag}
            </p>
            <h3 className="text-white font-bold text-2xl leading-snug">
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
                  <p className="text-white/72 text-sm font-light leading-relaxed mt-3 mb-4">
                    {featured.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-white text-[10px] font-medium uppercase tracking-widest border-b border-white/40 pb-0.5">
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

        {/* Stacked rows */}
        <div className="flex flex-col gap-1.5">
          {rows.map((project) => {
            const isHovered = hoveredRow === project.id;
            return (
              <Link
                key={project.id}
                href="/constructions"
                className="relative flex overflow-hidden flex-1"
                onMouseEnter={() => setHoveredRow(project.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {/* Image */}
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

                {/* Text body */}
                <div
                  className="flex-1 flex flex-col justify-center px-5 py-4 transition-colors duration-400"
                  style={{ background: isHovered ? "#005f75" : "#111111" }}
                >
                  <p className="text-white/35 text-[10px] font-medium uppercase tracking-widest mb-1">
                    {project.num}
                  </p>
                  <h3 className="text-white font-bold text-base leading-snug mb-1">
                    {project.title}
                  </h3>
                  <p
                    className="text-[10px] font-medium uppercase tracking-widest transition-colors duration-300"
                    style={{
                      color: isHovered
                        ? "rgba(255,255,255,0.65)"
                        : "rgba(255,255,255,0.35)",
                    }}
                  >
                    {project.tag}
                  </p>
                </div>

                {/* Arrow */}
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

      {/* Mobile — stacked list */}
      <div className="sm:hidden flex flex-col gap-px max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.1 }}
          >
            <Link href="/constructions" className="flex overflow-hidden h-28">
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
                <p className="text-white/40 text-[10px] font-medium uppercase tracking-widest mb-1">
                  {project.tag}
                </p>
                <h3 className="text-white font-bold text-sm leading-snug">
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
