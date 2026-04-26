"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  Settings2,
  LogOut,
  ChevronRight,
  NewspaperIcon,
  QuoteIcon
} from "lucide-react";

export default function AdminSidebar({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);

  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  useEffect(() => {
    async function fetchUnread() {
      try {
        const res = await fetch("/api/messages/unread");
        const data = await res.json();
        setUnreadCount(data.unreadCount ?? 0);
      } catch (err) {
        console.error("Failed to fetch unread count:", err);
      }
    }
    fetchUnread();
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, [pathname]);

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  const mainMenu = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard, badge: 0 },
    {
      label: "Projects",
      href: "/admin/manageProjects",
      icon: FolderKanban,
      badge: 0,
    },
    { label: "News", href: "/admin/news", icon: NewspaperIcon, badge: 0 },
    { label: "Testimonials", href: "/admin/testimonials", icon: QuoteIcon, badge: 0 },
    {
      label: "Messages",
      href: "/admin/messages",
      icon: MessageSquare,
      badge: unreadCount,
    },
  ];

  const systemMenu = [
    { label: "Settings", href: "/admin/settings", icon: Settings2, badge: 0 },
  ];

  function NavItem({ item }: { item: (typeof mainMenu)[0] }) {
    const Icon = item.icon;
    const active = pathname === item.href;

    return (
      <Link
        href={item.href}
        className={`
          group relative flex items-center gap-3.5 px-4 py-3 rounded-lg
          transition-all duration-200
          ${
            active
              ? "bg-primary/10 text-primary"
              : "text-gray-mid hover:bg-subtle hover:text-foreground"
          }
        `}
      >
        {/* Active indicator */}
        {active && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-6 bg-primary rounded-r-full" />
        )}

        <Icon
          size={18}
          strokeWidth={active ? 2 : 1.75}
          className={`shrink-0 transition-colors duration-200 ${
            active
              ? "text-primary"
              : "text-gray-mid group-hover:text-foreground"
          }`}
        />

        <span
          className={`flex-1 text-sm font-medium tracking-wide transition-colors duration-200`}
        >
          {item.label}
        </span>

        {item.badge > 0 ? (
          <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-5 text-center leading-none">
            {item.badge > 99 ? "99+" : item.badge}
          </span>
        ) : active ? (
          <ChevronRight size={14} className="text-primary/60 shrink-0" />
        ) : null}
      </Link>
    );
  }

  return (
    <aside className="w-60 shrink-0 flex flex-col bg-background border-r border-line/20">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-line/20">
        <div className="flex items-center gap-2.5">
          {/* Brand mark */}
          <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-sm shrink-0">
            <span className="text-white font-black text-xs tracking-tight">
              ZA
            </span>
          </div>
          <Link href="/" className="flex flex-col leading-tight">
            <p className="text-sm font-bold tracking-wide text-foreground leading-tight">
              Zebra <span className="text-primary">Artworks</span>
            </p>
            <p className="text-[10px] text-gray-mid tracking-widest uppercase mt-0.5">
              Admin Panel
            </p>
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-5 px-3 flex flex-col gap-0.5 overflow-y-auto">
        {/* Main group */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-mid px-4 mb-2">
          Main
        </p>
        {mainMenu.map((item) => (
          <NavItem key={item.href} item={item} />
        ))}

        {/* System group */}
        <div className="mt-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-mid px-4 mb-2">
            System
          </p>
          {systemMenu.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </div>
      </nav>

      {/* User footer */}
      <div className="px-4 py-4 border-t border-line/20">
        <div className="flex items-center gap-3 p-2.5 rounded-lg bg-subtle mb-3">
          {/* Avatar */}
          <div className="w-9 h-9 bg-primary/15 border border-primary/20 flex items-center justify-center rounded-md shrink-0">
            <span className="text-primary text-[11px] font-bold tracking-wider">
              {initials}
            </span>
          </div>
          <div className="overflow-hidden flex-1 min-w-0">
            <p className="text-foreground text-sm font-semibold leading-tight truncate">
              {fullName}
            </p>
            <p className="text-gray-mid text-[11px] truncate mt-0.5">{email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 text-gray-mid hover:text-red-500 transition-colors duration-200 text-xs font-medium tracking-wide px-2 py-1.5 rounded-md hover:bg-red-50 cursor-pointer group"
        >
          <LogOut
            size={14}
            className="group-hover:text-red-500 transition-colors"
          />
          Sign out
        </button>
      </div>
    </aside>
  );
}
