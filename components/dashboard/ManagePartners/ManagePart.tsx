"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Plus,
  Edit,
  Trash2,
  Handshake,
  Upload,
  X,
  ExternalLink,
  ImagePlus,
} from "lucide-react";
import { uploadImage } from "@/lib/cloudinary";
import { getResponseErrorMessage } from "@/lib/api";
import DeleteModal from "@/components/dashboard/shared/DeleteModal";
import ToastMessage from "@/components/dashboard/shared/ToastMessage";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Partner {
  id: string;
  logo: string;
  name?: string;
  link?: string;
  created_at?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

// ─── Shared UI atoms (matching your codebase) ────────────────────────────────

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

// ─── Partner Modal ─────────────────────────────────────────────────────────────

interface PartnerModalProps {
  partner?: Partner | null;
  onSave: (data: Omit<Partner, "id" | "created_at">) => Promise<void>;
  onClose: () => void;
}

function PartnerModal({ partner, onSave, onClose }: PartnerModalProps) {
  const isEdit = !!partner;

  const [logo, setLogo] = useState(partner?.logo ?? "");
  const [name, setName] = useState(partner?.name ?? "");
  const [link, setLink] = useState(partner?.link ?? "");
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

  const uploadLogo = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
    setIsUploading(true);
    setError("");
    try {
      const url = await uploadImage(file);
      setLogo(url);
    } catch {
      setError("Logo upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) await uploadLogo(e.target.files[0]);
    e.target.value = "";
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) await uploadLogo(file);
  };

  const handleSave = async () => {
    if (!logo) {
      setError("Logo image is required.");
      return;
    }
    setIsSaving(true);
    setError("");
    try {
      await onSave({
        logo,
        name: name.trim() || undefined,
        link: link.trim() || undefined,
      });
      onClose();
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Save failed. Please try again."));
    } finally {
      setIsSaving(false);
    }
  };

  const canSave = logo && !isUploading && !isSaving;

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
              {isEdit ? "Edit Partner" : "Add New Partner"}
            </h2>
            <p className="text-xs text-gray-mid mt-0.5">
              {isEdit
                ? "Update the partner details below."
                : "Upload a logo and optionally add a name and link."}
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

          {/* Logo upload */}
          <div>
            <SectionTitle>Partner Logo</SectionTitle>

            {logo ? (
              /* Preview */
              <div className="relative group w-full h-36 rounded-xl border border-line/20 bg-subtle overflow-hidden flex items-center justify-center">
                <Image
                  src={logo}
                  alt="Partner logo preview"
                  fill
                  className="object-contain p-4"
                  sizes="400px"
                />
                <button
                  type="button"
                  onClick={() => setLogo("")}
                  className="absolute top-2 right-2 w-7 h-7 bg-white/90 hover:bg-red-100 text-gray-600 hover:text-red-600 rounded-full flex items-center justify-center shadow-sm transition-colors opacity-0 group-hover:opacity-100"
                >
                  <X size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-xs font-medium text-foreground rounded-lg shadow-sm transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Upload size={11} />
                  Replace
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
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
                  accept="image/*"
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
                        Uploading logo…
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-xl bg-subtle border border-line/20 flex items-center justify-center">
                        <ImagePlus size={18} className="text-gray-mid" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground font-medium">
                          Drop logo here or{" "}
                          <span className="text-primary font-semibold">browse</span>
                        </p>
                        <p className="text-xs text-gray-mid mt-0.5">
                          JPG, PNG, SVG, WEBP — recommended: transparent PNG
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
              <Field label="Partner Name">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Acme Corporation (used for alt text & tooltip)"
                  className={inputCls}
                />
              </Field>

              <Field label="Website Link">
                <div className="relative">
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://partner-website.com"
                    className={inputCls + " pr-10"}
                  />
                  <ExternalLink
                    size={14}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-mid pointer-events-none"
                  />
                </div>
                <p className="text-[11px] text-gray-mid mt-1">
                  If provided, the logo will be clickable and open this URL.
                </p>
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
            {isSaving ? "Saving…" : isEdit ? "Update Partner" : "Add Partner"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Partner Card ─────────────────────────────────────────────────────────────

interface PartnerCardProps {
  partner: Partner;
  onEdit: (partner: Partner) => void;
  onDelete: (id: string) => void;
}

function PartnerCard({ partner, onEdit, onDelete }: PartnerCardProps) {
  return (
    <div className="border border-line/20 bg-background rounded-xl p-4 space-y-3 shadow-sm group">
      {/* Logo area */}
      <div className="relative w-full h-24 bg-subtle rounded-lg overflow-hidden flex items-center justify-center border border-line/10">
        <Image
          src={partner.logo}
          alt={partner.name ?? "Partner logo"}
          fill
          className="object-contain p-3"
          sizes="200px"
          title={partner.name}
        />
      </div>

      {/* Info + actions */}
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          {partner.name ? (
            <p className="text-sm font-semibold text-foreground truncate">
              {partner.name}
            </p>
          ) : (
            <p className="text-xs text-gray-mid/50 italic">No name</p>
          )}
          {partner.link ? (
            <a
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-primary hover:underline flex items-center gap-1 mt-0.5 truncate"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={10} className="shrink-0" />
              <span className="truncate">{partner.link.replace(/^https?:\/\//, "")}</span>
            </a>
          ) : (
            <p className="text-[11px] text-gray-mid/40 mt-0.5">No link</p>
          )}
        </div>

        <div className="flex gap-1.5 shrink-0">
          <button
            onClick={() => onEdit(partner)}
            className="w-8 h-8 rounded-lg bg-subtle border border-line/20 flex items-center justify-center text-gray-mid hover:text-primary hover:border-primary/40 transition-colors"
            title="Edit"
          >
            <Edit size={13} />
          </button>
          <button
            onClick={() => onDelete(partner.id)}
            className="w-8 h-8 rounded-lg bg-subtle border border-line/20 flex items-center justify-center text-gray-mid hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors"
            title="Delete"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function PartnerCardSkeleton() {
  return (
    <div className="border border-line/20 bg-background rounded-xl p-4 space-y-3 animate-pulse">
      <div className="w-full h-24 bg-subtle rounded-lg" />
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <div className="h-3.5 w-28 bg-subtle rounded" />
          <div className="h-3 w-20 bg-subtle rounded" />
        </div>
        <div className="flex gap-1.5">
          <div className="w-8 h-8 bg-subtle rounded-lg" />
          <div className="w-8 h-8 bg-subtle rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────

function DeleteConfirmModal({
  partnerName,
  onConfirm,
  onCancel,
  isDeleting,
}: {
  partnerName?: string;
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
          <h2 className="text-base font-bold text-foreground">Delete Partner</h2>
          <p className="text-xs text-gray-mid mt-0.5">
            This action cannot be undone.
          </p>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm text-foreground">
            Are you sure you want to delete{" "}
            <span className="font-semibold">
              {partnerName ?? "this partner"}
            </span>
            ?
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

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Partner | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{ message: string; variant: "success" | "error" } | null>(null);

  const showToast = (
    message: string,
    variant: "success" | "error" = "success",
  ) => {
    setToast({ message, variant });
    window.setTimeout(() => setToast(null), 3000);
  };

  const fetchPartners = async () => {
    try {
      const res = await fetch("/api/partners");
      const data = await res.json();
      setPartners(data.partners ?? []);
    } catch {
      // handle silently
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleSave = async (data: Omit<Partner, "id" | "created_at">) => {
    const url = editingPartner
      ? `/api/partners/${editingPartner.id}`
      : "/api/partners";
    const method = editingPartner ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(await getResponseErrorMessage(res, "Failed to save partner."));
    }

    await fetchPartners();
    showToast(editingPartner ? "Partner updated." : "Partner added.");
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/partners/${deleteTarget.id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error(await getResponseErrorMessage(res, "Failed to delete partner."));
      }

      await fetchPartners();
      setDeleteTarget(null);
      showToast("Partner deleted.");
    } catch (error: unknown) {
      showToast(getErrorMessage(error, "Failed to delete partner."), "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const openAdd = () => {
    setEditingPartner(null);
    setModalOpen(true);
  };

  const openEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setModalOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Page header */}
      <div className="px-6 py-5 border-b border-line/20 bg-background shrink-0">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-foreground">Partners</h1>
            <p className="text-xs text-gray-mid mt-0.5">
              Manage partner logos displayed on the website.
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer shrink-0"
          >
            <Plus size={15} />
            Add Partner
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <PartnerCardSkeleton key={i} />
            ))}
          </div>
        ) : partners.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-xl bg-subtle border border-line/20 flex items-center justify-center mb-4">
              <Handshake size={22} className="text-gray-mid/50" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              No partners yet
            </p>
            <p className="text-xs text-gray-mid mt-1 max-w-xs">
              Add your first partner logo to have it displayed on the website.
            </p>
            <button
              onClick={openAdd}
              className="mt-5 flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Plus size={15} />
              Add Partner
            </button>
          </div>
        ) : (
          <>
            {/* Count */}
            <p className="text-xs text-gray-mid mb-4">
              <span className="font-semibold text-foreground">
                {partners.length}
              </span>{" "}
              partner{partners.length !== 1 ? "s" : ""}
            </p>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {partners.map((partner) => (
                <PartnerCard
                  key={partner.id}
                  partner={partner}
                  onEdit={openEdit}
                  onDelete={(id) =>
                    setDeleteTarget(partners.find((p) => p.id === id) ?? null)
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Add / Edit modal */}
      {modalOpen && (
        <PartnerModal
          partner={editingPartner}
          onSave={handleSave}
          onClose={() => {
            setModalOpen(false);
            setEditingPartner(null);
          }}
        />
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <DeleteModal
          open={!!deleteTarget}
          title={deleteTarget.name ?? "this partner"}
          resourceLabel="partner"
          isDeleting={isDeleting}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}

      {toast ? <ToastMessage message={toast.message} variant={toast.variant} /> : null}
    </div>
  );
}
