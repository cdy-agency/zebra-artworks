"use client";

import Image from "next/image";
import { Edit, Trash2 } from "lucide-react";
import type { Project } from "@/lib/supabase";
import { StatusBadge } from "./Statusbadge";
import type { Status } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onViewImages: (images: string[], startIndex: number) => void;
}

export function ProjectCard({
  project,
  onEdit,
  onDelete,
  onViewImages,
}: ProjectCardProps) {
  return (
    <div className="border border-line/20 bg-background rounded-xl p-4 space-y-3 shadow-sm">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-bold text-foreground leading-snug">
            {project.title}
          </p>
          <p className="text-xs text-gray-mid mt-0.5">
            {project.category}
            {project.subcategory && <> &rsaquo; {project.subcategory}</>}
          </p>
        </div>
        <div className="flex gap-1.5 shrink-0">
          <button
            onClick={() => onEdit(project)}
            className="w-8 h-8 rounded-lg bg-subtle border border-line/20 flex items-center justify-center text-gray-mid hover:text-primary hover:border-primary/40 transition-colors"
          >
            <Edit size={13} />
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="w-8 h-8 rounded-lg bg-subtle border border-line/20 flex items-center justify-center text-gray-mid hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Meta pills */}
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={project.status as Status} />
        {project.client && (
          <span className="text-xs text-gray-mid bg-subtle border border-line/20 px-2.5 py-1 rounded-full">
            {project.client}
          </span>
        )}
        {project.date && (
          <span className="text-xs text-gray-mid">{project.date}</span>
        )}
      </div>

      {/* Images strip */}
      {project.images.length > 0 && (
        <div className="flex gap-1.5">
          {project.images.slice(0, 5).map((src, i) => (
            <button
              key={i}
              onClick={() => onViewImages(project.images, i)}
              className="relative w-11 h-11 rounded-lg overflow-hidden border border-line/20 hover:border-primary/50 transition-colors shrink-0"
            >
              <Image
                src={src}
                alt={`${project.title} photo ${i + 1}`}
                fill
                className="object-cover"
                sizes="44px"
              />
            </button>
          ))}
          {project.images.length > 5 && (
            <button
              onClick={() => onViewImages(project.images, 5)}
              className="w-11 h-11 rounded-lg bg-subtle border border-line/20 text-xs font-bold text-gray-mid flex items-center justify-center shrink-0"
            >
              +{project.images.length - 5}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

export function ProjectCardSkeleton() {
  return (
    <div className="border border-line/20 bg-background rounded-xl p-4 space-y-3 animate-pulse">
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className="h-4 w-40 bg-subtle rounded" />
          <div className="h-3 w-28 bg-subtle rounded" />
        </div>
        <div className="flex gap-1.5">
          <div className="w-8 h-8 bg-subtle rounded-lg" />
          <div className="w-8 h-8 bg-subtle rounded-lg" />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-6 w-20 bg-subtle rounded-full" />
        <div className="h-6 w-16 bg-subtle rounded-full" />
      </div>
      <div className="flex gap-1.5">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-11 h-11 bg-subtle rounded-lg" />
        ))}
      </div>
    </div>
  );
}
