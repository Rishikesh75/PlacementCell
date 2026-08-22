"use client";

import { useMemo, useState } from "react";

import AppHeader from "@/shared/layouts/AppHeader";
import {
  getSubmittedRegistrations,
  tpoRequests,
  type RegistrationKind,
  type RequestStatus,
  type TpoQueue,
  type TpoRequest,
} from "@/data/tpoRequests";
import { useClientSnapshot } from "@/shared/lib/useClientSnapshot";

import TpoQueueTabs from "./Components/TpoQueueTabs";
import TpoRegistrationTabs from "./Components/TpoRegistrationTabs";
import TpoRequestList from "./Components/TpoRequestList";
import styles from "./TpoRequestsPage.module.css";

const QUEUE_COPY: Record<TpoQueue, { title: string; subtitle: string }> = {
  registrations: {
    title: "Registration requests",
    subtitle:
      "Approve institute logins for companies, students, alumni, and TPO-added company records.",
  },
  feedback: {
    title: "Feedback to approve",
    subtitle: "Student interview write-ups go live on the board only after TPO approval.",
  },
  opportunities: {
    title: "Opportunities to approve",
    subtitle: "Job and research posts stay hidden until the placement cell signs off.",
  },
  slots: {
    title: "Slot bookings to approve",
    subtitle: "Company drive reservations need TPO confirmation before they are locked.",
  },
};

function getQueueItems(): TpoRequest[] {
  return [...getSubmittedRegistrations(), ...tpoRequests];
}

export default function TpoRequestsPage() {
  const [queue, setQueue] = useState<TpoQueue>("registrations");
  const [registrationKind, setRegistrationKind] =
    useState<RegistrationKind>("company");
  const storedItems = useClientSnapshot(getQueueItems);
  const [items, setItems] = useState<TpoRequest[] | null>(null);
  const queueItems = items ?? storedItems;

  const visibleItems = useMemo(() => {
    return queueItems.filter((item) => {
      if (item.queue !== queue) {
        return false;
      }

      if (queue === "registrations") {
        return item.kind === registrationKind;
      }

      return true;
    });
  }, [queueItems, queue, registrationKind]);

  function handleDecide(id: string, status: Exclude<RequestStatus, "pending">) {
    setItems((current) =>
      (current ?? storedItems).map((item) =>
        item.id === id ? { ...item, status } : item,
      ),
    );
  }

  const copy = QUEUE_COPY[queue];

  return (
    <main className={styles.page}>
      <AppHeader active="requests" />

      <div className={styles.content}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>{copy.title}</h1>
            <p>{copy.subtitle}</p>
          </div>
        </section>

        <TpoQueueTabs active={queue} onChange={setQueue} />

        {queue === "registrations" ? (
          <TpoRegistrationTabs
            active={registrationKind}
            onChange={setRegistrationKind}
          />
        ) : null}

        <TpoRequestList items={visibleItems} onDecide={handleDecide} />
      </div>
    </main>
  );
}
