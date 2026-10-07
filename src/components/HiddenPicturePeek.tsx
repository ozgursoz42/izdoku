import React from 'react';
import { HiddenArt } from '../types/game';
import { Sparkles } from 'lucide-react';

interface HiddenPicturePeekProps {
  artwork: HiddenArt;
  completionProgress: number; // 0 to 1
  onClick?: () => void;
  isCompleted?: boolean;
}

export const HiddenPicturePeek: React.FC<HiddenPicturePeekProps> = ({
  artwork,
  completionProgress,
  onClick,
  isCompleted = false,
}) => {
  const totalPaths = artwork.paths.length;
  // Calculate how many paths are visible based on completion
  const revealedCount = isCompleted
    ? totalPaths
    : Math.floor(completionProgress * totalPaths);

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex items-center gap-3 px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-[#E5DDD0] shadow-sm hover:shadow transition-all group max-w-xs text-left"
      title="Gizli Tablo Gelişimi — Dokun ve Büyüt"
    >
      {/* Mini SVG Frame */}
      <div className="relative w-10 h-10 rounded-lg bg-[#EFE9DF] p-1 flex items-center justify-center overflow-hidden shrink-0 border border-[#E0D7C7]">
        <svg
          viewBox={artwork.viewBox}
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {artwork.paths.map((p, idx) => {
            const isVisible = idx <= revealedCount;
            return (
              <path
                key={p.id}
                d={p.d}
                fill={isVisible ? p.fill ?? 'none' : 'none'}
                stroke={isVisible ? p.stroke ?? 'none' : '#C7BFB3'}
                strokeWidth={isVisible ? p.strokeWidth ?? 1.5 : 1}
                strokeDasharray={isVisible ? undefined : '2 2'}
                className="transition-all duration-500"
                opacity={isVisible ? 1 : 0.25}
              />
            );
          })}
        </svg>

        {isCompleted && (
          <div className="absolute inset-0 bg-amber-400/10 pointer-events-none animate-pulse" />
        )}
      </div>

      {/* Info labels */}
      <div className="flex flex-col min-w-0 pr-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-stone-800 truncate">
            {artwork.trName}
          </span>
          {isCompleted && <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <div className="w-16 h-1.5 rounded-full bg-stone-200 overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.round(completionProgress * 100)}%` }}
            />
          </div>
          <span className="text-[10px] text-stone-500 font-medium tabular-nums">
            %{Math.round(completionProgress * 100)}
          </span>
        </div>
      </div>
    </button>
  );
};
