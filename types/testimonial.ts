export const TESTIMONIAL_CATEGORIES = [
  "Interior Design",
  "Architecture & Construction",
] as const;

export type TestimonialCategory = (typeof TESTIMONIAL_CATEGORIES)[number];

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
  category: TestimonialCategory;
  featured: boolean;
  /** If empty, UI derives from name */
  initials: string;
  created_at: string;
}

export type TestimonialPayload = Omit<Testimonial, "id" | "created_at">;
