import type { Project } from "@/lib/supabase";
import type { NewsItem, NewsPayload } from "@/types/news";
import type { Testimonial, TestimonialPayload } from "@/types/testimonial";

export async function apiGetProjects(): Promise<Project[]> {
  const res = await fetch("/api/projects");
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function apiSaveProject(
  data: Omit<Project, "id" | "created_at">,
  id?: string,
): Promise<void> {
  const res = await fetch(id ? `/api/projects/${id}` : "/api/projects", {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error ?? "Save failed");
  }
}

export async function apiDeleteProject(id: string): Promise<void> {
  const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Delete failed");
}

export async function apiGetNews(): Promise<NewsItem[]> {
  const res = await fetch("/api/news", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
}

export async function apiSaveNews(
  data: NewsPayload,
  id?: string,
): Promise<NewsItem> {
  const res = await fetch(id ? `/api/news/${id}` : "/api/news", {
    method: id ? "PATCH" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error ?? "Save failed");
  }

  return res.json();
}

export async function apiDeleteNews(id: string): Promise<void> {
  const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.error ?? "Delete failed");
  }
}

export async function apiGetTestimonials(
  category?: string,
): Promise<Testimonial[]> {
  const q = category
    ? `?category=${encodeURIComponent(category)}`
    : "";
  const res = await fetch(`/api/testimonials${q}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch testimonials");
  return res.json();
}

export async function apiSaveTestimonial(
  data: TestimonialPayload,
  id?: string,
): Promise<Testimonial> {
  const res = await fetch(
    id ? `/api/testimonials/${id}` : "/api/testimonials",
    {
      method: id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error ?? "Save failed");
  }
  return res.json();
}

export async function apiDeleteTestimonial(id: string): Promise<void> {
  const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.error ?? "Delete failed");
  }
}
