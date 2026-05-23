"use client";

interface SingleInputProps {
  placeholder?: string;
  type?: string;
  onValueChange: (value: string) => void;
}

export function SingleInput({
  placeholder = "Enter text...",
  type = "text",
  onValueChange,
}: SingleInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={(e) => onValueChange(e.target.value)}
      className="mb-3 w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
    />
  );
}
