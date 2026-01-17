'use client';

import { SimpleNumberInput } from '@/components/ui';

interface CustomClimbFormProps {
  distance: number | null;
  elevation: number | null;
  gradient: number | null;
  onFieldChange: (field: 'distance' | 'elevation' | 'gradient', value: number | null) => void;
}

export function CustomClimbForm({
  distance,
  elevation,
  gradient,
  onFieldChange
}: CustomClimbFormProps) {
  return (
    <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
      <p className="text-sm text-blue-700 mb-4">
        Enter any two values and the third will be calculated automatically.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SimpleNumberInput
          id="customDistance"
          label="Distance"
          value={distance}
          onChange={(val) => onFieldChange('distance', val)}
          suffix="km"
          min={0.1}
          max={200}
          step={0.1}
          placeholder="e.g., 13.8"
        />
        <SimpleNumberInput
          id="customElevation"
          label="Elevation Gain"
          value={elevation}
          onChange={(val) => onFieldChange('elevation', val)}
          suffix="m"
          min={1}
          max={5000}
          step={1}
          placeholder="e.g., 1122"
        />
        <SimpleNumberInput
          id="customGradient"
          label="Avg Gradient"
          value={gradient}
          onChange={(val) => onFieldChange('gradient', val)}
          suffix="%"
          min={0.1}
          max={30}
          step={0.1}
          placeholder="e.g., 8.1"
        />
      </div>
    </div>
  );
}
