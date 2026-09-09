"use client";

import {
  MONTHS,
  SEASON_LABEL,
  availableCount,
  bookedCompanies,
  type MonthKey,
  type PlacementDate,
} from "@/features/tpo/infrastructure/placementSlots";

import DateSlotCard from "./DateSlotCard";
import styles from "../InterviewSlotBookingPage.module.css";

interface AvailableDatesPanelProps {
  dates: PlacementDate[];
  months?: MonthKey[];
  month: MonthKey;
  selectedDateId: string | null;
  selectedSlotId: string | null;
  reservedSlotId: string | null;
  onMonthChange: (month: MonthKey) => void;
  onSelectSlot: (dateId: string, slotId: string) => void;
  onReserve: (dateId: string, slotId: string) => void;
}

export default function AvailableDatesPanel({
  dates,
  months = MONTHS,
  month,
  selectedDateId,
  selectedSlotId,
  reservedSlotId,
  onMonthChange,
  onSelectSlot,
  onReserve,
}: AvailableDatesPanelProps) {
  return (
    <section
      id="available-slots"
      className={styles.datesPanel}
      aria-labelledby="available-dates"
    >
      <header className={styles.panelHeader}>
        <h2 id="available-dates">Available placement dates</h2>
        <p>
          Season: {SEASON_LABEL} · IIT Chennai campus &amp; MS Teams
        </p>
      </header>

      <div className={styles.monthTabs} role="tablist" aria-label="Season months">
        {months.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={month === item}
            className={`${styles.monthTab} ${
              month === item ? styles.monthTabActive : ""
            }`}
            onClick={() => onMonthChange(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className={styles.dateList}>
        {dates.map((date) => (
          <DateSlotCard
            key={date.id}
            date={date}
            left={availableCount(date)}
            booked={bookedCompanies(date)}
            selected={selectedDateId === date.id}
            selectedSlotId={
              selectedDateId === date.id ? selectedSlotId : null
            }
            reserved={
              reservedSlotId !== null &&
              selectedDateId === date.id &&
              reservedSlotId === selectedSlotId
            }
            onSelectSlot={(slotId) => onSelectSlot(date.id, slotId)}
            onReserve={(slotId) => onReserve(date.id, slotId)}
          />
        ))}
      </div>
    </section>
  );
}
