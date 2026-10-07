import React from 'react';
import { UserProgress } from '../types/game';
import { Calendar, Flame, Play, ChevronLeft, CheckCircle2 } from 'lucide-react';

interface DailyScreenProps {
  progress: UserProgress;
  onStartDaily: () => void;
  onBack: () => void;
}

export const DailyScreen: React.FC<DailyScreenProps> = ({
  progress,
  onStartDaily,
  onBack,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const isCompletedToday = progress.lastDailyCompletedDate === todayStr;

  const dateFormatted = new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date());

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-between max-w-md mx-auto p-4 text-stone-800">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="p-2 -ml-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 flex items-center gap-1"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-xs font-semibold">Ana Menü</span>
        </button>

        <h1 className="text-sm font-bold font-display text-stone-900">
          Günlük Bulmaca
        </h1>

        <div className="w-12" />
      </div>

      {/* Center Card */}
      <div className="flex flex-col items-center my-auto py-6">
        <div className="w-20 h-20 rounded-3xl bg-amber-100/80 border border-amber-200 flex items-center justify-center text-amber-600 mb-4 shadow-xs">
          <Calendar className="w-10 h-10" />
        </div>

        <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
          {dateFormatted}
        </span>
        <h2 className="text-2xl font-extrabold font-display text-stone-900 mt-1">
          Günün İzi
        </h2>
        <p className="text-xs text-stone-500 text-center max-w-xs mt-1.5 leading-relaxed">
          Her gün yenilenen özel 6x6 sembol bulmacası. Zihnini tazele ve serini
          koru.
        </p>

        {/* Streak Counter Card */}
        <div className="mt-6 flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#EFE9DF] border border-[#E0D7C7]">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
            <Flame className="w-6 h-6 fill-orange-500" />
          </div>
          <div className="text-left">
            <span className="text-[10px] text-stone-500 font-semibold uppercase tracking-wider block">
              Mevcut Seri
            </span>
            <span className="text-lg font-extrabold text-stone-900 tabular-nums">
              {progress.dailyStreak} Gün
            </span>
          </div>
        </div>

        {/* Completion status if finished */}
        {isCompletedToday && (
          <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Bugünkü bulmacayı tamamladın!</span>
          </div>
        )}
      </div>

      {/* Start Button */}
      <div className="pb-4">
        <button
          type="button"
          onClick={onStartDaily}
          className="w-full h-14 rounded-2xl bg-stone-900 text-white font-semibold text-base flex items-center justify-center gap-3 shadow-lg shadow-stone-900/10 hover:bg-stone-800 active:scale-98 transition-all"
        >
          <Play className="w-5 h-5 fill-white text-white" />
          <span>{isCompletedToday ? 'Tekrar Oyna' : 'Bulmacayı Başlat'}</span>
        </button>
      </div>
    </div>
  );
};
