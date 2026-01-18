'use client';

import { Collapsible, NumberInput } from '@/components/ui';

interface EnvironmentalSectionProps {
  altitude: number;
  temperature: number;
  airDensity: number;
  altitudePowerPercent: number;
  oxygenPercent: number;
  onAltitudeChange: (altitude: number) => void;
  onTemperatureChange: (temperature: number) => void;
}

export function EnvironmentalSection({
  altitude,
  temperature,
  airDensity,
  altitudePowerPercent,
  oxygenPercent,
  onAltitudeChange,
  onTemperatureChange
}: EnvironmentalSectionProps) {
  // Compare to sea level density (1.225 kg/m³ at 15°C)
  const seaLevelDensity = 1.225;
  const densityDiff = ((airDensity - seaLevelDensity) / seaLevelDensity) * 100;
  const powerLoss = 100 - altitudePowerPercent;
  const oxygenLoss = 100 - oxygenPercent;

  // Determine severity for color coding
  const getPowerLossColor = (loss: number) => {
    if (loss < 2) return 'text-green-600 dark:text-green-400';
    if (loss < 5) return 'text-yellow-600 dark:text-yellow-400';
    if (loss < 10) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <Collapsible title="Environmental Conditions" defaultOpen={false}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NumberInput
          id="altitude"
          label="Altitude"
          value={altitude}
          onChange={onAltitudeChange}
          suffix="m"
          min={0}
          max={5000}
          step={100}
        />
        <NumberInput
          id="temperature"
          label="Temperature"
          value={temperature}
          onChange={onTemperatureChange}
          suffix="°C"
          min={-10}
          max={45}
          step={1}
        />
      </div>

      {/* Oxygen & Power Impact - PRIMARY DISPLAY */}
      {altitude > 0 && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-semibold text-red-800 dark:text-red-300">Altitude Effects on Performance</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-slate-400 mb-1">Oxygen Available</div>
              <div className={`text-2xl font-bold ${getPowerLossColor(oxygenLoss)}`}>
                {oxygenPercent.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500 dark:text-slate-500">of sea level</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-slate-400 mb-1">Power Output</div>
              <div className={`text-2xl font-bold ${getPowerLossColor(powerLoss)}`}>
                {altitudePowerPercent.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500 dark:text-slate-500">of sea level</div>
            </div>
          </div>

          <p className="text-sm text-red-700 dark:text-red-300">
            <strong>Power loss: {powerLoss.toFixed(1)}%</strong> — At {altitude.toLocaleString()}m, reduced oxygen partial pressure
            limits VO₂max and sustainable power output. This is the primary factor slowing climbers at altitude.
          </p>
          <p className="text-xs text-gray-600 dark:text-slate-400 mt-2 italic">
            Based on Bassett et al. (1999) research for non-acclimatized athletes. Acclimatized athletes may see smaller reductions.
          </p>
        </div>
      )}

      {/* Air Density Display - SECONDARY */}
      <div className={`${altitude > 0 ? 'mt-3' : 'mt-4'} p-3 bg-gray-50 dark:bg-slate-700 rounded-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-600 dark:text-slate-400">Air Density</span>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {airDensity.toFixed(3)} kg/m³
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-600 dark:text-slate-400">vs Sea Level</span>
            <div className={`text-sm font-medium ${densityDiff < 0 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
              {densityDiff > 0 ? '+' : ''}{densityDiff.toFixed(1)}%
            </div>
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">
          Lower air density reduces aerodynamic drag — a minor benefit (~{Math.abs(densityDiff * 0.3).toFixed(1)}% time saved on moderate grades)
          that is far outweighed by the oxygen deficit above.
        </p>
      </div>
    </Collapsible>
  );
}
