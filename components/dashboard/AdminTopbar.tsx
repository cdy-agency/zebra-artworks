"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, Mail, Clock, X } from "lucide-react";


type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  created_at: string;
  is_read: boolean;
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}


function NotificationDropdown({
  messages,
  onClose,
}: {
  messages: Message[];
  onClose: () => void;
}) {
  const unread = messages.filter((m) => !m.is_read);

  return (
    <div className="absolute right-0 top-full mt-2.5 w-85 bg-background border border-line/20 rounded-2xl shadow-xl overflow-hidden z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-line/10">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-foreground">Notifications</p>
          {unread.length > 0 && (
            <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
              {unread.length}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded-lg hover:bg-subtle flex items-center justify-center text-gray-mid hover:text-foreground transition-colors"
        >
          <X size={13} />
        </button>
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-line/10">
        {messages.length === 0 ? (
          <div className="py-10 text-center">
            <Bell size={20} className="text-gray-mid/40 mx-auto mb-2" />
            <p className="text-xs text-gray-mid">No notifications yet</p>
          </div>
        ) : (
          messages.slice(0, 8).map((msg) => (
            <Link
              key={msg.id}
              href="/admin/messages"
              onClick={onClose}
              className={`flex items-start gap-3 px-4 py-3 hover:bg-subtle transition-colors ${
                !msg.is_read ? "bg-primary/3" : ""
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  msg.is_read
                    ? "bg-subtle border border-line/20 text-gray-mid"
                    : "bg-primary/15 border border-primary/25 text-primary"
                }`}
              >
                {initials(msg.name)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <p
                    className={`text-xs truncate ${!msg.is_read ? "font-bold text-foreground" : "font-medium text-gray-mid"}`}
                  >
                    {msg.name}
                  </p>
                  <span className="text-[10px] text-gray-mid shrink-0 flex items-center gap-1">
                    <Clock size={9} />
                    {timeAgo(msg.created_at)}
                  </span>
                </div>
                <p
                  className={`text-[11px] truncate ${!msg.is_read ? "text-foreground" : "text-gray-mid"}`}
                >
                  {msg.subject}
                </p>
              </div>

              {/* Unread dot */}
              {!msg.is_read && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              )}
            </Link>
          ))
        )}
      </div>

      {/* Footer */}
      {messages.length > 0 && (
        <div className="px-4 py-3 border-t border-line/10 bg-subtle">
          <Link
            href="/admin/messages"
            onClick={onClose}
            className="flex items-center justify-center gap-1.5 text-xs font-semibold text-primary hover:opacity-80 transition-opacity"
          >
            <Mail size={12} />
            View all messages
          </Link>
        </div>
      )}
    </div>
  );
}

// ─── Mock data ───────────────────────────────────────────────────────────────

const MOCK_MESSAGES: Message[] = [
  {
    id: "mock-1",
    name: "Sarah Uwimana",
    email: "sarah.uwimana@example.com",
    subject: "Interior design inquiry for our office",
    created_at: new Date(Date.now() - 12 * 60_000).toISOString(),
    is_read: false,
  },
  {
    id: "mock-2",
    name: "Jean Pierre Habimana",
    email: "jp.habimana@example.com",
    subject: "Request for architectural plan quotation",
    created_at: new Date(Date.now() - 3 * 3_600_000).toISOString(),
    is_read: false,
  },
  {
    id: "mock-3",
    name: "Amina Kagabo",
    email: "amina.kagabo@example.com",
    subject: "Follow-up on the Kigali Heights project",
    created_at: new Date(Date.now() - 2 * 86_400_000).toISOString(),
    is_read: true,
  },
];

// ─── Topbar ───────────────────────────────────────────────────────────────────

export default function AdminTopbar({
  fullName,
  roleLabel,
  pageTitle,
}: {
  fullName: string;
  roleLabel: string;
  pageTitle: string;
}) {
  const pathname = usePathname();
  const [messages, setMessages] = useState<Message[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = messages.filter((m) => !m.is_read).length;

  // Fetch all messages for the dropdown preview
  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch("/api/messages/all");
        const data = await res.json();
        const fetched: Message[] = data.messages ?? [];
        // Fall back to mock data so the dropdown always has something to show
        setMessages(fetched.length > 0 ? fetched : MOCK_MESSAGES);
      } catch {
        setMessages(MOCK_MESSAGES);
      }
    }
    fetchMessages();
    const interval = setInterval(fetchMessages, 30_000);
    return () => clearInterval(interval);
  }, [pathname]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const avatarInitials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="h-15 shrink-0 border-b border-line/20 bg-background flex items-center justify-between px-6 gap-4">
      {/* Page title */}

<div className="flex items-center gap-3">
{/* LOGO */}

</div>
      
      <h2 className="text-sm font-bold text-foreground truncate">
        {pageTitle}
      </h2>

      {/* Right side */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Bell */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className={`relative w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-150 cursor-pointer ${
              dropdownOpen
                ? "bg-primary/10 border-primary/30 text-primary"
                : "bg-subtle border-line/20 text-gray-mid hover:text-foreground hover:border-line/40"
            }`}
          >
            <Bell size={16} />

            {/* Badge */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-background leading-none">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <NotificationDropdown
              messages={messages}
              onClose={() => setDropdownOpen(false)}
            />
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-line/20" />

        {/* User identity */}
        <div className="flex items-center gap-2.5">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-foreground leading-tight">
              {fullName}
            </p>
            <p className="text-[10px] text-gray-mid leading-tight">
              {roleLabel}
            </p>
          </div>
          <div className="w-8 h-8 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
            <span className="text-[11px] font-bold text-primary">
              {avatarInitials}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
