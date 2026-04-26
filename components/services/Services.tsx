"use client";

export const interiorServices = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="14" width="36" height="26" rx="2" />
        <path d="M16 14V10a8 8 0 0 1 16 0v4" />
        <path d="M24 26v4M20 30h8" />
      </svg>
    ),
    title: "Commercial Spaces",
    desc: "Elegant interior solutions designed for comfort and modern living.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 40V20L24 8l16 12v20H8z" />
        <rect x="18" y="28" width="12" height="12" />
        <path d="M8 20h32" />
      </svg>
    ),
    title: "Residential Spaces",
    desc: "Tailored home interiors built around your lifestyle and taste.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="16" width="40" height="26" rx="2" />
        <path d="M4 22h40M16 22v20M32 22v20" />
        <path d="M12 16V10a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v6" />
      </svg>
    ),
    title: "Hotels & Apartments",
    desc: "Sophisticated hospitality interiors crafted for luxury experiences.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="10" width="36" height="30" rx="2" />
        <path d="M6 18h36M14 18v22M22 18v22M30 18v22" />
        <rect x="12" y="24" width="6" height="6" />
        <rect x="20" y="24" width="6" height="6" />
        <rect x="28" y="24" width="6" height="6" />
      </svg>
    ),
    title: "Public & Private Offices",
    desc: "Productive workspace designs that inspire focus and creativity.",
  },
];

export const constructionServices = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 40h32M12 40V20l12-12 12 12v20" />
        <rect x="20" y="28" width="8" height="12" />
        <path d="M12 26h6M30 26h6M12 32h6M30 32h6" />
      </svg>
    ),
    title: "Architectural Plan",
    desc: "Precision architectural drawings and planning for every build.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 38V16M10 16l8-8M10 16l-8-8" />
        <circle cx="34" cy="28" r="10" />
        <path d="M34 22v6l4 4" />
      </svg>
    ),
    title: "MEP Supplies",
    desc: "Reliable mechanical, electrical and plumbing supply solutions.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 42l8-8M14 34l6-18 6 6-18 12zM28 22l6-6a4 4 0 0 1 6 6l-6 6-6-6z" />
      </svg>
    ),
    title: "Construction Services",
    desc: "End-to-end construction management built for quality and speed.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="20" width="14" height="20" rx="1" />
        <rect x="26" y="12" width="14" height="28" rx="1" />
        <path d="M4 40h40" />
        <path d="M8 14l7-7 7 7M26 8l7-7 7 7" />
      </svg>
    ),
    title: "Materials Supply",
    desc: "Premium construction materials sourced to global standards.",
  },
];

export function ServiceCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e6e6e6] flex flex-col gap-4 hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
      
      {/* Icon container */}
      <div className="w-10 h-10 rounded-xl bg-[#f6f7f9] flex items-center justify-center text-primary-dark group-hover:bg-primary-dark group-hover:text-white transition-all duration-300">
        {icon}
      </div>

      <h3 className="font-bold text-[#1a1a1a] text-type-h3">{title}</h3>

      <p className="text-[#6b6b6b] text-type-prose leading-relaxed flex-1">{desc}</p>

      {/* Arrow */}
      <div className="mt-2">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#e6e6e6] text-[#1a1a1a] group-hover:bg-primary-dark group-hover:text-white group-hover:border-transparent transition-all duration-300">
          →
        </span>
      </div>

    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <main className="min-h-screen bg-[#f6f7f9] text-[#1a1a1a]">

        {/* HERO WITH BACKGROUND IMAGE */}
        <section className="relative w-full py-40 px-6 text-center overflow-hidden -mt-28">

          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/interior.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 pt-28">
            <h1 className="text-type-hero font-heading font-bold text-white">
              Our Services
            </h1>
          </div>

        </section>

        {/* SECTION LABEL + HEADING */}
        <section className="px-6 pt-20 pb-4 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-primary-dark text-type-meta font-semibold uppercase tracking-wide mb-3">
              Features Services
            </p>
            <h2 className="font-extrabold text-[#1a1a1a] leading-tight">
              A wide range of design &amp; construction services
            </h2>
          </div>
        </section>

        {/* INTERIOR DESIGN CARDS */}
        <section className="px-6 pt-12 pb-6">
          <div className="max-w-6xl mx-auto">
            <h3 className="font-bold mb-6 text-[#1a1a1a]">
              Interior Design Department
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {interiorServices.map((s) => (
                <ServiceCard key={s.title} {...s} />
              ))}
            </div>
          </div>
        </section>

        {/* ARCHITECTURE CARDS */}
        <section className="px-6 pt-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <h3 className="font-bold mb-6 text-[#1a1a1a]">
              Architecture &amp; Construction
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {constructionServices.map((s) => (
                <ServiceCard key={s.title} {...s} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24">
          <div className="max-w-4xl mx-auto text-center bg-white border border-[#e6e6e6] rounded-3xl p-10 shadow-sm">
            <h2 className="font-bold">
              Ready to start your project?
            </h2>
            <p className="text-[#6b6b6b] mt-3 text-type-prose">
              Let&apos;s turn your vision into reality with professional design and construction.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}
