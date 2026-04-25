"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ReadySection() {
  return (
    <section className="relative overflow-hidden flex items-center justify-center min-h-80">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80&auto=format&fit=crop"
        alt="Architecture and construction background"
        fill
        sizes="100vw"
        className="object-cover object-center"
        style={{ filter: "brightness(0.35)" }}
        priority={false}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-5 sm:py-10 max-w-2xl mx-auto">
        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-primary text-type-eyebrow font-medium uppercase tracking-[0.2em] mb-5"
        >
          Get started
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.65,
            delay: 0.08,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="font-heading text-white text-type-hero font-bold leading-[1.1] mb-5"
        >
          Ready to Start
          <br />
          Your Project?
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.65,
            delay: 0.15,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="text-white/65 text-type-prose sm:text-type-prose-lg font-light leading-relaxed mb-10"
        >
          Let&apos;s create something extraordinary together.
          <br className="hidden sm:block" />
          Contact us today to discuss your vision.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.65,
            delay: 0.22,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="
              inline-flex items-center gap-3
              bg-primary text-white
              px-8 py-4 text-type-eyebrow
              font-medium uppercase tracking-widest
              transition-colors duration-300 hover:bg-primary-dark
            "
          >
            Start a project
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 7h12M8 3l5 4-5 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
