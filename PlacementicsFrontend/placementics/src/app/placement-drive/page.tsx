import Link from "next/link";

import DataTable from "@/presentation/components/ui/DataTable";
import PageHeader from "@/presentation/components/ui/PageHeader";
import PageShell from "@/presentation/components/ui/PageShell";
import StatCard from "@/presentation/components/ui/StatCard";

const columns = ["Slot", "Company", "Mode", "Status"];
const rows = [
  ["09:00 - 10:30", "Amazon", "Online", "Booked"],
  ["11:00 - 12:30", "Freshworks", "Offline", "Available"],
  ["14:00 - 15:30", "SAP", "Online", "Booked"],
  ["16:00 - 17:30", "Thoughtworks", "Offline", "Available"],
];

export default function PlacementDrivePage() {
  return (
    <PageShell>
      <PageHeader
        title="Placement Drive"
        subtitle="Track available and booked interview slots for company drives."
        actions={
          <Link
            href="/placement-drive/slot-booking"
            className="inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Book a Slot
          </Link>
        }
      />
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Total Slots" value="24" helper="Current drive cycle" />
        <StatCard label="Booked" value="15" helper="62.5% occupancy" />
        <StatCard label="Available" value="9" helper="Open for booking" />
      </section>
      <DataTable columns={columns} rows={rows} />
    </PageShell>
  );
}