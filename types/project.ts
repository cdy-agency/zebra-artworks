export const CATEGORIES: Record<string, string[]> = {
  "Interior Design": [
    "Commercial Spaces",
    "Residential Spaces",
    "Hotels & Apartments",
    "Public & Private Offices",
  ],
  "Architecture & Construction": [
    "Architectural Plan",
    "MEP Supplies",
    "Construction",
    "Materials Supply",
  ],
};

export type Status = "Pending" | "Ongoing" | "Completed";

export const ALL_STATUSES: Status[] = ["Pending", "Ongoing", "Completed"];

export const STATUS_STYLES: Record<
  Status,
  { bg: string; text: string; dot: string }
> = {
  Completed: {
    bg: "bg-emerald-50 border border-emerald-200",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  Ongoing: {
    bg: "bg-blue-50 border border-blue-200",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },
  Pending: {
    bg: "bg-amber-50 border border-amber-200",
    text: "text-amber-700",
    dot: "bg-amber-400",
  },
};
