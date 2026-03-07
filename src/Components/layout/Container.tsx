import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Centered content wrapper with responsive horizontal padding.
 * Max-width is 1440px.
 */
export default function Container({ children, className = '', as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={`w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 ${className}`}>
      {children}
    </Tag>
  );
}
