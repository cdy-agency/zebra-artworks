"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { NewsItem } from "@/types/news";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80&auto=format&fit=crop";

type NewsArticle = NewsItem & {
  image: string;
};

function formatLongDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function mapArticle(item: NewsItem): NewsArticle {
  return {
    ...item,
    image: item.images[0] || FALLBACK_IMAGE,
  };
}

export default function NewsDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function loadArticle() {
      setLoading(true);
      setError("");

      try {
        const [articleRes, relatedRes] = await Promise.all([
          fetch(`/api/news/${id}`, { cache: "no-store" }),
          fetch("/api/news?status=Published", { cache: "no-store" }),
        ]);

        if (articleRes.status === 404) {
          setArticle(null);
          return;
        }

        if (!articleRes.ok) {
          throw new Error("Failed to load article");
        }

        if (!relatedRes.ok) {
          throw new Error("Failed to load related articles");
        }

        const articleData: NewsItem = await articleRes.json();
        const relatedData: NewsItem[] = await relatedRes.json();

        setArticle(mapArticle(articleData));
        setRelatedNews(
          relatedData
            .filter((item) => item.id !== articleData.id)
            .slice(0, 3)
            .map(mapArticle),
        );
      } catch (error: unknown) {
        setError(
          error instanceof Error ? error.message : "Failed to load article",
        );
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <section className="relative h-[55vh] overflow-hidden bg-subtle sm:h-[68vh] animate-pulse" />
        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-24 lg:px-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-20">
            <div className="space-y-6 lg:col-span-2">
              <div className="h-10 w-3/4 bg-subtle" />
              <div className="h-6 w-full bg-subtle" />
              <div className="h-6 w-5/6 bg-subtle" />
              <div className="h-40 w-full bg-subtle" />
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="aspect-4/3 bg-subtle" />
                <div className="aspect-4/3 bg-subtle" />
              </div>
            </div>
            <div className="space-y-5">
              <div className="h-5 w-32 bg-subtle" />
              <div className="h-16 w-full bg-subtle" />
              <div className="h-16 w-full bg-subtle" />
              <div className="h-16 w-full bg-subtle" />
              <div className="h-14 w-full bg-subtle" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-center text-red-700">
          {error}
        </div>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-primary text-xs uppercase tracking-widest mb-3">
            404
          </p>
          <h1 className="text-foreground text-3xl font-bold mb-4">
            Article not found
          </h1>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-widest border-b border-primary pb-0.5"
          >
            Back to News
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 7h12M8 3l5 4-5 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="relative w-full h-[55vh] overflow-hidden bg-[#111] sm:h-[68vh] ">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ filter: "brightness(0.45)" }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute bottom-8 left-6 right-6 z-10 max-w-4xl sm:left-10 sm:right-10 lg:left-44 lg:right-20"
        >
          <p className="text-primary text-xs uppercase tracking-[0.2em] mb-3">
            {article.tag}
          </p>
          <h1 className="text-white text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-4">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-white/40 text-xs uppercase tracking-widest">
              {formatLongDate(article.date)}
            </span>
          </div>
        </motion.div>
      </section>

      <section className="px-6 sm:px-10 lg:px-20 py-16 sm:py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <p className="text-foreground text-xl sm:text-2xl leading-relaxed mb-10 border-l-[3px] border-primary pl-5">
              {article.excerpt}
            </p>

            <div className="space-y-6">
              {article.body.split("\n\n").map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
                  className="text-foreground text-base font-light leading-[1.85]"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {article.images.length > 0 && (
              <div className="mt-12">
                <p className="text-gray-mid text-xs uppercase tracking-[0.2em] mb-4">
                  Project images
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {article.images.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                      className="relative overflow-hidden aspect-4/3 group"
                    >
                      <Image
                        src={img}
                        alt={`${article.title} image ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-600 group-hover:scale-[1.03]"
                      />
                      <div className="absolute top-0 left-0 right-0 h-0.75 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="border-t-[3px] border-primary pt-6 sticky top-24">
              <p className="text-primary text-xs uppercase tracking-[0.2em] mb-6">
                Article info
              </p>
              <dl className="flex flex-col gap-5 mb-8">
                {[
                  { label: "Category", value: article.tag },
                  { label: "Published", value: formatLongDate(article.date) },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="border-b border-foreground/8 pb-5"
                  >
                    <dt className="text-gray-mid text-[10px] uppercase tracking-widest mb-1">
                      {label}
                    </dt>
                    <dd className="text-foreground text-sm font-light">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <Link
                href="/contact"
                className="flex items-center justify-between w-full bg-primary text-white px-5 py-4 text-xs font-medium uppercase tracking-widest hover:bg-primary-dark transition-colors"
              >
                Start a project
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 7h12M8 3l5 4-5 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {relatedNews.length > 0 && (
        <section className="px-6 sm:px-10 lg:px-20 pb-20 max-w-7xl mx-auto">
          <div className="border-t border-foreground/8 pt-12">
            <p className="text-primary text-xs uppercase tracking-[0.2em] mb-8">
              More articles
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedNews.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/news/${item.id}`} className="block group">
                    <div className="relative aspect-4/3 overflow-hidden mb-3">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="33vw"
                        className="object-cover transition-transform duration-600 group-hover:scale-[1.05]"
                      />
                      <div className="absolute top-0 left-0 right-0 h-0.75 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400" />
                    </div>
                    <p className="text-primary text-[9px] uppercase tracking-widest mb-1">
                      {item.tag}
                    </p>
                    <h4 className="text-foreground text-sm leading-snug mb-1 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-gray-mid text-[10px] uppercase tracking-widest">
                      {formatLongDate(item.date)}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
