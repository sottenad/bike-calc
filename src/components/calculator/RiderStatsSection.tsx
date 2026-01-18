'use client';

import { Card, CardTitle, NumberInput, UnitToggle } from '@/components/ui';
import type { UnitSystem } from '@/lib/types';
import { kgToLb, lbToKg } from '@/lib/calculations';

interface RiderStatsSectionProps {
  unitSystem: UnitSystem;
  riderWeightKg: number;  // Internal weight in kg
  bikeWeightKg: number;   // Internal weight in kg
  power: number;
  powerToWeight: number;
  powerCategory: string;
  onUnitSystemChange: (unitSystem: UnitSystem) => void;
  onRiderWeightChange: (weightKg: number) => void;  // Expects kg
  onBikeWeightChange: (weightKg: number) => void;   // Expects kg
  onPowerChange: (power: number) => void;
}

export function RiderStatsSection({
  unitSystem,
  riderWeightKg,
  bikeWeightKg,
  power,
  powerToWeight,
  powerCategory,
  onUnitSystemChange,
  onRiderWeightChange,
  onBikeWeightChange,
  onPowerChange
}: RiderStatsSectionProps) {
  const isImperial = unitSystem === 'imperial';
  const weightSuffix = isImperial ? 'lb' : 'kg';

  // Convert display values based on unit system
  const displayRiderWeight = isImperial ? kgToLb(riderWeightKg) : riderWeightKg;
  const displayBikeWeight = isImperial ? kgToLb(bikeWeightKg) : bikeWeightKg;

  // Handle weight changes - convert to kg before passing up
  const handleRiderWeightChange = (displayWeight: number) => {
    const weightKg = isImperial ? lbToKg(displayWeight) : displayWeight;
    onRiderWeightChange(weightKg);
  };

  const handleBikeWeightChange = (displayWeight: number) => {
    const weightKg = isImperial ? lbToKg(displayWeight) : displayWeight;
    onBikeWeightChange(weightKg);
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <CardTitle className="mb-0">Rider Stats</CardTitle>
        <UnitToggle unitSystem={unitSystem} onChange={onUnitSystemChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NumberInput
          id="riderWeight"
          label="Rider Weight"
          value={Math.round(displayRiderWeight * 10) / 10}
          onChange={handleRiderWeightChange}
          suffix={weightSuffix}
          min={isImperial ? 66 : 30}
          max={isImperial ? 440 : 200}
          step={0.1}
        />
        <NumberInput
          id="bikeWeight"
          label="Bike Weight"
          value={Math.round(displayBikeWeight * 10) / 10}
          onChange={handleBikeWeightChange}
          suffix={weightSuffix}
          min={isImperial ? 7 : 3}
          max={isImperial ? 66 : 30}
          step={0.1}
        />
        <NumberInput
          id="power"
          label="Sustained Power"
          value={power}
          onChange={onPowerChange}
          suffix="W"
          min={50}
          max={1000}
          step={1}
        />
      </div>

      {/* Power-to-Weight Display */}
      <div className="mt-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-600 dark:text-slate-400">Power-to-Weight</span>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-500">
              {powerToWeight.toFixed(2)} W/kg
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-600 dark:text-slate-400">Category</span>
            <div className="text-sm font-medium text-gray-900 dark:text-white">{powerCategory}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
