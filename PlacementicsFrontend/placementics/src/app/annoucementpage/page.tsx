import InfoCard from "@/presentation/components/ui/InfoCard";
import PageHeader from "@/presentation/components/ui/PageHeader";
import PageShell from "@/presentation/components/ui/PageShell";

const announcements = [
  { title: "Amazon drive shortlist released", date: "13 Jun 2026", tag: "Drive Update" },
  { title: "Resume review window extended", date: "12 Jun 2026", tag: "Important" },
  { title: "Mock interviews this weekend", date: "10 Jun 2026", tag: "Training" },
];

export default function AnnouncementPage() {
  return (
    <PageShell>
      <PageHeader
        title="Announcements"
        subtitle="Latest notifications and placement updates for all stakeholders."
      />
      <section className="grid gap-4 md:grid-cols-3">
        {announcements.map((item) => (
          <InfoCard key={item.title} title={item.title} description={`${item.date} · ${item.tag}`} />
        ))}
      </section>
    </PageShell>
  );
}
