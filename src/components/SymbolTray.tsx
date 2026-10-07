import React from 'react';
import { SYMBOLS } from '../types/game';
import { SymbolIcon } from './SymbolIcon';
import { RotateCcw, Eraser, Lightbulb } from 'lucide-react';

interface SymbolTrayProps {
  symbolCount: number;
  remainingCounts: Record<number, number>;
  activeSymbolId: number | null;
  onSelectSymbol: (symbolId: number, e?: React.MouseEvent) => void;
  onUndo: () => void;
  onErase: () => void;
  onHint: () => void;
  canUndo: boolean;
  canErase: boolean;
  hintsRemaining: number;
}

export const SymbolTray: React.FC<SymbolTrayProps> = ({
  symbolCount,
  remainingCounts,
  activeSymbolId,
  onSelectSymbol,
  onUndo,
  onErase,
  onHint,
  canUndo,
  canErase,
  hintsRemaining,
}) => {
  const symbols = Array.from({ length: symbolCount }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-md mx-auto px-2 flex flex-col gap-2.5">
      {/* Action Utility Bar: Undo, Erase, Hint */}
      <div className="flex items-center justify-between px-2 text-stone-600">
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
            canUndo
              ? 'bg-stone-200/80 hover:bg-stone-300 text-stone-700 active:scale-95'
              : 'opacity-40 cursor-not-allowed text-stone-400'
          }`}
          title="Son hareketi geri al"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Geri Al</span>
        </button>

        <button
          type="button"
          onClick={onErase}
          disabled={!canErase}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
            canErase
              ? 'bg-stone-200/80 hover:bg-stone-300 text-stone-700 active:scale-95'
              : 'opacity-40 cursor-not-allowed text-stone-400'
          }`}
          title="Seçili hücreyi temizle"
        >
          <Eraser className="w-4 h-4" />
          <span>Sil</span>
        </button>

        <button
          type="button"
          onClick={onHint}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-amber-100/90 text-amber-900 border border-amber-200 hover:bg-amber-200 active:scale-95 transition-all"
          title="Mantık adımı ve ipucu göster"
        >
          <Lightbulb className="w-4 h-4 text-amber-600" />
          <span>İpucu ({hintsRemaining})</span>
        </button>
      </div>

      {/* Symbol Buttons Selection Tray */}
      <div
        className={`grid gap-1.5 p-2 rounded-2xl bg-[#EFE9DF] border border-[#E5DDD0] shadow-sm ${
          symbolCount === 4
            ? 'grid-cols-4'
            : symbolCount === 6
            ? 'grid-cols-6'
            : 'grid-cols-9'
        }`}
      >
        {symbols.map((id) => {
          const count = remainingCounts[id] ?? 0;
          const isExhausted = count <= 0;
          const isSelected = activeSymbolId === id;
          const symbolDef = SYMBOLS[id];

          return (
            <button
              key={id}
              id={`tray-symbol-${id}`}
              type="button"
              onClick={(e) => onSelectSymbol(id, e)}
              className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-150 min-h-[52px] ${
                isSelected
                  ? 'bg-white shadow-md ring-2 ring-amber-500 scale-105 z-10'
                  : isExhausted
                  ? 'bg-[#FAF7F2]/50 opacity-40 hover:opacity-75'
                  : 'bg-[#FAF7F2] hover:bg-white hover:shadow-sm active:scale-95'
              }`}
            >
              <SymbolIcon
                symbolId={id}
                size={symbolCount <= 6 ? 32 : 26}
                showShadow={!isExhausted}
              />

              {/* Remaining count pill or checkmark */}
              <span
                className={`text-[10px] font-semibold mt-0.5 leading-none tabular-nums ${
                  isExhausted
                    ? 'text-stone-400'
                    : isSelected
                    ? 'text-amber-700'
                    : 'text-stone-500'
                }`}
              >
                {isExhausted ? '✓' : count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
