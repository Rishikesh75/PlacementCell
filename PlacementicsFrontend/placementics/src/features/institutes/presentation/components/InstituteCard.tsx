"use client";

import { useRouter } from "next/navigation";

import { collegeAuthHref } from "@/features/auth/application/collegeAuthHref";
import { type College } from "@/features/institutes/domain/types";
import { collegeInitials } from "@/features/institutes/infrastructure/collegesApi";

interface InstituteCardProps {
  college: College;
}

export default function InstituteCard({
  college,
}: InstituteCardProps) {
  const router = useRouter();

  return (
    <article className="institute-card">
      <div className="institute-logo">
        {college.imageUrl ? (
          // Native img: college logos are hosted on R2, not the Next image optimizer.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={college.imageUrl}
            alt=""
            className="institute-logo-image"
          />
        ) : (
          collegeInitials(college.name)
        )}
      </div>

      <div className="institute-info">
        <h2>{college.name}</h2>

        {college.address ? (
          <p className="location">
            {college.address}
          </p>
        ) : null}
      </div>

      <button
        className="select-button"
        onClick={() =>
          router.push(collegeAuthHref("/loginPage", college.id))
        }
      >
        Select institute
        <span>→</span>
      </button>
    </article>
  );
}
