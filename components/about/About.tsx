"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Download,
  Eye,
  FileText,
  BookOpen,
  Sparkles,
  Shield,
  Lightbulb,
  Phone,
  X,
} from "lucide-react";
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
];

function getFileIcon(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return FileText;
  return BookOpen;
}

function isPdfFile(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() === "pdf";
}

const container = "mx-auto w-full max-w-7xl px-6 sm:px-10";
const sectionPy = "py-20 sm:py-24";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loadingResources, setLoadingResources] = useState(true);
  const [activeResource, setActiveResource] = useState<Resource | null>(null);

  useEffect(() => {
    fetch("/api/resources")
      .then((res) => res.json())
      .then((data) => setResources(data.resources ?? []))
      .catch(() => {})
      .finally(() => setLoadingResources(false));
  }, []);

  useEffect(() => {
    if (!activeResource) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveResource(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [activeResource]);

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

          <h1 className="mb-5 text-type-hero-mega font-bold leading-[1.05]">
            <span className="text-white">ZEBRA ARTWORK </span>
            <br />
            <span className="text-white">GROUP LTD </span>
          </h1>

          {/* Slogan */}
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-primary" />
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60">
              Best Choice
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Stats strip ───────────────────────────────────────────────────── */}
      <section className="bg-background border-y border-line/20">
        <div className={container}>
          <div className="grid grid-cols-2 md:grid-cols-3 divide-x divide-y md:divide-y-0 divide-line/20">
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
      {/* <WhyChooseUs /> */}

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
        <section
          id="company-resources"
          className={`${sectionPy} bg-subtle border-t border-line/20`}
        >
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
              <div className="grid gap-4 sm:grid-cols-2">
                {loadingResources ? (
                  <>
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 border border-primary/15 bg-background px-4 py-3 animate-pulse"
                      >
                        <div className="h-9 w-9 shrink-0 bg-subtle" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 w-20 bg-subtle rounded" />
                          <div className="h-4 w-40 bg-subtle rounded" />
                        </div>
                        <div className="flex gap-2">
                          <div className="h-9 w-20 bg-subtle rounded" />
                          <div className="h-9 w-9 bg-subtle rounded" />
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  resources.map((res) => {
                    const Icon = getFileIcon(res.file_name);
                    const isPdf = isPdfFile(res.file_name);
                    return (
                      <div
                        key={res.id}
                        className="group flex items-center gap-3 border border-primary/15 bg-background px-4 py-3 transition-all duration-200 hover:border-primary/40 hover:bg-primary/[0.02]"
                      >
                        {isPdf ? (
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-red-600/90">
                            <svg
                              viewBox="0 0 24 24"
                              className="h-5 w-5"
                              fill="none"
                            >
                              <path
                                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                                fill="white"
                                fillOpacity="0.15"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M14 2v6h6"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <text
                                x="5"
                                y="19"
                                fontSize="6"
                                fontWeight="800"
                                fill="white"
                                letterSpacing="0.5"
                                fontFamily="sans-serif"
                              >
                                PDF
                              </text>
                            </svg>
                          </div>
                        ) : (
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-primary/20 bg-primary/10 text-primary">
                            <Icon size={16} strokeWidth={1.8} />
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/50">
                            {isPdf ? "PDF Document" : "Document"}
                          </p>
                          <p className="truncate text-[13px] font-semibold text-foreground">
                            {res.title || res.file_name}
                          </p>
                          {res.file_size && (
                            <p className="mt-1 text-type-eyebrow text-gray-mid">
                              {res.file_size}
                            </p>
                          )}
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveResource(res)}
                            className="inline-flex items-center gap-2 border border-primary/15 bg-white px-3 py-2 text-type-eyebrow font-semibold uppercase tracking-[0.16em] text-primary transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
                          >
                            <Eye size={13} strokeWidth={1.9} />
                            View
                          </button>
                          <a
                            href={res.file_url}
                            download={res.file_name}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-9 w-9 items-center justify-center border border-line/20 bg-subtle text-gray-mid transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
                            aria-label={`Download ${res.title || res.file_name}`}
                          >
                            <Download size={14} strokeWidth={1.9} />
                          </a>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {activeResource && (
        <div
          className="fixed inset-0 z-1000 flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-[2px]"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setActiveResource(null);
            }
          }}
        >
          <div className="flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden border border-line/20 bg-background shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-line/20 px-5 py-4">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary/55">
                  Document Viewer
                </p>
                <h3 className="truncate text-type-h5 font-bold text-foreground">
                  {activeResource.title || activeResource.file_name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activeResource.file_url}
                  download={activeResource.file_name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-primary/15 bg-white px-3 py-2 text-type-eyebrow font-semibold uppercase tracking-[0.16em] text-primary transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
                >
                  <Download size={13} strokeWidth={1.9} />
                  Download
                </a>
                <button
                  type="button"
                  onClick={() => setActiveResource(null)}
                  className="flex h-9 w-9 items-center justify-center border border-line/20 bg-subtle text-gray-mid transition-colors hover:border-primary hover:bg-primary hover:text-white"
                  aria-label="Close document viewer"
                >
                  <X size={15} strokeWidth={1.9} />
                </button>
              </div>
            </div>

            <div className="min-h-[65vh] flex-1 bg-subtle">
              <iframe
                src={activeResource.file_url}
                title={activeResource.title || activeResource.file_name}
                className="h-full min-h-[65vh] w-full border-0 bg-white"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
