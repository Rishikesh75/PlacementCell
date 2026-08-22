"use client";

import { useEffect, useState } from "react";

import InstituteCard from "./InstituteCard";
import { type Institute } from "@/data/institutes";
import { getAllInstitutes } from "@/shared/institutes/instituteCatalog";

interface InstituteGridProps {
  search?: string;
}

export default function InstituteGrid({
  search = "",
}: InstituteGridProps) {
  const [items, setItems] = useState<Institute[]>([]);

  useEffect(() => {
    setItems(getAllInstitutes());
  }, []);

  const searchText = search.toLowerCase();
  const filteredInstitutes = items.filter((institute) => {
    return (
      institute.name.toLowerCase().includes(searchText) ||
      institute.location.toLowerCase().includes(searchText)
    );
  });

  return (
    <section className="institute-grid">
      {filteredInstitutes.map((institute) => (
        <InstituteCard
          key={institute.id}
          institute={institute}
        />
      ))}
    </section>
  );
}
