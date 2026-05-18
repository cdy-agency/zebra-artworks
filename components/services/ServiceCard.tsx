"use client";

import { useState } from "react";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  desc: string;
  href?: string;
}

export function ServiceCard({ title, desc, href = "/" }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col bg-background border border-foreground/8 p-7 overflow-hidden group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* Icon */}
      <div className="w-10 h-10 rounded-xl bg-[#f6f7f9] flex items-center justify-center overflow-hidden transition-all duration-300">
        <Image
          src="/icon-zaga.png"
          alt="ZAG Rwanda"
          width={28}
          height={28}
          className="object-contain  transition-all duration-300"
        />
      </div>

      {/* Title */}
      <h3
        className="font-bold text-xl leading-snug mb-3 transition-colors duration-300"
        style={{ color: hovered ? "#005f75" : "var(--color-foreground)" }}
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-mid text-sm font-light leading-relaxed flex-1 mb-6">
        {desc}
      </p>
    </div>
  );
}