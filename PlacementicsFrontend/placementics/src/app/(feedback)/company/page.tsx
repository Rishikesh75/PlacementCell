import DataTable from "@/presentation/components/ui/DataTable";
import InfoCard from "@/presentation/components/ui/InfoCard";
import PageHeader from "@/presentation/components/ui/PageHeader";
import PageShell from "@/presentation/components/ui/PageShell";
import StatCard from "@/presentation/components/ui/StatCard";

const columns = ["Company", "Experience", "Readiness", "Recommendation", "Date"];
const rows = [
  ["Amazon", "Excellent", "Good", "Increase DSA depth", "12 Jun 2026"],
  ["Cognizant", "Good", "Average", "Improve communication", "09 Jun 2026"],
  ["Oracle", "Good", "Good", "Strong fundamentals", "06 Jun 2026"],
];

export default function FeedbackDisplayPage() {
  return (
    <PageShell>
      <PageHeader
        title="Company Feedback Display"
        subtitle="Consolidated recruiter insights from completed drives."
      />
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Responses Collected" value="52" helper="Current placement cycle" />
        <StatCard label="Average Experience Score" value="4.2 / 5" helper="From recruiter ratings" />
        <StatCard label="Top Improvement Area" value="Communication" helper="Most repeated recommendation" />
      </section>
      <DataTable columns={columns} rows={rows} />
      <InfoCard
        title="Coordinator Note"
        description="Use this section to publish monthly action items based on recurring recruiter feedback trends."
      />
    </PageShell>
  );
}
