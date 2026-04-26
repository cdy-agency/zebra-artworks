"use client";

import { useState } from "react";
import Link from "next/link";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href?: string;
}

export function ServiceCard({ icon, title, desc, href = "/" }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className="relative flex flex-col bg-background border border-foreground/8 p-7 overflow-hidden group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* Top accent line sweeps on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-0.75 bg-primary origin-left"
        style={{
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      <div
        className="absolute top-0 left-0 w-0.75 bg-primary origin-top"
        style={{
          height: hovered ? "100%" : "40px",
          transition: "height 0.5s cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      {/* Icon */}
      <div
        className="w-11 h-11 flex items-center justify-center mb-6 transition-colors duration-300"
        style={{
          background: hovered ? "#005f75" : "var(--color-subtle)",
          color: hovered ? "#fff" : "#005f75",
        }}
      >
        {icon}
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
    </Link>
  );
}