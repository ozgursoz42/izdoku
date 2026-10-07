import React, { useRef, useEffect } from 'react';
import { UserProgress } from '../types/game';
import { HIDDEN_ARTWORKS } from '../utils/hiddenPictures';
import { Lock, Star, ChevronLeft } from 'lucide-react';
import { getTheme, ThemeDefinition } from '../utils/theme';

interface JourneyMapProps {
  progress: UserProgress;
  onSelectLevel: (levelId: number) => void;
  onBack: () => void;
  theme?: ThemeDefinition;
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
    boardDesc: '9x9 Tahta · 3x3 Kareler',
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
    boardDesc: '9x9 Tahta · 3x3 Kareler (3 Can)',
    badgeColor: 'bg-stone-800 text-amber-300 border-stone-700',
  },
];

export const JourneyMap: React.FC<JourneyMapProps> = ({
  progress,
  onSelectLevel,
  onBack,
  theme,
}) => {
  const currentTheme = theme || getTheme(progress.settings.theme);
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
    <div
      className="min-h-screen flex flex-col max-w-md mx-auto transition-colors duration-200"
      style={{
        backgroundColor: currentTheme.appBg,
        color: currentTheme.textPrimary,
      }}
    >
      {/* Sticky Header */}
      <div
        className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 backdrop-blur-md border-b transition-colors duration-200"
        style={{
          backgroundColor: currentTheme.headerBg,
          borderColor: currentTheme.headerBorder,
        }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{ color: currentTheme.textSecondary }}
          className="p-2 -ml-2 rounded-xl hover:opacity-80 flex items-center gap-1 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-xs font-semibold">Ana Menü</span>
        </button>

        <div className="text-center">
          <h1
            className="text-base font-bold font-display"
            style={{ color: currentTheme.textPrimary }}
          >
            Bölüm Seçimi (1 - 100)
          </h1>
          <span
            className="text-[10px] font-semibold"
            style={{ color: currentTheme.isDark ? '#34D399' : '#059669' }}
          >
            Tüm 100 Bölüm Açık · {Object.keys(progress.completedLevels).length} Tamamlandı
          </span>
        </div>

        <div className="w-14" />
      </div>

      {/* Quick Chapter Jump Filter Tabs */}
      <div
        className="px-3 py-2 border-b flex items-center gap-1.5 overflow-x-auto no-scrollbar transition-colors duration-200"
        style={{
          backgroundColor: currentTheme.headerBg,
          borderColor: currentTheme.headerBorder,
        }}
      >
        {CHAPTERS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              const el = document.getElementById(`chapter-${c.id}`);
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              backgroundColor: currentTheme.cardBg,
              borderColor: currentTheme.cardBorder,
              color: currentTheme.textSecondary,
            }}
            className="px-2.5 py-1 rounded-xl text-[11px] font-semibold hover:opacity-90 whitespace-nowrap shrink-0 border"
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
              style={{
                backgroundColor: currentTheme.cardBg,
                borderColor: currentTheme.cardBorder,
              }}
              className="p-4 rounded-3xl border flex flex-col gap-3 shadow-xs"
            >
              {/* Chapter Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className="text-[10px] font-bold tracking-wider uppercase"
                    style={{ color: currentTheme.textMuted }}
                  >
                    Bölüm {chap.id}
                  </span>
                  <h2
                    className="text-base font-bold font-display leading-tight"
                    style={{ color: currentTheme.textPrimary }}
                  >
                    {chap.title}
                  </h2>
                  <p
                    className="text-[11px] mt-0.5"
                    style={{ color: currentTheme.textSecondary }}
                  >
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
                      style={{
                        backgroundColor: isCurrent
                          ? currentTheme.btnPrimaryBg
                          : isCompleted
                          ? (currentTheme.isDark ? '#1E293B' : '#FFFFFF')
                          : currentTheme.cardBg,
                        borderColor: isCurrent
                          ? currentTheme.btnPrimaryBg
                          : currentTheme.cardBorder,
                        color: isCurrent
                          ? currentTheme.btnPrimaryText
                          : currentTheme.textPrimary,
                      }}
                      className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center transition-all p-1 cursor-pointer active:scale-95 border ${
                        isCurrent
                          ? 'shadow-md ring-2 ring-offset-2 scale-105 z-10'
                          : isCompleted
                          ? 'hover:opacity-90 hover:shadow-xs'
                          : 'opacity-80 hover:opacity-100'
                      }`}
                    >
                      <span className="text-xs font-bold leading-none">{lvl}</span>

                      {/* Stars for completed levels */}
                      {isCompleted && (
                        <div className="flex items-center gap-0.5 mt-1">
                          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          <span
                            className="text-[9px] font-semibold"
                            style={{ color: currentTheme.textMuted }}
                          >
                            {completedData.stars}
                          </span>
                        </div>
                      )}
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
