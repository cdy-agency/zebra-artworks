"use client";

import { useEffect, useRef, useState } from "react";
import { X, Upload, ImagePlus } from "lucide-react";
import { uploadImage } from "@/lib/cloudinary";
import type { Project } from "@/lib/supabase";
import { CATEGORIES, ALL_STATUSES, type Status } from "@/types/project";
import { apiSaveProject } from "@/lib/api";
import { PreviewThumb } from "./Previewthumb";


function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <p className="text-xs font-bold uppercase tracking-widest text-primary/70">
        {children}
      </p>
      <div className="flex-1 h-px bg-line/20" />
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
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-mid uppercase tracking-wide">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full border border-line/30 bg-subtle text-foreground rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-gray-mid";

// ─── Component ────────────────────────────────────────────────────────────────

interface ProjectModalProps {
  project?: Project | null;
  onSave: () => void;
  onClose: () => void;
}

export function ProjectModal({ project, onSave, onClose }: ProjectModalProps) {
  const isEdit = !!project;

  const [title, setTitle] = useState(project?.title ?? "");
  const [category, setCategory] = useState(project?.category ?? "");
  const [subcategory, setSubcategory] = useState(project?.subcategory ?? "");
  const [status, setStatus] = useState<Status>(
    (project?.status as Status) ?? "Pending",
  );
  const [date, setDate] = useState(project?.date ?? "");
  const [client, setClient] = useState(project?.client ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [images, setImages] = useState<string[]>(project?.images ?? []);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const subcategories = CATEGORIES[category] ?? [];

  useEffect(() => {
    if (!CATEGORIES[category]?.includes(subcategory)) setSubcategory("");
  }, [category, subcategory]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const addFiles = async (files: File[]) => {
    const imgs = files.filter((f) => f.type.startsWith("image/"));
    if (!imgs.length) return;
    setIsUploading(true);
    setError("");
    try {
      const urls = await Promise.all(imgs.map(uploadImage));
      setImages((prev) => [...prev, ...urls]);
    } catch {
      setError("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) await addFiles(Array.from(e.target.files));
    e.target.value = "";
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    await addFiles(Array.from(e.dataTransfer.files));
  };

  const handleSave = async () => {
    if (!title.trim() || !category || !subcategory) {
      setError("Title, category and subcategory are required.");
      return;
    }
    setIsSaving(true);
    setError("");
    try {
      await apiSaveProject(
        {
          title: title.trim(),
          category,
          subcategory,
          client: client.trim(),
          description: description.trim(),
          images,
          status,
          date: date || "",
        },
        isEdit ? project!.id : undefined,
      );
      onSave();
      onClose();
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Save failed. Please try again."));
    } finally {
      setIsSaving(false);
    }
  };

  const canSave =
    title.trim() && category && subcategory && !isUploading && !isSaving;

  return (
    <div
      className="fixed inset-0 z-1000 bg-black/60 backdrop-blur-[2px] flex items-end sm:items-center justify-center sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-background rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[92vh] flex flex-col shadow-2xl border border-line/20 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-line/20 shrink-0">
          <div>
            <h2 className="text-base font-bold text-foreground">
              {isEdit ? "Edit Project" : "Add New Project"}
            </h2>
            <p className="text-xs text-gray-mid mt-0.5">
              {isEdit
                ? "Update the details below and save your changes."
                : "Fill in the project details to add it to your portfolio."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-subtle hover:bg-line/20 text-gray-mid hover:text-foreground flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body (scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg flex items-start gap-2">
              <span className="shrink-0 mt-0.5">⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* — Basic Info — */}
          <div>
            <SectionTitle>Basic Information</SectionTitle>
            <div className="space-y-4">
              <Field label="Project Title" required>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Modern Living Room Renovation"
                  className={inputCls}
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Category" required>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={inputCls + " cursor-pointer"}
                  >
                    <option value="">Select category…</option>
                    {Object.keys(CATEGORIES).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Subcategory" required>
                  <select
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    disabled={!category}
                    className={
                      inputCls +
                      " cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    }
                  >
                    <option value="">Select subcategory…</option>
                    {subcategories.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>
          </div>

          {/* — Project Details — */}
          <div>
            <SectionTitle>Project Details</SectionTitle>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Status">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Status)}
                    className={inputCls + " cursor-pointer"}
                  >
                    {ALL_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Date">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={inputCls}
                  />
                </Field>
              </div>

              <Field label="Client Name">
                <input
                  type="text"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="e.g. The Martins (optional)"
                  className={inputCls}
                />
              </Field>

              <Field label="Description">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief project description…"
                  rows={4}
                  className={inputCls + " resize-y"}
                />
              </Field>
            </div>
          </div>

          {/* — Photos — */}
          <div>
            <SectionTitle>
              Photos{images.length > 0 ? ` (${images.length})` : ""}
            </SectionTitle>

            {/* Drop zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                isDragging
                  ? "border-primary bg-primary/5 scale-[1.01]"
                  : "border-line/40 hover:border-primary/40 hover:bg-subtle"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="flex flex-col items-center gap-2 pointer-events-none">
                {isUploading ? (
                  <>
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Upload
                        size={18}
                        className="text-primary animate-bounce"
                      />
                    </div>
                    <p className="text-sm font-medium text-primary">
                      Uploading images…
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-9 h-9 rounded-xl bg-subtle border border-line/20 flex items-center justify-center">
                      <ImagePlus size={18} className="text-gray-mid" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground font-medium">
                        Drop images here or{" "}
                        <span className="text-primary font-semibold">
                          browse
                        </span>
                      </p>
                      <p className="text-xs text-gray-mid mt-0.5">
                        JPG, PNG, WEBP — multiple allowed
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Thumbnails grid */}
            {images.length > 0 && (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2 mt-3">
                {images.map((src, i) => (
                  <PreviewThumb
                    key={i}
                    src={src}
                    onRemove={() =>
                      setImages((prev) => prev.filter((_, j) => j !== i))
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 px-6 py-4 border-t border-line/20 bg-subtle shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 border border-line/30 text-gray-mid hover:text-foreground hover:border-line/60 cursor-pointer rounded-lg text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!canSave}
            className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity cursor-pointer"
          >
            {isSaving ? "Saving…" : isEdit ? "Update Project" : "Add Project"}
          </button>
        </div>
      </div>
    </div>
  );
}
