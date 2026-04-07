import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/interior.jpg')" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gray-dark/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-background leading-tight mb-6 tracking-tight">
          Turning Houses into Homes,{" "}
          <span className="block">One Design at a Time</span>
        </h1>

        <p className="text-background/75 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-light">
          With every project we undertake, we are committed to turning houses
          into homes, one design at a time.
        </p>

        <Link
          href="/projects"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-background font-semibold text-sm md:text-base px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
        >
          Explore Our Projects
          <ArrowUpRight
            size={18}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
          />
        </Link>
      </div>
    </section>
  );
}
