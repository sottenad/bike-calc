import type { ChainringOption } from '../types';

export const CHAINRINGS: Record<string, number[]> = {
  '53-39': [53, 39],
  '52-36': [52, 36],
  '50-34': [50, 34],
  '48-35': [48, 35],
  '48-32': [48, 32],
  '46-33': [46, 33],
  '46-30': [46, 30],
  '42-32': [42, 32],
  '40-40': [40]
};

export const CHAINRING_OPTIONS: ChainringOption[] = [
  { id: '53-39', label: '53/39 (Standard)', teeth: [53, 39] },
  { id: '52-36', label: '52/36 (Semi-Compact)', teeth: [52, 36] },
  { id: '50-34', label: '50/34 (Compact)', teeth: [50, 34] },
  { id: '48-35', label: '48/35', teeth: [48, 35] },
  { id: '48-32', label: '48/32 (Gravel)', teeth: [48, 32] },
  { id: '46-33', label: '46/33', teeth: [46, 33] },
  { id: '46-30', label: '46/30 (Gravel)', teeth: [46, 30] },
  { id: '42-32', label: '42/32 (Gravel)', teeth: [42, 32] },
  { id: '40-40', label: '40 (1x)', teeth: [40] }
];
