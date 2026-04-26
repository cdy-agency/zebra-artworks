"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  MessageSquare,
  Clock,
  User,
  AtSign,
  Send,
  Inbox,
} from "lucide-react";


type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
};


function formatDate(iso: string) {
  const date = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / 86_400_000);

  if (days === 0)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  if (days === 1) return "Yesterday";
  if (days < 7) return date.toLocaleDateString("en-US", { weekday: "short" });
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatFull(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ─── Message Row ──────────────────────────────────────────────────────────────

function MessageRow({
  msg,
  isSelected,
  onClick,
}: {
  msg: Message;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-start gap-3 px-4 py-3.5 rounded-xl border transition-all duration-150 ${
        isSelected
          ? "border-primary/40 bg-primary/6 shadow-sm"
          : msg.is_read
            ? "border-line/20 bg-background hover:bg-subtle hover:border-line/40"
            : "border-primary/25 bg-primary/4 hover:border-primary/50"
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
          msg.is_read
            ? "bg-subtle border border-line/20 text-gray-mid"
            : "bg-primary text-white"
        }`}
      >
        {initials(msg.name)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <p
            className={`text-sm truncate ${msg.is_read ? "text-gray-mid" : "font-bold text-foreground"}`}
          >
            {msg.name}
          </p>
          <span className="text-[10px] text-gray-mid shrink-0">
            {formatDate(msg.created_at)}
          </span>
        </div>
        <p
          className={`text-xs truncate mb-0.5 ${msg.is_read ? "text-gray-mid" : "font-semibold text-foreground"}`}
        >
          {msg.subject}
        </p>
        <p className="text-[11px] text-gray-mid truncate leading-relaxed">
          {msg.message}
        </p>
      </div>

      {/* Unread dot */}
      {!msg.is_read && (
        <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
      )}
    </button>
  );
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────

function MessageDetail({ message }: { message: Message | null }) {
  if (!message) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-3 text-center p-8">
        <div className="w-14 h-14 rounded-2xl bg-subtle border border-line/20 flex items-center justify-center">
          <Inbox size={22} className="text-gray-mid/50" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            No message selected
          </p>
          <p className="text-xs text-gray-mid mt-1">
            Choose a message from the list to read it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Message header */}
      <div className="p-5 border-b border-line/10">
        <h2 className="text-sm font-bold text-foreground leading-snug mb-3">
          {message.subject}
        </h2>

        <div className="flex items-start gap-3">
          {/* Sender avatar */}
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
            {initials(message.name)}
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-1.5">
              <User size={11} className="text-gray-mid shrink-0" />
              <span className="text-xs font-semibold text-foreground">
                {message.name}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <AtSign size={11} className="text-gray-mid shrink-0" />
              <span className="text-xs text-gray-mid">{message.email}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={11} className="text-gray-mid shrink-0" />
              <span className="text-xs text-gray-mid">
                {formatFull(message.created_at)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="bg-subtle border border-line/10 rounded-xl p-4">
          <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
            {message.message}
          </p>
        </div>
      </div>

      {/* Reply footer */}
      <div className="p-5 border-t border-line/10">
        <a
          href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject)}`}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          <Send size={14} />
          Reply to {message.name.split(" ")[0]}
        </a>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  async function fetchMessages() {
    try {
      const res = await fetch("/api/messages/all");
      const data = await res.json();
      setMessages(data.messages ?? []);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  }

  async function markAsRead(msg: Message) {
    if (!msg.is_read) {
      await fetch("/api/messages/all", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: msg.id }),
      });
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, is_read: true } : m)),
      );
    }
    setSelected({ ...msg, is_read: true });
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="flex flex-col h-full gap-5">
      {/* ── Page header ───────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <MessageSquare size={18} className="text-primary" />
          </div>
          <div>
            <h1 className="text-base font-bold text-foreground leading-tight">
              Messages
            </h1>
            <p className="text-xs text-gray-mid mt-0.5">
              {unreadCount > 0
                ? `${unreadCount} unread message${unreadCount !== 1 ? "s" : ""}`
                : "All messages read"}
            </p>
          </div>
        </div>

        {/* Unread badge */}
        {unreadCount > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {unreadCount} unread
          </span>
        )}
      </div>

      {/* ── Main split ────────────────────────────────────────────────────── */}
      {loading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {/* List skeletons */}
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-4 py-3.5 rounded-xl border border-line/20 bg-background animate-pulse"
              >
                <div className="w-9 h-9 rounded-xl bg-subtle shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-32 bg-subtle rounded" />
                  <div className="h-2.5 w-24 bg-subtle rounded" />
                  <div className="h-2 w-40 bg-subtle rounded" />
                </div>
              </div>
            ))}
          </div>
          {/* Detail skeleton */}
          <div className="border border-line/20 bg-background rounded-2xl h-64 animate-pulse" />
        </div>
      ) : messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
          <div className="w-14 h-14 rounded-2xl bg-subtle border border-line/20 flex items-center justify-center">
            <Mail size={22} className="text-gray-mid/50" />
          </div>
          <p className="text-sm font-semibold text-foreground">
            No messages yet
          </p>
          <p className="text-xs text-gray-mid">
            When clients reach out, their messages will appear here.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-[340px_1fr] gap-4 flex-1 min-h-0">
          {/* ── List ──────────────────────────────────────────────────────── */}
          <div className="flex flex-col min-h-0">
            {/* Tabs: all / unread */}
            <div className="flex items-center gap-1 p-1 bg-subtle border border-line/20 rounded-xl mb-3 shrink-0">
              <button className="flex-1 py-1.5 text-xs font-semibold text-foreground bg-background rounded-lg shadow-sm border border-line/20">
                All ({messages.length})
              </button>
              <button className="flex-1 py-1.5 text-xs font-medium text-gray-mid rounded-lg hover:text-foreground transition-colors">
                Unread ({unreadCount})
              </button>
            </div>

            {/* Scrollable list */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-0.5">
              {messages.map((msg) => (
                <MessageRow
                  key={msg.id}
                  msg={msg}
                  isSelected={selected?.id === msg.id}
                  onClick={() => markAsRead(msg)}
                />
              ))}
            </div>
          </div>

          {/* ── Detail panel ──────────────────────────────────────────────── */}
          <div className="border border-line/20 bg-background rounded-2xl overflow-hidden flex flex-col min-h-0">
            <MessageDetail message={selected} />
          </div>
        </div>
      )}
    </div>
  );
}
