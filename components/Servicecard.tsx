"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export interface Service {
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
}

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group"
    >
      <Link
        href={service.href}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {/* Image + overlays */}
        <div className="relative overflow-hidden aspect-4/3 sm:aspect-3/2 lg:aspect-4/3">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority={index === 0}
          />

          {/* Subtle dark wash */}
          <div className="absolute inset-0 bg-black/25 transition-opacity duration-500 group-hover:opacity-0" />

          {/* Title bar — always visible on desktop, hidden on mobile */}
          <div className="absolute bottom-0 left-0 right-0 hidden sm:block bg-black/55 px-6 py-4 transition-opacity duration-500 group-hover:opacity-0">
            <h3 className="text-white text-xl sm:text-2xl tracking-wide">
              {service.title}
            </h3>
          </div>

          {/* Hover overlay — desktop only */}
          <div className="absolute inset-0 hidden sm:flex flex-col justify-end bg-primary/90 px-6 py-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <h3 className="text-white text-2xl mb-3 tracking-wide">
              {service.title}
            </h3>
            <p className="text-white/85 text-sm sm:text-base font-light leading-relaxed mb-5">
              {service.description}
            </p>
            <span className="inline-flex items-center gap-2 text-white text-sm font-medium uppercase tracking-widest border-b border-white/50 pb-0.5 w-fit">
              Explore
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 7h12M8 3l5 4-5 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </span>
          </div>

          {/* Top accent line sweeps on hover */}
          <div className="absolute top-0 left-0 h-0.75 w-0 bg-primary group-hover:w-full transition-all duration-500 ease-out" />
        </div>

        {/* Mobile description — always visible below image */}
        <div className="sm:hidden bg-subtle px-5 py-4 border-t-[3px] border-primary">
          <h3 className="text-foreground text-lg mb-2">
            {service.title}
          </h3>
          <p className="text-gray-mid text-sm font-light leading-relaxed mb-3">
            {service.description}
          </p>
          <span className="inline-flex items-center gap-2 text-primary text-xs font-medium uppercase tracking-widest">
            Explore service
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 7h12M8 3l5 4-5 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
