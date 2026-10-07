import React, { useState } from 'react';
import { HIDDEN_ARTWORKS, ARTWORK_IDS } from '../utils/hiddenPictures';
import { HiddenArt } from '../types/game';
import { Sparkles, Lock, X } from 'lucide-react';

interface CollectionModalProps {
  unlockedArtIds: string[];
  onClose: () => void;
}

export const CollectionModal: React.FC<CollectionModalProps> = ({
  unlockedArtIds,
  onClose,
}) => {
  const [selectedArt, setSelectedArt] = useState<HiddenArt | null>(null);

  const unlockedSet = new Set(unlockedArtIds);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md max-h-[90vh] rounded-3xl bg-[#FAF7F2] border border-[#E5DDD0] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5DDD0] bg-[#FAF7F2]">
          <div>
            <h2 className="text-lg font-bold font-display text-stone-900 flex items-center gap-2">
              <span>İz Koleksiyonu</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </h2>
            <p className="text-[11px] text-stone-500 mt-0.5">
              {unlockedSet.size} / {ARTWORK_IDS.length} Gizli Tablo Keşfedildi
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Artworks Grid */}
        <div className="p-4 overflow-y-auto grid grid-cols-2 gap-3 flex-1">
          {ARTWORK_IDS.map((artId) => {
            const art = HIDDEN_ARTWORKS[artId];
            if (!art) return null;
            const isUnlocked = unlockedSet.has(artId);

            return (
              <button
                key={artId}
                type="button"
                onClick={() => isUnlocked && setSelectedArt(art)}
                className={`flex flex-col items-center p-3 rounded-2xl border transition-all text-center relative ${
                  isUnlocked
                    ? 'bg-[#FCFBF8] border-[#E0D7C7] hover:shadow-md hover:border-amber-400 active:scale-98 cursor-pointer'
                    : 'bg-[#F2ECE1] border-stone-200/60 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="w-24 h-24 rounded-xl bg-white/70 p-2 border border-stone-200/60 shadow-xs flex items-center justify-center relative overflow-hidden mb-2">
                  {isUnlocked ? (
                    <svg
                      viewBox={art.viewBox}
                      className="w-full h-full drop-shadow-xs"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {art.paths.map((p) => (
                        <path
                          key={p.id}
                          d={p.d}
                          fill={p.fill ?? 'none'}
                          stroke={p.stroke ?? 'none'}
                          strokeWidth={p.strokeWidth ?? 1.5}
                        />
                      ))}
                    </svg>
                  ) : (
                    <div className="flex flex-col items-center text-stone-400">
                      <Lock className="w-6 h-6 mb-1 text-stone-400" />
                      <span className="text-[9px] font-medium text-stone-500">Kilitli</span>
                    </div>
                  )}
                </div>

                <span className="text-xs font-bold text-stone-800 line-clamp-1">
                  {isUnlocked ? art.trName : 'Gizli İz'}
                </span>
                <span className="text-[10px] text-stone-500 mt-0.5">
                  {isUnlocked ? art.category : 'Bölüm Tamamla'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Artwork Inspector Modal */}
        {selectedArt && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-sm rounded-3xl bg-[#FAF7F2] border border-[#E5DDD0] shadow-2xl p-6 text-center flex flex-col items-center relative">
              <button
                type="button"
                onClick={() => setSelectedArt(null)}
                className="absolute top-4 right-4 p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/50"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-44 h-44 rounded-2xl bg-white/80 p-3 border border-stone-200 shadow-md flex items-center justify-center my-2">
                <svg
                  viewBox={selectedArt.viewBox}
                  className="w-full h-full drop-shadow-md"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {selectedArt.paths.map((p) => (
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

              <span className="text-xs font-semibold text-amber-700 mt-1 uppercase tracking-wider">
                {selectedArt.category}
              </span>
              <h3 className="text-lg font-bold font-display text-stone-900 mt-0.5">
                {selectedArt.trName}
              </h3>
              <p className="text-xs text-stone-600 mt-2 px-3 leading-relaxed">
                {selectedArt.description}
              </p>

              <button
                type="button"
                onClick={() => setSelectedArt(null)}
                className="w-full mt-5 py-2.5 rounded-xl bg-stone-900 text-white font-medium text-xs hover:bg-stone-800"
              >
                Kapat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
