import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  LevelConfig,
  CellData,
  TraceEffect,
  RegionConnection,
  UserProgress,
  SYMBOLS,
} from '../types/game';
import { Board } from './Board';
import { SymbolIcon } from './SymbolIcon';
import { SymbolTray } from './SymbolTray';
import { HiddenPicturePeek } from './HiddenPicturePeek';
import { VictoryModal } from './VictoryModal';
import { HintModal } from './HintModal';
import { SettingsModal } from './SettingsModal';
import { FlyingSymbolOverlay, FlyingSymbolItem } from './FlyingSymbolOverlay';
import { HIDDEN_ARTWORKS } from '../utils/hiddenPictures';
import { findLogicalHint, HintResult } from '../utils/sudoku';
import { soundManager } from '../utils/audio';
import { getTheme } from '../utils/theme';
import { ChevronLeft, RotateCcw, AlertTriangle, Settings, Pause, Play } from 'lucide-react';

interface GameScreenProps {
  levelConfig: LevelConfig;
  progress: UserProgress;
  onBack: () => void;
  onNextLevel: () => void;
  onViewCollection?: () => void;
  onUpdateProgress: (newProgress: UserProgress) => void;
  hasNextLevel: boolean;
}

interface MoveHistory {
  row: number;
  col: number;
  prevValue: number | null;
  newValue: number;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  levelConfig,
  progress,
  onBack,
  onNextLevel,
  onViewCollection,
  onUpdateProgress,
  hasNextLevel,
}) => {
  const { size, symbolCount, regions, initialClues, solution, hiddenArtId } =
    levelConfig;

  // Initialize Board Grid
  const [grid, setGrid] = useState<CellData[][]>(() => {
    const clueMap = new Map<string, number>();
    initialClues.forEach((c) => clueMap.set(`${c.row}-${c.col}`, c.value));

    return Array.from({ length: size }, (_, r) =>
      Array.from({ length: size }, (_, c) => {
        const val = clueMap.get(`${r}-${c}`) ?? null;
        return {
          row: r,
          col: c,
          value: val,
          initial: val !== null,
          solution: solution[r][c],
          regionId: regions[r][c],
          notes: [],
        };
      })
    );
  });

  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [history, setHistory] = useState<MoveHistory[]>([]);
  const [mistakes, setMistakes] = useState<number>(0);
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Trace & Connection Animations State
  const [activeTraces, setActiveTraces] = useState<TraceEffect[]>([]);
  const [completedConnections, setCompletedConnections] = useState<
    RegionConnection[]
  >([]);
  const [flyingSymbols, setFlyingSymbols] = useState<FlyingSymbolItem[]>([]);
  const [activeTraySymbolId, setActiveTraySymbolId] = useState<number | null>(null);
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number } | null>(null);

  // Modals & Panels
  const [activeHint, setActiveHint] = useState<HintResult | null>(null);
  const [hintHighlight, setHintHighlight] = useState<{
    cell: { row: number; col: number };
    relatedCells: { row: number; col: number }[];
  } | null>(null);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showArtInspector, setShowArtInspector] = useState<boolean>(false);

  const artwork = HIDDEN_ARTWORKS[hiddenArtId] || HIDDEN_ARTWORKS.tree;

  // Timer Effect
  useEffect(() => {
    if (isCompleted || isPaused) return;
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isCompleted, isPaused]);

  // Configure Audio & Vibration from User Progress Settings
  useEffect(() => {
    soundManager.setSoundEnabled(progress.settings.sound);
    soundManager.setVibrationEnabled(progress.settings.vibration);
  }, [progress.settings]);

  // Track Pointer Position when a symbol is held in hand
  useEffect(() => {
    if (!activeTraySymbolId) {
      setPointerPos(null);
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      setPointerPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [activeTraySymbolId]);

  // Calculate Responsive Cell Size to strictly prevent scrolling on mobile
  const [viewportWidth, setViewportWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 380
  );

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cellSize = useMemo(() => {
    // Max available width for board: mobile viewport width minus container padding (~32px)
    const availableBoardWidth = Math.min(viewportWidth - 28, 410);
    const calculated = Math.floor(availableBoardWidth / size);
    if (size === 4) return Math.min(calculated, 76);
    if (size === 6) return Math.min(calculated, 54);
    return Math.min(calculated, 38);
  }, [viewportWidth, size]);

  // Calculate Remaining Counts per Symbol
  const remainingCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    for (let i = 1; i <= symbolCount; i++) {
      counts[i] = size; // total occurrences per board = size
    }
    grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.value && cell.value <= symbolCount) {
          counts[cell.value] = Math.max(0, (counts[cell.value] ?? size) - 1);
        }
      });
    });
    return counts;
  }, [grid, size, symbolCount]);

  // Completion Progress Calculation (0 to 1)
  const completionProgress = useMemo(() => {
    let filled = 0;
    const total = size * size;
    grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.value !== null) filled++;
      });
    });
    return filled / total;
  }, [grid, size]);

  // Active Symbol Highlight (matches active tray selection or currently selected cell's symbol)
  const highlightedSymbolId = useMemo(() => {
    if (activeTraySymbolId !== null) return activeTraySymbolId;
    if (!selectedCell) return null;
    return grid[selectedCell.row]?.[selectedCell.col]?.value ?? null;
  }, [activeTraySymbolId, selectedCell, grid]);

  // Check if a line or region was just completed
  const checkUnitCompletions = useCallback(
    (newGrid: CellData[][], r: number, c: number, val: number) => {
      // 1. Check Row
      const rowComplete = newGrid[r].every(
        (cell) => cell.value !== null && cell.value === cell.solution
      );
      if (rowComplete) {
        setCompletedConnections((prev) => [
          ...prev,
          { type: 'row', index: r, symbolId: val, timestamp: Date.now() },
        ]);
        soundManager.playCompletionChord();
      }

      // 2. Check Column
      const colComplete = newGrid.every(
        (row) => row[c].value !== null && row[c].value === row[c].solution
      );
      if (colComplete) {
        setCompletedConnections((prev) => [
          ...prev,
          { type: 'col', index: c, symbolId: val, timestamp: Date.now() + 1 },
        ]);
        soundManager.playCompletionChord();
      }

      // 3. Check Region
      const targetRegion = regions[r][c];
      const regionCells = newGrid
        .flat()
        .filter((cell) => regions[cell.row][cell.col] === targetRegion);
      const regionComplete = regionCells.every(
        (cell) => cell.value !== null && cell.value === cell.solution
      );
      if (regionComplete) {
        setCompletedConnections((prev) => [
          ...prev,
          {
            type: 'region',
            index: targetRegion,
            symbolId: val,
            timestamp: Date.now() + 2,
          },
        ]);
        soundManager.playCompletionChord();
      }
    },
    [regions]
  );

  // Check Board Completion
  const checkGameCompletion = useCallback(
    (currentGrid: CellData[][]) => {
      const allCorrect = currentGrid.every((row) =>
        row.every((cell) => cell.value !== null && cell.value === cell.solution)
      );

      if (allCorrect) {
        setIsCompleted(true);
        soundManager.playVictoryFanfare();

        // Calculate stars: 3 for 0 mistakes and no hints, 2 for <= 2 mistakes, 1 otherwise
        const stars =
          mistakes === 0 && hintsUsed === 0 ? 3 : mistakes <= 2 ? 2 : 1;

        const prevBest =
          progress.completedLevels[levelConfig.id]?.bestTime ?? null;
        const newBestTime = prevBest
          ? Math.min(prevBest, elapsedSeconds)
          : elapsedSeconds;

        const updatedProgress: UserProgress = {
          ...progress,
          unlockedLevel: Math.max(progress.unlockedLevel, levelConfig.id + 1),
          completedLevels: {
            ...progress.completedLevels,
            [levelConfig.id]: {
              stars,
              bestTime: newBestTime,
              hintsUsed,
              completedAt: new Date().toISOString(),
            },
          },
        };

        onUpdateProgress(updatedProgress);
      }
    },
    [
      elapsedSeconds,
      hintsUsed,
      levelConfig.id,
      mistakes,
      onUpdateProgress,
      progress,
    ]
  );

  // Trigger Symbol Placement with Flight Animation from Tray to Cell
  const triggerPlaceSymbol = useCallback(
    (r: number, c: number, symbolId: number) => {
      const cell = grid[r][c];
      if (cell.initial) return;

      // Immediately empty hand and cursor follower so player must pick a new symbol
      setActiveTraySymbolId(null);
      setPointerPos(null);
      setSelectedCell(null);
      setHintHighlight(null);

      const isCorrect = cell.solution === symbolId;
      const prevValue = cell.value;

      const onPlacementLanded = () => {
        setActiveTraySymbolId(null);
        setPointerPos(null);
        setSelectedCell(null);

        if (!isCorrect) {
          soundManager.playError();
          setMistakes((prev) => prev + 1);

          // Flash error state on cell
          setGrid((prevGrid) =>
            prevGrid.map((rList, curR) =>
              rList.map((cCell, curC) =>
                curR === r && curC === c ? { ...cCell, error: true } : cCell
              )
            )
          );

          setTimeout(() => {
            setGrid((prevGrid) =>
              prevGrid.map((rList, curR) =>
                rList.map((cCell, curC) =>
                  curR === r && curC === c ? { ...cCell, error: false } : cCell
                )
              )
            );
          }, 500);
          return;
        }

        // Correct Placement!
        soundManager.playPlacement(symbolId);

        // Spawn Trace Animation Event
        const traceId = `${r}-${c}-${Date.now()}`;
        setActiveTraces((prev) => [
          ...prev,
          { id: traceId, row: r, col: c, symbolId, timestamp: Date.now() },
        ]);

        const newGrid = grid.map((rList, curR) =>
          rList.map((cCell, curC) =>
            curR === r && curC === c
              ? { ...cCell, value: symbolId, error: false }
              : cCell
          )
        );

        setGrid(newGrid);
        setHistory((prev) => [...prev, { row: r, col: c, prevValue, newValue: symbolId }]);

        // Check unit completions
        checkUnitCompletions(newGrid, r, c, symbolId);

        // Check full puzzle completion
        checkGameCompletion(newGrid);
      };

      // Find start and target DOM element positions for the flying animation
      const trayEl = document.getElementById(`tray-symbol-${symbolId}`);
      const cellEl = document.getElementById(`board-cell-${r}-${c}`);

      if (trayEl && cellEl) {
        const trayRect = trayEl.getBoundingClientRect();
        const cellRect = cellEl.getBoundingClientRect();

        const flyId = `fly-${Date.now()}-${Math.random()}`;
        const startX = trayRect.left + trayRect.width / 2;
        const startY = trayRect.top + trayRect.height / 2;
        const targetX = cellRect.left + cellRect.width / 2;
        const targetY = cellRect.top + cellRect.height / 2;
        const iconSize =
          size === 4
            ? cellSize * 0.72
            : size === 6
            ? cellSize * 0.68
            : cellSize * 0.62;

        setFlyingSymbols((prev) => [
          ...prev,
          {
            id: flyId,
            symbolId,
            startX,
            startY,
            targetX,
            targetY,
            size: iconSize,
            onLanded: onPlacementLanded,
          },
        ]);
      } else {
        // Fallback if coordinates are unavailable
        onPlacementLanded();
      }
    },
    [cellSize, checkGameCompletion, checkUnitCompletions, grid, size]
  );

  // Erase at specific cell
  const handleEraseAt = useCallback((r: number, c: number) => {
    const cell = grid[r][c];
    if (cell.initial || cell.value === null) return;

    soundManager.playErase();
    const prevValue = cell.value;
    const newGrid = grid.map((rList, curR) =>
      rList.map((cCell, curC) =>
        curR === r && curC === c ? { ...cCell, value: null, error: false } : cCell
      )
    );
    setGrid(newGrid);
    setHistory((prev) => [...prev, { row: r, col: c, prevValue, newValue: 0 }]);
  }, [grid]);

  // Cell Click Handler
  const handleCellClick = (r: number, c: number) => {
    soundManager.playSelect();
    const cell = grid[r][c];

    // IF player has already selected a symbol from the tray:
    if (activeTraySymbolId !== null) {
      if (cell.initial) {
        // Cannot overwrite initial clue
        setSelectedCell({ row: r, col: c });
        return;
      }

      const symbolToPlace = activeTraySymbolId;
      // Immediately empty hand, clear cursor image, and clear cell selection!
      setActiveTraySymbolId(null);
      setPointerPos(null);
      setSelectedCell(null);

      if (cell.value === symbolToPlace) {
        // If cell already has this symbol, clear it
        handleEraseAt(r, c);
        return;
      }

      // Animate the selected symbol flying from tray into this clicked cell!
      triggerPlaceSymbol(r, c, symbolToPlace);
      return;
    }

    // Normal cell selection when no tray symbol is active
    setSelectedCell({ row: r, col: c });
    setHintHighlight(null);
  };

  // Symbol Tray Selection Handler
  const handleSelectSymbol = (symbolId: number, e?: React.MouseEvent) => {
    soundManager.playSelect();

    // Clear any previous cell selection so that no old cell gets accidentally overwritten!
    setSelectedCell(null);
    setHintHighlight(null);

    if (activeTraySymbolId === symbolId) {
      // Deselect if already holding this symbol
      setActiveTraySymbolId(null);
      setPointerPos(null);
      return;
    }

    if (e) {
      setPointerPos({ x: e.clientX, y: e.clientY });
    } else {
      const trayEl = document.getElementById(`tray-symbol-${symbolId}`);
      if (trayEl) {
        const rect = trayEl.getBoundingClientRect();
        setPointerPos({ x: rect.left + rect.width / 2, y: rect.top - 20 });
      }
    }

    // Activate this symbol in hand
    setActiveTraySymbolId(symbolId);
  };

  // Erase Handler for Toolbar button
  const handleErase = () => {
    if (!selectedCell) return;
    handleEraseAt(selectedCell.row, selectedCell.col);
    setSelectedCell(null);
  };

  // Undo Handler
  const handleUndo = () => {
    if (history.length === 0) return;
    soundManager.playSelect();

    const lastMove = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));

    setGrid((prevGrid) =>
      prevGrid.map((rList, r) =>
        rList.map((cCell, c) =>
          r === lastMove.row && c === lastMove.col
            ? {
                ...cCell,
                value: lastMove.prevValue,
                error: false,
              }
            : cCell
        )
      )
    );
    setSelectedCell({ row: lastMove.row, col: lastMove.col });
  };

  // Hint Handler
  const handleHint = () => {
    const rawGrid = grid.map((row) => row.map((cell) => cell.value));
    const hint = findLogicalHint(rawGrid, regions, size, solution);

    if (hint) {
      soundManager.playSelect();
      setHintsUsed((prev) => prev + 1);
      setActiveHint(hint);
      setSelectedCell({ row: hint.row, col: hint.col });
      setHintHighlight({
        cell: { row: hint.row, col: hint.col },
        relatedCells: hint.highlightedCells,
      });
    }
  };

  // Apply Hint Directly from Modal
  const handleApplyHint = () => {
    if (!activeHint) return;
    setSelectedCell({ row: activeHint.row, col: activeHint.col });
    handleSelectSymbol(activeHint.symbolId);
    setActiveHint(null);
  };

  // Replay Level
  const handleReplay = () => {
    soundManager.playSelect();
    const clueMap = new Map<string, number>();
    initialClues.forEach((c) => clueMap.set(`${c.row}-${c.col}`, c.value));

    setGrid(
      Array.from({ length: size }, (_, r) =>
        Array.from({ length: size }, (_, c) => {
          const val = clueMap.get(`${r}-${c}`) ?? null;
          return {
            row: r,
            col: c,
            value: val,
            initial: val !== null,
            solution: solution[r][c],
            regionId: regions[r][c],
            notes: [],
          };
        })
      )
    );
    setSelectedCell(null);
    setHistory([]);
    setMistakes(0);
    setHintsUsed(0);
    setElapsedSeconds(0);
    setIsCompleted(false);
    setActiveTraces([]);
    setCompletedConnections([]);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const bestTime = progress.completedLevels[levelConfig.id]?.bestTime ?? null;
  const currentTheme = getTheme(progress.settings.theme);

  return (
    <div
      className="h-screen w-full flex flex-col justify-between max-w-md mx-auto select-none overflow-hidden pb-safe transition-colors duration-200"
      style={{
        backgroundColor: currentTheme.appBg,
        color: currentTheme.textPrimary,
      }}
    >
      {/* Top App Bar */}
      <header
        className="flex items-center justify-between px-3 py-2 border-b shrink-0 transition-colors duration-200"
        style={{
          backgroundColor: currentTheme.headerBg,
          borderColor: currentTheme.headerBorder,
        }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{ color: currentTheme.textSecondary }}
          className="p-1.5 -ml-1 rounded-xl hover:opacity-80 flex items-center gap-1 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-xs font-semibold">Harita</span>
        </button>

        {/* Center Title and Chapter */}
        <div className="flex flex-col items-center">
          <span
            className="text-xs font-bold leading-tight"
            style={{ color: currentTheme.textPrimary }}
          >
            {levelConfig.title}
          </span>
          <span
            className="text-[10px] font-medium"
            style={{ color: currentTheme.textMuted }}
          >
            {levelConfig.chapter}
          </span>
        </div>

        {/* Right Action: Pause & Settings */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            style={{ color: currentTheme.textSecondary }}
            className="p-1.5 rounded-xl hover:opacity-80 active:scale-95"
            title={isPaused ? 'Devam Et' : 'Duraklat'}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => setShowSettings(true)}
            style={{ color: currentTheme.textSecondary }}
            className="p-1.5 rounded-xl hover:opacity-80 active:scale-95"
            title="Ayarlar & Temalar"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Subheader Status Strip: Time, Mistakes, and Live Hidden Picture Peek */}
      <div
        className="flex items-center justify-between px-3 py-1.5 shrink-0 transition-colors duration-200"
        style={{ backgroundColor: currentTheme.appBg }}
      >
        <div className="flex items-center gap-3 text-xs">
          {/* Timer */}
          <div
            className="flex items-center gap-1 font-semibold tabular-nums"
            style={{ color: currentTheme.textSecondary }}
          >
            <span>⏱️</span>
            <span>{formatTimer(elapsedSeconds)}</span>
          </div>

          {/* Mistakes Counter */}
          <div
            className="flex items-center gap-1 font-semibold tabular-nums"
            style={{
              color: mistakes > 0 ? '#E11D48' : currentTheme.textMuted,
            }}
          >
            {levelConfig.maxMistakes ? (
              <span>
                Hata: {mistakes}/{levelConfig.maxMistakes}
              </span>
            ) : (
              <span>Hata: {mistakes}</span>
            )}
          </div>
        </div>

        {/* Live Hidden Picture Progress Peek */}
        <HiddenPicturePeek
          artwork={artwork}
          completionProgress={completionProgress}
          onClick={() => setShowArtInspector(true)}
          isCompleted={isCompleted}
        />
      </div>

      {/* Main Board Arena (Centered vertically and horizontally) */}
      <main className="flex-1 flex items-center justify-center px-2 py-1 min-h-0">
        {isPaused ? (
          <div
            className="w-full max-w-xs p-6 rounded-3xl border text-center flex flex-col items-center shadow-lg"
            style={{
              backgroundColor: currentTheme.cardBg,
              borderColor: currentTheme.cardBorder,
              color: currentTheme.textPrimary,
            }}
          >
            <h3 className="text-lg font-bold font-display">
              Oyun Duraklatıldı
            </h3>
            <p
              className="text-xs mt-1 mb-4"
              style={{ color: currentTheme.textMuted }}
            >
              Hazır olduğunda devam et.
            </p>
            <button
              type="button"
              onClick={() => setIsPaused(false)}
              style={{
                backgroundColor: currentTheme.btnPrimaryBg,
                color: currentTheme.btnPrimaryText,
              }}
              className="py-2.5 px-6 rounded-xl text-xs font-semibold hover:opacity-90 active:scale-95 shadow-md"
            >
              Devam Et
            </button>
          </div>
        ) : (
          <Board
            size={size}
            grid={grid}
            regions={regions}
            selectedCell={selectedCell}
            onCellClick={handleCellClick}
            activeTraces={activeTraces}
            completedConnections={completedConnections}
            cellSize={cellSize}
            highlightedSymbolId={highlightedSymbolId}
            hintHighlight={hintHighlight}
            theme={currentTheme}
          />
        )}
      </main>

      {/* Bottom Symbol Tray and Action Controls */}
      <footer className="w-full shrink-0 pb-3 pt-1">
        <SymbolTray
          symbolCount={symbolCount}
          remainingCounts={remainingCounts}
          activeSymbolId={activeTraySymbolId ?? highlightedSymbolId}
          onSelectSymbol={handleSelectSymbol}
          onUndo={handleUndo}
          onErase={handleErase}
          onHint={handleHint}
          canUndo={history.length > 0}
          canErase={
            selectedCell !== null &&
            !grid[selectedCell.row]?.[selectedCell.col]?.initial &&
            grid[selectedCell.row]?.[selectedCell.col]?.value !== null
          }
          hintsRemaining={Math.max(0, 3 - hintsUsed)}
          theme={currentTheme}
        />
      </footer>

      {/* Victory Modal */}
      {isCompleted && (
        <VictoryModal
          levelTitle={levelConfig.title}
          artwork={artwork}
          elapsedSeconds={elapsedSeconds}
          mistakes={mistakes}
          hintsUsed={hintsUsed}
          bestTime={bestTime}
          onNextLevel={onNextLevel}
          onReplay={handleReplay}
          onViewCollection={onViewCollection}
          hasNextLevel={hasNextLevel}
        />
      )}

      {/* Logic Hint Modal */}
      {activeHint && (
        <HintModal
          hint={activeHint}
          onApply={handleApplyHint}
          onClose={() => setActiveHint(null)}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          progress={progress}
          onUpdateSettings={(settings) =>
            onUpdateProgress({ ...progress, settings })
          }
          onResetProgress={() => {
            const freshProgress: UserProgress = {
              unlockedLevel: 1,
              completedLevels: {},
              dailyStreak: 0,
              lastDailyCompletedDate: null,
              settings: progress.settings,
            };
            onUpdateProgress(freshProgress);
          }}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Artwork Inspector from Peek Widget */}
      {showArtInspector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-[#FAF7F2] border border-[#E5DDD0] shadow-2xl p-5 text-center flex flex-col items-center">
            <h3 className="text-sm font-bold text-stone-900">
              {artwork.trName}
            </h3>
            <span className="text-[10px] text-amber-700 font-semibold uppercase tracking-wider mt-0.5">
              {artwork.category} · %{Math.round(completionProgress * 100)} Açıldı
            </span>

            <div className="w-36 h-36 rounded-2xl bg-white/80 p-3 border border-stone-200 shadow-sm flex items-center justify-center my-3">
              <svg
                viewBox={artwork.viewBox}
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {artwork.paths.map((p, idx) => {
                  const isVisible =
                    idx <= Math.floor(completionProgress * artwork.paths.length);
                  return (
                    <path
                      key={p.id}
                      d={p.d}
                      fill={isVisible ? p.fill ?? 'none' : 'none'}
                      stroke={isVisible ? p.stroke ?? 'none' : '#D6CFBF'}
                      strokeWidth={isVisible ? p.strokeWidth ?? 1.5 : 1}
                      strokeDasharray={isVisible ? undefined : '2 2'}
                      opacity={isVisible ? 1 : 0.3}
                    />
                  );
                })}
              </svg>
            </div>

            <p className="text-xs text-stone-600 px-2 leading-relaxed">
              {artwork.description}
            </p>
            <p className="text-[11px] text-stone-400 mt-2">
              Satır, sütun ve bölgeleri tamamladıkça gizli izler birleşerek bu
              resmi tamamlar.
            </p>

            <button
              type="button"
              onClick={() => setShowArtInspector(false)}
              className="w-full mt-4 py-2.5 rounded-xl bg-stone-900 text-white font-medium text-xs hover:bg-stone-800"
            >
              Bulmacaya Dön
            </button>
          </div>
        </div>
      )}

      {/* Flying Symbol Animation Overlay */}
      <FlyingSymbolOverlay
        items={flyingSymbols}
        onFinish={(id) => setFlyingSymbols((prev) => prev.filter((f) => f.id !== id))}
      />

      {/* Floating Active Symbol Follower under Cursor / Touch */}
      {activeTraySymbolId && pointerPos && (
        <div
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 select-none"
          style={{
            left: `${pointerPos.x}px`,
            top: `${pointerPos.y - 18}px`,
            filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.25))',
          }}
        >
          <div className="w-11 h-11 rounded-2xl bg-white/95 border-2 border-amber-400 p-1 flex items-center justify-center shadow-lg ring-2 ring-amber-300/60 scale-110">
            <SymbolIcon symbolId={activeTraySymbolId} size={30} />
          </div>
        </div>
      )}
    </div>
  );
};
