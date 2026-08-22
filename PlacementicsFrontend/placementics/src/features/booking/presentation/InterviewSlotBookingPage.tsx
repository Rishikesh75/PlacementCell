"use client";

import { useMemo, useState } from "react";

import { type MonthKey } from "@/data/placementSlots";
import { useClientSnapshot } from "@/shared/lib/useClientSnapshot";
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
  const dates = useClientSnapshot(getPublishedDates);
  const [month, setMonth] = useState<MonthKey | null>(null);
  const [selectedDateId, setSelectedDateId] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [reservedSlotId, setReservedSlotId] = useState<string | null>(null);

  const availableMonths = useMemo(() => monthsFromDates(dates), [dates]);
  const resolvedMonth: MonthKey = month
    ?? (availableMonths.includes("Dec") ? "Dec" : (availableMonths[0] ?? "Dec"));

  const monthDates = useMemo(
    () => dates.filter((date) => date.month === resolvedMonth),
    [dates, resolvedMonth],
  );

  const defaultDate =
    dates.find((date) => date.month === resolvedMonth) ?? dates[0] ?? null;
  const resolvedDateId = selectedDateId ?? defaultDate?.id ?? null;
  const selectedDate =
    dates.find((date) => date.id === resolvedDateId) ?? null;
  const defaultSlot =
    selectedDate?.slots.find((slot) => slot.status === "available") ??
    selectedDate?.slots[0];
  const resolvedSlotId = selectedSlotId ?? defaultSlot?.id ?? null;
  const selectedSlot =
    selectedDate?.slots.find((slot) => slot.id === resolvedSlotId) ?? null;

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
            month={resolvedMonth}
            selectedDateId={resolvedDateId}
            selectedSlotId={resolvedSlotId}
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
