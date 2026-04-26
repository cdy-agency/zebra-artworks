import { NewsItem } from "@/types/news";

export default function NewsStatsBar({ news }: { news: NewsItem[] }) {
  const published = news.filter((n) => n.status === "Published").length;
  const drafts = news.filter((n) => n.status === "Draft").length;
  const totalImages = news.reduce((acc, n) => acc + n.images.length, 0);

  const stats = [
    { label: "Total Articles", value: news.length },
    { label: "Published", value: published },
    { label: "Drafts", value: drafts },
    { label: "Total Images", value: totalImages },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-line/20 bg-background px-4 py-3.5 shadow-sm"
        >
          <p className="mb-1 text-[10px] font-medium uppercase tracking-widest text-gray-mid">
            {s.label}
          </p>
          <p
            className="text-2xl font-bold leading-none text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {String(s.value).padStart(2, "0")}
          </p>
        </div>
      ))}
    </div>
  );
}
