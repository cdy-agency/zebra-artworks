"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Plus, Search, Edit, Trash2, X, Upload, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = "Completed" | "Ongoing" | "Pending";

type Project = {
  id: number;
  title: string;
  category: string;
  status: Status;
  date: string;
  client: string;
  desc: string;
  images: string[];
};

// ─── Seed data ────────────────────────────────────────────────────────────────

const SEED: Project[] = [
  {
    id: 1,
    title: "Modern Living Room Design",
    category: "Interior Design",
    status: "Completed",
    date: "2026-01-10",
    client: "The Martins",
    desc: "Full living room makeover with custom furniture and ambient lighting.",
    images: [],
  },
];

const STORAGE_KEY = "manage_projects_data";

function saveProjects(projects: Project[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch {
    // quota exceeded or SSR — ignore
  }
}

// ─── Convert File → base64 data URL ──────────────────────────────────────────

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-mid uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full border border-line/20 bg-background text-foreground rounded-md px-3 py-2 text-sm outline-none focus:border-primary transition-colors placeholder:text-gray-mid/50";

// ─── Preview thumbnail ────────────────────────────────────────────────────────

function PreviewThumb({ src, onRemove }: { src: string; onRemove: () => void }) {
  return (
    <div className="relative aspect-square rounded-md overflow-hidden border border-line/20">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="w-full h-full object-cover" />
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="absolute top-1 right-1 bg-background/80 hover:bg-red-100 text-foreground hover:text-red-600 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
      >
        <X size={10} />
      </button>
    </div>
  );
}

// ─── Image Lightbox ───────────────────────────────────────────────────────────

function ImageViewer({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);

  const nav = useCallback(
    (dir: number) => setIdx((i) => (i + dir + images.length) % images.length),
    [images.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  nav(-1);
      if (e.key === "ArrowRight") nav(1);
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nav, onClose]);

  return (
    <div
      className="fixed inset-0 z-[2000] bg-black/80 flex flex-col items-center justify-center gap-4 p-5"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors"
      >
        <X size={24} />
      </button>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[idx]}
        alt=""
        className="max-w-[90vw] max-h-[75vh] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />

      <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => nav(-1)}
          className="border border-line/20 bg-background text-foreground rounded-full w-9 h-9 flex items-center justify-center hover:bg-primary hover:text-background transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm text-white/50 min-w-[48px] text-center">
          {idx + 1} / {images.length}
        </span>
        <button
          onClick={() => nav(1)}
          className="border border-line/20 bg-background text-foreground rounded-full w-9 h-9 flex items-center justify-center hover:bg-primary hover:text-background transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function ProjectModal({
  project,
  onSave,
  onClose,
}: {
  project?: Project | null;
  onSave: (data: Omit<Project, "id">) => void;
  onClose: () => void;
}) {
  const isEdit = !!project;

  const [title,        setTitle]        = useState(project?.title    ?? "");
  const [category,     setCategory]     = useState(project?.category ?? "");
  const [status,       setStatus]       = useState<Status>(project?.status ?? "Pending");
  const [date,         setDate]         = useState(project?.date     ?? "");
  const [client,       setClient]       = useState(project?.client   ?? "");
  const [desc,         setDesc]         = useState(project?.desc     ?? "");
  const [allImages,    setAllImages]    = useState<string[]>(project?.images ?? []);
  const [isDragging,   setIsDragging]   = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = async (files: File[]) => {
    const imgs = files.filter((f) => f.type.startsWith("image/"));
    if (imgs.length === 0) return;
    setIsConverting(true);
    try {
      const base64s = await Promise.all(imgs.map(fileToBase64));
      setAllImages((prev) => [...prev, ...base64s]);
    } finally {
      setIsConverting(false);
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

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({
      title:    title.trim(),
      category: category.trim(),
      status,
      date,
      client:   client.trim(),
      desc:     desc.trim(),
      images:   allImages,
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-background border border-line/20 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 space-y-4">

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">
            {isEdit ? "Edit Project" : "Add New Project"}
          </h2>
          <button onClick={onClose} className="text-gray-mid hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">

          <Field label="Project Title">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Modern Living Room Redesign"
              className={inputCls}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Category">
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Interior Design"
                className={inputCls}
              />
            </Field>
            <Field label="Status">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
                className={inputCls + " cursor-pointer"}
              >
                <option>Pending</option>
                <option>Ongoing</option>
                <option>Completed</option>
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Date">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Client (optional)">
              <input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="Client name"
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Description">
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Brief project description..."
              rows={3}
              className={inputCls + " resize-y leading-relaxed"}
            />
          </Field>

          <Field label={`Photos${allImages.length > 0 ? ` (${allImages.length} added)` : ""}`}>
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragging ? "border-primary bg-primary/5" : "border-line/20 hover:border-primary/40"
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
                <Upload size={22} className="text-gray-mid" />
                {isConverting ? (
                  <p className="text-sm text-primary">Processing images…</p>
                ) : (
                  <>
                    <p className="text-sm text-gray-mid">
                      Drop images here or{" "}
                      <span className="text-primary font-medium">click to browse</span>
                    </p>
                    <p className="text-xs text-gray-mid/60">JPG, PNG, WEBP — multiple files supported</p>
                  </>
                )}
              </div>
            </div>

            {allImages.length > 0 && (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(76px,1fr))] gap-2 mt-3">
                {allImages.map((src, i) => (
                  <PreviewThumb
                    key={i}
                    src={src}
                    onRemove={() => setAllImages((prev) => prev.filter((_, idx) => idx !== i))}
                  />
                ))}
              </div>
            )}
          </Field>
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-line/20">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-line text-foreground rounded-md text-sm hover:opacity-80 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim() || isConverting}
            className="px-4 py-2 bg-primary text-background rounded-md text-sm hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isEdit ? "Update Project" : "Save Project"}
          </button>
        </div>

      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ManageProjectsPage() {
  // ✅ Start with [] — matches the server render, no mismatch
  const [projects,     setProjects]     = useState<Project[]>([]);
  const [hydrated,     setHydrated]     = useState(false);
  const [search,       setSearch]       = useState("");
  const [modalOpen,    setModalOpen]    = useState(false);
  const [editTarget,   setEditTarget]   = useState<Project | null>(null);
  const [viewerImages, setViewerImages] = useState<string[]>([]);
  const [viewerStart,  setViewerStart]  = useState(0);

  // ✅ Read localStorage only after mount (client-only, never runs on server)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setProjects(raw ? (JSON.parse(raw) as Project[]) : SEED);
    } catch {
      setProjects(SEED);
    }
    setHydrated(true);
  }, []);

  // ✅ Persist on every change, but skip the very first render (before hydration)
  //    to avoid overwriting existing data with the empty initial state
  useEffect(() => {
    if (hydrated) saveProjects(projects);
  }, [projects, hydrated]);

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd    = () => { setEditTarget(null); setModalOpen(true); };
  const openEdit   = (p: Project) => { setEditTarget(p); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditTarget(null); };

  const handleSave = (data: Omit<Project, "id">) => {
    if (editTarget) {
      setProjects((prev) =>
        prev.map((p) => (p.id === editTarget.id ? { ...p, ...data } : p))
      );
    } else {
      setProjects((prev) => [{ id: Date.now(), ...data }, ...prev]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (!confirm("Remove this project?")) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <div className="space-y-6">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Manage Projects</h1>
            <p className="text-sm text-gray-mid">Add, update, and manage all your projects.</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-background rounded-md text-sm hover:opacity-90 transition"
          >
            <Plus size={16} />
            Add Project
          </button>
        </div>

        <div className="flex items-center gap-2 border border-line/20 bg-background rounded-lg px-3 py-2 w-full md:w-[320px]">
          <Search size={16} className="text-gray-mid" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full outline-none bg-transparent text-sm text-foreground placeholder:text-gray-mid/60"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="border border-line/20 bg-background rounded-lg overflow-hidden">

          <div className="grid grid-cols-5 bg-subtle px-4 py-3 text-sm font-semibold text-foreground">
            <span>Project</span>
            <span>Category</span>
            <span>Status</span>
            <span>Date</span>
            <span className="text-right">Actions</span>
          </div>

          <div className="divide-y divide-line/20">
            {/* ✅ Show a neutral loading state until client has hydrated */}
            {!hydrated ? (
              <p className="text-center py-10 text-sm text-gray-mid">Loading…</p>
            ) : filtered.length === 0 ? (
              <p className="text-center py-10 text-sm text-gray-mid">No projects found.</p>
            ) : (
              filtered.map((project) => (
                <div
                  key={project.id}
                  className="grid grid-cols-5 px-4 py-3 text-sm items-center"
                >
                  <div>
                    <span className="text-foreground font-medium">{project.title}</span>
                    {project.images.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        {project.images.slice(0, 4).map((src, i) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={i}
                            src={src}
                            alt=""
                            onClick={() => {
                              setViewerImages(project.images);
                              setViewerStart(i);
                            }}
                            className="w-7 h-7 object-cover rounded border border-line/20 cursor-pointer hover:border-primary transition-colors"
                          />
                        ))}
                        {project.images.length > 4 && (
                          <span className="text-xs text-gray-mid">+{project.images.length - 4}</span>
                        )}
                      </div>
                    )}
                  </div>

                  <span className="text-gray-mid">{project.category || "—"}</span>

                  <span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : project.status === "Ongoing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {project.status}
                    </span>
                  </span>

                  <span className="text-gray-mid">{project.date || "—"}</span>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => openEdit(project)}
                      className="text-gray-mid hover:text-primary transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-gray-mid hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {modalOpen && (
        <ProjectModal
          project={editTarget}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}

      {viewerImages.length > 0 && (
        <ImageViewer
          images={viewerImages}
          startIndex={viewerStart}
          onClose={() => setViewerImages([])}
        />
      )}
    </>
  );
}