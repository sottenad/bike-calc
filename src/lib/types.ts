// Climb Types
export type ClimbCategory = 'HC' | 'Cat 1' | 'Cat 2' | 'Cat 3' | 'Custom';

export interface ElevationPoint {
  distance: number;    // km from start
  elevation: number;   // meters
  gradient: number;    // percentage at this segment
}

export interface Climb {
  id: string;
  name: string;
  location: string;
  distance: number;    // kilometers
  elevation: number;   // meters gained
  gradient: number;    // average percentage (e.g., 8.1 for 8.1%)
  category: ClimbCategory;
  profile?: ElevationPoint[];  // elevation profile data (optional for custom climbs)
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

// Profile point with altitude effects data
export interface ProfilePointData {
  distance: number;      // km from start
  elevation: number;     // meters
  gradient: number;      // percentage
  oxygenPercent: number; // % of sea level O2
  powerPercent: number;  // % of sea level power available
  effectivePower: number; // actual watts at this elevation
  speedKmh: number;      // speed at this segment in km/h
}

// Calculation Result Types
export interface ClimbResult {
  timeSeconds: number;
  avgSpeedKmh: number;
  velocity: number;  // m/s
  vam: number;       // Vertical Ascent Meters per hour
  profileData?: ProfilePointData[]; // altitude effects at each profile point
  avgPowerPercent?: number; // average power available across the climb
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
export type UnitSystem = 'metric' | 'imperial';

export interface CustomClimbState {
  distance: number | null;
  elevation: number | null;
  gradient: number | null;
}

export interface CalculatorState {
  unitSystem: UnitSystem;
  riderWeight: number;    // stored in kg internally
  bikeWeight: number;     // stored in kg internally
  power: number;
  selectedClimbId: string;
  customClimb: CustomClimbState;
  selectedChainringId: string;
  selectedCassetteId: string;
  altitude: number;      // meters above sea level
  temperature: number;   // Celsius
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

// VAM Category Types
export interface VamCategory {
  minVam: number;
  label: string;
  textClass: string;
}

// Action Types
export type CalculatorAction =
  | { type: 'SET_UNIT_SYSTEM'; unitSystem: UnitSystem }
  | { type: 'SET_RIDER_WEIGHT'; weight: number }
  | { type: 'SET_BIKE_WEIGHT'; weight: number }
  | { type: 'SET_POWER'; power: number }
  | { type: 'SET_CLIMB'; climbId: string }
  | { type: 'SET_CUSTOM_CLIMB_FIELD'; field: 'distance' | 'elevation' | 'gradient'; value: number | null }
  | { type: 'SET_CHAINRING'; id: string }
  | { type: 'SET_CASSETTE'; id: string }
  | { type: 'SET_ALTITUDE'; altitude: number }
  | { type: 'SET_TEMPERATURE'; temperature: number };
