import React, { useEffect, useState } from 'react';
import { SymbolIcon } from './SymbolIcon';

export interface FlyingSymbolItem {
  id: string;
  symbolId: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  size: number;
  onLanded?: () => void;
}

interface FlyingSymbolOverlayProps {
  items: FlyingSymbolItem[];
  onFinish: (id: string) => void;
}

export const FlyingSymbolOverlay: React.FC<FlyingSymbolOverlayProps> = ({
  items,
  onFinish,
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {items.map((item) => (
        <FlyingItem
          key={item.id}
          item={item}
          onComplete={() => onFinish(item.id)}
        />
      ))}
    </div>
  );
};

const FlyingItem: React.FC<{
  item: FlyingSymbolItem;
  onComplete: () => void;
}> = ({ item, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Trigger transition on next animation frame
    const frame = requestAnimationFrame(() => {
      setProgress(1);
    });

    const timer = setTimeout(() => {
      if (item.onLanded) {
        item.onLanded();
      }
      onComplete();
    }, 240);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [item, onComplete]);

  // Current position based on CSS transition
  const currentX = progress === 0 ? item.startX : item.targetX;
  const currentY = progress === 0 ? item.startY : item.targetY;

  return (
    <div
      className="absolute top-0 left-0"
      style={{
        transform: `translate3d(${currentX - item.size / 2}px, ${
          currentY - item.size / 2
        }px, 0) scale(${progress === 0 ? 1.25 : 1.0})`,
        transition:
          progress === 0
            ? 'none'
            : 'transform 240ms cubic-bezier(0.2, 0.9, 0.3, 1.2)',
        filter:
          progress === 0
            ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.25))'
            : 'drop-shadow(0 2px 4px rgba(0,0,0,0.12))',
      }}
    >
      <SymbolIcon symbolId={item.symbolId} size={item.size} />
    </div>
  );
};
