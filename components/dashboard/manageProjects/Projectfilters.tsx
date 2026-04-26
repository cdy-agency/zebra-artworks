"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES, ALL_STATUSES } from "@/types/project";

export interface FilterState {
  search: string;
  category: string;
  status: string;
}

interface ProjectFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  totalCount: number;
  filteredCount: number;
}

export function ProjectFilters({
  filters,
  onChange,
  totalCount,
  filteredCount,
}: ProjectFiltersProps) {
  const hasActiveFilters = filters.search || filters.category || filters.status;

  const clear = () => onChange({ search: "", category: "", status: "" });

  const selectCls =
    "h-9 border border-line/30 bg-background text-foreground text-sm rounded-lg px-3 pr-8 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer appearance-none";

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2.5">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-mid pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search by title, category…"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="w-full h-9 pl-9 pr-3 border border-line/30 bg-background text-foreground text-sm rounded-lg outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-gray-mid"
          />
          {filters.search && (
            <button
              onClick={() => onChange({ ...filters, search: "" })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-mid hover:text-foreground"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Category filter */}
        <div className="relative">
          <select
            value={filters.category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
            className={selectCls + " min-w-45"}
          >
            <option value="">All Categories</option>
            {Object.keys(CATEGORIES).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <SlidersHorizontal
            size={13}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-mid pointer-events-none"
          />
        </div>

        {/* Status filter */}
        <div className="relative">
          <select
            value={filters.status}
            onChange={(e) => onChange({ ...filters, status: e.target.value })}
            className={selectCls + " min-w-35"}
          >
            <option value="">All Statuses</option>
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <SlidersHorizontal
            size={13}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-mid pointer-events-none"
          />
        </div>

        {/* Clear */}
        {hasActiveFilters && (
          <button
            onClick={clear}
            className="flex items-center gap-1.5 h-9 px-3 text-sm text-gray-mid hover:text-foreground border border-line/30 rounded-lg hover:border-line/60 transition-colors"
          >
            <X size={13} />
            Clear
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-mid">
        Showing{" "}
        <span className="font-semibold text-foreground">{filteredCount}</span>
        {hasActiveFilters && (
          <>
            {" "}
            of{" "}
            <span className="font-semibold text-foreground">{totalCount}</span>
          </>
        )}{" "}
        project{filteredCount !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
