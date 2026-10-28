"use client";
import Link from "next/link";
import { ArrowUpRight, Inbox } from "lucide-react";
import type { AdminSubmission } from "../../types/admin";
import { StatusBadge, formatDate } from "./AdminUI";
export default function SubmissionTable({
  items,
}: {
  items: AdminSubmission[];
}) {
  if (!items.length)
    return (
      <div className="admin-empty">
        <Inbox size={32} />
        <h3>No clips match your filters</h3>
        <p>Try a different search or clear your filters.</p>
      </div>
    );
  return (
    <div
      className="admin-table-scroll"
      tabIndex={0}
      role="region"
      aria-label="Submissions table, scroll horizontally on small screens"
    >
      <table className="admin-table">
        <caption className="admin-sr-only">Fictional clip submissions</caption>
        <thead>
          <tr>
            {[
              "Submission ID",
              "Creator",
              "Game",
              "Category",
              "Date",
              "Status",
              "Actions",
            ].map((s) => (
              <th key={s} scope="col">
                {s}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((s) => (
            <tr key={s.id}>
              <td>
                <Link
                  className="admin-id-link"
                  href={`/admin/submissions/${s.id}`}
                >
                  {s.id}
                </Link>
              </td>
              <td>
                <span className="admin-creator">
                  <span className="admin-avatar tiny-avatar">
                    {s.creator.slice(0, 2).toUpperCase()}
                  </span>
                  {s.creator}
                </span>
              </td>
              <td>{s.game}</td>
              <td>{s.category}</td>
              <td className="admin-date">{formatDate(s.submittedAt)}</td>
              <td>
                <StatusBadge status={s.status} />
              </td>
              <td>
                <Link
                  className="admin-view"
                  href={`/admin/submissions/${s.id}`}
                  aria-label={`View submission ${s.id} by ${s.creator}`}
                >
                  View <ArrowUpRight size={14} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
