"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAdmin } from "./AdminProvider";
import { PageHeading } from "./AdminUI";
import SubmissionTable from "./SubmissionTable";
import SubmissionFilters from "./SubmissionFilters";
import { filterSubmissions } from "../../lib/admin-selectors";
import type { AdminFilters } from "../../types/admin";
const initial: AdminFilters = {
  search: "",
  game: "",
  category: "",
  status: "",
  sort: "newest",
};
export default function SubmissionsPage() {
  const { submissions, preferences } = useAdmin();
  const [filters, setFilters] = useState(initial);
  const [page, setPage] = useState(1);
  const filtered = filterSubmissions(submissions, filters);
  const pageSize = preferences.defaultPageSize;
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pages);
  const start = (current - 1) * pageSize;
  function change(patch: Partial<AdminFilters>) {
    setFilters((f) => ({ ...f, ...patch }));
    setPage(1);
  }
  return (
    <>
      <PageHeading
        eyebrow="THE EDITORIAL QUEUE"
        title="Every moment starts here."
        description="Find the next standout clip. Review and organize fictional submissions."
        action={
          <span className="admin-count-pill">
            {submissions.length} demo submissions
          </span>
        }
      />
      <section className="admin-panel">
        <div className="admin-panel-heading">
          <h2>Submissions</h2>
          <button
            className="admin-text-button"
            onClick={() => {
              setFilters(initial);
              setPage(1);
            }}
          >
            Reset filters
          </button>
        </div>
        <SubmissionFilters
          value={filters}
          onChange={change}
          games={[...new Set(submissions.map((s) => s.game))].sort()}
          categories={[...new Set(submissions.map((s) => s.category))].sort()}
        />
        <SubmissionTable items={filtered.slice(start, start + pageSize)} />
        <div className="admin-pagination">
          <span role="status">
            {filtered.length
              ? `${start + 1}–${Math.min(start + pageSize, filtered.length)}`
              : "0"}{" "}
            of {filtered.length} submissions
          </span>
          <div>
            <button
              aria-label="Previous page"
              disabled={current === 1}
              onClick={() => setPage(current - 1)}
            >
              <ChevronLeft size={17} />
            </button>
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                aria-label={`Page ${i + 1}`}
                aria-current={current === i + 1 ? "page" : undefined}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              aria-label="Next page"
              disabled={current === pages}
              onClick={() => setPage(current + 1)}
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
