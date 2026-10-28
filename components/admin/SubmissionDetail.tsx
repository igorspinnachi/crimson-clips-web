"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Film, Mail, FileVideo, Info } from "lucide-react";
import { useAdmin } from "./AdminProvider";
import { PageHeading, StatusBadge, ConfirmButton, formatDate } from "./AdminUI";
import { validCompilationUrl } from "../../lib/admin-selectors";
import type { SubmissionStatus } from "../../types/admin";
const actions: { label: string; status: SubmissionStatus }[] = [
  { label: "Mark Under Review", status: "Under Review" },
  { label: "Select Clip", status: "Selected" },
  { label: "Reject Clip", status: "Rejected" },
  { label: "Mark Published", status: "Published" },
];
export default function SubmissionDetail({ id }: { id: string }) {
  const { submissions, updateSubmission } = useAdmin();
  const s = submissions.find((item) => item.id === id);
  const [message, setMessage] = useState("");
  if (!s)
    return (
      <div className="admin-empty">
        <h1>Submission not found</h1>
        <p>This ID is not in the fictional dataset.</p>
        <Link className="admin-button" href="/admin/submissions">
          Back to submissions
        </Link>
      </div>
    );
  function moderate(status: SubmissionStatus) {
    updateSubmission(id, { status });
    setMessage(`Status changed to ${status} in this demo session only.`);
  }
  const validUrl = validCompilationUrl(s.compilationUrl);
  return (
    <>
      <Link className="admin-back" href="/admin/submissions">
        <ArrowLeft size={15} />
        Back to submissions
      </Link>
      <PageHeading
        eyebrow={`SUBMISSION / ${s.id}`}
        title={`${s.creator}’s moment`}
        description={`${s.game} · ${s.category} · Submitted ${formatDate(s.submittedAt)}`}
        action={<StatusBadge status={s.status} />}
      />
      <div className="admin-detail-grid">
        <div className="admin-detail-main">
          <section
            className="admin-video-placeholder"
            aria-label="Video preview placeholder"
          >
            <span className="admin-video-label">
              <i />
              PREVIEW NOT CONNECTED
            </span>
            <span className="admin-video-icon">
              <Film size={40} strokeWidth={1} />
            </span>
            <h2>The moment is waiting.</h2>
            <p>Video preview will be available after storage integration.</p>
            <div>
              <FileVideo size={16} />
              {s.format} · {s.sizeMB.toFixed(1)} MB · Mock file
            </div>
          </section>
          <section className="admin-panel admin-padded">
            <div className="admin-panel-heading">
              <h2>Behind the moment</h2>
              <span className="admin-mini-tag">FICTIONAL SUBMISSION</span>
            </div>
            <p className="admin-description">{s.description}</p>
            <dl className="admin-metadata">
              <div>
                <dt>Game</dt>
                <dd>{s.game}</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{s.category}</dd>
              </div>
              <div>
                <dt>Original filename</dt>
                <dd>{s.filename}</dd>
              </div>
              <div>
                <dt>Size / format</dt>
                <dd>
                  {s.sizeMB.toFixed(1)} MB / {s.format}
                </dd>
              </div>
              <div>
                <dt>Submission date (UTC)</dt>
                <dd>
                  {formatDate(s.submittedAt)} · {s.submittedAt.slice(11, 16)}
                </dd>
              </div>
              <div>
                <dt>Submission ID</dt>
                <dd>{s.id}</dd>
              </div>
            </dl>
          </section>
          <section className="admin-panel admin-padded">
            <h2>Internal notes</h2>
            <p className="admin-help">
              For the editorial team. Edits stay in React state until the page
              reloads.
            </p>
            <label className="admin-field">
              <span className="admin-sr-only">Internal notes</span>
              <textarea
                maxLength={3000}
                rows={5}
                value={s.notes}
                onChange={(e) =>
                  updateSubmission(id, { notes: e.target.value })
                }
                placeholder="Add a cut suggestion, timestamp or review note…"
              />
            </label>
            <div className="admin-field-caption">
              <span>Temporary session notes · No database</span>
              <span>{s.notes.length}/3000</span>
            </div>
          </section>
        </div>
        <aside className="admin-detail-aside">
          <section className="admin-panel admin-padded">
            <p className="admin-eyebrow">CREATOR PROFILE</p>
            <div className="admin-creator-profile">
              <span className="admin-avatar">
                {s.creator.slice(0, 2).toUpperCase()}
              </span>
              <div>
                <h2>{s.creator}</h2>
                <small>Fictional creator</small>
              </div>
            </div>
            <div className="admin-contact-line">
              <Mail size={16} />
              <span>{s.email}</span>
            </div>
            <label className="admin-field">
              Social profile · placeholder
              <input value={s.social} readOnly />
            </label>
            <p className="admin-help">
              example.com and email addresses are fictional placeholders.
            </p>
          </section>
          <section className="admin-panel admin-padded">
            <div className="admin-panel-heading">
              <h2>Moderation desk</h2>
            </div>
            <p className="admin-help">
              Update this clip’s status throughout the demo dashboard.
            </p>
            <div className="admin-moderation">
              {actions.map((a) => (
                <ConfirmButton
                  key={a.status}
                  label={a.label}
                  title={`${a.label}?`}
                  description={`This changes ${id} to ${a.status} only in the current preview. Nothing is uploaded, published to YouTube, or saved to a database.`}
                  disabled={s.status === a.status}
                  className={`admin-button ${a.status === "Rejected" ? "danger" : "secondary"}`}
                  onConfirm={() => moderate(a.status)}
                />
              ))}
            </div>
            <p className="admin-feedback" role="status">
              {message}
            </p>
          </section>
          <section className="admin-panel admin-padded">
            <h2>Compilation link</h2>
            <p className="admin-help">
              UI placeholder. No YouTube connection or publication occurs.
            </p>
            <label className="admin-field">
              YouTube compilation URL
              <input
                type="url"
                value={s.compilationUrl}
                aria-invalid={!validUrl}
                aria-describedby="compilation-help"
                onChange={(e) =>
                  updateSubmission(id, { compilationUrl: e.target.value })
                }
                placeholder="https://www.youtube.com/watch?v=…"
              />
            </label>
            <p
              id="compilation-help"
              className={validUrl ? "admin-help" : "admin-error"}
            >
              {validUrl
                ? "Temporary value, kept only in this demo session."
                : "Use an HTTPS youtube.com or youtu.be URL, or leave this blank."}
            </p>
            <div className="admin-inline-note">
              <Info size={15} />
              <span>Status changes do not publish videos.</span>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
