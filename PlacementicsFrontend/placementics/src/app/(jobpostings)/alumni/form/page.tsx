import FieldInput from "@/presentation/components/forms/FieldInput";
import FieldSelect from "@/presentation/components/forms/FieldSelect";
import FieldTextarea from "@/presentation/components/forms/FieldTextarea";
import FormActions from "@/presentation/components/forms/FormActions";
import PageHeader from "@/presentation/components/ui/PageHeader";
import PageShell from "@/presentation/components/ui/PageShell";

export default function JobPostingsByAlumniForm() {
  return (
    <PageShell>
      <PageHeader
        title="Alumni Job Posting Form"
        subtitle="Capture referral-based openings and sharing details from alumni."
      />
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <form className="grid gap-4 sm:grid-cols-2">
          <FieldInput id="alumniName" label="Alumni Name" placeholder="Enter alumni full name" />
          <FieldInput id="batch" label="Batch" placeholder="Example: 2020" />
          <FieldInput id="company" label="Company Name" placeholder="Enter company name" />
          <FieldInput id="role" label="Role Title" placeholder="Enter role title" />
          <FieldSelect id="location" label="Work Mode" options={["Onsite", "Remote", "Hybrid"]} />
          <FieldInput id="deadline" label="Application Deadline" type="date" />
          <div className="sm:col-span-2">
            <FieldTextarea id="referral" label="Referral Process" placeholder="Add referral steps and expected timeline." />
          </div>
          <div className="sm:col-span-2">
            <FormActions />
          </div>
        </form>
      </section>
    </PageShell>
  );
}
