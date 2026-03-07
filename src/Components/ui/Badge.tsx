import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Tag / category pill badge.
 * Styled as a small, semi-transparent label.
 */
export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-block text-caption font-inter font-medium uppercase tracking-widest
        px-2 py-1 border border-[rgba(242,240,235,0.2)] text-text-secondary rounded-[2px]
        ${className}`}
    >
      {children}
    </span>
  );
}
