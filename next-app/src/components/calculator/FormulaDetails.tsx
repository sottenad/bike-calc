'use client';

import { SmallCollapsible } from '@/components/ui';
import { PHYSICS } from '@/lib/constants';
import type { Climb, ClimbResult } from '@/lib/types';

interface FormulaDetailsProps {
  riderWeight: number;
  bikeWeight: number;
  power: number;
  powerToWeight: number;
  climb: Climb | null;
  climbResult: ClimbResult | null;
}

export function FormulaDetails({
  riderWeight,
  bikeWeight,
  power,
  powerToWeight,
  climb,
  climbResult
}: FormulaDetailsProps) {
  return (
    <SmallCollapsible title="How are these calculated?">
      <div className="space-y-6">
        {/* Power-to-Weight Formula */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Power-to-Weight Ratio</h4>
          <div className="bg-gray-100 rounded p-3 font-mono text-sm">
            W/kg = Power (W) ÷ Rider Mass (kg)
          </div>
          <div className="mt-2 text-sm">
            Your calculation: <span className="font-medium">{power}W ÷ {riderWeight}kg = </span>
            <span className="text-orange-600 font-medium">{powerToWeight.toFixed(2)} W/kg</span>
          </div>
        </div>

        {/* Climb Time Formula */}
        {climb && climbResult && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Climb Time Calculation</h4>
            <div className="bg-gray-100 rounded p-3 font-mono text-sm">
              Power × η = v × (F<sub>gravity</sub> + F<sub>rolling</sub> + F<sub>aero</sub>)
            </div>
            <div className="mt-2 text-sm space-y-1">
              <p>Where:</p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>η = Drivetrain efficiency ({(PHYSICS.EFFICIENCY * 100).toFixed(0)}%)</li>
                <li>F<sub>gravity</sub> = m × g × sin(θ) = gravity component</li>
                <li>F<sub>rolling</sub> = C<sub>rr</sub> × m × g × cos(θ) = rolling resistance</li>
                <li>F<sub>aero</sub> = 0.5 × CdA × ρ × v² = aerodynamic drag</li>
              </ul>
              <p className="mt-2">
                Total mass: <span className="font-medium">{riderWeight + bikeWeight} kg</span>
                {' '}(rider {riderWeight} + bike {bikeWeight})
              </p>
              <p>
                Result: <span className="font-medium">{climbResult.avgSpeedKmh.toFixed(1)} km/h</span> average speed
              </p>
            </div>
          </div>
        )}

        {/* Assumptions */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Assumptions</h4>
          <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
            <li>Rolling resistance coefficient: {PHYSICS.CRR} (good road surface)</li>
            <li>Aerodynamic drag area: {PHYSICS.CDA} m² (climbing position)</li>
            <li>Air density: {PHYSICS.RHO} kg/m³ (sea level)</li>
            <li>Drivetrain efficiency: {(PHYSICS.EFFICIENCY * 100).toFixed(0)}% (clean chain)</li>
            <li>Constant power output throughout climb</li>
            <li>No wind (still air)</li>
          </ul>
        </div>
      </div>
    </SmallCollapsible>
  );
}
