"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import {
  Testimonial,
  TESTIMONIAL_CATEGORIES,
  type TestimonialPayload,
} from "@/types/testimonial";

function initialsFromName(name: string): string {
  const p = name.trim().split(/\s+/).filter(Boolean);
  if (p.length === 0) return "";
  if (p.length === 1) return p[0]!.slice(0, 2).toUpperCase();
  return (p[0]![0]! + p[1]![0]!).toUpperCase();
}

interface Props {
  open: boolean;
  item?: Testimonial | null;
  onClose: () => void;
  onSave: (data: TestimonialPayload & { id?: string }) => Promise<void>;
}

const EMPTY: TestimonialPayload = {
  quote: "",
  name: "",
  role: "",
  location: "",
  category: "Interior Design",
  featured: false,
  initials: "",
};

const inputCls =
  "w-full border border-line/30 bg-subtle text-foreground rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-gray-mid";

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
      <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-widest text-foreground/50">
        {label} {required ? <span className="text-primary">*</span> : null}
      </label>
      {children}
    </div>
  );
}

export default function TestimonialsModal({ open, item, onClose, onSave }: Props) {
  const [form, setForm] = useState< TestimonialPayload >(EMPTY);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (item) {
      setForm({
        quote: item.quote,
        name: item.name,
        role: item.role,
        location: item.location,
        category: item.category,
        featured: item.featured,
        initials: item.initials || initialsFromName(item.name),
      });
    } else {
      setForm(EMPTY);
    }
    setError("");
  }, [item, open]);

  if (!open) return null;

  function set<K extends keyof TestimonialPayload>(
    key: K,
    value: TestimonialPayload[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    const initials =
      form.initials.trim() || initialsFromName(form.name) || "??";

    try {
      const payload: TestimonialPayload & { id?: string } = {
        ...form,
        initials,
      };
      if (item) payload.id = item.id;
      await onSave(payload);
      onClose();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Unable to save testimonial",
      );
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
        aria-hidden
      />

      <div className="relative z-10 flex h-screen w-full max-w-xl flex-col overflow-hidden border-l border-line/20 bg-background shadow-2xl">
        <div className="flex shrink-0 items-center justify-between border-b border-line/20 px-6 py-5">
          <div>
            <p className="mb-0.5 text-[10px] font-medium uppercase tracking-widest text-primary">
              {isEdit ? "Edit testimonial" : "New testimonial"}
            </p>
            <h2
              className="text-base font-bold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {isEdit ? item?.name : "Add client story"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-subtle text-gray-mid transition-colors hover:bg-line/20 hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 space-y-5 overflow-y-auto px-6 py-6"
        >
          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <Field label="Category" required>
            <select
              value={form.category}
              onChange={(e) =>
                set(
                  "category",
                  e.target.value as TestimonialPayload["category"],
                )
              }
              className={`${inputCls} cursor-pointer appearance-none`}
            >
              {TESTIMONIAL_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Quote" required>
            <textarea
              value={form.quote}
              onChange={(e) => set("quote", e.target.value)}
              rows={5}
              required
              placeholder="Client feedback..."
              className={`${inputCls} resize-none`}
            />
          </Field>

          <Field label="Name" required>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              required
              className={inputCls}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Role">
              <input
                type="text"
                value={form.role}
                onChange={(e) => set("role", e.target.value)}
                className={inputCls}
                placeholder="CEO, Homeowner…"
              />
            </Field>
            <Field label="Location">
              <input
                type="text"
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                className={inputCls}
                placeholder="Kigali…"
              />
            </Field>
          </div>

          <Field label="Initials (optional)">
            <input
              type="text"
              maxLength={3}
              value={form.initials}
              onChange={(e) =>
                set("initials", e.target.value.toUpperCase().slice(0, 3))
              }
              className={inputCls}
              placeholder="Auto from name"
            />
          </Field>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => set("featured", e.target.checked)}
              className="h-4 w-4 rounded border-line text-primary"
            />
            <span className="text-sm text-foreground">
              Featured (large card) — only one per category
            </span>
          </label>

          <div className="flex justify-end gap-3 border-t border-line/20 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium uppercase tracking-widest text-gray-mid hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="bg-primary px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
            >
              {isSaving ? "Saving…" : isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
