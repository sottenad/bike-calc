'use client';

import { useReducer, useMemo } from 'react';
import type {
  CalculatorState,
  CalculatorAction,
  CalculatorDerived,
  Climb,
  WeightUnit
} from '@/lib/types';
import {
  lbToKg,
  kgToLb,
  calculatePowerToWeight,
  getPowerCategory,
  calculateClimbTime,
  calculateGearAnalysis,
  calculateMissingClimbValue
} from '@/lib/calculations';
import { PRESET_CLIMBS, CHAINRINGS, CASSETTES } from '@/lib/data';
import { DEFAULTS } from '@/lib/constants';

// Initial state
const initialState: CalculatorState = {
  unit: 'kg',
  riderWeight: DEFAULTS.RIDER_WEIGHT_KG,
  bikeWeight: DEFAULTS.BIKE_WEIGHT_KG,
  power: DEFAULTS.POWER_WATTS,
  selectedClimbId: DEFAULTS.CLIMB_ID,
  customClimb: {
    distance: null,
    elevation: null,
    gradient: null
  },
  selectedChainringId: DEFAULTS.CHAINRING_ID,
  selectedCassetteId: DEFAULTS.CASSETTE_ID,
  showTooFastGears: false,
  showTooSlowGears: false
};

// Reducer
function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case 'SET_UNIT': {
      // Convert weight values when switching units
      const newUnit = action.unit;
      const convert = newUnit === 'lb' ? kgToLb : lbToKg;
      return {
        ...state,
        unit: newUnit,
        riderWeight: parseFloat(convert(state.riderWeight).toFixed(1)),
        bikeWeight: parseFloat(convert(state.bikeWeight).toFixed(1))
      };
    }
    case 'SET_RIDER_WEIGHT':
      return { ...state, riderWeight: action.weight };
    case 'SET_BIKE_WEIGHT':
      return { ...state, bikeWeight: action.weight };
    case 'SET_POWER':
      return { ...state, power: action.power };
    case 'SET_CLIMB':
      return { ...state, selectedClimbId: action.climbId };
    case 'SET_CUSTOM_CLIMB_FIELD': {
      const newCustomClimb = { ...state.customClimb, [action.field]: action.value };

      // Auto-calculate missing value if we have 2 of 3
      const calculated = calculateMissingClimbValue(
        newCustomClimb.distance,
        newCustomClimb.elevation,
        newCustomClimb.gradient,
        action.field
      );

      if (calculated) {
        return {
          ...state,
          customClimb: {
            distance: calculated.distance || null,
            elevation: calculated.elevation || null,
            gradient: calculated.gradient || null
          }
        };
      }

      return { ...state, customClimb: newCustomClimb };
    }
    case 'SET_CHAINRING':
      return { ...state, selectedChainringId: action.id };
    case 'SET_CASSETTE':
      return { ...state, selectedCassetteId: action.id };
    case 'TOGGLE_TOO_FAST':
      return { ...state, showTooFastGears: !state.showTooFastGears };
    case 'TOGGLE_TOO_SLOW':
      return { ...state, showTooSlowGears: !state.showTooSlowGears };
    default:
      return state;
  }
}

// Compute derived values
function computeDerived(state: CalculatorState): CalculatorDerived {
  // Convert weights to kg for calculations
  const riderWeightKg = state.unit === 'kg' ? state.riderWeight : lbToKg(state.riderWeight);
  const bikeWeightKg = state.unit === 'kg' ? state.bikeWeight : lbToKg(state.bikeWeight);
  const totalMassKg = riderWeightKg + bikeWeightKg;

  // Power to weight
  const powerToWeight = calculatePowerToWeight(state.power, riderWeightKg);
  const powerCategory = getPowerCategory(powerToWeight);

  // Selected climb
  let selectedClimb: Climb | null = null;
  if (state.selectedClimbId === 'custom') {
    const { distance, elevation, gradient } = state.customClimb;
    if (distance && elevation && gradient) {
      selectedClimb = {
        id: 'custom',
        name: 'Custom Climb',
        location: 'Your route',
        distance,
        elevation,
        gradient,
        category: 'Custom'
      };
    }
  } else {
    selectedClimb = PRESET_CLIMBS[state.selectedClimbId] || null;
  }

  // Climb result
  let climbResult = null;
  let avgSpeedKmh = 0;
  if (selectedClimb) {
    climbResult = calculateClimbTime(state.power, totalMassKg, selectedClimb);
    avgSpeedKmh = climbResult.avgSpeedKmh;
  }

  // Gear analysis
  const chainringTeeth = CHAINRINGS[state.selectedChainringId] || [50, 34];
  const cassetteTeeth = CASSETTES[state.selectedCassetteId] || [11, 34];
  const gearAnalysis = avgSpeedKmh > 0
    ? calculateGearAnalysis(chainringTeeth, cassetteTeeth, avgSpeedKmh)
    : [];

  return {
    riderWeightKg,
    bikeWeightKg,
    totalMassKg,
    powerToWeight,
    powerCategory,
    selectedClimb,
    climbResult,
    gearAnalysis,
    avgSpeedKmh
  };
}

// Main hook
export function useCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const derived = useMemo(() => computeDerived(state), [state]);

  const actions = {
    setUnit: (unit: WeightUnit) => dispatch({ type: 'SET_UNIT', unit }),
    setRiderWeight: (weight: number) => dispatch({ type: 'SET_RIDER_WEIGHT', weight }),
    setBikeWeight: (weight: number) => dispatch({ type: 'SET_BIKE_WEIGHT', weight }),
    setPower: (power: number) => dispatch({ type: 'SET_POWER', power }),
    setClimb: (climbId: string) => dispatch({ type: 'SET_CLIMB', climbId }),
    setCustomClimbField: (field: 'distance' | 'elevation' | 'gradient', value: number | null) =>
      dispatch({ type: 'SET_CUSTOM_CLIMB_FIELD', field, value }),
    setChainring: (id: string) => dispatch({ type: 'SET_CHAINRING', id }),
    setCassette: (id: string) => dispatch({ type: 'SET_CASSETTE', id }),
    toggleTooFastGears: () => dispatch({ type: 'TOGGLE_TOO_FAST' }),
    toggleTooSlowGears: () => dispatch({ type: 'TOGGLE_TOO_SLOW' })
  };

  return { state, derived, actions };
}
