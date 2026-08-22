"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

import AppHeader from "@/shared/layouts/AppHeader";
import {
  availableCount,
  type PlacementDate,
} from "@/data/placementSlots";
import {
  buildPlacementDate,
  getPublishedDates,
  publishDate,
} from "@/shared/slots/publishedSlots";

import styles from "./TpoPublishSlotsPage.module.css";

export default function TpoPublishSlotsPage() {
  const [dates, setDates] = useState<PlacementDate[]>([]);
  const [isoDate, setIsoDate] = useState("");
  const [venue, setVenue] = useState("");
  const [times, setTimes] = useState(["09:00 – 11:00"]);
  const [error, setError] = useState("");

  useEffect(() => {
    setDates(getPublishedDates());
  }, []);

  const publishedNewestFirst = useMemo(
    () => [...dates].reverse(),
    [dates],
  );

  function addTime() {
    setTimes((current) => [...current, ""]);
  }

  function updateTime(index: number, value: string) {
    setTimes((current) =>
      current.map((time, timeIndex) => (timeIndex === index ? value : time)),
    );
  }

  function removeTime(index: number) {
    setTimes((current) =>
      current.length === 1
        ? current
        : current.filter((_, timeIndex) => timeIndex !== index),
    );
  }

  function handlePublish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const filledTimes = times.map((time) => time.trim()).filter(Boolean);
    const nextDate = buildPlacementDate(isoDate, venue.trim(), filledTimes);

    if (!nextDate || filledTimes.length === 0 || !venue.trim()) {
      setError(
        "Use a date in Nov–Feb, a venue, and at least one time window.",
      );
      return;
    }

    setError("");
    setDates(publishDate(nextDate));
    setIsoDate("");
    setVenue("");
    setTimes(["09:00 – 11:00"]);
  }

  return (
    <main className={styles.page}>
      <AppHeader active="publishSlots" />

      <div className={styles.content}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>Publish interview slots</h1>
            <p>
              Create dates and time windows for the season. Companies only see
              slots after you publish them.
            </p>
          </div>
        </section>

        <div className={styles.columns}>
          <form className={styles.form} onSubmit={handlePublish}>
            <div className={styles.field}>
              <label htmlFor="slot-date">Date</label>
              <input
                id="slot-date"
                className={styles.underlineInput}
                type="date"
                min="2025-11-01"
                max="2026-02-28"
                value={isoDate}
                onChange={(event) => setIsoDate(event.target.value)}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="slot-venue">Venue</label>
              <input
                id="slot-venue"
                className={styles.underlineInput}
                type="text"
                placeholder="e.g. Placement Cell Auditorium"
                value={venue}
                onChange={(event) => setVenue(event.target.value)}
                required
              />
            </div>

            <div className={styles.field}>
              <span className={styles.fieldLabel}>Time windows</span>
              {times.map((time, index) => (
                <div key={index} className={styles.timeRow}>
                  <input
                    className={styles.underlineInput}
                    type="text"
                    placeholder="e.g. 09:00 – 11:00"
                    value={time}
                    onChange={(event) => updateTime(index, event.target.value)}
                    required
                  />
                  {times.length > 1 ? (
                    <button
                      type="button"
                      className={styles.removeTime}
                      aria-label={`Remove time ${index + 1}`}
                      onClick={() => removeTime(index)}
                    >
                      ×
                    </button>
                  ) : null}
                </div>
              ))}
              <button type="button" className={styles.addTime} onClick={addTime}>
                + Add time
              </button>
            </div>

            {error ? <p className={styles.error}>{error}</p> : null}

            <button type="submit" className={styles.submitButton}>
              Publish slots
            </button>
          </form>

          <section className={styles.list} aria-label="Published dates">
            <h2 className={styles.listTitle}>Published for companies</h2>
            {publishedNewestFirst.length === 0 ? (
              <p className={styles.empty}>No slots published yet.</p>
            ) : (
              publishedNewestFirst.map((date) => (
                <article key={date.id} className={styles.card}>
                  <h3 className={styles.cardTitle}>{date.weekdayFull}</h3>
                  <p className={styles.cardMeta}>
                    {date.venue} · {availableCount(date)} of {date.slots.length}{" "}
                    open
                  </p>
                  <p className={styles.cardTimes}>
                    {date.slots.map((slot) => slot.label).join(" · ")}
                  </p>
                </article>
              ))
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
