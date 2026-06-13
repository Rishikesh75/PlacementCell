import DataTable from "@/presentation/components/ui/DataTable";
import PageHeader from "@/presentation/components/ui/PageHeader";
import PageShell from "@/presentation/components/ui/PageShell";
import StatCard from "@/presentation/components/ui/StatCard";

const columns = ["Company", "Role", "Difficulty", "Result", "Submitted On"];
const rows = [
  ["Amazon", "SDE Intern", "Hard", "Selected", "11 Jun 2026"],
  ["Zoho", "Developer", "Moderate", "Selected", "09 Jun 2026"],
  ["Deloitte", "Analyst", "Moderate", "Rejected", "07 Jun 2026"],
];

export default function FeedbackDisplayPage() {
  return (
    <PageShell>
      <PageHeader
        title="Student Feedback Display"
        subtitle="Review submitted interview experiences from students."
      />
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Total Entries" value="138" helper="Current semester" />
        <StatCard label="Selection Rate (reported)" value="58%" helper="Based on submitted responses" />
        <StatCard label="Most Common Difficulty" value="Moderate" helper="Across top recruiters" />
      </section>
      <DataTable columns={columns} rows={rows} />
    </PageShell>
  );
}
