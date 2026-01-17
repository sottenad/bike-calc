'use client';

import { GroupedSelect } from '@/components/ui';
import { CLIMB_OPTIONS } from '@/lib/data/climbs';

interface ClimbSelectorProps {
  selectedClimbId: string;
  onChange: (climbId: string) => void;
}

export function ClimbSelector({ selectedClimbId, onChange }: ClimbSelectorProps) {
  const groups = [
    {
      label: 'Famous Climbs',
      options: CLIMB_OPTIONS.map(climb => ({
        value: climb.id,
        label: `${climb.name} (${climb.location.split(',')[0]})`
      }))
    },
    {
      label: 'Custom',
      options: [
        { value: 'custom', label: 'Enter your own climb...' }
      ]
    }
  ];

  return (
    <GroupedSelect
      id="climbSelector"
      label="Select Climb"
      value={selectedClimbId}
      onChange={onChange}
      groups={groups}
    />
  );
}
