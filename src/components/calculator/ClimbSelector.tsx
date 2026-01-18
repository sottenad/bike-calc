'use client';

import { GroupedSelect } from '@/components/ui';
import { getClimbsByCategory, CATEGORY_LABELS } from '@/lib/data/climbs';
import type { ClimbCategory } from '@/lib/types';

interface ClimbSelectorProps {
  selectedClimbId: string;
  onChange: (climbId: string) => void;
}

export function ClimbSelector({ selectedClimbId, onChange }: ClimbSelectorProps) {
  // Build groups by difficulty category
  const categories: ClimbCategory[] = ['HC', 'Cat 1', 'Cat 2'];

  const categoryGroups = categories.map(category => ({
    label: CATEGORY_LABELS[category],
    options: getClimbsByCategory(category).map(climb => ({
      value: climb.id,
      label: `${climb.name} (${climb.location.split(',')[0]})`
    }))
  })).filter(group => group.options.length > 0);

  const groups = [
    ...categoryGroups,
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
