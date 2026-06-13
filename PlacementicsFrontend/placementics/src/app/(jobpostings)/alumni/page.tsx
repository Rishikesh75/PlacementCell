import Link from "next/link";

import DataTable from "@/presentation/components/ui/DataTable";
import PageHeader from "@/presentation/components/ui/PageHeader";
import PageShell from "@/presentation/components/ui/PageShell";

const columns = ["Company", "Role", "Location", "Alumni Referrer", "Status"];
const rows = [
  ["PayPal", "Backend Engineer", "Bangalore", "Rohit (2019)", "Active"],
  ["Atlassian", "Frontend Engineer", "Remote", "Nitya (2020)", "Active"],
  ["Siemens", "Product Analyst", "Pune", "Shreya (2018)", "Closed"],
];

export default function JobPostingsByAlumni() {
  return (
    <PageShell>
      <PageHeader
        title="Job Postings by Alumni"
        subtitle="Referral and direct opportunities from alumni community."
        actions={
          <Link
            href="/alumni/form"
            className="inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Submit Alumni Posting
          </Link>
        }
      />
      <DataTable columns={columns} rows={rows} />
    </PageShell>
  );
}

