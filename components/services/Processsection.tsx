"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Consultation",
    desc: "We meet to understand your vision, needs, budget, and project timeline in full detail.",
  },
  {
    num: "02",
    title: "Concept Development",
    desc: "Our team creates detailed design concepts, mood boards, and 3D visualizations for your approval.",
  },
  {
    num: "03",
    title: "Execution",
    desc: "We manage every detail of implementation, coordinating with contractors and suppliers.",
  },
  {
    num: "04",
    title: "Delivery",
    desc: "Final walkthrough and handover of your beautifully finished space, ready to use.",
  },
];

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="flex flex-col items-center text-center px-4 relative z-10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Number badge */}
      <div className="relative mb-6">
        {/* Outer ring */}
        <div
          className="absolute -inset-1 border transition-colors duration-300"
          style={{
            borderColor: hovered ? "rgba(0,95,117,0.5)" : "rgba(0,95,117,0.2)",
          }}
        />
        {/* Badge */}
        <div
          className="relative w-14 h-14 flex items-center justify-center transition-colors duration-300"
          style={{ background: hovered ? "#004557" : "#005f75" }}
        >
          <span
            className="text-white text-base font-bold leading-none"
            style={{
              fontFamily: "var(--font-heading)",
              transform: hovered ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.3s ease",
              display: "block",
            }}
          >
            {step.num}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3
        className="font-bold text-base leading-snug mb-3 transition-colors duration-300"
        style={{ color: hovered ? "#005f75" : "#000000" }}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm font-light leading-relaxed"
        style={{ color: "#555" }}
      >
        {step.desc}
      </p>
    </motion.div>
  );
}

export default function ProcessSection() {
  return (
    <section
      className="relative py-5 sm:py-10 px-6 sm:px-10 lg:px-20 overflow-hidden"
      style={{
        backgroundColor: "#e8f0f2",
        backgroundImage: `
          linear-gradient(135deg, #c8d8dc 25%, transparent 25%),
          linear-gradient(225deg, #c8d8dc 25%, transparent 25%),
          linear-gradient(315deg, #c8d8dc 25%, transparent 25%),
          linear-gradient(45deg,  #c8d8dc 25%, transparent 25%)
        `,
        backgroundSize: "40px 40px",
      }}
    >
    
    <div className="absolute inset-0 bg-white/50" />
    
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 text-center mb-16 sm:mb-20"
      >
        <p className="text-primary text-xs font-medium uppercase tracking-[0.2em] mb-4">
          How we work
        </p>
        <h2
          className="font-bold text-foreground leading-[1.1] mb-4"
          style={{ fontSize: "clamp(28px, 5vw, 48px)", color: "#000" }}
        >
          Our Design Process
        </h2>
        <p
          className="text-sm font-light leading-relaxed max-w-sm mx-auto"
          style={{ color: "#555" }}
        >
          A streamlined approach from vision to reality — every project, every
          time.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="relative max-w-4xl mx-auto">
        {/* Connecting line — desktop only */}
        <div
          className="absolute hidden sm:block"
          style={{
            top: "28px",
            left: "calc(12.5% + 16px)",
            right: "calc(12.5% + 16px)",
            height: "1px",
            background:
              "linear-gradient(to right, transparent, #005f75 20%, #005f75 80%, transparent)",
            opacity: 0.25,
            zIndex: 0,
          }}
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-4">
          {steps.map((step, index) => (
            <StepCard key={step.num} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
