"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Image,
  Briefcase,
  Mail,
  Settings,
  LogOut,
} from "lucide-react";

const menu = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: Image },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Messages", href: "/admin/messages", icon: Mail },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar({ fullName }: { fullName: string }) {
  const pathname = usePathname();

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
              {item.label}
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