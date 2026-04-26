"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
  apiDeleteTestimonial,
  apiGetTestimonials,
  apiSaveTestimonial,
} from "@/lib/api";
import type { Testimonial, TestimonialPayload } from "@/types/testimonial";
import TestimonialsModal from "@/components/dashboard/testimonials/Testimonialsmodal";
import TestimonialsTable from "@/components/dashboard/testimonials/Testimonialstable";
import DeleteConfirmModal from "@/components/dashboard/news/Deleteconfirmmodal";

export default function TestimonialsDashboard() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Testimonial | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const deleteTarget = items.find((t) => t.id === deleteId);

  async function fetchAll() {
    setLoading(true);
    setError("");
    try {
      const data = await apiGetTestimonials();
      setItems(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  function openCreate() {
    setEditItem(null);
    setModalOpen(true);
  }

  function openEdit(t: Testimonial) {
    setEditItem(t);
    setModalOpen(true);
  }

  async function handleSave(data: TestimonialPayload & { id?: string }) {
    const { id, ...payload } = data;
    await apiSaveTestimonial(payload, id);
    await fetchAll();
  }

  async function handleDelete(id: string) {
    await apiDeleteTestimonial(id);
    setItems((prev) => prev.filter((t) => t.id !== id));
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
            Testimonials
          </h1>
          <p className="mt-1 text-sm text-gray-mid max-w-lg">
            Interior Design testimonials appear on{" "}
            <span className="text-foreground/80">/interior-design</span>, and
            Architecture &amp; Construction on{" "}
            <span className="text-foreground/80">/construction</span>. One
            &quot;featured&quot; per category.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-primary-dark"
        >
          <Plus size={14} />
          New testimonial
        </button>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <TestimonialsTable
        items={items}
        loading={loading}
        onEdit={openEdit}
        onDelete={(id) => setDeleteId(id)}
      />

      <TestimonialsModal
        open={modalOpen}
        item={editItem}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <DeleteConfirmModal
        open={!!deleteId}
        title={deleteTarget?.name ?? ""}
        resourceLabel="testimonial"
        onConfirm={async () => {
          if (deleteId) await handleDelete(deleteId);
        }}
        onClose={() => setDeleteId(null)}
      />
    </div>
  );
}
