"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { NewsItem } from "@/types/news";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80&auto=format&fit=crop";

type NewsSectionItem = {
  id: string;
  num: string;
  tag: string;
  title: string;
  date: string;
  image: string;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function mapNews(items: NewsItem[]): NewsSectionItem[] {
  return items.slice(0, 4).map((item, index) => ({
    id: item.id,
    num: String(index + 1).padStart(2, "0"),
    tag: item.tag,
    title: item.title,
    date: formatDate(item.date),
    image: item.images[0] || FALLBACK_IMAGE,
  }));
}

function NewsCard({ item, index }: { item: NewsSectionItem; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Link
        href={`/news/${item.id}`}
        className="group flex flex-col overflow-hidden bg-background"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative aspect-3/2 overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, 25vw"
            className="object-cover"
            style={{
              transform: hovered ? "scale(1.05)" : "scale(1)",
              filter: hovered ? "brightness(0.58)" : "brightness(0.88)",
              transition:
                "transform 0.6s cubic-bezier(0.4,0,0.2,1), filter 0.5s ease",
            }}
          />

          <div
            className="absolute top-0 left-0 right-0 h-0.75 bg-primary origin-left"
            style={{
              transform: hovered ? "scaleX(1)" : "scaleX(0)",
              transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
            }}
          />

          <span
            className="pointer-events-none absolute right-3 bottom-2 select-none font-bold leading-none"
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "rgba(255,255,255,0.12)",
            }}
          >
            {item.num}
          </span>
        </div>

        <div
          className="flex flex-1 flex-col px-4 pt-4 pb-5"
          style={{
            borderBottom: hovered
              ? "3px solid #005f75"
              : "3px solid transparent",
            transition: "border-color 0.3s",
          }}
        >
          <p className="mb-2 text-[9px] font-medium uppercase tracking-widest text-primary">
            {item.tag}
          </p>
          <h3
            className="mb-3 flex-1 text-sm leading-snug font-bold transition-colors duration-300"
            style={{ color: hovered ? "#005f75" : "var(--color-foreground)" }}
          >
            {item.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-widest text-gray-mid">
              {item.date}
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
              style={{
                opacity: hovered ? 1 : 0,
                transform: hovered ? "translateX(0)" : "translateX(-4px)",
                transition: "opacity 0.3s, transform 0.3s",
              }}
            >
              <path
                d="M1 7h12M8 3l5 4-5 4"
                stroke="#005f75"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function NewsCardSkeleton() {
  return (
    <div className="animate-pulse bg-background">
      <div className="aspect-3/2 bg-background/60" />
      <div className="space-y-3 px-4 pt-4 pb-5">
        <div className="h-3 w-20 bg-subtle" />
        <div className="h-4 w-full bg-subtle" />
        <div className="h-4 w-4/5 bg-subtle" />
        <div className="h-3 w-24 bg-subtle" />
      </div>
    </div>
  );
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsSectionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      setLoading(true);

      try {
        const res = await fetch("/api/news?status=Published", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to load news");
        }

        const data: NewsItem[] = await res.json();
        setNews(mapNews(data));
      } catch {
        setNews([]);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  const isEmpty = !loading && news.length === 0;

  return (
    <section className="bg-subtle px-6 py-20 sm:px-10 sm:py-28 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        className="mx-auto mb-10 flex max-w-6xl flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Press &amp; Media
          </p>
          <h2 className="text-4xl leading-[1.1] font-bold text-foreground sm:text-5xl">
            News &amp; Updates
          </h2>
          <div className="mt-1 h-0.5 w-56 rounded-full bg-accent" />
        </div>
        <Link
          href="/news"
          className="inline-flex w-fit shrink-0 items-center gap-2 border-b border-primary pb-0.5 text-xs font-medium uppercase tracking-widest text-primary transition-colors hover:text-primary-dark"
        >
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

      {isEmpty ? (
        <div className="mx-auto max-w-6xl rounded-2xl border border-line/20 bg-background px-6 py-14 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            No Published News
          </p>
          <h3 className="mt-3 text-2xl font-bold text-foreground">
            Fresh updates will appear here soon.
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-mid">
            Once articles are published from the admin dashboard, this section
            will automatically populate.
          </p>
        </div>
      ) : (
        <>
          <div className="mx-auto hidden max-w-6xl grid-cols-2 gap-1.5 sm:grid lg:grid-cols-4">
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <NewsCardSkeleton key={index} />
                ))
              : news.map((item, index) => (
                  <NewsCard key={item.id} item={item} index={index} />
                ))}
          </div>

          <div className="mx-auto flex max-w-7xl flex-col gap-px sm:hidden">
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex h-28 animate-pulse overflow-hidden bg-background"
                  >
                    <div className="w-[35%] bg-background/60" />
                    <div className="flex flex-1 flex-col justify-center gap-2 px-4">
                      <div className="h-3 w-20 bg-subtle" />
                      <div className="h-4 w-full bg-subtle" />
                      <div className="h-3 w-24 bg-subtle" />
                    </div>
                  </div>
                ))
              : news.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                  >
                    <Link
                      href={`/news/${item.id}`}
                      className="flex h-28 overflow-hidden bg-background"
                    >
                      <div className="relative w-[35%] shrink-0 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="35vw"
                          className="object-cover"
                          style={{ filter: "brightness(0.8)" }}
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-center gap-1 border-l-[3px] border-primary px-4">
                        <p className="text-[9px] uppercase tracking-widest text-primary">
                          {item.tag}
                        </p>
                        <h4 className="text-sm leading-snug text-foreground font-[family-name:var(--font-heading)]">
                          {item.title}
                        </h4>
                        <p className="text-[10px] uppercase tracking-widest text-gray-mid">
                          {item.date}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
          </div>
        </>
      )}
    </section>
  );
}
