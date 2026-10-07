import React from 'react';
import { CellData, BoardSize } from '../types/game';
import { SymbolIcon } from './SymbolIcon';
import { TraceOverlay } from './TraceOverlay';
import { TraceEffect, RegionConnection } from '../types/game';

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
      className="relative mx-auto rounded-2xl p-1.5 bg-[#EFE9DF] shadow-md border border-[#E5DDD0] select-none flex items-center justify-center"
      style={{
        width: `${totalPixelSize + 12}px`,
        height: `${totalPixelSize + 12}px`,
      }}
    >
      <div
        className="relative bg-[#FAF7F2] rounded-xl overflow-hidden grid"
        style={{
          width: `${totalPixelSize}px`,
          height: `${totalPixelSize}px`,
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

            // Region boundaries detection
            const hasThickBottom =
              r < size - 1 && regions[r][c] !== regions[r + 1][c];
            const hasThickRight =
              c < size - 1 && regions[r][c] !== regions[r][c + 1];

            // Background color state calculation
            let bgClass = 'bg-[#FCFBF8]';
            if (cell.error) {
              bgClass = 'bg-rose-100/90 text-rose-900';
            } else if (selected) {
              bgClass = 'bg-amber-100/90 ring-2 ring-amber-500 z-10 shadow-inner';
            } else if (hintTarget) {
              bgClass = 'bg-amber-200/90 ring-2 ring-amber-600 animate-pulse z-10';
            } else if (hintRelated) {
              bgClass = 'bg-amber-50/90';
            } else if (matching) {
              bgClass = 'bg-emerald-50/80 ring-1 ring-emerald-300';
            } else if (related) {
              bgClass = 'bg-[#F4EFE6]/70';
            } else if (cell.initial) {
              bgClass = 'bg-[#FAF6EE]';
            }

            // Cell symbol size scales with board dimension
            const iconSize = size === 4 ? cellSize * 0.65 : size === 6 ? cellSize * 0.62 : cellSize * 0.58;

            return (
              <button
                key={`${r}-${c}`}
                id={`board-cell-${r}-${c}`}
                type="button"
                onClick={() => onCellClick(r, c)}
                className={`relative flex items-center justify-center transition-colors duration-150 focus:outline-none ${bgClass}`}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  borderBottom: hasThickBottom
                    ? '2.5px solid #A89F91'
                    : '0.75px solid #E8E1D5',
                  borderRight: hasThickRight
                    ? '2.5px solid #A89F91'
                    : '0.75px solid #E8E1D5',
                }}
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
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-300/40" />
                )}

                {/* Subtle initial clue dot indicator in corner */}
                {cell.initial && (
                  <span
                    className="absolute top-1 left-1 w-1 h-1 rounded-full bg-stone-400/60"
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
