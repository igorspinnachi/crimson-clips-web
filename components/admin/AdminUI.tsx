"use client";
import { useRef, type ReactNode } from "react";
import { X, ArrowUpRight } from "lucide-react";
import type { SubmissionStatus } from "../../types/admin";
export function StatusBadge({ status }: { status: SubmissionStatus }) {
  return (
    <span
      className={`admin-status status-${status.toLowerCase().replace(" ", "-")}`}
    >
      <i />
      {status}
    </span>
  );
}
export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="admin-page-heading">
      <div>
        <p className="admin-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}
export function StatsCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: number | string;
  detail: string;
  icon: ReactNode;
}) {
  return (
    <article className="admin-stat">
      <div>
        <span>{label}</span>
        <span className="admin-stat-icon">{icon}</span>
      </div>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  );
}
export function ConfirmButton({
  label,
  title,
  description,
  onConfirm,
  className,
  disabled = false,
}: {
  label: string;
  title: string;
  description: string;
  onConfirm: () => void;
  className?: string;
  disabled?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        disabled={disabled}
        className={className || "admin-button secondary"}
        onClick={() => dialog.current?.showModal()}
      >
        {label}
        <ArrowUpRight size={15} />
      </button>
      <dialog ref={dialog} className="admin-dialog" aria-label={title}>
        <div className="admin-dialog-heading">
          <h2>{title}</h2>
          <button
            className="admin-icon-button"
            aria-label="Close confirmation"
            onClick={() => dialog.current?.close()}
          >
            <X size={19} />
          </button>
        </div>
        <p>{description}</p>
        <div className="admin-dialog-actions">
          <button
            className="admin-button secondary"
            autoFocus
            onClick={() => dialog.current?.close()}
          >
            Cancel
          </button>
          <button
            className="admin-button"
            onClick={() => {
              onConfirm();
              dialog.current?.close();
            }}
          >
            Confirm
          </button>
        </div>
      </dialog>
    </>
  );
}
export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}
