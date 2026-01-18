'use client';

import { Badge } from '@/components/ui';
import { ElevationProfile } from './ElevationProfile';
import { formatTime, getVAMCategory, kmToMi, mToFt, kmhToMph } from '@/lib/calculations';
import type { Climb, ClimbResult, UnitSystem } from '@/lib/types';

interface ClimbInfoCardProps {
  climb: Climb | null;
  climbResult: ClimbResult | null;
  isCustom: boolean;
  isComplete: boolean;
  unitSystem: UnitSystem;
}

export function ClimbInfoCard({
  climb,
  climbResult,
  isCustom,
  isComplete,
  unitSystem
}: ClimbInfoCardProps) {
  const isImperial = unitSystem === 'imperial';
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
            {isComplete ? (isImperial ? kmToMi(climb.distance).toFixed(1) : climb.distance.toFixed(1)) : '—'}
          </div>
          <div className="text-xs text-gray-500 dark:text-slate-400">{isImperial ? 'mi' : 'km'}</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {isComplete ? Math.round(isImperial ? mToFt(climb.elevation) : climb.elevation).toLocaleString() : '—'}
          </div>
          <div className="text-xs text-gray-500 dark:text-slate-400">{isImperial ? 'ft' : 'm'} elevation</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {isComplete ? climb.gradient.toFixed(1) : '—'}
          </div>
          <div className="text-xs text-gray-500 dark:text-slate-400">% avg gradient</div>
        </div>
      </div>

      {/* Elevation Profile with Altitude Effects */}
      {climb.profile && climb.profile.length >= 2 && (
        <div className="mb-6">
          <ElevationProfile
            profile={climb.profile}
            profileData={climbResult?.profileData}
            unitSystem={unitSystem}
          />
        </div>
      )}

      {/* Estimated Time Result */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-600">
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-slate-400 mb-1">Estimated Time</div>
          <div className="text-4xl font-bold text-orange-600 dark:text-orange-500">
            {climbResult && isComplete ? formatTime(climbResult.timeSeconds) : '—:—:—'}
          </div>
          {climbResult && isComplete && (
            <div className="text-sm text-gray-500 dark:text-slate-400 mt-1">
              Avg speed: {isImperial
                ? kmhToMph(climbResult.avgSpeedKmh).toFixed(1)
                : climbResult.avgSpeedKmh.toFixed(1)} {isImperial ? 'mph' : 'km/h'}
            </div>
          )}
        </div>

        {/* VAM Display */}
        {climbResult && isComplete && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-slate-600">
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-gray-600 dark:text-slate-400">VAM:</span>
              <span className={`text-lg font-semibold ${getVAMCategory(climbResult.vam).textClass}`}>
                {Math.round(isImperial ? mToFt(climbResult.vam) : climbResult.vam).toLocaleString()} {isImperial ? 'ft' : 'm'}/h
              </span>
              <span className="text-xs text-gray-500 dark:text-slate-400">
                ({getVAMCategory(climbResult.vam).label})
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
