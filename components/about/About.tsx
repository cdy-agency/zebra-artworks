"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
import WhyChooseUs from "../services/Whychooseus";
import { motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Resource {
  id: string;
  title?: string;
  description?: string;
  file_name: string;
  file_url: string;
  file_size?: string;
}

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

// ─── Helper ───────────────────────────────────────────────────────────────────

function getFileIcon(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return FileText;
  return BookOpen;
}

// ─── Shared layout tokens ─────────────────────────────────────────────────────
// Use these class strings everywhere so a single edit fixes the whole page.
// container  → max-w + horizontal px
// section-py → consistent vertical rhythm for all sections

const container = "mx-auto w-full max-w-7xl px-6 sm:px-10";
const sectionPy = "py-20 sm:py-24";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loadingResources, setLoadingResources] = useState(true);

  useEffect(() => {
    fetch("/api/resources")
      .then((res) => res.json())
      .then((data) => setResources(data.resources ?? []))
      .catch(() => {})
      .finally(() => setLoadingResources(false));
  }, []);

  return (
    <main className="bg-subtle">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-95 flex-col justify-end overflow-hidden sm:min-h-110">
        <Image
          src="/construction1.jpg"
          alt="Construction hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{ filter: "brightness(0.35)" }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className={`relative z-10 ${container} pt-28 pb-12`}
        >
          <p className="landing-eyebrow mb-4">Our work</p>
          <h1 className="mb-4 text-type-hero-mega font-bold leading-[1.05] text-white">
            Architecture Construction
          </h1>
          <p className="max-w-sm text-type-prose-sm leading-relaxed text-white/50">
            Projects delivered with technical discipline, strong materials, and
            clear execution.
          </p>
        </motion.div>
      </section>

      {/* ── Stats strip ───────────────────────────────────────────────────── */}
      <section className="bg-background border-y border-line/20">
        <div className={container}>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-line/20">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center py-8 px-4 text-center"
              >
                <span className="mb-1.5 text-type-h2 font-black leading-none text-primary">
                  {stat.value}
                </span>
                <span className="text-type-eyebrow font-medium uppercase tracking-wide text-gray-mid">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ─────────────────────────────────────────────────────── */}
      <section className={sectionPy}>
        <div className={container}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative h-105 sm:h-125 overflow-hidden">
                <Image
                  src="/who-we-are.JPG"
                  alt="Our story"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-5 -right-5 bg-primary text-white px-6 py-4 shadow-xl">
                <p className="text-2xl font-black leading-none">5+</p>
                <p className="mt-1 text-type-eyebrow font-medium uppercase tracking-wide text-white/70">
                  Years registered
                </p>
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="landing-eyebrow">Our story</p>
              <h2 className="mb-6 text-foreground">Who We Are</h2>
              <div className="space-y-4 text-type-prose-sm leading-relaxed text-gray-mid">
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
                className="mt-8 inline-flex items-center gap-2 bg-primary px-7 py-3 text-type-ui font-bold text-white transition-opacity hover:opacity-90"
              >
                Work with us <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────────────────── */}
      <WhyChooseUs />

      {/* ── Mission ───────────────────────────────────────────────────────── */}
      <section className={`bg-primary ${sectionPy}`}>
        <div className={container}>
          <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20 items-start">
            <div>
              <p className="mb-3 text-type-eyebrow font-bold uppercase tracking-[0.2em] text-white/50">
                Our purpose
              </p>
              <h2 className="text-white">Our Mission</h2>
              <div className="mt-6 w-12 h-1 bg-white/30 rounded-full" />
            </div>
            <p className="text-type-prose-sm leading-relaxed text-white/75 sm:text-type-prose">
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
      <section className={`relative ${sectionPy} overflow-hidden`}>
        <div className="absolute inset-0">
          <Image
            src="/IMG_0948.JPG"
            alt="Our vision"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/70 to-black/40" />
        </div>
        <div className={`relative z-10 ${container}`}>
          <div className="max-w-2xl">
            <p className="landing-eyebrow">Looking ahead</p>
            <h2 className="mb-6 text-white">Our Vision</h2>
            <p className="text-type-prose-sm leading-relaxed text-white/80 sm:text-type-prose">
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
      <section className={`${sectionPy} bg-background`}>
        <div className={container}>
          <div className="text-center mb-14">
            <p className="landing-eyebrow">What guides us</p>
            <h2 className="text-foreground">Our Core Values</h2>
            <p className="mt-3 mx-auto max-w-md text-type-prose-sm text-gray-mid">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="group relative bg-subtle border border-line/20 p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 pointer-events-none"
                    style={{ background: value.accent }}
                  />
                  <span
                    className="block text-lg font-black mb-5 transition-colors duration-300"
                    style={{ color: value.accent }}
                  >
                    {value.symbol}
                  </span>
                  <div
                    className="w-12 h-12 flex items-center justify-center mb-5 border"
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
                  <h3 className="mb-3 text-foreground">{value.title}</h3>
                  <p className="text-type-prose-sm leading-relaxed text-gray-mid">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Company Resources ─────────────────────────────────────────────── */}
      {(loadingResources || resources.length > 0) && (
        <section className={`${sectionPy} bg-subtle border-t border-line/20`}>
          <div className={container}>
            <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">
              {/* Left copy */}
              <div>
                <p className="landing-eyebrow">Resources</p>
                <h2 className="mb-4 text-foreground">Company Resources</h2>
                <p className="text-type-prose-sm leading-relaxed text-gray-mid">
                  Download our company profile and project portfolio to learn
                  more about our work, our team, and the quality we bring to
                  every engagement.
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <Phone size={14} className="text-primary shrink-0" />
                  <span className="text-type-prose-sm text-gray-mid">
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
                {loadingResources ? (
                  <>
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="flex items-start gap-5 bg-background border border-line/20 p-6 animate-pulse"
                      >
                        <div className="w-12 h-12 bg-subtle rounded shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-40 bg-subtle rounded" />
                          <div className="h-3 w-64 bg-subtle rounded" />
                          <div className="h-6 w-32 bg-subtle rounded-full mt-3" />
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  resources.map((res) => {
                    const Icon = getFileIcon(res.file_name);
                    const label = res.title
                      ? `Download ${res.title}`
                      : "Download File";
                    return (
                      <a
                        key={res.id}
                        href={res.file_url}
                        download={res.file_name}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-5 bg-background border border-line/20 p-6 hover:border-primary/40 hover:shadow-md transition-all duration-300"
                      >
                        <div className="w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                          <Icon
                            size={20}
                            className="text-primary"
                            strokeWidth={1.75}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="mb-1 text-type-prose-sm font-bold text-foreground">
                                {res.title || res.file_name}
                              </p>
                              {res.description && (
                                <p className="text-type-eyebrow leading-relaxed text-gray-mid">
                                  {res.description}
                                </p>
                              )}
                            </div>
                            <div className="w-9 h-9 bg-subtle border border-line/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                              <Download
                                size={14}
                                className="text-gray-mid group-hover:text-white transition-colors duration-300"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-2.5 py-1 text-type-eyebrow font-semibold text-primary">
                              <Download size={9} />
                              {label}
                            </span>
                            {res.file_size && (
                              <span className="text-type-eyebrow text-gray-mid">
                                {res.file_size}
                              </span>
                            )}
                          </div>
                        </div>
                      </a>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
