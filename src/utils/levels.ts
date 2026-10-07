import { LevelConfig, BoardSize } from '../types/game';
import { getStandardRegions, getIrregularRegions, generateSudokuLevel } from './sudoku';
import { ARTWORK_IDS } from './hiddenPictures';

// Deterministic level caching so every level is consistently repeatable and loads instantly
const LEVEL_CACHE: Record<number, LevelConfig> = {};

export function getLevelConfig(levelId: number): LevelConfig {
  if (LEVEL_CACHE[levelId]) {
    return LEVEL_CACHE[levelId];
  }

  let size: BoardSize = 9;
  let symbolCount = 9;
  let chapter = 'Güneş Çayırı';
  let difficulty: 'kolay' | 'orta' | 'zor' | 'uzman' = 'kolay';
  let maxMistakes: number | undefined = undefined;
  let regions: number[][];
  let clueRatio = 0.5;

  const artworkIndex = (levelId - 1) % ARTWORK_IDS.length;
  const hiddenArtId = ARTWORK_IDS[artworkIndex];

  let irregularVariant: ('zigzag' | 'rings' | 'triangles' | 'asymmetric') | undefined = undefined;

  if (levelId <= 10) {
    // Levels 1-10: 4x4, 4 symbols
    size = 4;
    symbolCount = 4;
    chapter = 'Bölüm 1: Filiz Bahçesi';
    difficulty = 'kolay';
    regions = getStandardRegions(4);
    // Extremely easy: 9 to 11 clues out of 16
    clueRatio = 0.65 - (levelId / 10) * 0.15;
  } else if (levelId <= 25) {
    // Levels 11-25: 6x6, 6 symbols
    size = 6;
    symbolCount = 6;
    chapter = 'Bölüm 2: Akarsu Vadisi';
    difficulty = levelId <= 18 ? 'kolay' : 'orta';
    regions = getStandardRegions(6);
    // 20 to 24 clues out of 36
    clueRatio = 0.62 - ((levelId - 10) / 15) * 0.15;
  } else if (levelId <= 50) {
    // Levels 26-50: 9x9 standard (3x3 square regions)
    size = 9;
    symbolCount = 9;
    chapter = 'Bölüm 3: Güneş Çayırı';
    difficulty = levelId <= 38 ? 'orta' : 'zor';
    regions = getStandardRegions(9);
    // 40 to 32 clues out of 81
    clueRatio = 0.50 - ((levelId - 25) / 25) * 0.12;
  } else if (levelId <= 70) {
    // Levels 51-70: 9x9 standard 3x3 square regions (Challenging logic)
    size = 9;
    symbolCount = 9;
    chapter = 'Bölüm 4: Kristal Zirvesi';
    difficulty = 'zor';
    regions = getStandardRegions(9);
    clueRatio = 0.42 - ((levelId - 50) / 20) * 0.08;
  } else if (levelId <= 85) {
    // Levels 71-85: 9x9 standard 3x3 square regions (Hidden-picture discovery)
    size = 9;
    symbolCount = 9;
    chapter = 'Bölüm 5: Gizli Hatıralar';
    difficulty = 'zor';
    regions = getStandardRegions(9);
    clueRatio = 0.38 - ((levelId - 70) / 15) * 0.06;
  } else {
    // Levels 86-100: 9x9 standard 3x3 square regions (Expert mode with 3 strikes)
    size = 9;
    symbolCount = 9;
    chapter = 'Bölüm 6: Usta Tapınağı';
    difficulty = 'uzman';
    maxMistakes = 3;
    regions = getStandardRegions(9);
    clueRatio = 0.32 - ((levelId - 85) / 15) * 0.04;
  }

  const totalCells = size * size;
  const clueCount = Math.max(Math.floor(totalCells * clueRatio), size + 2);
  const seed = levelId * 8819 + 42;

  const { solution, initialClues } = generateSudokuLevel(
    size,
    regions,
    clueCount,
    seed
  );

  const config: LevelConfig = {
    id: levelId,
    title: `Aşama ${levelId}`,
    chapter,
    size,
    symbolCount,
    hiddenArtId,
    regions,
    initialClues,
    solution,
    difficulty,
    maxMistakes,
  };

  LEVEL_CACHE[levelId] = config;
  return config;
}

// Daily Puzzle generator based on date string (YYYY-MM-DD)
export function getDailyLevelConfig(dateString: string): LevelConfig {
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = (hash << 5) - hash + dateString.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);

  const size: BoardSize = 6;
  const symbolCount = 6;
  const regions = getStandardRegions(size);
  const artIdx = absHash % ARTWORK_IDS.length;
  const hiddenArtId = ARTWORK_IDS[artIdx];

  const totalCells = size * size;
  const clueCount = Math.floor(totalCells * 0.52);

  const { solution, initialClues } = generateSudokuLevel(size, regions, clueCount, absHash);

  return {
    id: 9999, // Special ID for daily puzzle
    title: `Günün İzi — ${dateString}`,
    chapter: 'Günün Özel Bulmacası',
    size,
    symbolCount,
    hiddenArtId,
    regions,
    initialClues,
    solution,
    difficulty: 'orta',
  };
}
