# Cycling Climb Calculator - Technical Specification

## Table of Contents
1. [Overview](#overview)
2. [Application Purpose](#application-purpose)
3. [Technology Stack](#technology-stack)
4. [Design System](#design-system)
5. [Data Structures](#data-structures)
6. [Physics & Formulas](#physics--formulas)
7. [Component Architecture](#component-architecture)
8. [State Management](#state-management)
9. [Component Specifications](#component-specifications)
10. [Testing Requirements](#testing-requirements)

---

## Overview

A single-page cycling calculator that estimates climb times based on rider stats, analyzes power-to-weight ratios, and provides gearing analysis for optimal cadence during climbs.

### Key Features
- Rider stats input (weight, bike weight, power) with kg/lb unit toggle
- Power-to-weight ratio calculation with category classification
- Climb time estimation using physics-based model
- Custom climb entry with auto-calculation of missing values
- Gearing analysis showing required RPM for each gear combination
- Collapsible sections for detailed formula explanations

---

## Application Purpose

### Why This App Exists
Cyclists preparing for mountain climbs need to:
1. **Estimate completion time** - Know how long a climb will take at their fitness level
2. **Understand their fitness** - See where their W/kg ranks among different rider categories
3. **Optimize gearing** - Ensure they have appropriate gears for comfortable cadence on steep gradients

### Target Users
- Road cyclists training for mountainous events
- Gravel cyclists planning backcountry routes
- Cyclists considering component upgrades (cassette, chainrings)
- Coaches helping athletes prepare for specific climbs

---

## Technology Stack

### Current Implementation
- Vanilla HTML/CSS/JavaScript
- Tailwind CSS (via CDN)

### Target Implementation
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React useState/useReducer (no external library needed)
- **Testing**: Jest + React Testing Library
- **Deployment**: Vercel (recommended)

### Why Next.js?
- Server-side rendering for SEO (climb data, calculator results)
- App Router for modern React patterns
- Built-in optimization for performance
- Easy deployment to Vercel
- TypeScript support out of the box

---

## Design System

### Color Palette

| Token | Hex Value | Tailwind Class | Usage |
|-------|-----------|----------------|-------|
| Primary/Accent | `#f97316` | `orange-500` | Buttons, highlights, active states, primary metrics |
| Primary Light | `#fff7ed` | `orange-50` | Highlighted backgrounds |
| Primary Border | `#fed7aa` | `orange-200` | Highlighted borders |
| Background | `#f9fafb` | `gray-50` | Page background |
| Card Background | `#ffffff` | `white` | Section cards |
| Text Primary | `#111827` | `gray-900` | Headings, important text |
| Text Secondary | `#4b5563` | `gray-600` | Body text, descriptions |
| Text Muted | `#6b7280` | `gray-500` | Labels, hints |
| Text Disabled | `#9ca3af` | `gray-400` | Inactive states |
| Border | `#e5e7eb` | `gray-200` | Card borders, dividers |
| Border Light | `#f3f4f6` | `gray-100` | Subtle dividers |
| Success | `#16a34a` | `green-600` | Ideal RPM text |
| Success BG | `#22c55e` | `green-500` | Ideal indicator dot |
| Warning | `#ca8a04` | `yellow-600` | OK RPM text |
| Warning BG | `#eab308` | `yellow-500` | OK indicator dot |
| Error | `#dc2626` | `red-600` | Too fast/slow RPM text |
| Error BG | `#ef4444` | `red-500` | Difficult indicator dot |
| Info BG | `#eff6ff` | `blue-50` | Custom climb input background |
| Info Border | `#bfdbfe` | `blue-200` | Custom climb input border |
| Info Text | `#1d4ed8` | `blue-700` | Custom climb hint text |

### Typography

| Element | Classes | Notes |
|---------|---------|-------|
| Page Title | `text-3xl font-bold text-gray-900` | Main heading |
| Page Subtitle | `text-gray-600` | Description under title |
| Section Title | `text-lg font-semibold text-gray-900` | Card headings |
| Subsection Title | `font-medium text-gray-900` | Within collapsibles |
| Label | `text-sm font-medium text-gray-700` | Form labels |
| Body Text | `text-sm text-gray-600` | General content |
| Small Text | `text-xs text-gray-500` | Hints, captions |
| Metric Large | `text-4xl font-bold text-orange-600` | Primary result (time) |
| Metric Medium | `text-2xl font-bold text-gray-900` | Climb stats |
| Metric Accent | `text-2xl font-bold text-orange-600` | W/kg display |
| Code/Formula | `font-mono text-sm` | Formula displays |

### Spacing & Layout

| Element | Classes | Notes |
|---------|---------|-------|
| Page Container | `max-w-4xl mx-auto px-4 py-8` | Centers content, responsive padding |
| Section Card | `bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6` | Main content sections |
| Grid 3-col | `grid grid-cols-1 md:grid-cols-3 gap-6` | Rider stats inputs |
| Grid 2-col | `grid grid-cols-1 md:grid-cols-2 gap-4` | Gearing dropdowns |
| Grid 3-col Stats | `grid grid-cols-3 gap-4` | Climb stats display |
| Inner Card | `bg-gray-50 rounded-lg p-4 border border-gray-200` | Nested content areas |
| Highlight Card | `bg-orange-50 rounded-lg p-4 border border-orange-200` | Power-to-weight display |

### Form Elements

```css
/* Input Field */
.input-field {
  @apply flex-1 rounded-l-lg border border-r-0 border-gray-300 px-4 py-2
         focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent;
}

/* Input Unit Suffix */
.input-suffix {
  @apply rounded-r-lg border border-gray-300 px-4 py-2 bg-gray-50 text-gray-600;
}

/* Select Dropdown */
.select-field {
  @apply w-full rounded-lg border border-gray-300 px-4 py-2
         focus:outline-none focus:ring-2 focus:ring-orange-500;
}

/* Toggle Switch Track */
.toggle-track {
  @apply relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full
         border-2 border-transparent bg-orange-500 transition-colors duration-200 ease-in-out
         focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2;
}

/* Toggle Switch Knob */
.toggle-knob {
  @apply pointer-events-none inline-block h-5 w-5 transform rounded-full
         bg-white shadow ring-0 transition duration-200 ease-in-out;
}
/* Position: translate-x-0 (off/kg) or translate-x-5 (on/lb) */

/* Pill Button (show/hide gears) */
.pill-button {
  @apply text-xs px-3 py-1.5 rounded-full border border-gray-300
         text-gray-600 hover:bg-gray-50 transition-colors;
}
```

### Special Styling Rules

1. **Hide number input spinners**:
```css
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
```

2. **Collapsible sections**: Use `<details>` with `group` class for rotation animation on chevron
3. **Category badge**: `px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full`

---

## Data Structures

### Climb Data

```typescript
interface Climb {
  id: string;
  name: string;
  location: string;
  distance: number;    // kilometers
  elevation: number;   // meters gained
  gradient: number;    // percentage (e.g., 8.1 for 8.1%)
  category: string;    // "HC", "Cat 1", "Cat 2", etc. or "Custom"
}

const PRESET_CLIMBS: Record<string, Climb> = {
  'alpe-dhuez': {
    id: 'alpe-dhuez',
    name: "Alpe d'Huez",
    location: "Isère, French Alps",
    distance: 13.8,
    elevation: 1122,
    gradient: 8.1,
    category: "HC"
  },
  'galibier': {
    id: 'galibier',
    name: "Col du Galibier",
    location: "Savoie, French Alps",
    distance: 18.1,
    elevation: 1245,
    gradient: 6.9,
    category: "HC"
  },
  'haleakala': {
    id: 'haleakala',
    name: "Haleakala",
    location: "Maui, Hawaii, USA",
    distance: 57,
    elevation: 3080,
    gradient: 5.4,
    category: "HC"
  },
  'ventoux': {
    id: 'ventoux',
    name: "Mont Ventoux",
    location: "Provence, France (via Bédoin)",
    distance: 21.5,
    elevation: 1609,
    gradient: 7.6,
    category: "HC"
  },
  'tourmalet': {
    id: 'tourmalet',
    name: "Col du Tourmalet",
    location: "Hautes-Pyrénées, France",
    distance: 17.1,
    elevation: 1124,
    gradient: 7.4,
    category: "HC"
  }
};
```

**Why these climbs?**
- All are iconic, well-known cycling climbs
- Mix of Tour de France classics and international destinations
- Variety of distances and gradients for testing different scenarios
- All are "Hors Catégorie" (HC) - the hardest classification

### Chainring Data

```typescript
interface ChainringOption {
  id: string;
  label: string;
  teeth: number[];  // Array of chainring sizes [large, small] or [single] for 1x
}

const CHAINRINGS: Record<string, number[]> = {
  '53-39': [53, 39],   // Standard road racing
  '52-36': [52, 36],   // Semi-compact, popular for sportives
  '50-34': [50, 34],   // Compact, most popular for recreational riders
  '48-35': [48, 35],   // SRAM's compact option
  '48-32': [48, 32],   // Gravel-oriented
  '46-33': [46, 33],   // Gravel/adventure
  '46-30': [46, 30],   // Gravel with easier climbing
  '42-32': [42, 32],   // Gravel-focused
  '40-40': [40]        // 1x setup (single chainring)
};

const CHAINRING_OPTIONS: ChainringOption[] = [
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
```

**Why these chainrings?**
- Cover road racing (53/39) through gravel (42/32)
- Include 1x option for modern gravel/MTB crossover
- Represent common off-the-shelf groupset options

### Cassette Data

```typescript
interface CassetteOption {
  id: string;
  label: string;
  cogs: number[];  // Array of cog tooth counts, smallest to largest
}

const CASSETTES: Record<string, number[]> = {
  '11-25': [11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25],
  '11-28': [11, 12, 13, 14, 15, 17, 19, 21, 23, 25, 28],
  '11-30': [11, 12, 13, 14, 15, 16, 17, 19, 21, 24, 27, 30],
  '11-32': [11, 12, 13, 14, 15, 17, 19, 21, 24, 27, 30, 32],
  '11-34': [11, 12, 13, 14, 15, 17, 19, 21, 24, 27, 30, 34],
  '11-36': [11, 12, 13, 14, 15, 17, 19, 21, 24, 28, 32, 36],
  '10-33': [10, 11, 12, 13, 14, 15, 17, 19, 21, 24, 28, 33],
  '10-36': [10, 11, 12, 13, 15, 17, 19, 21, 24, 28, 32, 36],
  '11-42': [11, 13, 15, 17, 19, 21, 24, 28, 32, 37, 42],
  '10-44': [10, 12, 14, 16, 18, 21, 24, 28, 32, 38, 44],
  '10-52': [10, 12, 14, 16, 18, 21, 24, 28, 33, 42, 52]
};

const CASSETTE_OPTIONS: CassetteOption[] = [
  { id: '11-25', label: '11-25 (11sp)', cogs: CASSETTES['11-25'] },
  { id: '11-28', label: '11-28 (11sp)', cogs: CASSETTES['11-28'] },
  { id: '11-30', label: '11-30 (12sp)', cogs: CASSETTES['11-30'] },
  { id: '11-32', label: '11-32 (11sp)', cogs: CASSETTES['11-32'] },
  { id: '11-34', label: '11-34 (12sp)', cogs: CASSETTES['11-34'] },
  { id: '11-36', label: '11-36 (12sp)', cogs: CASSETTES['11-36'] },
  { id: '10-33', label: '10-33 (12sp)', cogs: CASSETTES['10-33'] },
  { id: '10-36', label: '10-36 (12sp)', cogs: CASSETTES['10-36'] },
  { id: '11-42', label: '11-42 (Gravel)', cogs: CASSETTES['11-42'] },
  { id: '10-44', label: '10-44 (Gravel)', cogs: CASSETTES['10-44'] },
  { id: '10-52', label: '10-52 (1x Gravel)', cogs: CASSETTES['10-52'] }
];
```

**Why these cassettes?**
- 11-25, 11-28: Racing cassettes with tight ratios
- 11-30 to 11-36: Popular climbing cassettes
- 10-33, 10-36: SRAM AXS options
- 11-42, 10-44, 10-52: Gravel/adventure with wide range

### Power Category Data

```typescript
interface PowerCategory {
  minWkg: number;
  label: string;
}

const POWER_CATEGORIES: PowerCategory[] = [
  { minWkg: 6.0, label: "World-class professional" },
  { minWkg: 5.0, label: "Professional / Elite" },
  { minWkg: 4.0, label: "Very strong amateur / Cat 1-2" },
  { minWkg: 3.5, label: "Strong amateur / Cat 3" },
  { minWkg: 3.0, label: "Good fitness / Cat 4-5" },
  { minWkg: 2.5, label: "Recreational rider" },
  { minWkg: 0, label: "Beginner" }
];

function getPowerCategory(wkg: number): string {
  for (const category of POWER_CATEGORIES) {
    if (wkg >= category.minWkg) {
      return category.label;
    }
  }
  return "Beginner";
}
```

**Why these categories?**
- Based on established cycling performance benchmarks
- Provides meaningful feedback for users at all levels
- Aligns with USA Cycling category system

---

## Physics & Formulas

### Physics Constants

```typescript
const PHYSICS_CONSTANTS = {
  GRAVITY: 9.81,           // m/s² - gravitational acceleration
  CRR: 0.004,              // Rolling resistance coefficient (good road surface)
  CDA: 0.35,               // Aerodynamic drag area in m² (climbing on hoods)
  RHO: 1.2,                // Air density in kg/m³ (sea level)
  EFFICIENCY: 0.97,        // Drivetrain efficiency (97%)
  WHEEL_DIAMETER: 27       // inches (700c with 25mm tire, for gear inch calculation)
} as const;
```

**Why these values?**
- **CRR 0.004**: Represents good quality road tires on smooth pavement
- **CDA 0.35**: Climbing position (on hoods, more upright than aero)
- **RHO 1.2**: Standard sea-level air density (could be extended for altitude)
- **EFFICIENCY 0.97**: Modern drivetrain with clean chain
- **WHEEL_DIAMETER 27**: Standard for 700c road wheel calculation

### Unit Conversion Functions

```typescript
const lbToKg = (lb: number): number => lb * 0.453592;
const kgToLb = (kg: number): number => kg * 2.20462;
const mpsToKmh = (mps: number): number => mps * 3.6;
const kmhToMph = (kmh: number): number => kmh * 0.621371;
```

### Power-to-Weight Calculation

```typescript
function calculatePowerToWeight(powerWatts: number, riderMassKg: number): number {
  return powerWatts / riderMassKg;
}
```

**Formula**: `W/kg = Power (W) ÷ Rider Mass (kg)`

**Note**: Uses rider mass only (not bike), as this is the standard cycling metric.

### Climb Time Calculation

This is the core physics model using Newton-Raphson iteration to solve for velocity.

```typescript
interface ClimbResult {
  timeSeconds: number;
  avgSpeedKmh: number;
  velocity: number;  // m/s
}

function calculateClimbTime(
  powerWatts: number,
  totalMassKg: number,  // rider + bike
  climb: Climb
): ClimbResult {
  const distanceM = climb.distance * 1000;
  const gradientDecimal = climb.gradient / 100;
  const theta = Math.atan(gradientDecimal);

  // Effective power after drivetrain losses
  const effectivePower = powerWatts * PHYSICS_CONSTANTS.EFFICIENCY;

  // Force components (excluding aerodynamic which depends on velocity)
  const gravityForce = totalMassKg * PHYSICS_CONSTANTS.GRAVITY * Math.sin(theta);
  const rollingForce = PHYSICS_CONSTANTS.CRR * totalMassKg * PHYSICS_CONSTANTS.GRAVITY * Math.cos(theta);
  const staticForce = gravityForce + rollingForce;

  // Solve cubic equation using Newton-Raphson iteration
  // P × η = v × (m×g×sin(θ) + Crr×m×g×cos(θ) + 0.5×CdA×ρ×v²)
  let velocity = effectivePower / staticForce; // Initial guess (ignoring aero)

  for (let i = 0; i < 20; i++) {
    const aeroForce = 0.5 * PHYSICS_CONSTANTS.CDA * PHYSICS_CONSTANTS.RHO * velocity * velocity;
    const totalForce = staticForce + aeroForce;
    const powerNeeded = totalForce * velocity;

    const f = powerNeeded - effectivePower;
    const fPrime = staticForce + 1.5 * PHYSICS_CONSTANTS.CDA * PHYSICS_CONSTANTS.RHO * velocity * velocity;

    const delta = f / fPrime;
    velocity -= delta;

    if (Math.abs(delta) < 0.0001) break;
  }

  const timeSeconds = distanceM / velocity;
  const avgSpeedKmh = velocity * 3.6;

  return { timeSeconds, avgSpeedKmh, velocity };
}
```

**Why Newton-Raphson?**
- The power equation is cubic in velocity (due to aero drag being v²)
- Newton-Raphson converges quickly (typically 3-5 iterations)
- More accurate than simplified linear approximations

**Formula breakdown**:
```
Power × Efficiency = Velocity × (Gravity_Force + Rolling_Force + Aero_Force)

Where:
- Gravity_Force = m × g × sin(θ)
- Rolling_Force = Crr × m × g × cos(θ)
- Aero_Force = 0.5 × CdA × ρ × v²
```

### Gear Calculations

```typescript
function calculateGearInches(chainring: number, cog: number): number {
  return (chainring / cog) * PHYSICS_CONSTANTS.WHEEL_DIAMETER;
}

function calculateCadence(speedKmh: number, gearInches: number): number {
  const speedMph = speedKmh * 0.621371;
  // Formula: RPM = (speed_mph × 63360) / (gear_inches × π × 60)
  // 63360 = inches per mile
  return (speedMph * 63360) / (gearInches * Math.PI * 60);
}

function calculateGearRatio(chainring: number, cog: number): number {
  return chainring / cog;
}
```

**Why gear inches?**
- Traditional cycling metric that normalizes for wheel size
- Allows comparison across different wheel sizes
- Intuitively represents "effective wheel diameter"

### RPM Status Classification

```typescript
type RpmStatus = 'ideal' | 'ok' | 'too-slow' | 'too-fast';

interface RpmStatusInfo {
  status: RpmStatus;
  label: string;
  textClass: string;
  bgClass: string;
}

function getRpmStatus(rpm: number): RpmStatusInfo {
  if (rpm >= 70 && rpm <= 95) {
    return { status: 'ideal', label: 'Ideal', textClass: 'text-green-600', bgClass: 'bg-green-500' };
  }
  if ((rpm >= 60 && rpm < 70) || (rpm > 95 && rpm <= 110)) {
    return { status: 'ok', label: 'OK', textClass: 'text-yellow-600', bgClass: 'bg-yellow-500' };
  }
  if (rpm < 60) {
    return { status: 'too-slow', label: 'Too slow', textClass: 'text-red-600', bgClass: 'bg-red-500' };
  }
  return { status: 'too-fast', label: 'Too fast', textClass: 'text-red-600', bgClass: 'bg-red-500' };
}
```

**Why these thresholds?**
- **70-95 RPM**: Optimal cadence range for most cyclists
- **60-70, 95-110**: Acceptable but not ideal
- **<60**: Grinding, risk of knee strain
- **>110**: Spinning out, losing efficiency

### Custom Climb Auto-Calculation

```typescript
function calculateMissingClimbValue(
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

  let result = {
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
```

**Why auto-calculate?**
- Users often know 2 of 3 values from their GPS/Strava data
- Gradient is often not directly available
- Reduces data entry friction

### Time Formatting

```typescript
function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}
```

---

## Component Architecture

### Directory Structure

```
src/
├── app/
│   ├── page.tsx                    # Main page component
│   ├── layout.tsx                  # Root layout with metadata
│   └── globals.css                 # Global styles + Tailwind
├── components/
│   ├── ui/                         # Reusable UI primitives
│   │   ├── Card.tsx
│   │   ├── Select.tsx
│   │   ├── NumberInput.tsx
│   │   ├── Toggle.tsx
│   │   ├── Collapsible.tsx
│   │   └── Badge.tsx
│   ├── calculator/                 # Feature components
│   │   ├── RiderStatsSection.tsx
│   │   ├── UnitToggle.tsx
│   │   ├── PowerToWeightDisplay.tsx
│   │   ├── ClimbSelector.tsx
│   │   ├── CustomClimbForm.tsx
│   │   ├── ClimbInfoCard.tsx
│   │   ├── EstimatedTimeDisplay.tsx
│   │   ├── FormulaDetails.tsx
│   │   ├── GearingSection.tsx
│   │   ├── GearTable.tsx
│   │   └── GearLegend.tsx
│   └── layout/
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/
│   ├── calculations.ts             # All physics/math functions
│   ├── constants.ts                # Physics constants, thresholds
│   ├── types.ts                    # TypeScript interfaces
│   └── data/
│       ├── climbs.ts               # Preset climb data
│       ├── chainrings.ts           # Chainring options
│       └── cassettes.ts            # Cassette options
├── hooks/
│   └── useCalculator.ts            # Main state management hook
└── __tests__/
    ├── calculations.test.ts        # Unit tests for formulas
    ├── components/                 # Component tests
    └── integration/                # E2E-style tests
```

### Component Hierarchy

```
Page
├── Header
├── RiderStatsSection
│   ├── UnitToggle
│   ├── NumberInput (Rider Weight)
│   ├── NumberInput (Bike Weight)
│   ├── NumberInput (Power)
│   └── PowerToWeightDisplay
├── ClimbSection
│   ├── ClimbSelector
│   ├── CustomClimbForm (conditional)
│   └── ClimbInfoCard
│       └── EstimatedTimeDisplay
├── FormulaDetails (Collapsible)
├── GearingSection
│   ├── Select (Chainring)
│   ├── Select (Cassette)
│   ├── GearTable
│   │   └── GearRow (multiple)
│   └── GearLegend
└── Footer
```

---

## State Management

### Main Calculator State

```typescript
interface CalculatorState {
  // Units
  unit: 'kg' | 'lb';

  // Rider inputs (always stored in display units)
  riderWeight: number;
  bikeWeight: number;
  power: number;

  // Climb selection
  selectedClimbId: string;  // 'alpe-dhuez' | 'galibier' | ... | 'custom'

  // Custom climb (only used when selectedClimbId === 'custom')
  customClimb: {
    distance: number | null;
    elevation: number | null;
    gradient: number | null;
  };

  // Gearing
  selectedChainringId: string;
  selectedCassetteId: string;

  // UI state
  showTooFastGears: boolean;
  showTooSlowGears: boolean;
}

// Derived/computed values (not stored, calculated on render)
interface CalculatorDerived {
  riderWeightKg: number;
  bikeWeightKg: number;
  totalMassKg: number;
  powerToWeight: number;
  powerCategory: string;
  selectedClimb: Climb | null;
  climbResult: ClimbResult | null;
  gearAnalysis: GearAnalysis[];
}
```

### State Hook

```typescript
function useCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  // Derived values computed from state
  const derived = useMemo(() => computeDerived(state), [state]);

  // Actions
  const setUnit = (unit: 'kg' | 'lb') => dispatch({ type: 'SET_UNIT', unit });
  const setRiderWeight = (weight: number) => dispatch({ type: 'SET_RIDER_WEIGHT', weight });
  const setBikeWeight = (weight: number) => dispatch({ type: 'SET_BIKE_WEIGHT', weight });
  const setPower = (power: number) => dispatch({ type: 'SET_POWER', power });
  const setClimb = (climbId: string) => dispatch({ type: 'SET_CLIMB', climbId });
  const setCustomClimbField = (field: string, value: number) =>
    dispatch({ type: 'SET_CUSTOM_CLIMB_FIELD', field, value });
  const setChainring = (id: string) => dispatch({ type: 'SET_CHAINRING', id });
  const setCassette = (id: string) => dispatch({ type: 'SET_CASSETTE', id });
  const toggleTooFastGears = () => dispatch({ type: 'TOGGLE_TOO_FAST' });
  const toggleTooSlowGears = () => dispatch({ type: 'TOGGLE_TOO_SLOW' });

  return {
    state,
    derived,
    actions: {
      setUnit,
      setRiderWeight,
      setBikeWeight,
      setPower,
      setClimb,
      setCustomClimbField,
      setChainring,
      setCassette,
      toggleTooFastGears,
      toggleTooSlowGears
    }
  };
}
```

### Initial State

```typescript
const initialState: CalculatorState = {
  unit: 'kg',
  riderWeight: 70,
  bikeWeight: 8,
  power: 200,
  selectedClimbId: 'alpe-dhuez',
  customClimb: {
    distance: null,
    elevation: null,
    gradient: null
  },
  selectedChainringId: '50-34',
  selectedCassetteId: '11-34',
  showTooFastGears: false,
  showTooSlowGears: false
};
```

---

## Component Specifications

### 1. RiderStatsSection

**Purpose**: Collects rider weight, bike weight, and power inputs with unit toggle.

**Why it exists**: These three inputs are the foundation of all calculations. Grouping them together provides clear user mental model.

**Props**:
```typescript
interface RiderStatsSectionProps {
  unit: 'kg' | 'lb';
  riderWeight: number;
  bikeWeight: number;
  power: number;
  powerToWeight: number;
  powerCategory: string;
  onUnitChange: (unit: 'kg' | 'lb') => void;
  onRiderWeightChange: (weight: number) => void;
  onBikeWeightChange: (weight: number) => void;
  onPowerChange: (power: number) => void;
}
```

**Behavior**:
1. When unit toggle changes:
   - Convert existing weight values to new unit
   - Update both input displays with converted values
   - All calculations remain the same (internal always uses kg)

2. Real-time updates:
   - Any input change immediately recalculates power-to-weight
   - Debouncing NOT needed (calculations are instant)

**Styling**:
- Section card with white background
- 3-column grid on desktop, single column on mobile
- Orange-highlighted power-to-weight display at bottom

**Implementation Steps**:
1. Create `NumberInput` component with suffix support
2. Create `UnitToggle` component with animated knob
3. Create `PowerToWeightDisplay` component
4. Compose into `RiderStatsSection`
5. Wire up state management

**Passing Tests**:
- [ ] Displays correct units based on toggle state
- [ ] Converting 70kg to lb shows 154.3
- [ ] Converting 154.3lb to kg shows 70.0
- [ ] Power-to-weight updates when any input changes
- [ ] Correct category displayed for 200W/70kg = "Recreational rider"
- [ ] Correct category displayed for 350W/70kg = "Professional / Elite"

---

### 2. UnitToggle

**Purpose**: Switch between kg and lb for weight inputs.

**Why it exists**: US users prefer pounds, international users prefer kg. Toggle affects both weight inputs simultaneously.

**Props**:
```typescript
interface UnitToggleProps {
  unit: 'kg' | 'lb';
  onChange: (unit: 'kg' | 'lb') => void;
}
```

**Behavior**:
- Click toggles between kg and lb
- Active unit label is orange, inactive is gray
- Toggle knob animates between positions
- Keyboard accessible (Space/Enter to toggle)

**Styling**:
- `h-6 w-11` toggle track
- `h-5 w-5` toggle knob
- `translate-x-0` (kg) / `translate-x-5` (lb)
- `bg-orange-500` track color
- Labels: active = `text-orange-600`, inactive = `text-gray-400`

**Implementation Steps**:
1. Create accessible toggle with `role="switch"` and `aria-checked`
2. Handle click and keyboard events
3. Apply transition classes for smooth animation
4. Style labels based on current state

**Passing Tests**:
- [ ] Starts in kg mode
- [ ] Click toggles to lb mode
- [ ] Click again returns to kg mode
- [ ] Space key toggles
- [ ] `aria-checked` reflects current state
- [ ] Knob position matches state

---

### 3. ClimbSelector

**Purpose**: Dropdown to select preset climbs or custom option.

**Why it exists**: Provides quick access to famous climbs while allowing custom entry.

**Props**:
```typescript
interface ClimbSelectorProps {
  selectedClimbId: string;
  onChange: (climbId: string) => void;
}
```

**Behavior**:
- Shows grouped options: "Famous Climbs" and "Custom"
- Selection triggers parent state update
- When "custom" selected, parent shows custom climb form

**Styling**:
- Full-width select with rounded corners
- Orange focus ring
- Optgroup labels for organization

**Implementation Steps**:
1. Create styled select component
2. Map climb data to options
3. Add "Custom" option with separator
4. Handle change events

**Passing Tests**:
- [ ] Default selection is first climb
- [ ] All 5 preset climbs appear in dropdown
- [ ] "Custom" option appears separately
- [ ] Selection change calls onChange with correct id

---

### 4. CustomClimbForm

**Purpose**: Allow users to enter their own climb data with auto-calculation.

**Why it exists**: Users want to analyze climbs not in the preset list. Auto-calculation reduces friction.

**Props**:
```typescript
interface CustomClimbFormProps {
  distance: number | null;
  elevation: number | null;
  gradient: number | null;
  onFieldChange: (field: 'distance' | 'elevation' | 'gradient', value: number | null) => void;
}
```

**Behavior**:
1. User enters any two values
2. Third value auto-calculates based on relationship:
   - `gradient = (elevation / (distance × 1000)) × 100`
   - `elevation = distance × 1000 × (gradient / 100)`
   - `distance = elevation / (gradient / 100) / 1000`
3. Shows hint text explaining which value was calculated
4. All three values needed for climb calculation to proceed

**Styling**:
- Blue-tinted background (`bg-blue-50`, `border-blue-200`)
- Explanatory text in blue (`text-blue-700`)
- 3-column grid on desktop
- Hint text below inputs when auto-calculated

**Implementation Steps**:
1. Create form with three NumberInput components
2. Track which fields were manually edited
3. Implement auto-calculation logic
4. Show/hide hint based on calculated field
5. Propagate changes to parent

**Passing Tests**:
- [ ] Entering distance=10 and elevation=800 calculates gradient=8.0
- [ ] Entering distance=10 and gradient=8 calculates elevation=800
- [ ] Entering elevation=800 and gradient=8 calculates distance=10
- [ ] Hint text shows which field was calculated
- [ ] Partial data (1 field) doesn't trigger calculation
- [ ] Editing calculated field overrides the calculation

---

### 5. ClimbInfoCard

**Purpose**: Display selected climb details and estimated time.

**Why it exists**: Central display of results - the primary output users care about.

**Props**:
```typescript
interface ClimbInfoCardProps {
  climb: Climb;
  estimatedTime: string;      // formatted "1:23:45"
  avgSpeed: number;           // km/h
  isCustom: boolean;
  isComplete: boolean;        // false if custom climb missing data
}
```

**Behavior**:
- Shows climb name, location (hidden for custom), and category badge
- Displays distance, elevation, gradient in 3-column stats row
- Large estimated time display
- Average speed shown below time
- If custom and incomplete, shows placeholder dashes

**Styling**:
- Nested card structure (gray background with white inner card)
- Category badge: red background for HC, other colors for lower categories
- Stats: large bold numbers with small gray labels below
- Time: 4xl bold orange
- Speed: small gray text

**Implementation Steps**:
1. Create stats row component
2. Create category badge component
3. Create time display component
4. Handle incomplete state with placeholder content
5. Compose into card layout

**Passing Tests**:
- [ ] Displays correct climb name and location
- [ ] Shows "Custom Climb" for custom selection
- [ ] Hides location for custom climb
- [ ] Distance formatted with 1 decimal place
- [ ] Elevation formatted with thousands separator
- [ ] Time formatted as H:MM:SS or MM:SS
- [ ] Incomplete custom shows dashes for missing values

---

### 6. FormulaDetails

**Purpose**: Collapsible section explaining the physics and showing user's values.

**Why it exists**: Power users want to understand the math. Educational value. Transparency.

**Props**:
```typescript
interface FormulaDetailsProps {
  riderWeight: number;
  bikeWeight: number;
  power: number;
  powerToWeight: number;
  climb: Climb | null;
  climbResult: ClimbResult | null;
}
```

**Behavior**:
- Collapsed by default
- Expands to show three sections:
  1. Power-to-weight formula with user's values
  2. Climb time physics model with user's values
  3. Assumptions list

**Styling**:
- Uses HTML `<details>` element for native collapse
- Chevron icon rotates 180° when open
- Gray code blocks for formulas
- Orange text for calculated results

**Implementation Steps**:
1. Create Collapsible component wrapper
2. Build PowerToWeightFormula sub-component
3. Build ClimbTimeFormula sub-component
4. Build AssumptionsList sub-component
5. Compose with proper spacing

**Passing Tests**:
- [ ] Starts collapsed
- [ ] Click opens section
- [ ] Click again closes section
- [ ] Chevron rotates on open
- [ ] Power formula shows user's actual values
- [ ] Climb formula shows actual calculation steps
- [ ] All assumptions are listed

---

### 7. GearingSection

**Purpose**: Analyze gearing options for the calculated climbing speed.

**Why it exists**: Helps users understand if their gearing is appropriate for the climb.

**Props**:
```typescript
interface GearingSectionProps {
  speedKmh: number;
  selectedChainringId: string;
  selectedCassetteId: string;
  showTooFast: boolean;
  showTooSlow: boolean;
  onChainringChange: (id: string) => void;
  onCassetteChange: (id: string) => void;
  onToggleTooFast: () => void;
  onToggleTooSlow: () => void;
}
```

**Behavior**:
1. Two dropdowns for chainring and cassette selection
2. Shows calculated speed context
3. Generates gear table for small chainring only (climbing focus)
4. Groups gears into too-fast, ideal/ok, and too-slow
5. Too-fast and too-slow hidden by default with show/hide buttons

**Styling**:
- 2-column grid for dropdowns
- Explanatory text with speed in bold
- Table with hover states
- Faded (opacity-50) rows for non-ideal gears
- Pill buttons for show/hide

**Implementation Steps**:
1. Create chainring and cassette selects
2. Build GearTable component
3. Build GearRow component
4. Implement gear categorization logic
5. Build show/hide toggle buttons
6. Add GearLegend component
7. Add gear inches explainer collapsible

**Passing Tests**:
- [ ] Chainring select shows all 9 options
- [ ] Cassette select shows all 11 options
- [ ] Gear table shows only small chainring gears
- [ ] Gears sorted by gear inches (easiest first)
- [ ] Ideal gears (70-95 RPM) shown in green
- [ ] OK gears (60-70, 95-110) shown in yellow
- [ ] Too slow/fast (<60, >110) shown in red
- [ ] Too fast/slow sections hidden by default
- [ ] Show button reveals hidden gears
- [ ] Hide button hides gears again
- [ ] Button shows count of hidden gears

---

### 8. GearTable

**Purpose**: Display gear combinations with calculated metrics.

**Why it exists**: Core output of gearing analysis - shows what cadence each gear requires.

**Props**:
```typescript
interface GearTableProps {
  gears: GearAnalysis[];
  showTooFast: boolean;
  showTooSlow: boolean;
  tooFastCount: number;
  tooSlowCount: number;
  onToggleTooFast: () => void;
  onToggleTooSlow: () => void;
}

interface GearAnalysis {
  chainring: number;
  cog: number;
  ratio: number;
  gearInches: number;
  rpm: number;
  status: RpmStatusInfo;
}
```

**Table Columns**:
| Column | Content | Alignment |
|--------|---------|-----------|
| Gear | "34×28" format | Left |
| Ratio | 2 decimal places | Center |
| Gear Inches | 1 decimal + " | Center |
| RPM Needed | Rounded integer | Center |
| Status | Colored dot + label | Center |

**Behavior**:
- Rows grouped into three tbody elements (too-fast, ideal, too-slow)
- Too-fast and too-slow tbodies hidden by default
- Show/hide buttons appear when there are hidden gears
- Faded styling (opacity-50) for non-ideal gears

**Styling**:
- Light border between rows
- Hover state on rows
- Status column: colored dot + text label
- RPM text colored based on status

**Implementation Steps**:
1. Create table structure with three tbody
2. Build GearRow component
3. Implement filtering/grouping logic
4. Build show/hide toggle buttons
5. Handle visibility state

**Passing Tests**:
- [ ] All columns display correct data
- [ ] Ratio formatted to 2 decimal places
- [ ] Gear inches formatted to 1 decimal place
- [ ] RPM rounded to integer
- [ ] Status dot color matches category
- [ ] Status label matches category
- [ ] Faded rows for non-ideal gears
- [ ] Correct gears in each category

---

### 9. GearLegend

**Purpose**: Explain the color coding in the gear table.

**Why it exists**: Users need to understand what the colors mean.

**Props**: None (static content)

**Content**:
- Green dot: "Ideal (70-95 RPM)"
- Yellow dot: "Acceptable (60-70 or 95-110 RPM)"
- Red dot: "Difficult (<60 or >110 RPM)"

**Styling**:
- Horizontal flex layout with wrap
- Small colored circles (w-3 h-3)
- Gray explanatory text

**Implementation Steps**:
1. Create static legend component
2. Use consistent dot styling with table

**Passing Tests**:
- [ ] Three legend items displayed
- [ ] Correct colors for each
- [ ] Correct RPM ranges in text

---

### 10. Header

**Purpose**: Page title and description.

**Styling**:
- Centered text
- 3xl bold title
- Gray description

---

### 11. Footer

**Purpose**: Attribution and data sources.

**Content**:
- Links to ClimbFinder and PJAMM Cycling (data sources)
- Link to cycling physics reference

**Styling**:
- Centered gray text
- Orange hover underline for links

---

## Testing Requirements

### Unit Tests (lib/calculations.ts)

```typescript
describe('calculatePowerToWeight', () => {
  it('calculates correctly for typical values', () => {
    expect(calculatePowerToWeight(200, 70)).toBeCloseTo(2.86, 2);
  });

  it('handles edge case of very light rider', () => {
    expect(calculatePowerToWeight(200, 50)).toBeCloseTo(4.0, 2);
  });
});

describe('calculateClimbTime', () => {
  it('calculates Alpe dHuez correctly for 200W/78kg', () => {
    const result = calculateClimbTime(200, 78, PRESET_CLIMBS['alpe-dhuez']);
    expect(result.timeSeconds).toBeCloseTo(5018, -1); // Within 10 seconds
    expect(result.avgSpeedKmh).toBeCloseTo(9.9, 1);
  });

  it('faster time for higher power', () => {
    const slow = calculateClimbTime(200, 78, PRESET_CLIMBS['alpe-dhuez']);
    const fast = calculateClimbTime(300, 78, PRESET_CLIMBS['alpe-dhuez']);
    expect(fast.timeSeconds).toBeLessThan(slow.timeSeconds);
  });

  it('slower time for heavier rider', () => {
    const light = calculateClimbTime(200, 70, PRESET_CLIMBS['alpe-dhuez']);
    const heavy = calculateClimbTime(200, 90, PRESET_CLIMBS['alpe-dhuez']);
    expect(heavy.timeSeconds).toBeGreaterThan(light.timeSeconds);
  });
});

describe('calculateGearInches', () => {
  it('calculates 34x28 correctly', () => {
    expect(calculateGearInches(34, 28)).toBeCloseTo(32.8, 1);
  });

  it('calculates 50x11 correctly', () => {
    expect(calculateGearInches(50, 11)).toBeCloseTo(122.7, 1);
  });
});

describe('calculateCadence', () => {
  it('returns reasonable RPM for climbing speed', () => {
    const gearInches = calculateGearInches(34, 28);
    const rpm = calculateCadence(10, gearInches); // 10 km/h
    expect(rpm).toBeGreaterThan(60);
    expect(rpm).toBeLessThan(100);
  });
});

describe('getRpmStatus', () => {
  it('returns ideal for 80 RPM', () => {
    expect(getRpmStatus(80).status).toBe('ideal');
  });

  it('returns ok for 65 RPM', () => {
    expect(getRpmStatus(65).status).toBe('ok');
  });

  it('returns too-slow for 50 RPM', () => {
    expect(getRpmStatus(50).status).toBe('too-slow');
  });

  it('returns too-fast for 120 RPM', () => {
    expect(getRpmStatus(120).status).toBe('too-fast');
  });
});

describe('getPowerCategory', () => {
  it('returns correct category for each range', () => {
    expect(getPowerCategory(6.5)).toBe('World-class professional');
    expect(getPowerCategory(5.5)).toBe('Professional / Elite');
    expect(getPowerCategory(4.5)).toBe('Very strong amateur / Cat 1-2');
    expect(getPowerCategory(3.7)).toBe('Strong amateur / Cat 3');
    expect(getPowerCategory(3.2)).toBe('Good fitness / Cat 4-5');
    expect(getPowerCategory(2.7)).toBe('Recreational rider');
    expect(getPowerCategory(2.0)).toBe('Beginner');
  });
});

describe('unit conversions', () => {
  it('converts kg to lb correctly', () => {
    expect(kgToLb(70)).toBeCloseTo(154.3, 1);
  });

  it('converts lb to kg correctly', () => {
    expect(lbToKg(154.3)).toBeCloseTo(70, 1);
  });

  it('round-trips without significant loss', () => {
    const original = 70;
    const converted = lbToKg(kgToLb(original));
    expect(converted).toBeCloseTo(original, 5);
  });
});

describe('formatTime', () => {
  it('formats hours correctly', () => {
    expect(formatTime(3661)).toBe('1:01:01');
  });

  it('formats minutes only when under an hour', () => {
    expect(formatTime(125)).toBe('2:05');
  });

  it('pads minutes and seconds', () => {
    expect(formatTime(3605)).toBe('1:00:05');
  });
});

describe('calculateMissingClimbValue', () => {
  it('calculates gradient from distance and elevation', () => {
    const result = calculateMissingClimbValue(10, 800, null, 'elevation');
    expect(result?.gradient).toBeCloseTo(8.0, 1);
  });

  it('calculates elevation from distance and gradient', () => {
    const result = calculateMissingClimbValue(10, null, 8, 'gradient');
    expect(result?.elevation).toBeCloseTo(800, 0);
  });

  it('calculates distance from elevation and gradient', () => {
    const result = calculateMissingClimbValue(null, 800, 8, 'elevation');
    expect(result?.distance).toBeCloseTo(10, 1);
  });

  it('returns null when only one value provided', () => {
    expect(calculateMissingClimbValue(10, null, null, 'distance')).toBeNull();
  });
});
```

### Component Tests

```typescript
describe('RiderStatsSection', () => {
  it('renders all three inputs', () => {
    render(<RiderStatsSection {...defaultProps} />);
    expect(screen.getByLabelText('Rider Weight')).toBeInTheDocument();
    expect(screen.getByLabelText('Bike Weight')).toBeInTheDocument();
    expect(screen.getByLabelText('Sustained Power')).toBeInTheDocument();
  });

  it('displays power-to-weight ratio', () => {
    render(<RiderStatsSection {...defaultProps} powerToWeight={2.86} />);
    expect(screen.getByText('2.86 W/kg')).toBeInTheDocument();
  });

  it('calls onChange handlers when inputs change', () => {
    const onRiderWeightChange = jest.fn();
    render(<RiderStatsSection {...defaultProps} onRiderWeightChange={onRiderWeightChange} />);

    fireEvent.change(screen.getByLabelText('Rider Weight'), { target: { value: '75' } });
    expect(onRiderWeightChange).toHaveBeenCalledWith(75);
  });
});

describe('UnitToggle', () => {
  it('displays kg as active when unit is kg', () => {
    render(<UnitToggle unit="kg" onChange={() => {}} />);
    expect(screen.getByText('kg')).toHaveClass('text-orange-600');
    expect(screen.getByText('lb')).toHaveClass('text-gray-400');
  });

  it('calls onChange when clicked', () => {
    const onChange = jest.fn();
    render(<UnitToggle unit="kg" onChange={onChange} />);

    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith('lb');
  });
});

describe('ClimbSelector', () => {
  it('renders all preset climbs', () => {
    render(<ClimbSelector selectedClimbId="alpe-dhuez" onChange={() => {}} />);

    expect(screen.getByText("Alpe d'Huez (France)")).toBeInTheDocument();
    expect(screen.getByText("Col du Galibier (France)")).toBeInTheDocument();
    expect(screen.getByText("Haleakala (Hawaii, USA)")).toBeInTheDocument();
  });

  it('includes custom option', () => {
    render(<ClimbSelector selectedClimbId="alpe-dhuez" onChange={() => {}} />);
    expect(screen.getByText('Enter your own climb...')).toBeInTheDocument();
  });
});

describe('CustomClimbForm', () => {
  it('auto-calculates gradient when distance and elevation entered', async () => {
    const onFieldChange = jest.fn();
    render(<CustomClimbForm
      distance={10}
      elevation={800}
      gradient={null}
      onFieldChange={onFieldChange}
    />);

    // The form should have calculated gradient
    expect(screen.getByDisplayValue('8.0')).toBeInTheDocument();
  });
});

describe('GearTable', () => {
  const mockGears: GearAnalysis[] = [
    { chainring: 34, cog: 34, ratio: 1.0, gearInches: 27, rpm: 85, status: getRpmStatus(85) },
    { chainring: 34, cog: 28, ratio: 1.21, gearInches: 32.8, rpm: 70, status: getRpmStatus(70) },
    { chainring: 34, cog: 11, ratio: 3.09, gearInches: 83.5, rpm: 27, status: getRpmStatus(27) },
  ];

  it('renders all gear rows', () => {
    render(<GearTable gears={mockGears} {...defaultProps} />);
    expect(screen.getByText('34×34')).toBeInTheDocument();
    expect(screen.getByText('34×28')).toBeInTheDocument();
  });

  it('shows correct status colors', () => {
    render(<GearTable gears={mockGears} {...defaultProps} />);
    expect(screen.getByText('Ideal')).toBeInTheDocument();
    expect(screen.getByText('Too slow')).toBeInTheDocument();
  });

  it('hides too-slow gears by default', () => {
    render(<GearTable gears={mockGears} showTooSlow={false} {...defaultProps} />);
    // The too-slow section should be hidden
    expect(screen.queryByText('34×11')).not.toBeVisible();
  });
});
```

### Integration Tests

```typescript
describe('Calculator Integration', () => {
  it('updates all derived values when weight changes', async () => {
    render(<CalculatorPage />);

    // Change rider weight
    fireEvent.change(screen.getByLabelText('Rider Weight'), { target: { value: '80' } });

    // Power-to-weight should update
    await waitFor(() => {
      expect(screen.getByText(/2\.50 W\/kg/)).toBeInTheDocument();
    });

    // Climb time should be longer
    // (specific time would depend on default climb)
  });

  it('converts units when toggle is clicked', async () => {
    render(<CalculatorPage />);

    // Default is kg with value 70
    expect(screen.getByDisplayValue('70')).toBeInTheDocument();

    // Click toggle
    fireEvent.click(screen.getByRole('switch'));

    // Should now show lb value
    await waitFor(() => {
      expect(screen.getByDisplayValue('154.3')).toBeInTheDocument();
    });
  });

  it('shows custom climb form when custom selected', async () => {
    render(<CalculatorPage />);

    // Select custom climb
    fireEvent.change(screen.getByLabelText('Select Climb'), { target: { value: 'custom' } });

    // Custom form should appear
    await waitFor(() => {
      expect(screen.getByLabelText('Distance')).toBeInTheDocument();
      expect(screen.getByLabelText('Elevation Gain')).toBeInTheDocument();
      expect(screen.getByLabelText('Avg Gradient')).toBeInTheDocument();
    });
  });

  it('gear table updates when speed changes', async () => {
    render(<CalculatorPage />);

    // Increase power (should increase speed)
    fireEvent.change(screen.getByLabelText('Sustained Power'), { target: { value: '300' } });

    // RPM values in gear table should change
    // (specific values depend on implementation)
  });
});
```

---

## Acceptance Criteria Summary

### Functional Requirements
1. [ ] User can enter rider weight, bike weight, and power
2. [ ] User can toggle between kg and lb (values convert)
3. [ ] Power-to-weight ratio displays with category
4. [ ] User can select from 5 preset climbs
5. [ ] User can enter custom climb with auto-calculation
6. [ ] Estimated climb time displays correctly
7. [ ] Average speed displays correctly
8. [ ] Formula section is collapsible and shows calculations
9. [ ] User can select chainring and cassette
10. [ ] Gear table shows RPM, ratio, gear inches for each gear
11. [ ] Gears are color-coded by cadence appropriateness
12. [ ] Non-ideal gears are hidden by default with show/hide buttons

### Non-Functional Requirements
1. [ ] Page loads in under 2 seconds
2. [ ] All calculations update in real-time (no noticeable lag)
3. [ ] Responsive layout works on mobile and desktop
4. [ ] All interactive elements are keyboard accessible
5. [ ] Colors meet WCAG 2.1 contrast requirements
6. [ ] No console errors in production

### Technical Requirements
1. [ ] TypeScript strict mode enabled
2. [ ] All components have prop types defined
3. [ ] Unit test coverage > 80% for calculation functions
4. [ ] Component tests for all user interactions
5. [ ] ESLint and Prettier configured
6. [ ] Builds successfully with no warnings

---

## Migration Checklist

When converting from vanilla HTML/JS to Next.js/React:

1. [ ] Initialize Next.js project with TypeScript
2. [ ] Configure Tailwind CSS
3. [ ] Create type definitions (lib/types.ts)
4. [ ] Port calculation functions (lib/calculations.ts)
5. [ ] Create data files (lib/data/*.ts)
6. [ ] Build UI primitives (components/ui/*)
7. [ ] Build feature components (components/calculator/*)
8. [ ] Create main state hook (hooks/useCalculator.ts)
9. [ ] Compose page component (app/page.tsx)
10. [ ] Write unit tests
11. [ ] Write component tests
12. [ ] Write integration tests
13. [ ] Verify all acceptance criteria
14. [ ] Deploy to Vercel
