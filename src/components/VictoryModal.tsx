import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { HiddenArt } from '../types/game';
import { Star, Clock, AlertCircle, Lightbulb, Trophy, ArrowRight, RotateCcw } from 'lucide-react';

interface VictoryModalProps {
  levelTitle: string;
  artwork: HiddenArt;
  elapsedSeconds: number;
  mistakes: number;
  hintsUsed: number;
  bestTime: number | null;
  onNextLevel: () => void;
  onReplay: () => void;
  onViewCollection?: () => void;
  hasNextLevel: boolean;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  levelTitle,
  artwork,
  elapsedSeconds,
  mistakes,
  hintsUsed,
  bestTime,
  onNextLevel,
  onReplay,
  onViewCollection,
  hasNextLevel,
}) => {
  useEffect(() => {
    // Fire celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'],
      });
      const timer = setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 350);
      return () => clearTimeout(timer);
    } catch {
      // ignore
    }
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Determine star rating (3 stars for 0 mistakes and fast, 2 stars for <= 2 mistakes, 1 star otherwise)
  const stars = mistakes === 0 && hintsUsed === 0 ? 3 : mistakes <= 2 ? 2 : 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm rounded-3xl bg-[#FAF7F2] border border-[#E5DDD0] shadow-2xl overflow-hidden p-6 text-center flex flex-col items-center">
        {/* Decorative Top Sunburst Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-emerald-400 to-indigo-400" />

        <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 mb-3 shadow-inner">
          <Trophy className="w-6 h-6" />
        </div>

        <h2 className="text-2xl font-bold font-display text-stone-900 tracking-tight">
          Tamamlandı!
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">{levelTitle}</p>

        {/* Stars */}
        <div className="flex items-center justify-center gap-1.5 my-3">
          {[1, 2, 3].map((s) => (
            <Star
              key={s}
              className={`w-6 h-6 transition-all ${
                s <= stars
                  ? 'text-amber-400 fill-amber-400 drop-shadow-sm'
                  : 'text-stone-300'
              }`}
            />
          ))}
        </div>

        {/* Revealed Hidden Artwork Card */}
        <div className="w-full my-2 p-3 rounded-2xl bg-[#EFE9DF] border border-[#E0D7C7] flex flex-col items-center">
          <div className="relative w-32 h-32 rounded-xl bg-white/70 p-2 border border-stone-200/60 shadow-sm flex items-center justify-center">
            <svg
              viewBox={artwork.viewBox}
              className="w-full h-full drop-shadow-md"
              xmlns="http://www.w3.org/2000/svg"
            >
              {artwork.paths.map((p) => (
                <path
                  key={p.id}
                  d={p.d}
                  fill={p.fill ?? 'none'}
                  stroke={p.stroke ?? 'none'}
                  strokeWidth={p.strokeWidth ?? 1.5}
                />
              ))}
            </svg>
          </div>
          <span className="text-xs font-bold text-stone-800 mt-2">
            {artwork.trName}
          </span>
          <span className="text-[11px] text-stone-500 text-center px-2 line-clamp-2 mt-0.5">
            {artwork.description}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="w-full grid grid-cols-2 gap-2 my-3 text-left">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-stone-200/70">
            <Clock className="w-4 h-4 text-stone-500 shrink-0" />
            <div>
              <div className="text-[10px] text-stone-400 font-medium">Süre</div>
              <div className="text-xs font-bold text-stone-800 tabular-nums">
                {formatTime(elapsedSeconds)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-stone-200/70">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <div>
              <div className="text-[10px] text-stone-400 font-medium">Hatalar</div>
              <div className="text-xs font-bold text-stone-800 tabular-nums">
                {mistakes}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-stone-200/70">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
            <div>
              <div className="text-[10px] text-stone-400 font-medium">İpucu</div>
              <div className="text-xs font-bold text-stone-800 tabular-nums">
                {hintsUsed}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-stone-200/70">
            <Trophy className="w-4 h-4 text-emerald-500 shrink-0" />
            <div>
              <div className="text-[10px] text-stone-400 font-medium">En İyi</div>
              <div className="text-xs font-bold text-stone-800 tabular-nums">
                {bestTime ? formatTime(bestTime) : formatTime(elapsedSeconds)}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-2 mt-1">
          {hasNextLevel && (
            <button
              type="button"
              onClick={onNextLevel}
              className="w-full py-3 px-4 rounded-xl bg-stone-900 text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-stone-800 active:scale-98 transition-all shadow-md"
            >
              <span>Sonraki Bölüm</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onReplay}
              className="flex-1 py-2.5 px-3 rounded-xl bg-stone-200/80 text-stone-800 font-medium text-xs flex items-center justify-center gap-1.5 hover:bg-stone-300 active:scale-98 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Tekrar Oyna</span>
            </button>

            {onViewCollection && (
              <button
                type="button"
                onClick={onViewCollection}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#EFE9DF] border border-[#E0D7C7] text-stone-800 font-medium text-xs flex items-center justify-center gap-1.5 hover:bg-[#EAE3D7] active:scale-98 transition-all"
              >
                <span>Koleksiyonda Gör</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
