"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import StarRating from "./StarRating";
import styles from "../CompanyFeedbackFormPage.module.css";

export default function CompanyFeedbackForm() {
  const router = useRouter();
  const [company, setCompany] = useState("");
  const [roleOffered, setRoleOffered] = useState("");
  const [rounds, setRounds] = useState("");
  const [rating, setRating] = useState(4);
  const [experience, setExperience] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log({
      company,
      roleOffered,
      rounds: Number(rounds),
      rating,
      experience,
    });

    router.push("/feedbackOnCompanyInterviewPage");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          placeholder="e.g. Goldman Sachs"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="roleOffered">Role offered</label>
        <input
          id="roleOffered"
          type="text"
          placeholder="e.g. Technology Analyst"
          value={roleOffered}
          onChange={(event) => setRoleOffered(event.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="rounds">Number of rounds</label>
        <input
          id="rounds"
          type="text"
          inputMode="numeric"
          placeholder="e.g. 4"
          value={rounds}
          onChange={(event) => setRounds(event.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label id="rating-label">Overall rating</label>
        <StarRating value={rating} onChange={setRating} />
      </div>

      <div className={styles.field}>
        <label htmlFor="experience">Your experience</label>
        <textarea
          id="experience"
          className={styles.textarea}
          placeholder="What each round covered, question types, what helped you prepare..."
          value={experience}
          onChange={(event) => setExperience(event.target.value)}
          required
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Submit feedback
      </button>
    </form>
  );
}
