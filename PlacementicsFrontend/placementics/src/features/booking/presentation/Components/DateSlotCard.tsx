import type { PlacementDate } from "@/features/tpo/infrastructure/placementSlots";

import styles from "../InterviewSlotBookingPage.module.css";

interface DateSlotCardProps {
  date: PlacementDate;
  left: number;
  booked: string[];
  selected: boolean;
  selectedSlotId: string | null;
  reserved: boolean;
  onSelectSlot: (slotId: string) => void;
  onReserve: (slotId: string) => void;
}

function badgeClass(left: number, total: number) {
  if (left === 0) return styles.badgeFull;
  if (left === total) return styles.badgeOpen;
  if (left === 1) return styles.badgeLimited;
  return styles.badgePartial;
}

function badgeLabel(left: number, total: number) {
  if (left === 0) return "Fully booked";
  return `${left} of ${total} slots left`;
}

export default function DateSlotCard({
  date,
  left,
  booked,
  selected,
  selectedSlotId,
  reserved,
  onSelectSlot,
  onReserve,
}: DateSlotCardProps) {
  const total = date.slots.length;
  const fullyBooked = left === 0;
  const selectedSlot = date.slots.find((slot) => slot.id === selectedSlotId);
  const selectedTime = selectedSlot?.label ?? "";

  let actionLabel = "Select a time to reserve";
  if (fullyBooked) {
    actionLabel = "No slots available";
  } else if (reserved && selectedTime) {
    actionLabel = `Reserved ${selectedTime}`;
  } else if (selected && selectedTime) {
    actionLabel = `Reserve ${selectedTime}`;
  }

  return (
    <article
      className={`${styles.dateCard} ${
        selected && !fullyBooked ? styles.dateCardSelected : ""
      } ${fullyBooked ? styles.dateCardFull : ""}`}
    >
      <div className={styles.dateCardTop}>
        <div className={styles.dateStamp}>
          <span className={styles.dateDay}>{String(date.day).padStart(2, "0")}</span>
          <span className={styles.dateMonth}>{date.monthShort}</span>
        </div>

        <div className={styles.dateCopy}>
          <h3>{date.weekdayFull}</h3>
          <p>{date.venue}</p>
        </div>

        <span className={`${styles.badge} ${badgeClass(left, total)}`}>
          {badgeLabel(left, total)}
        </span>
      </div>

      <div className={styles.timeRow}>
        {date.slots.map((slot) => {
          const isBooked = slot.status === "booked";
          const isActive = selected && slot.id === selectedSlotId;

          return (
            <button
              key={slot.id}
              type="button"
              disabled={isBooked || fullyBooked}
              className={`${styles.timeSlot} ${
                isBooked ? styles.timeSlotBooked : ""
              } ${isActive ? styles.timeSlotActive : ""}`}
              onClick={() => onSelectSlot(slot.id)}
            >
              {slot.label}
            </button>
          );
        })}
      </div>

      {booked.length > 0 && !fullyBooked ? (
        <p className={styles.bookedNote}>
          Already booked on this day: {booked.join(" · ")}
        </p>
      ) : null}

      {fullyBooked ? (
        <p className={styles.bookedNote}>
          {booked.join(" · ")}
        </p>
      ) : null}

      <button
        type="button"
        className={`${styles.reserveButton} ${
          selected && selectedTime && !fullyBooked
            ? styles.reserveButtonSolid
            : styles.reserveButtonGhost
        }`}
        disabled={fullyBooked || !selectedTime}
        onClick={() => {
          if (selectedSlotId) onReserve(selectedSlotId);
        }}
      >
        {actionLabel}
      </button>
    </article>
  );
}
