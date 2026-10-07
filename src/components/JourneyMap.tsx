import React, { useRef, useEffect } from 'react';
import { UserProgress } from '../types/game';
import { HIDDEN_ARTWORKS } from '../utils/hiddenPictures';
import { Lock, Star, ChevronLeft } from 'lucide-react';

interface JourneyMapProps {
  progress: UserProgress;
  onSelectLevel: (levelId: number) => void;
  onBack: () => void;
}

interface ChapterInfo {
  id: number;
  title: string;
  subtitle: string;
  range: [number, number];
  boardDesc: string;
  badgeColor: string;
}

const CHAPTERS: ChapterInfo[] = [
  {
    id: 1,
    title: 'Filiz Bahçesi',
    subtitle: 'İlk adımlar ve doğal sembollerin keşfi',
    range: [1, 10],
    boardDesc: '4x4 Tahta · 4 Sembol',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  {
    id: 2,
    title: 'Akarsu Vadisi',
    subtitle: 'Genişleyen vadi ve iz sistemi',
    range: [11, 25],
    boardDesc: '6x6 Tahta · 6 Sembol',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
  },
  {
    id: 3,
    title: 'Güneş Çayırı',
    subtitle: 'Klasik 9 sembollü mantık dengesi',
    range: [26, 50],
    boardDesc: '9x9 Tahta · 9 Sembol',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  {
    id: 4,
    title: 'Kristal Zirvesi',
    subtitle: 'Derin mantık ve 3x3 klasik kare bloklar',
    range: [51, 70],
    boardDesc: '9x9 Tahta · 3x3 Kareler',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
  },
  {
    id: 5,
    title: 'Gizli Hatıralar',
    subtitle: 'Katman katman açılan efsanevi tablolar',
    range: [71, 85],
    boardDesc: '9x9 Tahta · 3x3 Kareler',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
  },
  {
    id: 6,
    title: 'Usta Tapınağı',
    subtitle: 'Sınırlı hatalı derin mantık sınavı',
    range: [86, 100],
    boardDesc: '9x9 Tahta · Uzman (3 Can)',
    badgeColor: 'bg-stone-800 text-amber-300 border-stone-700',
  },
];

export const JourneyMap: React.FC<JourneyMapProps> = ({
  progress,
  onSelectLevel,
  onBack,
}) => {
  const currentUnlockedRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Scroll to currently unlocked level
    if (currentUnlockedRef.current) {
      currentUnlockedRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col max-w-md mx-auto">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E5DDD0]">
        <button
          type="button"
          onClick={onBack}
          className="p-2 -ml-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 flex items-center gap-1"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-xs font-semibold">Ana Menü</span>
        </button>

        <div className="text-center">
          <h1 className="text-base font-bold font-display text-stone-900">
            Bölüm Seçimi (1 - 100)
          </h1>
          <span className="text-[10px] text-emerald-700 font-semibold">
            Tüm 100 Bölüm Açık · {Object.keys(progress.completedLevels).length} Tamamlandı
          </span>
        </div>

        <div className="w-14" />
      </div>

      {/* Quick Chapter Jump Filter Tabs */}
      <div className="px-3 py-2 bg-[#FAF7F2] border-b border-[#E5DDD0] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {CHAPTERS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              const el = document.getElementById(`chapter-${c.id}`);
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-2.5 py-1 rounded-xl text-[11px] font-semibold bg-[#EFE9DF] text-stone-700 hover:bg-stone-200 whitespace-nowrap shrink-0 border border-[#E0D7C7]"
          >
            Bölüm {c.id} ({c.boardDesc.split(' · ')[0]})
          </button>
        ))}
      </div>

      {/* Chapters & Levels Flow */}
      <div className="p-4 flex flex-col gap-6 pb-12">
        {CHAPTERS.map((chap) => {
          const [start, end] = chap.range;
          const levels = Array.from({ length: end - start + 1 }, (_, i) => start + i);

          return (
            <div
              key={chap.id}
              id={`chapter-${chap.id}`}
              className="p-4 rounded-3xl bg-[#EFE9DF] border border-[#E0D7C7] flex flex-col gap-3 shadow-xs"
            >
              {/* Chapter Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-stone-500">
                    Bölüm {chap.id}
                  </span>
                  <h2 className="text-base font-bold font-display text-stone-900 leading-tight">
                    {chap.title}
                  </h2>
                  <p className="text-[11px] text-stone-600 mt-0.5">
                    {chap.subtitle}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-1 rounded-lg border shrink-0 ${chap.badgeColor}`}
                >
                  {chap.boardDesc}
                </span>
              </div>

              {/* Levels Grid - All levels clickable and playable! */}
              <div className="grid grid-cols-5 gap-2 pt-1">
                {levels.map((lvl) => {
                  const isCurrent = lvl === progress.unlockedLevel;
                  const completedData = progress.completedLevels[lvl];
                  const isCompleted = !!completedData;

                  return (
                    <button
                      key={lvl}
                      ref={isCurrent ? currentUnlockedRef : undefined}
                      type="button"
                      onClick={() => onSelectLevel(lvl)}
                      className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center transition-all p-1 cursor-pointer active:scale-95 ${
                        isCurrent
                          ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-400 ring-offset-2 scale-105 z-10'
                          : isCompleted
                          ? 'bg-[#FAF7F2] border border-[#E0D7C7] text-stone-800 hover:border-amber-400 hover:shadow-xs'
                          : 'bg-white border border-stone-200/90 text-stone-800 hover:border-amber-400 hover:shadow-xs'
                      }`}
                    >
                      <span className="text-xs font-bold leading-none">
                        {lvl}
                      </span>

                      {/* Status / Star */}
                      <div className="mt-1 flex items-center justify-center h-3">
                        {isCompleted ? (
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: completedData.stars || 1 }).map((_, s) => (
                              <Star
                                key={s}
                                className="w-2 h-2 text-amber-500 fill-amber-500"
                              />
                            ))}
                          </div>
                        ) : isCurrent ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        ) : (
                          <span className="text-[8px] text-stone-400 font-medium">Oyna</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
