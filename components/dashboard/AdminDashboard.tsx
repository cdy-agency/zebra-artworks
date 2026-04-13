"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  LayoutDashboard,
  List,
  LogOut,
  Plus,
  Settings,
} from "lucide-react";

const MOCK_UNREAD = 5;

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
    .map((part) => part[0]?.toUpperCase() ?? "")
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
  const [unread] = useState(MOCK_UNREAD);
  const [isLoggingOut, setLoggingOut] = useState(false);
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const id = setInterval(() => setTime(getTime()), 60_000);
    return () => clearInterval(id);
  }, []);

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
      className="flex h-full w-[220px] shrink-0 flex-col border-r border-line/10 bg-background text-foreground"
      style={{ fontFamily: "'Century Gothic','AppleGothic',Arial,sans-serif" }}
    >
      <div className="h-[3px] shrink-0 bg-primary" />

      <div className="flex shrink-0 items-center gap-3 border-b border-line/10 px-4 py-4">
        <div className="relative flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-xl bg-primary text-xs font-bold text-background">
          KM
          <span className="absolute right-[-2px] bottom-[-2px] h-[9px] w-[9px] rounded-full border-2 border-background bg-primary-light" />
        </div>

        <div>
          <p
            className="text-foreground"
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              lineHeight: 1.2,
            }}
          >
            KASON <span className="text-primary">MOTORS</span>
          </p>
          <p
            className="mt-[2px] text-gray-mid"
            style={{ fontSize: 10, fontWeight: 500 }}
          >
            Admin Console
          </p>
        </div>
      </div>

      <div className="shrink-0 border-b border-line/10 px-3 py-3">
        <div className="flex h-[34px] items-center gap-2 rounded-lg border border-line/10 bg-subtle px-3">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-mid/60"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="w-full border-none bg-transparent text-[12px] text-gray-mid outline-none placeholder:text-gray-mid/70"
            style={{ fontFamily: "'Century Gothic','AppleGothic',Arial,sans-serif" }}
          />
        </div>
      </div>

      <nav
        className="flex-1 overflow-y-auto px-3 py-3"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(115,115,115,0.35) transparent",
        }}
      >
        {menuItems.map((group) => (
          <div key={group.group}>
            <p
              className="mb-1 px-2 text-gray-mid"
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {group.group}
            </p>

            <div className="flex flex-col gap-px">
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
                    className={`flex items-center gap-3 rounded-lg px-[10px] py-[9px] text-[13px] font-medium transition-colors duration-150 ${
                      isActive
                        ? "bg-primary text-background"
                        : "text-gray-mid hover:bg-subtle hover:text-primary"
                    }`}
                    style={{ textDecoration: "none" }}
                  >
                    <Icon size={15} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="flex-1">{item.label}</span>

                    {badgeVal && (
                      <span
                        className={`rounded-full border px-[6px] py-[2px] text-[9.5px] font-bold leading-[1.4] ${
                          item.badge === "New"
                            ? "border-primary/25 bg-primary/10 text-primary"
                            : "border-primary-light/25 bg-primary-light/10 text-primary-light"
                        }`}
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

      <div className="flex shrink-0 items-center gap-2.5 border-t border-line/10 px-3 py-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-background">
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <p
            className="text-foreground"
            style={{
              fontSize: 12,
              fontWeight: 700,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {fullName}
          </p>
          <p className="mt-px text-[10px] text-gray-mid">
            {time} · {getDate()}
          </p>
        </div>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          title="Log Out"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-gray-mid transition-colors hover:bg-subtle hover:text-primary-dark disabled:cursor-not-allowed"
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          <LogOut size={14} />
        </button>
      </div>
    </aside>
  );
}
