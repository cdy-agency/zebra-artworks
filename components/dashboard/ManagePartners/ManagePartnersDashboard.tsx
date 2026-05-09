"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  Search,
} from "lucide-react";
import { uploadImage } from "@/lib/cloudinary";

interface Partner {
  id: string;
  logo: string;
  name?: string;
  link?: string;
  created_at?: string;
}

interface FilterState {
  search: string;
}

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
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-subtle hover:bg-line/20 text-gray-mid hover:text-foreground flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg flex items-start gap-2">
              <span className="shrink-0 mt-0.5">!</span>
              <span>{error}</span>
            </div>
          )}

          <div>
            <SectionTitle>Partner Logo</SectionTitle>

            {logo ? (
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
                        Uploading logo...
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
                          JPG, PNG, SVG, WEBP - recommended: transparent PNG
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <div>
            <SectionTitle>Optional Details</SectionTitle>
            <div className="space-y-4">
              <Field label="Partner Name">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Acme Corporation"
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

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 px-6 py-4 border-t border-line/20 bg-subtle shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 border border-line/30 text-gray-mid hover:text-foreground hover:border-line/60 cursor-pointer rounded-lg text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave}
            className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity cursor-pointer"
          >
            {isSaving ? "Saving..." : isEdit ? "Update Partner" : "Add Partner"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PartnerFilters({
  filters,
  onChange,
  totalCount,
  filteredCount,
}: {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  totalCount: number;
  filteredCount: number;
}) {
  const hasActiveFilters = !!filters.search;

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-mid pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search by partner name or link..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="w-full h-9 pl-9 pr-3 border border-line/30 bg-background text-foreground text-sm rounded-lg outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-gray-mid"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onChange({ ...filters, search: "" })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-mid hover:text-foreground"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => onChange({ search: "" })}
            className="flex items-center gap-1.5 h-9 px-3 text-sm text-gray-mid hover:text-foreground border border-line/30 rounded-lg hover:border-line/60 transition-colors"
          >
            <X size={13} />
            Clear
          </button>
        )}
      </div>

      <p className="text-xs text-gray-mid">
        Showing{" "}
        <span className="font-semibold text-foreground">{filteredCount}</span>
        {hasActiveFilters && (
          <>
            {" "}
            of <span className="font-semibold text-foreground">{totalCount}</span>
          </>
        )}{" "}
        partner{filteredCount !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

function PartnersTable({
  partners,
  loading,
  onEdit,
  onDelete,
}: {
  partners: Partner[];
  loading: boolean;
  onEdit: (partner: Partner) => void;
  onDelete: (partner: Partner) => void;
}) {
  return (
    <div className="hidden md:block border border-line/20 bg-background rounded-xl overflow-hidden shadow-sm">
      <div className="grid grid-cols-[1.8fr_1.6fr_80px] bg-subtle px-5 py-3.5 border-b border-line/20 gap-4">
        {["Partner", "Link", ""].map((col, i) => (
          <span
            key={i}
            className={`text-[10px] font-bold uppercase tracking-widest text-gray-mid ${
              i === 2 ? "text-right" : ""
            }`}
          >
            {col}
          </span>
        ))}
      </div>

      <div className="divide-y divide-line/10">
        {loading ? (
          <PartnerTableLoadingRows />
        ) : partners.length === 0 ? (
          <PartnerTableEmptyState />
        ) : (
          partners.map((partner) => (
            <div
              key={partner.id}
              className="grid grid-cols-[1.8fr_1.6fr_80px] px-5 py-4 items-center gap-4 hover:bg-subtle/60 transition-colors group"
            >
              <div className="min-w-0 flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-line/20 bg-subtle shrink-0">
                  <Image
                    src={partner.logo}
                    alt={partner.name ?? "Partner logo"}
                    fill
                    className="object-contain p-1.5"
                    sizes="44px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {partner.name || "Unnamed Partner"}
                  </p>
                  <p className="text-xs text-gray-mid mt-0.5 truncate">
                    Logo asset
                  </p>
                </div>
              </div>

              <div className="min-w-0">
                {partner.link ? (
                  <a
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline truncate block"
                  >
                    {partner.link}
                  </a>
                ) : (
                  <span className="text-sm text-gray-mid/40">-</span>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => onEdit(partner)}
                  className="w-8 h-8 rounded-lg bg-subtle border border-line/20 flex items-center justify-center text-gray-mid hover:text-primary hover:border-primary/40 transition-colors"
                  title="Edit"
                >
                  <Edit size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(partner)}
                  className="w-8 h-8 rounded-lg bg-subtle border border-line/20 flex items-center justify-center text-gray-mid hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function PartnerTableLoadingRows() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-[1.8fr_1.6fr_80px] px-5 py-4 items-center gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-subtle rounded-lg animate-pulse shrink-0" />
            <div className="space-y-2 min-w-0">
              <div className="h-4 w-32 bg-subtle rounded animate-pulse" />
              <div className="h-3 w-20 bg-subtle rounded animate-pulse" />
            </div>
          </div>
          <div className="h-4 w-40 bg-subtle rounded animate-pulse" />
          <div className="flex justify-end gap-2">
            <div className="w-8 h-8 bg-subtle rounded-lg animate-pulse" />
            <div className="w-8 h-8 bg-subtle rounded-lg animate-pulse" />
          </div>
        </div>
      ))}
    </>
  );
}

function PartnerTableEmptyState() {
  return (
    <div className="py-16 text-center">
      <div className="w-12 h-12 rounded-xl bg-subtle border border-line/20 flex items-center justify-center mx-auto mb-3">
        <Handshake size={20} className="text-gray-mid/50" />
      </div>
      <p className="text-sm font-medium text-foreground">No partners found</p>
      <p className="text-xs text-gray-mid mt-1">
        Try adjusting your search or add a new partner.
      </p>
    </div>
  );
}

function PartnerMobileCard({
  partner,
  onEdit,
  onDelete,
}: {
  partner: Partner;
  onEdit: (partner: Partner) => void;
  onDelete: (partner: Partner) => void;
}) {
  return (
    <div className="border border-line/20 bg-background rounded-xl p-4 space-y-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-line/20 bg-subtle shrink-0">
            <Image
              src={partner.logo}
              alt={partner.name ?? "Partner logo"}
              fill
              className="object-contain p-1.5"
              sizes="48px"
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-foreground leading-snug truncate">
              {partner.name || "Unnamed Partner"}
            </p>
            <p className="text-xs text-gray-mid mt-0.5 truncate">
              {partner.link || "No link"}
            </p>
          </div>
        </div>
        <div className="flex gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => onEdit(partner)}
            className="w-8 h-8 rounded-lg bg-subtle border border-line/20 flex items-center justify-center text-gray-mid hover:text-primary hover:border-primary/40 transition-colors"
          >
            <Edit size={13} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(partner)}
            className="w-8 h-8 rounded-lg bg-subtle border border-line/20 flex items-center justify-center text-gray-mid hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {partner.link && (
        <a
          href={partner.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
        >
          <ExternalLink size={11} />
          Open website
        </a>
      )}
    </div>
  );
}

function PartnerMobileCardSkeleton() {
  return (
    <div className="border border-line/20 bg-background rounded-xl p-4 space-y-3 animate-pulse">
      <div className="flex justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-subtle rounded-lg" />
          <div className="space-y-2">
            <div className="h-4 w-28 bg-subtle rounded" />
            <div className="h-3 w-36 bg-subtle rounded" />
          </div>
        </div>
        <div className="flex gap-1.5">
          <div className="w-8 h-8 bg-subtle rounded-lg" />
          <div className="w-8 h-8 bg-subtle rounded-lg" />
        </div>
      </div>
      <div className="h-3 w-20 bg-subtle rounded" />
    </div>
  );
}

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
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 border border-line/30 text-gray-mid hover:text-foreground hover:border-line/60 cursor-pointer rounded-lg text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold disabled:opacity-50 cursor-pointer transition-colors"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ManagePartnersDashboard() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({ search: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Partner | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const fetchPartners = async () => {
    setLoading(true);
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

  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return partners.filter((partner) => {
      if (!q) return true;
      return (
        (partner.name ?? "").toLowerCase().includes(q) ||
        (partner.link ?? "").toLowerCase().includes(q)
      );
    });
  }, [partners, filters]);

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

    if (!res.ok) throw new Error("Failed to save partner.");

    await fetchPartners();
    showToast(editingPartner ? "Partner updated." : "Partner added.");
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await fetch(`/api/partners/${deleteTarget.id}`, { method: "DELETE" });
      await fetchPartners();
      showToast("Partner deleted.");
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
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

  const stats = [
    { label: "Total Partners", value: partners.length },
    { label: "With Links", value: partners.filter((p) => p.link).length },
    { label: "Without Links", value: partners.filter((p) => !p.link).length },
    { label: "Unnamed", value: partners.filter((p) => !p.name).length },
  ];

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Handshake size={18} className="text-primary" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground leading-tight">
                Manage Partners
              </h1>
              <p className="text-xs text-gray-mid mt-0.5">
                Add, update, and manage partner logos displayed on the website.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer shrink-0 shadow-sm"
          >
            <Plus size={16} />
            Add Partner
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-background border border-line/20 rounded-xl px-4 py-3.5 shadow-sm"
            >
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-gray-mid mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <PartnerFilters
          filters={filters}
          onChange={setFilters}
          totalCount={partners.length}
          filteredCount={filtered.length}
        />

        <PartnersTable
          partners={filtered}
          loading={loading}
          onEdit={openEdit}
          onDelete={setDeleteTarget}
        />

        <div className="md:hidden space-y-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <PartnerMobileCardSkeleton key={i} />
            ))
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center border border-line/20 rounded-xl bg-background">
              <p className="text-sm font-medium text-foreground">
                No partners found
              </p>
              <p className="text-xs text-gray-mid mt-1">
                Try adjusting your search or add a new partner.
              </p>
            </div>
          ) : (
            filtered.map((partner) => (
              <PartnerMobileCard
                key={partner.id}
                partner={partner}
                onEdit={openEdit}
                onDelete={setDeleteTarget}
              />
            ))
          )}
        </div>
      </div>

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

      {deleteTarget && (
        <DeleteConfirmModal
          partnerName={deleteTarget.name}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          isDeleting={isDeleting}
        />
      )}

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-2000 bg-foreground text-background text-sm font-medium px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
          {toastMsg}
        </div>
      )}
    </>
  );
}
