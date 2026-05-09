"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const slides = [
  {
    image: "/interior1.jpg",
    tag: "Interior Design",
    title: "Turning Houses into Homes,",
    subtitle: "One Design at a Time",
    desc: "With every project we undertake, we are committed to turning houses into homes, one design at a time.",
  },
  {
    image: "/interior2.jpg",
    tag: "Living Spaces",
    title: "Modern Interior Spaces,",
    subtitle: "Designed for Living",
    desc: "We create beautiful and functional spaces tailored for comfort and everyday living.",
  },
  {
    image: "/interior3.jpg",
    tag: "Architecture",
    title: "Architecture That Inspires,",
    subtitle: "Built to Last",
    desc: "Our architectural designs combine creativity and durability for long-lasting impact.",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (index === current || animating) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 400);
    },
    [current, animating],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden">

      {/* Slides — crossfade */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            priority={i === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Top gradient — keeps navbar items readable */}
      <div className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-black/70 via-black/30 to-transparent z-10 pointer-events-none" />

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-transparent" />

      {/* Left vignette */}
      <div className="absolute inset-0 bg-linear-to-r from-black/25 to-transparent" />

      {/* Content — bottom-left, same horizontal padding as navbar */}
      <div className="relative z-10 flex flex-1 items-end px-5 pb-20 sm:px-8 md:pb-28">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-2xl">

            {/* Tag */}
            <div
              key={`tag-${current}`}
              className="mb-5 inline-flex items-center gap-2 opacity-0 animate-fade-up"
              style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
            >
              <span className="w-5 h-px bg-white" />
              <span className="text-type-eyebrow font-bold uppercase tracking-[0.2em] text-white">
                {slide?.tag}
              </span>
            </div>

            {/* Headline */}
            <h1
              key={`title-${current}`}
              className="mb-4 text-type-hero-mega font-bold leading-[1.05] tracking-tight text-white opacity-0 animate-fade-up"
              style={{ animationDelay: "80ms", animationFillMode: "forwards" }}
            >
              {slide.title}
              <span className="block text-white/55 font-normal italic">
                {slide.subtitle}
              </span>
            </h1>

            {/* Description */}
            <p
              key={`desc-${current}`}
              className="mb-10 max-w-lg text-type-prose-sm leading-relaxed text-white/68 opacity-0 animate-fade-up sm:text-type-prose"
              style={{ animationDelay: "160ms", animationFillMode: "forwards" }}
            >
              {slide.desc}
            </p>

            {/* CTAs */}
            <div
              key={`cta-${current}`}
              className="flex flex-col gap-3 opacity-0 animate-fade-up sm:flex-row"
              style={{ animationDelay: "240ms", animationFillMode: "forwards" }}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-primary px-7 py-3.5 text-type-ui font-semibold tracking-wide text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30"
              >
                Send Message
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/about"
                className="group inline-flex items-center justify-center gap-2 border border-white/25 bg-white/8 px-7 py-3.5 text-type-ui font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/14"
              >
                Explore Us
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — counter + dots, same px as navbar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          {/* Counter */}
          <div className="flex items-center gap-3">
            <span className="text-type-ui font-bold tabular-nums text-white">
              {String(current + 1).padStart(2, "0")}
            </span>
            <div className="w-20 h-px bg-white/15 relative overflow-hidden">
              <div
                key={current}
                className="absolute inset-y-0 left-0 bg-primary"
                style={{
                  animation: "progress 6s linear forwards",
                }}
              />
            </div>
            <span className="text-type-ui tabular-nums text-white/35">
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-300 h-1.5 ${
                  i === current ? "w-6 bg-primary" : "w-1.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fade-up 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
        @keyframes progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
