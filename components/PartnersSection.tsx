"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Partner } from "@/lib/supabase";

function PartnerLogo({
  name,
  src,
  link,
}: {
  name?: string;
  src: string;
  link?: string;
}) {
  const content = (
    <div className="group flex shrink-0 flex-col items-center justify-center gap-2 px-10">
      <div className="relative h-16 w-48 opacity-80 transition-all duration-300 group-hover:opacity-100 sm:h-20 sm:w-56">
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
        <p className="max-w-[160px] truncate text-center text-type-eyebrow font-medium tracking-wide text-gray-mid">
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
    <section className="landing-section-compact relative overflow-hidden bg-white">
      <div className="landing-container relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div>
            <p className="landing-eyebrow">Partners</p>
            <h2 className="landing-title">Our Partners</h2>
            <div className="landing-rule-small" />
          </div>
        </motion.div>

        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 z-10 w-24 pointer-events-none bg-gradient-to-r from-white to-transparent" />
          <div className="absolute inset-y-0 right-0 z-10 w-24 pointer-events-none bg-gradient-to-l from-white to-transparent" />

          <div className="flex items-center w-max animate-[zag-marquee_32s_linear_infinite]">
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
