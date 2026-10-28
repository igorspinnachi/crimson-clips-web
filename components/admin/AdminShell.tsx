"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Clapperboard,
  ChartNoAxesCombined,
  Settings,
  ArrowUpRight,
  Menu,
  X,
  FlaskConical,
  ChevronRight,
  CircleHelp,
} from "lucide-react";
import { useAdmin } from "./AdminProvider";
const navigation = [
  { label: "Overview", href: "/admin", Icon: LayoutDashboard },
  { label: "Submissions", href: "/admin/submissions", Icon: Clapperboard },
  { label: "Analytics", href: "/admin/analytics", Icon: ChartNoAxesCombined },
  { label: "Settings", href: "/admin/settings", Icon: Settings },
];
export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { submissions, preferences } = useAdmin();
  const active = navigation.find((n) =>
    n.href === "/admin" ? pathname === n.href : pathname.startsWith(n.href),
  );
  return (
    <div
      className={`cc-admin ${preferences.compactRows ? "admin-compact" : ""}`}
    >
      <aside className="admin-sidebar">
        <Link
          href="/admin"
          className="admin-brand"
          aria-label="Crimson Clips admin overview"
        >
          CRIMSON<span>CLIPS</span>
          <small>EDITORIAL / ADMIN PANEL</small>
        </Link>
        <span className="admin-nav-label">WORKSPACE</span>
        <nav aria-label="Admin navigation">
          {navigation.map(({ label, href, Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={active?.href === href ? "page" : undefined}
            >
              <Icon size={19} />
              {label}
              {label === "Submissions" && <small>{submissions.length}</small>}
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <div className="admin-demo-card">
            <FlaskConical size={19} />
            <strong>A space to experiment.</strong>
            <p>
              Fictional clips. Real interactions.
              <br />
              Changes reset on reload.
            </p>
            <span>DEVELOPMENT PREVIEW</span>
          </div>
          <Link className="admin-site-link" href="/">
            Visit public website
            <ArrowUpRight size={16} />
          </Link>
          <div className="admin-profile">
            <span className="admin-avatar">DA</span>
            <div>
              <strong>{preferences.displayName || "Demo Administrator"}</strong>
              <small>Placeholder profile</small>
            </div>
          </div>
        </div>
      </aside>
      <div className="admin-workspace">
        <header className="admin-header">
          <div className="admin-breadcrumb">
            <span>Workspace</span>
            <ChevronRight size={14} />
            <strong>{active?.label || "Submission"}</strong>
          </div>
          <div className="admin-header-right">
            <span className="admin-demo-tag">
              <i /> DEMO DATA
            </span>
            <span
              className="admin-avatar small-avatar"
              aria-label="Demo administrator"
            >
              DA
            </span>
            <button
              className="admin-menu"
              aria-expanded={open}
              aria-controls="admin-mobile-nav"
              aria-label={
                open ? "Close admin navigation" : "Open admin navigation"
              }
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </header>
        <nav
          className="admin-mobile-nav"
          id="admin-mobile-nav"
          hidden={!open}
          aria-label="Mobile admin navigation"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              document.querySelector<HTMLButtonElement>(".admin-menu")?.focus();
            }
          }}
        >
          {navigation.map(({ label, href, Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={active?.href === href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
          <Link href="/">
            Public website
            <ArrowUpRight size={16} />
          </Link>
        </nav>
        <div className="admin-warning">
          <CircleHelp size={15} />
          <span>
            Development preview · No authentication. All data is fictional and
            changes are temporary.
          </span>
        </div>
        <main id="main" className="admin-main">
          {children}
        </main>
        <footer className="admin-footer">
          <span>
            CRIMSON CLIPS <i>/</i> EDITORIAL WORKSPACE
          </span>
          <span>Frontend preview · No connected services</span>
        </footer>
      </div>
    </div>
  );
}
