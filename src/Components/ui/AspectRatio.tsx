import React from 'react';

interface AspectRatioProps {
  ratio?: number;  // width / height, e.g. 16/9
  children: React.ReactNode;
  className?: string;
}

/**
 * Maintains a consistent aspect ratio for its children.
 * Default ratio: 4/3
 */
export default function AspectRatio({ ratio = 4 / 3, children, className = '' }: AspectRatioProps) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ paddingBottom: `${(1 / ratio) * 100}%` }}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
