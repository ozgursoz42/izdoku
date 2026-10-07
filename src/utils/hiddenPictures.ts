import { HiddenArt } from '../types/game';

export const HIDDEN_ARTWORKS: Record<string, HiddenArt> = {
  tree: {
    id: 'tree',
    name: 'Ancient Tree',
    trName: 'Kadim Hayat Ağacı',
    category: 'Doğa',
    viewBox: '0 0 200 200',
    accentColor: '#16A34A',
    description: 'Kökleri toprağın derinliklerine, dalları gökyüzüne uzanan bilgelik ağacı.',
    paths: [
      // 0: Trunk and roots
      { id: 't0', d: 'M95 180 C95 150 90 125 85 110 C80 95 90 85 100 85 C110 85 120 95 115 110 C110 125 105 150 105 180 Z', fill: '#78350F', stroke: '#451A03', strokeWidth: 2, order: 0 },
      { id: 't1', d: 'M85 170 C70 175 55 185 45 190', stroke: '#78350F', strokeWidth: 3.5, order: 1 },
      { id: 't2', d: 'M115 170 C130 175 145 185 155 190', stroke: '#78350F', strokeWidth: 3.5, order: 2 },
      // 1: Primary branches
      { id: 't3', d: 'M92 105 C75 90 60 85 45 88', stroke: '#78350F', strokeWidth: 3, order: 3 },
      { id: 't4', d: 'M108 105 C125 90 140 85 155 88', stroke: '#78350F', strokeWidth: 3, order: 4 },
      { id: 't5', d: 'M100 85 C100 65 95 50 85 40', stroke: '#78350F', strokeWidth: 2.5, order: 5 },
      { id: 't6', d: 'M100 85 C105 65 115 50 125 40', stroke: '#78350F', strokeWidth: 2.5, order: 6 },
      // 2: Foliage clusters
      { id: 't7', d: 'M45 88 C30 85 20 70 25 55 C30 40 50 40 60 50 C70 40 90 45 95 60 C90 75 75 85 60 85 C55 88 50 88 45 88 Z', fill: '#15803D', stroke: '#14532D', strokeWidth: 1.5, order: 7 },
      { id: 't8', d: 'M155 88 C170 85 180 70 175 55 C170 40 150 40 140 50 C130 40 110 45 105 60 C110 75 125 85 140 85 C145 88 150 88 155 88 Z', fill: '#16A34A', stroke: '#14532D', strokeWidth: 1.5, order: 8 },
      { id: 't9', d: 'M100 45 C80 40 70 20 85 10 C100 0 115 0 125 12 C135 25 120 45 100 45 Z', fill: '#22C55E', stroke: '#15803D', strokeWidth: 1.5, order: 9 },
      { id: 't10', d: 'M100 70 C75 70 65 50 80 35 C95 20 120 25 125 40 C130 55 120 70 100 70 Z', fill: '#4ADE80', stroke: '#16A34A', strokeWidth: 1.5, order: 10 },
      // 3: Golden fruits/blossoms
      { id: 't11', d: 'M55 60 A4 4 0 1 0 55.1 60', fill: '#FBBF24', stroke: '#F59E0B', strokeWidth: 1.5, order: 11 },
      { id: 't12', d: 'M145 60 A4 4 0 1 0 145.1 60', fill: '#FBBF24', stroke: '#F59E0B', strokeWidth: 1.5, order: 12 },
      { id: 't13', d: 'M100 25 A5 5 0 1 0 100.1 25', fill: '#FDE047', stroke: '#EAB308', strokeWidth: 1.5, order: 13 },
      { id: 't14', d: 'M85 75 A3.5 3.5 0 1 0 85.1 75', fill: '#FBBF24', stroke: '#F59E0B', strokeWidth: 1, order: 14 },
      { id: 't15', d: 'M115 75 A3.5 3.5 0 1 0 115.1 75', fill: '#FBBF24', stroke: '#F59E0B', strokeWidth: 1, order: 15 },
    ],
  },
  flower: {
    id: 'flower',
    name: 'Lotus Blossom',
    trName: 'Saf Nilüfer Çiçeği',
    category: 'Flora',
    viewBox: '0 0 200 200',
    accentColor: '#EC4899',
    description: 'Suların üstünde açan berrak ve kusursuz nilüfer.',
    paths: [
      // Water ripples
      { id: 'fl0', d: 'M20 160 C60 155 140 155 180 160 C140 165 60 165 20 160 Z', fill: '#BAE6FD', stroke: '#0284C7', strokeWidth: 1.5, order: 0 },
      { id: 'fl1', d: 'M40 175 C80 170 120 170 160 175', stroke: '#38BDF8', strokeWidth: 2, order: 1 },
      // Lotus leaves
      { id: 'fl2', d: 'M45 155 C20 145 15 125 40 120 C65 115 75 135 60 150 Z', fill: '#22C55E', stroke: '#15803D', strokeWidth: 1.5, order: 2 },
      { id: 'fl3', d: 'M155 155 C180 145 185 125 160 120 C135 115 125 135 140 150 Z', fill: '#16A34A', stroke: '#15803D', strokeWidth: 1.5, order: 3 },
      // Outer petals
      { id: 'fl4', d: 'M100 150 C60 145 40 110 50 85 C70 95 85 120 100 150 Z', fill: '#F472B6', stroke: '#DB2777', strokeWidth: 1.5, order: 4 },
      { id: 'fl5', d: 'M100 150 C140 145 160 110 150 85 C130 95 115 120 100 150 Z', fill: '#F472B6', stroke: '#DB2777', strokeWidth: 1.5, order: 5 },
      // Mid petals
      { id: 'fl6', d: 'M100 150 C70 135 65 95 75 65 C90 85 95 115 100 150 Z', fill: '#F9A8D4', stroke: '#E11D48', strokeWidth: 1.5, order: 6 },
      { id: 'fl7', d: 'M100 150 C130 135 135 95 125 65 C110 85 105 115 100 150 Z', fill: '#F9A8D4', stroke: '#E11D48', strokeWidth: 1.5, order: 7 },
      // Core petal
      { id: 'fl8', d: 'M100 150 C85 120 85 75 100 45 C115 75 115 120 100 150 Z', fill: '#FDF2F8', stroke: '#F43F5E', strokeWidth: 2, order: 8 },
      // Golden pollen core
      { id: 'fl9', d: 'M92 105 C96 90 104 90 108 105 Z', fill: '#FDE047', stroke: '#CA8A04', strokeWidth: 1.5, order: 9 },
      { id: 'fl10', d: 'M100 80 A3 3 0 1 0 100.1 80', fill: '#EAB308', stroke: '#A16207', strokeWidth: 1, order: 10 },
    ],
  },
  fish: {
    id: 'fish',
    name: 'Golden Koi',
    trName: 'Altın Koi Balığı',
    category: 'Su Yaşamı',
    viewBox: '0 0 200 200',
    accentColor: '#EA580C',
    description: 'Akıntıya karşı yüzen, şans ve sebat getiren zarif balık.',
    paths: [
      // Stream arcs
      { id: 'f0', d: 'M20 50 C60 20 140 20 180 50', stroke: '#BAE6FD', strokeWidth: 2, strokeDasharray: '4 4', order: 0 },
      { id: 'f1', d: 'M10 150 C70 180 150 170 190 140', stroke: '#7DD3FC', strokeWidth: 2.5, order: 1 },
      // Tail fins
      { id: 'f2', d: 'M45 100 C20 70 10 90 15 115 C25 110 35 105 45 100 Z', fill: '#FDBA74', stroke: '#EA580C', strokeWidth: 1.5, order: 2 },
      { id: 'f3', d: 'M45 100 C25 125 20 145 35 140 C42 125 45 115 45 100 Z', fill: '#FB923C', stroke: '#C2410C', strokeWidth: 1.5, order: 3 },
      // Body
      { id: 'f4', d: 'M45 100 C60 70 110 65 145 85 C165 95 168 110 150 115 C115 125 70 125 45 100 Z', fill: '#EA580C', stroke: '#9A3412', strokeWidth: 2, order: 4 },
      // Belly shade
      { id: 'f5', d: 'M55 105 C85 120 125 120 145 110 C130 118 85 116 55 105 Z', fill: '#FED7AA', order: 5 },
      // Side fin
      { id: 'f6', d: 'M115 105 C110 125 95 135 90 130 C95 120 105 110 115 105 Z', fill: '#F97316', stroke: '#C2410C', strokeWidth: 1.5, order: 6 },
      // Dorsal fin
      { id: 'f7', d: 'M90 70 C105 60 125 65 130 75 C115 72 100 70 90 70 Z', fill: '#FB923C', stroke: '#EA580C', strokeWidth: 1.5, order: 7 },
      // Scales pattern
      { id: 'f8', d: 'M85 85 C90 92 88 98 83 100', stroke: '#FFEDD5', strokeWidth: 1.8, strokeLinecap: 'round', order: 8 },
      { id: 'f9', d: 'M105 85 C110 92 108 98 103 100', stroke: '#FFEDD5', strokeWidth: 1.8, strokeLinecap: 'round', order: 9 },
      // Eye & whiskers
      { id: 'f10', d: 'M150 95 A3 3 0 1 0 150.1 95', fill: '#1E293B', stroke: '#FFFFFF', strokeWidth: 1, order: 10 },
      { id: 'f11', d: 'M160 98 C175 100 185 108 190 115', stroke: '#F97316', strokeWidth: 1.5, strokeLinecap: 'round', order: 11 },
    ],
  },
  mountain: {
    id: 'mountain',
    name: 'Sacred Peak',
    trName: 'Kutsal Zirve',
    category: 'Yeryüzü',
    viewBox: '0 0 200 200',
    accentColor: '#6366F1',
    description: 'Bulutların ötesinde parlayan, göğe değen ulu dağ zirvesi.',
    paths: [
      // Sun/Moon behind mountain
      { id: 'm0', d: 'M100 70 A30 30 0 1 0 100.1 70', fill: '#FDE047', stroke: '#F59E0B', strokeWidth: 1.5, order: 0 },
      // Distant clouds
      { id: 'm1', d: 'M20 90 C35 80 55 80 70 90 C85 80 110 80 120 90', stroke: '#E0E7FF', strokeWidth: 2, strokeLinecap: 'round', order: 1 },
      // Back mountain left
      { id: 'm2', d: 'M20 180 L70 90 L120 180 Z', fill: '#475569', stroke: '#1E293B', strokeWidth: 1.5, order: 2 },
      // Back mountain right
      { id: 'm3', d: 'M90 180 L140 100 L190 180 Z', fill: '#64748B', stroke: '#334155', strokeWidth: 1.5, order: 3 },
      // Main Center Mountain
      { id: 'm4', d: 'M40 185 L100 50 L160 185 Z', fill: '#334155', stroke: '#0F172A', strokeWidth: 2, order: 4 },
      // Snow cap
      { id: 'm5', d: 'M100 50 L115 85 L105 80 L100 90 L95 80 L85 85 Z', fill: '#F8FAFC', stroke: '#CBD5E1', strokeWidth: 1.5, order: 5 },
      // Mountain ridge shadow
      { id: 'm6', d: 'M100 50 L102 110 L98 140 L100 185', stroke: '#1E293B', strokeWidth: 2, order: 6 },
      // Alpine trees
      { id: 'm7', d: 'M55 175 L50 160 L58 160 L52 145 L62 145 L57 135 L67 150 L62 165 L70 175 Z', fill: '#166534', order: 7 },
      { id: 'm8', d: 'M140 175 L135 160 L143 160 L137 145 L147 145 L142 135 L152 150 L147 165 L155 175 Z', fill: '#15803D', order: 8 },
      // Foreground mist
      { id: 'm9', d: 'M15 185 C55 175 145 175 185 185', stroke: '#CBD5E1', strokeWidth: 3, strokeLinecap: 'round', order: 9 },
    ],
  },
  butterfly: {
    id: 'butterfly',
    name: 'Celestial Butterfly',
    trName: 'Gökdelen Kelebeği',
    category: 'Gök',
    viewBox: '0 0 200 200',
    accentColor: '#9333EA',
    description: 'Işık ve renk kanatlarıyla süzülen rüya kelebeği.',
    paths: [
      // Top left wing
      { id: 'b0', d: 'M100 100 C70 50 30 40 25 70 C20 100 65 115 100 100 Z', fill: '#A855F7', stroke: '#6B21A8', strokeWidth: 2, order: 0 },
      // Top right wing
      { id: 'b1', d: 'M100 100 C130 50 170 40 175 70 C180 100 135 115 100 100 Z', fill: '#A855F7', stroke: '#6B21A8', strokeWidth: 2, order: 1 },
      // Bottom left wing
      { id: 'b2', d: 'M100 105 C75 115 45 125 50 155 C55 175 85 160 100 120 Z', fill: '#C084FC', stroke: '#7E22CE', strokeWidth: 1.5, order: 2 },
      // Bottom right wing
      { id: 'b3', d: 'M100 105 C125 115 155 125 150 155 C145 175 115 160 100 120 Z', fill: '#C084FC', stroke: '#7E22CE', strokeWidth: 1.5, order: 3 },
      // Wing eyelets/gems
      { id: 'b4', d: 'M45 75 A8 8 0 1 0 45.1 75', fill: '#FDE047', stroke: '#D97706', strokeWidth: 1.5, order: 4 },
      { id: 'b5', d: 'M155 75 A8 8 0 1 0 155.1 75', fill: '#FDE047', stroke: '#D97706', strokeWidth: 1.5, order: 5 },
      { id: 'b6', d: 'M68 145 A5 5 0 1 0 68.1 145', fill: '#67E8F9', stroke: '#0891B2', strokeWidth: 1.2, order: 6 },
      { id: 'b7', d: 'M132 145 A5 5 0 1 0 132.1 145', fill: '#67E8F9', stroke: '#0891B2', strokeWidth: 1.2, order: 7 },
      // Body & head
      { id: 'b8', d: 'M97 75 C97 70 103 70 103 75 L102 135 C102 138 98 138 98 135 Z', fill: '#3B0764', stroke: '#1E1B4B', strokeWidth: 1.5, order: 8 },
      // Antennae
      { id: 'b9', d: 'M98 72 C92 58 78 52 75 55', stroke: '#581C87', strokeWidth: 2, strokeLinecap: 'round', order: 9 },
      { id: 'b10', d: 'M102 72 C108 58 122 52 125 55', stroke: '#581C87', strokeWidth: 2, strokeLinecap: 'round', order: 10 },
      // Antenna tips
      { id: 'b11', d: 'M74 54 A2.5 2.5 0 1 0 74.1 54', fill: '#FDE047', order: 11 },
      { id: 'b12', d: 'M126 54 A2.5 2.5 0 1 0 126.1 54', fill: '#FDE047', order: 12 },
    ],
  },
  house: {
    id: 'house',
    name: 'Forest Cottage',
    trName: 'Orman Kulübesi',
    category: 'Yuva',
    viewBox: '0 0 200 200',
    accentColor: '#D97706',
    description: 'Huzurlu çamların arasında dumanı tüten sıcak dağ evi.',
    paths: [
      // Ground lawn
      { id: 'h0', d: 'M15 175 C60 168 140 168 185 175 C140 185 60 185 15 175 Z', fill: '#15803D', stroke: '#14532D', strokeWidth: 1.5, order: 0 },
      // Chimney smoke swirls
      { id: 'h1', d: 'M135 55 C140 45 135 35 145 25 C150 20 160 20 165 15', stroke: '#CBD5E1', strokeWidth: 2.5, strokeLinecap: 'round', strokeDasharray: '3 3', order: 1 },
      // Chimney
      { id: 'h2', d: 'M130 90 L130 55 L145 55 L145 95 Z', fill: '#B45309', stroke: '#78350F', strokeWidth: 1.5, order: 2 },
      // House walls
      { id: 'h3', d: 'M55 105 L145 105 L145 170 L55 170 Z', fill: '#FEF3C7', stroke: '#78350F', strokeWidth: 2, order: 3 },
      // Timber beams
      { id: 'h4', d: 'M55 135 L145 135', stroke: '#B45309', strokeWidth: 1.5, order: 4 },
      // Roof
      { id: 'h5', d: 'M40 108 L100 48 L160 108 Z', fill: '#B91C1C', stroke: '#7F1D1D', strokeWidth: 2, order: 5 },
      // Roof trim
      { id: 'h6', d: 'M38 108 L100 46 L162 108', stroke: '#FCA5A5', strokeWidth: 2, strokeLinecap: 'round', order: 6 },
      // Door
      { id: 'h7', d: 'M85 170 L85 130 C85 125 100 125 100 130 L100 170 Z', fill: '#78350F', stroke: '#451A03', strokeWidth: 1.5, order: 7 },
      // Door knob
      { id: 'h8', d: 'M96 150 A1.5 1.5 0 1 0 96.1 150', fill: '#FDE047', order: 8 },
      // Glowing Window
      { id: 'h9', d: 'M115 122 L135 122 L135 142 L115 142 Z', fill: '#FEF08A', stroke: '#B45309', strokeWidth: 1.5, order: 9 },
      { id: 'h10', d: 'M125 122 L125 142 M115 132 L135 132', stroke: '#B45309', strokeWidth: 1.2, order: 10 },
      // Garden lantern
      { id: 'h11', d: 'M40 165 L40 150 L46 150 L46 165 Z', fill: '#FDE047', stroke: '#451A03', strokeWidth: 1, order: 11 },
    ],
  },
  star: {
    id: 'star',
    name: 'North Star',
    trName: 'Kutup Feneri',
    category: 'Kozmos',
    viewBox: '0 0 200 200',
    accentColor: '#F59E0B',
    description: 'Gece denizcilerine yol gösteren ebedi parıltı.',
    paths: [
      // Outer halo rings
      { id: 's0', d: 'M100 20 A80 80 0 1 0 100.1 20', stroke: '#FEF3C7', strokeWidth: 1.5, strokeDasharray: '4 6', order: 0 },
      { id: 's1', d: 'M100 45 A55 55 0 1 0 100.1 45', stroke: '#FDE68A', strokeWidth: 1.8, strokeDasharray: '6 4', order: 1 },
      // Minor diagonal rays
      { id: 's2', d: 'M100 100 L60 60', stroke: '#FBBF24', strokeWidth: 3, strokeLinecap: 'round', order: 2 },
      { id: 's3', d: 'M100 100 L140 60', stroke: '#FBBF24', strokeWidth: 3, strokeLinecap: 'round', order: 3 },
      { id: 's4', d: 'M100 100 L60 140', stroke: '#FBBF24', strokeWidth: 3, strokeLinecap: 'round', order: 4 },
      { id: 's5', d: 'M100 100 L140 140', stroke: '#FBBF24', strokeWidth: 3, strokeLinecap: 'round', order: 5 },
      // Major Cardinal Rays
      { id: 's6', d: 'M100 15 L108 85 L185 100 L108 115 L100 185 L92 115 L15 100 L92 85 Z', fill: '#F59E0B', stroke: '#D97706', strokeWidth: 2, order: 6 },
      // Inner star diamond
      { id: 's7', d: 'M100 40 L105 90 L160 100 L105 110 L100 160 L95 110 L40 100 L95 90 Z', fill: '#FDE047', stroke: '#EAB308', strokeWidth: 1.5, order: 7 },
      // Core gem
      { id: 's8', d: 'M100 75 L107 93 L125 100 L107 107 L100 125 L93 107 L75 100 L93 93 Z', fill: '#FFFFFF', stroke: '#FEF08A', strokeWidth: 1.5, order: 8 },
    ],
  },
  moon: {
    id: 'moon',
    name: 'Silver Crescent',
    trName: 'Gümüş Hilal',
    category: 'Gece',
    viewBox: '0 0 200 200',
    accentColor: '#6366F1',
    description: 'Yıldız tozuyla bezenmiş sessiz gece sultanı.',
    paths: [
      // Starry sky background dots
      { id: 'mo0', d: 'M40 45 A2 2 0 1 0 40.1 45', fill: '#E0E7FF', order: 0 },
      { id: 'mo1', d: 'M160 50 A2.5 2.5 0 1 0 160.1 50', fill: '#E0E7FF', order: 1 },
      { id: 'mo2', d: 'M170 140 A2 2 0 1 0 170.1 140', fill: '#E0E7FF', order: 2 },
      { id: 'mo3', d: 'M30 150 A2.5 2.5 0 1 0 30.1 150', fill: '#E0E7FF', order: 3 },
      // Glowing cloud under crescent
      { id: 'mo4', d: 'M35 155 C55 135 110 135 135 155 C155 145 175 160 165 175 C135 185 55 185 35 155 Z', fill: '#312E81', opacity: 0.4, order: 4 },
      // Crescent Moon
      { id: 'mo5', d: 'M130 25 C80 35 50 85 50 125 C50 165 85 185 125 185 C145 185 160 178 165 170 C125 165 95 135 95 95 C95 55 120 32 150 25 C143 25 136 25 130 25 Z', fill: '#818CF8', stroke: '#4338CA', strokeWidth: 2, order: 5 },
      // Craters
      { id: 'mo6', d: 'M85 85 A7 7 0 1 0 85.1 85', fill: '#4F46E5', opacity: 0.5, order: 6 },
      { id: 'mo7', d: 'M80 125 A9 9 0 1 0 80.1 125', fill: '#4F46E5', opacity: 0.5, order: 7 },
      { id: 'mo8', d: 'M105 150 A5 5 0 1 0 105.1 150', fill: '#4F46E5', opacity: 0.5, order: 8 },
      // Hanging star jewel
      { id: 'mo9', d: 'M120 70 L122 62 L124 70 L132 72 L124 74 L122 82 L120 74 L112 72 Z', fill: '#FDE047', stroke: '#EAB308', strokeWidth: 1, order: 9 },
    ],
  },
};

export const ARTWORK_IDS = ['tree', 'flower', 'fish', 'mountain', 'butterfly', 'house', 'star', 'moon'];
