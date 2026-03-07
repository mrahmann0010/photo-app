import React from 'react';
import RevealOnScroll from '../ui/RevealOnScroll';

interface StoryChapterProps {
  children: React.ReactNode;
  label?: string;
  number?: string;
}

/**
 * Section wrapper for a single story chapter.
 * Shows an optional chapter number + label divider at the top,
 * then reveals its children as user scrolls in.
 */
export default function StoryChapter({ children, label, number }: StoryChapterProps) {
  return (
    <section className="py-12 md:py-20">
      {(number || label) && (
        <RevealOnScroll className="mb-10">
          <div className="flex items-center gap-4 px-6 md:px-16 max-w-[1440px] mx-auto">
            <span className="text-caption font-inter text-text-tertiary uppercase tracking-[0.2em]">
              {number && `${number}`}
              {number && label && ' — '}
              {label}
            </span>
            <div className="flex-1 h-[1px] bg-[#222222]" />
          </div>
        </RevealOnScroll>
      )}
      {children}
    </section>
  );
}
