'use client';

import type { WeightUnit } from '@/lib/types';

interface UnitToggleProps {
  unit: WeightUnit;
  onChange: (unit: WeightUnit) => void;
}

export function UnitToggle({ unit, onChange }: UnitToggleProps) {
  const isLb = unit === 'lb';

  const handleToggle = () => {
    onChange(isLb ? 'kg' : 'lb');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`text-sm font-medium ${!isLb ? 'text-orange-500' : 'text-gray-400 dark:text-slate-500'}`}>
        kg
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isLb}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-orange-500 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            isLb ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      <span className={`text-sm font-medium ${isLb ? 'text-orange-500' : 'text-gray-400 dark:text-slate-500'}`}>
        lb
      </span>
    </div>
  );
}
