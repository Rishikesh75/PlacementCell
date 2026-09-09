import LoginPage from "@/features/auth/presentation/LoginPage";

interface PageProps {
  searchParams: Promise<{ collegeId?: string | string[] }>;
}

function firstQueryValue(
  value: string | string[] | undefined,
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function Page({ searchParams }: PageProps) {
  const { collegeId } = await searchParams;
  return <LoginPage collegeId={firstQueryValue(collegeId)} />;
}
