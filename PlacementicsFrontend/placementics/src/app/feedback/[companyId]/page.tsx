import CompanyStudentFeedbacksPage from "@/features/feedback/presentation/StudentFeedbacksPage";

interface PageProps {
  params: Promise<{ companyId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { companyId } = await params;
  return <CompanyStudentFeedbacksPage companyId={companyId} />;
}
