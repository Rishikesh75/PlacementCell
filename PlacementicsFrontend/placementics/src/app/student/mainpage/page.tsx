"use client";

import Image from "next/image";
import Link from "next/link";

export default function MainPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center gap-12">
      <Link
        href="/student/interview-feedback"
        className="cursor-pointer rounded-lg p-4 transition hover:shadow-lg"
      >
        <Image
          src="/assets/Input.png"
          alt="Submit Feedback"
          width={200}
          height={200}
        />
      </Link>
      <Link
        href="/student/interview-feedback-display"
        className="cursor-pointer rounded-lg p-4 transition hover:shadow-lg"
      >
        <Image
          src="/assets/Display.png"
          alt="View Feedback"
          width={200}
          height={200}
        />
      </Link>
    </div>
  );
}
