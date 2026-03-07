import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
  /** Remove default vertical padding */
  noPadding?: boolean;
}

/**
 * Semantic section wrapper with standardized vertical padding.
 * Desktop: py-24, Mobile: py-16
 */
export default function Section({
  children,
  className = '',
  id,
  as: Tag = 'section',
  noPadding = false,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={`${noPadding ? '' : 'py-16 md:py-24'} ${className}`}
    >
      {children}
    </Tag>
  );
}
