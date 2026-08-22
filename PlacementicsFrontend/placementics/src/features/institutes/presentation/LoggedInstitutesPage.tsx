"use client";

import { institutes } from "@/data/institutes";
import {
  getCreatedInstitutes,
  type CreatedInstitute,
} from "@/shared/institutes/instituteCatalog";
import { useClientSnapshot } from "@/shared/lib/useClientSnapshot";

import styles from "./LoggedInstitutesPage.module.css";

type ListedInstitute = {
  id: number;
  shortName: string;
  name: string;
  location: string;
  tpoName: string;
  tpoEmail: string;
  createdOn: string;
  source: "seed" | "created";
};

function seedAsListed(): ListedInstitute[] {
  return institutes.map((institute) => ({
    id: institute.id,
    shortName: institute.shortName,
    name: institute.name,
    location: institute.location,
    tpoName: "Created with institute",
    tpoEmail: "—",
    createdOn: "Seeded",
    source: "seed",
  }));
}

function createdAsListed(items: CreatedInstitute[]): ListedInstitute[] {
  return items.map((institute) => ({
    id: institute.id,
    shortName: institute.shortName,
    name: institute.name,
    location: institute.location,
    tpoName: institute.tpoName,
    tpoEmail: institute.tpoEmail,
    createdOn: institute.createdOn,
    source: "created",
  }));
}

function getListedInstitutes(): ListedInstitute[] {
  return [...createdAsListed(getCreatedInstitutes()), ...seedAsListed()];
}

export default function LoggedInstitutesPage() {
  const items = useClientSnapshot(getListedInstitutes);

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <section className={styles.hero}>
          <p className={styles.kicker}>Internal URL only</p>
          <h1>Logged institutes</h1>
          <p>
            Campuses on this network, including those registered at
            /createnewInstitute. This page is not linked from navigation.
          </p>
        </section>

        {items.length === 0 ? (
          <p className={styles.empty}>No institutes recorded yet.</p>
        ) : (
          <section className={styles.list}>
            {items.map((institute) => (
              <article key={`${institute.source}-${institute.id}`} className={styles.card}>
                <div className={styles.shortName}>{institute.shortName}</div>
                <div className={styles.body}>
                  <h2>{institute.name}</h2>
                  <p className={styles.meta}>{institute.location}</p>
                  <p className={styles.meta}>
                    TPO: {institute.tpoName}
                    {institute.tpoEmail !== "—" ? ` · ${institute.tpoEmail}` : ""}
                  </p>
                  <p className={styles.meta}>Added {institute.createdOn}</p>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
