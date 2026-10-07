import React from 'react';
import { UserProgress } from '../types/game';
import { Calendar, Flame, Play, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { getTheme, ThemeDefinition } from '../utils/theme';

interface DailyScreenProps {
  progress: UserProgress;
  onStartDaily: () => void;
  onBack: () => void;
  theme?: ThemeDefinition;
}

export const DailyScreen: React.FC<DailyScreenProps> = ({
  progress,
  onStartDaily,
  onBack,
  theme,
}) => {
  const currentTheme = theme || getTheme(progress.settings.theme);
  const todayStr = new Date().toISOString().split('T')[0];
  const isCompletedToday = progress.lastDailyCompletedDate === todayStr;

  const dateFormatted = new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date());

  return (
    <div
      className="min-h-screen flex flex-col justify-between max-w-md mx-auto p-4 transition-colors duration-200"
      style={{
        backgroundColor: currentTheme.appBg,
        color: currentTheme.textPrimary,
      }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          style={{ color: currentTheme.textSecondary }}
          className="p-2 -ml-2 rounded-xl hover:opacity-80 flex items-center gap-1 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-xs font-semibold">Ana Menü</span>
        </button>

        <h1
          className="text-sm font-bold font-display"
          style={{ color: currentTheme.textPrimary }}
        >
          Günlük Bulmaca
        </h1>

        <div className="w-12" />
      </div>

      {/* Center Card */}
      <div className="flex flex-col items-center my-auto py-6">
        <div
          className="w-20 h-20 rounded-3xl border flex items-center justify-center mb-4 shadow-xs"
          style={{
            backgroundColor: currentTheme.isDark ? '#2E2012' : '#FEF3C7',
            borderColor: currentTheme.isDark ? '#78350F' : '#FDE68A',
            color: '#F59E0B',
          }}
        >
          <Calendar className="w-10 h-10" />
        </div>

        <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">
          {dateFormatted}
        </span>
        <h2
          className="text-2xl font-extrabold font-display mt-1"
          style={{ color: currentTheme.textPrimary }}
        >
          Günün İzi
        </h2>
        <p
          className="text-xs text-center max-w-xs mt-1.5 leading-relaxed"
          style={{ color: currentTheme.textMuted }}
        >
          Her gün yenilenen özel 6x6 sembol bulmacası. Zihnini tazele ve serini
          koru.
        </p>

        {/* Streak Counter Card */}
        <div
          className="mt-6 flex items-center gap-3 px-5 py-3 rounded-2xl border"
          style={{
            backgroundColor: currentTheme.cardBg,
            borderColor: currentTheme.cardBorder,
          }}
        >
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500">
            <Flame className="w-6 h-6 fill-orange-500" />
          </div>
          <div className="text-left">
            <span
              className="text-[10px] font-semibold uppercase tracking-wider block"
              style={{ color: currentTheme.textMuted }}
            >
              Mevcut Seri
            </span>
            <span
              className="text-lg font-extrabold tabular-nums"
              style={{ color: currentTheme.textPrimary }}
            >
              {progress.dailyStreak} Gün
            </span>
          </div>
        </div>

        {/* Completion status if finished */}
        {isCompletedToday && (
          <div
            className="mt-4 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
            style={{
              backgroundColor: currentTheme.isDark ? '#063022' : '#ECFDF5',
              borderColor: currentTheme.isDark ? '#065F46' : '#A7F3D0',
              color: currentTheme.isDark ? '#34D399' : '#059669',
            }}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Bugünkü bulmacayı tamamladın!</span>
          </div>
        )}
      </div>

      {/* Start Button */}
      <div className="pb-4">
        <button
          type="button"
          onClick={onStartDaily}
          style={{
            backgroundColor: currentTheme.btnPrimaryBg,
            color: currentTheme.btnPrimaryText,
          }}
          className="w-full h-14 rounded-2xl font-semibold text-base flex items-center justify-center gap-3 shadow-lg hover:opacity-90 active:scale-98 transition-all"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>{isCompletedToday ? 'Tekrar Oyna' : 'Bulmacayı Başlat'}</span>
        </button>
      </div>
    </div>
  );
};
