import type { Climb } from '../types';

export const PRESET_CLIMBS: Record<string, Climb> = {
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

export const CLIMB_OPTIONS = Object.values(PRESET_CLIMBS);
