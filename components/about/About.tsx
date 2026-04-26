import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  FileText,
  BookOpen,
  Sparkles,
  Shield,
  Lightbulb,
  Phone,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const values = [
  {
    icon: Sparkles,
    symbol: "✦",
    title: "Excellence",
    desc: "We strive for the highest standards in every project, ensuring quality that stands the test of time.",
    accent: "#005f75",
  },
  {
    icon: Lightbulb,
    symbol: "✦",
    title: "Innovation",
    desc: "We embrace creativity and new technologies to deliver cutting-edge design solutions.",
    accent: "#1a7a94",
  },
  {
    icon: Shield,
    symbol: "✦",
    title: "Integrity",
    desc: "We build lasting relationships through honesty, transparency, and ethical business practices.",
    accent: "#0d5c70",
  },
];

const stats = [
  { value: "2019", label: "Founded" },
  { value: "120+", label: "Projects Completed" },
  { value: "8+", label: "Years of Excellence" },
  { value: "40+", label: "Expert Team Members" },
];

const resources = [
  {
    icon: FileText,
    title: "Company Profile",
    desc: "A complete overview of who we are, our services, expertise, and track record.",
    file: "/downloads/ZAG-Rwanda-Company-Profile.pdf",
    label: "Download Profile",
    size: "PDF · 4.2 MB",
  },
  {
    icon: BookOpen,
    title: "Project Portfolio",
    desc: "Explore our completed projects across interior design, architecture, and construction.",
    file: "/downloads/ZAG-Rwanda-Portfolio.pdf",
    label: "Download Portfolio",
    size: "PDF · 12.8 MB",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main className="bg-subtle">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative text-center py-44 -mt-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/construction1.jpg"
            alt="Zebra Artworks Group"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/55 to-black/80" />
        </div>

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px),
                              repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px)`,
          }}
        />

        <div className="relative z-10 pt-24 px-6 max-w-4xl mx-auto">
          <p className="text-primary text-[11px] font-bold uppercase tracking-[0.25em] mb-5">
            Est. 2019 · Kigali, Rwanda
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
            Building Rwanda&apos;s Future,{" "}
            <span className="text-primary">One Space at a Time</span>
          </h1>
          <p className="text-white/55 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Founded by Eng. Jean Victor ISHIMWE, Zebra Artworks Group set out in
            2019 to redefine construction and interior design in Rwanda —
            blending global standards with deeply local identity.
          </p>
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────────────────────────────── */}
      <section className="bg-background border-y border-line/20">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-line/20">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center py-8 px-4 text-center"
              >
                <span className="text-3xl sm:text-4xl font-black text-primary leading-none mb-1.5">
                  {stat.value}
                </span>
                <span className="text-xs text-gray-mid font-medium uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story / Who we are ────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative h-[420px] sm:h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/interior1.jpg"
                  alt="Our story"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-5 -right-5 bg-primary text-white rounded-2xl px-6 py-4 shadow-xl">
                <p className="text-2xl font-black leading-none">5+</p>
                <p className="text-[11px] font-medium text-white/70 mt-1 uppercase tracking-wide">
                  Years registered
                </p>
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
                Our story
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground leading-tight mb-6">
                Who We Are
              </h2>
              <div className="space-y-4 text-sm text-gray-mid leading-relaxed">
                <p>
                  ZEBRA ARTWORKS GROUP embarked on its journey in{" "}
                  <strong className="text-foreground">May 2019</strong>, and by
                  July 2020 it was formally registered — marking a significant
                  milestone in its pursuit of excellence within the construction
                  industry.
                </p>
                <p>
                  Our primary goal is to set new standards of craftsmanship,
                  particularly focusing on the intricate details of construction
                  finishing and interior design. Founded by{" "}
                  <strong className="text-foreground">
                    Eng. Jean Victor ISHIMWE
                  </strong>{" "}
                  in Rwanda, our inception was driven by a deep-seated passion
                  to address prevalent challenges in interior design and
                  construction.
                </p>
                <p>
                  As our journey unfolded, we remained steadfast in our
                  commitment to innovation and customer satisfaction. With each
                  passing year our company has expanded in size, capacity, and
                  expertise — continuously evolving to meet the dynamic demands
                  of the modern market.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-8 bg-primary text-white text-sm font-bold px-7 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                Work with us <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission ───────────────────────────────────────────────────────── */}
      <section className="bg-primary py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20 items-start">
            <div>
              <p className="text-primary-light text-[11px] font-bold uppercase tracking-[0.2em] mb-3 text-white/50">
                Our purpose
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Our Mission
              </h2>
              <div className="mt-6 w-12 h-1 bg-white/30 rounded-full" />
            </div>
            <p className="text-white/75 text-sm sm:text-base leading-relaxed">
              At Zebra Artworks Group, we are dedicated to reshaping the
              architectural, construction, and interior design landscape through
              our unwavering commitment to sustainability, precision timing, and
              global-standard finishing. Our mission is to create innovative,
              environmentally conscious spaces that not only inspire but also
              enrich the lives of those who inhabit them.
              <br />
              <br />
              By integrating sustainable practices into every facet of our work,
              we strive to minimise our environmental footprint while maximising
              the aesthetic and functional potential of each project. Through
              collaborative partnerships, creative ingenuity, and meticulous
              attention to detail, we aim to surpass industry norms and set new
              benchmarks for excellence.
            </p>
          </div>
        </div>
      </section>

      {/* ── Vision ────────────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/interior1.jpg"
            alt="Our vision"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl">
            <p className="text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
              Looking ahead
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-6">
              Our Vision
            </h2>
            <p className="text-white/65 text-sm sm:text-base leading-relaxed">
              Our vision is to be recognised globally — and specifically across
              Africa — as a trailblazer in sustainable architectural and
              interior design, synonymous with uncompromising quality,
              impeccable timing, and cutting-edge innovation.
              <br />
              <br />
              We envision a future where every structure and interior space we
              create serves as a testament to our commitment to environmental
              stewardship, social responsibility, and superior craftsmanship. By
              harnessing the latest advancements in technology and design, we
              aspire to transcend boundaries and elevate the human experience
              through transformative spaces that evoke emotion, inspire
              creativity, and foster belonging.
            </p>
          </div>
        </div>
      </section>

      {/* ── Core Values ───────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
              What guides us
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground leading-tight">
              Our Core Values
            </h2>
            <p className="text-gray-mid text-sm mt-3 max-w-md mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-3 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="group relative bg-subtle border border-line/20 rounded-2xl p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {/* Subtle bg glow */}
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 pointer-events-none"
                    style={{ background: value.accent }}
                  />

                  {/* Symbol */}
                  <span
                    className="block text-lg font-black mb-5 transition-colors duration-300"
                    style={{ color: value.accent }}
                  >
                    {value.symbol}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border"
                    style={{
                      background: `${value.accent}12`,
                      borderColor: `${value.accent}30`,
                    }}
                  >
                    <Icon
                      size={20}
                      style={{ color: value.accent }}
                      strokeWidth={1.75}
                    />
                  </div>

                  <h3 className="text-lg font-black text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-mid leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Company Resources ─────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-subtle border-t border-line/20">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">
            {/* Left copy */}
            <div>
              <p className="text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
                Resources
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground leading-tight mb-4">
                Company Resources
              </h2>
              <p className="text-sm text-gray-mid leading-relaxed">
                Download our company profile and project portfolio to learn more
                about our work, our team, and the quality we bring to every
                engagement.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <Phone size={14} className="text-primary shrink-0" />
                <span className="text-sm text-gray-mid">
                  Questions?{" "}
                  <a
                    href="/contact"
                    className="text-primary font-semibold hover:underline"
                  >
                    Contact our team
                  </a>
                </span>
              </div>
            </div>

            {/* Download cards */}
            <div className="space-y-4">
              {resources.map((res) => {
                const Icon = res.icon;
                return (
                  <a
                    key={res.title}
                    href={res.file}
                    download
                    className="group flex items-start gap-5 bg-background border border-line/20 rounded-2xl p-6 hover:border-primary/40 hover:shadow-md transition-all duration-300"
                  >
                    {/* Icon tile */}
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                      <Icon
                        size={20}
                        className="text-primary"
                        strokeWidth={1.75}
                      />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold text-foreground mb-1">
                            {res.title}
                          </p>
                          <p className="text-xs text-gray-mid leading-relaxed">
                            {res.desc}
                          </p>
                        </div>
                        <div className="w-9 h-9 rounded-xl bg-subtle border border-line/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                          <Download
                            size={14}
                            className="text-gray-mid group-hover:text-white transition-colors duration-300"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-primary bg-primary/8 border border-primary/20 px-2.5 py-1 rounded-full">
                          <Download size={9} />
                          {res.label}
                        </span>
                        <span className="text-[10px] text-gray-mid">
                          {res.size}
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
