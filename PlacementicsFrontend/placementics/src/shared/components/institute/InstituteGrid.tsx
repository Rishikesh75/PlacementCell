import InstituteCard from "./InstituteCard";
import { institutes } from "@/data/institutes";

interface InstituteGridProps {
  search?: string;
}

export default function InstituteGrid({
  search = "",
}: InstituteGridProps) {

  const filteredInstitutes = institutes.filter((institute) => {
    const searchText = search.toLowerCase();

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