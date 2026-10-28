"use client";
import { useState } from "react";
import { useAdmin } from "./AdminProvider";
import { activitySeries, countBy } from "../../lib/admin-selectors";
import { STATUSES } from "../../types/admin";
import { StatusBadge } from "./AdminUI";
export function StatusDistribution() {
  const { submissions } = useAdmin();
  const counts = countBy(submissions, "status");
  return (
    <div className="admin-distribution">
      <div className="admin-segment-bar" aria-hidden="true">
        {STATUSES.map((s) => (
          <span
            key={s}
            className={`segment-${s.toLowerCase().replace(" ", "-")}`}
            style={{ flex: counts[s] || 0 }}
          />
        ))}
      </div>
      {STATUSES.map((s) => (
        <div className="admin-distribution-row" key={s}>
          <StatusBadge status={s} />
          <strong>
            {counts[s] || 0}
            <small>
              {Math.round(((counts[s] || 0) / submissions.length) * 100)}%
            </small>
          </strong>
        </div>
      ))}
    </div>
  );
}
export function ActivityChart() {
  const { submissions } = useAdmin();
  const [range, setRange] = useState(14);
  const [selected, setSelected] = useState<string | null>(null);
  const series = activitySeries(submissions).slice(-range);
  const max = Math.max(1, ...series.map((s) => s.count));
  const total = series.reduce((n, s) => n + s.count, 0);
  return (
    <section className="admin-panel admin-activity-chart">
      <div className="admin-panel-heading">
        <div>
          <h2>Submission activity</h2>
          <p>Fictional submissions · October 2026 · UTC</p>
        </div>
        <select
          aria-label="Chart date range"
          value={range}
          onChange={(e) => {
            setRange(Number(e.target.value));
            setSelected(null);
          }}
        >
          <option value={14}>Last 14 days</option>
          <option value={7}>Last 7 days</option>
        </select>
      </div>
      <div className="admin-chart-total">
        <strong>{total}</strong>
        <span>submissions in this period</span>
        <span className="admin-mini-tag">DEMO DATA</span>
      </div>
      <div
        className="admin-bar-chart"
        role="group"
        aria-label="Daily submission counts"
      >
        <div className="admin-chart-grid" aria-hidden="true">
          <span>{max}</span>
          <span>{Math.ceil(max / 2)}</span>
          <span>0</span>
        </div>
        <div className="admin-chart-columns">
          {series.map((s) => (
            <button
              key={s.date}
              className={selected === s.date ? "selected-bar" : ""}
              aria-label={`${s.label}: ${s.count} submissions`}
              aria-pressed={selected === s.date}
              onClick={() => setSelected(s.date)}
            >
              <span className="admin-column-track">
                <span
                  style={{
                    height: `${(s.count / max) * 100}%`,
                    minHeight: s.count ? 4 : 0,
                  }}
                />
              </span>
              <small>{s.label.replace("Oct ", "")}</small>
            </button>
          ))}
        </div>
      </div>
      <div className="admin-chart-caption" aria-live="polite">
        {selected
          ? `${series.find((s) => s.date === selected)?.label}: ${series.find((s) => s.date === selected)?.count} demo submissions`
          : "Select a bar to inspect a day."}
        <span>OCTOBER 2026</span>
      </div>
    </section>
  );
}
export function Breakdown({ field }: { field: "game" | "category" }) {
  const { submissions } = useAdmin();
  const counts = Object.entries(countBy(submissions, field)).sort(
    (a, b) => b[1] - a[1],
  );
  return (
    <div className="admin-breakdown">
      {counts.map(([label, value], i) => (
        <div key={label}>
          <div>
            <span>
              <i style={{ opacity: 1 - i * 0.12 }} />
              {label}
            </span>
            <strong>
              {value}
              <small>{Math.round((value / submissions.length) * 100)}%</small>
            </strong>
          </div>
          <div className="admin-meter">
            <span
              style={{
                width: `${(value / submissions.length) * 100}%`,
                opacity: 1 - i * 0.12,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
