export type Submission = {
  creator: string;
  email: string;
  game: string;
  category: string;
  notes: string;
  social: string;
  permission: boolean;
  file: File;
};
// Implement with a server-issued signed object-storage URL. Never send storage credentials to the browser.
export interface SubmissionTransport {
  upload(
    submission: Submission,
    onProgress: (percent: number) => void,
    signal: AbortSignal,
  ): Promise<{ submissionId: string }>;
}
