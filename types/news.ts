export interface NewsItem {
  id: string;
  title: string;
  tag: string;
  excerpt: string;
  body: string;
  date: string;
  status: "Published" | "Draft";
  images: string[];
}

export type NewsPayload = Omit<NewsItem, "id">;

export const TAGS = [
  "Company News",
  "Interior Design",
  "Architecture",
  "Awards",
  "Projects",
] as const;
