"use client";

import Image from "next/image";
import { Edit, Trash2, ImageIcon } from "lucide-react";
import type { Project } from "@/lib/supabase";
import { StatusBadge } from "./Statusbadge";
import type { Status } from "@/types/project";

interface ProjectsTableProps {
  projects: Project[];
  loading: boolean;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onViewImages: (images: string[], startIndex: number) => void;
}

export function ProjectsTable({
  projects,
  loading,
  onEdit,
  onDelete,
  onViewImages,
}: ProjectsTableProps) {
  return (
    <div className="hidden md:block border border-line/20 bg-background rounded-xl overflow-hidden shadow-sm">
      {/* Table header */}
      <div className="grid grid-cols-[2.5fr_1.2fr_1.2fr_110px_1fr_80px] bg-subtle px-5 py-3.5 border-b border-line/20 gap-4">
        {["Project", "Category", "Subcategory", "Status", "Client", ""].map(
          (col, i) => (
            <span
              key={i}
              className={`text-[10px] font-bold uppercase tracking-widest text-gray-mid ${
                i === 5 ? "text-right" : ""
              }`}
            >
              {col}
            </span>
          ),
        )}
      </div>

      {/* Rows */}
      <div className="divide-y divide-line/10">
        {loading ? (
          <LoadingRows />
        ) : projects.length === 0 ? (
          <EmptyState />
        ) : (
          projects.map((project) => (
            <ProjectRow
              key={project.id}
              project={project}
              onEdit={onEdit}
              onDelete={onDelete}
              onViewImages={onViewImages}
            />
          ))
        )}
      </div>
    </div>
  );
}

// ─── Row ──────────────────────────────────────────────────────────────────────

function ProjectRow({
  project,
  onEdit,
  onDelete,
  onViewImages,
}: {
  project: Project;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
  onViewImages: (images: string[], startIndex: number) => void;
}) {
  return (
    <div className="grid grid-cols-[2.5fr_1.2fr_1.2fr_110px_1fr_80px] px-5 py-4 items-center gap-4 hover:bg-subtle/60 transition-colors group">
      {/* Title + images */}
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">
          {project.title}
        </p>
        {project.date && (
          <p className="text-xs text-gray-mid mt-0.5">{project.date}</p>
        )}
        {project.images.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2">
            {project.images.slice(0, 4).map((src, i) => (
              <button
                key={i}
                onClick={() => onViewImages(project.images, i)}
                className="relative w-8 h-8 rounded-md overflow-hidden border border-line/20 hover:border-primary/50 hover:scale-105 transition-all shrink-0"
              >
                <Image
                  src={src}
                  alt={`${project.title} photo ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </button>
            ))}
            {project.images.length > 4 && (
              <button
                onClick={() => onViewImages(project.images, 4)}
                className="w-8 h-8 rounded-md bg-subtle border border-line/20 text-[10px] font-bold text-gray-mid hover:border-primary/50 transition-colors flex items-center justify-center"
              >
                +{project.images.length - 4}
              </button>
            )}
          </div>
        )}
        {project.images.length === 0 && (
          <div className="flex items-center gap-1 mt-1.5">
            <ImageIcon size={11} className="text-gray-mid/50" />
            <span className="text-[10px] text-gray-mid/50">No photos</span>
          </div>
        )}
      </div>

      {/* Category */}
      <p className="text-sm text-gray-mid truncate">{project.category}</p>

      {/* Subcategory */}
      <p className="text-sm text-gray-mid truncate">{project.subcategory}</p>

      {/* Status */}
      <StatusBadge status={project.status as Status} />

      {/* Client */}
      <p className="text-sm text-gray-mid truncate">
        {project.client || <span className="text-gray-mid/40">—</span>}
      </p>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(project)}
          className="w-8 h-8 rounded-lg bg-subtle border border-line/20 flex items-center justify-center text-gray-mid hover:text-primary hover:border-primary/40 transition-colors"
          title="Edit"
        >
          <Edit size={13} />
        </button>
        <button
          onClick={() => onDelete(project.id)}
          className="w-8 h-8 rounded-lg bg-subtle border border-line/20 flex items-center justify-center text-gray-mid hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors"
          title="Delete"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}

// ─── States ───────────────────────────────────────────────────────────────────

function LoadingRows() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-[2.5fr_1.2fr_1.2fr_110px_1fr_80px] px-5 py-4 items-center gap-4"
        >
          <div className="space-y-2">
            <div className="h-4 w-40 bg-subtle rounded animate-pulse" />
            <div className="flex gap-1.5">
              {[...Array(3)].map((_, j) => (
                <div
                  key={j}
                  className="w-8 h-8 bg-subtle rounded-md animate-pulse"
                />
              ))}
            </div>
          </div>
          {[...Array(4)].map((_, j) => (
            <div key={j} className="h-4 w-24 bg-subtle rounded animate-pulse" />
          ))}
        </div>
      ))}
    </>
  );
}

function EmptyState() {
  return (
    <div className="py-16 text-center">
      <div className="w-12 h-12 rounded-xl bg-subtle border border-line/20 flex items-center justify-center mx-auto mb-3">
        <ImageIcon size={20} className="text-gray-mid/50" />
      </div>
      <p className="text-sm font-medium text-foreground">No projects found</p>
      <p className="text-xs text-gray-mid mt-1">
        Try adjusting your filters or add a new project.
      </p>
    </div>
  );
}
