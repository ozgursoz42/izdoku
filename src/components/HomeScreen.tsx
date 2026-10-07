import React, { useState } from 'react';
import { UserProgress, SYMBOLS } from '../types/game';
import { SymbolIcon } from './SymbolIcon';
import { Play, Calendar, Image as ImageIcon, Settings, Sparkles } from 'lucide-react';

interface HomeScreenProps {
  progress: UserProgress;
  onPlay: () => void;
  onJourneyMap: () => void;
  onDaily: () => void;
  onCollection: () => void;
  onSettings: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  progress,
  onPlay,
  onJourneyMap,
  onDaily,
  onCollection,
  onSettings,
}) => {
  const [activeSymbolId, setActiveSymbolId] = useState<number>(1);
  const activeSymbol = SYMBOLS[activeSymbolId];

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-between items-center px-4 py-8 max-w-md mx-auto text-stone-800">
      {/* Top Brand Bar */}
      <div className="w-full flex items-center justify-between">
        <button
          type="button"
          onClick={onJourneyMap}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EFE9DF] border border-[#E0D7C7] text-stone-600 text-xs font-semibold hover:border-amber-400 active:scale-95 transition-all"
          title="Tüm 100 Bölümü Gör"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Aşama {progress.unlockedLevel} / 100 · Harita</span>
        </button>

        <button
          type="button"
          onClick={onSettings}
          className="p-2.5 rounded-2xl bg-[#EFE9DF] border border-[#E0D7C7] text-stone-600 hover:text-stone-900 active:scale-95 transition-all"
          title="Ayarlar & Rehber"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Hero Visual: Sacred Ring of 9 Illustrated Symbols */}
      <div className="flex flex-col items-center my-auto py-4">
        {/* Animated Symbol Ring */}
        <div className="relative w-56 h-56 flex items-center justify-center">
          {/* Subtle concentric rings */}
          <div className="absolute inset-0 rounded-full border border-stone-300/40" />
          <div className="absolute inset-4 rounded-full border border-dashed border-stone-300/50" />

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
                    ? 'bg-white shadow-lg ring-2 ring-amber-500 scale-125 z-10'
                    : 'bg-[#FAF7F2] border border-[#E0D7C7] shadow-xs hover:scale-110'
                }`}
                style={{
                  transform: `translate(${x}px, ${y}px) ${
                    isSelected ? 'scale(1.2)' : 'scale(1)'
                  }`,
                }}
              >
                <SymbolIcon symbolId={id} size={26} />
              </button>
            );
          })}

          {/* Center Emblem with selected symbol details */}
          <div className="relative w-24 h-24 rounded-full bg-white/90 border border-stone-200/80 shadow-md flex flex-col items-center justify-center p-2 text-center pointer-events-none">
            <SymbolIcon symbolId={activeSymbolId} size={36} />
            <span className="text-[10px] font-bold text-stone-800 mt-1 line-clamp-1">
              {activeSymbol?.trName}
            </span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center mt-6">
          <h1 className="text-4xl font-extrabold font-display tracking-tight text-stone-900">
            İZ DOKU
          </h1>
          <p className="text-xs text-stone-500 mt-1 font-medium tracking-wide">
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
            className="col-span-3 h-14 rounded-2xl bg-stone-900 text-white font-semibold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-stone-900/10 hover:bg-stone-800 active:scale-98 transition-all"
          >
            <Play className="w-5 h-5 fill-white text-white" />
            <span>OYNA ({progress.unlockedLevel})</span>
          </button>

          <button
            type="button"
            onClick={onJourneyMap}
            className="col-span-2 h-14 rounded-2xl bg-[#E6DECE] border border-[#D5CBBA] text-stone-800 font-bold text-xs flex flex-col items-center justify-center gap-0.5 hover:bg-[#DDD3C0] active:scale-98 transition-all shadow-xs"
            title="100 Bölüm Haritası"
          >
            <span className="text-[9px] uppercase tracking-wider text-stone-500 font-bold">100 Bölüm</span>
            <span>BÖLÜM SEÇ</span>
          </button>
        </div>

        {/* GÜNLÜK BULMACA */}
        <button
          type="button"
          onClick={onDaily}
          className="w-full h-12 rounded-2xl bg-[#EFE9DF] border border-[#E0D7C7] text-stone-800 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#EAE3D7] active:scale-98 transition-all"
        >
          <Calendar className="w-4 h-4 text-amber-600" />
          <span>GÜNLÜK BULMACA</span>
        </button>

        {/* KOLEKSİYON & AYARLAR */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={onCollection}
            className="h-12 rounded-2xl bg-[#EFE9DF] border border-[#E0D7C7] text-stone-800 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#EAE3D7] active:scale-98 transition-all"
          >
            <ImageIcon className="w-4 h-4 text-emerald-600" />
            <span>KOLEKSİYON</span>
          </button>

          <button
            type="button"
            onClick={onSettings}
            className="h-12 rounded-2xl bg-[#EFE9DF] border border-[#E0D7C7] text-stone-800 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#EAE3D7] active:scale-98 transition-all"
          >
            <Settings className="w-4 h-4 text-stone-600" />
            <span>AYARLAR</span>
          </button>
        </div>
      </div>
    </div>
  );
};
