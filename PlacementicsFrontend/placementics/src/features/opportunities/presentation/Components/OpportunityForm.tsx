"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "../OpportunityFormPage.module.css";

type OpportunitySource = "company" | "institute";
type JobType = "Internship" | "Full Time" | "Intern + PPO";

const JOB_TYPES: JobType[] = ["Internship", "Full Time", "Intern + PPO"];

export default function OpportunityForm() {
  const router = useRouter();
  const [source, setSource] = useState<OpportunitySource>("company");
  const [jobType, setJobType] = useState<JobType>("Internship");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [salary, setSalary] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [institute, setInstitute] = useState("");
  const [stipend, setStipend] = useState("");
  const [requirements, setRequirements] = useState("");

  const isCompany = source === "company";
  const isFullTimeJob = isCompany && jobType === "Full Time";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isCompany) {
      console.log({
        kind: "job",
        jobType,
        title,
        company,
        ...(isFullTimeJob ? { yearsOfExperience } : {}),
        salary,
        jobLink,
        requirements,
      });
    } else {
      console.log({
        kind: "research",
        title,
        institute,
        stipend,
        requirements,
      });
    }

    router.push("/JobopportunitiesBoardPage");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="opportunity-source">Source</label>
        <select
          id="opportunity-source"
          className={styles.underlineSelect}
          value={source}
          onChange={(event) =>
            setSource(event.target.value as OpportunitySource)
          }
          required
        >
          <option value="company">Company — job opening</option>
          <option value="institute">Institute — research opening</option>
        </select>
      </div>

      {isCompany ? (
        <>
          <div className={styles.field}>
            <label htmlFor="opportunity-job-type">Job type</label>
            <select
              id="opportunity-job-type"
              className={styles.underlineSelect}
              value={jobType}
              onChange={(event) => setJobType(event.target.value as JobType)}
              required
            >
              {JOB_TYPES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="opportunity-title">Job title</label>
            <input
              id="opportunity-title"
              className={styles.underlineInput}
              type="text"
              placeholder="e.g. SDE II — Backend"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="opportunity-company">Company</label>
            <input
              id="opportunity-company"
              className={styles.underlineInput}
              type="text"
              placeholder="e.g. Razorpay"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              required
            />
          </div>

          {isFullTimeJob ? (
            <div className={styles.field}>
              <label htmlFor="opportunity-yoe">Years of experience</label>
              <input
                id="opportunity-yoe"
                className={styles.underlineInput}
                type="text"
                placeholder="e.g. 2–4 years"
                value={yearsOfExperience}
                onChange={(event) => setYearsOfExperience(event.target.value)}
                required
              />
            </div>
          ) : null}

          <div className={styles.field}>
            <label htmlFor="opportunity-salary">Salary</label>
            <input
              id="opportunity-salary"
              className={styles.underlineInput}
              type="text"
              placeholder="e.g. ₹12–16L or ₹40k/month"
              value={salary}
              onChange={(event) => setSalary(event.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="opportunity-job-link">Link to job</label>
            <input
              id="opportunity-job-link"
              className={styles.underlineInput}
              type="url"
              placeholder="e.g. https://company.com/careers/role"
              value={jobLink}
              onChange={(event) => setJobLink(event.target.value)}
            />
          </div>
        </>
      ) : (
        <>
          <div className={styles.field}>
            <label htmlFor="opportunity-title">Research title</label>
            <input
              id="opportunity-title"
              className={styles.underlineInput}
              type="text"
              placeholder="e.g. ML for Structural Health Monitoring"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="opportunity-institute">Institute</label>
            <input
              id="opportunity-institute"
              className={styles.underlineInput}
              type="text"
              placeholder="e.g. Dept. of Civil Engineering"
              value={institute}
              onChange={(event) => setInstitute(event.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="opportunity-stipend">Stipend</label>
            <input
              id="opportunity-stipend"
              className={styles.underlineInput}
              type="text"
              placeholder="e.g. ₹35k/month"
              value={stipend}
              onChange={(event) => setStipend(event.target.value)}
            />
          </div>
        </>
      )}

      <div className={styles.field}>
        <label htmlFor="opportunity-requirements">Requirements</label>
        <textarea
          id="opportunity-requirements"
          className={styles.textarea}
          placeholder={
            isCompany
              ? "Skills, experience, eligibility, and who should apply..."
              : "Background needed, duration, and who should apply..."
          }
          value={requirements}
          onChange={(event) => setRequirements(event.target.value)}
          required
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Publish to opportunities board
      </button>
    </form>
  );
}
