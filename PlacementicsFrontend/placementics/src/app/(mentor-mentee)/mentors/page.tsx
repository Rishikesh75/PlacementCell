import PageShell from "@/presentation/components/ui/PageShell";

type InterestedAlumni = {
  id: string;
  name: string;
  domain: string;
  company: string;
  experienceYears: number;
  contactEmail: string;
  availability: string;
};

const interestedAlumni: InterestedAlumni[] = [
  {
    id: "al-001",
    name: "Priya Nair",
    domain: "Product Management",
    company: "Google",
    experienceYears: 6,
    contactEmail: "priya.nair@example.com",
    availability: "Weekdays 6:00 PM - 8:00 PM",
  },
  {
    id: "al-002",
    name: "Rahul Menon",
    domain: "Data Engineering",
    company: "Microsoft",
    experienceYears: 5,
    contactEmail: "rahul.menon@example.com",
    availability: "Saturday 10:00 AM - 1:00 PM",
  },
  {
    id: "al-003",
    name: "Ananya Iyer",
    domain: "Software Development (Backend)",
    company: "Amazon",
    experienceYears: 4,
    contactEmail: "ananya.iyer@example.com",
    availability: "Sunday 4:00 PM - 7:00 PM",
  },
];

export default function MentorsPage() {
  return (
    <PageShell>
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">Interested Alumni Mentors</h1>
        <p className="text-sm text-slate-600">
          Alumni who are interested in guiding students are listed below.
        </p>
      </section>

      {interestedAlumni.length === 0 ? (
        <section className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-sm text-slate-600">No alumni have shown interest yet.</p>
        </section>
      ) : (
        <section className="grid gap-4 md:grid-cols-2">
          {interestedAlumni.map((alumni) => (
            <article key={alumni.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">{alumni.name}</h2>
              <p className="mt-1 text-sm text-indigo-700">{alumni.domain}</p>
              <dl className="mt-4 space-y-2 text-sm text-slate-700">
                <div className="flex justify-between gap-3">
                  <dt className="font-medium text-slate-500">Company</dt>
                  <dd>{alumni.company}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="font-medium text-slate-500">Experience</dt>
                  <dd>{alumni.experienceYears} years</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="font-medium text-slate-500">Email</dt>
                  <dd>{alumni.contactEmail}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="font-medium text-slate-500">Availability</dt>
                  <dd className="text-right">{alumni.availability}</dd>
                </div>
              </dl>
            </article>
          ))}
        </section>
      )}
    </PageShell>
  );
}