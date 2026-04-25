"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [projectCount, setProjectCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/dashboard");
        const data = await res.json();
        setProjectCount(data.projectCount);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
        setProjectCount(0);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">

      {/* Welcome */}
      <div>
        <h1 className="font-bold text-foreground">
          Welcome back
        </h1>
        <p className="text-gray-mid text-type-prose">
          Manage your projects, services, and clients here.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            title: "Projects",
            value: loading ? "..." : String(projectCount),
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-5 border border-line/20 bg-background rounded-lg"
          >
            <p className="text-type-prose text-gray-mid">{item.title}</p>
            <h2 className="font-bold text-foreground">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-5 border border-line/20 bg-background rounded-lg">
        <h3 className="font-semibold text-foreground mb-4">
          Actions
        </h3>

        <div className="flex justify-between gap-3 flex-wrap">
          <Link
            href="/admin/manageProjects"
            className="px-4 py-2 bg-primary text-background rounded-md text-type-prose"
          >
            Manage Projects
          </Link>

          <Link
            href="/admin/messages"
            className="px-4 py-2 border border-line text-foreground rounded-md text-type-prose"
          >
            View Messages
          </Link>
        </div>
      </div>

    </div>
  );
}