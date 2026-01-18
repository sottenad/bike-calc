'use client';

import type { UnitSystem } from '@/lib/types';

interface UnitToggleProps {
  unitSystem: UnitSystem;
  onChange: (unitSystem: UnitSystem) => void;
}

export function UnitToggle({ unitSystem, onChange }: UnitToggleProps) {
  const isImperial = unitSystem === 'imperial';

  const handleToggle = () => {
    onChange(isImperial ? 'metric' : 'imperial');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`text-sm font-medium ${!isImperial ? 'text-orange-500' : 'text-gray-400 dark:text-slate-500'}`}>
        Metric
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isImperial}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-orange-500 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            isImperial ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      <span className={`text-sm font-medium ${isImperial ? 'text-orange-500' : 'text-gray-400 dark:text-slate-500'}`}>
        Imperial
      </span>
    </div>
  );
}
