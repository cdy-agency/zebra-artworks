"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Partner } from "@/lib/supabase";

function PartnerLogo({ name, src, link }: { name?: string; src: string; link?: string }) {
  const content = (
    <div className="flex flex-col items-center justify-center px-10 shrink-0 group gap-2">
      <div className="relative h-16 w-48 sm:h-20 sm:w-56 transition-all duration-300 opacity-80 group-hover:opacity-100">
        <Image
          src={src}
          alt={name ?? "Partner logo"}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 192px, 224px"
          unoptimized
        />
      </div>
      {name && (
        <p className="text-xs font-bold text-gray-500  tracking-wide text-center truncate max-w-[160px]">
          {name}
        </p>
      )}
    </div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" title={name}>
        {content}
      </a>
    );
  }

  return content;
}

export default function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    fetch("/api/partners")
      .then((res) => res.json())
      .then((data) => setPartners(data.partners ?? []))
      .catch(() => {});
  }, []);

  const PARTNERS = [...partners, ...partners, ...partners, ...partners];

  if (partners.length === 0) return null;

  return (
    <section className="relative overflow-hidden py-12 bg-gray-100">
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-start mb-8"
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
          {/* Left fade — matches gray-200 */}
          <div
            className="absolute left-0 inset-y-0 w-24 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgb(229,231,235) 0%, transparent 100%)",
            }}
          />
          {/* Right fade — matches gray-200 */}
          <div
            className="absolute right-0 inset-y-0 w-24 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, rgb(229,231,235) 0%, transparent 100%)",
            }}
          />

          <div
            className="flex w-max items-center"
            style={{ animation: "zag-marquee 32s linear infinite" }}
          >
            {PARTNERS.map((p, i) => (
              <PartnerLogo key={i} src={p.logo} name={p.name} link={p.link} />
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