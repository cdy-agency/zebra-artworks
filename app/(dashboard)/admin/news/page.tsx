"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { apiDeleteNews, apiGetNews, apiSaveNews } from "@/lib/api";
import { NewsItem } from "@/types/news";
import NewsStatsBar from "@/components/dashboard/news/Newsstatsbar";
import NewsTable from "@/components/dashboard/news/Newstable";
import NewsModal from "@/components/dashboard/news/Newsmodal";
import DeleteConfirmModal from "@/components/dashboard/news/Deleteconfirmmodal";

export default function NewsDashboard() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<NewsItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const deleteTarget = news.find((n) => n.id === deleteId);

  async function fetchNews() {
    setLoading(true);
    setError("");

    try {
      const data = await apiGetNews();
      setNews(data);
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "Failed to load articles",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNews();
  }, []);

  function openCreate() {
    setEditItem(null);
    setModalOpen(true);
  }

  function openEdit(item: NewsItem) {
    setEditItem(item);
    setModalOpen(true);
  }

  async function handleSave(data: Omit<NewsItem, "id"> & { id?: string }) {
    const saved = await apiSaveNews(data, data.id);

    setNews((prev) => {
      const exists = prev.some((item) => item.id === saved.id);
      if (exists) {
        return prev.map((item) => (item.id === saved.id ? saved : item));
      }
      return [saved, ...prev];
    });
  }

  async function handleDelete(id: string) {
    await apiDeleteNews(id);
    setNews((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-primary">
            Content management
          </p>
          <h1
            className="text-2xl font-bold leading-tight text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            News &amp; Articles
          </h1>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-primary-dark"
        >
          <Plus size={14} />
          New article
        </button>
      </div>

      <NewsStatsBar news={news} />

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <NewsTable
        news={news}
        loading={loading}
        onEdit={openEdit}
        onDelete={(id) => setDeleteId(id)}
      />

      <NewsModal
        open={modalOpen}
        item={editItem}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <DeleteConfirmModal
        open={!!deleteId}
        title={deleteTarget?.title ?? ""}
        onConfirm={() => (deleteId ? handleDelete(deleteId) : Promise.resolve())}
        onClose={() => setDeleteId(null)}
      />
    </div>
  );
}
