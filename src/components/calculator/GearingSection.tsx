'use client';

import { Collapsible, Select } from '@/components/ui';
import { SmallCollapsible } from '@/components/ui/Collapsible';
import { GearTable } from './GearTable';
import { GearLegend } from './GearLegend';
import type { GearAnalysis, UnitSystem } from '@/lib/types';
import { CHAINRINGS, CASSETTES } from '@/lib/data/gearing';
import { kmhToMph } from '@/lib/calculations';

interface GearingSectionProps {
  speedKmh: number;
  selectedChainringId: string;
  selectedCassetteId: string;
  gearAnalysis: GearAnalysis[];
  onChainringChange: (id: string) => void;
  onCassetteChange: (id: string) => void;
  unitSystem: UnitSystem;
}

export function GearingSection({
  speedKmh,
  selectedChainringId,
  selectedCassetteId,
  gearAnalysis,
  onChainringChange,
  onCassetteChange,
  unitSystem
}: GearingSectionProps) {
  const isImperial = unitSystem === 'imperial';
  const displaySpeed = isImperial ? kmhToMph(speedKmh) : speedKmh;
  const speedUnit = isImperial ? 'mph' : 'km/h';
  // Build options for dropdowns
  const chainringOptions = CHAINRINGS.map(c => ({ value: c.id, label: c.label }));
  const cassetteOptions = CASSETTES.map(c => ({ value: c.id, label: c.label }));

  return (
    <Collapsible title="Gearing Analysis" defaultOpen={true}>
      {/* 2 Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Select
          id="chainring"
          label="Chainring"
          value={selectedChainringId}
          onChange={onChainringChange}
          options={chainringOptions}
        />
        <Select
          id="cassette"
          label="Cassette"
          value={selectedCassetteId}
          onChange={onCassetteChange}
          options={cassetteOptions}
        />
      </div>

      {/* Context text */}
      {speedKmh > 0 ? (
        <>
          <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">
            At your estimated speed of <span className="font-medium text-gray-900 dark:text-white">{displaySpeed.toFixed(1)} {speedUnit}</span>,
            here&apos;s how each gear in your small chainring would perform:
          </p>

          {/* Gear Table */}
          <GearTable gears={gearAnalysis} />

          {/* Legend */}
          <GearLegend />

          {/* Gear Inches Explainer */}
          <SmallCollapsible title="What are gear inches?">
            <p className="mb-2">
              Gear inches is a traditional measure of bicycle gearing that represents the equivalent
              diameter of a directly-driven wheel (like a penny-farthing).
            </p>
            <div className="bg-gray-100 dark:bg-slate-600 rounded p-2 font-mono text-sm mb-2">
              Gear Inches = (Chainring ÷ Cog) × Wheel Diameter
            </div>
            <p>
              Lower gear inches = easier pedaling (good for climbing).
              Higher gear inches = harder pedaling (good for speed on flat ground).
            </p>
          </SmallCollapsible>
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-slate-400 text-center py-4">
          Select a climb or enter custom climb details to see gearing analysis
        </p>
      )}
    </Collapsible>
  );
}
