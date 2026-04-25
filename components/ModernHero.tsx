// 📁 components/ModernHero.tsx

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ModernHero() {
  return (
    <section className="relative w-full h-[90vh] flex items-center overflow-hidden">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/interior2.jpg')" }}
      />

      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        
        {/* LEFT TEXT */}
        <div className="max-w-xl">
          <h1 className="text-type-hero-mega font-heading font-bold text-white leading-tight">
            Turning Houses into Homes, One Design at a Time
          </h1>
        </div>

        {/* RIGHT CONTENT */}
        <div className="max-w-sm">
          <p className="text-white/80 text-type-prose leading-relaxed mb-6">
            With every project we undertake, we are committed to turning
            houses into homes, one design at a time.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4 flex-wrap">
            
            {/* Primary Button */}
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-primary text-white text-type-ui px-5 py-2.5 rounded-full hover:bg-primary-dark transition"
            >
              Get in touch
              <ArrowUpRight size={16} />
            </Link>

            {/* Secondary Button */}
            <button className="text-white text-type-ui px-5 py-2.5 rounded-full border border-white/40 hover:bg-white/10 transition">
              Call us: +250784843042
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}