"use client";

import { Bell, ChevronRight, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const MOCK_UNREAD = 5;

type AdminTopbarProps = {
  fullName: string;
  roleLabel: string;
  breadcrumb?: string[];
  pageTitle?: string;
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

export default function AdminTopbar({
  fullName,
  roleLabel,
  breadcrumb = [],
  pageTitle = "Dashboard",
}: AdminTopbarProps) {
  const router = useRouter();
  const unreadTotal = MOCK_UNREAD;
  const initials = getInitials(fullName);

  return (
    <header
      className="flex h-[52px] shrink-0 items-center justify-between border-b border-line/10 bg-background px-6"
      style={{ fontFamily: "'Century Gothic','AppleGothic',Arial,sans-serif" }}
    >
      <div className="flex items-center gap-1.5 text-[13px] text-gray-mid">
        {breadcrumb.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span className="cursor-pointer transition-colors hover:text-primary">
              {crumb}
            </span>
            <ChevronRight
              size={12}
              strokeWidth={2}
              className="text-gray-mid/50"
            />
          </span>
        ))}
        <span className="text-[13px] font-bold text-foreground">
          {pageTitle}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-[30px] items-center gap-1.5 rounded-lg bg-primary px-3 text-[12px] font-semibold text-background transition-colors hover:bg-primary-dark"
          style={{
            border: "none",
            cursor: "pointer",
            fontFamily: "'Century Gothic','AppleGothic',Arial,sans-serif",
          }}
        >
          <Plus size={13} strokeWidth={2.5} />
          New
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/notification")}
          title="View notifications"
          className="relative flex h-[30px] w-[30px] items-center justify-center rounded-lg border border-line/10 bg-subtle text-gray-mid transition-colors hover:bg-gray-mid/10 hover:text-primary"
          style={{ cursor: "pointer" }}
        >
          <Bell size={14} />
          {unreadTotal > 0 && (
            <span className="absolute top-[-3px] right-[-3px] flex h-[14px] min-w-[14px] items-center justify-center rounded-full border-[1.5px] border-background bg-primary-dark px-[3px] text-[8px] font-bold text-background">
              {unreadTotal > 99 ? "99+" : unreadTotal}
            </span>
          )}
        </button>

        <div className="mx-1 h-[22px] w-px bg-line/15" />

        <div className="flex items-center gap-2">
          <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-background">
            {initials}
          </div>
          <div className="hidden md:block">
            <p
              className="text-foreground"
              style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.2 }}
            >
              {fullName}
            </p>
            <p className="text-[10px] text-gray-mid">{roleLabel}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
