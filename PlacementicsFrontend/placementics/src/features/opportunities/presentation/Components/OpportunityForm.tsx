"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "../OpportunityFormPage.module.css";
import { getCurrentUser } from "@/features/auth/application/session";
import { createPlacementOpportunity, getOpportunityCompanies, type CollegeCompanyOption } from "@/features/opportunities/infrastructure/opportunityApi";

type OpportunitySource = "company" | "institute";
type JobType = "Internship" | "Full Time" | "Intern + PPO";

const JOB_TYPES: JobType[] = ["Internship", "Full Time", "Intern + PPO"];

export default function OpportunityForm() {
  const router = useRouter();
  const [source, setSource] = useState<OpportunitySource>("company");
  const [jobType, setJobType] = useState<JobType>("Internship");
  const [title, setTitle] = useState("");
  const [companies, setCompanies] = useState<CollegeCompanyOption[]>([]);
  const [collegeCompanyId, setCollegeCompanyId] = useState("");
  const [salary, setSalary] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [institute, setInstitute] = useState("");
  const [stipend, setStipend] = useState("");
  const [requirements, setRequirements] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isCompany = source === "company";
  const isFullTimeJob = isCompany && jobType === "Full Time";

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      getOpportunityCompanies(user.collegeId)
        .then(setCompanies)
        .catch((cause) => setError(cause instanceof Error ? cause.message : "Could not load companies."));
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const user = getCurrentUser();
    if (!user || !["Alumni", "Teacher"].includes(user.role)) {
      setError("Only a teacher or alumni account can submit opportunities.");
      return;
    }
    if (!collegeCompanyId) {
      setError("Select a company relationship before submitting.");
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      await createPlacementOpportunity({
        collegeCompanyId,
        role: title,
        eligibility: requirements,
        ...(user.role === "Alumni" ? { alumniId: user.userId } : { teacherId: user.userId }),
      });
      router.push(user.collegeId ? `/${encodeURIComponent(user.collegeId)}/opportunities` : "/opportunities");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not submit opportunity.");
    } finally {
      setSubmitting(false);
    }
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
            <select
              id="opportunity-company"
              className={styles.underlineSelect}
              value={collegeCompanyId}
              onChange={(event) => {
                setCollegeCompanyId(event.target.value);
              }}
              required
            >
              <option value="">Select a company</option>
              {companies.map((option) => (
                <option key={option.id} value={option.id}>{option.companyName}</option>
              ))}
            </select>
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

      {error ? <p className={styles.formError}>{error}</p> : null}

      <button type="submit" className={styles.submitButton} disabled={submitting}>
        {submitting ? "Submitting..." : "Submit for TPO approval"}
      </button>
    </form>
  );
}
