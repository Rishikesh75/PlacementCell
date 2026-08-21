import styles from "../CompanyFeedbackPage.module.css";

interface FilterPillsProps {
  years: string[];
  branches: string[];
  selectedYear: string;
  selectedBranch: string | null;
  onYearChange: (year: string) => void;
  onBranchChange: (branch: string) => void;
}

export default function FilterPills({
  years,
  branches,
  selectedYear,
  selectedBranch,
  onYearChange,
  onBranchChange,
}: FilterPillsProps) {
  return (
    <div className={styles.filters}>
      {years.map((year) => (
        <button
          key={year}
          type="button"
          onClick={() => onYearChange(year)}
          className={`${styles.pill} ${
            selectedYear === year ? styles.activePill : ""
          }`}
        >
          {year}
        </button>
      ))}

      {branches.map((branch) => (
        <button
          key={branch}
          type="button"
          onClick={() => onBranchChange(branch)}
          className={`${styles.pill} ${
            selectedBranch === branch ? styles.activePill : ""
          }`}
        >
          {branch}
        </button>
      ))}
    </div>
  );
}
