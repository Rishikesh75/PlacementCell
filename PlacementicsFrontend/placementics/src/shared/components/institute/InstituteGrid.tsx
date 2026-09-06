"use client";

import { useEffect, useState } from "react";

import InstituteCard from "./InstituteCard";
import { fetchColleges, type College } from "@/shared/institutes/collegesApi";

interface InstituteGridProps {
  search?: string;
}

export default function InstituteGrid({
  search = "",
}: InstituteGridProps) {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const items = await fetchColleges();
        if (!cancelled) {
          setColleges(items);
          setError(null);
        }
      } catch {
        if (!cancelled) {
          setError("Could not load institutes. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const searchText = search.toLowerCase();
  const filteredColleges = colleges.filter((college) => {
    const address = college.address ?? "";
    return (
      college.name.toLowerCase().includes(searchText) ||
      address.toLowerCase().includes(searchText)
    );
  });

  if (loading) {
    return (
      <section className="institute-grid">
        <p className="institute-grid-status">Loading institutes…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="institute-grid">
        <p className="institute-grid-status">{error}</p>
      </section>
    );
  }

  if (filteredColleges.length === 0) {
    return (
      <section className="institute-grid">
        <p className="institute-grid-status">No institutes match that search.</p>
      </section>
    );
  }

  return (
    <section className="institute-grid">
      {filteredColleges.map((college) => (
        <InstituteCard
          key={college.id}
          college={college}
        />
      ))}
    </section>
  );
}
