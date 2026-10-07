import { BoardSize } from '../types/game';

// Check if placing value in (r, c) is valid according to row, column and region constraints
export function isValidPlacement(
  grid: (number | null)[][],
  regions: number[][],
  size: BoardSize,
  row: number,
  col: number,
  val: number
): boolean {
  // Check row
  for (let c = 0; c < size; c++) {
    if (c !== col && grid[row][c] === val) return false;
  }
  // Check col
  for (let r = 0; r < size; r++) {
    if (r !== row && grid[r][col] === val) return false;
  }
  // Check region
  const targetRegion = regions[row][col];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if ((r !== row || c !== col) && regions[r][c] === targetRegion && grid[r][c] === val) {
        return false;
      }
    }
  }
  return true;
}

// Generate standard regions
export function getStandardRegions(size: BoardSize): number[][] {
  const regions: number[][] = Array.from({ length: size }, () => Array(size).fill(0));
  if (size === 4) {
    // 2x2 blocks
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        regions[r][c] = Math.floor(r / 2) * 2 + Math.floor(c / 2);
      }
    }
  } else if (size === 6) {
    // 2x3 blocks
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 6; c++) {
        regions[r][c] = Math.floor(r / 2) * 2 + Math.floor(c / 3);
      }
    }
  } else {
    // 3x3 blocks
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        regions[r][c] = Math.floor(r / 3) * 3 + Math.floor(c / 3);
      }
    }
  }
  return regions;
}

// Irregular base templates (9 cells per region, 100% verified valid Sudoku solutions)
const IRREGULAR_BASE_REGIONS = [
  // 0: Zigzag / Stepped
  [
    [0, 0, 0, 0, 1, 1, 1, 2, 2],
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [0, 0, 1, 1, 1, 2, 2, 2, 2],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [6, 6, 6, 6, 7, 7, 7, 8, 8],
    [6, 6, 6, 7, 7, 7, 8, 8, 8],
    [6, 6, 7, 7, 7, 8, 8, 8, 8],
  ],
];

const IRREGULAR_BASE_SOLUTIONS = [
  // 0: Matching valid solution
  [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [5, 6, 7, 1, 8, 9, 2, 3, 4],
    [8, 9, 2, 3, 4, 1, 5, 6, 7],
    [2, 1, 5, 6, 3, 4, 9, 7, 8],
    [3, 4, 8, 7, 9, 2, 6, 1, 5],
    [6, 7, 9, 8, 1, 5, 3, 4, 2],
    [4, 5, 6, 2, 7, 8, 1, 9, 3],
    [7, 8, 1, 9, 2, 3, 4, 5, 6],
    [9, 3, 4, 5, 6, 7, 8, 2, 1],
  ],
];

export function getIrregularRegions(variant: 'zigzag' | 'rings' | 'triangles' | 'asymmetric'): number[][] {
  const baseReg = IRREGULAR_BASE_REGIONS[0];
  if (variant === 'asymmetric') {
    // Transposed layout (9 vertical stepped regions)
    return Array.from({ length: 9 }, (_, r) => Array.from({ length: 9 }, (_, c) => baseReg[c][r]));
  } else if (variant === 'rings') {
    // Rotated 90 deg layout
    return Array.from({ length: 9 }, (_, r) => Array.from({ length: 9 }, (_, c) => baseReg[8 - c][r]));
  } else if (variant === 'triangles') {
    // Horizontally mirrored layout
    return Array.from({ length: 9 }, (_, r) => Array.from({ length: 9 }, (_, c) => baseReg[r][8 - c]));
  }
  return baseReg;
}

function getIrregularBaseSolution(variant: 'zigzag' | 'rings' | 'triangles' | 'asymmetric'): number[][] {
  const baseSol = IRREGULAR_BASE_SOLUTIONS[0];
  if (variant === 'asymmetric') {
    return Array.from({ length: 9 }, (_, r) => Array.from({ length: 9 }, (_, c) => baseSol[c][r]));
  } else if (variant === 'rings') {
    return Array.from({ length: 9 }, (_, r) => Array.from({ length: 9 }, (_, c) => baseSol[8 - c][r]));
  } else if (variant === 'triangles') {
    return Array.from({ length: 9 }, (_, r) => Array.from({ length: 9 }, (_, c) => baseSol[r][8 - c]));
  }
  return baseSol;
}

// Pseudo-random seeded generator for repeatable, deterministic level generation
export function createSeededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// High-speed mathematical Sudoku generator that works instantaneously without recursive freeze
export function generateSudokuLevel(
  size: BoardSize,
  regions: number[][],
  clueCount: number,
  seed: number,
  irregularVariant?: 'zigzag' | 'rings' | 'triangles' | 'asymmetric'
): { solution: number[][]; initialClues: { row: number; col: number; value: number }[] } {
  const rng = createSeededRandom(seed);

  // 1. Generate base solution
  let baseSolution: number[][];

  if (irregularVariant) {
    baseSolution = getIrregularBaseSolution(irregularVariant);
  } else if (size === 4) {
    baseSolution = [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [2, 1, 4, 3],
      [4, 3, 2, 1],
    ];
  } else if (size === 6) {
    baseSolution = [
      [1, 2, 3, 4, 5, 6],
      [4, 5, 6, 1, 2, 3],
      [2, 3, 1, 5, 6, 4],
      [5, 6, 4, 2, 3, 1],
      [3, 1, 2, 6, 4, 5],
      [6, 4, 5, 3, 1, 2],
    ];
  } else {
    // 9x9 standard canonical Latin square with 3x3 blocks
    baseSolution = Array.from({ length: 9 }, (_, r) =>
      Array.from({ length: 9 }, (_, c) => ((r % 3) * 3 + Math.floor(r / 3) + c) % 9 + 1)
    );
  }

  // 2. Permute symbols randomly using seed
  const symbolMap = Array.from({ length: size }, (_, i) => i + 1);
  for (let i = symbolMap.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [symbolMap[i], symbolMap[j]] = [symbolMap[j], symbolMap[i]];
  }

  // Map base solution to permuted symbols
  const solution: number[][] = baseSolution.map((row) =>
    row.map((val) => symbolMap[val - 1])
  );

  // 3. For standard regular boards, we can also permute rows within bands to add variety
  if (!irregularVariant && size === 9) {
    // Permute bands [0..2], [3..5], [6..8]
    for (let band = 0; band < 3; band++) {
      const rows = [band * 3, band * 3 + 1, band * 3 + 2];
      if (rng() > 0.5) {
        const temp = solution[rows[0]];
        solution[rows[0]] = solution[rows[1]];
        solution[rows[1]] = temp;
      }
    }
  }

  // 4. Select initial clues
  const positions: { r: number; c: number }[] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      positions.push({ r, c });
    }
  }

  // Shuffle positions
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  const initialClues: { row: number; col: number; value: number }[] = [];
  const selected = positions.slice(0, Math.min(clueCount, positions.length));
  for (const pos of selected) {
    initialClues.push({
      row: pos.r,
      col: pos.c,
      value: solution[pos.r][pos.c],
    });
  }

  return { solution, initialClues };
}

// Logic Hint Engine
export interface HintResult {
  row: number;
  col: number;
  symbolId: number;
  type: 'naked_single' | 'hidden_single';
  reason: string;
  highlightedCells: { row: number; col: number }[];
  highlightType: 'row' | 'col' | 'region';
}

export function findLogicalHint(
  grid: (number | null)[][],
  regions: number[][],
  size: BoardSize,
  solution: number[][]
): HintResult | null {
  // 1. Look for Naked Singles (a cell with only ONE valid candidate)
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] !== null) continue;

      const candidates: number[] = [];
      for (let val = 1; val <= size; val++) {
        if (isValidPlacement(grid, regions, size, r, c, val)) {
          candidates.push(val);
        }
      }

      if (candidates.length === 1) {
        const val = candidates[0];
        const highlights: { row: number; col: number }[] = [];
        for (let i = 0; i < size; i++) {
          if (grid[r][i] !== null) highlights.push({ row: r, col: i });
          if (grid[i][c] !== null) highlights.push({ row: i, col: c });
        }
        return {
          row: r,
          col: c,
          symbolId: val,
          type: 'naked_single',
          reason: `Bu hücreye yalnızca bu sembol gelebilir. Satırındaki, sütunundaki ve bölgesindeki diğer semboller diğer tüm olasılıkları eliyor.`,
          highlightedCells: highlights,
          highlightType: 'region',
        };
      }
    }
  }

  // 2. Look for Hidden Singles in Rows
  for (let r = 0; r < size; r++) {
    for (let val = 1; val <= size; val++) {
      const alreadyInRow = grid[r].some((c) => c === val);
      if (alreadyInRow) continue;

      const possibleCols: number[] = [];
      for (let c = 0; c < size; c++) {
        if (grid[r][c] === null && isValidPlacement(grid, regions, size, r, c, val)) {
          possibleCols.push(c);
        }
      }

      if (possibleCols.length === 1) {
        const c = possibleCols[0];
        const rowCells: { row: number; col: number }[] = [];
        for (let i = 0; i < size; i++) rowCells.push({ row: r, col: i });
        return {
          row: r,
          col: c,
          symbolId: val,
          type: 'hidden_single',
          reason: `Bu satırda bu sembolün yerleşebileceği tek güvenli hücre burası.`,
          highlightedCells: rowCells,
          highlightType: 'row',
        };
      }
    }
  }

  // 3. Look for Hidden Singles in Columns
  for (let c = 0; c < size; c++) {
    for (let val = 1; val <= size; val++) {
      const alreadyInCol = grid.some((row) => row[c] === val);
      if (alreadyInCol) continue;

      const possibleRows: number[] = [];
      for (let r = 0; r < size; r++) {
        if (grid[r][c] === null && isValidPlacement(grid, regions, size, r, c, val)) {
          possibleRows.push(r);
        }
      }

      if (possibleRows.length === 1) {
        const r = possibleRows[0];
        const colCells: { row: number; col: number }[] = [];
        for (let i = 0; i < size; i++) colCells.push({ row: i, col: c });
        return {
          row: r,
          col: c,
          symbolId: val,
          type: 'hidden_single',
          reason: `Bu sütunda bu sembolün yerleşebileceği tek boşluk burasıdır.`,
          highlightedCells: colCells,
          highlightType: 'col',
        };
      }
    }
  }

  // Fallback to first empty cell guided by solution
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === null) {
        return {
          row: r,
          col: c,
          symbolId: solution[r][c],
          type: 'naked_single',
          reason: `Mantık adımı: Çözüm yolunda bu hücre bu sembol ile eşleşiyor.`,
          highlightedCells: [{ row: r, col: c }],
          highlightType: 'region',
        };
      }
    }
  }

  return null;
}
