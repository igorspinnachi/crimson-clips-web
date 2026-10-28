import type { AdminSubmission, AdminFilters } from "../types/admin";
export function filterSubmissions(
  items: AdminSubmission[],
  filters: AdminFilters,
) {
  const q = filters.search.trim().toLowerCase();
  return items
    .filter(
      (s) =>
        (!q ||
          `${s.id} ${s.creator} ${s.email} ${s.description}`
            .toLowerCase()
            .includes(q)) &&
        (!filters.game || s.game === filters.game) &&
        (!filters.category || s.category === filters.category) &&
        (!filters.status || s.status === filters.status),
    )
    .sort((a, b) =>
      filters.sort === "oldest"
        ? a.submittedAt.localeCompare(b.submittedAt)
        : filters.sort === "creator"
          ? a.creator.localeCompare(b.creator)
          : filters.sort === "status"
            ? a.status.localeCompare(b.status) ||
              b.submittedAt.localeCompare(a.submittedAt)
            : b.submittedAt.localeCompare(a.submittedAt),
    );
}
export function countBy(
  items: AdminSubmission[],
  field: "status" | "game" | "category",
) {
  return items.reduce<Record<string, number>>((r, item) => {
    r[item[field]] = (r[item[field]] || 0) + 1;
    return r;
  }, {});
}
export function activitySeries(items: AdminSubmission[]) {
  return Array.from({ length: 14 }, (_, i) => {
    const date = `2026-10-${String(15 + i).padStart(2, "0")}`;
    return {
      date,
      label: `Oct ${15 + i}`,
      count: items.filter((s) => s.submittedAt.startsWith(date)).length,
    };
  });
}
export function validCompilationUrl(value: string) {
  if (!value.trim()) return true;
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      ["youtube.com", "www.youtube.com", "youtu.be"].includes(url.hostname)
    );
  } catch {
    return false;
  }
}
