"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Image,
  Mail,
  Settings,
  LogOut,
} from "lucide-react";

export default function AdminSidebar({ fullName }: { fullName: string }) {
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(0);

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

    // Poll every 30 seconds for new messages
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, [pathname]); // re-fetch when navigating (e.g. after reading messages)

  const menu = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard, badge: 0 },
    { label: "Projects", href: "/admin/manageProjects", icon: Image, badge: 0 },
    { label: "Messages", href: "/admin/messages", icon: Mail, badge: unreadCount },
    { label: "Settings", href: "/admin/settings", icon: Settings, badge: 0 },
  ];

  return (
    <aside className="w-[230px] border-r border-line/20 bg-background flex flex-col">

      {/* Logo */}
      <div className="p-5 border-b border-line/20">
        <h1 className="text-lg font-bold text-foreground">
          ZEBRA <span className="text-primary">ARTWORKS</span>
        </h1>
        <p className="text-xs text-gray-mid">Admin Panel</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-3 space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                active
                  ? "bg-primary text-background"
                  : "text-gray-mid hover:bg-subtle hover:text-primary"
              }`}
            >
              <Icon size={16} />
              <span className="flex-1">{item.label}</span>

              {/* Badge */}
              {item.badge > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center leading-none">
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-line/20">
        <p className="text-sm font-semibold text-foreground">{fullName}</p>
        <button className="mt-2 text-xs text-gray-mid hover:text-primary flex items-center gap-2">
          <LogOut size={14} /> Logout
        </button>
      </div>
    </aside>
  );
}