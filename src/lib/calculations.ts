import type { Climb, ClimbResult, RpmStatusInfo, GearAnalysis, VamCategory, ProfilePointData } from './types';
import { PHYSICS, RPM_THRESHOLDS, POWER_CATEGORIES, VAM_CATEGORIES, CONVERSIONS } from './constants';

// ===== UNIT CONVERSIONS =====

// Weight
export const lbToKg = (lb: number): number => lb * CONVERSIONS.LB_TO_KG;
export const kgToLb = (kg: number): number => kg * CONVERSIONS.KG_TO_LB;

// Speed
export const mpsToKmh = (mps: number): number => mps * CONVERSIONS.MPS_TO_KMH;
export const kmhToMph = (kmh: number): number => kmh * CONVERSIONS.KMH_TO_MPH;
export const mphToKmh = (mph: number): number => mph * CONVERSIONS.MPH_TO_KMH;

// Distance
export const kmToMi = (km: number): number => km * CONVERSIONS.KM_TO_MI;
export const miToKm = (mi: number): number => mi * CONVERSIONS.MI_TO_KM;

// Elevation
export const mToFt = (m: number): number => m * CONVERSIONS.M_TO_FT;
export const ftToM = (ft: number): number => ft * CONVERSIONS.FT_TO_M;

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

// ===== ENVIRONMENTAL CALCULATIONS =====

export function calculateAirDensity(altitudeM: number, temperatureC: number): number {
  // International Standard Atmosphere formula
  const T = temperatureC + 273.15; // Convert to Kelvin
  const P0 = 101325; // Sea level pressure in Pa
  // Barometric formula for pressure at altitude
  const P = P0 * Math.pow(1 - 0.0065 * altitudeM / 288.15, 5.2561);
  const M = 0.0289644; // Molar mass of air kg/mol
  const R = 8.31447; // Universal gas constant J/(mol·K)
  return (P * M) / (R * T);
}

/**
 * Calculate power output reduction due to reduced oxygen at altitude
 * Based on Bassett et al. (1999) formula for non-acclimatized athletes
 * Formula: y = 0.178x³ – 1.43x² – 4.07x + 100 (x = altitude in km)
 * Returns percentage of sea-level power available (e.g., 92 means 92% power)
 */
export function calculateAltitudePowerPercent(altitudeM: number): number {
  const x = altitudeM / 1000; // Convert to kilometers
  // Non-acclimatized formula (1-7 days at altitude)
  const percent = 0.178 * Math.pow(x, 3) - 1.43 * Math.pow(x, 2) - 4.07 * x + 100;
  // Clamp to reasonable range (minimum 60% at ~4000m+)
  return Math.max(60, Math.min(100, percent));
}

/**
 * Calculate approximate oxygen percentage relative to sea level
 * At sea level, O2 is ~20.9% of air. The partial pressure drops with altitude.
 */
export function calculateOxygenPercent(altitudeM: number): number {
  // Simplified barometric formula for relative oxygen availability
  const P0 = 101325; // Sea level pressure
  const P = P0 * Math.pow(1 - 0.0065 * altitudeM / 288.15, 5.2561);
  return (P / P0) * 100;
}

// ===== VAM CALCULATIONS =====

export function calculateVAM(elevationM: number, timeSeconds: number): number {
  if (timeSeconds <= 0) return 0;
  return (elevationM / timeSeconds) * 3600; // Convert to per-hour
}

export function getVAMCategory(vam: number): VamCategory {
  for (const category of VAM_CATEGORIES) {
    if (vam >= category.minVam) {
      return category;
    }
  }
  return VAM_CATEGORIES[VAM_CATEGORIES.length - 1];
}

// ===== CLIMB TIME CALCULATION =====

/**
 * Calculate velocity for a single segment given power, mass, gradient, and air density
 */
function calculateSegmentVelocity(
  effectivePower: number,
  totalMassKg: number,
  gradientPercent: number,
  airDensity: number
): number {
  const gradientDecimal = gradientPercent / 100;
  const theta = Math.atan(gradientDecimal);

  const gravityForce = totalMassKg * PHYSICS.GRAVITY * Math.sin(theta);
  const rollingForce = PHYSICS.CRR * totalMassKg * PHYSICS.GRAVITY * Math.cos(theta);
  const staticForce = gravityForce + rollingForce;

  // Initial guess (ignoring aero)
  let velocity = effectivePower / staticForce;
  if (velocity <= 0) velocity = 0.1; // Minimum velocity

  // Newton-Raphson iteration
  for (let i = 0; i < 20; i++) {
    const aeroForce = 0.5 * PHYSICS.CDA * airDensity * velocity * velocity;
    const totalForce = staticForce + aeroForce;
    const powerNeeded = totalForce * velocity;

    const f = powerNeeded - effectivePower;
    const fPrime = staticForce + 1.5 * PHYSICS.CDA * airDensity * velocity * velocity;

    const delta = f / fPrime;
    velocity -= delta;

    if (Math.abs(delta) < 0.0001) break;
  }

  return Math.max(0.1, velocity); // Minimum velocity of 0.1 m/s
}

/**
 * Calculate climb time with segment-by-segment altitude effects
 * Uses elevation profile to apply varying oxygen/power reduction at each segment
 */
export function calculateClimbTime(
  powerWatts: number,
  totalMassKg: number,
  climb: Climb,
  temperatureC: number = 15 // Default temperature for air density calc
): ClimbResult {
  const profile = climb.profile;

  // If no profile data, use simple calculation with average gradient
  if (!profile || profile.length < 2) {
    const avgElevation = climb.elevation / 2; // Rough estimate
    const airDensity = calculateAirDensity(avgElevation, temperatureC);
    const powerPercent = calculateAltitudePowerPercent(avgElevation);
    const effectivePower = powerWatts * PHYSICS.EFFICIENCY * (powerPercent / 100);

    const velocity = calculateSegmentVelocity(effectivePower, totalMassKg, climb.gradient, airDensity);
    const distanceM = climb.distance * 1000;
    const timeSeconds = distanceM / velocity;
    const avgSpeedKmh = velocity * CONVERSIONS.MPS_TO_KMH;
    const vam = calculateVAM(climb.elevation, timeSeconds);

    return { timeSeconds, avgSpeedKmh, velocity, vam, avgPowerPercent: powerPercent };
  }

  // Calculate segment-by-segment with altitude effects
  let totalTimeSeconds = 0;
  let totalDistanceM = 0;
  const profileData: ProfilePointData[] = [];
  let totalPowerPercent = 0;

  // Calculate time for each segment and build profile data
  for (let i = 0; i < profile.length; i++) {
    const point = profile[i];
    const oxygenPercent = calculateOxygenPercent(point.elevation);
    const powerPercent = calculateAltitudePowerPercent(point.elevation);
    const effectivePowerAtPoint = powerWatts * (powerPercent / 100);

    // Calculate speed at this point using its gradient and elevation
    const airDensity = calculateAirDensity(point.elevation, temperatureC);
    const effectivePowerWithLosses = powerWatts * PHYSICS.EFFICIENCY * (powerPercent / 100);
    const velocityAtPoint = calculateSegmentVelocity(effectivePowerWithLosses, totalMassKg, point.gradient, airDensity);
    const speedKmh = velocityAtPoint * CONVERSIONS.MPS_TO_KMH;

    profileData.push({
      distance: point.distance,
      elevation: point.elevation,
      gradient: point.gradient,
      oxygenPercent,
      powerPercent,
      effectivePower: effectivePowerAtPoint,
      speedKmh
    });

    // Calculate segment time (for segments between points)
    if (i < profile.length - 1) {
      const p2 = profile[i + 1];
      const segmentDistanceM = (p2.distance - point.distance) * 1000;
      const avgElevation = (point.elevation + p2.elevation) / 2;
      const segmentGradient = (point.gradient + p2.gradient) / 2;

      const segmentAirDensity = calculateAirDensity(avgElevation, temperatureC);
      const segmentPowerPercent = calculateAltitudePowerPercent(avgElevation);
      totalPowerPercent += segmentPowerPercent;

      const segmentEffectivePower = powerWatts * PHYSICS.EFFICIENCY * (segmentPowerPercent / 100);
      const segmentVelocity = calculateSegmentVelocity(segmentEffectivePower, totalMassKg, segmentGradient, segmentAirDensity);
      const segmentTime = segmentDistanceM / segmentVelocity;

      totalTimeSeconds += segmentTime;
      totalDistanceM += segmentDistanceM;
    }
  }

  const avgSpeedKmh = (totalDistanceM / totalTimeSeconds) * CONVERSIONS.MPS_TO_KMH;
  const avgVelocity = totalDistanceM / totalTimeSeconds;
  const vam = calculateVAM(climb.elevation, totalTimeSeconds);
  const avgPowerPercent = totalPowerPercent / (profile.length - 1);

  return {
    timeSeconds: totalTimeSeconds,
    avgSpeedKmh,
    velocity: avgVelocity,
    vam,
    profileData,
    avgPowerPercent
  };
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
