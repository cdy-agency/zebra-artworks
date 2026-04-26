"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderKanban,
  MessageSquare,
  CheckCircle2,
  Loader2,
  Clock,
  ArrowUpRight,
  LayoutDashboard,
} from "lucide-react";
import type { Project } from "@/lib/supabase";

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = "Pending" | "Ongoing" | "Completed";

interface PageData {
  projectCount: number;
  unreadCount: number;
  projects: Project[];
}

// ─── Donut Chart ──────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<Status, string> = {
  Completed: "#10b981",
  Ongoing: "#3b82f6",
  Pending: "#f59e0b",
};

function DonutChart({
  segments,
  total,
}: {
  segments: { label: Status; value: number; color: string }[];
  total: number;
}) {
  const R = 52;
  const C = 2 * Math.PI * R;
  const GAP = 3;

  let cursor = 0;
  const arcs = segments.map((seg) => {
    const pct = total > 0 ? seg.value / total : 0;
    const dash = Math.max(0, pct * C - GAP);
    const arc = { ...seg, dash, offset: cursor };
    // eslint-disable-next-line react-hooks/immutability
    cursor += pct * C;
    return arc;
  });

  return (
    <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
      {/* Track */}
      <circle
        cx="60"
        cy="60"
        r={R}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="14"
      />
      {/* Segments */}
      {arcs.map((arc, i) =>
        arc.dash > 0 ? (
          <circle
            key={i}
            cx="60"
            cy="60"
            r={R}
            fill="none"
            stroke={arc.color}
            strokeWidth="14"
            strokeDasharray={`${arc.dash} ${C - arc.dash}`}
            strokeDashoffset={-arc.offset}
            strokeLinecap="butt"
            style={{
              transition:
                "stroke-dasharray 0.8s ease, stroke-dashoffset 0.8s ease",
            }}
          />
        ) : null,
      )}
    </svg>
  );
}

// ─── Category Bar Chart ───────────────────────────────────────────────────────

function CategoryBars({ projects }: { projects: Project[] }) {
  const CATEGORIES = ["Interior Design", "Architecture & Construction"];
  const counts = CATEGORIES.map((cat) => ({
    label: cat,
    short: cat === "Interior Design" ? "Interior Design" : "Architecture",
    value: projects.filter((p) => p.category === cat).length,
  }));
  const max = Math.max(...counts.map((c) => c.value), 1);

  return (
    <div className="space-y-3">
      {counts.map((cat) => (
        <div key={cat.label}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-gray-mid">
              {cat.short}
            </span>
            <span className="text-xs font-bold text-foreground">
              {cat.value}
            </span>
          </div>
          <div className="h-2 bg-subtle rounded-full overflow-hidden border border-line/10">
            <div
              className="h-full bg-primary rounded-full transition-all duration-1000"
              style={{ width: `${(cat.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Sparkline (simple SVG) ───────────────────────────────────────────────────

function MiniSparkline({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? value / max : 0;
  const points = [0, 0.3, 0.5, 0.4, 0.6, 0.5, pct]
    .map((v, i, arr) => `${(i / (arr.length - 1)) * 60},${20 - v * 16}`)
    .join(" ");
  return (
    <svg viewBox="0 0 60 22" className="w-14 h-5 opacity-60">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  loading,
  accent,
  href,
  sparkMax,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  loading: boolean;
  accent: string;
  href: string;
  sparkMax: number;
}) {
  return (
    <Link
      href={href}
      className="group relative bg-background border border-line/20 rounded-2xl p-5 flex flex-col gap-4 hover:border-line/40 hover:shadow-sm transition-all duration-200 overflow-hidden"
    >
      {/* Subtle accent glow */}
      <div
        className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-[0.07] blur-xl pointer-events-none"
        style={{ background: accent }}
      />

      <div className="flex items-start justify-between">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
        >
          <Icon size={16} style={{ color: accent }} />
        </div>
        <ArrowUpRight
          size={14}
          className="text-gray-mid/40 group-hover:text-gray-mid transition-colors mt-0.5"
        />
      </div>

      <div>
        {loading ? (
          <div className="h-7 w-16 bg-subtle rounded-lg animate-pulse mb-1" />
        ) : (
          <p className="text-3xl font-bold text-foreground leading-none mb-1">
            {value}
          </p>
        )}
        <p className="text-xs text-gray-mid font-medium">{label}</p>
      </div>

      <div style={{ color: accent }}>
        <MiniSparkline value={value} max={sparkMax} />
      </div>
    </Link>
  );
}

// ─── Recent Projects ──────────────────────────────────────────────────────────

const STATUS_META: Record<Status, { dot: string; label: string }> = {
  Completed: { dot: "bg-emerald-500", label: "Completed" },
  Ongoing: { dot: "bg-blue-500", label: "Ongoing" },
  Pending: { dot: "bg-amber-400", label: "Pending" },
};

function RecentProjects({
  projects,
  loading,
}: {
  projects: Project[];
  loading: boolean;
}) {
  const recent = projects.slice(0, 5);

  return (
    <div className="bg-background border border-line/20 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-line/10 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-foreground">Recent Projects</p>
          <p className="text-xs text-gray-mid mt-0.5">
            Latest additions to your portfolio
          </p>
        </div>
        <Link
          href="/admin/manageProjects"
          className="text-xs text-primary font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          View all <ArrowUpRight size={12} />
        </Link>
      </div>

      <div className="divide-y divide-line/10">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="px-5 py-3.5 flex items-center gap-3 animate-pulse"
            >
              <div className="w-8 h-8 rounded-lg bg-subtle shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 w-36 bg-subtle rounded" />
                <div className="h-2.5 w-24 bg-subtle rounded" />
              </div>
              <div className="h-5 w-16 bg-subtle rounded-full" />
            </div>
          ))
        ) : recent.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="text-sm text-gray-mid">No projects yet.</p>
          </div>
        ) : (
          recent.map((project) => {
            const meta =
              STATUS_META[project.status as Status] ?? STATUS_META.Pending;
            return (
              <div
                key={project.id}
                className="px-5 py-3.5 flex items-center gap-3 hover:bg-subtle/60 transition-colors"
              >
                {/* Icon tile */}
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <FolderKanban size={14} className="text-primary" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {project.title}
                  </p>
                  <p className="text-xs text-gray-mid truncate">
                    {project.subcategory || project.category}
                  </p>
                </div>

                {/* Status pill */}
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border shrink-0"
                  style={{
                    background:
                      project.status === "Completed"
                        ? "#ecfdf5"
                        : project.status === "Ongoing"
                          ? "#eff6ff"
                          : "#fffbeb",
                    borderColor:
                      project.status === "Completed"
                        ? "#a7f3d0"
                        : project.status === "Ongoing"
                          ? "#bfdbfe"
                          : "#fde68a",
                    color:
                      project.status === "Completed"
                        ? "#065f46"
                        : project.status === "Ongoing"
                          ? "#1e40af"
                          : "#92400e",
                  }}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                  {meta.label}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const [data, setData] = useState<PageData>({
    projectCount: 0,
    unreadCount: 0,
    projects: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [dashRes, projectsRes, unreadRes] = await Promise.all([
          fetch("/api/dashboard"),
          fetch("/api/projects"),
          fetch("/api/messages/unread"),
        ]);

        const [dash, projects, unread] = await Promise.all([
          dashRes.json(),
          projectsRes.json(),
          unreadRes.json(),
        ]);

        setData({
          projectCount: dash.projectCount ?? 0,
          unreadCount: unread.unreadCount ?? 0,
          projects: Array.isArray(projects) ? projects : [],
        });
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  // ── Derived stats ──────────────────────────────────────────────────────────

  const { projects, projectCount, unreadCount } = data;

  const statusCounts = {
    Completed: projects.filter((p) => p.status === "Completed").length,
    Ongoing: projects.filter((p) => p.status === "Ongoing").length,
    Pending: projects.filter((p) => p.status === "Pending").length,
  };

  const donutSegments = (["Completed", "Ongoing", "Pending"] as Status[]).map(
    (s) => ({
      label: s,
      value: statusCounts[s],
      color: STATUS_COLORS[s],
    }),
  );

  const now = new Date();
  const hour = now.getHours();
  const greet =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <LayoutDashboard size={18} className="text-primary" />
          </div>
          <div>
            <h1 className="text-base font-bold text-foreground leading-tight">
              {greet} 👋
            </h1>
            <p className="text-xs text-gray-mid mt-0.5">{dateStr}</p>
          </div>
        </div>
      </div>

      {/* ── Stat Cards ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={FolderKanban}
          label="Total Projects"
          value={projectCount}
          loading={loading}
          accent="#005f75"
          href="/admin/manageProjects"
          sparkMax={20}
        />
        <StatCard
          icon={CheckCircle2}
          label="Completed"
          value={statusCounts.Completed}
          loading={loading}
          accent="#10b981"
          href="/admin/manageProjects"
          sparkMax={20}
        />
        <StatCard
          icon={MessageSquare}
          label="Unread Messages"
          value={unreadCount}
          loading={loading}
          accent="#f59e0b"
          href="/admin/messages"
          sparkMax={10}
        />
      </div>

      {/* ── Middle Row ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Donut — status breakdown */}
        <div className="bg-background border border-line/20 rounded-2xl p-5">
          <div className="mb-4">
            <p className="text-sm font-bold text-foreground">Project Status</p>
            <p className="text-xs text-gray-mid mt-0.5">
              Breakdown by current state
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 size={22} className="text-primary animate-spin" />
            </div>
          ) : (
            <div className="flex items-center gap-5">
              {/* Chart */}
              <div className="relative w-24 h-24 shrink-0">
                <DonutChart segments={donutSegments} total={projectCount} />
                {/* Centre label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-lg font-bold text-foreground leading-none">
                    {projectCount}
                  </span>
                  <span className="text-[9px] text-gray-mid uppercase tracking-widest mt-0.5">
                    total
                  </span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-col gap-2.5 flex-1">
                {donutSegments.map((seg) => (
                  <div
                    key={seg.label}
                    className="flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ background: seg.color }}
                      />
                      <span className="text-xs text-gray-mid truncate">
                        {seg.label}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-foreground">
                      {seg.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Category bars */}
        <div className="bg-background border border-line/20 rounded-2xl p-5">
          <div className="mb-4">
            <p className="text-sm font-bold text-foreground">By Category</p>
            <p className="text-xs text-gray-mid mt-0.5">
              Projects per service area
            </p>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="space-y-2 animate-pulse">
                  <div className="h-3 w-32 bg-subtle rounded" />
                  <div className="h-2 bg-subtle rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            <CategoryBars projects={projects} />
          )}

          {/* Ongoing indicator */}
          {!loading && statusCounts.Ongoing > 0 && (
            <div className="mt-5 pt-4 border-t border-line/10 flex items-center gap-2">
              <Clock size={13} className="text-blue-500 shrink-0" />
              <p className="text-xs text-gray-mid">
                <span className="font-bold text-foreground">
                  {statusCounts.Ongoing}
                </span>{" "}
                project{statusCounts.Ongoing !== 1 ? "s" : ""} currently active
              </p>
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="bg-background border border-line/20 rounded-2xl p-5 flex flex-col">
          <div className="mb-4">
            <p className="text-sm font-bold text-foreground">Quick Actions</p>
            <p className="text-xs text-gray-mid mt-0.5">
              Common tasks at a glance
            </p>
          </div>

          <div className="flex flex-col gap-2.5 flex-1">
            <Link
              href="/admin/manageProjects"
              className="flex items-center justify-between px-4 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity group"
            >
              <div className="flex items-center gap-2.5">
                <FolderKanban size={15} />
                Manage Projects
              </div>
              <ArrowUpRight
                size={14}
                className="opacity-60 group-hover:opacity-100 transition-opacity"
              />
            </Link>

            <Link
              href="/admin/messages"
              className="flex items-center justify-between px-4 py-3 bg-subtle border border-line/20 text-foreground rounded-xl text-sm font-semibold hover:border-line/40 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare size={15} className="text-gray-mid" />
                <span>View Messages</span>
                {unreadCount > 0 && (
                  <span className="bg-amber-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                    {unreadCount}
                  </span>
                )}
              </div>
              <ArrowUpRight
                size={14}
                className="text-gray-mid opacity-60 group-hover:opacity-100 transition-opacity"
              />
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center justify-between px-4 py-3 bg-subtle border border-line/20 text-foreground rounded-xl text-sm font-semibold hover:border-line/40 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 flex items-center justify-center">
                  <svg
                    viewBox="0 0 16 16"
                    className="w-3.5 h-3.5 text-gray-mid fill-current"
                  >
                    <path d="M8 5a3 3 0 1 0 0 6A3 3 0 0 0 8 5zm-1 3a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" />
                    <path d="M9.88 1.17a1 1 0 0 0-1.76 0L7.5 2.5l-1.5.5-.9-.9a1 1 0 0 0-1.4 1.4l.9.9-.5 1.5-1.33.62a1 1 0 0 0 0 1.76l1.33.62.5 1.5-.9.9a1 1 0 0 0 1.4 1.4l.9-.9 1.5.5.62 1.33a1 1 0 0 0 1.76 0l.62-1.33 1.5-.5.9.9a1 1 0 0 0 1.4-1.4l-.9-.9.5-1.5 1.33-.62a1 1 0 0 0 0-1.76l-1.33-.62-.5-1.5.9-.9a1 1 0 0 0-1.4-1.4l-.9.9-1.5-.5-.62-1.33z" />
                  </svg>
                </div>
                Settings
              </div>
              <ArrowUpRight
                size={14}
                className="text-gray-mid opacity-60 group-hover:opacity-100 transition-opacity"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Recent Projects ──────────────────────────────────────────────────── */}
      <RecentProjects projects={projects} loading={loading} />
    </div>
  );
}
