"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { NewsItem } from "@/types/news";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80&auto=format&fit=crop";

type NewsCardItem = NewsItem & {
  image: string;
  featured: boolean;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function mapNews(items: NewsItem[]): NewsCardItem[] {
  return items.map((item, index) => ({
    ...item,
    image: item.images[0] || FALLBACK_IMAGE,
    featured: index === 0,
  }));
}

function NewsCard({
  item,
  index,
  featured = false,
}: {
  item: NewsCardItem;
  index: number;
  featured?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: index * 0.07,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="col-span-1 sm:col-span-2 lg:col-span-2"
      >
        <Link
          href={`/news/${item.id}`}
          className="relative block overflow-hidden group"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="relative aspect-16/7 w-full overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="100vw"
              priority
              className="object-cover"
              style={{
                transform: hovered ? "scale(1.03)" : "scale(1)",
                filter: hovered ? "brightness(0.38)" : "brightness(0.58)",
                transition:
                  "transform 0.7s cubic-bezier(0.4,0,0.2,1), filter 0.5s ease",
              }}
            />
          </div>
          <div
            className="absolute top-0 left-0 right-0 h-0.75 bg-primary origin-left"
            style={{
              transform: hovered ? "scaleX(1)" : "scaleX(0)",
              transition: "transform 0.45s",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 pb-8 pt-24"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
            }}
          >
            <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-primary">
              {item.tag}
            </p>
            <h2 className="mb-2 max-w-2xl text-2xl leading-snug text-white sm:text-3xl lg:text-4xl">
              {item.title}
            </h2>
            <p
              className="max-w-xl overflow-hidden text-sm font-light leading-relaxed text-white/50 transition-all duration-400"
              style={{
                maxHeight: hovered ? "60px" : "0",
                opacity: hovered ? 1 : 0,
              }}
            >
              {item.excerpt}
            </p>
            <p className="mt-3 text-[10px] font-medium uppercase tracking-widest text-white/35">
              {formatDate(item.date)}
            </p>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Link
        href={`/news/${item.id}`}
        className="block group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative mb-0 aspect-4/3 overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            style={{
              transform: hovered ? "scale(1.05)" : "scale(1)",
              filter: hovered ? "brightness(0.55)" : "brightness(0.85)",
              transition:
                "transform 0.6s cubic-bezier(0.4,0,0.2,1), filter 0.5s ease",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-0.75 bg-primary origin-left"
            style={{
              transform: hovered ? "scaleX(1)" : "scaleX(0)",
              transition: "transform 0.45s",
            }}
          />
        </div>

        <div className="border-b border-foreground/8 px-0 py-4 transition-colors duration-300">
          <div className="mb-2 flex items-center justify-between gap-4">
            <p className="text-[9px] font-medium uppercase tracking-widest text-primary">
              {item.tag}
            </p>
            <p className="text-[9px] font-medium uppercase tracking-widest text-gray-mid">
              {formatDate(item.date)}
            </p>
          </div>
          <h3
            className="mb-2 text-base leading-snug text-foreground transition-colors duration-300"
            style={{ color: hovered ? "#005f75" : "" }}
          >
            {item.title}
          </h3>
          <p className="line-clamp-2 text-sm font-light leading-relaxed text-gray-mid">
            {item.excerpt}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

function NewsCardSkeleton({ featured = false }: { featured?: boolean }) {
  if (featured) {
    return (
      <div className="col-span-1 sm:col-span-2 lg:col-span-2 animate-pulse">
        <div className="aspect-16/7 w-full bg-subtle" />
      </div>
    );
  }

  return (
    <div className="animate-pulse">
      <div className="aspect-4/3 bg-subtle" />
      <div className="space-y-3 border-b border-foreground/8 py-4">
        <div className="h-3 w-24 bg-subtle" />
        <div className="h-5 w-full bg-subtle" />
        <div className="h-5 w-4/5 bg-subtle" />
        <div className="h-4 w-full bg-subtle" />
        <div className="h-4 w-2/3 bg-subtle" />
      </div>
    </div>
  );
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsCardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNews() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("/api/news?status=Published", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to load articles");
        }

        const data: NewsItem[] = await res.json();
        setNews(mapNews(data));
      } catch (error: unknown) {
        setError(
          error instanceof Error ? error.message : "Failed to load articles",
        );
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  const showEmpty = !loading && news.length === 0;

  return (
    <main className="min-h-screen bg-background">
      <section className="relative flex min-h-95 flex-col justify-end overflow-hidden sm:min-h-110">
        <Image
          src={FALLBACK_IMAGE}
          alt="News hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{ filter: "brightness(0.35)" }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />
        <div className="absolute top-0 left-0 right-0 z-10 h-0.75 bg-primary" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-12 sm:px-10 lg:px-20"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary">
            Press &amp; Media
          </p>
          <h1
            className="mb-4 font-bold leading-[1.05] text-white"
            style={{ fontSize: "clamp(38px, 7vw, 80px)" }}
          >
            News &amp; Updates
          </h1>
          <p className="max-w-sm text-sm font-light leading-relaxed text-white/50">
            Stories, updates, and insights from the team at ZAG Rwanda.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-10 sm:py-20 lg:px-20">
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {showEmpty ? (
          <div className="rounded-2xl border border-line/20 bg-subtle px-6 py-16 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">
              No Articles Yet
            </p>
            <h2 className="mt-3 text-2xl font-bold text-foreground">
              News will appear here once it is published.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-mid">
              The newsroom is empty right now. Publish articles from the admin
              dashboard to populate this page.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <NewsCardSkeleton key={index} featured={index === 0} />
                ))
              : news.map((item, index) => (
                  <NewsCard
                    key={item.id}
                    item={item}
                    index={index}
                    featured={item.featured}
                  />
                ))}
          </div>
        )}
      </section>
    </main>
  );
}
