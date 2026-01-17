'use client';

import type { GearAnalysis } from '@/lib/types';

interface GearTableProps {
  gears: GearAnalysis[];
}

export function GearTable({ gears }: GearTableProps) {
  const renderRow = (gear: GearAnalysis) => {
    const isExtreme = gear.status.status === 'too-fast' || gear.status.status === 'too-slow';

    return (
      <tr
        key={`${gear.chainring}-${gear.cog}`}
        className={`border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 ${isExtreme ? 'opacity-50' : ''}`}
      >
        <td className="py-2 px-4 text-left font-medium text-gray-900 dark:text-white">
          {gear.chainring}×{gear.cog}
        </td>
        <td className="py-2 px-4 text-center text-gray-700 dark:text-slate-300">{gear.ratio.toFixed(2)}</td>
        <td className="py-2 px-4 text-center text-gray-700 dark:text-slate-300">{gear.gearInches.toFixed(1)}&quot;</td>
        <td className={`py-2 px-4 text-center font-medium ${gear.status.textClass}`}>
          {Math.round(gear.rpm)}
        </td>
        <td className="py-2 px-4 text-center">
          <span className="flex items-center justify-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${gear.status.bgClass}`} />
            <span className={`text-sm ${gear.status.textClass}`}>{gear.status.label}</span>
          </span>
        </td>
      </tr>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-slate-600">
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-500 dark:text-slate-400">Gear</th>
            <th className="py-2 px-4 text-center text-sm font-medium text-gray-500 dark:text-slate-400">Ratio</th>
            <th className="py-2 px-4 text-center text-sm font-medium text-gray-500 dark:text-slate-400">Gear Inches</th>
            <th className="py-2 px-4 text-center text-sm font-medium text-gray-500 dark:text-slate-400">RPM Needed</th>
            <th className="py-2 px-4 text-center text-sm font-medium text-gray-500 dark:text-slate-400">Status</th>
          </tr>
        </thead>
        <tbody>
          {gears.map(gear => renderRow(gear))}
        </tbody>
      </table>
    </div>
  );
}
