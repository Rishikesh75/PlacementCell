"use client";

import { FormEvent, useRef, useState } from "react";

import styles from "../InterviewSlotBookingPage.module.css";

const INITIAL_ROLES = [
  "SDE - Backend",
  "SDE - Frontend",
  "Product Analyst",
];

interface CompanyDetailsPanelProps {
  onContinue: () => void;
}

export default function CompanyDetailsPanel({
  onContinue,
}: CompanyDetailsPanelProps) {
  const [companyName, setCompanyName] = useState(
    "Razorpay Software Pvt. Ltd.",
  );
  const [industry, setIndustry] = useState("Fintech");
  const [studentsRequired, setStudentsRequired] = useState("6-8");
  const [contactPerson, setContactPerson] = useState("Ananya Bose");
  const [designation, setDesignation] = useState("Campus Recruitment Lead");
  const [email, setEmail] = useState("ananya.bose@razorpay.com");
  const [phone, setPhone] = useState("+91 98450 12233");
  const [packageRange, setPackageRange] = useState("₹18L – ₹30L");
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [addingRole, setAddingRole] = useState(false);
  const [newRole, setNewRole] = useState("");
  const roleInputRef = useRef<HTMLInputElement>(null);

  function removeRole(role: string) {
    setRoles((current) => current.filter((item) => item !== role));
  }

  function startAddRole() {
    setAddingRole(true);
    window.setTimeout(() => roleInputRef.current?.focus(), 0);
  }

  function commitNewRole() {
    const value = newRole.trim();
    if (value && !roles.includes(value)) {
      setRoles((current) => [...current, value]);
    }
    setNewRole("");
    setAddingRole(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onContinue();
  }

  return (
    <section className={styles.detailsPanel} aria-labelledby="company-details">
      <header className={styles.panelHeader}>
        <h2 id="company-details">Company details</h2>
        <p>Shown to the placement cell when they review your booking.</p>
      </header>

      <form className={styles.detailsForm} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="companyName">Company Name</label>
          <input
            id="companyName"
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
          />
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label htmlFor="industry">Industry</label>
            <input
              id="industry"
              value={industry}
              onChange={(event) => setIndustry(event.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="studentsRequired">Students Required</label>
            <input
              id="studentsRequired"
              value={studentsRequired}
              onChange={(event) => setStudentsRequired(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label htmlFor="contactPerson">Contact Person</label>
            <input
              id="contactPerson"
              value={contactPerson}
              onChange={(event) => setContactPerson(event.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="designation">Designation</label>
            <input
              id="designation"
              value={designation}
              onChange={(event) => setDesignation(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label htmlFor="email">Official Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.field}>
          <span className={styles.fieldLabel}>Roles Hiring For</span>
          <div className={styles.roleList}>
            {roles.map((role) => (
              <span key={role} className={styles.roleChip}>
                {role}
                <button
                  type="button"
                  className={styles.roleRemove}
                  aria-label={`Remove ${role}`}
                  onClick={() => removeRole(role)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          {addingRole ? (
            <input
              ref={roleInputRef}
              className={styles.roleInput}
              placeholder="Role title, then Enter"
              value={newRole}
              onChange={(event) => setNewRole(event.target.value)}
              onBlur={commitNewRole}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  commitNewRole();
                }
                if (event.key === "Escape") {
                  setNewRole("");
                  setAddingRole(false);
                }
              }}
            />
          ) : (
            <button
              type="button"
              className={styles.addRole}
              onClick={startAddRole}
            >
              Add another role...
            </button>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="packageRange">Package Range Offered</label>
          <input
            id="packageRange"
            value={packageRange}
            onChange={(event) => setPackageRange(event.target.value)}
          />
        </div>

        <div className={styles.field}>
          <span className={styles.fieldLabel}>Company Brochure / JD</span>
          <div className={styles.fileCard}>
            <span className={styles.fileIcon} aria-hidden="true">
              PDF
            </span>
            <div className={styles.fileMeta}>
              <strong>Razorpay_JD_2026.pdf</strong>
              <span>1.2 MB</span>
            </div>
            <span className={styles.fileStatus}>Uploaded</span>
          </div>
        </div>

        <button type="submit" className={styles.saveButton}>
          Save details &amp; continue to slots
        </button>
      </form>
    </section>
  );
}
