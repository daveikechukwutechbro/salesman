'use client';

import { Category } from '@/app/types';

interface CategoryBarProps {
  categories: Category[];
  activeCategory: string;
  onSelect: (categoryId: string) => void;
}

export default function CategoryBar({ categories, activeCategory, onSelect }: CategoryBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
      <button
        onClick={() => onSelect('')}
        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
          activeCategory === ''
            ? 'bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer flex items-center gap-1 ${
            activeCategory === cat.id
              ? 'bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          {cat.icon && <span>{cat.icon}</span>}
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
}
