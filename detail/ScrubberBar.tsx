import type { MouseEvent } from 'react';

interface ScrubberBarProps {
  total: number;
  index: number;
  onSeek: (index: number) => void;
}

const MAX_TICKS = 52;

export default function ScrubberBar({ total, index, onSeek }: ScrubberBarProps) {
  const tickCount = Math.min(total, MAX_TICKS);
  const activeTickIndex = Math.round((index / Math.max(total - 1, 1)) * (tickCount - 1));

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSeek(Math.round(ratio * (total - 1)));
  };

  return (
    <div className="px-[26px] pt-[6px] flex-shrink-0">
      <div
        className="flex items-center gap-[2.5px] h-[22px] cursor-pointer"
        onClick={handleClick}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={total - 1}
        aria-valuenow={index}
        tabIndex={0}
      >
        {Array.from({ length: tickCount }, (_, i) => (
          <div
            key={i}
            className="flex-1 rounded-[2px] transition-all duration-200"
            style={{
              height: i === activeTickIndex ? 14 : 6.5,
              background: i === activeTickIndex
                ? 'rgba(0,0,0,0.46)'
                : 'rgba(0,0,0,0.13)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
