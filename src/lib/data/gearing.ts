// Simplified gearing data - popular chainring and cassette options

export interface Chainring {
  id: string;
  label: string;
  teeth: number[];
}

export interface Cassette {
  id: string;
  label: string;
  cogs: number[];
}

// Popular chainring options (last 5 years)
export const CHAINRINGS: Chainring[] = [
  { id: '53-39', label: '53/39 (Standard)', teeth: [53, 39] },
  { id: '52-36', label: '52/36 (Semi-Compact)', teeth: [52, 36] },
  { id: '50-34', label: '50/34 (Compact)', teeth: [50, 34] },
  { id: '48-32', label: '48/32 (Sub-Compact)', teeth: [48, 32] },
  { id: '46-30', label: '46/30 (Gravel)', teeth: [46, 30] },
];

// Popular cassette options (last 5 years)
// Includes both 11-speed and 12-speed common configurations
export const CASSETTES: Cassette[] = [
  {
    id: '11-25',
    label: '11-25 (Racing)',
    cogs: [11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25]
  },
  {
    id: '11-28',
    label: '11-28 (All-Round)',
    cogs: [11, 12, 13, 14, 15, 17, 19, 21, 23, 25, 28]
  },
  {
    id: '11-30',
    label: '11-30 (Climbing)',
    cogs: [11, 12, 13, 14, 15, 16, 17, 19, 21, 24, 27, 30]
  },
  {
    id: '11-32',
    label: '11-32 (Wide Range)',
    cogs: [11, 12, 13, 14, 16, 18, 20, 22, 25, 28, 32]
  },
  {
    id: '11-34',
    label: '11-34 (Wide Climbing)',
    cogs: [11, 12, 13, 14, 15, 17, 19, 21, 24, 27, 30, 34]
  },
  {
    id: '11-36',
    label: '11-36 (Extended)',
    cogs: [11, 12, 13, 14, 15, 17, 19, 21, 24, 28, 32, 36]
  },
  {
    id: '10-33',
    label: '10-33 (SRAM Wide)',
    cogs: [10, 11, 12, 13, 14, 15, 17, 19, 21, 24, 28, 33]
  },
  {
    id: '11-42',
    label: '11-42 (Gravel)',
    cogs: [11, 13, 15, 17, 19, 21, 24, 28, 32, 37, 42]
  },
  {
    id: '11-51',
    label: '11-51 (Gravel Wide)',
    cogs: [11, 13, 15, 17, 19, 21, 24, 28, 33, 39, 45, 51]
  },
];

// Helper functions
export function getChainringById(id: string): Chainring | undefined {
  return CHAINRINGS.find(c => c.id === id);
}

export function getCassetteById(id: string): Cassette | undefined {
  return CASSETTES.find(c => c.id === id);
}

// Default selections
export const DEFAULT_CHAINRING_ID = '50-34';
export const DEFAULT_CASSETTE_ID = '11-34';
