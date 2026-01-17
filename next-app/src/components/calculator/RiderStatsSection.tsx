'use client';

import { Card, CardTitle, NumberInput, UnitToggle } from '@/components/ui';
import type { WeightUnit } from '@/lib/types';

interface RiderStatsSectionProps {
  unit: WeightUnit;
  riderWeight: number;
  bikeWeight: number;
  power: number;
  powerToWeight: number;
  powerCategory: string;
  onUnitChange: (unit: WeightUnit) => void;
  onRiderWeightChange: (weight: number) => void;
  onBikeWeightChange: (weight: number) => void;
  onPowerChange: (power: number) => void;
}

export function RiderStatsSection({
  unit,
  riderWeight,
  bikeWeight,
  power,
  powerToWeight,
  powerCategory,
  onUnitChange,
  onRiderWeightChange,
  onBikeWeightChange,
  onPowerChange
}: RiderStatsSectionProps) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <CardTitle className="mb-0">Rider Stats</CardTitle>
        <UnitToggle unit={unit} onChange={onUnitChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NumberInput
          id="riderWeight"
          label="Rider Weight"
          value={riderWeight}
          onChange={onRiderWeightChange}
          suffix={unit}
          min={30}
          max={200}
          step={0.1}
        />
        <NumberInput
          id="bikeWeight"
          label="Bike Weight"
          value={bikeWeight}
          onChange={onBikeWeightChange}
          suffix={unit}
          min={3}
          max={30}
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
      <div className="mt-6 bg-orange-50 rounded-lg p-4 border border-orange-200">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-600">Power-to-Weight</span>
            <div className="text-2xl font-bold text-orange-600">
              {powerToWeight.toFixed(2)} W/kg
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-600">Category</span>
            <div className="text-sm font-medium text-gray-900">{powerCategory}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
