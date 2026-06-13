import FieldInput from "@/presentation/components/forms/FieldInput";
import FieldSelect from "@/presentation/components/forms/FieldSelect";
import FieldTextarea from "@/presentation/components/forms/FieldTextarea";
import FormActions from "@/presentation/components/forms/FormActions";
import PageHeader from "@/presentation/components/ui/PageHeader";
import PageShell from "@/presentation/components/ui/PageShell";

export default function JobPostingsByTeachersForm() {
  return (
    <PageShell>
      <PageHeader
        title="Teacher Job Posting Form"
        subtitle="Submit job opportunities sourced through faculty networks."
      />
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <form className="grid gap-4 sm:grid-cols-2">
          <FieldInput id="company" label="Company Name" placeholder="Enter company name" />
          <FieldInput id="role" label="Role Title" placeholder="Enter role title" />
          <FieldInput id="deadline" label="Application Deadline" type="date" />
          <FieldSelect id="type" label="Job Type" options={["Full Time", "Internship", "Intern + FTE"]} />
          <div className="sm:col-span-2">
            <FieldTextarea id="eligibility" label="Eligibility Criteria" placeholder="CGPA, branch, skills, etc." />
          </div>
          <div className="sm:col-span-2">
            <FieldTextarea id="description" label="Role Description" placeholder="Highlight responsibilities and selection stages." />
          </div>
          <div className="sm:col-span-2">
            <FormActions />
          </div>
        </form>
      </section>
    </PageShell>
  );
}
