import type { Climb, ClimbResult, RpmStatusInfo, GearAnalysis } from './types';
import { PHYSICS, RPM_THRESHOLDS, POWER_CATEGORIES, CONVERSIONS } from './constants';

// ===== UNIT CONVERSIONS =====

export const lbToKg = (lb: number): number => lb * CONVERSIONS.LB_TO_KG;
export const kgToLb = (kg: number): number => kg * CONVERSIONS.KG_TO_LB;
export const mpsToKmh = (mps: number): number => mps * CONVERSIONS.MPS_TO_KMH;
export const kmhToMph = (kmh: number): number => kmh * CONVERSIONS.KMH_TO_MPH;

// ===== POWER CALCULATIONS =====

export function calculatePowerToWeight(powerWatts: number, riderMassKg: number): number {
  if (riderMassKg <= 0) return 0;
  return powerWatts / riderMassKg;
}

export function getPowerCategory(wkg: number): string {
  for (const category of POWER_CATEGORIES) {
    if (wkg >= category.minWkg) {
      return category.label;
    }
  }
  return "Beginner";
}

// ===== CLIMB TIME CALCULATION =====

export function calculateClimbTime(
  powerWatts: number,
  totalMassKg: number,
  climb: Climb
): ClimbResult {
  const distanceM = climb.distance * 1000;
  const gradientDecimal = climb.gradient / 100;
  const theta = Math.atan(gradientDecimal);

  // Effective power after drivetrain losses
  const effectivePower = powerWatts * PHYSICS.EFFICIENCY;

  // Force components (excluding aerodynamic which depends on velocity)
  const gravityForce = totalMassKg * PHYSICS.GRAVITY * Math.sin(theta);
  const rollingForce = PHYSICS.CRR * totalMassKg * PHYSICS.GRAVITY * Math.cos(theta);
  const staticForce = gravityForce + rollingForce;

  // Solve cubic equation using Newton-Raphson iteration
  let velocity = effectivePower / staticForce; // Initial guess (ignoring aero)

  for (let i = 0; i < 20; i++) {
    const aeroForce = 0.5 * PHYSICS.CDA * PHYSICS.RHO * velocity * velocity;
    const totalForce = staticForce + aeroForce;
    const powerNeeded = totalForce * velocity;

    const f = powerNeeded - effectivePower;
    const fPrime = staticForce + 1.5 * PHYSICS.CDA * PHYSICS.RHO * velocity * velocity;

    const delta = f / fPrime;
    velocity -= delta;

    if (Math.abs(delta) < 0.0001) break;
  }

  const timeSeconds = distanceM / velocity;
  const avgSpeedKmh = velocity * CONVERSIONS.MPS_TO_KMH;

  return { timeSeconds, avgSpeedKmh, velocity };
}

// ===== GEAR CALCULATIONS =====

export function calculateGearInches(chainring: number, cog: number): number {
  return (chainring / cog) * PHYSICS.WHEEL_DIAMETER;
}

export function calculateGearRatio(chainring: number, cog: number): number {
  return chainring / cog;
}

export function calculateCadence(speedKmh: number, gearInches: number): number {
  const speedMph = speedKmh * CONVERSIONS.KMH_TO_MPH;
  return (speedMph * CONVERSIONS.INCHES_PER_MILE) / (gearInches * Math.PI * 60);
}

export function getRpmStatus(rpm: number): RpmStatusInfo {
  if (rpm >= RPM_THRESHOLDS.IDEAL_MIN && rpm <= RPM_THRESHOLDS.IDEAL_MAX) {
    return {
      status: 'ideal',
      label: 'Ideal',
      textClass: 'text-green-600',
      bgClass: 'bg-green-500'
    };
  }
  if ((rpm >= RPM_THRESHOLDS.OK_MIN && rpm < RPM_THRESHOLDS.IDEAL_MIN) ||
      (rpm > RPM_THRESHOLDS.IDEAL_MAX && rpm <= RPM_THRESHOLDS.OK_MAX)) {
    return {
      status: 'ok',
      label: 'OK',
      textClass: 'text-yellow-600',
      bgClass: 'bg-yellow-500'
    };
  }
  if (rpm < RPM_THRESHOLDS.OK_MIN) {
    return {
      status: 'too-slow',
      label: 'Too slow',
      textClass: 'text-red-600',
      bgClass: 'bg-red-500'
    };
  }
  return {
    status: 'too-fast',
    label: 'Too fast',
    textClass: 'text-red-600',
    bgClass: 'bg-red-500'
  };
}

export function calculateGearAnalysis(
  chainringTeeth: number[],
  cassetteTeeth: number[],
  speedKmh: number
): GearAnalysis[] {
  const gears: GearAnalysis[] = [];

  // Only use the small chainring for climbing analysis
  const smallChainring = Math.min(...chainringTeeth);

  for (const cog of cassetteTeeth) {
    const ratio = calculateGearRatio(smallChainring, cog);
    const gearInches = calculateGearInches(smallChainring, cog);
    const rpm = calculateCadence(speedKmh, gearInches);
    const status = getRpmStatus(rpm);

    gears.push({
      chainring: smallChainring,
      cog,
      ratio,
      gearInches,
      rpm,
      status
    });
  }

  // Sort by gear inches (easiest/lowest first)
  gears.sort((a, b) => a.gearInches - b.gearInches);

  return gears;
}

// ===== CUSTOM CLIMB CALCULATIONS =====

export function calculateMissingClimbValue(
  distance: number | null,
  elevation: number | null,
  gradient: number | null,
  changedField: 'distance' | 'elevation' | 'gradient'
): { distance: number; elevation: number; gradient: number } | null {
  const hasDistance = distance !== null && distance > 0;
  const hasElevation = elevation !== null && elevation > 0;
  const hasGradient = gradient !== null && gradient > 0;

  const filledCount = [hasDistance, hasElevation, hasGradient].filter(Boolean).length;

  if (filledCount < 2) return null;

  const result = {
    distance: distance || 0,
    elevation: elevation || 0,
    gradient: gradient || 0
  };

  if (hasDistance && hasElevation && changedField !== 'gradient') {
    // gradient = (elevation / (distance × 1000)) × 100
    result.gradient = (elevation! / (distance! * 1000)) * 100;
  } else if (hasDistance && hasGradient && changedField !== 'elevation') {
    // elevation = distance × 1000 × (gradient / 100)
    result.elevation = distance! * 1000 * (gradient! / 100);
  } else if (hasElevation && hasGradient && changedField !== 'distance') {
    // distance = elevation / (gradient / 100) / 1000
    result.distance = elevation! / (gradient! / 100) / 1000;
  }

  return result;
}

// ===== FORMATTING =====

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function formatNumber(num: number, decimals: number = 1): string {
  return num.toFixed(decimals);
}

export function formatNumberWithCommas(num: number): string {
  return num.toLocaleString();
}
