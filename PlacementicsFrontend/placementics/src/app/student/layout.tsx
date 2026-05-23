"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/student/login";

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/student/login");
    router.refresh();
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200 bg-white px-6 py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/student/mainpage" className="text-lg font-semibold">
            Placementics
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/student/mainpage" className="hover:text-blue-600">
              Home
            </Link>
            <Link
              href="/student/interview-feedback"
              className="hover:text-blue-600"
            >
              Submit Feedback
            </Link>
            <Link
              href="/student/interview-feedback-display"
              className="hover:text-blue-600"
            >
              View Feedback
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-50"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl flex-1 p-6">{children}</main>
    </div>
  );
}
