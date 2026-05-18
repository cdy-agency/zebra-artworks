"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const slides = [
  {
    image: "/4.jpg",
    tag: "Interior Design",
    title: "Turning Houses into Homes,",
    subtitle: "One Design at a Time",
    desc: "With every project we undertake, we are committed to turning houses into homes, one design at a time.",
  },
  {
    image: "/3.jpg",
    tag: "Architecture",
    title: "Architecture That Inspires,",
    subtitle: "Built to Last",
    desc: "Our architectural designs combine creativity and durability, creating spaces that stand the test of time.",
  },
  {
    image: "/2.png",
    tag: "Construction",
    title: "Built with Precision,",
    subtitle: "Crafted with Care",
    desc: "Every structure we build reflects our commitment to quality craftsmanship and attention to detail.",
  }
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const switchTo = useCallback(
    (index: number) => {
      if (index === current) return;
      setFading(true);
      setTimeout(() => {
        setCurrent(index);
        setFading(false);
      }, 350);
    },
    [current],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background images — crossfade */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.image}
            alt={s.tag}
            fill
            priority={i === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/52" />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
        {/* Tag */}
        <p
          className={`mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition-all duration-350 ${
            fading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          {slide?.tag}
        </p>

        {/* Heading */}
        <h1
          className={`mb-5 text-type-hero-mega uppercase font-bold leading-tight text-white max-w-6xl transition-all duration-350 ${
            fading ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
          }`}
        >
          {slide.title}
          <br />
          {slide.subtitle}
        </h1>

        {/* Description */}
        <p
          className={`mb-10 text-sm sm:text-base text-white/70 max-w-xl leading-relaxed transition-all duration-350 delay-75 ${
            fading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          {slide.desc}
        </p>

        {/* CTA */}
        <Link
          href="/about"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-8 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
        >
          Explore Us ↗
        </Link>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => switchTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-2.5 h-2.5 bg-white scale-110"
                : "w-2 h-2 bg-white/35 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
