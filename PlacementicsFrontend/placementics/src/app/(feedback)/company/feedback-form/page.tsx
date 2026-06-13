import FieldInput from "@/presentation/components/forms/FieldInput";
import FieldSelect from "@/presentation/components/forms/FieldSelect";
import FieldTextarea from "@/presentation/components/forms/FieldTextarea";
import FormActions from "@/presentation/components/forms/FormActions";
import PageHeader from "@/presentation/components/ui/PageHeader";
import PageShell from "@/presentation/components/ui/PageShell";

export default function FeedbackFormPage() {
  return (
    <PageShell>
      <PageHeader
        title="Company Feedback Form"
        subtitle="Capture recruiter feedback about process readiness and candidate quality."
      />
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <form className="grid gap-4 sm:grid-cols-2">
          <FieldInput id="company" label="Company Name" placeholder="Enter company name" />
          <FieldInput id="contact" label="Recruiter Name" placeholder="Enter recruiter name" />
          <FieldSelect id="hiringExperience" label="Hiring Experience" options={["Excellent", "Good", "Average", "Poor"]} />
          <FieldSelect id="candidateReadiness" label="Candidate Readiness" options={["Excellent", "Good", "Average", "Needs Improvement"]} />
          <div className="sm:col-span-2">
            <FieldTextarea id="strengths" label="Strengths Observed" placeholder="Share top strengths noticed in students." />
          </div>
          <div className="sm:col-span-2">
            <FieldTextarea id="improvements" label="Suggestions for Improvement" placeholder="Suggest areas where students can improve." />
          </div>
          <div className="sm:col-span-2">
            <FormActions />
          </div>
        </form>
      </section>
    </PageShell>
  );
}