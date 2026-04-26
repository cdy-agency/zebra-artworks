"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { apiGetTestimonials } from "@/lib/api";
import type { Testimonial, TestimonialCategory } from "@/types/testimonial";

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function TestimonialCard({
  item,
  index,
}: {
  item: Testimonial;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  if (item.featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.6,
          delay: index * 0.08,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="relative p-7 overflow-hidden row-span-2 flex flex-col transition-colors duration-300 cursor-default"
        style={{ background: hovered ? "#004d60" : "#005f75" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="absolute top-0 left-0 bottom-0 w-0.75 bg-white/30" />

        <span className="absolute top-5 right-5 text-[9px]  font-medium uppercase tracking-widest text-white/50 bg-white/10 px-2 py-1 line-clamp-1 max-w-[12rem]">
          {item.category}
        </span>

        <span
          className="font-bold text-white/15 leading-none mb-4 block"
          style={{ fontSize: "72px", lineHeight: "0.7" }}
        >
          &quot;
        </span>

        <p className="text-white/85 text-sm font-light leading-[1.8] italic flex-1 mb-6">
          {item.quote}
        </p>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/15 flex items-center justify-center shrink-0">
            <span className="text-white text-[11px] font-bold tracking-wider">
              {item.initials}
            </span>
          </div>
          <div>
            <p className="text-white text-sm font-medium leading-tight">
              {item.name}
            </p>
            <p className="text-white/50 text-[10px] uppercase tracking-widest mt-0.5">
              {item.role} · {item.location}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="relative p-6 overflow-hidden cursor-default flex flex-col transition-colors duration-300"
      style={{
        background: hovered ? "#eef5f7" : "var(--color-subtle)",
        borderLeft: hovered ? "3px solid #005f75" : "3px solid transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="absolute top-4 right-4 text-[9px]  font-medium uppercase tracking-widest text-primary bg-primary/8 px-2 py-1 line-clamp-1 max-w-[12rem]">
        {item.category}
      </span>

      <span
        className="font-bold text-primary/15 leading-none mb-3 block"
        style={{ fontSize: "48px", lineHeight: "0.7" }}
      >
        &quot;
      </span>

      <p className="text-foreground text-sm font-light leading-[1.8] italic flex-1 mb-5">
        {item.quote}
      </p>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-primary flex items-center justify-center shrink-0">
          <span className="text-white text-[10px] font-bold tracking-wider">
            {item.initials}
          </span>
        </div>
        <div>
          <p className="text-foreground text-xs  font-medium leading-tight">
            {item.name}
          </p>
          <p className="text-gray-mid text-[9px] uppercase tracking-widest mt-0.5">
            {item.role} · {item.location}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

interface TestimonialsSectionProps {
  category: TestimonialCategory;
}

export default function TestimonialsSection({
  category,
}: TestimonialsSectionProps) {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancel = false;
    setLoading(true);
    setError("");
    apiGetTestimonials(category)
      .then((data) => {
        if (!cancel) setItems(data);
      })
      .catch((e: unknown) => {
        if (!cancel) {
          setError(e instanceof Error ? e.message : "Failed to load");
        }
      })
      .finally(() => {
        if (!cancel) setLoading(false);
      });
    return () => {
      cancel = true;
    };
  }, [category]);

  const featured = items.find((t) => t.featured) ?? items[0] ?? null;
  const rest = featured
    ? items.filter((t) => t.id !== featured.id)
    : [];

  if (loading) {
    return (
      <section className="bg-background py-5 sm:py-10 px-6 sm:px-10 lg:px-20 relative">
        <div className="max-w-6xl mx-auto flex min-h-[16rem] flex-col items-center justify-center gap-4 rounded-lg border border-line/20 bg-subtle/40 py-16">
          <Loader2
            className="h-9 w-9 shrink-0 animate-spin text-primary"
            strokeWidth={1.5}
            aria-hidden
          />
          <p className="text-sm text-gray-mid">Loading testimonials…</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-background py-5 sm:py-10 px-6 sm:px-10 lg:px-20 relative">
        <p className="max-w-6xl mx-auto text-sm text-center text-red-600">
          {error}
        </p>
      </section>
    );
  }

  if (!featured) {
    return (
      <section className="bg-background py-5 sm:py-10 px-6 sm:px-10 lg:px-20 relative">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-mid py-10">
          No testimonials yet in this category.
        </div>
      </section>
    );
  }

  const displayFeatured: Testimonial = { ...featured, featured: true };
  const displayRest: Testimonial[] = rest.map((t) => ({
    ...t,
    featured: false,
  }));
  const mobileList: Testimonial[] = [displayFeatured, ...displayRest];

  const bottomRows = chunk(displayRest.slice(2), 2);

  return (
    <section className="bg-background py-5 sm:py-10 px-6 sm:px-10 lg:px-20 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 max-w-6xl mx-auto"
      >
        <div>
          <p className="text-primary text-xs font-medium uppercase tracking-[0.2em] mb-3">
            Client testimonials
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-[1.1]">
            What Our Clients Say
          </h2>
        </div>
      </motion.div>

      <div
        className="hidden sm:grid max-w-6xl mx-auto gap-1.5"
        style={{ gridTemplateColumns: "1fr 1fr" }}
      >
        <div className="row-span-2">
          <TestimonialCard item={displayFeatured} index={0} />
        </div>

        <div className="flex flex-col gap-1.5">
          {displayRest.slice(0, 2).map((item, i) => (
            <TestimonialCard key={item.id} item={item} index={i + 1} />
          ))}
        </div>

        {bottomRows.length > 0 ? (
          <div className="col-span-2 space-y-1.5">
            {bottomRows.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className="grid grid-cols-2 gap-1.5"
              >
                {row.map((item, i) => (
                  <TestimonialCard
                    key={item.id}
                    item={item}
                    index={i + 3 + rowIdx * 2}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="sm:hidden flex flex-col gap-1.5 max-w-7xl mx-auto">
        {mobileList.map((item, i) => (
          <TestimonialCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
