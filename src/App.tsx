import { useState, useEffect } from 'react';
import { UserProgress, LevelConfig } from './types/game';
import { getLevelConfig, getDailyLevelConfig } from './utils/levels';
import { HomeScreen } from './components/HomeScreen';
import { JourneyMap } from './components/JourneyMap';
import { GameScreen } from './components/GameScreen';
import { DailyScreen } from './components/DailyScreen';
import { CollectionModal } from './components/CollectionModal';
import { SettingsModal } from './components/SettingsModal';
import { soundManager } from './utils/audio';

type Screen = 'HOME' | 'JOURNEY_MAP' | 'GAME' | 'DAILY';

const STORAGE_KEY = 'iz_doku_user_progress_v1';

const DEFAULT_PROGRESS: UserProgress = {
  unlockedLevel: 1,
  completedLevels: {},
  dailyStreak: 0,
  lastDailyCompletedDate: null,
  settings: {
    sound: true,
    vibration: true,
    highContrast: false,
  },
};

export default function App() {
  // Load progress from LocalStorage
  const [progress, setProgress] = useState<UserProgress>(() => {
    if (typeof window === 'undefined') return DEFAULT_PROGRESS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_PROGRESS,
          ...parsed,
          settings: {
            ...DEFAULT_PROGRESS.settings,
            ...(parsed.settings || {}),
          },
        };
      }
    } catch {
      // ignore
    }
    return DEFAULT_PROGRESS;
  });

  const [currentScreen, setCurrentScreen] = useState<Screen>('HOME');
  const [currentLevelId, setCurrentLevelId] = useState<number>(1);
  const [isDailyActive, setIsDailyActive] = useState<boolean>(false);
  const [showCollection, setShowCollection] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Sync with audio and localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
    soundManager.setSoundEnabled(progress.settings.sound);
    soundManager.setVibrationEnabled(progress.settings.vibration);
  }, [progress]);

  // Apply high-contrast styling class to body if enabled
  useEffect(() => {
    if (progress.settings.highContrast) {
      document.body.classList.add('contrast-125');
    } else {
      document.body.classList.remove('contrast-125');
    }
  }, [progress.settings.highContrast]);

  // Current Level Configuration
  const activeLevelConfig: LevelConfig = isDailyActive
    ? getDailyLevelConfig(new Date().toISOString().split('T')[0])
    : getLevelConfig(currentLevelId);

  // Unlocked Artwork IDs for collection gallery
  const unlockedArtIds = Object.keys(progress.completedLevels).map((lvlStr) => {
    const lvlId = parseInt(lvlStr, 10);
    const cfg = getLevelConfig(lvlId);
    return cfg.hiddenArtId;
  });

  // Handlers
  const handleStartPlay = () => {
    soundManager.playSelect();
    setCurrentLevelId(progress.unlockedLevel);
    setIsDailyActive(false);
    setCurrentScreen('GAME');
  };

  const handleOpenJourneyMap = () => {
    soundManager.playSelect();
    setCurrentScreen('JOURNEY_MAP');
  };

  const handleSelectLevel = (levelId: number) => {
    soundManager.playSelect();
    setCurrentLevelId(levelId);
    setIsDailyActive(false);
    setCurrentScreen('GAME');
  };

  const handleStartDaily = () => {
    soundManager.playSelect();
    setIsDailyActive(true);
    setCurrentScreen('GAME');
  };

  const handleNextLevel = () => {
    if (isDailyActive) {
      setCurrentScreen('DAILY');
      return;
    }
    if (currentLevelId < 100) {
      const nextId = currentLevelId + 1;
      setCurrentLevelId(nextId);
      setProgress((prev) => ({
        ...prev,
        unlockedLevel: Math.max(prev.unlockedLevel, nextId),
      }));
    } else {
      setCurrentScreen('JOURNEY_MAP');
    }
  };

  const handleUpdateProgress = (newProgress: UserProgress) => {
    if (isDailyActive) {
      const todayStr = new Date().toISOString().split('T')[0];
      const prevStreak = progress.dailyStreak;
      const isAlreadyDoneToday = progress.lastDailyCompletedDate === todayStr;

      setProgress({
        ...newProgress,
        dailyStreak: isAlreadyDoneToday ? prevStreak : prevStreak + 1,
        lastDailyCompletedDate: todayStr,
      });
    } else {
      setProgress(newProgress);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-800 antialiased font-sans select-none overflow-x-hidden">
      {/* Screen Router */}
      {currentScreen === 'HOME' && (
        <HomeScreen
          progress={progress}
          onPlay={handleStartPlay}
          onJourneyMap={handleOpenJourneyMap}
          onDaily={() => {
            soundManager.playSelect();
            setCurrentScreen('DAILY');
          }}
          onCollection={() => {
            soundManager.playSelect();
            setShowCollection(true);
          }}
          onSettings={() => {
            soundManager.playSelect();
            setShowSettings(true);
          }}
        />
      )}

      {currentScreen === 'JOURNEY_MAP' && (
        <JourneyMap
          progress={progress}
          onSelectLevel={handleSelectLevel}
          onBack={() => {
            soundManager.playSelect();
            setCurrentScreen('HOME');
          }}
        />
      )}

      {currentScreen === 'DAILY' && (
        <DailyScreen
          progress={progress}
          onStartDaily={handleStartDaily}
          onBack={() => {
            soundManager.playSelect();
            setCurrentScreen('HOME');
          }}
        />
      )}

      {currentScreen === 'GAME' && (
        <GameScreen
          key={`game-${activeLevelConfig.id}-${isDailyActive ? 'daily' : 'journey'}`}
          levelConfig={activeLevelConfig}
          progress={progress}
          onBack={() => {
            soundManager.playSelect();
            if (isDailyActive) {
              setCurrentScreen('DAILY');
            } else {
              setCurrentScreen('JOURNEY_MAP');
            }
          }}
          onNextLevel={handleNextLevel}
          onViewCollection={() => {
            soundManager.playSelect();
            setShowCollection(true);
          }}
          onUpdateProgress={handleUpdateProgress}
          hasNextLevel={!isDailyActive && currentLevelId < 100}
        />
      )}

      {/* Collection Modal */}
      {showCollection && (
        <CollectionModal
          unlockedArtIds={unlockedArtIds}
          onClose={() => setShowCollection(false)}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          progress={progress}
          onUpdateSettings={(settings) =>
            setProgress((prev) => ({ ...prev, settings }))
          }
          onResetProgress={() => {
            setProgress(DEFAULT_PROGRESS);
            setCurrentLevelId(1);
          }}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
