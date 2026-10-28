"use client";
import { Search, SlidersHorizontal } from "lucide-react";
import { STATUSES, type AdminFilters } from "../../types/admin";
export default function SubmissionFilters({
  value,
  onChange,
  games,
  categories,
}: {
  value: AdminFilters;
  onChange: (patch: Partial<AdminFilters>) => void;
  games: string[];
  categories: string[];
}) {
  return (
    <div className="admin-filters">
      <label className="admin-search">
        <Search size={18} />
        <span className="admin-sr-only">Search submissions</span>
        <input
          value={value.search}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder="Search creator, ID, email or description…"
        />
      </label>
      <div className="admin-filter-selects">
        <SlidersHorizontal size={17} aria-hidden="true" />
        <label>
          <span className="admin-sr-only">Game filter</span>
          <select
            value={value.game}
            onChange={(e) => onChange({ game: e.target.value })}
          >
            <option value="">All games</option>
            {games.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="admin-sr-only">Category filter</span>
          <select
            value={value.category}
            onChange={(e) => onChange({ category: e.target.value })}
          >
            <option value="">All categories</option>
            {categories.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="admin-sr-only">Status filter</span>
          <select
            value={value.status}
            onChange={(e) => onChange({ status: e.target.value })}
          >
            <option value="">All statuses</option>
            {STATUSES.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="admin-sr-only">Sort submissions</span>
          <select
            value={value.sort}
            onChange={(e) =>
              onChange({ sort: e.target.value as AdminFilters["sort"] })
            }
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="creator">Creator A–Z</option>
            <option value="status">Status A–Z</option>
          </select>
        </label>
      </div>
    </div>
  );
}
