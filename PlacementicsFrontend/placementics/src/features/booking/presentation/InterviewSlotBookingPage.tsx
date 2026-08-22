"use client";

import { useEffect, useMemo, useState } from "react";

import { type MonthKey, type PlacementDate } from "@/data/placementSlots";
import {
  getPublishedDates,
  monthsFromDates,
} from "@/shared/slots/publishedSlots";

import CompanyPortalHeader from "./Components/CompanyPortalHeader";
import ProgressStepper from "./Components/ProgressStepper";
import CompanyDetailsPanel from "./Components/CompanyDetailsPanel";
import AvailableDatesPanel from "./Components/AvailableDatesPanel";
import BookingSummaryFooter from "./Components/BookingSummaryFooter";
import styles from "./InterviewSlotBookingPage.module.css";

function formatFooterDate(weekdayFull: string, time: string) {
  const parts = weekdayFull.split(", ");
  const rest = parts[1] ?? weekdayFull;
  const [day, month] = rest.split(" ");
  return `${day} ${month.slice(0, 3)}, ${time.replace(" – ", "–")}`;
}

export default function InterviewSlotBookingPage() {
  const [dates, setDates] = useState<PlacementDate[]>([]);
  const [month, setMonth] = useState<MonthKey>("Dec");
  const [selectedDateId, setSelectedDateId] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [reservedSlotId, setReservedSlotId] = useState<string | null>(null);

  useEffect(() => {
    const published = getPublishedDates();
    setDates(published);

    const availableMonths = monthsFromDates(published);
    const initialMonth = availableMonths.includes("Dec")
      ? "Dec"
      : (availableMonths[0] ?? "Dec");
    setMonth(initialMonth);

    const initialDate =
      published.find((date) => date.month === initialMonth) ??
      published[0] ??
      null;

    if (initialDate) {
      setSelectedDateId(initialDate.id);
      const openSlot =
        initialDate.slots.find((slot) => slot.status === "available") ??
        initialDate.slots[0];
      if (openSlot) {
        setSelectedSlotId(openSlot.id);
      }
    }
  }, []);

  const availableMonths = useMemo(() => monthsFromDates(dates), [dates]);

  const monthDates = useMemo(
    () => dates.filter((date) => date.month === month),
    [dates, month],
  );

  const selectedDate =
    dates.find((date) => date.id === selectedDateId) ?? null;
  const selectedSlot =
    selectedDate?.slots.find((slot) => slot.id === selectedSlotId) ?? null;

  function handleMonthChange(next: MonthKey) {
    setMonth(next);
  }

  function handleSelectSlot(dateId: string, slotId: string) {
    setSelectedDateId(dateId);
    setSelectedSlotId(slotId);
    if (reservedSlotId && reservedSlotId !== slotId) {
      setReservedSlotId(null);
    }
  }

  function handleReserve(dateId: string, slotId: string) {
    setSelectedDateId(dateId);
    setSelectedSlotId(slotId);
    setReservedSlotId(slotId);
  }

  function handleContinue() {
    document
      .getElementById("available-slots")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const dateTime =
    selectedDate && selectedSlot
      ? formatFooterDate(selectedDate.weekdayFull, selectedSlot.label)
      : "—";

  return (
    <main className={styles.page}>
      <CompanyPortalHeader />

      <div className={styles.content}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>Book your placement drive slot</h1>
            <p>
              Complete registration, pick a date and time, then wait for the
              placement cell to confirm. We&apos;ll email you as soon as your
              slot is locked in.
            </p>
          </div>
          <ProgressStepper currentStep={2} />
        </section>

        <div className={styles.columns}>
          <CompanyDetailsPanel onContinue={handleContinue} />
          <AvailableDatesPanel
            dates={monthDates}
            months={availableMonths}
            month={month}
            selectedDateId={selectedDateId}
            selectedSlotId={selectedSlotId}
            reservedSlotId={reservedSlotId}
            onMonthChange={handleMonthChange}
            onSelectSlot={handleSelectSlot}
            onReserve={handleReserve}
          />
        </div>
      </div>

      <BookingSummaryFooter
        company="Razorpay"
        dateTime={dateTime}
        venue={selectedDate?.venue ?? "—"}
        reserved={reservedSlotId !== null && reservedSlotId === selectedSlotId}
      />
    </main>
  );
}
