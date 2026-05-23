"use client";

import { useState } from "react";

interface CounterProps {
  onCountChange: (count: number) => void;
}

export function Counter({ onCountChange }: CounterProps) {
  const [count, setCount] = useState(1);

  function increment() {
    const next = count + 1;
    setCount(next);
    onCountChange(next);
  }

  function decrement() {
    if (count > 1) {
      const next = count - 1;
      setCount(next);
      onCountChange(next);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={decrement}
        className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
      >
        -
      </button>
      <span className="min-w-8 text-center font-medium">{count}</span>
      <button
        type="button"
        onClick={increment}
        className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
      >
        +
      </button>
    </div>
  );
}
