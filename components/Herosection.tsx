"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/interior1.jpg",
    title: "Turning Houses into Homes,",
    subtitle: "One Design at a Time",
    desc: "With every project we undertake, we are committed to turning houses into homes, one design at a time.",
  },
  {
    image: "/interior2.jpg",
    title: "Modern Interior Spaces,",
    subtitle: "Designed for Living",
    desc: "We create beautiful and functional spaces tailored for comfort and everyday living.",
  },
  {
    image: "/interior3.jpg",
    title: "Architecture That Inspires,",
    subtitle: "Built to Last",
    desc: "Our architectural designs combine creativity and durability for long-lasting impact.",
  },
  {
    image: "/interior4.jpg",
    title: "Creative Designs,",
    subtitle: "Professional Execution",
    desc: "From concept to completion, we bring ideas to life with precision and excellence.",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-dark/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1
          key={current}
          className="text-type-hero-mega font-heading font-bold text-background leading-tight mb-6 tracking-tight transition-all duration-500 max-w-[22ch] mx-auto"
        >
          {slides[current].title}
          <span className="block">{slides[current].subtitle}</span>
        </h1>

        <p
          key={current + "-desc"}
          className="text-background/75 text-type-lead md:text-type-prose-lg font-medium max-w-xl mx-auto mb-10 leading-relaxed transition-all duration-500"
        >
          {slides[current].desc}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <Link
            href="/contact"
            className="group inline-flex min-w-56 items-center justify-center gap-2 bg-primary px-8 py-4 text-type-ui font-semibold text-background shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-xl md:text-type-prose-sm"
          >
             Send Message
            <ArrowUpRight
              size={18}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
          <Link
            href="/about"
            className="group inline-flex min-w-56 items-center justify-center gap-2 border border-white/30 bg-white/8 px-8 py-4 text-type-ui font-semibold text-background backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/14 md:text-type-prose-sm"
          >
            Explore Us
            <ArrowUpRight
              size={18}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full ${
              current === i ? "bg-primary" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
