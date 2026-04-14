"use client";

import { useEffect, useState } from "react";
import { Mail, MailOpen } from "lucide-react";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

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
        prev.map((m) => (m.id === msg.id ? { ...m, is_read: true } : m))
      );
    }

    setSelected({ ...msg, is_read: true });
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Messages</h1>
          <p className="text-gray-mid text-sm">
            {unreadCount > 0
              ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""}`
              : "All messages read"}
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-mid text-sm">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-mid text-sm">No messages yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">

          {/* Message List */}
          <div className="space-y-2">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => markAsRead(msg)}
                className={`w-full text-left p-4 rounded-lg border transition ${
                  selected?.id === msg.id
                    ? "border-primary bg-primary/5"
                    : msg.is_read
                    ? "border-line/20 bg-background hover:border-line"
                    : "border-primary/30 bg-primary/5 hover:border-primary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 ${
                      msg.is_read
                        ? "bg-subtle text-gray-mid"
                        : "bg-primary text-background"
                    }`}
                  >
                    {msg.is_read ? <MailOpen size={14} /> : <Mail size={14} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={`text-sm truncate ${
                          msg.is_read
                            ? "text-gray-mid"
                            : "font-semibold text-foreground"
                        }`}
                      >
                        {msg.name}
                      </p>
                      <span className="text-xs text-gray-mid flex-shrink-0">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <p
                      className={`text-xs truncate ${
                        msg.is_read ? "text-gray-mid" : "text-foreground"
                      }`}
                    >
                      {msg.subject}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Message Detail */}
          <div className="border border-line/20 bg-background rounded-lg p-6">
            {selected ? (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    {selected.subject}
                  </h2>

                  <p className="text-sm text-gray-mid">
                    From:{" "}
                    <span className="text-foreground font-medium">
                      {selected.name}
                    </span>{" "}
                    &lt;{selected.email}&gt;
                  </p>

                  <p className="text-xs text-gray-mid">
                    {new Date(selected.created_at).toLocaleString()}
                  </p>
                </div>

                <hr className="border-line/20" />

                <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                  {selected.message}
                </p>

                {/* ✅ FIXED BUTTON */}
                <a
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                  className="inline-block mt-4 px-4 py-2 bg-primary text-background text-sm rounded-lg hover:bg-primary-dark transition"
                >
                  Reply via Email
                </a>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-mid text-sm">
                Select a message to read it
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}