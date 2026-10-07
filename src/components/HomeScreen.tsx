import React, { useState } from 'react';
import { UserProgress, SYMBOLS } from '../types/game';
import { SymbolIcon } from './SymbolIcon';
import { Play, Calendar, Image as ImageIcon, Settings, Sparkles } from 'lucide-react';
import { getTheme, ThemeDefinition } from '../utils/theme';

interface HomeScreenProps {
  progress: UserProgress;
  onPlay: () => void;
  onJourneyMap: () => void;
  onDaily: () => void;
  onCollection: () => void;
  onSettings: () => void;
  theme?: ThemeDefinition;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  progress,
  onPlay,
  onJourneyMap,
  onDaily,
  onCollection,
  onSettings,
  theme,
}) => {
  const currentTheme = theme || getTheme(progress.settings.theme);
  const [activeSymbolId, setActiveSymbolId] = useState<number>(1);
  const activeSymbol = SYMBOLS[activeSymbolId];

  return (
    <div
      className="min-h-screen flex flex-col justify-between items-center px-4 py-8 max-w-md mx-auto transition-colors duration-200"
      style={{
        backgroundColor: currentTheme.appBg,
        color: currentTheme.textPrimary,
      }}
    >
      {/* Top Brand Bar */}
      <div className="w-full flex items-center justify-between">
        <button
          type="button"
          onClick={onJourneyMap}
          style={{
            backgroundColor: currentTheme.cardBg,
            borderColor: currentTheme.cardBorder,
            color: currentTheme.textSecondary,
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold hover:opacity-90 active:scale-95 transition-all shadow-xs"
          title="Tüm 100 Bölümü Gör"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Aşama {progress.unlockedLevel} / 100 · Harita</span>
        </button>

        <button
          type="button"
          onClick={onSettings}
          style={{
            backgroundColor: currentTheme.cardBg,
            borderColor: currentTheme.cardBorder,
            color: currentTheme.textSecondary,
          }}
          className="p-2.5 rounded-2xl border hover:opacity-90 active:scale-95 transition-all shadow-xs"
          title="Ayarlar & Temalar"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Hero Visual: Sacred Ring of 9 Illustrated Symbols */}
      <div className="flex flex-col items-center my-auto py-4">
        {/* Animated Symbol Ring */}
        <div className="relative w-56 h-56 flex items-center justify-center">
          {/* Subtle concentric rings */}
          <div
            className="absolute inset-0 rounded-full border opacity-30"
            style={{ borderColor: currentTheme.cardBorder }}
          />
          <div
            className="absolute inset-4 rounded-full border border-dashed opacity-40"
            style={{ borderColor: currentTheme.cardBorder }}
          />

          {/* 9 Symbols orbiting */}
          {Array.from({ length: 9 }, (_, i) => i + 1).map((id, index) => {
            const angle = (index * (360 / 9) - 90) * (Math.PI / 180);
            const radius = 94; // px from center
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isSelected = activeSymbolId === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveSymbolId(id)}
                className={`absolute w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  isSelected
                    ? 'shadow-lg scale-125 z-10 ring-2 ring-amber-500'
                    : 'shadow-xs hover:scale-110'
                }`}
                style={{
                  transform: `translate(${x}px, ${y}px) ${
                    isSelected ? 'scale(1.2)' : 'scale(1)'
                  }`,
                  backgroundColor: isSelected
                    ? (currentTheme.isDark ? '#1E293B' : '#FFFFFF')
                    : currentTheme.cardBg,
                  borderColor: currentTheme.cardBorder,
                  borderWidth: '1px',
                }}
              >
                <SymbolIcon symbolId={id} size={26} />
              </button>
            );
          })}

          {/* Center Emblem with selected symbol details */}
          <div
            className="relative w-24 h-24 rounded-full border shadow-md flex flex-col items-center justify-center p-2 text-center pointer-events-none"
            style={{
              backgroundColor: currentTheme.isDark ? '#1E293B' : '#FFFFFF',
              borderColor: currentTheme.cardBorder,
            }}
          >
            <SymbolIcon symbolId={activeSymbolId} size={36} />
            <span
              className="text-[10px] font-bold mt-1 line-clamp-1"
              style={{ color: currentTheme.textPrimary }}
            >
              {activeSymbol?.trName}
            </span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center mt-6">
          <h1
            className="text-4xl font-extrabold font-display tracking-tight"
            style={{ color: currentTheme.textPrimary }}
          >
            İZ DOKU
          </h1>
          <p
            className="text-xs mt-1 font-medium tracking-wide"
            style={{ color: currentTheme.textMuted }}
          >
            Sayılara gerek yok. İzleri takip et.
          </p>
        </div>
      </div>

      {/* Main Navigation Buttons */}
      <div className="w-full flex flex-col gap-2.5 pb-2">
        {/* OYNA & BÖLÜM SEÇ Grid */}
        <div className="grid grid-cols-5 gap-2">
          <button
            type="button"
            onClick={onPlay}
            style={{
              backgroundColor: currentTheme.btnPrimaryBg,
              color: currentTheme.btnPrimaryText,
            }}
            className="col-span-3 h-14 rounded-2xl font-semibold text-base flex items-center justify-center gap-2.5 shadow-lg hover:opacity-90 active:scale-98 transition-all"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>OYNA ({progress.unlockedLevel})</span>
          </button>

          <button
            type="button"
            onClick={onJourneyMap}
            style={{
              backgroundColor: currentTheme.cardBg,
              borderColor: currentTheme.cardBorder,
              color: currentTheme.textPrimary,
            }}
            className="col-span-2 h-14 rounded-2xl border font-bold text-xs flex flex-col items-center justify-center gap-0.5 hover:opacity-90 active:scale-98 transition-all shadow-xs"
            title="100 Bölüm Haritası"
          >
            <span
              className="text-[9px] uppercase tracking-wider font-bold"
              style={{ color: currentTheme.textMuted }}
            >
              100 Bölüm
            </span>
            <span>BÖLÜM SEÇ</span>
          </button>
        </div>

        {/* GÜNLÜK BULMACA */}
        <button
          type="button"
          onClick={onDaily}
          style={{
            backgroundColor: currentTheme.cardBg,
            borderColor: currentTheme.cardBorder,
            color: currentTheme.textPrimary,
          }}
          className="w-full h-12 rounded-2xl border font-semibold text-xs flex items-center justify-center gap-2 hover:opacity-90 active:scale-98 transition-all shadow-xs"
        >
          <Calendar className="w-4 h-4 text-amber-500" />
          <span>GÜNLÜK BULMACA</span>
        </button>

        {/* KOLEKSİYON & AYARLAR */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={onCollection}
            style={{
              backgroundColor: currentTheme.cardBg,
              borderColor: currentTheme.cardBorder,
              color: currentTheme.textPrimary,
            }}
            className="h-12 rounded-2xl border font-semibold text-xs flex items-center justify-center gap-2 hover:opacity-90 active:scale-98 transition-all shadow-xs"
          >
            <ImageIcon className="w-4 h-4 text-emerald-500" />
            <span>KOLEKSİYON</span>
          </button>

          <button
            type="button"
            onClick={onSettings}
            style={{
              backgroundColor: currentTheme.cardBg,
              borderColor: currentTheme.cardBorder,
              color: currentTheme.textPrimary,
            }}
            className="h-12 rounded-2xl border font-semibold text-xs flex items-center justify-center gap-2 hover:opacity-90 active:scale-98 transition-all shadow-xs"
          >
            <Settings className="w-4 h-4 text-amber-500" />
            <span>AYARLAR</span>
          </button>
        </div>
      </div>
    </div>
  );
};
