"use client";
import { TrendingUp, CalendarDays, Gamepad2 } from "lucide-react";
import { PageHeading, StatsCard } from "./AdminUI";
import {
  ActivityChart,
  Breakdown,
  StatusDistribution,
} from "./AnalyticsCharts";
import { useAdmin } from "./AdminProvider";
import { activitySeries } from "../../lib/admin-selectors";
export default function AnalyticsPage() {
  const { submissions } = useAdmin();
  const series = activitySeries(submissions);
  const current = series.slice(-7).reduce((n, s) => n + s.count, 0);
  const previous = series.slice(0, 7).reduce((n, s) => n + s.count, 0);
  const delta = previous
    ? Math.round(((current - previous) / previous) * 100)
    : null;
  return (
    <>
      <PageHeading
        eyebrow="A CLOSER LOOK AT THE COMMUNITY"
        title="The story in the numbers."
        description="Illustrative analytics derived from the same fictional submission dataset."
        action={
          <span className="admin-count-pill">
            <CalendarDays size={15} />
            15–28 Oct 2026 · Demo
          </span>
        }
      />
      <div className="admin-stats three-stats">
        <StatsCard
          label="Submissions this week"
          value={current}
          detail="22–28 Oct · Fictional dataset"
          icon={<CalendarDays size={20} />}
        />
        <StatsCard
          label="Weekly submission trend"
          value={delta === null ? "—" : `${delta >= 0 ? "+" : ""}${delta}%`}
          detail={`${previous} → ${current} vs. the preceding 7 days`}
          icon={<TrendingUp size={20} />}
        />
        <StatsCard
          label="Games represented"
          value={new Set(submissions.map((s) => s.game)).size}
          detail="Across all demo submissions"
          icon={<Gamepad2 size={20} />}
        />
      </div>
      <ActivityChart />
      <div className="admin-two-column">
        <section className="admin-panel">
          <div className="admin-panel-heading">
            <h2>Clips by game</h2>
            <span className="admin-mini-tag">DEMO DATA</span>
          </div>
          <Breakdown field="game" />
        </section>
        <section className="admin-panel">
          <div className="admin-panel-heading">
            <h2>Clips by category</h2>
            <span className="admin-mini-tag">DEMO DATA</span>
          </div>
          <Breakdown field="category" />
        </section>
      </div>
      <div className="admin-two-column">
        <section className="admin-panel">
          <div className="admin-panel-heading">
            <h2>Status distribution</h2>
            <span className="admin-mini-tag">CURRENT DEMO STATE</span>
          </div>
          <StatusDistribution />
        </section>
        <section className="admin-panel admin-padded admin-insight">
          <p className="admin-eyebrow">EDITORIAL SNAPSHOT</p>
          <h2>
            From raw clips
            <br />
            to the shortlist.
          </h2>
          <strong>
            {Math.round(
              (submissions.filter(
                (s) => s.status === "Selected" || s.status === "Published",
              ).length /
                submissions.length) *
                100,
            )}
            %
          </strong>
          <p>
            of fictional submissions currently have Selected or Published
            status.
          </p>
          <small>
            This reflects the present demo state, not historical conversion or
            real performance. Changing clip statuses updates this snapshot.
          </small>
        </section>
      </div>
    </>
  );
}
