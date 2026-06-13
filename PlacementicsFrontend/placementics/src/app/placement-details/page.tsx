import DataTable from "@/presentation/components/ui/DataTable";
import InfoCard from "@/presentation/components/ui/InfoCard";
import PageHeader from "@/presentation/components/ui/PageHeader";
import PageShell from "@/presentation/components/ui/PageShell";
import StatCard from "@/presentation/components/ui/StatCard";

const columns = ["Company", "Role", "Eligibility", "CTC", "Date"];
const rows = [
  ["Microsoft", "SDE Intern", "7.5 CGPA+", "20 LPA", "18 Jun 2026"],
  ["Zoho", "Developer", "No arrears", "12 LPA", "20 Jun 2026"],
  ["Deloitte", "Analyst", "6.5 CGPA+", "8 LPA", "22 Jun 2026"],
];

export default function PlacementDetailsPage() {
  return (
    <PageShell>
      <PageHeader title="Placement Details" subtitle="Overview of metrics, eligibility, and upcoming drives." />
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Registered Students" value="428" helper="Current final year count" />
        <StatCard label="Placed Students" value="271" helper="Placement season 2025-26" />
        <StatCard label="Highest Package" value="42 LPA" helper="International + domestic" />
        <StatCard label="Average Package" value="11.8 LPA" helper="Across all offers" />
      </section>
      <DataTable columns={columns} rows={rows} />
      <InfoCard
        title="Eligibility Rules"
        description="Students must maintain minimum CGPA, satisfy company constraints, and complete profile verification before drive registration."
      />
    </PageShell>
  );
}
