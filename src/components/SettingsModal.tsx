import React, { useState } from 'react';
import { UserProgress, SYMBOLS } from '../types/game';
import { SymbolIcon } from './SymbolIcon';
import { Volume2, VolumeX, Smartphone, Eye, RotateCcw, X, HelpCircle, Palette, Check } from 'lucide-react';
import { THEME_LIST, getTheme } from '../utils/theme';
import { soundManager } from '../utils/audio';

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

  const currentTheme = getTheme(progress.settings.theme);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-md max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-colors duration-200 border"
        style={{
          backgroundColor: currentTheme.cardBg,
          borderColor: currentTheme.cardBorder,
          color: currentTheme.textPrimary,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b shrink-0"
          style={{
            backgroundColor: currentTheme.headerBg,
            borderColor: currentTheme.headerBorder,
          }}
        >
          <div
            className="flex items-center gap-1 p-1 rounded-xl"
            style={{ backgroundColor: currentTheme.cardBg }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'settings'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'hover:opacity-80'
              }`}
              style={{
                color: activeTab === 'settings' ? '#FFFFFF' : currentTheme.textSecondary,
              }}
            >
              Ayarlar & Temalar
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('guide')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                activeTab === 'guide'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'hover:opacity-80'
              }`}
              style={{
                color: activeTab === 'guide' ? '#FFFFFF' : currentTheme.textSecondary,
              }}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Nasıl Oynanır?</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:opacity-80 transition-all"
            style={{ color: currentTheme.textMuted }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1">
          {activeTab === 'settings' ? (
            <div className="flex flex-col gap-5">
              {/* Theme Picker Section */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                      <Palette className="w-4 h-4" />
                    </div>
                    <div>
                      <h3
                        className="text-xs font-bold"
                        style={{ color: currentTheme.textPrimary }}
                      >
                        Renk Temaları
                      </h3>
                      <p
                        className="text-[10px]"
                        style={{ color: currentTheme.textMuted }}
                      >
                        Açık ve koyu olmak üzere 8 zengin tema
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
                    style={{
                      backgroundColor: currentTheme.isDark ? '#1E293B' : '#FEF3C7',
                      color: currentTheme.isDark ? '#38BDF8' : '#B45309',
                      border: `1px solid ${currentTheme.cardBorder}`,
                    }}
                  >
                    {currentTheme.badge}
                  </span>
                </div>

                {/* Theme Grid */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {THEME_LIST.map((th) => {
                    const isActive = (progress.settings.theme || 'sand') === th.id;

                    return (
                      <button
                        key={th.id}
                        type="button"
                        onClick={() => {
                          soundManager.playSelect();
                          onUpdateSettings({
                            ...progress.settings,
                            theme: th.id,
                          });
                        }}
                        style={{
                          backgroundColor: th.previewBg,
                          borderColor: isActive ? th.previewAccent : th.cardBorder,
                        }}
                        className={`relative p-2.5 rounded-2xl border text-left transition-all duration-150 flex flex-col justify-between min-h-[76px] cursor-pointer hover:scale-[1.02] active:scale-98 ${
                          isActive
                            ? 'ring-2 ring-offset-1 shadow-md'
                            : 'hover:shadow-xs opacity-90 hover:opacity-100'
                        }`}
                      >
                        {/* Swatch & Badge */}
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="w-3.5 h-3.5 rounded-full border shadow-xs"
                              style={{
                                backgroundColor: th.previewAccent,
                                borderColor: th.cardBorder,
                              }}
                            />
                            <span
                              className="w-2.5 h-2.5 rounded-full border shadow-xs -ml-1"
                              style={{
                                backgroundColor: th.previewCard,
                                borderColor: th.cardBorder,
                              }}
                            />
                          </div>

                          <span
                            className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md leading-none"
                            style={{
                              backgroundColor: th.isDark ? '#334155' : '#E2E8F0',
                              color: th.isDark ? '#F8FAFC' : '#1E293B',
                            }}
                          >
                            {th.badge}
                          </span>
                        </div>

                        {/* Title & Active check */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="min-w-0 pr-1">
                            <span
                              className="text-xs font-bold block truncate"
                              style={{ color: th.textPrimary }}
                            >
                              {th.name}
                            </span>
                            <span
                              className="text-[9px] block truncate opacity-75"
                              style={{ color: th.textMuted }}
                            >
                              {th.tagline}
                            </span>
                          </div>

                          {isActive && (
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 shadow-xs"
                              style={{
                                backgroundColor: th.previewAccent,
                                color: '#FFFFFF',
                              }}
                            >
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Toggles Group */}
              <div className="flex flex-col gap-2.5 pt-2 border-t" style={{ borderColor: currentTheme.cardBorder }}>
                {/* Sound Toggle */}
                <div
                  className="flex items-center justify-between p-3 rounded-2xl border"
                  style={{
                    backgroundColor: currentTheme.headerBg,
                    borderColor: currentTheme.cardBorder,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                      {progress.settings.sound ? (
                        <Volume2 className="w-5 h-5" />
                      ) : (
                        <VolumeX className="w-5 h-5 opacity-40" />
                      )}
                    </div>
                    <div>
                      <span
                        className="text-xs font-bold block"
                        style={{ color: currentTheme.textPrimary }}
                      >
                        Ses Efektleri
                      </span>
                      <span
                        className="text-[10px]"
                        style={{ color: currentTheme.textMuted }}
                      >
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
                      progress.settings.sound ? 'bg-amber-600' : 'bg-stone-400/40'
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
                <div
                  className="flex items-center justify-between p-3 rounded-2xl border"
                  style={{
                    backgroundColor: currentTheme.headerBg,
                    borderColor: currentTheme.cardBorder,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <span
                        className="text-xs font-bold block"
                        style={{ color: currentTheme.textPrimary }}
                      >
                        Dokunsal Titreşim
                      </span>
                      <span
                        className="text-[10px]"
                        style={{ color: currentTheme.textMuted }}
                      >
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
                      progress.settings.vibration ? 'bg-indigo-600' : 'bg-stone-400/40'
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
                <div
                  className="flex items-center justify-between p-3 rounded-2xl border"
                  style={{
                    backgroundColor: currentTheme.headerBg,
                    borderColor: currentTheme.cardBorder,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <Eye className="w-5 h-5" />
                    </div>
                    <div>
                      <span
                        className="text-xs font-bold block"
                        style={{ color: currentTheme.textPrimary }}
                      >
                        Yüksek Karşıtlık
                      </span>
                      <span
                        className="text-[10px]"
                        style={{ color: currentTheme.textMuted }}
                      >
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
                        : 'bg-stone-400/40'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform absolute top-0.5 ${
                        progress.settings.highContrast ? 'right-0.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Reset Progress */}
              <div className="pt-2 border-t" style={{ borderColor: currentTheme.cardBorder }}>
                {!confirmReset ? (
                  <button
                    type="button"
                    onClick={() => setConfirmReset(true)}
                    className="w-full py-2.5 px-3 rounded-xl border border-rose-300/60 text-rose-600 text-xs font-medium hover:bg-rose-500/10 flex items-center justify-center gap-2 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>İlerlemeyi Sıfırla</span>
                  </button>
                ) : (
                  <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-400/40 flex flex-col gap-2">
                    <span className="text-xs font-bold text-rose-600">
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
                        className="flex-1 py-1.5 rounded-lg bg-stone-300 text-stone-800 text-xs font-medium hover:bg-stone-400"
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
            <div className="flex flex-col gap-4 text-xs leading-relaxed">
              <div
                className="p-3.5 rounded-2xl border"
                style={{
                  backgroundColor: currentTheme.isDark ? '#2E2012' : '#FEF3C7',
                  borderColor: currentTheme.isDark ? '#78350F' : '#FDE68A',
                  color: currentTheme.isDark ? '#FDE68A' : '#78350F',
                }}
              >
                <h4 className="font-bold mb-1">
                  Temel Mantık Kuralları
                </h4>
                <p className="text-[11px]">
                  Her satırda, her sütunda ve her <strong>3x3 kare bölgede</strong> her
                  sembol yalnızca <strong>1 kez</strong> bulunabilir. Merdiven veya düzensiz bölmeler yoktur; klasik Sudoku kareleri kullanılır.
                </p>
              </div>

              <div
                className="p-3.5 rounded-2xl border"
                style={{
                  backgroundColor: currentTheme.isDark ? '#063022' : '#ECFDF5',
                  borderColor: currentTheme.isDark ? '#065F46' : '#A7F3D0',
                  color: currentTheme.isDark ? '#A7F3D0' : '#065F46',
                }}
              >
                <h4 className="font-bold mb-1">
                  “İz” Sistemi & Gizli Tablolar
                </h4>
                <p className="text-[11px]">
                  Doğru yerleştirdiğiniz her sembol benzersiz bir iz parçacığı
                  bırakır. Bir satır, sütun veya bölgeyi tamamladığınızda izler
                  birleşir ve bölümün arkasındaki <strong>gizli tabloyu</strong> parça
                  parça açığa çıkarır!
                </p>
              </div>

              <div>
                <h4
                  className="font-bold mb-2"
                  style={{ color: currentTheme.textPrimary }}
                >
                  9 Doğal Sembol
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {Object.values(SYMBOLS).map((sym) => (
                    <div
                      key={sym.id}
                      className="flex items-center gap-3 p-2 rounded-xl border"
                      style={{
                        backgroundColor: currentTheme.headerBg,
                        borderColor: currentTheme.cardBorder,
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: currentTheme.cardBg }}
                      >
                        <SymbolIcon symbolId={sym.id} size={22} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span
                            className="font-bold"
                            style={{ color: currentTheme.textPrimary }}
                          >
                            {sym.trName}
                          </span>
                          <span
                            className="text-[10px]"
                            style={{ color: currentTheme.textMuted }}
                          >
                            {sym.traceType}
                          </span>
                        </div>
                        <p
                          className="text-[10px] truncate"
                          style={{ color: currentTheme.textSecondary }}
                        >
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
