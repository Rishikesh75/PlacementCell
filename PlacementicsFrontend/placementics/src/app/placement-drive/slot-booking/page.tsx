import FieldInput from "@/presentation/components/forms/FieldInput";
import FieldSelect from "@/presentation/components/forms/FieldSelect";
import FieldTextarea from "@/presentation/components/forms/FieldTextarea";
import FormActions from "@/presentation/components/forms/FormActions";
import InfoCard from "@/presentation/components/ui/InfoCard";
import PageHeader from "@/presentation/components/ui/PageHeader";
import PageShell from "@/presentation/components/ui/PageShell";

export default function PlacementDriveRegistration() {
  return (
    <PageShell>
      <PageHeader
        title="Placement Drive Slot Booking"
        subtitle="Register your company and reserve an interview slot."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <form className="grid gap-4 sm:grid-cols-2">
            <FieldInput id="companyName" label="Company Name" placeholder="Enter company name" />
            <FieldInput id="hrName" label="HR Contact Name" placeholder="Enter HR representative name" />
            <FieldInput id="email" label="Contact Email" type="email" placeholder="hr@company.com" />
            <FieldInput id="date" label="Drive Date" type="date" />
            <FieldSelect id="mode" label="Interview Mode" options={["Online", "Offline", "Hybrid"]} />
            <FieldSelect
              id="slot"
              label="Preferred Slot"
              options={["09:00 - 10:30", "11:00 - 12:30", "14:00 - 15:30", "16:00 - 17:30"]}
            />
            <div className="sm:col-span-2">
              <FieldTextarea id="notes" label="Additional Requirements" placeholder="Panel count, room setup, etc." />
            </div>
            <div className="sm:col-span-2">
              <FormActions />
            </div>
          </form>
        </section>
        <InfoCard
          title="Booking Guidelines"
          description="Slots are confirmed on a first-come-first-served basis. Please submit required job details and JD link after booking."
        />
      </div>
    </PageShell>
  );
}