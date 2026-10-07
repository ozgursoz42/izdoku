import React from 'react';
import { CellData, BoardSize } from '../types/game';
import { SymbolIcon } from './SymbolIcon';
import { TraceOverlay } from './TraceOverlay';
import { TraceEffect, RegionConnection } from '../types/game';
import { ThemeDefinition, THEMES } from '../utils/theme';

interface BoardProps {
  size: BoardSize;
  grid: CellData[][];
  regions: number[][];
  selectedCell: { row: number; col: number } | null;
  onCellClick: (row: number, col: number) => void;
  activeTraces: TraceEffect[];
  completedConnections: RegionConnection[];
  cellSize: number;
  highlightedSymbolId: number | null;
  hintHighlight: {
    cell: { row: number; col: number };
    relatedCells: { row: number; col: number }[];
  } | null;
  theme?: ThemeDefinition;
}

export const Board: React.FC<BoardProps> = ({
  size,
  grid,
  regions,
  selectedCell,
  onCellClick,
  activeTraces,
  completedConnections,
  cellSize,
  highlightedSymbolId,
  hintHighlight,
  theme = THEMES.sand,
}) => {
  const isSelected = (r: number, c: number) =>
    selectedCell?.row === r && selectedCell?.col === c;

  const isRelated = (r: number, c: number) => {
    if (!selectedCell) return false;
    if (selectedCell.row === r || selectedCell.col === c) return true;
    if (regions[r]?.[c] === regions[selectedCell.row]?.[selectedCell.col]) return true;
    return false;
  };

  const isMatchingSymbol = (val: number | null) => {
    if (!val || !highlightedSymbolId) return false;
    return val === highlightedSymbolId;
  };

  const isHintTarget = (r: number, c: number) =>
    hintHighlight?.cell.row === r && hintHighlight?.cell.col === c;

  const isHintRelated = (r: number, c: number) =>
    hintHighlight?.relatedCells.some((rc) => rc.row === r && rc.col === c);

  const totalPixelSize = size * cellSize;

  return (
    <div
      className="relative mx-auto rounded-2xl p-1.5 shadow-lg select-none flex items-center justify-center transition-colors duration-200"
      style={{
        width: `${totalPixelSize + 12}px`,
        height: `${totalPixelSize + 12}px`,
        backgroundColor: theme.boardOuterBg,
        border: `1.5px solid ${theme.boardOuterBorder}`,
      }}
    >
      <div
        className="relative rounded-xl overflow-hidden grid shadow-inner"
        style={{
          width: `${totalPixelSize}px`,
          height: `${totalPixelSize}px`,
          backgroundColor: theme.boardInnerBg,
          gridTemplateColumns: `repeat(${size}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${size}, ${cellSize}px)`,
        }}
      >
        {/* Render Cells */}
        {grid.map((row, r) =>
          row.map((cell, c) => {
            const selected = isSelected(r, c);
            const related = isRelated(r, c);
            const matching = isMatchingSymbol(cell.value);
            const hintTarget = isHintTarget(r, c);
            const hintRelated = isHintRelated(r, c);

            // Region boundaries detection (strictly 3x3 square blocks on 9x9 boards)
            const hasThickBottom =
              r < size - 1 && regions[r][c] !== regions[r + 1][c];
            const hasThickRight =
              c < size - 1 && regions[r][c] !== regions[r][c + 1];

            // Background & ring styling based on active theme
            const cellStyle: React.CSSProperties = {
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              backgroundColor: theme.cellDefaultBg,
              borderBottom: hasThickBottom
                ? `3px solid ${theme.cellBorderThick}`
                : `0.75px solid ${theme.cellBorderThin}`,
              borderRight: hasThickRight
                ? `3px solid ${theme.cellBorderThick}`
                : `0.75px solid ${theme.cellBorderThin}`,
            };

            let extraClasses = '';

            if (cell.error) {
              cellStyle.backgroundColor = theme.cellErrorBg;
              extraClasses = 'text-rose-900';
            } else if (selected) {
              cellStyle.backgroundColor = theme.cellSelectedBg;
              cellStyle.boxShadow = `inset 0 0 0 2px ${theme.cellSelectedRing}`;
              extraClasses = 'z-10';
            } else if (hintTarget) {
              cellStyle.backgroundColor = theme.cellSelectedBg;
              cellStyle.boxShadow = `inset 0 0 0 2px ${theme.cellSelectedRing}`;
              extraClasses = 'animate-pulse z-10';
            } else if (hintRelated) {
              cellStyle.backgroundColor = theme.cellRelatedBg;
            } else if (matching) {
              cellStyle.backgroundColor = theme.cellMatchingBg;
              cellStyle.boxShadow = `inset 0 0 0 1.5px ${theme.cellMatchingRing}`;
            } else if (related) {
              cellStyle.backgroundColor = theme.cellRelatedBg;
            } else if (cell.initial) {
              cellStyle.backgroundColor = theme.cellInitialBg;
            }

            // Cell symbol size scales with board dimension
            const iconSize =
              size === 4 ? cellSize * 0.65 : size === 6 ? cellSize * 0.62 : cellSize * 0.58;

            return (
              <button
                key={`${r}-${c}`}
                id={`board-cell-${r}-${c}`}
                type="button"
                onClick={() => onCellClick(r, c)}
                className={`relative flex items-center justify-center transition-colors duration-150 focus:outline-none ${extraClasses}`}
                style={cellStyle}
              >
                {cell.value ? (
                  <div
                    className={`transform transition-transform ${
                      selected ? 'scale-110' : 'scale-100'
                    } ${cell.initial ? 'opacity-95' : 'opacity-100'}`}
                  >
                    <SymbolIcon symbolId={cell.value} size={iconSize} />
                  </div>
                ) : (
                  // Empty cell dot / subtle focal indicator
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: theme.cellEmptyDot }}
                  />
                )}

                {/* Subtle initial clue dot indicator in corner */}
                {cell.initial && (
                  <span
                    className="absolute top-1 left-1 w-1 h-1 rounded-full opacity-60"
                    style={{ backgroundColor: theme.textMuted }}
                    title="Başlangıç İzi"
                  />
                )}
              </button>
            );
          })
        )}

        {/* Trace System Particles and Streams Canvas Overlay */}
        <TraceOverlay
          boardSize={size}
          cellSize={cellSize}
          activeTraces={activeTraces}
          completedConnections={completedConnections}
        />
      </div>
    </div>
  );
};
