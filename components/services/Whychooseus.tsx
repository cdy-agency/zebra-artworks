"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

interface Resource {
  id: string;
  title?: string;
  description?: string;
  file_name: string;
  file_url: string;
  file_size?: string;
}

const features = [
  {
    num: "01",
    title: "Expert Team",
    desc: "Skilled professionals with strong experience.",
  },
  {
    num: "02",
    title: "Quality Materials",
    desc: "We use trusted, high-quality materials.",
  },
  {
    num: "03",
    title: "On-Time Delivery",
    desc: "Projects delivered on schedule.",
  },
  {
    num: "04",
    title: "Transparent Pricing",
    desc: "Clear pricing with no hidden costs.",
  },
];

function isCompanyProfile(resource: Resource) {
  const searchableText = [
    resource.title,
    resource.description,
    resource.file_name,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchableText.includes("company profile");
}

function FeatureRow({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="relative flex cursor-default gap-4 border-b border-foreground/6 py-2 transition-all duration-300 first:border-t first:border-foreground/6"
      style={{ paddingLeft: hovered ? "10px" : "0" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 bg-primary transition-all duration-300"
        style={{ width: hovered ? "3px" : "0px" }}
      />

      {/* Number */}
      <span
        className="w-6 shrink-0 pt-0.5 text-type-eyebrow font-bold transition-colors duration-300"
        style={{ color: hovered ? "#005f75" : "rgba(0,95,117,0.4)" }}
      >
        {feature.num}
      </span>

      {/* Content */}
      <div className="flex-1">
        <h4
          className="mb-1.5 text-type-h5 font-bold transition-colors duration-300"
          style={{ color: hovered ? "#005f75" : "var(--color-foreground)" }}
        >
          {feature.title}
        </h4>
        <p className="text-type-prose-sm leading-relaxed text-gray-mid">
          {feature.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const router = useRouter();
  const [companyProfile, setCompanyProfile] = useState<Resource | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    fetch("/api/resources")
      .then((res) => res.json())
      .then((data) => {
        const resources: Resource[] = data.resources ?? [];
        setCompanyProfile(resources.find(isCompanyProfile) ?? null);
      })
      .catch(() => {})
      .finally(() => setLoadingProfile(false));
  }, []);

  const handleDownload = (
    event: React.MouseEvent<HTMLButtonElement>,
    resource: Resource
  ) => {
    event.stopPropagation();

    const link = document.createElement("a");
    link.href = resource.file_url;
    link.download = resource.file_name;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="landing-section relative overflow-hidden bg-background">
      <div className="landing-container grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Left — text + features */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="landing-eyebrow mb-4">The Best Choice</p>
            <h2
              className="mb-5 text-foreground"
              style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
            >
              Why Choose
              <br />
              <span className="text-primary">ZAG</span> Rwanda?
            </h2>
          </motion.div>

          {/* Feature list */}
          <div>
            {features.map((feature, index) => (
              <FeatureRow key={feature.num} feature={feature} index={index} />
            ))}
          </div>

          {(loadingProfile || companyProfile) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="mt-8"
            >
              {loadingProfile ? (
                <div className="overflow-hidden border border-line/20 bg-subtle/70 p-5 animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 shrink-0 bg-white/80" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-40 bg-white/80" />
                      <div className="h-3 w-56 bg-white/70" />
                    </div>
                    <div className="h-10 w-10 bg-white/80" />
                  </div>
                </div>
              ) : companyProfile ? (
                <div
                  role="link"
                  tabIndex={0}
                  onClick={() => router.push("/about#company-resources")}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      router.push("/about#company-resources");
                    }
                  }}
                  className="group inline-flex w-full cursor-pointer items-center gap-3 border border-primary/15 bg-white px-4 py-3 transition-all duration-200 hover:border-primary/40 hover:bg-primary/[0.02]"
                  aria-label="Go to portfolio documents on the About page"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-red-600/90">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
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

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/50">
                      Company Profile
                    </p>
                    <p className="truncate text-[13px] font-semibold text-foreground">
                      {companyProfile.title || companyProfile.file_name}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(event) => handleDownload(event, companyProfile)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center border border-primary/15 bg-white text-primary/50 transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
                    aria-label={`Download ${companyProfile.title || companyProfile.file_name}`}
                  >
                    <Download
                      size={15}
                      strokeWidth={2}
                      className="transition-all duration-200 hover:translate-y-0.5"
                    />
                  </button>

                  <ArrowRight
                    size={15}
                    strokeWidth={2}
                    className="shrink-0 text-primary/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </div>
              ) : null}
            </motion.div>
          )}
        </div>

        {/* Right — image with stat overlay */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="relative hidden lg:block self-start top-24"
        >
          {/* Image */}
          <div className="relative overflow-hidden" style={{ height: "500px" }}>
            <Image
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80&auto=format&fit=crop"
              alt="ZAG Rwanda construction project"
              fill
              sizes="50vw"
              className="object-cover"
              style={{ filter: "brightness(0.88)" }}
            />

            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-0.75 bg-primary z-10" />
            {/* Left accent */}
            <div className="absolute top-0 left-0 bottom-0 w-0.75 bg-primary z-10" />
          </div>

          {/* Stat box — overlaps image bottom-right */}
          <div className="absolute bottom-0 right-0 bg-primary px-6 py-5 z-10">
            <p
              className="text-white font-bold leading-none mb-1"
              style={{ fontSize: "clamp(28px, 3vw, 40px)" }}
            >
              8+
            </p>
            <p className="text-type-eyebrow font-medium uppercase tracking-widest text-white/60">
              Years experience
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
