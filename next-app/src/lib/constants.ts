import type { PowerCategory } from './types';

// Physics Constants
export const PHYSICS = {
  GRAVITY: 9.81,           // m/s² - gravitational acceleration
  CRR: 0.004,              // Rolling resistance coefficient (good road surface)
  CDA: 0.35,               // Aerodynamic drag area in m² (climbing on hoods)
  RHO: 1.2,                // Air density in kg/m³ (sea level)
  EFFICIENCY: 0.97,        // Drivetrain efficiency (97%)
  WHEEL_DIAMETER: 27       // inches (700c with 25mm tire, for gear inch calculation)
} as const;

// RPM Thresholds
export const RPM_THRESHOLDS = {
  IDEAL_MIN: 70,
  IDEAL_MAX: 95,
  OK_MIN: 60,
  OK_MAX: 110
} as const;

// Power Categories
export const POWER_CATEGORIES: PowerCategory[] = [
  { minWkg: 6.0, label: "World-class professional" },
  { minWkg: 5.0, label: "Professional / Elite" },
  { minWkg: 4.0, label: "Very strong amateur / Cat 1-2" },
  { minWkg: 3.5, label: "Strong amateur / Cat 3" },
  { minWkg: 3.0, label: "Good fitness / Cat 4-5" },
  { minWkg: 2.5, label: "Recreational rider" },
  { minWkg: 0, label: "Beginner" }
];

// Default State Values
export const DEFAULTS = {
  RIDER_WEIGHT_KG: 70,
  BIKE_WEIGHT_KG: 8,
  POWER_WATTS: 200,
  CLIMB_ID: 'alpe-dhuez',
  CHAINRING_ID: '50-34',
  CASSETTE_ID: '11-34'
} as const;

// Unit Conversion Factors
export const CONVERSIONS = {
  LB_TO_KG: 0.453592,
  KG_TO_LB: 2.20462,
  MPS_TO_KMH: 3.6,
  KMH_TO_MPH: 0.621371,
  INCHES_PER_MILE: 63360
} as const;
