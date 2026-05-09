"use client";

import { useEffect, useRef, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Upload,
  X,
  FileText,
  Download,
} from "lucide-react";
import { getResponseErrorMessage } from "@/lib/api";
import DeleteModal from "@/components/dashboard/shared/DeleteModal";
import ToastMessage from "@/components/dashboard/shared/ToastMessage";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Resource {
  id: string;
  title?: string;
  description?: string;
  file_url: string;
  file_name: string;
  file_size?: string;
  created_at?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ─── Shared UI atoms ──────────────────────────────────────────────────────────

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

// ─── Resource Modal ───────────────────────────────────────────────────────────

interface ResourceModalProps {
  resource?: Resource | null;
  onSave: (data: Omit<Resource, "id" | "created_at">) => Promise<void>;
  onClose: () => void;
}

function ResourceModal({ resource, onSave, onClose }: ResourceModalProps) {
  const isEdit = !!resource;

  const [title, setTitle] = useState(resource?.title ?? "");
  const [description, setDescription] = useState(resource?.description ?? "");
  const [fileUrl, setFileUrl] = useState(resource?.file_url ?? "");
  const [fileName, setFileName] = useState(resource?.file_name ?? "");
  const [fileSize, setFileSize] = useState(resource?.file_size ?? "");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/resources/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed.");
      }
      setFileUrl(data.url);
      setFileName(file.name);
      setFileSize(formatFileSize(file.size));
    } catch (err: unknown) {
      setError(getErrorMessage(err, "File upload failed. Please try again."));
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) await uploadFile(e.target.files[0]);
    e.target.value = "";
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) await uploadFile(file);
  };

  const handleSave = async () => {
    if (!fileUrl) {
      setError("Please upload a file.");
      return;
    }
    setIsSaving(true);
    setError("");
    try {
      await onSave({
        title: title.trim() || undefined,
        description: description.trim() || undefined,
        file_url: fileUrl,
        file_name: fileName,
        file_size: fileSize || undefined,
      });
      onClose();
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Save failed. Please try again."));
    } finally {
      setIsSaving(false);
    }
  };

  const canSave = fileUrl && !isUploading && !isSaving;

  return (
    <div
      className="fixed inset-0 z-1000 bg-black/60 backdrop-blur-[2px] flex items-end sm:items-center justify-center sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-background rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[92vh] flex flex-col shadow-2xl border border-line/20 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-line/20 shrink-0">
          <div>
            <h2 className="text-base font-bold text-foreground">
              {isEdit ? "Edit Resource" : "Add New Resource"}
            </h2>
            <p className="text-xs text-gray-mid mt-0.5">
              {isEdit
                ? "Update the resource details below."
                : "Upload a file and optionally add a title and description."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-subtle hover:bg-line/20 text-gray-mid hover:text-foreground flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg flex items-start gap-2">
              <span className="shrink-0 mt-0.5">⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* File upload */}
          <div>
            <SectionTitle>File Upload</SectionTitle>

            {fileUrl ? (
              /* File preview */
              <div className="flex items-center gap-4 p-4 rounded-xl border border-line/20 bg-subtle">
                <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center rounded-lg shrink-0">
                  <FileText size={18} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {fileName}
                  </p>
                  {fileSize && (
                    <p className="text-xs text-gray-mid mt-0.5">{fileSize}</p>
                  )}
                </div>
                <button
                  onClick={() => {
                    setFileUrl("");
                    setFileName("");
                    setFileSize("");
                  }}
                  className="w-7 h-7 bg-white/90 hover:bg-red-100 text-gray-600 hover:text-red-600 rounded-full flex items-center justify-center shadow-sm transition-colors shrink-0"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              /* Drop zone */
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  isDragging
                    ? "border-primary bg-primary/5 scale-[1.01]"
                    : "border-line/40 hover:border-primary/40 hover:bg-subtle"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center gap-2 pointer-events-none">
                  {isUploading ? (
                    <>
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Upload size={18} className="text-primary animate-bounce" />
                      </div>
                      <p className="text-sm font-medium text-primary">
                        Uploading file…
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-xl bg-subtle border border-line/20 flex items-center justify-center">
                        <Upload size={18} className="text-gray-mid" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground font-medium">
                          Drop file here or{" "}
                          <span className="text-primary font-semibold">browse</span>
                        </p>
                        <p className="text-xs text-gray-mid mt-0.5">
                          PDF, DOC, DOCX, XLS, XLSX, PPT, ZIP
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Optional details */}
          <div>
            <SectionTitle>Optional Details</SectionTitle>
            <div className="space-y-4">
              <Field label="Title">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Company Profile"
                  className={inputCls}
                />
              </Field>

              <Field label="Description">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of this resource…"
                  rows={3}
                  className={inputCls + " resize-y"}
                />
              </Field>
            </div>
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
            {isSaving ? "Saving…" : isEdit ? "Update Resource" : "Add Resource"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Resource Row ─────────────────────────────────────────────────────────────

function ResourceRow({
  resource,
  onEdit,
  onDelete,
}: {
  resource: Resource;
  onEdit: (r: Resource) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-4 p-4 border border-line/20 bg-background rounded-xl shadow-sm group">
      {/* Icon */}
      <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center rounded-lg shrink-0">
        <FileText size={18} className="text-primary" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">
          {resource.title || resource.file_name}
        </p>
        {resource.description && (
          <p className="text-xs text-gray-mid mt-0.5 truncate">
            {resource.description}
          </p>
        )}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] text-gray-mid/60">{resource.file_name}</span>
          {resource.file_size && (
            <>
              <span className="text-[10px] text-gray-mid/40">·</span>
              <span className="text-[10px] text-gray-mid/60">{resource.file_size}</span>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 shrink-0">
        <a
          href={resource.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-lg bg-subtle border border-line/20 flex items-center justify-center text-gray-mid hover:text-primary hover:border-primary/40 transition-colors"
          title="Download"
        >
          <Download size={13} />
        </a>
        <button
          onClick={() => onEdit(resource)}
          className="w-8 h-8 rounded-lg bg-subtle border border-line/20 flex items-center justify-center text-gray-mid hover:text-primary hover:border-primary/40 transition-colors"
          title="Edit"
        >
          <Edit size={13} />
        </button>
        <button
          onClick={() => onDelete(resource.id)}
          className="w-8 h-8 rounded-lg bg-subtle border border-line/20 flex items-center justify-center text-gray-mid hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors"
          title="Delete"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function ResourceRowSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border border-line/20 bg-background rounded-xl animate-pulse">
      <div className="w-10 h-10 bg-subtle rounded-lg shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-48 bg-subtle rounded" />
        <div className="h-3 w-32 bg-subtle rounded" />
      </div>
      <div className="flex gap-1.5">
        <div className="w-8 h-8 bg-subtle rounded-lg" />
        <div className="w-8 h-8 bg-subtle rounded-lg" />
        <div className="w-8 h-8 bg-subtle rounded-lg" />
      </div>
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────

function DeleteConfirmModal({
  resourceTitle,
  onConfirm,
  onCancel,
  isDeleting,
}: {
  resourceTitle?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-1000 bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="bg-background rounded-2xl w-full max-w-sm shadow-2xl border border-line/20 overflow-hidden">
        <div className="px-6 py-5 border-b border-line/20">
          <h2 className="text-base font-bold text-foreground">Delete Resource</h2>
          <p className="text-xs text-gray-mid mt-0.5">This action cannot be undone.</p>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm text-foreground">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{resourceTitle ?? "this resource"}</span>?
          </p>
        </div>
        <div className="flex justify-end gap-2.5 px-6 py-4 border-t border-line/20 bg-subtle">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 border border-line/30 text-gray-mid hover:text-foreground hover:border-line/60 cursor-pointer rounded-lg text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold disabled:opacity-50 cursor-pointer transition-colors"
          >
            {isDeleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

void DeleteConfirmModal;

export default function ResourcesManagementPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Resource | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{ message: string; variant: "success" | "error" } | null>(null);

  const showToast = (
    message: string,
    variant: "success" | "error" = "success",
  ) => {
    setToast({ message, variant });
    window.setTimeout(() => setToast(null), 3000);
  };

  const fetchResources = async () => {
    try {
      const res = await fetch("/api/resources");
      const data = await res.json();
      setResources(data.resources ?? []);
    } catch {
      // handle silently
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleSave = async (data: Omit<Resource, "id" | "created_at">) => {
    const url = editingResource
      ? `/api/resources/${editingResource.id}`
      : "/api/resources";
    const method = editingResource ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(await getResponseErrorMessage(res, "Failed to save resource."));
    }
    await fetchResources();
    showToast(editingResource ? "Resource updated." : "Resource added.");
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/resources/${deleteTarget.id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error(await getResponseErrorMessage(res, "Failed to delete resource."));
      }

      await fetchResources();
      setDeleteTarget(null);
      showToast("Resource deleted.");
    } catch (error: unknown) {
      showToast(getErrorMessage(error, "Failed to delete resource."), "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const openAdd = () => {
    setEditingResource(null);
    setModalOpen(true);
  };

  const openEdit = (resource: Resource) => {
    setEditingResource(resource);
    setModalOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Page header */}
      <div className="px-6 py-5 border-b border-line/20 bg-background shrink-0">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-foreground">Resources</h1>
            <p className="text-xs text-gray-mid mt-0.5">
              Manage downloadable files displayed on the About page.
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer shrink-0"
          >
            <Plus size={15} />
            Add Resource
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <ResourceRowSkeleton key={i} />
            ))}
          </div>
        ) : resources.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-xl bg-subtle border border-line/20 flex items-center justify-center mb-4">
              <BookOpen size={22} className="text-gray-mid/50" />
            </div>
            <p className="text-sm font-semibold text-foreground">No resources yet</p>
            <p className="text-xs text-gray-mid mt-1 max-w-xs">
              Add your first resource to display it on the About page.
            </p>
            <button
              onClick={openAdd}
              className="mt-5 flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Plus size={15} />
              Add Resource
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs text-gray-mid mb-4">
              <span className="font-semibold text-foreground">{resources.length}</span>{" "}
              resource{resources.length !== 1 ? "s" : ""}
            </p>
            <div className="space-y-3">
              {resources.map((resource) => (
                <ResourceRow
                  key={resource.id}
                  resource={resource}
                  onEdit={openEdit}
                  onDelete={(id) =>
                    setDeleteTarget(resources.find((r) => r.id === id) ?? null)
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Add / Edit modal */}
      {modalOpen && (
        <ResourceModal
          resource={editingResource}
          onSave={handleSave}
          onClose={() => {
            setModalOpen(false);
            setEditingResource(null);
          }}
        />
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <DeleteModal
          open={!!deleteTarget}
          title={deleteTarget.title || deleteTarget.file_name}
          resourceLabel="resource"
          isDeleting={isDeleting}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}

      {toast ? <ToastMessage message={toast.message} variant={toast.variant} /> : null}
    </div>
  );
}
