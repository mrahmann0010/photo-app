import RevealOnScroll from '../ui/RevealOnScroll';

interface ChapterDividerProps {
  number?: string;  // e.g. "01"
  label?: string;
}

/**
 * Visual chapter divider with a numbered format and animated horizontal rule.
 */
export default function ChapterDivider({ number, label }: ChapterDividerProps) {
  return (
    <RevealOnScroll className="py-8 px-6 md:px-16 max-w-[1440px] mx-auto">
      <div className="flex items-center gap-4">
        {number && (
          <span className="font-inter text-caption text-accent font-semibold tracking-[0.15em] min-w-[2rem]">
            {number}
          </span>
        )}
        <div className="flex-1 h-[1px] bg-[#222222]" />
        {label && (
          <span className="font-inter text-caption text-text-tertiary uppercase tracking-[0.15em] whitespace-nowrap">
            {label}
          </span>
        )}
      </div>
    </RevealOnScroll>
  );
}
