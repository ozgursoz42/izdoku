import React, { useState } from 'react';
import { UserProgress, SYMBOLS } from '../types/game';
import { SymbolIcon } from './SymbolIcon';
import { Volume2, VolumeX, Smartphone, Eye, RotateCcw, X, HelpCircle } from 'lucide-react';

interface SettingsModalProps {
  progress: UserProgress;
  onUpdateSettings: (settings: UserProgress['settings']) => void;
  onResetProgress: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  progress,
  onUpdateSettings,
  onResetProgress,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'guide'>('settings');
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md max-h-[90vh] rounded-3xl bg-[#FAF7F2] border border-[#E5DDD0] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5DDD0] bg-[#FAF7F2]">
          <div className="flex items-center gap-1 bg-[#EFE9DF] p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Ayarlar
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('guide')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                activeTab === 'guide'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Nasıl Oynanır?</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1">
          {activeTab === 'settings' ? (
            <div className="flex flex-col gap-4">
              {/* Sound Toggle */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-stone-200/70">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                    {progress.settings.sound ? (
                      <Volume2 className="w-5 h-5" />
                    ) : (
                      <VolumeX className="w-5 h-5 text-stone-400" />
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-800 block">
                      Ses Efektleri
                    </span>
                    <span className="text-[10px] text-stone-500">
                      Organik zil ve melodi sesleri
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSettings({
                      ...progress.settings,
                      sound: !progress.settings.sound,
                    })
                  }
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    progress.settings.sound ? 'bg-amber-600' : 'bg-stone-300'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform absolute top-0.5 ${
                      progress.settings.sound ? 'right-0.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Vibration Toggle */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-stone-200/70">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-800 block">
                      Dokunsal Titreşim
                    </span>
                    <span className="text-[10px] text-stone-500">
                      Yerleştirme ve başarı geri bildirimi
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSettings({
                      ...progress.settings,
                      vibration: !progress.settings.vibration,
                    })
                  }
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    progress.settings.vibration ? 'bg-indigo-600' : 'bg-stone-300'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform absolute top-0.5 ${
                      progress.settings.vibration ? 'right-0.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* High Contrast Mode */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-stone-200/70">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-800 block">
                      Yüksek Karşıtlık
                    </span>
                    <span className="text-[10px] text-stone-500">
                      Hücre kenarlıklarını ve sembolleri güçlendirir
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSettings({
                      ...progress.settings,
                      highContrast: !progress.settings.highContrast,
                    })
                  }
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    progress.settings.highContrast
                      ? 'bg-emerald-600'
                      : 'bg-stone-300'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform absolute top-0.5 ${
                      progress.settings.highContrast ? 'right-0.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Reset Progress */}
              <div className="pt-3 border-t border-stone-200/80">
                {!confirmReset ? (
                  <button
                    type="button"
                    onClick={() => setConfirmReset(true)}
                    className="w-full py-2.5 px-3 rounded-xl border border-rose-200 text-rose-600 text-xs font-medium hover:bg-rose-50 flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>İlerlemeyi Sıfırla</span>
                  </button>
                ) : (
                  <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col gap-2">
                    <span className="text-xs font-bold text-rose-800">
                      Tüm ilerlemeniz sıfırlanacak! Emin misiniz?
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onResetProgress();
                          setConfirmReset(false);
                          onClose();
                        }}
                        className="flex-1 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-medium hover:bg-rose-700"
                      >
                        Evet, Sıfırla
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmReset(false)}
                        className="flex-1 py-1.5 rounded-lg bg-stone-200 text-stone-700 text-xs font-medium hover:bg-stone-300"
                      >
                        Vazgeç
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Guide Tab */
            <div className="flex flex-col gap-4 text-stone-700 text-xs leading-relaxed">
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60">
                <h4 className="font-bold text-amber-900 mb-1">
                  Temel Mantık Kuralları
                </h4>
                <p className="text-[11px] text-amber-800">
                  Her satırda, her sütunda ve her kalın çizgili bölgede her
                  sembol yalnızca <strong>1 kez</strong> bulunabilir. Sayılar
                  yoktur, yalnızca doğal formlar vardır.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/60">
                <h4 className="font-bold text-emerald-900 mb-1">
                  “İz” Sistemi & Gizli Tablolar
                </h4>
                <p className="text-[11px] text-emerald-800">
                  Doğru yerleştirdiğiniz her sembol benzersiz bir iz parçacığı
                  bırakır. Bir satır, sütun veya bölgeyi tamamladığınızda izler
                  birleşir ve bölümün arkasındaki <strong>gizli tabloyu</strong> parça
                  parça açığa çıkarır!
                </p>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 mb-2">9 Doğal Sembol</h4>
                <div className="grid grid-cols-1 gap-2">
                  {Object.values(SYMBOLS).map((sym) => (
                    <div
                      key={sym.id}
                      className="flex items-center gap-3 p-2 rounded-xl bg-white border border-stone-200/70"
                    >
                      <div className="w-8 h-8 rounded-lg bg-stone-50 flex items-center justify-center shrink-0">
                        <SymbolIcon symbolId={sym.id} size={22} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-800">
                            {sym.trName}
                          </span>
                          <span className="text-[10px] text-stone-400">
                            {sym.traceType}
                          </span>
                        </div>
                        <p className="text-[10px] text-stone-500 truncate">
                          {sym.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
