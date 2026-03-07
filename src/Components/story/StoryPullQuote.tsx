import RevealOnScroll from '../ui/RevealOnScroll';

interface StoryPullQuoteProps {
  text: string;
  attribution?: string;
}

/**
 * Large typeset pull quote with decorative horizontal rules.
 * Centered, uses serif italic, animates to scale(1) on enter.
 */
export default function StoryPullQuote({ text, attribution }: StoryPullQuoteProps) {
  return (
    <RevealOnScroll className="px-6 md:px-16 max-w-[1440px] mx-auto">
      <blockquote className="max-w-2xl mx-auto text-center py-12 flex flex-col items-center gap-6">
        <div className="w-12 h-[1px] bg-accent" />
        <p
          className="font-lora italic text-text-primary leading-snug"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
        >
          &ldquo;{text}&rdquo;
        </p>
        {attribution && (
          <footer className="text-caption font-inter text-text-secondary uppercase tracking-widest">
            — {attribution}
          </footer>
        )}
        <div className="w-12 h-[1px] bg-accent" />
      </blockquote>
    </RevealOnScroll>
  );
}
