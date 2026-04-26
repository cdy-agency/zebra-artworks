"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { NewsItem, TAGS } from "@/types/news";
import NewsTableRow from "./Newstablerow";

interface Props {
  news: NewsItem[];
  loading?: boolean;
  onEdit: (item: NewsItem) => void;
  onDelete: (id: string) => void;
}

export default function NewsTable({
  news,
  loading = false,
  onEdit,
  onDelete,
}: Props) {
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const inputCls =
    "border border-line/30 bg-subtle text-foreground rounded-lg px-3 py-2 text-xs outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all";

  const filtered = news.filter((n) => {
    const matchSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchTag = tagFilter === "All" || n.tag === tagFilter;
    const matchStatus = statusFilter === "All" || n.status === statusFilter;
    return matchSearch && matchTag && matchStatus;
  });

  return (
    <div className="rounded-xl border border-line/20 bg-background shadow-sm">
      <div className="flex flex-wrap items-center gap-3 border-b border-line/20 px-4 py-3">
        <div className="relative flex-1 min-w-45">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-mid"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className={`${inputCls} w-full pl-8 placeholder:text-gray-mid`}
          />
        </div>

        <select
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          className={`${inputCls} cursor-pointer appearance-none text-gray-mid`}
        >
          <option value="All">All categories</option>
          {TAGS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`${inputCls} cursor-pointer appearance-none text-gray-mid`}
        >
          <option value="All">All status</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>

        <span className="ml-auto text-[10px] uppercase tracking-widest text-gray-mid">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-line/20">
              {["Article", "Category", "Date", "Status", "Images", ""].map(
                (heading) => (
                  <th
                    key={heading}
                    className="px-4 py-3 text-left text-[10px] font-medium uppercase tracking-widest text-gray-mid"
                  >
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-xs uppercase tracking-widest text-gray-mid"
                >
                  Loading articles
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-xs uppercase tracking-widest text-gray-mid"
                >
                  No articles found
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <NewsTableRow
                  key={item.id}
                  item={item}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
