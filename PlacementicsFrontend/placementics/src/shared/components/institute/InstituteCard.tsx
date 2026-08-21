import InstituteStats from "./InstituteStats";
import { Institute } from "@/data/institutes";

interface InstituteCardProps {
  institute: Institute;
}

export default function InstituteCard({
  institute,
}: InstituteCardProps) {
  return (
    <article className="institute-card">

      {/* Institute abbreviation */}
      <div className="institute-logo">
        {institute.shortName}
      </div>

      {/* Institute information */}
      <div className="institute-info">
        <h2>{institute.name}</h2>

        <p className="location">
          {institute.location}
        </p>
      </div>

      {/* Statistics */}
      <InstituteStats
        alumni={institute.alumni}
        recruiters={institute.recruiters}
        placement={institute.placement}
      />

      {/* Action */}
      <button className="select-button">
        Select institute
        <span>→</span>
      </button>

    </article>
  );
}