'use client';

import { Collapsible, Select } from '@/components/ui';
import { SmallCollapsible } from '@/components/ui/Collapsible';
import { CHAINRING_OPTIONS } from '@/lib/data/chainrings';
import { CASSETTE_OPTIONS } from '@/lib/data/cassettes';
import { GearTable } from './GearTable';
import { GearLegend } from './GearLegend';
import type { GearAnalysis } from '@/lib/types';

interface GearingSectionProps {
  speedKmh: number;
  selectedChainringId: string;
  selectedCassetteId: string;
  gearAnalysis: GearAnalysis[];
  showTooFast: boolean;
  showTooSlow: boolean;
  onChainringChange: (id: string) => void;
  onCassetteChange: (id: string) => void;
  onToggleTooFast: () => void;
  onToggleTooSlow: () => void;
}

export function GearingSection({
  speedKmh,
  selectedChainringId,
  selectedCassetteId,
  gearAnalysis,
  showTooFast,
  showTooSlow,
  onChainringChange,
  onCassetteChange,
  onToggleTooFast,
  onToggleTooSlow
}: GearingSectionProps) {
  const chainringOptions = CHAINRING_OPTIONS.map(c => ({ value: c.id, label: c.label }));
  const cassetteOptions = CASSETTE_OPTIONS.map(c => ({ value: c.id, label: c.label }));

  // Count gears by status
  const tooFastCount = gearAnalysis.filter(g => g.status.status === 'too-fast').length;
  const tooSlowCount = gearAnalysis.filter(g => g.status.status === 'too-slow').length;

  return (
    <Collapsible title="Gearing Analysis" defaultOpen={true}>
      {/* Dropdowns */}
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
          <p className="text-sm text-gray-600 mb-4">
            At your estimated speed of <span className="font-medium text-gray-900">{speedKmh.toFixed(1)} km/h</span>,
            here&apos;s how each gear in your small chainring would perform:
          </p>

          {/* Gear Table */}
          <GearTable
            gears={gearAnalysis}
            showTooFast={showTooFast}
            showTooSlow={showTooSlow}
            tooFastCount={tooFastCount}
            tooSlowCount={tooSlowCount}
            onToggleTooFast={onToggleTooFast}
            onToggleTooSlow={onToggleTooSlow}
          />

          {/* Legend */}
          <GearLegend />

          {/* Gear Inches Explainer */}
          <SmallCollapsible title="What are gear inches?">
            <p className="mb-2">
              Gear inches is a traditional measure of bicycle gearing that represents the equivalent
              diameter of a directly-driven wheel (like a penny-farthing).
            </p>
            <div className="bg-gray-100 rounded p-2 font-mono text-sm mb-2">
              Gear Inches = (Chainring ÷ Cog) × Wheel Diameter
            </div>
            <p>
              Lower gear inches = easier pedaling (good for climbing).
              Higher gear inches = harder pedaling (good for speed on flat ground).
            </p>
          </SmallCollapsible>
        </>
      ) : (
        <p className="text-sm text-gray-500 text-center py-4">
          Select a climb or enter custom climb details to see gearing analysis
        </p>
      )}
    </Collapsible>
  );
}
