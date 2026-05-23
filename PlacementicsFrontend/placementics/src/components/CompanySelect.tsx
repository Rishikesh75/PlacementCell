"use client";

interface CompanySelectProps {
  label?: string;
  options: string[];
  onSelect: (value: string) => void;
}

export function CompanySelect({
  label = "Select Company",
  options,
  onSelect,
}: CompanySelectProps) {
  return (
    <div className="mb-4">
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        defaultValue=""
        onChange={(e) => onSelect(e.target.value)}
        className="w-full max-w-md rounded border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
