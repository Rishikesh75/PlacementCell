"use client";

import InstituteCard from "./InstituteCard";
import { getAllInstitutes } from "@/shared/institutes/instituteCatalog";
import { useClientSnapshot } from "@/shared/lib/useClientSnapshot";

interface InstituteGridProps {
  search?: string;
}

export default function InstituteGrid({
  search = "",
}: InstituteGridProps) {
  const items = useClientSnapshot(getAllInstitutes);

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
