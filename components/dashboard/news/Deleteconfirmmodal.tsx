"use client";

import { X, Trash2 } from "lucide-react";

interface Props {
  open: boolean;
  title: string;
  /** e.g. "article", "testimonial" */
  resourceLabel?: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export default function DeleteConfirmModal({
  open,
  title,
  resourceLabel = "article",
  onConfirm,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 bg-[#111] border border-white/8 w-full max-w-sm p-6 shadow-2xl">
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-0.75 bg-red-500" />

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500/10 flex items-center justify-center">
              <Trash2 size={15} className="text-red-400" />
            </div>
            <p className="text-white text-sm font-semibold">
              Delete {resourceLabel}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <p className="text-white/45 text-sm font-light leading-relaxed mb-6">
          Are you sure you want to delete{" "}
          <span className="text-white font-medium">&quot;{title}&quot;</span>? This action
          cannot be undone.
        </p>

        <div className="flex items-center gap-3 justify-end">
          <button
            onClick={onClose}
            className="text-white/35 text-xs font-medium uppercase tracking-widest hover:text-white transition-colors px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              await onConfirm();
              onClose();
            }}
            className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium uppercase tracking-widest px-5 py-2.5 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
