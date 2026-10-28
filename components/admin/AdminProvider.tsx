"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import {
  mockSubmissions,
  initialActivity,
  defaultPreferences,
} from "../../lib/mock-admin-data";
import type {
  AdminSubmission,
  AdminActivity,
  AdminPreferences,
} from "../../types/admin";
type Editable = Pick<AdminSubmission, "status" | "notes" | "compilationUrl">;
interface Store {
  submissions: AdminSubmission[];
  activity: AdminActivity[];
  preferences: AdminPreferences;
  updateSubmission: (id: string, patch: Partial<Editable>) => void;
  updatePreferences: (patch: Partial<AdminPreferences>) => void;
  reset: () => void;
}
const AdminContext = createContext<Store | null>(null);
export function AdminProvider({ children }: { children: ReactNode }) {
  const [submissions, setSubmissions] = useState(() =>
    mockSubmissions.map((s) => ({ ...s })),
  );
  const [activity, setActivity] = useState(initialActivity);
  const [preferences, setPreferences] = useState({ ...defaultPreferences });
  function updateSubmission(id: string, patch: Partial<Editable>) {
    const original = submissions.find((s) => s.id === id);
    if (!original) return;
    setSubmissions((items) =>
      items.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    );
    if (patch.status && patch.status !== original.status)
      setActivity((items) =>
        [
          {
            id: crypto.randomUUID(),
            submissionId: id,
            creator: original.creator,
            message: `Status changed from ${original.status} to ${patch.status}`,
            time: "This session",
          },
          ...items,
        ].slice(0, 12),
      );
  }
  function reset() {
    setSubmissions(mockSubmissions.map((s) => ({ ...s })));
    setActivity(initialActivity);
    setPreferences({ ...defaultPreferences });
  }
  return (
    <AdminContext.Provider
      value={{
        submissions,
        activity,
        preferences,
        updateSubmission,
        updatePreferences: (patch) =>
          setPreferences((p) => ({ ...p, ...patch })),
        reset,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
export function useAdmin() {
  const value = useContext(AdminContext);
  if (!value) throw new Error("AdminProvider is required");
  return value;
}
