"use client";
import { useState, useTransition } from "react";
import { Bell, Plus, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

// ─── Mock data (replace with real fetch when endpoints are ready) ───────────
const MOCK_UNREAD = 5;

type AdminTopbarProps = {
  fullName: string;
  roleLabel: string;
  /** Optional breadcrumb trail, e.g. ["Vehicles", "All Listings"] */
  breadcrumb?: string[];
  /** The current page title shown as the last breadcrumb item */
  pageTitle?: string;
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");

export default function AdminTopbar({
  fullName,
  roleLabel,
  breadcrumb = [],
  pageTitle = "Dashboard",
}: AdminTopbarProps) {
  const router = useRouter();
  // Swap for real fetch when endpoint exists:
  const unreadTotal = MOCK_UNREAD;

  const initials = getInitials(fullName);

  return (
    <header
      className="flex items-center justify-between shrink-0 bg-white"
      style={{
        height: 52,
        padding: "0 24px",
        borderBottom: "0.5px solid rgba(0,0,0,0.08)",
        fontFamily: "'Century Gothic','AppleGothic',Arial,sans-serif",
      }}
    >
      {/* ── Left: breadcrumb ── */}
      <div
        className="flex items-center gap-1.5"
        style={{ fontSize: 13, color: "#737373" }}
      >
        {breadcrumb.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span
              style={{ cursor: "pointer" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#005f75")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#737373")
              }
            >
              {crumb}
            </span>
            <ChevronRight size={12} strokeWidth={2} style={{ color: "#bbb" }} />
          </span>
        ))}
        <span style={{ fontWeight: 700, color: "#000", fontSize: 13 }}>
          {pageTitle}
        </span>
      </div>

      {/* ── Right: actions ── */}
      <div className="flex items-center gap-2">
        {/* + New button */}
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg text-white font-semibold transition-all"
          style={{
            background: "#005f75",
            border: "none",
            padding: "0 12px",
            height: 30,
            fontSize: 12,
            cursor: "pointer",
            fontFamily: "'Century Gothic','AppleGothic',Arial,sans-serif",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "#004557")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "#005f75")
          }
        >
          <Plus size={13} strokeWidth={2.5} />
          New
        </button>

        {/* Bell */}
        <button
          type="button"
          onClick={() => router.push("/admin/notification")}
          className="relative flex items-center justify-center rounded-lg transition-all"
          title="View notifications"
          style={{
            width: 30,
            height: 30,
            background: "#f5f5f5",
            border: "0.5px solid rgba(0,0,0,0.08)",
            cursor: "pointer",
            color: "#737373",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "#e8e8e8")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "#f5f5f5")
          }
        >
          <Bell size={14} />
          {unreadTotal > 0 && (
            <span
              className="absolute flex items-center justify-center font-bold text-white"
              style={{
                top: -3,
                right: -3,
                minWidth: 14,
                height: 14,
                background: "#ef4444",
                borderRadius: 99,
                fontSize: 8,
                border: "1.5px solid #fff",
                padding: "0 3px",
              }}
            >
              {unreadTotal > 99 ? "99+" : unreadTotal}
            </span>
          )}
        </button>

        {/* Divider */}
        <div
          style={{
            width: 0.5,
            height: 22,
            background: "rgba(0,0,0,0.1)",
            margin: "0 4px",
          }}
        />

        {/* User */}
        <div className="flex items-center gap-2">
          {/* Avatar circle */}
          <div
            className="rounded-full flex items-center justify-center text-white font-bold shrink-0"
            style={{
              width: 30,
              height: 30,
              background: "#005f75",
              fontSize: 11,
            }}
          >
            {initials}
          </div>
          <div className="hidden md:block">
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#000",
                lineHeight: 1.2,
              }}
            >
              {fullName}
            </p>
            <p style={{ fontSize: 10, color: "#737373" }}>{roleLabel}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
