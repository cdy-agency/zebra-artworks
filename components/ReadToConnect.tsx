"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import WhyChooseUs from "./services/Whychooseus";

export default function ReadySection() {
  return (
    <>
      <section className="relative flex min-h-80 items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80&auto=format&fit=crop"
          alt="Architecture and construction background"
          fill
          sizes="100vw"
          className="object-cover object-center"
          style={{ filter: "brightness(0.35)" }}
          priority={false}
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 mx-auto max-w-2xl px-6 py-16 text-center sm:py-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-5 text-primary text-type-eyebrow font-medium uppercase tracking-[0.2em]"
          >
            Get started
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.65,
              delay: 0.08,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="mb-5 font-heading text-type-hero text-white"
          >
            LET’S TALK BUSINESS HERE.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.65,
              delay: 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="mb-10 text-type-prose text-white/65 sm:text-type-prose-lg"
          >
            We create innovative designs and quality results that elevate your
            space and identity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.65,
              delay: 0.22,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
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
              Discuss with us

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

      <WhyChooseUs />
    </>
  );
}