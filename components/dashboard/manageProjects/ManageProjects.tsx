// FILE: src/app/admin/manage-projects/page.tsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Plus, Search, Edit, Trash2, X, Upload, ChevronLeft, ChevronRight } from "lucide-react";
import { uploadImage } from "@/lib/cloudinary";
import type { Project } from "@/lib/supabase";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES: Record<string, string[]> = {
  "Interior Design": [
    "Commercial Spaces",
    "Residential Spaces",
    "Hotels & Apartments",
    "Public & Private Offices",
  ],
  "Architecture & Construction": [
    "Architectural Plan",
    "MEP Supplies",
    "Construction",
    "Materials Supply",
  ],
};

type Status = "Pending" | "Ongoing" | "Completed";

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function apiGetProjects(): Promise<Project[]> {
  const res = await fetch("/api/projects");
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

async function apiSaveProject(data: Omit<Project, "id" | "created_at">, id?: string): Promise<void> {
  const res = await fetch(id ? `/api/projects/${id}` : "/api/projects", {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error ?? "Save failed");
  }
}

async function apiDeleteProject(id: string): Promise<void> {
  const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Delete failed");
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Status }) {
  const cls =
    status === "Completed" ? "bg-green-100 text-green-700" :
    status === "Ongoing" ? "bg-blue-100 text-blue-700" :
    "bg-yellow-100 text-yellow-700";
  return <span className={`px-2 py-1 text-xs font-medium rounded ${cls}`}>{status}</span>;
}

// ─── Field ────────────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full border border-gray-200 bg-white text-gray-900 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500 transition-colors placeholder:text-gray-400";

// ─── Preview Thumb ────────────────────────────────────────────────────────────

function PreviewThumb({ src, onRemove }: { src: string; onRemove: () => void }) {
  return (
    <div className="relative aspect-square rounded-md overflow-hidden border border-gray-200">
      <img src={src} alt="" className="w-full h-full object-cover" />
      <button type="button" onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="absolute top-1 right-1 bg-white/80 hover:bg-red-100 text-gray-700 hover:text-red-600 rounded-full w-5 h-5 flex items-center justify-center">
        <X size={10} />
      </button>
    </div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function ImageViewer({ images, startIndex, onClose }: { images: string[]; startIndex: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIndex);
  const nav = useCallback((dir: number) => setIdx((i) => (i + dir + images.length) % images.length), [images.length]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") nav(-1);
      if (e.key === "ArrowRight") nav(1);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [nav, onClose]);

  return (
    <div className="fixed inset-0 z-[2000] bg-black/80 flex flex-col items-center justify-center gap-4 p-5" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white"><X size={24} /></button>
      <img src={images[idx]} alt="" className="max-w-[90vw] max-h-[70vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
      <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => nav(-1)} className="border border-white/20 bg-white/10 text-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-white/20"><ChevronLeft size={16} /></button>
        <span className="text-sm text-white/60">{idx + 1} / {images.length}</span>
        <button onClick={() => nav(1)} className="border border-white/20 bg-white/10 text-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-white/20"><ChevronRight size={16} /></button>
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function ProjectModal({ project, onSave, onClose }: { project?: Project | null; onSave: () => void; onClose: () => void }) {
  const isEdit = !!project;
  const [title, setTitle] = useState(project?.title ?? "");
  const [category, setCategory] = useState(project?.category ?? "");
  const [subcategory, setSubcategory] = useState(project?.subcategory ?? "");
  const [status, setStatus] = useState<Status>((project?.status as Status) ?? "Pending");
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
  }, [category]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
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
        { title: title.trim(), category, subcategory, client: client.trim(), description: description.trim(), images, status, date: date || "" },
        isEdit ? project!.id : undefined
      );
      onSave();
      onClose();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black/50 flex items-end sm:items-center justify-center sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-t-2xl sm:rounded-lg w-full sm:max-w-xl max-h-[92vh] overflow-y-auto p-5 sm:p-6 space-y-4">

        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">{isEdit ? "Edit Project" : "Add New Project"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700"><X size={20} /></button>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-md">{error}</div>}

        <div className="space-y-3">
          <Field label="Project Title">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Modern Living Room" className={inputCls} />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Category (Title)">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls + " cursor-pointer"}>
                <option value="">Select category…</option>
                {Object.keys(CATEGORIES).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </Field>
            <Field label="Subcategory">
              <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} disabled={!category} className={inputCls + " cursor-pointer disabled:opacity-40"}>
                <option value="">Select subcategory…</option>
                {subcategories.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Status">
              <select value={status} onChange={(e) => setStatus(e.target.value as Status)} className={inputCls + " cursor-pointer"}>
                <option>Pending</option>
                <option>Ongoing</option>
                <option>Completed</option>
              </select>
            </Field>
            <Field label="Date">
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
            </Field>
          </div>

          <Field label="Client Name (optional)">
            <input type="text" value={client} onChange={(e) => setClient(e.target.value)} placeholder="e.g. The Martins" className={inputCls} />
          </Field>

          <Field label="Description">
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief project description..." rows={3} className={inputCls + " resize-y"} />
          </Field>

          <Field label={`Photos${images.length > 0 ? ` (${images.length})` : ""}`}>
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-colors ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`}
            >
              <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
              <div className="flex flex-col items-center gap-2 pointer-events-none">
                <Upload size={20} className="text-gray-400" />
                {isUploading
                  ? <p className="text-sm text-blue-500">Uploading…</p>
                  : <><p className="text-sm text-gray-400">Drop images or <span className="text-blue-500 font-medium">click to browse</span></p><p className="text-xs text-gray-400">JPG, PNG, WEBP</p></>
                }
              </div>
            </div>
            {images.length > 0 && (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(72px,1fr))] gap-2 mt-3">
                {images.map((src, i) => (
                  <PreviewThumb key={i} src={src} onRemove={() => setImages((prev) => prev.filter((_, j) => j !== i))} />
                ))}
              </div>
            )}
          </Field>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2 border-t border-gray-100">
          <button onClick={onClose} className="w-full sm:w-auto px-4 py-2 border border-gray-200 text-gray-700 rounded-md text-sm hover:opacity-80">Cancel</button>
          <button onClick={handleSave} disabled={!title.trim() || !category || !subcategory || isUploading || isSaving}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed">
            {isSaving ? "Saving…" : isEdit ? "Update Project" : "Save Project"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ManageProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Project | null>(null);
  const [viewerImages, setViewerImages] = useState<string[]>([]);
  const [viewerStart, setViewerStart] = useState(0);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await apiGetProjects();
      setProjects(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.subcategory.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this project?")) return;
    await apiDeleteProject(id);
    fetchProjects();
  };

  return (
    <>
      <div className="space-y-5 p-6">
        <div className="flex items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Manage Projects</h1>
            <p className="text-xs sm:text-sm text-gray-500">Add, update, and manage all your projects.</p>
          </div>
          <button onClick={() => { setEditTarget(null); setModalOpen(true); }} className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:opacity-90 shrink-0">
            <Plus size={15} /> Add Project
          </button>
        </div>

        <div className="flex items-center gap-2 border border-gray-200 bg-white rounded-lg px-3 py-2 w-full sm:w-[320px]">
          <Search size={15} className="text-gray-400 shrink-0" />
          <input type="text" placeholder="Search projects..." className="w-full outline-none bg-transparent text-sm placeholder:text-gray-400" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {/* Desktop table */}
        <div className="hidden md:block border border-gray-200 bg-white rounded-lg overflow-hidden">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 gap-4">
            <span>Project</span><span>Category</span><span>Subcategory</span><span>Status</span><span>Client</span><span className="text-right">Actions</span>
          </div>
          <div className="divide-y divide-gray-100">
            {loading ? <p className="text-center py-10 text-sm text-gray-400">Loading…</p> :
             filtered.length === 0 ? <p className="text-center py-10 text-sm text-gray-400">No projects found.</p> :
             filtered.map((project) => (
              <div key={project.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] px-4 py-3 text-sm items-center gap-4">
                <div>
                  <span className="font-medium text-gray-900">{project.title}</span>
                  {project.images.length > 0 && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      {project.images.slice(0, 4).map((src, i) => (
                        <img key={i} src={src} alt="" onClick={() => { setViewerImages(project.images); setViewerStart(i); }}
                          className="w-7 h-7 object-cover rounded border border-gray-200 cursor-pointer hover:border-blue-500" />
                      ))}
                      {project.images.length > 4 && <span className="text-xs text-gray-400">+{project.images.length - 4}</span>}
                    </div>
                  )}
                </div>
                <span className="text-gray-500 truncate">{project.category}</span>
                <span className="text-gray-500 truncate">{project.subcategory}</span>
                <StatusBadge status={project.status as Status} />
                <span className="text-gray-500 truncate">{project.client || "—"}</span>
                <div className="flex items-center justify-end gap-3">
                  <button onClick={() => { setEditTarget(project); setModalOpen(true); }} className="text-gray-400 hover:text-blue-500"><Edit size={15} /></button>
                  <button onClick={() => handleDelete(project.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={15} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {loading ? <p className="text-center py-10 text-sm text-gray-400">Loading…</p> :
           filtered.length === 0 ? <p className="text-center py-10 text-sm text-gray-400">No projects found.</p> :
           filtered.map((project) => (
            <div key={project.id} className="border border-gray-200 bg-white rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{project.title}</p>
                  <p className="text-xs text-gray-400">{project.category} → {project.subcategory}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => { setEditTarget(project); setModalOpen(true); }} className="text-gray-400 hover:text-blue-500 p-1"><Edit size={15} /></button>
                  <button onClick={() => handleDelete(project.id)} className="text-gray-400 hover:text-red-500 p-1"><Trash2 size={15} /></button>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <StatusBadge status={project.status as Status} />
                {project.client && <span className="text-xs text-gray-400">{project.client}</span>}
                {project.date && <span className="text-xs text-gray-400">{project.date}</span>}
              </div>
              {project.images.length > 0 && (
                <div className="flex gap-1.5">
                  {project.images.slice(0, 5).map((src, i) => (
                    <img key={i} src={src} alt="" onClick={() => { setViewerImages(project.images); setViewerStart(i); }}
                      className="w-10 h-10 object-cover rounded border border-gray-200 cursor-pointer" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {modalOpen && <ProjectModal project={editTarget} onSave={fetchProjects} onClose={() => { setModalOpen(false); setEditTarget(null); }} />}
      {viewerImages.length > 0 && <ImageViewer images={viewerImages} startIndex={viewerStart} onClose={() => setViewerImages([])} />}
    </>
  );
}