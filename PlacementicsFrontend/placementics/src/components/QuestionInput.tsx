"use client";

interface QuestionInputProps {
  placeholder?: string;
  onSubmit: (value: string) => void;
}

export function QuestionInput({
  placeholder = "Enter text...",
  onSubmit,
}: QuestionInputProps) {
  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      const value = event.currentTarget.value.trim();
      if (value) {
        onSubmit(value);
      }
    }
  }

  return (
    <textarea
      placeholder={placeholder}
      onKeyDown={handleKeyDown}
      className="min-h-[80px] w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
    />
  );
}
