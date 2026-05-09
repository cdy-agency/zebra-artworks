"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { apiDeleteNews, apiGetNews, apiSaveNews } from "@/lib/api";
import { NewsItem } from "@/types/news";
import NewsStatsBar from "@/components/dashboard/news/Newsstatsbar";
import NewsTable from "@/components/dashboard/news/Newstable";
import NewsModal from "@/components/dashboard/news/Newsmodal";
import DeleteModal from "@/components/dashboard/shared/DeleteModal";
import ToastMessage from "@/components/dashboard/shared/ToastMessage";

export default function NewsDashboard() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<NewsItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{ message: string; variant: "success" | "error" } | null>(null);

  const deleteTarget = news.find((n) => n.id === deleteId);

  function showToast(message: string, variant: "success" | "error" = "success") {
    setToast({ message, variant });
    window.setTimeout(() => setToast(null), 3000);
  }

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

  async function handleDelete() {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      await apiDeleteNews(deleteId);
      setNews((prev) => prev.filter((item) => item.id !== deleteId));
      setDeleteId(null);
      showToast("Article deleted.");
    } catch (error: unknown) {
      showToast(
        error instanceof Error ? error.message : "Failed to delete article.",
        "error",
      );
    } finally {
      setIsDeleting(false);
    }
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

      <DeleteModal
        open={!!deleteId}
        title={deleteTarget?.title ?? ""}
        resourceLabel="article"
        isDeleting={isDeleting}
        onConfirm={handleDelete}
        onClose={() => setDeleteId(null)}
      />

      {toast ? <ToastMessage message={toast.message} variant={toast.variant} /> : null}
    </div>
  );
}
