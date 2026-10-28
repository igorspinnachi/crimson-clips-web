import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminProvider } from "../../components/admin/AdminProvider";
import AdminShell from "../../components/admin/AdminShell";
import "./admin.css";
export const metadata: Metadata = {
  title: {
    default: "Overview — Crimson Clips Admin",
    template: "%s — Crimson Clips Admin",
  },
  robots: { index: false, follow: false },
  description:
    "Unprotected development preview with fictional data. Not a production administration system.",
};
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <Suspense
        fallback={
          <div className="cc-admin admin-loading">
            Loading development preview…
          </div>
        }
      >
        <AdminShell>{children}</AdminShell>
      </Suspense>
    </AdminProvider>
  );
}
