'use client';

import { Screen } from '@/app/types';

interface Tab {
  id: Screen;
  label: string;
  icon: string;
}

const TABS: Tab[] = [
  { id: 'home', label: 'Shop', icon: '🏪' },
  { id: 'cart', label: 'Cart', icon: '🛒' },
  { id: 'orders', label: 'Orders', icon: '📦' },
  { id: 'profile', label: 'Profile', icon: '👤' },
];

interface TabBarProps {
  active: Screen;
  onTabChange: (screen: Screen) => void;
  cartCount: number;
}

export default function TabBar({ active, onTabChange, cartCount }: TabBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 safe-bottom">
      <div className="max-w-md mx-auto flex">
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          const isCart = tab.id === 'cart';
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center py-2 text-xs transition-colors cursor-pointer ${
                isActive
                  ? 'text-[var(--tg-theme-button-color)]'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              <span className="text-xl relative">
                {tab.icon}
                {isCart && cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </span>
              <span className="mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
