"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const features = [
  {
    num: "01",
    title: "Expert Team",
    desc: "Highly skilled professionals with extensive experience in architecture and construction management.",
  },
  {
    num: "02",
    title: "Quality Materials",
    desc: "We source premium construction materials from trusted suppliers to ensure lasting quality.",
  },
  {
    num: "03",
    title: "On-Time Delivery",
    desc: "We understand the importance of timelines and consistently deliver projects on schedule.",
  },
  {
    num: "04",
    title: "Transparent Pricing",
    desc: "Clear, upfront pricing with no hidden costs. We work within your budget to maximise value.",
  },
];

function FeatureRow({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="relative flex cursor-default gap-4 border-b border-foreground/6 py-5 transition-all duration-300 first:border-t first:border-foreground/6"
      style={{ paddingLeft: hovered ? "10px" : "0" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 bg-primary transition-all duration-300"
        style={{ width: hovered ? "3px" : "0px" }}
      />

      {/* Number */}
      <span
        className="w-6 shrink-0 pt-0.5 text-type-eyebrow font-bold transition-colors duration-300"
        style={{ color: hovered ? "#005f75" : "rgba(0,95,117,0.4)" }}
      >
        {feature.num}
      </span>

      {/* Content */}
      <div className="flex-1">
        <h4
          className="mb-1.5 text-type-h5 font-bold transition-colors duration-300"
          style={{ color: hovered ? "#005f75" : "var(--color-foreground)" }}
        >
          {feature.title}
        </h4>
        <p className="text-type-prose-sm leading-relaxed text-gray-mid">
          {feature.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="landing-section relative overflow-hidden bg-background">

      <div className="landing-container grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Left — text + features */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="landing-eyebrow mb-4">
              Why work with us
            </p>
            <h2
              className="mb-5 text-foreground"
              style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
            >
              Why Choose
              <br />
              <span className="text-primary">ZAG</span> Rwanda?
            </h2>
            <p className="mb-10 max-w-sm text-type-prose-sm leading-relaxed text-gray-mid">
              Built on precision, trust, and a passion for exceptional spaces —
              every project reflects our core values.
            </p>
          </motion.div>

          {/* Feature list */}
          <div>
            {features.map((feature, index) => (
              <FeatureRow key={feature.num} feature={feature} index={index} />
            ))}
          </div>
        </div>

        {/* Right — image with stat overlay */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="relative hidden lg:block self-start top-24"
        >
          {/* Image */}
          <div className="relative overflow-hidden" style={{ height: "500px" }}>
            <Image
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80&auto=format&fit=crop"
              alt="ZAG Rwanda construction project"
              fill
              sizes="50vw"
              className="object-cover"
              style={{ filter: "brightness(0.88)" }}
            />

            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-0.75 bg-primary z-10" />
            {/* Left accent */}
            <div className="absolute top-0 left-0 bottom-0 w-0.75 bg-primary z-10" />
          </div>

          {/* Stat box — overlaps image bottom-right */}
          <div className="absolute bottom-0 right-0 bg-primary px-6 py-5 z-10">
            <p
              className="text-white font-bold leading-none mb-1"
              style={{ fontSize: "clamp(28px, 3vw, 40px)" }}
            >
              40+
            </p>
            <p className="text-type-eyebrow font-medium uppercase tracking-widest text-white/60">
              Projects completed
            </p>
          </div>

          {/* Second stat — overlaps top-right */}
          <div className="absolute top-0 right-0 bg-[#111] px-6 py-5 z-10">
            <p
              className="text-white font-bold leading-none mb-1"
              style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
            >
              5+
            </p>
            <p className="text-type-eyebrow font-medium uppercase tracking-widest text-white/40">
              Years experience
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
