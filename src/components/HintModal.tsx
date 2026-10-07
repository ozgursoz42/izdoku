import React from 'react';
import { HintResult } from '../utils/sudoku';
import { SYMBOLS } from '../types/game';
import { SymbolIcon } from './SymbolIcon';
import { Lightbulb, Check, X } from 'lucide-react';

interface HintModalProps {
  hint: HintResult;
  onApply: () => void;
  onClose: () => void;
}

export const HintModal: React.FC<HintModalProps> = ({
  hint,
  onApply,
  onClose,
}) => {
  const symbol = SYMBOLS[hint.symbolId];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-sm rounded-3xl bg-[#FAF7F2] border border-[#E5DDD0] shadow-2xl overflow-hidden p-5 flex flex-col gap-3.5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                Mantık İpucu
              </h3>
              <span className="text-[10px] text-stone-500">
                {hint.type === 'naked_single'
                  ? 'Tekil Olasılık Mantığı'
                  : 'Gizli Tekil Mantığı'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Target symbol spotlight */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#EFE9DF] border border-[#E0D7C7]">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-xs shrink-0">
            {symbol && <SymbolIcon symbolId={symbol.id} size={30} />}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-stone-800">
              Önerilen Sembol: {symbol?.trName}
            </span>
            <span className="text-[11px] text-stone-600 leading-snug mt-0.5">
              {hint.reason}
            </span>
          </div>
        </div>

        <div className="text-[11px] text-stone-500 px-1">
          Tahtada sarı renkle işaretlenmiş hücreyi ve ilgili satır/bölgeyi inceleyin.
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-3 rounded-xl bg-stone-200/80 text-stone-700 text-xs font-medium hover:bg-stone-300"
          >
            Kendim Koyacağım
          </button>
          <button
            type="button"
            onClick={onApply}
            className="flex-1 py-2.5 px-3 rounded-xl bg-amber-600 text-white text-xs font-medium hover:bg-amber-700 flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Sembolü Yerleştir</span>
          </button>
        </div>
      </div>
    </div>
  );
};
