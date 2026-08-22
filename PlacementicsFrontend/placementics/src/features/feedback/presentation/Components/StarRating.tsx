"use client";

import { useState } from "react";

import styles from "../CompanyFeedbackFormPage.module.css";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.5l2.72 6.18 6.78.62-5.12 4.5 1.52 6.7L12 16.9l-5.9 3.6 1.52-6.7-5.12-4.5 6.78-.62L12 2.5z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StarRating({ value, onChange }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;

  return (
    <div
      className={styles.stars}
      role="radiogroup"
      aria-labelledby="rating-label"
      onMouseLeave={() => setHovered(0)}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={styles.star}
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} star${star === 1 ? "" : "s"}`}
          onMouseEnter={() => setHovered(star)}
          onFocus={() => setHovered(star)}
          onBlur={() => setHovered(0)}
          onClick={() => onChange(star)}
        >
          <StarIcon filled={star <= active} />
        </button>
      ))}
    </div>
  );
}
