"use client";

interface NumberInputProps {
  label?: string;
  placeholder?: string;
  defaultValue?: number;
  onValueChange: (value: number) => void;
}

export function NumberInput({
  label,
  placeholder,
  defaultValue = 6,
  onValueChange,
}: NumberInputProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type="number"
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={(e) =>
          onValueChange(e.target.value ? Number(e.target.value) : 0)
        }
        className="w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
}
