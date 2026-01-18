import type { Climb, ClimbCategory } from '../types';

export const PRESET_CLIMBS: Record<string, Climb> = {
  // ============ HORS CATÉGORIE (HC) ============
  'alpe-dhuez': {
    id: 'alpe-dhuez',
    name: "Alpe d'Huez",
    location: "Isère, French Alps",
    distance: 13.8,
    elevation: 1122,
    gradient: 8.1,
    category: "HC",
    profile: [
      { distance: 0, elevation: 744, gradient: 10.4 },
      { distance: 1.5, elevation: 900, gradient: 10.6 },
      { distance: 3.5, elevation: 1070, gradient: 8.5 },
      { distance: 5.5, elevation: 1230, gradient: 8.0 },
      { distance: 7.5, elevation: 1385, gradient: 7.8 },
      { distance: 9.5, elevation: 1540, gradient: 7.8 },
      { distance: 11.5, elevation: 1700, gradient: 8.0 },
      { distance: 13.8, elevation: 1866, gradient: 7.2 }
    ]
  },
  'ventoux': {
    id: 'ventoux',
    name: "Mont Ventoux",
    location: "Provence, France (via Bédoin)",
    distance: 21.5,
    elevation: 1609,
    gradient: 7.6,
    category: "HC",
    profile: [
      { distance: 0, elevation: 300, gradient: 4.5 },
      { distance: 3, elevation: 435, gradient: 6.8 },
      { distance: 6, elevation: 640, gradient: 9.5 },
      { distance: 9, elevation: 925, gradient: 9.8 },
      { distance: 12, elevation: 1200, gradient: 9.2 },
      { distance: 15, elevation: 1460, gradient: 8.7 },
      { distance: 18, elevation: 1700, gradient: 8.0 },
      { distance: 21.5, elevation: 1909, gradient: 6.0 }
    ]
  },
  'galibier': {
    id: 'galibier',
    name: "Col du Galibier",
    location: "Savoie, French Alps (via Télégraphe)",
    distance: 18.1,
    elevation: 1245,
    gradient: 6.9,
    category: "HC",
    profile: [
      { distance: 0, elevation: 1404, gradient: 6.8 },
      { distance: 3, elevation: 1608, gradient: 7.2 },
      { distance: 6, elevation: 1825, gradient: 7.5 },
      { distance: 9, elevation: 2040, gradient: 7.2 },
      { distance: 12, elevation: 2250, gradient: 7.0 },
      { distance: 15, elevation: 2450, gradient: 6.7 },
      { distance: 18.1, elevation: 2649, gradient: 6.4 }
    ]
  },
  'tourmalet': {
    id: 'tourmalet',
    name: "Col du Tourmalet",
    location: "Hautes-Pyrénées, France (via La Mongie)",
    distance: 17.1,
    elevation: 1124,
    gradient: 7.4,
    category: "HC",
    profile: [
      { distance: 0, elevation: 990, gradient: 7.0 },
      { distance: 3, elevation: 1200, gradient: 7.2 },
      { distance: 6, elevation: 1415, gradient: 7.8 },
      { distance: 9, elevation: 1650, gradient: 7.8 },
      { distance: 12, elevation: 1880, gradient: 7.7 },
      { distance: 15, elevation: 2050, gradient: 5.7 },
      { distance: 17.1, elevation: 2114, gradient: 3.0 }
    ]
  },
  'stelvio': {
    id: 'stelvio',
    name: "Passo dello Stelvio",
    location: "Lombardy, Italian Alps (via Prato)",
    distance: 24.3,
    elevation: 1808,
    gradient: 7.4,
    category: "HC",
    profile: [
      { distance: 0, elevation: 950, gradient: 6.5 },
      { distance: 4, elevation: 1210, gradient: 6.8 },
      { distance: 8, elevation: 1480, gradient: 7.2 },
      { distance: 12, elevation: 1780, gradient: 7.5 },
      { distance: 16, elevation: 2100, gradient: 8.0 },
      { distance: 20, elevation: 2450, gradient: 8.8 },
      { distance: 24.3, elevation: 2758, gradient: 7.2 }
    ]
  },
  'mortirolo': {
    id: 'mortirolo',
    name: "Passo del Mortirolo",
    location: "Lombardy, Italy (via Mazzo)",
    distance: 12.4,
    elevation: 1300,
    gradient: 10.5,
    category: "HC",
    profile: [
      { distance: 0, elevation: 552, gradient: 10.0 },
      { distance: 2, elevation: 752, gradient: 11.5 },
      { distance: 4, elevation: 982, gradient: 12.8 },
      { distance: 6, elevation: 1220, gradient: 11.9 },
      { distance: 8, elevation: 1440, gradient: 11.0 },
      { distance: 10, elevation: 1640, gradient: 10.0 },
      { distance: 12.4, elevation: 1852, gradient: 8.8 }
    ]
  },
  'angliru': {
    id: 'angliru',
    name: "Alto de l'Angliru",
    location: "Asturias, Spain",
    distance: 12.5,
    elevation: 1266,
    gradient: 10.1,
    category: "HC",
    profile: [
      { distance: 0, elevation: 395, gradient: 7.5 },
      { distance: 2, elevation: 545, gradient: 8.5 },
      { distance: 4, elevation: 715, gradient: 9.5 },
      { distance: 6, elevation: 905, gradient: 12.0 },
      { distance: 8, elevation: 1145, gradient: 14.5 },
      { distance: 10, elevation: 1390, gradient: 12.3 },
      { distance: 12.5, elevation: 1661, gradient: 10.8 }
    ]
  },
  'zoncolan': {
    id: 'zoncolan',
    name: "Monte Zoncolan",
    location: "Friuli, Italy (via Ovaro)",
    distance: 10.1,
    elevation: 1200,
    gradient: 11.9,
    category: "HC",
    profile: [
      { distance: 0, elevation: 520, gradient: 10.0 },
      { distance: 2, elevation: 720, gradient: 13.5 },
      { distance: 4, elevation: 990, gradient: 14.5 },
      { distance: 6, elevation: 1270, gradient: 14.0 },
      { distance: 8, elevation: 1510, gradient: 12.0 },
      { distance: 10.1, elevation: 1720, gradient: 10.0 }
    ]
  },
  'sa-calobra': {
    id: 'sa-calobra',
    name: "Sa Calobra",
    location: "Mallorca, Spain",
    distance: 9.4,
    elevation: 682,
    gradient: 7.3,
    category: "HC",
    profile: [
      { distance: 0, elevation: 0, gradient: 6.5 },
      { distance: 1.5, elevation: 98, gradient: 7.0 },
      { distance: 3, elevation: 210, gradient: 7.5 },
      { distance: 4.5, elevation: 328, gradient: 7.2 },
      { distance: 6, elevation: 445, gradient: 7.8 },
      { distance: 7.5, elevation: 568, gradient: 8.2 },
      { distance: 9.4, elevation: 682, gradient: 6.0 }
    ]
  },
  'haleakala': {
    id: 'haleakala',
    name: "Haleakala",
    location: "Maui, Hawaii, USA",
    distance: 57,
    elevation: 3080,
    gradient: 5.4,
    category: "HC",
    profile: [
      { distance: 0, elevation: 0, gradient: 4.5 },
      { distance: 10, elevation: 450, gradient: 5.0 },
      { distance: 20, elevation: 950, gradient: 5.5 },
      { distance: 30, elevation: 1500, gradient: 5.8 },
      { distance: 40, elevation: 2080, gradient: 5.8 },
      { distance: 50, elevation: 2660, gradient: 5.8 },
      { distance: 57, elevation: 3080, gradient: 6.0 }
    ]
  },

  // ============ CATEGORY 1 ============
  'madeleine': {
    id: 'madeleine',
    name: "Col de la Madeleine",
    location: "Savoie, French Alps",
    distance: 19.2,
    elevation: 1520,
    gradient: 7.9,
    category: "Cat 1",
    profile: [
      { distance: 0, elevation: 480, gradient: 6.5 },
      { distance: 4, elevation: 740, gradient: 7.5 },
      { distance: 8, elevation: 1040, gradient: 8.0 },
      { distance: 12, elevation: 1360, gradient: 8.5 },
      { distance: 16, elevation: 1700, gradient: 8.5 },
      { distance: 19.2, elevation: 2000, gradient: 9.4 }
    ]
  },
  'gavia': {
    id: 'gavia',
    name: "Passo Gavia",
    location: "Lombardy, Italian Alps",
    distance: 16.5,
    elevation: 1363,
    gradient: 8.3,
    category: "Cat 1",
    profile: [
      { distance: 0, elevation: 1258, gradient: 7.5 },
      { distance: 3, elevation: 1483, gradient: 8.0 },
      { distance: 6, elevation: 1723, gradient: 8.5 },
      { distance: 9, elevation: 1978, gradient: 8.5 },
      { distance: 12, elevation: 2233, gradient: 8.5 },
      { distance: 16.5, elevation: 2621, gradient: 8.6 }
    ]
  },
  'mt-baldy': {
    id: 'mt-baldy',
    name: "Mt. Baldy",
    location: "California, USA",
    distance: 10.5,
    elevation: 792,
    gradient: 7.5,
    category: "Cat 1",
    profile: [
      { distance: 0, elevation: 1440, gradient: 6.0 },
      { distance: 2, elevation: 1560, gradient: 6.5 },
      { distance: 4, elevation: 1695, gradient: 7.0 },
      { distance: 6, elevation: 1855, gradient: 8.0 },
      { distance: 8, elevation: 2035, gradient: 9.0 },
      { distance: 10.5, elevation: 2232, gradient: 7.9 }
    ]
  },
  'hawk-hill': {
    id: 'hawk-hill',
    name: "Hawk Hill",
    location: "Marin County, California, USA",
    distance: 2.8,
    elevation: 165,
    gradient: 5.9,
    category: "Cat 1",
    profile: [
      { distance: 0, elevation: 0, gradient: 5.0 },
      { distance: 0.7, elevation: 35, gradient: 6.0 },
      { distance: 1.4, elevation: 77, gradient: 6.5 },
      { distance: 2.1, elevation: 126, gradient: 7.0 },
      { distance: 2.8, elevation: 165, gradient: 5.6 }
    ]
  },

  // ============ CATEGORY 2 ============
  'box-hill': {
    id: 'box-hill',
    name: "Box Hill (Zig Zag)",
    location: "Surrey, England",
    distance: 2.5,
    elevation: 129,
    gradient: 5.2,
    category: "Cat 2",
    profile: [
      { distance: 0, elevation: 60, gradient: 4.5 },
      { distance: 0.6, elevation: 87, gradient: 5.0 },
      { distance: 1.2, elevation: 117, gradient: 5.5 },
      { distance: 1.8, elevation: 150, gradient: 5.5 },
      { distance: 2.5, elevation: 189, gradient: 5.5 }
    ]
  },
  'old-la-honda': {
    id: 'old-la-honda',
    name: "Old La Honda Road",
    location: "California, USA",
    distance: 4.9,
    elevation: 393,
    gradient: 7.3,
    category: "Cat 2",
    profile: [
      { distance: 0, elevation: 125, gradient: 6.5 },
      { distance: 1, elevation: 190, gradient: 7.0 },
      { distance: 2, elevation: 260, gradient: 7.5 },
      { distance: 3, elevation: 335, gradient: 7.8 },
      { distance: 4, elevation: 413, gradient: 8.0 },
      { distance: 4.9, elevation: 518, gradient: 7.8 }
    ]
  },
  'gibraltar-road': {
    id: 'gibraltar-road',
    name: "Gibraltar Road",
    location: "Santa Barbara, California, USA",
    distance: 10.8,
    elevation: 792,
    gradient: 7.3,
    category: "Cat 2",
    profile: [
      { distance: 0, elevation: 300, gradient: 6.5 },
      { distance: 2, elevation: 430, gradient: 7.0 },
      { distance: 4, elevation: 570, gradient: 7.5 },
      { distance: 6, elevation: 720, gradient: 7.5 },
      { distance: 8, elevation: 870, gradient: 7.5 },
      { distance: 10.8, elevation: 1092, gradient: 7.9 }
    ]
  },
  'fiesole': {
    id: 'fiesole',
    name: "Salita di Fiesole",
    location: "Florence, Italy",
    distance: 5.5,
    elevation: 295,
    gradient: 5.4,
    category: "Cat 2",
    profile: [
      { distance: 0, elevation: 50, gradient: 4.5 },
      { distance: 1.1, elevation: 100, gradient: 5.0 },
      { distance: 2.2, elevation: 160, gradient: 5.5 },
      { distance: 3.3, elevation: 225, gradient: 5.9 },
      { distance: 4.4, elevation: 295, gradient: 6.4 },
      { distance: 5.5, elevation: 345, gradient: 4.5 }
    ]
  }
};

// Helper to get climbs by category
export function getClimbsByCategory(category: ClimbCategory): Climb[] {
  return Object.values(PRESET_CLIMBS).filter(c => c.category === category);
}

// All climb options as array
export const CLIMB_OPTIONS = Object.values(PRESET_CLIMBS);

// Category display order
export const CATEGORY_ORDER: ClimbCategory[] = ['HC', 'Cat 1', 'Cat 2', 'Cat 3', 'Custom'];

// Category labels for display
export const CATEGORY_LABELS: Record<ClimbCategory, string> = {
  'HC': 'Hors Catégorie (HC)',
  'Cat 1': 'Category 1',
  'Cat 2': 'Category 2',
  'Cat 3': 'Category 3',
  'Custom': 'Custom'
};
