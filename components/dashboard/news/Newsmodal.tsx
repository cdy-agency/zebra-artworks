"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { NewsItem, TAGS } from "@/types/news";
import ImageUploadGrid from "./Imageuploadgrid";

interface Props {
  open: boolean;
  item?: NewsItem | null;
  onClose: () => void;
  onSave: (data: Omit<NewsItem, "id"> & { id?: string }) => Promise<void>;
}

const EMPTY: Omit<NewsItem, "id"> = {
  title: "",
  tag: TAGS[0],
  excerpt: "",
  body: "",
  date: new Date().toISOString().slice(0, 10),
  status: "Draft",
  images: [],
};

const inputCls =
  "w-full border border-line/30 bg-subtle text-foreground rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-gray-mid";

export default function NewsModal({ open, item, onClose, onSave }: Props) {
  const [form, setForm] = useState(EMPTY);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(item ? { ...item } : EMPTY);
    setError("");
  }, [item, open]);

  if (!open) return null;

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      await onSave(item ? { ...form, id: item.id } : form);
      onClose();
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Unable to save article");
    } finally {
      setIsSaving(false);
    }
  }

  const isEdit = !!item;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 flex h-screen w-full max-w-xl flex-col overflow-hidden border-l border-line/20 bg-background shadow-2xl animate-slide-in">
        <div className="flex shrink-0 items-center justify-between border-b border-line/20 px-6 py-5">
          <div>
            <p className="mb-0.5 text-[10px] font-medium uppercase tracking-widest text-primary">
              {isEdit ? "Edit article" : "New article"}
            </p>
            <h2
              className="text-base font-bold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {isEdit ? `${item?.title.slice(0, 40)}...` : "Create News Article"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-subtle text-gray-mid transition-colors hover:bg-line/20 hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>

        <form
          id="news-form"
          onSubmit={handleSubmit}
          className="flex-1 space-y-5 overflow-y-auto px-6 py-6"
        >
          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <Field label="Title" required>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Article headline..."
              required
              className={inputCls}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <select
                value={form.tag}
                onChange={(e) => set("tag", e.target.value)}
                className={`${inputCls} cursor-pointer appearance-none`}
              >
                {TAGS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Status">
              <select
                value={form.status}
                onChange={(e) =>
                  set("status", e.target.value as NewsItem["status"])
                }
                className={`${inputCls} cursor-pointer appearance-none`}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </Field>
          </div>

          <Field label="Date">
            <input
              type="date"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              className={inputCls}
            />
          </Field>

          <Field label="Excerpt">
            <textarea
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              rows={2}
              placeholder="Short summary shown in listings..."
              className={`${inputCls} resize-none`}
            />
          </Field>

          <Field label="Article body">
            <textarea
              value={form.body}
              onChange={(e) => set("body", e.target.value)}
              rows={5}
              placeholder="Full article content..."
              className={`${inputCls} resize-none`}
            />
          </Field>

          <ImageUploadGrid
            images={form.images}
            onChange={(imgs) => set("images", imgs)}
          />
        </form>

        <div className="flex shrink-0 items-center justify-between border-t border-line/20 bg-subtle px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="text-xs font-medium uppercase tracking-widest text-gray-mid transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="news-form"
            disabled={isSaving}
            className="flex items-center gap-2 bg-primary px-6 py-3 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving
              ? "Saving..."
              : isEdit
                ? "Save changes"
                : "Publish article"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.3s cubic-bezier(0.4,0,0.2,1); }
      `}</style>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-widest text-gray-mid">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      {children}
    </div>
  );
}
