import React, { useEffect, useRef } from 'react';
import { TraceEffect, BoardSize } from '../types/game';
import { SYMBOLS } from '../types/game';

interface TraceOverlayProps {
  boardSize: BoardSize;
  activeTraces: TraceEffect[];
  completedConnections?: unknown[];
  cellSize: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxLife: number;
  life: number;
  color: string;
  type: string;
  rotation?: number;
  rotSpeed?: number;
}

interface ExpandingRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  alpha: number;
}

export const TraceOverlay: React.FC<TraceOverlayProps> = ({
  boardSize,
  activeTraces,
  cellSize,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const ringsRef = useRef<ExpandingRing[]>([]);
  const lastProcessedTraceRef = useRef<Set<string>>(new Set());

  // Handle new trace events (only local particles, NO connecting lines across the board)
  useEffect(() => {
    activeTraces.forEach((trace) => {
      if (lastProcessedTraceRef.current.has(trace.id)) return;
      lastProcessedTraceRef.current.add(trace.id);

      const cx = (trace.col + 0.5) * cellSize;
      const cy = (trace.row + 0.5) * cellSize;
      const symbol = SYMBOLS[trace.symbolId];
      if (!symbol) return;

      const pColor = symbol.themeColor;
      const aColor = symbol.accentColor;

      // Unique local trace behavior per symbol
      switch (symbol.traceType) {
        case 'sprout': {
          // Tiny growing sprouting leaf tendrils
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI * 2 * i) / 6 + (Math.random() - 0.5) * 0.4;
            const speed = 0.7 + Math.random() * 1.0;
            particlesRef.current.push({
              x: cx,
              y: cy,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 0.6,
              size: 2.5 + Math.random() * 2,
              alpha: 1,
              maxLife: 32,
              life: 32,
              color: i % 2 === 0 ? pColor : aColor,
              type: 'sprout_leaf',
              rotation: Math.random() * Math.PI,
              rotSpeed: (Math.random() - 0.5) * 0.1,
            });
          }
          break;
        }

        case 'leaf': {
          // Fluttering soft leaf particles drifting outward
          for (let i = 0; i < 6; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.5 + Math.random() * 1.0;
            particlesRef.current.push({
              x: cx,
              y: cy,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed + 0.2,
              size: 3 + Math.random() * 2,
              alpha: 1,
              maxLife: 36,
              life: 36,
              color: pColor,
              type: 'flutter_leaf',
              rotation: Math.random() * Math.PI,
              rotSpeed: (Math.random() - 0.5) * 0.08,
            });
          }
          break;
        }

        case 'water': {
          // Aqueous expanding ripple rings
          ringsRef.current.push({
            x: cx,
            y: cy,
            radius: 3,
            maxRadius: cellSize * 0.55,
            color: pColor,
            alpha: 0.8,
          });
          break;
        }

        case 'sun': {
          // Radiating sunny beam rays
          for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 * i) / 8;
            const speed = 1.2 + Math.random() * 1.0;
            particlesRef.current.push({
              x: cx,
              y: cy,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: 2 + Math.random() * 1.5,
              alpha: 1,
              maxLife: 26,
              life: 26,
              color: i % 2 === 0 ? pColor : aColor,
              type: 'sun_ray',
            });
          }
          break;
        }

        case 'moon': {
          // Curved luminous stardust trail
          for (let i = 0; i < 7; i++) {
            const t = i / 7;
            const angle = -Math.PI * 0.6 + t * Math.PI * 1.2;
            const r = cellSize * 0.3;
            particlesRef.current.push({
              x: cx + Math.cos(angle) * r,
              y: cy + Math.sin(angle) * r,
              vx: Math.cos(angle + Math.PI / 2) * 0.6,
              vy: Math.sin(angle + Math.PI / 2) * 0.6,
              size: 2,
              alpha: 1,
              maxLife: 32,
              life: 32,
              color: aColor,
              type: 'moon_dust',
            });
          }
          break;
        }

        case 'spark': {
          // Electric crackle sparks
          for (let i = 0; i < 7; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1.6 + Math.random() * 1.8;
            particlesRef.current.push({
              x: cx,
              y: cy,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: 1.8,
              alpha: 1,
              maxLife: 20,
              life: 20,
              color: '#FDE047',
              type: 'electric_spark',
            });
          }
          break;
        }

        case 'crystal': {
          // Faceted geometric shimmer sparkle
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI * 2 * i) / 6;
            const speed = 0.8 + Math.random() * 0.8;
            particlesRef.current.push({
              x: cx,
              y: cy,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: 2.8,
              alpha: 1,
              maxLife: 28,
              life: 28,
              color: aColor,
              type: 'crystal_facet',
              rotation: 0,
              rotSpeed: 0.1,
            });
          }
          break;
        }

        case 'spiral': {
          // Swirling vortex trail
          for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 * i) / 8;
            const dist = (i / 8) * cellSize * 0.3;
            particlesRef.current.push({
              x: cx + Math.cos(angle) * dist,
              y: cy + Math.sin(angle) * dist,
              vx: -Math.sin(angle) * 1.2,
              vy: Math.cos(angle) * 1.2,
              size: 2,
              alpha: 1,
              maxLife: 26,
              life: 26,
              color: pColor,
              type: 'spiral_point',
            });
          }
          break;
        }

        case 'star': {
          // 4-point sparkling star glints
          for (let i = 0; i < 8; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1.0 + Math.random() * 1.2;
            particlesRef.current.push({
              x: cx,
              y: cy,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: 2.8,
              alpha: 1,
              maxLife: 30,
              life: 30,
              color: aColor,
              type: 'star_glint',
            });
          }
          break;
        }
      }
    });
  }, [activeTraces, cellSize]);

  // Continuous animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render expanding water ripples
      ringsRef.current.forEach((ring) => {
        ring.radius += 1.6;
        ring.alpha = Math.max(0, 1 - ring.radius / ring.maxRadius);

        ctx.save();
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color;
        ctx.globalAlpha = ring.alpha;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      });
      ringsRef.current = ringsRef.current.filter((r) => r.alpha > 0.02 && r.radius < r.maxRadius);

      // Render particles
      particlesRef.current.forEach((p) => {
        p.life--;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = Math.max(0, p.life / p.maxLife);
        if (p.rotation !== undefined && p.rotSpeed !== undefined) {
          p.rotation += p.rotSpeed;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        if (p.type === 'sprout_leaf' || p.type === 'flutter_leaf') {
          ctx.translate(p.x, p.y);
          if (p.rotation !== undefined) ctx.rotate(p.rotation);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'crystal_facet') {
          ctx.translate(p.x, p.y);
          if (p.rotation !== undefined) ctx.rotate(p.rotation);
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size, 0);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size, 0);
          ctx.closePath();
          ctx.fill();
        } else if (p.type === 'star_glint') {
          ctx.translate(p.x, p.y);
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.3);
          ctx.lineTo(p.size * 0.3, -p.size * 0.3);
          ctx.lineTo(p.size * 1.3, 0);
          ctx.lineTo(p.size * 0.3, p.size * 0.3);
          ctx.lineTo(0, p.size * 1.3);
          ctx.lineTo(-p.size * 0.3, p.size * 0.3);
          ctx.lineTo(-p.size * 1.3, 0);
          ctx.lineTo(-p.size * 0.3, -p.size * 0.3);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0 && p.alpha > 0.01);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  const totalPixelSize = boardSize * cellSize;

  return (
    <canvas
      ref={canvasRef}
      width={totalPixelSize}
      height={totalPixelSize}
      className="absolute inset-0 pointer-events-none z-20"
      style={{ width: `${totalPixelSize}px`, height: `${totalPixelSize}px` }}
    />
  );
};
