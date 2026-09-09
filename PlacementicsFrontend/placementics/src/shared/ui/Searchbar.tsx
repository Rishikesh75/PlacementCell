"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch?: (value: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setValue(newValue);
    onSearch?.(newValue);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search by institute name or city..."
        className="search-input"
      />
    </div>
  );
}
