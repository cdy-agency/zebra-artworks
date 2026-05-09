"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { NewsItem } from "@/types/news";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop";

type NewsSectionItem = {
  id: string;
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  dateShort: string;
  image: string;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
}

function formatDateShort(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function mapNews(items: NewsItem[]): NewsSectionItem | null {
  if (!items.length) return null;
  const item = items[0];
  return {
    id: item.id,
    tag: item.tag,
    title: item.title,
    excerpt: item.excerpt || item.title,
    date: formatDate(item.date),
    dateShort: formatDateShort(item.date),
    image: item.images[0] || FALLBACK_IMAGE,
  };
}

function NewsSkeleton() {
  return (
    <section className="landing-section bg-subtle">
      <div className="landing-section-header">
        <div className="space-y-3">
          <div className="h-3 w-24 animate-pulse bg-background" />
          <div className="h-10 w-64 animate-pulse bg-background sm:h-12 sm:w-96" />
          <div className="h-1 w-40 animate-pulse bg-background" />
        </div>
        <div className="h-6 w-32 animate-pulse bg-background" />
      </div>

      <div
        className="landing-container flex flex-col sm:flex-row"
        style={{ minHeight: "420px" }}
      >
        <div
          className="w-full animate-pulse bg-background/60 sm:w-[55%]"
          style={{ minHeight: "320px" }}
        />
        <div className="flex flex-1 flex-col justify-center gap-4 bg-background px-8 py-10">
          <div className="h-3 w-20 animate-pulse bg-subtle" />
          <div className="h-8 w-full animate-pulse bg-subtle" />
          <div className="h-8 w-4/5 animate-pulse bg-subtle" />
          <div className="h-4 w-full animate-pulse bg-subtle" />
          <div className="h-4 w-3/4 animate-pulse bg-subtle" />
          <div className="h-3 w-28 animate-pulse bg-subtle" />
        </div>
      </div>
    </section>
  );
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsSectionItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    async function loadNews() {
      setLoading(true);
      try {
        const res = await fetch("/api/news?status=Published", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to load news");
        const data: NewsItem[] = await res.json();
        setNews(mapNews(data));
      } catch {
        setNews(null);
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, []);

  if (loading) return <NewsSkeleton />;

  return (
    <section className="landing-section bg-subtle">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        className="landing-section-header"
      >
        <div>
          <p className="landing-eyebrow">Press &amp; Media</p>
          <h2 className="landing-title">News &amp; Updates</h2>
          <div className="landing-rule" />
        </div>
        <Link href="/news" className="landing-link">
          View all articles
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 7h12M8 3l5 4-5 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </Link>
      </motion.div>

      {!news ? (
        <div className="landing-container border border-line/20 bg-background px-6 py-14 text-center">
          <p className="landing-eyebrow mb-0">No Published News</p>
          <h3 className="mt-3 text-foreground">
            Fresh updates will appear here soon.
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-type-prose-sm leading-relaxed text-gray-mid">
            Once articles are published from the admin dashboard, this section
            will automatically populate.
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="landing-container"
        >
          <Link
            href={`/news/${news.id}`}
            className="group flex flex-col sm:flex-row focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* ── Image panel ── */}
            <div
              className="relative overflow-hidden"
              style={{ flex: "0 0 55%", minHeight: "300px" }}
            >
              <Image
                src={news.image}
                alt={news.title}
                fill
                sizes="(max-width: 640px) 100vw, 55vw"
                className="object-cover"
                priority
                style={{
                  transform: hovered ? "scale(1.05)" : "scale(1)",
                  filter: hovered ? "brightness(0.5)" : "brightness(0.75)",
                  transition:
                    "transform 0.7s cubic-bezier(0.4,0,0.2,1), filter 0.5s ease",
                }}
              />

              {/* Top accent sweep */}
              <div
                className="absolute top-0 left-0 h-0.75 bg-primary"
                style={{
                  width: hovered ? "100%" : "0%",
                  transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
                }}
              />

              {/* Date badge — bottom-left of image */}
              <div className="absolute bottom-0 left-0 bg-primary px-5 py-3">
                <p className="text-type-eyebrow font-medium uppercase tracking-widest text-white">
                  {news.dateShort}
                </p>
              </div>

              {/* Tag chip — top-right */}
              <div className="absolute top-4 right-4 bg-black/60 px-3 py-1.5">
                <p className="text-type-eyebrow font-medium uppercase tracking-widest text-white/90">
                  {news.tag}
                </p>
              </div>
            </div>

            {/* ── Content panel ── */}
            <div
              className="relative flex flex-1 flex-col justify-between overflow-hidden bg-background px-8 py-10 sm:px-10 sm:py-12"
              style={{
                borderLeft: "3px solid",
                borderColor: hovered ? "var(--color-primary)" : "transparent",
                transition: "border-color 0.4s ease",
              }}
            >
              {/* Ghosted decorative numeral */}
              <span
                aria-hidden
                className="pointer-events-none absolute right-6 bottom-4 select-none font-bold leading-none"
                style={{
                  fontSize: "clamp(80px, 12vw, 140px)",
                  color: "rgba(0,95,117,0.06)",
                  lineHeight: 1,
                }}
              >
                01
              </span>

              {/* Top meta */}
              <div>
                <p className="mb-5 text-type-eyebrow font-medium uppercase tracking-widest text-primary">
                  Latest update
                </p>

                <h3
                  className="text-type-h2 font-heading font-bold leading-tight transition-colors duration-300"
                  style={{
                    color: hovered
                      ? "var(--color-primary)"
                      : "var(--color-foreground)",
                  }}
                >
                  {news.title}
                </h3>

                <p className="mt-4 text-type-prose font-light leading-relaxed text-gray-mid line-clamp-3">
                  {news.excerpt}
                </p>
              </div>

              {/* Bottom CTA row */}
              <div className="relative mt-10 flex items-center justify-between border-t border-line/20 pt-5">
                <span className="text-type-eyebrow font-medium uppercase tracking-widest text-gray-mid">
                  {news.date}
                </span>

                <span
                  className="inline-flex items-center gap-2 text-type-ui font-medium uppercase tracking-widest transition-colors duration-300"
                  style={{
                    color: hovered
                      ? "var(--color-primary)"
                      : "var(--color-foreground)",
                  }}
                >
                  Read article
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 14 14"
                    fill="none"
                    style={{
                      transform: hovered ? "translateX(3px)" : "translateX(0)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <path
                      d="M1 7h12M8 3l5 4-5 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      )}
    </section>
  );
}
