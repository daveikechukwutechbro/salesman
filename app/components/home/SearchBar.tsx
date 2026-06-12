'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = 'Search products...' }: SearchBarProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (!e.target.value) onSearch('');
        }}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 pr-20 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm outline-none focus:ring-2 focus:ring-[var(--tg-theme-button-color)] transition-all"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="px-2 py-1 text-xs text-gray-400 cursor-pointer"
          >
            ✕
          </button>
        )}
        <button
          type="submit"
          className="px-3 py-1 text-xs rounded-lg bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] cursor-pointer"
        >
          Search
        </button>
      </div>
    </form>
  );
}
