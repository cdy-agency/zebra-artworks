"use client";

import { Trash2, X } from "lucide-react";

interface DeleteModalProps {
  open: boolean;
  title: string;
  resourceLabel?: string;
  isDeleting?: boolean;
  confirmLabel?: string;
  onConfirm: () => Promise<void> | void;
  onClose: () => void;
}

export default function DeleteModal({
  open,
  title,
  resourceLabel = "item",
  isDeleting = false,
  confirmLabel = "Delete",
  onConfirm,
  onClose,
}: DeleteModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/60 p-6 backdrop-blur-[2px]">
      <div
        className="absolute inset-0"
        onClick={() => {
          if (!isDeleting) onClose();
        }}
      />

      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-line/20 bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-line/20 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 bg-red-50">
              <Trash2 size={16} className="text-red-500" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">
                Delete {resourceLabel}
              </h2>
              <p className="text-xs text-gray-mid">This action cannot be undone.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-subtle text-gray-mid transition-colors hover:bg-line/20 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="text-sm text-foreground">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{title || `this ${resourceLabel}`}</span>?
          </p>
        </div>

        <div className="flex justify-end gap-2.5 border-t border-line/20 bg-subtle px-6 py-4">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-lg border border-line/30 px-5 py-2.5 text-sm font-medium text-gray-mid transition-colors hover:border-line/60 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={() => void onConfirm()}
            disabled={isDeleting}
            className="rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
