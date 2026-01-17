'use client';

import type { GearAnalysis } from '@/lib/types';

interface GearTableProps {
  gears: GearAnalysis[];
  showTooFast: boolean;
  showTooSlow: boolean;
  tooFastCount: number;
  tooSlowCount: number;
  onToggleTooFast: () => void;
  onToggleTooSlow: () => void;
}

export function GearTable({
  gears,
  showTooFast,
  showTooSlow,
  tooFastCount,
  tooSlowCount,
  onToggleTooFast,
  onToggleTooSlow
}: GearTableProps) {
  // Split gears into categories
  const tooFastGears = gears.filter(g => g.status.status === 'too-fast');
  const idealOkGears = gears.filter(g => g.status.status === 'ideal' || g.status.status === 'ok');
  const tooSlowGears = gears.filter(g => g.status.status === 'too-slow');

  const renderRow = (gear: GearAnalysis, isFaded: boolean = false) => (
    <tr
      key={`${gear.chainring}-${gear.cog}`}
      className={`border-b border-gray-100 hover:bg-gray-50 ${isFaded ? 'opacity-50' : ''}`}
    >
      <td className="py-2 px-4 text-left font-medium">
        {gear.chainring}×{gear.cog}
      </td>
      <td className="py-2 px-4 text-center">{gear.ratio.toFixed(2)}</td>
      <td className="py-2 px-4 text-center">{gear.gearInches.toFixed(1)}&quot;</td>
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

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Gear</th>
            <th className="py-2 px-4 text-center text-sm font-medium text-gray-500">Ratio</th>
            <th className="py-2 px-4 text-center text-sm font-medium text-gray-500">Gear Inches</th>
            <th className="py-2 px-4 text-center text-sm font-medium text-gray-500">RPM Needed</th>
            <th className="py-2 px-4 text-center text-sm font-medium text-gray-500">Status</th>
          </tr>
        </thead>

        {/* Too Fast Gears */}
        {tooFastCount > 0 && (
          <tbody className={showTooFast ? '' : 'hidden'}>
            {tooFastGears.map(gear => renderRow(gear, true))}
          </tbody>
        )}

        {/* Ideal and OK Gears */}
        <tbody>
          {idealOkGears.map(gear => renderRow(gear, false))}
        </tbody>

        {/* Too Slow Gears */}
        {tooSlowCount > 0 && (
          <tbody className={showTooSlow ? '' : 'hidden'}>
            {tooSlowGears.map(gear => renderRow(gear, true))}
          </tbody>
        )}
      </table>

      {/* Show/Hide Buttons */}
      <div className="flex justify-center gap-4 mt-4">
        {tooFastCount > 0 && (
          <button
            onClick={onToggleTooFast}
            className="text-xs px-3 py-1.5 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            {showTooFast ? 'Hide' : 'Show'} {tooFastCount} too-fast gear{tooFastCount !== 1 ? 's' : ''}
          </button>
        )}
        {tooSlowCount > 0 && (
          <button
            onClick={onToggleTooSlow}
            className="text-xs px-3 py-1.5 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            {showTooSlow ? 'Hide' : 'Show'} {tooSlowCount} too-slow gear{tooSlowCount !== 1 ? 's' : ''}
          </button>
        )}
      </div>
    </div>
  );
}
