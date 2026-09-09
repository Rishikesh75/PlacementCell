"use client";

import { FormEvent, useState } from "react";

import {
  nextInstituteId,
  saveCreatedInstitute,
} from "@/features/institutes/infrastructure/instituteCatalog";

import styles from "./CreateInstitutePage.module.css";

function todayLabel() {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date());
}

export default function CreateInstitutePage() {
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [location, setLocation] = useState("");
  const [tpoName, setTpoName] = useState("");
  const [tpoEmail, setTpoEmail] = useState("");
  const [tpoPassword, setTpoPassword] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      id: nextInstituteId(),
      shortName: shortName.trim().slice(0, 2).toUpperCase(),
      name: name.trim(),
      location: location.trim(),
      alumni: "0",
      recruiters: "0",
      placement: "—",
      tpoName: tpoName.trim(),
      tpoEmail: tpoEmail.trim(),
      createdOn: todayLabel(),
    };

    console.log({ ...payload, tpoPassword });
    saveCreatedInstitute(payload);
    setSaved(true);
    setName("");
    setShortName("");
    setLocation("");
    setTpoName("");
    setTpoEmail("");
    setTpoPassword("");
  }

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <section className={styles.hero}>
          <p className={styles.kicker}>Internal URL only</p>
          <h1>Create a new institute</h1>
          <p>
            This registers the campus and creates its TPO account. It is not
            linked from the public app.
          </p>
        </section>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="institute-name">Institute name</label>
            <input
              id="institute-name"
              className={styles.underlineInput}
              type="text"
              placeholder="e.g. Indian Institute of Technology, Chennai"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="short-name">Short name</label>
            <input
              id="short-name"
              className={styles.underlineInput}
              type="text"
              maxLength={4}
              placeholder="e.g. IT"
              value={shortName}
              onChange={(event) => setShortName(event.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="location">Location</label>
            <input
              id="location"
              className={styles.underlineInput}
              type="text"
              placeholder="e.g. Chennai, Tamil Nadu"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="tpo-name">TPO full name</label>
            <input
              id="tpo-name"
              className={styles.underlineInput}
              type="text"
              placeholder="e.g. T. Rangarajan"
              value={tpoName}
              onChange={(event) => setTpoName(event.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="tpo-email">TPO email</label>
            <input
              id="tpo-email"
              className={styles.underlineInput}
              type="email"
              placeholder="tpo@institute.ac.in"
              value={tpoEmail}
              onChange={(event) => setTpoEmail(event.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="tpo-password">TPO password</label>
            <input
              id="tpo-password"
              className={styles.underlineInput}
              type="password"
              placeholder="••••••••••••"
              value={tpoPassword}
              onChange={(event) => setTpoPassword(event.target.value)}
              required
            />
          </div>

          {saved ? (
            <p className={styles.success}>
              Institute saved. The TPO can log in with that email. Open
              /loggedInstitutes to review the list.
            </p>
          ) : null}

          <button type="submit" className={styles.submitButton}>
            Create institute and TPO
          </button>
        </form>
      </div>
    </main>
  );
}
