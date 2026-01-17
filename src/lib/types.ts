// Climb Types
export interface Climb {
  id: string;
  name: string;
  location: string;
  distance: number;    // kilometers
  elevation: number;   // meters gained
  gradient: number;    // percentage (e.g., 8.1 for 8.1%)
  category: string;    // "HC", "Cat 1", "Cat 2", etc. or "Custom"
}

// Gearing Types
export interface ChainringOption {
  id: string;
  label: string;
  teeth: number[];
}

export interface CassetteOption {
  id: string;
  label: string;
  cogs: number[];
}

// Calculation Result Types
export interface ClimbResult {
  timeSeconds: number;
  avgSpeedKmh: number;
  velocity: number;  // m/s
}

// RPM Status Types
export type RpmStatus = 'ideal' | 'ok' | 'too-slow' | 'too-fast';

export interface RpmStatusInfo {
  status: RpmStatus;
  label: string;
  textClass: string;
  bgClass: string;
}

// Gear Analysis Types
export interface GearAnalysis {
  chainring: number;
  cog: number;
  ratio: number;
  gearInches: number;
  rpm: number;
  status: RpmStatusInfo;
}

// Power Category Types
export interface PowerCategory {
  minWkg: number;
  label: string;
}

// State Types
export type WeightUnit = 'kg' | 'lb';

export interface CustomClimbState {
  distance: number | null;
  elevation: number | null;
  gradient: number | null;
}

export interface CalculatorState {
  unit: WeightUnit;
  riderWeight: number;
  bikeWeight: number;
  power: number;
  selectedClimbId: string;
  customClimb: CustomClimbState;
  selectedChainringId: string;
  selectedCassetteId: string;
}

export interface CalculatorDerived {
  riderWeightKg: number;
  bikeWeightKg: number;
  totalMassKg: number;
  powerToWeight: number;
  powerCategory: string;
  selectedClimb: Climb | null;
  climbResult: ClimbResult | null;
  gearAnalysis: GearAnalysis[];
  avgSpeedKmh: number;
}

// Action Types
export type CalculatorAction =
  | { type: 'SET_UNIT'; unit: WeightUnit }
  | { type: 'SET_RIDER_WEIGHT'; weight: number }
  | { type: 'SET_BIKE_WEIGHT'; weight: number }
  | { type: 'SET_POWER'; power: number }
  | { type: 'SET_CLIMB'; climbId: string }
  | { type: 'SET_CUSTOM_CLIMB_FIELD'; field: 'distance' | 'elevation' | 'gradient'; value: number | null }
  | { type: 'SET_CHAINRING'; id: string }
  | { type: 'SET_CASSETTE'; id: string };
