"use client";

import { FormEvent, useState } from "react";

import styles from "../OpportunityFormPage.module.css";

const OPPORTUNITY_TYPES = [
  "Job opening",
  "Internship",
  "Research / lab",
  "Referral",
];

export default function OpportunityForm() {
  const [type, setType] = useState("Job opening");
  const [title, setTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log({
      type,
      title,
      organization,
      location,
      description,
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="opportunity-type">Type</label>
        <select
          id="opportunity-type"
          className={styles.underlineSelect}
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          {OPPORTUNITY_TYPES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="opportunity-title">Title</label>
        <input
          id="opportunity-title"
          className={styles.underlineInput}
          type="text"
          placeholder="e.g. SDE II — Backend"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="opportunity-organization">Organization / lab</label>
        <input
          id="opportunity-organization"
          className={styles.underlineInput}
          type="text"
          placeholder="e.g. Razorpay, or Dept. of Civil Engineering"
          value={organization}
          onChange={(event) => setOrganization(event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="opportunity-location">
          Location & package (if applicable)
        </label>
        <input
          id="opportunity-location"
          className={styles.underlineInput}
          type="text"
          placeholder="e.g. Bengaluru · ₹28–32L"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="opportunity-description">Description</label>
        <textarea
          id="opportunity-description"
          className={styles.textarea}
          placeholder="What's the role, who should apply, how to reach you..."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Publish to opportunities board
      </button>
    </form>
  );
}
