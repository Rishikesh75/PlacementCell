"use client";

interface RadioGroupProps {
  name: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

export function RadioGroup({ name, options, onChange }: RadioGroupProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex cursor-pointer items-center gap-2"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            onChange={() => onChange(option.value)}
            className="h-4 w-4"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}
