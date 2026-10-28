export const STATUSES = [
  "Pending",
  "Under Review",
  "Selected",
  "Rejected",
  "Published",
] as const;
export type SubmissionStatus = (typeof STATUSES)[number];
export interface AdminSubmission {
  id: string;
  creator: string;
  email: string;
  game: string;
  category: string;
  submittedAt: string;
  description: string;
  social: string;
  filename: string;
  sizeMB: number;
  format: "MP4" | "MOV" | "WebM";
  status: SubmissionStatus;
  notes: string;
  compilationUrl: string;
}
export interface AdminActivity {
  id: string;
  submissionId: string;
  creator: string;
  message: string;
  time: string;
}
export interface AdminPreferences {
  displayName: string;
  emailAlerts: boolean;
  weeklyDigest: boolean;
  compactRows: boolean;
  defaultPageSize: number;
}
export interface AdminFilters {
  search: string;
  game: string;
  category: string;
  status: string;
  sort: "newest" | "oldest" | "creator" | "status";
}
