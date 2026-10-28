import { notFound } from "next/navigation";
import { mockSubmissions } from "../../../../lib/mock-admin-data";
import SubmissionDetail from "../../../../components/admin/SubmissionDetail";
export const metadata = { title: "Submission details" };
export function generateStaticParams() {
  return mockSubmissions.map((s) => ({ id: s.id }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!mockSubmissions.some((s) => s.id === id)) notFound();
  return <SubmissionDetail key={id} id={id} />;
}
