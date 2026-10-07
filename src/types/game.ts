export interface SymbolDef {
  id: number;
  name: string;
  trName: string;
  themeColor: string;
  accentColor: string;
  bgTint: string;
  description: string;
  traceType: 'sprout' | 'leaf' | 'water' | 'sun' | 'moon' | 'spark' | 'crystal' | 'spiral' | 'star';
  shapeDescription: string;
}

export const SYMBOLS: Record<number, SymbolDef> = {
  1: {
    id: 1,
    name: 'Sprout',
    trName: 'Filiz',
    themeColor: '#16A34A', // green-600
    accentColor: '#86EFAC', // green-300
    bgTint: 'rgba(22, 163, 74, 0.12)',
    description: 'Büyüyen taze filiz. Yaşamın ilk izi.',
    traceType: 'sprout',
    shapeDescription: 'Kavisli gövde ve çift minik yaprak',
  },
  2: {
    id: 2,
    name: 'Leaf',
    trName: 'Yaprak',
    themeColor: '#059669', // emerald-600
    accentColor: '#6EE7B7', // emerald-300
    bgTint: 'rgba(5, 150, 105, 0.12)',
    description: 'Zarif orman yaprağı. Doğanın dengesi.',
    traceType: 'leaf',
    shapeDescription: 'Damarlı damla formunda yaprak',
  },
  3: {
    id: 3,
    name: 'Water Drop',
    trName: 'Su Damlası',
    themeColor: '#0284C7', // sky-600
    accentColor: '#7DD3FC', // sky-300
    bgTint: 'rgba(2, 132, 199, 0.12)',
    description: 'Berrak su damlası. Durgun dalgalanma.',
    traceType: 'water',
    shapeDescription: 'Yukarı sivrilen akıcı damla',
  },
  4: {
    id: 4,
    name: 'Sun',
    trName: 'Güneş',
    themeColor: '#EA580C', // orange-600
    accentColor: '#FDE047', // yellow-300
    bgTint: 'rgba(234, 88, 12, 0.12)',
    description: 'Sıcak parlak güneş. Aydınlatan merkez.',
    traceType: 'sun',
    shapeDescription: 'Dairesel çekirdek ve sekiz ışıma ışını',
  },
  5: {
    id: 5,
    name: 'Moon',
    trName: 'Ay',
    themeColor: '#6366F1', // indigo-500
    accentColor: '#C7D2FE', // indigo-200
    bgTint: 'rgba(99, 102, 241, 0.12)',
    description: 'Hilal ay. Sakin gece gölgesi.',
    traceType: 'moon',
    shapeDescription: 'Zarif kavisli hilal silueti',
  },
  6: {
    id: 6,
    name: 'Spark',
    trName: 'Kıvılcım',
    themeColor: '#D97706', // amber-600
    accentColor: '#FDE68A', // amber-200
    bgTint: 'rgba(217, 119, 6, 0.12)',
    description: 'Canlı kıvılcım. Anlık zihinsel enerji.',
    traceType: 'spark',
    shapeDescription: 'Dört kollu kıvrak elektrik şimşeği',
  },
  7: {
    id: 7,
    name: 'Crystal',
    trName: 'Kristal',
    themeColor: '#9333EA', // purple-600
    accentColor: '#E9D5FF', // purple-200
    bgTint: 'rgba(147, 51, 234, 0.12)',
    description: 'Geometrik kristal. Prizmatik netlik.',
    traceType: 'crystal',
    shapeDescription: 'Çok yüzeyli elmas prizması',
  },
  8: {
    id: 8,
    name: 'Spiral',
    trName: 'Sarmal',
    themeColor: '#0D9488', // teal-600
    accentColor: '#99F6E4', // teal-200
    bgTint: 'rgba(13, 148, 136, 0.12)',
    description: 'Altın sarmal. Sürekli akış.',
    traceType: 'spiral',
    shapeDescription: 'İçe kıvrılan logaritmik döngü',
  },
  9: {
    id: 9,
    name: 'Light Star',
    trName: 'Işık Yıldızı',
    themeColor: '#E11D48', // rose-600
    accentColor: '#FECDD3', // rose-200
    bgTint: 'rgba(225, 29, 72, 0.12)',
    description: 'Dört köşeli ışık yıldızı. Yol gösterici fener.',
    traceType: 'star',
    shapeDescription: 'Simetrik dörtlü kutup ışığı',
  },
};

export type BoardSize = 4 | 6 | 9;

export interface CellData {
  row: number;
  col: number;
  value: number | null;
  initial: boolean;
  solution: number;
  regionId: number;
  notes: number[];
  error?: boolean;
}

export interface TraceEffect {
  id: string;
  row: number;
  col: number;
  symbolId: number;
  timestamp: number;
}

export interface RegionConnection {
  type: 'row' | 'col' | 'region';
  index: number;
  symbolId: number;
  timestamp: number;
}

export interface HiddenArtPath {
  id: string;
  d: string;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  strokeLinecap?: 'inherit' | 'round' | 'butt' | 'square';
  opacity?: number;
  order: number; // order 0..N corresponding to completion threshold
}

export interface HiddenArt {
  id: string;
  name: string;
  trName: string;
  category: string;
  viewBox: string;
  accentColor: string;
  paths: HiddenArtPath[];
  description: string;
}

export interface LevelConfig {
  id: number;
  title: string;
  chapter: string;
  size: BoardSize;
  symbolCount: number;
  hiddenArtId: string;
  regions: number[][]; // grid of region IDs
  initialClues: { row: number; col: number; value: number }[];
  solution: number[][];
  difficulty: 'kolay' | 'orta' | 'zor' | 'uzman';
  maxMistakes?: number; // for expert levels (e.g. 3)
}

export interface GameStats {
  elapsedSeconds: number;
  mistakes: number;
  hintsUsed: number;
  isCompleted: boolean;
}

export type ThemeId =
  | 'sand'
  | 'dark'
  | 'porcelain'
  | 'forest'
  | 'cosmic'
  | 'ocean'
  | 'sunset'
  | 'bamboo';

export interface UserProgress {
  unlockedLevel: number;
  completedLevels: Record<
    number,
    {
      stars: number;
      bestTime: number;
      hintsUsed: number;
      completedAt: string;
    }
  >;
  dailyStreak: number;
  lastDailyCompletedDate: string | null;
  settings: {
    sound: boolean;
    vibration: boolean;
    highContrast: boolean;
    theme: ThemeId;
  };
}
