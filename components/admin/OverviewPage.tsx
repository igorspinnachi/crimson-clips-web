"use client";
import Link from "next/link";
import {
  ArrowUpRight,
  Clapperboard,
  Clock3,
  Star,
  CircleCheck,
  Activity,
} from "lucide-react";
import { useAdmin } from "./AdminProvider";
import { PageHeading, StatsCard } from "./AdminUI";
import { StatusDistribution } from "./AnalyticsCharts";
import SubmissionTable from "./SubmissionTable";
import { countBy } from "../../lib/admin-selectors";
export default function OverviewPage() {
  const { submissions, activity } = useAdmin();
  const counts = countBy(submissions, "status");
  return (
    <>
      <PageHeading
        eyebrow="WELCOME TO THE CUTTING ROOM"
        title="Great moments. Bigger stories."
        description="Your editorial workspace, from the first review to the final cut."
        action={
          <Link className="admin-button" href="/admin/submissions">
            Review submissions
            <ArrowUpRight size={17} />
          </Link>
        }
      />
      <div className="admin-stats">
        <StatsCard
          label="Total submissions"
          value={submissions.length}
          detail="All fictional submissions"
          icon={<Clapperboard size={20} />}
        />
        <StatsCard
          label="Pending review"
          value={counts.Pending || 0}
          detail="Waiting for a first look"
          icon={<Clock3 size={20} />}
        />
        <StatsCard
          label="Selected clips"
          value={counts.Selected || 0}
          detail="On the editorial shortlist"
          icon={<Star size={20} />}
        />
        <StatsCard
          label="Published clips"
          value={counts.Published || 0}
          detail="Demo publication status"
          icon={<CircleCheck size={20} />}
        />
      </div>
      <section className="admin-spotlight">
        <div>
          <span className="admin-eyebrow">
            THE NEXT COMPILATION STARTS WITH YOU
          </span>
          <h2>
            A little chaos.
            <br />A legendary edit.
          </h2>
          <p>{counts.Pending || 0} moments are waiting in your demo queue.</p>
          <Link href="/admin/submissions" className="admin-text-link">
            Find the next highlight <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="admin-spotlight-art" aria-hidden="true">
          <span>CC</span>
          <Clapperboard size={100} strokeWidth={0.8} />
        </div>
      </section>
      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <h2>Fresh off the feed</h2>
            <p>The six most recent fictional submissions</p>
          </div>
          <Link className="admin-text-link" href="/admin/submissions">
            View all
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <SubmissionTable
          items={[...submissions]
            .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
            .slice(0, 6)}
        />
      </section>
      <div className="admin-two-column">
        <section className="admin-panel">
          <div className="admin-panel-heading">
            <h2>The review pipeline</h2>
            <span className="admin-mini-tag">LIVE DEMO STATE</span>
          </div>
          <StatusDistribution />
        </section>
        <section className="admin-panel">
          <div className="admin-panel-heading">
            <h2>Editorial activity</h2>
            <Activity size={18} />
          </div>
          <div className="admin-activity-list">
            {activity.slice(0, 5).map((a) => (
              <Link href={`/admin/submissions/${a.submissionId}`} key={a.id}>
                <span className="admin-activity-dot" />
                <div>
                  <strong>{a.creator}</strong>
                  <p>{a.message}</p>
                  <small>
                    {a.submissionId} · {a.time}
                  </small>
                </div>
                <ArrowUpRight size={14} />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
