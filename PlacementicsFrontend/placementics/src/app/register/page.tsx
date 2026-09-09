import RegisterPage from "@/features/auth/presentation/RegisterPage";

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
  return <RegisterPage collegeId={firstQueryValue(collegeId)} />;
}
