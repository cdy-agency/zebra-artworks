"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const BASE_PARTNERS = [
  { name: "Britam", src: "/Britam.png" },
  { name: "Mayfair", src: "/MAYFAIR.svg" },
  { name: "MUA", src: "/MUA.svg" },
  { name: "Prime", src: "/Prime.svg" },
];

const PARTNERS = [
  ...BASE_PARTNERS,
  ...BASE_PARTNERS,
  ...BASE_PARTNERS,
  ...BASE_PARTNERS,
];

function PartnerLogo({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex items-center justify-center px-8 shrink-0 group cursor-default">
      <div className="relative h-8 w-28 transition-all duration-300 opacity-90 group-hover:opacity-100">
        <Image
          src={src}
          alt={name}
          fill
          className="object-contain"
          sizes="112px"
          unoptimized
        />
      </div>
    </div>
  );
}

export default function PartnersSection() {
  return (
    <section className="relative overflow-hidden py-10 bg-diamond">
      <div className="absolute inset-0 bg-white/50" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-start mb-5"
        >
          <div className="inline-flex flex-col items-start">
            <h3 className="text-lg uppercase tracking-[0.2em] text-primary font-bold">
              Trusted by leading organisations
            </h3>
            <div className="h-0.5 w-56 bg-accent mt-1 rounded-full" />
          </div>
        </motion.div>

        {/* Marquee track */}
        <div className="relative overflow-hidden">
          <div
            className="absolute left-0 inset-y-0 w-20 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.55) 0%, transparent 100%)",
            }}
          />
          <div
            className="absolute right-0 inset-y-0 w-20 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, rgba(255,255,255,0.55) 0%, transparent 100%)",
            }}
          />

          <div
            className="flex w-max"
            style={{ animation: "zag-marquee 28s linear infinite" }}
          >
            {PARTNERS.map((p, i) => (
              <PartnerLogo key={i} name={p.name} src={p.src} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes zag-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-25%); }
        }
        div[style*="zag-marquee"]:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
