import PageShell from "@/presentation/components/ui/PageShell";

type MeetingStatus = "scheduled" | "completed" | "cancelled";
type MeetingMode = "online" | "offline";

type ScheduledMeeting = {
  id: string;
  mentorName: string;
  studentName: string;
  topic: string;
  dateTime: string;
  mode: MeetingMode;
  locationOrLink: string;
  status: MeetingStatus;
  ownerUserId: string;
};

const mockScheduledMeetings: ScheduledMeeting[] = [
  {
    id: "mtg-001",
    mentorName: "Priya Nair",
    studentName: "Karthik S",
    topic: "Resume and Interview Strategy",
    dateTime: "2026-06-15T18:00:00",
    mode: "online",
    locationOrLink: "https://meet.example.com/mentor-001",
    status: "scheduled",
    ownerUserId: "student-001",
  },
  {
    id: "mtg-002",
    mentorName: "Rahul Menon",
    studentName: "Karthik S",
    topic: "Data Engineering Career Roadmap",
    dateTime: "2026-06-10T11:00:00",
    mode: "offline",
    locationOrLink: "Placement Cell, Block A",
    status: "completed",
    ownerUserId: "student-001",
  },
  {
    id: "mtg-003",
    mentorName: "Ananya Iyer",
    studentName: "Aditi R",
    topic: "Backend Project Planning",
    dateTime: "2026-06-16T17:30:00",
    mode: "online",
    locationOrLink: "https://meet.example.com/mentor-003",
    status: "scheduled",
    ownerUserId: "student-002",
  },
];

const currentUserId = "student-001";

const statusStyles: Record<MeetingStatus, string> = {
  scheduled: "bg-amber-100 text-amber-800",
  completed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-rose-100 text-rose-800",
};

function formatMeetingDate(dateTime: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateTime));
}

export default function ScheduledMeetingPage() {
  // Replace this mock user id with authenticated user id from session/auth context.
  const currentUserMeetings = mockScheduledMeetings.filter(
    (meeting) => meeting.ownerUserId === currentUserId
  );

  return (
    <PageShell>
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">Scheduled Meetings</h1>
        <p className="text-sm text-slate-600">Meetings scheduled for the currently signed-in user.</p>
      </section>

      {currentUserMeetings.length === 0 ? (
        <section className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-sm text-slate-600">No meetings are scheduled for your account.</p>
        </section>
      ) : (
        <section className="space-y-4">
          {currentUserMeetings.map((meeting) => (
            <article key={meeting.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{meeting.topic}</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Mentor: {meeting.mentorName} | Student: {meeting.studentName}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${statusStyles[meeting.status]}`}
                >
                  {meeting.status}
                </span>
              </div>

              <dl className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                <div>
                  <dt className="font-medium text-slate-500">Date & Time</dt>
                  <dd>{formatMeetingDate(meeting.dateTime)}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-500">Mode</dt>
                  <dd className="capitalize">{meeting.mode}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-medium text-slate-500">
                    {meeting.mode === "online" ? "Meeting Link" : "Venue"}
                  </dt>
                  <dd className="break-all">{meeting.locationOrLink}</dd>
                </div>
              </dl>
            </article>
          ))}
        </section>
      )}
    </PageShell>
  );
}