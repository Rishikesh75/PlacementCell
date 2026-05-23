"use client";

interface DurationSelectorProps {
  onDurationChange: (duration: string) => void;
}

const hoursList = Array.from({ length: 6 }, (_, i) => i);
const minutesList = [0, 15, 30, 45];

export function DurationSelector({ onDurationChange }: DurationSelectorProps) {
  function handleChange(hours: number, minutes: number) {
    onDurationChange(`${hours}:${minutes}`);
  }

  return (
    <div className="mb-4 flex flex-wrap gap-4">
      <label className="flex items-center gap-2">
        <span>Hours:</span>
        <select
          defaultValue={0}
          onChange={(e) => handleChange(Number(e.target.value), 0)}
          className="rounded border border-gray-300 px-2 py-1"
        >
          {hoursList.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
      </label>
      <label className="flex items-center gap-2">
        <span>Minutes:</span>
        <select
          defaultValue={0}
          onChange={(e) => handleChange(0, Number(e.target.value))}
          className="rounded border border-gray-300 px-2 py-1"
        >
          {minutesList.map((m) => (
            <option key={m} value={m}>
              {String(m).padStart(2, "0")}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
