"use client";

import { useState } from "react";
import { Loader2, Pencil, Search, Trash2 } from "lucide-react";
import { Testimonial, TESTIMONIAL_CATEGORIES } from "@/types/testimonial";

interface Props {
  items: Testimonial[];
  loading?: boolean;
  onEdit: (item: Testimonial) => void;
  onDelete: (id: string) => void;
}

export default function TestimonialsTable({
  items,
  loading = false,
  onEdit,
  onDelete,
}: Props) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<"All" | (typeof TESTIMONIAL_CATEGORIES)[number]>(
    "All",
  );

  const inputCls =
    "border border-line/30 bg-subtle text-foreground rounded-lg px-3 py-2 text-xs outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all";

  const filtered = items.filter((t) => {
    const q = search.toLowerCase();
    const matchQ =
      t.name.toLowerCase().includes(q) ||
      t.quote.toLowerCase().includes(q) ||
      t.location.toLowerCase().includes(q);
    const matchC = cat === "All" || t.category === cat;
    return matchQ && matchC;
  });

  if (loading) {
    return (
      <div
        className="flex min-h-[14rem] flex-col items-center justify-center gap-3 rounded-xl border border-line/20 bg-background p-12"
        role="status"
        aria-live="polite"
        aria-label="Loading testimonials"
      >
        <Loader2
          className="h-8 w-8 shrink-0 animate-spin text-primary"
          strokeWidth={1.5}
          aria-hidden
        />
        <p className="text-sm text-gray-mid">Loading testimonials…</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line/20 bg-background shadow-sm overflow-hidden">
      <div className="flex flex-wrap items-center gap-3 border-b border-line/20 px-4 py-3">
        <div className="relative flex-1 min-w-[12rem]">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-mid"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, quote, location…"
            className={`${inputCls} w-full pl-8 placeholder:text-gray-mid`}
          />
        </div>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value as typeof cat)}
          className={`${inputCls} cursor-pointer appearance-none text-gray-mid`}
        >
          <option value="All">All categories</option>
          {TESTIMONIAL_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <span className="ml-auto text-[10px] uppercase tracking-widest text-gray-mid">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line/20 bg-subtle/50 text-[10px] font-semibold uppercase tracking-widest text-gray-mid">
            <tr>
              <th className="px-4 py-3 font-medium">Quote</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Featured</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-gray-mid text-sm"
                >
                  No testimonials match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-line/10 hover:bg-subtle/30 transition-colors"
                >
                  <td className="px-4 py-3 max-w-xs">
                    <p className="line-clamp-2 text-foreground/90">{t.quote}</p>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-medium">
                    {t.name}
                  </td>
                  <td className="px-4 py-3 text-gray-mid text-xs max-w-[12rem]">
                    {t.category}
                  </td>
                  <td className="px-4 py-3">
                    {t.featured ? (
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                        Yes
                      </span>
                    ) : (
                      <span className="text-gray-mid text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(t)}
                        className="p-2 rounded-lg text-gray-mid hover:bg-primary/10 hover:text-primary transition-colors"
                        aria-label="Edit"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(t.id)}
                        className="p-2 rounded-lg text-gray-mid hover:bg-red-500/10 hover:text-red-600 transition-colors"
                        aria-label="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
