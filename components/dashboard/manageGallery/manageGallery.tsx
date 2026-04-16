// 📁 src/app/admin/manageGallery/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, UploadCloud, X, Check, Loader2 } from "lucide-react";

type GalleryItem = {
  id: string;
  src: string;
  title: string;
  description: string;
};

export default function ManageGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ── Add-new form state ──────────────────────────────────────────────────────
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Inline-edit state ───────────────────────────────────────────────────────
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [saving, setSaving] = useState(false);

  // ── Delete state ────────────────────────────────────────────────────────────
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ── Toast ───────────────────────────────────────────────────────────────────
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  }

  // ── Fetch items ─────────────────────────────────────────────────────────────
  async function fetchItems() {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setItems(
        (data as GalleryItem[]).map((d: GalleryItem & { desc?: string }) => ({
          ...d,
          description: d.description ?? d.desc ?? "",
        }))
      );
    } catch {
      showToast("Failed to load gallery", false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  // ── File picker ─────────────────────────────────────────────────────────────
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
  }

  function clearFileInput() {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // ── Add item ────────────────────────────────────────────────────────────────
  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setAddError("");

    if (!file) return setAddError("Please select an image.");
    if (!newTitle.trim()) return setAddError("Title is required.");
    if (!newDesc.trim()) return setAddError("Description is required.");

    setAdding(true);
    try {
      // 1. Upload image
      const fd = new FormData();
      fd.append("file", file);
      const upRes = await fetch("/api/uploadGallery", {
        method: "POST",
        body: fd,
      });
      if (!upRes.ok) {
        const upData = await upRes.json();
        throw new Error(upData.error ?? "Upload failed");
      }
      const { url } = await upRes.json();

      // 2. Save to DB
      const saveRes = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ src: url, title: newTitle.trim(), description: newDesc.trim() }),
      });
      if (!saveRes.ok) {
        const saveData = await saveRes.json();
        throw new Error(saveData.error ?? "Save failed");
      }

      setNewTitle("");
      setNewDesc("");
      clearFileInput();
      showToast("Gallery item added!");
      fetchItems();
    } catch (err: unknown) {
      setAddError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setAdding(false);
    }
  }

  // ── Delete item ─────────────────────────────────────────────────────────────
  async function handleDelete(id: string) {
    if (!confirm("Delete this gallery item?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("Item deleted");
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch {
      showToast("Delete failed", false);
    } finally {
      setDeletingId(null);
    }
  }

  // ── Start edit ──────────────────────────────────────────────────────────────
  function startEdit(item: GalleryItem) {
    setEditId(item.id);
    setEditTitle(item.title);
    setEditDesc(item.description);
  }

  function cancelEdit() {
    setEditId(null);
    setEditTitle("");
    setEditDesc("");
  }

  // ── Save edit ───────────────────────────────────────────────────────────────
  async function saveEdit(id: string) {
    if (!editTitle.trim() || !editDesc.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle.trim(), description: editDesc.trim() }),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setItems((prev) =>
        prev.map((i) =>
          i.id === id
            ? { ...i, title: updated.title, description: updated.description ?? updated.desc }
            : i
        )
      );
      cancelEdit();
      showToast("Item updated!");
    } catch {
      showToast("Update failed", false);
    } finally {
      setSaving(false);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium text-white transition-all ${
            toast.ok ? "bg-primary" : "bg-red-500"
          }`}
        >
          {toast.msg}
        </div>
      )}

      <h1 className="text-2xl font-bold text-foreground mb-1">Manage Gallery</h1>
      <p className="text-sm text-gray-mid mb-8">
        Upload and manage the 4 images shown in the public Interior Design Highlights section.
      </p>

      {/* ── Add New Item Form ─────────────────────────────────────────── */}
      <div className="bg-subtle rounded-xl p-6 mb-10 border border-line/20">
        <h2 className="text-base font-semibold text-foreground mb-4">Add New Gallery Item</h2>

        <form onSubmit={handleAdd} className="space-y-4">
          {/* Image picker */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Image</label>
            {preview ? (
              <div className="relative w-48 h-32 rounded-lg overflow-hidden border border-line/30 group">
                <Image src={preview} alt="preview" fill className="object-cover" />
                <button
                  type="button"
                  onClick={clearFileInput}
                  className="absolute top-1 right-1 bg-black/60 hover:bg-black text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label
                htmlFor="gallery-file"
                className="flex flex-col items-center justify-center w-48 h-32 border-2 border-dashed border-line/40 rounded-lg cursor-pointer hover:border-primary transition text-gray-mid text-sm"
              >
                <UploadCloud size={24} className="mb-1 text-gray-mid" />
                Click to upload
              </label>
            )}
            <input
              ref={fileInputRef}
              id="gallery-file"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Modern Living Room"
              className="w-full max-w-sm border border-line/30 rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Description</label>
            <textarea
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Short description of the design..."
              rows={3}
              className="w-full max-w-sm border border-line/30 rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {addError && <p className="text-red-500 text-xs">{addError}</p>}

          <button
            type="submit"
            disabled={adding}
            className="flex items-center gap-2 bg-primary text-background text-sm font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-60"
          >
            {adding ? (
              <>
                <Loader2 size={15} className="animate-spin" /> Uploading…
              </>
            ) : (
              <>
                <UploadCloud size={15} /> Add to Gallery
              </>
            )}
          </button>
        </form>
      </div>

      {/* ── Existing Items ───────────────────────────────────────────── */}
      <h2 className="text-base font-semibold text-foreground mb-4">
        Current Items{" "}
        <span className="text-gray-mid font-normal text-sm">
          ({items.length} / 4 shown on site)
        </span>
      </h2>

      {loading ? (
        <div className="flex items-center gap-2 text-gray-mid text-sm py-8">
          <Loader2 size={18} className="animate-spin" /> Loading gallery…
        </div>
      ) : items.length === 0 ? (
        <p className="text-gray-mid text-sm py-8">No gallery items yet. Add one above.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`rounded-xl border overflow-hidden bg-background ${
                idx < 4 ? "border-primary/30" : "border-line/20 opacity-60"
              }`}
            >
              {/* Image */}
              <div className="relative w-full h-44">
                <Image src={item.src} alt={item.title} fill className="object-cover" />
                {idx < 4 && (
                  <span className="absolute top-2 left-2 bg-primary text-background text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Slot {idx + 1}
                  </span>
                )}
                {idx >= 4 && (
                  <span className="absolute top-2 left-2 bg-gray-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Hidden
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                {editId === item.id ? (
                  /* ── Edit mode ── */
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full border border-line/30 rounded-lg px-3 py-1.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <textarea
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      rows={2}
                      className="w-full border border-line/30 rounded-lg px-3 py-1.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => saveEdit(item.id)}
                        disabled={saving}
                        className="flex items-center gap-1.5 bg-primary text-background text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition disabled:opacity-60"
                      >
                        {saving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex items-center gap-1.5 border border-line/30 text-gray-mid text-xs px-3 py-1.5 rounded-lg hover:text-foreground transition"
                      >
                        <X size={12} /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ── View mode ── */
                  <>
                    <h3 className="font-semibold text-sm text-foreground">{item.title}</h3>
                    <p className="text-xs text-gray-mid mt-1 line-clamp-2">{item.description}</p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => startEdit(item)}
                        className="flex items-center gap-1.5 border border-line/30 text-gray-mid text-xs px-3 py-1.5 rounded-lg hover:text-primary hover:border-primary transition"
                      >
                        <Pencil size={12} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        className="flex items-center gap-1.5 border border-red-200 text-red-400 text-xs px-3 py-1.5 rounded-lg hover:bg-red-50 transition disabled:opacity-60"
                      >
                        {deletingId === item.id ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          <Trash2 size={12} />
                        )}
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}