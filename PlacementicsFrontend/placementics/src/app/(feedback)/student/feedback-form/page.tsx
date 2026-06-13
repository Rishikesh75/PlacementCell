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
        title="Student Feedback Form"
        subtitle="Share interview experience and process quality feedback."
      />
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <form className="grid gap-4 sm:grid-cols-2">
          <FieldInput id="company" label="Company" placeholder="Enter company name" />
          <FieldInput id="role" label="Role" placeholder="Enter applied role" />
          <FieldSelect id="difficulty" label="Interview Difficulty" options={["Easy", "Moderate", "Hard"]} />
          <FieldSelect id="result" label="Result" options={["Selected", "Rejected", "Awaited"]} />
          <div className="sm:col-span-2">
            <FieldTextarea id="questions" label="Questions Asked" placeholder="Mention technical/HR questions asked." />
          </div>
          <div className="sm:col-span-2">
            <FieldTextarea id="tips" label="Tips for Juniors" placeholder="Share useful preparation tips." />
          </div>
          <div className="sm:col-span-2">
            <FormActions />
          </div>
        </form>
      </section>
    </PageShell>
  );
}