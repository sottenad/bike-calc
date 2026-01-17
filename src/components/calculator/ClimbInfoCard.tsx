'use client';

import { Badge } from '@/components/ui';
import { formatTime } from '@/lib/calculations';
import type { Climb, ClimbResult } from '@/lib/types';

interface ClimbInfoCardProps {
  climb: Climb | null;
  climbResult: ClimbResult | null;
  isCustom: boolean;
  isComplete: boolean;
}

export function ClimbInfoCard({
  climb,
  climbResult,
  isCustom,
  isComplete
}: ClimbInfoCardProps) {
  const getBadgeVariant = (category: string): 'default' | 'hc' | 'custom' => {
    if (category === 'HC') return 'hc';
    if (category === 'Custom') return 'custom';
    return 'default';
  };

  if (!climb) {
    return (
      <div className="mt-6 bg-gray-50 dark:bg-slate-700 rounded-lg p-6 border border-gray-200 dark:border-slate-600">
        <p className="text-gray-500 dark:text-slate-400 text-center">Enter climb details above to see results</p>
      </div>
    );
  }

  return (
    <div className="mt-6 bg-gray-50 dark:bg-slate-700 rounded-lg p-6 border border-gray-200 dark:border-slate-600">
      {/* Climb Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{climb.name}</h3>
          {!isCustom && (
            <p className="text-sm text-gray-600 dark:text-slate-400">{climb.location}</p>
          )}
        </div>
        <Badge variant={getBadgeVariant(climb.category)}>{climb.category}</Badge>
      </div>

      {/* Climb Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {isComplete ? climb.distance.toFixed(1) : '—'}
          </div>
          <div className="text-xs text-gray-500 dark:text-slate-400">km</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {isComplete ? climb.elevation.toLocaleString() : '—'}
          </div>
          <div className="text-xs text-gray-500 dark:text-slate-400">m elevation</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {isComplete ? climb.gradient.toFixed(1) : '—'}
          </div>
          <div className="text-xs text-gray-500 dark:text-slate-400">% avg gradient</div>
        </div>
      </div>

      {/* Estimated Time */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-600">
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-slate-400 mb-1">Estimated Time</div>
          <div className="text-4xl font-bold text-orange-600 dark:text-orange-500">
            {climbResult && isComplete ? formatTime(climbResult.timeSeconds) : '—:—:—'}
          </div>
          {climbResult && isComplete && (
            <div className="text-sm text-gray-500 dark:text-slate-400 mt-1">
              Avg speed: {climbResult.avgSpeedKmh.toFixed(1)} km/h
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
