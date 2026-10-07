import React from 'react';
import { SYMBOLS } from '../types/game';

interface SymbolIconProps {
  symbolId: number;
  size?: number | string;
  className?: string;
  showShadow?: boolean;
}

export const SymbolIcon: React.FC<SymbolIconProps> = ({
  symbolId,
  size = 28,
  className = '',
  showShadow = true,
}) => {
  const symbol = SYMBOLS[symbolId];
  if (!symbol) return null;

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
      }}
      title={`${symbol.trName} (${symbol.name})`}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{
          filter: showShadow ? 'drop-shadow(0px 2px 3px rgba(0,0,0,0.12))' : 'none',
        }}
      >
        <defs>
          {/* Sprout Gradients */}
          <linearGradient id={`grad-sprout-${symbolId}`} x1="8" y1="40" x2="40" y2="8" gradientUnits="userSpaceOnUse">
            <stop stopColor="#15803D" />
            <stop offset="0.6" stopColor="#22C55E" />
            <stop offset="1" stopColor="#86EFAC" />
          </linearGradient>

          {/* Leaf Gradients */}
          <linearGradient id={`grad-leaf-${symbolId}`} x1="12" y1="36" x2="36" y2="8" gradientUnits="userSpaceOnUse">
            <stop stopColor="#047857" />
            <stop offset="0.7" stopColor="#10B981" />
            <stop offset="1" stopColor="#6EE7B7" />
          </linearGradient>

          {/* Water Drop Gradients */}
          <linearGradient id={`grad-water-${symbolId}`} x1="24" y1="6" x2="24" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38BDF8" />
            <stop offset="0.6" stopColor="#0284C7" />
            <stop offset="1" stopColor="#0369A1" />
          </linearGradient>

          {/* Sun Gradients */}
          <linearGradient id={`grad-sun-core-${symbolId}`} x1="16" y1="16" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBBF24" />
            <stop offset="1" stopColor="#EA580C" />
          </linearGradient>
          <linearGradient id={`grad-sun-rays-${symbolId}`} x1="24" y1="4" x2="24" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" />
            <stop offset="1" stopColor="#D97706" />
          </linearGradient>

          {/* Moon Gradients */}
          <linearGradient id={`grad-moon-${symbolId}`} x1="10" y1="8" x2="38" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#818CF8" />
            <stop offset="0.6" stopColor="#6366F1" />
            <stop offset="1" stopColor="#4338CA" />
          </linearGradient>

          {/* Spark Gradients */}
          <linearGradient id={`grad-spark-${symbolId}`} x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE047" />
            <stop offset="0.4" stopColor="#F59E0B" />
            <stop offset="1" stopColor="#B45309" />
          </linearGradient>

          {/* Crystal Gradients */}
          <linearGradient id={`grad-crystal-main-${symbolId}`} x1="14" y1="8" x2="34" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C084FC" />
            <stop offset="0.5" stopColor="#9333EA" />
            <stop offset="1" stopColor="#6B21A8" />
          </linearGradient>
          <linearGradient id={`grad-crystal-top-${symbolId}`} x1="16" y1="8" x2="32" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F3E8FF" />
            <stop offset="1" stopColor="#D8B4FE" />
          </linearGradient>

          {/* Spiral Gradients */}
          <linearGradient id={`grad-spiral-${symbolId}`} x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2DD4BF" />
            <stop offset="0.5" stopColor="#0D9488" />
            <stop offset="1" stopColor="#115E59" />
          </linearGradient>

          {/* Light Star Gradients */}
          <linearGradient id={`grad-star-${symbolId}`} x1="24" y1="4" x2="24" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDA4AF" />
            <stop offset="0.5" stopColor="#E11D48" />
            <stop offset="1" stopColor="#9F1239" />
          </linearGradient>
        </defs>

        {/* 1. SPROUT */}
        {symbolId === 1 && (
          <g>
            {/* Ground pebble/base */}
            <ellipse cx="24" cy="41" rx="8" ry="2.5" fill="#15803D" opacity="0.35" />
            {/* Main stem */}
            <path
              d="M23 40C23 32 20 25 24 18"
              stroke={`url(#grad-sprout-${symbolId})`}
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Left budding leaf */}
            <path
              d="M22 26C15 25 11 20 12 14C18 14 23 18 22 26Z"
              fill={`url(#grad-sprout-${symbolId})`}
            />
            {/* Right budding leaf */}
            <path
              d="M24 20C32 18 36 12 34 7C28 8 24 13 24 20Z"
              fill={`url(#grad-sprout-${symbolId})`}
            />
            {/* Center top budding bead */}
            <circle cx="24" cy="18" r="2.2" fill="#BBF7D0" />
            <path
              d="M14 17C16 16 19 18 21 23"
              stroke="#DCFCE7"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.8"
            />
          </g>
        )}

        {/* 2. LEAF */}
        {symbolId === 2 && (
          <g>
            {/* Main curved leaf body */}
            <path
              d="M12 37C11 25 18 13 36 9C34 27 24 38 12 37Z"
              fill={`url(#grad-leaf-${symbolId})`}
            />
            {/* Leaf stem and central vein */}
            <path
              d="M10 40C12 36 15 31 22 25C27 21 31 16 35 10"
              stroke="#A7F3D0"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Side veins */}
            <path
              d="M18 28C15 27 13 25 13 25"
              stroke="#A7F3D0"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M22 25C24 22 27 20 27 20"
              stroke="#A7F3D0"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M26 21C24 19 21 18 21 18"
              stroke="#A7F3D0"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.9"
            />
            {/* Specular highlight */}
            <path
              d="M20 18C26 15 31 13 33 11"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>
        )}

        {/* 3. WATER DROP */}
        {symbolId === 3 && (
          <g>
            {/* Plump tear drop body */}
            <path
              d="M24 7C24 7 12 21 12 29C12 35.6 17.4 41 24 41C30.6 41 36 35.6 36 29C36 21 24 7 24 7Z"
              fill={`url(#grad-water-${symbolId})`}
            />
            {/* Soft inner depth */}
            <ellipse cx="24" cy="35" rx="8" ry="3.5" fill="#075985" opacity="0.3" />
            {/* Primary specular reflection arc */}
            <path
              d="M17 25C16 28 17 33 19 36"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Top tiny sparkle */}
            <circle cx="21" cy="20" r="1.5" fill="#FFFFFF" opacity="0.9" />
          </g>
        )}

        {/* 4. SUN */}
        {symbolId === 4 && (
          <g>
            {/* 8 Geometric Solar Rays */}
            <g stroke={`url(#grad-sun-rays-${symbolId})`} strokeWidth="3" strokeLinecap="round">
              <line x1="24" y1="5" x2="24" y2="10" />
              <line x1="24" y1="38" x2="24" y2="43" />
              <line x1="5" y1="24" x2="10" y2="24" />
              <line x1="38" y1="24" x2="43" y2="24" />
              <line x1="10.5" y1="10.5" x2="14" y2="14" />
              <line x1="34" y1="34" x2="37.5" y2="37.5" />
              <line x1="10.5" y1="37.5" x2="14" y2="34" />
              <line x1="34" y1="14" x2="37.5" y2="10.5" />
            </g>
            {/* Glowing outer halo */}
            <circle cx="24" cy="24" r="13" fill="#FDE047" opacity="0.25" />
            {/* Central Sun Disc */}
            <circle cx="24" cy="24" r="10.5" fill={`url(#grad-sun-core-${symbolId})`} />
            {/* Inner radiant highlight */}
            <circle cx="21" cy="21" r="4" fill="#FEF08A" opacity="0.6" />
          </g>
        )}

        {/* 5. MOON */}
        {symbolId === 5 && (
          <g>
            {/* Crescent Moon */}
            <path
              d="M30 9C23 11 16 18 16 26C16 34 23 40 31 40C34 40 36 39 38 37C32 37 26 33 26 25C26 17 31 11 36 9C34 9 32 9 30 9Z"
              fill={`url(#grad-moon-${symbolId})`}
            />
            {/* Subtle crater / texture accents */}
            <circle cx="22" cy="23" r="2" fill="#4338CA" opacity="0.4" />
            <circle cx="25" cy="30" r="1.5" fill="#4338CA" opacity="0.3" />
            {/* Accompanying Celestial Starlet */}
            <path
              d="M13 14L14 11L15 14L18 15L15 16L14 19L13 16L10 15L13 14Z"
              fill="#E0E7FF"
            />
            {/* Edge glow */}
            <path
              d="M19 19C17 23 17 28 20 33"
              stroke="#EEF2FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.65"
            />
          </g>
        )}

        {/* 6. SPARK */}
        {symbolId === 6 && (
          <g>
            {/* Angular 4-point electric spark shape */}
            <path
              d="M24 5L27 18L40 21L29 27L32 41L21 32L10 39L15 25L5 20L19 18L24 5Z"
              fill={`url(#grad-spark-${symbolId})`}
            />
            {/* Inner electric burst */}
            <path
              d="M24 13L26 21L33 23L27 26L29 34L22 28L15 32L18 24L12 21L20 20L24 13Z"
              fill="#FEF08A"
              opacity="0.8"
            />
            {/* Center hot spark */}
            <circle cx="24" cy="23.5" r="2.5" fill="#FFFFFF" />
          </g>
        )}

        {/* 7. CRYSTAL */}
        {symbolId === 7 && (
          <g>
            {/* Gem Base & Lower Facets */}
            <path d="M12 20L24 41L36 20H12Z" fill={`url(#grad-crystal-main-${symbolId})`} />
            <path d="M12 20L24 41L24 20H12Z" fill="#7E22CE" opacity="0.4" />
            <path d="M24 20L24 41L36 20H24Z" fill="#A855F7" opacity="0.4" />
            
            {/* Upper Table & Crown Facets */}
            <path d="M18 9H30L36 20H12L18 9Z" fill={`url(#grad-crystal-top-${symbolId})`} />
            <polygon points="18,9 24,9 24,20 12,20" fill="#E9D5FF" opacity="0.8" />
            <polygon points="24,9 30,9 36,20 24,20" fill="#C084FC" opacity="0.9" />
            <polygon points="20,9 28,9 26,14 22,14" fill="#FFFFFF" opacity="0.95" />
            
            {/* Crisp facet borders */}
            <path
              d="M18 9L12 20L24 41L36 20L30 9H18Z M12 20H36 M18 9L24 20L30 9 M24 20V41"
              stroke="#F3E8FF"
              strokeWidth="1.2"
              strokeLinejoin="round"
              opacity="0.75"
            />
          </g>
        )}

        {/* 8. SPIRAL */}
        {symbolId === 8 && (
          <g>
            {/* Smooth Nautilus Spiral curve */}
            <path
              d="M24 24C22.3 24 21 22.7 21 21C21 18.8 22.8 17 25 17C28.3 17 31 19.7 31 23C31 27.4 27.4 31 23 31C17.5 31 13 26.5 13 21C13 14.4 18.4 9 25 9C32.7 9 39 15.3 39 23C39 31.8 31.8 39 23 39C13.1 39 5 30.9 5 21"
              stroke={`url(#grad-spiral-${symbolId})`}
              strokeWidth="3.6"
              strokeLinecap="round"
            />
            {/* Inner Pearl Center */}
            <circle cx="23.5" cy="21.5" r="2.2" fill="#CCFBF1" />
            {/* Accent trace beads along path */}
            <circle cx="31" cy="23" r="1.4" fill="#99F6E4" />
            <circle cx="13" cy="21" r="1.4" fill="#99F6E4" />
          </g>
        )}

        {/* 9. LIGHT STAR */}
        {symbolId === 9 && (
          <g>
            {/* Soft radiant diamond glow */}
            <circle cx="24" cy="24" r="15" fill="#FFE4E6" opacity="0.3" />
            {/* Secondary diagonal star points */}
            <path
              d="M24 16L27 21L32 24L27 27L24 32L21 27L16 24L21 21Z"
              fill="#F43F5E"
              opacity="0.65"
            />
            {/* Primary 4-pointed radiant compass star */}
            <path
              d="M24 5C24 16 27 21 38 24C27 27 24 32 24 43C24 32 21 27 10 24C21 21 24 16 24 5Z"
              fill={`url(#grad-star-${symbolId})`}
            />
            {/* Shimmering center core */}
            <circle cx="24" cy="24" r="2.8" fill="#FFF1F2" />
          </g>
        )}
      </svg>
    </div>
  );
};
