"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  List,
  Plus,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

// ─── Mock data (replace with real fetch when endpoints are ready) ───────────
const MOCK_UNREAD = 5;
const MOCK_USER = { fullName: "Admin Manager", role: "Administrator" };
// ───────────────────────────────────────────────────────────────────────────

type AdminSidebarProps = {
  fullName: string;
};

const menuItems = [
  {
    group: "Main Menu",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        badge: null,
      },
      {
        label: "All Listings",
        href: "/admin/listings",
        icon: List,
        badge: null,
      },
      {
        label: "Upload Vehicle",
        href: "/admin/listings/upload",
        icon: Plus,
        badge: "New",
      },
      {
        label: "Notifications",
        href: "/admin/notification",
        icon: Bell,
        badge: "unread",
      },
      {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
        badge: null,
      },
    ],
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");

const getTime = () =>
  new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

const getDate = () =>
  new Date()
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();

export default function AdminSidebar({ fullName }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [unread, setUnread] = useState(MOCK_UNREAD);
  const [isLoggingOut, setLoggingOut] = useState(false);
  const [time, setTime] = useState(getTime());

  // Tick clock every minute
  useEffect(() => {
    const id = setInterval(() => setTime(getTime()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Swap this for a real fetch when the endpoint exists:
  // const fetchUnread = useCallback(async () => { ... }, []);
  // useEffect(() => { fetchUnread(); ... }, [fetchUnread]);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.replace("/login");
      router.refresh();
      setLoggingOut(false);
    }
  };

  const initials = getInitials(fullName);

  return (
    <aside
      className="h-full flex flex-col bg-white border-r shrink-0"
      style={{
        width: 220,
        borderColor: "rgba(0,0,0,0.08)",
        fontFamily: "'Century Gothic','AppleGothic',Arial,sans-serif",
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: 3, background: "#005f75", flexShrink: 0 }} />

      {/* ── Logo ── */}
      <div
        className="flex items-center gap-3 px-4 py-4"
        style={{ borderBottom: "0.5px solid rgba(0,0,0,0.08)", flexShrink: 0 }}
      >
        {/* Logo mark */}
        <div
          className="relative flex items-center justify-center rounded-xl text-white font-bold text-xs shrink-0"
          style={{ width: 34, height: 34, background: "#005f75", fontSize: 12 }}
        >
          KM
          <span
            className="absolute rounded-full border-2 border-white"
            style={{
              width: 9,
              height: 9,
              background: "#007a96",
              bottom: -2,
              right: -2,
            }}
          />
        </div>

        {/* Brand text */}
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              lineHeight: 1.2,
              color: "#000",
            }}
          >
            KASON <span style={{ color: "#005f75" }}>MOTORS</span>
          </p>
          <p
            style={{
              fontSize: 10,
              color: "#737373",
              fontWeight: 500,
              marginTop: 2,
            }}
          >
            Admin Console
          </p>
        </div>
      </div>

      {/* ── Search box (mirrors ClientWise) ── */}
      <div
        className="px-3 py-3"
        style={{ borderBottom: "0.5px solid rgba(0,0,0,0.06)", flexShrink: 0 }}
      >
        <div
          className="flex items-center gap-2 px-3 rounded-lg"
          style={{
            background: "#f5f5f5",
            border: "0.5px solid rgba(0,0,0,0.08)",
            height: 34,
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#aaa"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            style={{
              border: "none",
              background: "transparent",
              outline: "none",
              fontSize: 12,
              color: "#555",
              width: "100%",
              fontFamily: "'Century Gothic','AppleGothic',Arial,sans-serif",
            }}
          />
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav
        className="flex-1 overflow-y-auto py-3 px-3"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#ddd transparent" }}
      >
        {menuItems.map((group) => (
          <div key={group.group}>
            <p
              className="px-2 mb-1"
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#737373",
              }}
            >
              {group.group}
            </p>

            <div className="flex flex-col" style={{ gap: 1 }}>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                const badgeVal =
                  item.badge === "unread" && unread > 0
                    ? String(unread > 99 ? "99+" : unread)
                    : item.badge === "unread"
                      ? null
                      : item.badge;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg transition-all duration-150"
                    style={{
                      padding: "9px 10px",
                      fontSize: 13,
                      fontWeight: 500,
                      textDecoration: "none",
                      background: isActive ? "#005f75" : "transparent",
                      color: isActive ? "#fff" : "#737373",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background =
                          "#f5f5f5";
                        (e.currentTarget as HTMLElement).style.color =
                          "#005f75";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background =
                          "transparent";
                        (e.currentTarget as HTMLElement).style.color =
                          "#737373";
                      }
                    }}
                  >
                    <Icon
                      size={15}
                      strokeWidth={isActive ? 2.5 : 2}
                      style={{ flexShrink: 0 }}
                    />
                    <span style={{ flex: 1 }}>{item.label}</span>

                    {badgeVal && (
                      <span
                        style={{
                          fontSize: 9.5,
                          fontWeight: 700,
                          padding: "2px 6px",
                          borderRadius: 99,
                          lineHeight: 1.4,
                          background:
                            item.badge === "New"
                              ? "rgba(0,95,117,0.1)"
                              : "rgba(109,40,217,0.08)",
                          color: item.badge === "New" ? "#005f75" : "#6d28d9",
                          border: `0.5px solid ${item.badge === "New" ? "rgba(0,95,117,0.25)" : "rgba(109,40,217,0.2)"}`,
                        }}
                      >
                        {badgeVal}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ── Footer: user card + time (mirrors ClientWise bottom) ── */}
      <div
        className="px-3 py-3 flex items-center gap-2.5"
        style={{ borderTop: "0.5px solid rgba(0,0,0,0.08)", flexShrink: 0 }}
      >
        {/* Avatar */}
        <div
          className="rounded-full flex items-center justify-center text-white font-bold shrink-0"
          style={{ width: 32, height: 32, background: "#005f75", fontSize: 11 }}
        >
          {initials}
        </div>

        {/* Name + time */}
        <div className="flex-1 min-w-0">
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#000",
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {fullName}
          </p>
          <p style={{ fontSize: 10, color: "#737373", marginTop: 1 }}>
            {time} &nbsp;·&nbsp; {getDate()}
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          title="Log Out"
          className="flex items-center justify-center rounded-lg transition-all"
          style={{
            width: 28,
            height: 28,
            border: "none",
            background: "none",
            cursor: "pointer",
            color: "#737373",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#dc2626";
            (e.currentTarget as HTMLElement).style.background = "#fff1f1";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#737373";
            (e.currentTarget as HTMLElement).style.background = "none";
          }}
        >
          <LogOut size={14} />
        </button>
      </div>
    </aside>
  );
}
