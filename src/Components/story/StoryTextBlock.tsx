import RevealOnScroll from '../ui/RevealOnScroll';

interface StoryTextBlockProps {
  content: string;
  delay?: number;
}

/**
 * Rich body text block, constrained to a readable measure.
 * Uses @tailwindcss/typography prose styles on a dark background.
 */
export default function StoryTextBlock({ content, delay = 0 }: StoryTextBlockProps) {
  return (
    <RevealOnScroll delay={delay} className="px-6 md:px-16 max-w-[1440px] mx-auto">
      <div
        className="prose prose-invert prose-lg max-w-2xl mx-auto
          prose-p:text-text-secondary prose-p:leading-relaxed
          prose-headings:font-playfair prose-headings:text-text-primary"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </RevealOnScroll>
  );
}
