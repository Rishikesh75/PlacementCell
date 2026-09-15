"use client";

import { useEffect, useMemo, useState } from "react";

import AppHeader from "@/shared/layouts/AppHeader";
import { getCurrentUser } from "@/features/auth/application/session";
import {
  getSubmittedRegistrations,
  tpoRequests,
  type RegistrationKind,
  type RequestStatus,
  type TpoQueue,
  type TpoRequest,
} from "@/features/tpo/infrastructure/tpoRequests";
import {
  decideRegistrationRequest,
  getRegistrationRequests,
} from "@/features/tpo/infrastructure/registrationRequestsApi";
import { useClientSnapshot } from "@/shared/lib/useClientSnapshot";

import TpoQueueTabs from "./Components/TpoQueueTabs";
import TpoRegistrationTabs from "./Components/TpoRegistrationTabs";
import TpoRequestList from "./Components/TpoRequestList";
import styles from "./RequestsPage.module.css";

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
  const [registrationItems, setRegistrationItems] = useState<TpoRequest[]>([]);
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const [loadingRegistrations, setLoadingRegistrations] = useState(true);
  const storedItems = useClientSnapshot(getQueueItems);
  const [items, setItems] = useState<TpoRequest[] | null>(null);

  useEffect(() => {
    const collegeId = getCurrentUser()?.collegeId;

    if (!collegeId) {
      Promise.resolve().then(() => {
        setRegistrationError("Could not identify the TPO institute.");
        setLoadingRegistrations(false);
      });
      return;
    }

    let active = true;

    getRegistrationRequests(collegeId)
      .then((requests) => {
        if (active) {
          setRegistrationItems(requests);
        }
      })
      .catch((cause) => {
        if (active) {
          setRegistrationError(
            cause instanceof Error
              ? cause.message
              : "Could not load registration requests.",
          );
        }
      })
      .finally(() => {
        if (active) {
          setLoadingRegistrations(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const queueItems = queue === "registrations"
    ? registrationItems
    : items ?? storedItems;

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

  async function handleDecide(
    id: string,
    status: Exclude<RequestStatus, "pending">,
  ) {
    if (queue === "registrations") {
      try {
        const updatedRequest = await decideRegistrationRequest(id, status);
        setRegistrationItems((current) =>
          current.map((item) => (item.id === id ? updatedRequest : item)),
        );
      } catch (cause) {
        setRegistrationError(
          cause instanceof Error
            ? cause.message
            : "Could not update registration request.",
        );
      }
      return;
    }

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

        {queue === "registrations" && loadingRegistrations ? (
          <p className={styles.empty}>Loading registration requests...</p>
        ) : null}

        {queue === "registrations" && registrationError ? (
          <p className={styles.empty}>{registrationError}</p>
        ) : null}

        {!loadingRegistrations && !registrationError ? (
          <TpoRequestList items={visibleItems} onDecide={handleDecide} />
        ) : null}
      </div>
    </main>
  );
}
