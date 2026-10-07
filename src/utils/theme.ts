import { ThemeId } from '../types/game';

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  tagline: string;
  badge: 'AÇIK' | 'KOYU';
  isDark: boolean;
  previewBg: string;
  previewCard: string;
  previewAccent: string;
  
  // App & Screen backgrounds
  appBg: string;
  headerBg: string;
  headerBorder: string;
  cardBg: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;

  // Sudoku Board colors
  boardOuterBg: string;
  boardOuterBorder: string;
  boardInnerBg: string;
  cellDefaultBg: string;
  cellInitialBg: string;
  cellRelatedBg: string;
  cellSelectedBg: string;
  cellSelectedRing: string;
  cellMatchingBg: string;
  cellMatchingRing: string;
  cellErrorBg: string;
  cellBorderThin: string;
  cellBorderThick: string;
  cellEmptyDot: string;

  // Symbol Tray
  trayBg: string;
  trayBorder: string;
  trayBtnBg: string;
  trayBtnBorder: string;
  trayBtnText: string;
  trayActiveRing: string;

  // Primary buttons & accents
  btnPrimaryBg: string;
  btnPrimaryText: string;
  btnSecondaryBg: string;
  btnSecondaryBorder: string;
  btnSecondaryText: string;
}

export const THEMES: Record<ThemeId, ThemeDefinition> = {
  sand: {
    id: 'sand',
    name: 'Klasik Parşömen',
    tagline: 'Varsayılan doğal parşömen ve sıcak kum tonları',
    badge: 'AÇIK',
    isDark: false,
    previewBg: '#FAF7F2',
    previewCard: '#EFE9DF',
    previewAccent: '#D97706',

    appBg: '#FAF7F2',
    headerBg: '#FAF7F2',
    headerBorder: '#E5DDD0',
    cardBg: '#EFE9DF',
    cardBorder: '#E0D7C7',
    textPrimary: '#1C1917',
    textSecondary: '#44403C',
    textMuted: '#78716C',

    boardOuterBg: '#EFE9DF',
    boardOuterBorder: '#DDD5C7',
    boardInnerBg: '#FAF7F2',
    cellDefaultBg: '#FCFBF8',
    cellInitialBg: '#F5EFE6',
    cellRelatedBg: '#F4ECE0',
    cellSelectedBg: '#FEF3C7',
    cellSelectedRing: '#F59E0B',
    cellMatchingBg: '#ECFDF5',
    cellMatchingRing: '#10B981',
    cellErrorBg: '#FFE4E6',
    cellBorderThin: '#E6DFD3',
    cellBorderThick: '#8C8275',
    cellEmptyDot: '#C4BCB0',

    trayBg: '#FAF7F2',
    trayBorder: '#E5DDD0',
    trayBtnBg: '#FFFFFF',
    trayBtnBorder: '#E0D7C7',
    trayBtnText: '#44403C',
    trayActiveRing: '#F59E0B',

    btnPrimaryBg: '#D97706',
    btnPrimaryText: '#FFFFFF',
    btnSecondaryBg: '#EFE9DF',
    btnSecondaryBorder: '#E0D7C7',
    btnSecondaryText: '#44403C',
  },

  dark: {
    id: 'dark',
    name: 'Gece Göğü (Koyu)',
    tagline: 'Gözü dinlendiren koyu obsidian ve gece modı',
    badge: 'KOYU',
    isDark: true,
    previewBg: '#0F172A',
    previewCard: '#1E293B',
    previewAccent: '#38BDF8',

    appBg: '#0F172A',
    headerBg: '#0F172A',
    headerBorder: '#334155',
    cardBg: '#1E293B',
    cardBorder: '#334155',
    textPrimary: '#F8FAFC',
    textSecondary: '#CBD5E1',
    textMuted: '#94A3B8',

    boardOuterBg: '#1E293B',
    boardOuterBorder: '#334155',
    boardInnerBg: '#0F172A',
    cellDefaultBg: '#172033',
    cellInitialBg: '#232F46',
    cellRelatedBg: '#1E3250',
    cellSelectedBg: '#075985',
    cellSelectedRing: '#38BDF8',
    cellMatchingBg: '#064E3B',
    cellMatchingRing: '#34D399',
    cellErrorBg: '#881337',
    cellBorderThin: '#2A374F',
    cellBorderThick: '#64748B',
    cellEmptyDot: '#475569',

    trayBg: '#0F172A',
    trayBorder: '#334155',
    trayBtnBg: '#1E293B',
    trayBtnBorder: '#334155',
    trayBtnText: '#E2E8F0',
    trayActiveRing: '#38BDF8',

    btnPrimaryBg: '#0284C7',
    btnPrimaryText: '#FFFFFF',
    btnSecondaryBg: '#1E293B',
    btnSecondaryBorder: '#334155',
    btnSecondaryText: '#E2E8F0',
  },

  porcelain: {
    id: 'porcelain',
    name: 'Porselen Beyazı (Açık)',
    tagline: 'Sade, net ve ferah pürüzsüz beyaz tasarım',
    badge: 'AÇIK',
    isDark: false,
    previewBg: '#FFFFFF',
    previewCard: '#F8FAFC',
    previewAccent: '#2563EB',

    appBg: '#FFFFFF',
    headerBg: '#FFFFFF',
    headerBorder: '#E2E8F0',
    cardBg: '#F8FAFC',
    cardBorder: '#E2E8F0',
    textPrimary: '#0F172A',
    textSecondary: '#334155',
    textMuted: '#64748B',

    boardOuterBg: '#F1F5F9',
    boardOuterBorder: '#CBD5E1',
    boardInnerBg: '#FFFFFF',
    cellDefaultBg: '#FFFFFF',
    cellInitialBg: '#F8FAFC',
    cellRelatedBg: '#F1F5F9',
    cellSelectedBg: '#DBEAFE',
    cellSelectedRing: '#2563EB',
    cellMatchingBg: '#DCFCE7',
    cellMatchingRing: '#16A34A',
    cellErrorBg: '#FEE2E2',
    cellBorderThin: '#E2E8F0',
    cellBorderThick: '#64748B',
    cellEmptyDot: '#CBD5E1',

    trayBg: '#FFFFFF',
    trayBorder: '#E2E8F0',
    trayBtnBg: '#F8FAFC',
    trayBtnBorder: '#CBD5E1',
    trayBtnText: '#1E293B',
    trayActiveRing: '#2563EB',

    btnPrimaryBg: '#2563EB',
    btnPrimaryText: '#FFFFFF',
    btnSecondaryBg: '#F1F5F9',
    btnSecondaryBorder: '#CBD5E1',
    btnSecondaryText: '#0F172A',
  },

  forest: {
    id: 'forest',
    name: 'Zümrüt Ormanı',
    tagline: 'Huzur veren koyu çam ormanı ve zümrüt esintisi',
    badge: 'KOYU',
    isDark: true,
    previewBg: '#062017',
    previewCard: '#0E3326',
    previewAccent: '#10B981',

    appBg: '#062017',
    headerBg: '#062017',
    headerBorder: '#164E3D',
    cardBg: '#0E3326',
    cardBorder: '#164E3D',
    textPrimary: '#ECFDF5',
    textSecondary: '#A7F3D0',
    textMuted: '#6EE7B7',

    boardOuterBg: '#0B291F',
    boardOuterBorder: '#175643',
    boardInnerBg: '#062017',
    cellDefaultBg: '#0A2D21',
    cellInitialBg: '#133E30',
    cellRelatedBg: '#114B3A',
    cellSelectedBg: '#047857',
    cellSelectedRing: '#34D399',
    cellMatchingBg: '#065F46',
    cellMatchingRing: '#6EE7B7',
    cellErrorBg: '#881337',
    cellBorderThin: '#174A3A',
    cellBorderThick: '#2DD4BF',
    cellEmptyDot: '#1E6852',

    trayBg: '#062017',
    trayBorder: '#164E3D',
    trayBtnBg: '#0E3326',
    trayBtnBorder: '#175643',
    trayBtnText: '#ECFDF5',
    trayActiveRing: '#10B981',

    btnPrimaryBg: '#059669',
    btnPrimaryText: '#FFFFFF',
    btnSecondaryBg: '#0E3326',
    btnSecondaryBorder: '#164E3D',
    btnSecondaryText: '#A7F3D0',
  },

  cosmic: {
    id: 'cosmic',
    name: 'Kozmik Gece',
    tagline: 'Derin galaksi moru ve yıldızlı gökyüzü',
    badge: 'KOYU',
    isDark: true,
    previewBg: '#130B24',
    previewCard: '#22143D',
    previewAccent: '#A855F7',

    appBg: '#130B24',
    headerBg: '#130B24',
    headerBorder: '#3B2464',
    cardBg: '#22143D',
    cardBorder: '#3B2464',
    textPrimary: '#FAF5FF',
    textSecondary: '#E9D5FF',
    textMuted: '#C084FC',

    boardOuterBg: '#1E1236',
    boardOuterBorder: '#3E256C',
    boardInnerBg: '#130B24',
    cellDefaultBg: '#1D1135',
    cellInitialBg: '#2B1A4E',
    cellRelatedBg: '#29174B',
    cellSelectedBg: '#581C87',
    cellSelectedRing: '#C084FC',
    cellMatchingBg: '#3B0764',
    cellMatchingRing: '#D8B4FE',
    cellErrorBg: '#881337',
    cellBorderThin: '#2D1B50',
    cellBorderThick: '#9333EA',
    cellEmptyDot: '#4C2882',

    trayBg: '#130B24',
    trayBorder: '#3B2464',
    trayBtnBg: '#22143D',
    trayBtnBorder: '#3E256C',
    trayBtnText: '#FAF5FF',
    trayActiveRing: '#A855F7',

    btnPrimaryBg: '#9333EA',
    btnPrimaryText: '#FFFFFF',
    btnSecondaryBg: '#22143D',
    btnSecondaryBorder: '#3B2464',
    btnSecondaryText: '#E9D5FF',
  },

  ocean: {
    id: 'ocean',
    name: 'Derin Okyanus',
    tagline: 'Derin deniz mavisi ve safir dalgalar',
    badge: 'KOYU',
    isDark: true,
    previewBg: '#0A192F',
    previewCard: '#112A45',
    previewAccent: '#38BDF8',

    appBg: '#0A192F',
    headerBg: '#0A192F',
    headerBorder: '#1E3E62',
    cardBg: '#112A45',
    cardBorder: '#1E3E62',
    textPrimary: '#F0F9FF',
    textSecondary: '#BAE6FD',
    textMuted: '#7DD3FC',

    boardOuterBg: '#0D213D',
    boardOuterBorder: '#1C4570',
    boardInnerBg: '#0A192F',
    cellDefaultBg: '#0F2644',
    cellInitialBg: '#183B64',
    cellRelatedBg: '#163860',
    cellSelectedBg: '#0369A1',
    cellSelectedRing: '#38BDF8',
    cellMatchingBg: '#0C4A6E',
    cellMatchingRing: '#7DD3FC',
    cellErrorBg: '#881337',
    cellBorderThin: '#193B63',
    cellBorderThick: '#0284C7',
    cellEmptyDot: '#23538A',

    trayBg: '#0A192F',
    trayBorder: '#1E3E62',
    trayBtnBg: '#112A45',
    trayBtnBorder: '#1C4570',
    trayBtnText: '#F0F9FF',
    trayActiveRing: '#38BDF8',

    btnPrimaryBg: '#0284C7',
    btnPrimaryText: '#FFFFFF',
    btnSecondaryBg: '#112A45',
    btnSecondaryBorder: '#1E3E62',
    btnSecondaryText: '#BAE6FD',
  },

  sunset: {
    id: 'sunset',
    name: 'Gün Batımı (Amber)',
    tagline: 'Sıcak akşam kızıllığı, amber ve terakota tonları',
    badge: 'AÇIK',
    isDark: false,
    previewBg: '#FFF7ED',
    previewCard: '#FFEDD5',
    previewAccent: '#EA580C',

    appBg: '#FFF7ED',
    headerBg: '#FFF7ED',
    headerBorder: '#FED7AA',
    cardBg: '#FFEDD5',
    cardBorder: '#FDBA74',
    textPrimary: '#431407',
    textSecondary: '#7C2D12',
    textMuted: '#9A3412',

    boardOuterBg: '#FED7AA',
    boardOuterBorder: '#FDBA74',
    boardInnerBg: '#FFF7ED',
    cellDefaultBg: '#FFFAF0',
    cellInitialBg: '#FFEDD5',
    cellRelatedBg: '#FEEFD8',
    cellSelectedBg: '#FED7AA',
    cellSelectedRing: '#EA580C',
    cellMatchingBg: '#FEF3C7',
    cellMatchingRing: '#F59E0B',
    cellErrorBg: '#FFE4E6',
    cellBorderThin: '#FDD8B3',
    cellBorderThick: '#C2410C',
    cellEmptyDot: '#FDBA74',

    trayBg: '#FFF7ED',
    trayBorder: '#FED7AA',
    trayBtnBg: '#FFFAF0',
    trayBtnBorder: '#FDBA74',
    trayBtnText: '#7C2D12',
    trayActiveRing: '#EA580C',

    btnPrimaryBg: '#EA580C',
    btnPrimaryText: '#FFFFFF',
    btnSecondaryBg: '#FFEDD5',
    btnSecondaryBorder: '#FDBA74',
    btnSecondaryText: '#7C2D12',
  },

  bamboo: {
    id: 'bamboo',
    name: 'Bambu & Çay',
    tagline: 'Dingin matcha çayı, adaçayı ve doğal bambu huzuru',
    badge: 'AÇIK',
    isDark: false,
    previewBg: '#F4F7F4',
    previewCard: '#E5EBE5',
    previewAccent: '#4D7C0F',

    appBg: '#F4F7F4',
    headerBg: '#F4F7F4',
    headerBorder: '#D1DDD1',
    cardBg: '#E5EBE5',
    cardBorder: '#CBD5CB',
    textPrimary: '#1E291E',
    textSecondary: '#3F4E3F',
    textMuted: '#5F735F',

    boardOuterBg: '#E1E9E1',
    boardOuterBorder: '#C2D1C2',
    boardInnerBg: '#F4F7F4',
    cellDefaultBg: '#FAFBF9',
    cellInitialBg: '#EAF0EA',
    cellRelatedBg: '#E2EAE2',
    cellSelectedBg: '#DCFCE7',
    cellSelectedRing: '#16A34A',
    cellMatchingBg: '#ECFCCB',
    cellMatchingRing: '#65A30D',
    cellErrorBg: '#FFE4E6',
    cellBorderThin: '#D6E2D6',
    cellBorderThick: '#4D7C0F',
    cellEmptyDot: '#B5C4B5',

    trayBg: '#F4F7F4',
    trayBorder: '#D1DDD1',
    trayBtnBg: '#FAFBF9',
    trayBtnBorder: '#CBD5CB',
    trayBtnText: '#3F4E3F',
    trayActiveRing: '#4D7C0F',

    btnPrimaryBg: '#4D7C0F',
    btnPrimaryText: '#FFFFFF',
    btnSecondaryBg: '#E5EBE5',
    btnSecondaryBorder: '#CBD5CB',
    btnSecondaryText: '#1E291E',
  },
};

export const THEME_LIST: ThemeDefinition[] = [
  THEMES.sand,
  THEMES.dark,
  THEMES.porcelain,
  THEMES.forest,
  THEMES.cosmic,
  THEMES.ocean,
  THEMES.sunset,
  THEMES.bamboo,
];

export function getTheme(themeId?: ThemeId): ThemeDefinition {
  if (themeId && THEMES[themeId]) {
    return THEMES[themeId];
  }
  return THEMES.sand;
}
