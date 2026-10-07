import React from 'react';
import { SYMBOLS } from '../types/game';
import { SymbolIcon } from './SymbolIcon';
import { RotateCcw, Eraser, Lightbulb } from 'lucide-react';
import { ThemeDefinition, THEMES } from '../utils/theme';

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
  theme?: ThemeDefinition;
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
  theme = THEMES.sand,
}) => {
  const symbols = Array.from({ length: symbolCount }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-md mx-auto px-2 flex flex-col gap-2.5">
      {/* Action Utility Bar: Undo, Erase, Hint */}
      <div className="flex items-center justify-between px-2">
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          style={{
            backgroundColor: canUndo ? theme.btnSecondaryBg : 'transparent',
            borderColor: theme.btnSecondaryBorder,
            color: canUndo ? theme.btnSecondaryText : theme.textMuted,
          }}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
            canUndo
              ? 'hover:opacity-90 active:scale-95 shadow-xs'
              : 'opacity-40 cursor-not-allowed'
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
          style={{
            backgroundColor: canErase ? theme.btnSecondaryBg : 'transparent',
            borderColor: theme.btnSecondaryBorder,
            color: canErase ? theme.btnSecondaryText : theme.textMuted,
          }}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
            canErase
              ? 'hover:opacity-90 active:scale-95 shadow-xs'
              : 'opacity-40 cursor-not-allowed'
          }`}
          title="Seçili hücreyi temizle"
        >
          <Eraser className="w-4 h-4" />
          <span>Sil</span>
        </button>

        <button
          type="button"
          onClick={onHint}
          style={{
            backgroundColor: theme.isDark ? '#3B2414' : '#FEF3C7',
            borderColor: theme.isDark ? '#78350F' : '#FDE68A',
            color: theme.isDark ? '#FDE68A' : '#92400E',
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border hover:opacity-90 active:scale-95 transition-all shadow-xs"
          title="Mantık adımı ve ipucu göster"
        >
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span>İpucu ({hintsRemaining})</span>
        </button>
      </div>

      {/* Symbol Buttons Selection Tray */}
      <div
        className={`grid gap-1.5 p-2 rounded-2xl shadow-sm transition-colors duration-200 ${
          symbolCount === 4
            ? 'grid-cols-4'
            : symbolCount === 6
            ? 'grid-cols-6'
            : 'grid-cols-9'
        }`}
        style={{
          backgroundColor: theme.trayBg,
          border: `1.5px solid ${theme.trayBorder}`,
        }}
      >
        {symbols.map((id) => {
          const count = remainingCounts[id] ?? 0;
          const isExhausted = count <= 0;
          const isSelected = activeSymbolId === id;

          const btnStyle: React.CSSProperties = {
            backgroundColor: isSelected
              ? (theme.isDark ? '#1E293B' : '#FFFFFF')
              : isExhausted
              ? 'transparent'
              : theme.trayBtnBg,
            borderColor: isSelected ? theme.trayActiveRing : theme.trayBtnBorder,
            borderWidth: '1.5px',
          };

          return (
            <button
              key={id}
              id={`tray-symbol-${id}`}
              type="button"
              onClick={(e) => onSelectSymbol(id, e)}
              style={btnStyle}
              className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-150 min-h-[52px] ${
                isSelected
                  ? 'shadow-md scale-105 z-10 ring-2'
                  : isExhausted
                  ? 'opacity-40 hover:opacity-70'
                  : 'hover:shadow-xs active:scale-95'
              }`}
            >
              <SymbolIcon
                symbolId={id}
                size={symbolCount <= 6 ? 32 : 26}
                showShadow={!isExhausted}
              />

              {/* Remaining count pill or checkmark */}
              <span
                style={{
                  color: isExhausted
                    ? theme.textMuted
                    : isSelected
                    ? (theme.isDark ? '#38BDF8' : theme.textPrimary)
                    : theme.textSecondary,
                }}
                className="text-[10px] font-bold mt-0.5 leading-none tabular-nums"
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
