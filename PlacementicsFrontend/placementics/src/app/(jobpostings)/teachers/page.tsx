import Link from "next/link";

import DataTable from "@/presentation/components/ui/DataTable";
import PageHeader from "@/presentation/components/ui/PageHeader";
import PageShell from "@/presentation/components/ui/PageShell";

const columns = ["Company", "Role", "Department", "Posted By", "Status"];
const rows = [
  ["NVIDIA", "AI Engineer", "CSE", "Dr. Kumar", "Active"],
  ["L&T", "Graduate Trainee", "EEE", "Prof. Meera", "Active"],
  ["TCS", "System Engineer", "CSE", "Dr. Raghav", "Closed"],
];

export default function JobPostingByTeachers() {
  return (
    <PageShell>
      <PageHeader
        title="Job Postings by Teachers"
        subtitle="Curated opportunities posted by faculty members."
        actions={
          <Link
            href="/teachers/form"
            className="inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Add New Posting
          </Link>
        }
      />
      <DataTable columns={columns} rows={rows} />
    </PageShell>
  );
}