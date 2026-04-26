"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, FolderKanban } from "lucide-react";
import type { Project } from "@/lib/supabase";

import {
  apiGetProjects,
  apiDeleteProject,
} from "@/lib/api";
import {
  ProjectFilters,
  type FilterState,
} from "@/components/dashboard/manageProjects/Projectfilters";
import { ProjectModal } from "@/components/dashboard/manageProjects/Projectmodal";
import { ProjectsTable } from "@/components/dashboard/manageProjects/Projectstable";
import {
  ProjectCard,
  ProjectCardSkeleton,
} from "@/components/dashboard/manageProjects/Projectcard";
import { ImageViewer } from "@/components/dashboard/manageProjects/Imageviewer";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ManageProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    status: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Project | null>(null);

  const [viewerImages, setViewerImages] = useState<string[]>([]);
  const [viewerStart, setViewerStart] = useState(0);

  // ── Data ──────────────────────────────────────────────────────────────────

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await apiGetProjects();
      setProjects(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ── Filtering ─────────────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    const q = filters.search.toLowerCase();
    return projects.filter((p) => {
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        (p.client ?? "").toLowerCase().includes(q);
      const matchCategory =
        !filters.category || p.category === filters.category;
      const matchStatus = !filters.status || p.status === filters.status;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [projects, filters]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const openAdd = () => {
    setEditTarget(null);
    setModalOpen(true);
  };
  const openEdit = (project: Project) => {
    setEditTarget(project);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditTarget(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this project?")) return;
    await apiDeleteProject(id);
    fetchProjects();
  };

  const handleViewImages = (images: string[], startIndex: number) => {
    setViewerImages(images);
    setViewerStart(startIndex);
  };

  //  Stat cards 
  const stats = [
    { label: "Total Projects", value: projects.length },
    {
      label: "Completed",
      value: projects.filter((p) => p.status === "Completed").length,
    },
    {
      label: "Ongoing",
      value: projects.filter((p) => p.status === "Ongoing").length,
    },
    {
      label: "Pending",
      value: projects.filter((p) => p.status === "Pending").length,
    },
  ];

  // Render 
  return (
    <>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <FolderKanban size={18} className="text-primary" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground leading-tight">
                Manage Projects
              </h1>
              <p className="text-xs text-gray-mid mt-0.5">
                Add, update, and manage your portfolio projects.
              </p>
            </div>
          </div>

          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer shrink-0 shadow-sm"
          >
            <Plus size={16} />
            Add Project
          </button>
        </div>

        {/* Stat strip */}
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

        {/* Filters */}
        <ProjectFilters
          filters={filters}
          onChange={setFilters}
          totalCount={projects.length}
          filteredCount={filtered.length}
        />

        {/* Desktop table */}
        <ProjectsTable
          projects={filtered}
          loading={loading}
          onEdit={openEdit}
          onDelete={handleDelete}
          onViewImages={handleViewImages}
        />

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center border border-line/20 rounded-xl bg-background">
              <p className="text-sm font-medium text-foreground">
                No projects found
              </p>
              <p className="text-xs text-gray-mid mt-1">
                Try adjusting your filters or add a new project.
              </p>
            </div>
          ) : (
            filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={openEdit}
                onDelete={handleDelete}
                onViewImages={handleViewImages}
              />
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <ProjectModal
          project={editTarget}
          onSave={fetchProjects}
          onClose={closeModal}
        />
      )}

      {/* Image lightbox */}
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
