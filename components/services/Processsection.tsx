"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "LISTENING",
    desc: "We listen carefully to your needs and align with your vision to fully understand your expectations.",
  },
  {
    num: "02",
    title: "CONSULTATION",
    desc: "Our team visits the site to collect and analyze all necessary data for the project.",
  },
  {
    num: "03",
    title: "CONCEPT DEVELOPMENT",
    desc: "We brainstorm and transform your ideas into design solutions that match your vision, budget, and timeline.",
  },
  {
    num: "04",
    title: "EXECUTION & DELIVERY",
    desc: "Our team works hand in hand to deliver the project with quality and precision, ensuring proper inspection and a smooth handover.",
  },
];

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.13,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent border — animated on hover */}

      <div
        className="absolute top-0 left-0 right-0 h-0.75 transition-colors duration-350"
        style={{ backgroundColor: hovered ? "#005f75" : "rgba(0,95,117,0.2)" }}
      />

      {/* Card body */}
      <div className="relative flex flex-col h-full pt-8 pb-8 pr-6">
        {/* Ghost numeral */}
        <span
          aria-hidden
          className="absolute top-2 right-3 select-none font-bold leading-none pointer-events-none"
          style={{
            fontSize: "clamp(56px, 6vw, 80px)",
            color: hovered ? "rgba(0,95,117,0.12)" : "rgba(0,95,117,0.07)",
            transition: "color 0.35s ease",
            lineHeight: 1,
          }}
        >
          {step.num}
        </span>

        {/* Step pill */}
        <div className="mb-6 w-fit">
          <div
            className="flex items-center justify-center px-3 py-1 transition-colors duration-300"
            style={{
              background: hovered ? "#005f75" : "rgba(0,95,117,0.1)",
            }}
          >
            <span
              className="text-xs font-bold uppercase tracking-widest transition-colors duration-300"
              style={{ color: hovered ? "#ffffff" : "#005f75" }}
            >
              Step {step.num}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-heading font-bold leading-tight mb-3 transition-colors duration-300"
          style={{
            fontSize: "clamp(16px, 1.6vw, 20px)",
            color: hovered ? "#005f75" : "var(--color-foreground)",
          }}
        >
          {step.title}
        </h3>

        {/* Description */}
        <p
          className="text-type-prose font-light leading-relaxed"
          style={{ color: "var(--color-gray-mid)" }}
        >
          {step.desc}
        </p>

        {/* Bottom arrow — reveals on hover */}
        <div
          className="mt-6 flex items-center gap-2 transition-all duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-6px)",
          }}
        >
          <div className="h-px w-8" style={{ background: "#005f75" }} />
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 7h12M8 3l5 4-5 4"
              stroke="#005f75"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProcessSection() {
  return (
    <section className="relative overflow-hidden bg-background max-w-6xl mx-auto py-12 sm:py-14">
      {/* Soft radial tint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 80% 50%, rgba(0,95,117,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute hidden sm:block"
          />

          <div className="mb-10 sm:mb-12">
              <h2 className="font-heading text-type-h2 text-foreground max-w-2xl">
                OUR PROCESS TO A SUCCESSFUL PROJECT
              </h2>
              <div className="landing-rule mt-4" />
            </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <StepCard key={step.num} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
