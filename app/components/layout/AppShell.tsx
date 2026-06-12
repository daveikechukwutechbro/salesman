'use client';

import { ReactNode } from 'react';
import TabBar from './TabBar';
import { Screen } from '@/app/types';

interface AppShellProps {
  children: ReactNode;
  activeScreen: Screen;
  onTabChange: (screen: Screen) => void;
  cartCount: number;
}

export default function AppShell({ children, activeScreen, onTabChange, cartCount }: AppShellProps) {
  return (
    <div className="min-h-screen pb-16">
      {children}
      <TabBar active={activeScreen} onTabChange={onTabChange} cartCount={cartCount} />
    </div>
  );
}
