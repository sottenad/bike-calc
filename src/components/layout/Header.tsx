'use client';

import { ThemeToggle } from '@/components/ui';

export function Header() {
  return (
    <header className="mb-8">
      <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cycling Climb Calculator</h1>
        <p className="text-gray-600 dark:text-slate-400 mt-2">
          Estimate your climb time, power-to-weight ratio, and optimal gearing
        </p>
      </div>
    </header>
  );
}
