import type { Photo } from '../../types/photo';
import RevealOnScroll from '../ui/RevealOnScroll';

interface StoryFullBleedProps {
  photo: Photo;
  caption?: string;
}

/**
 * Edge-to-edge full-bleed image section with an optional caption overlay.
 */
export default function StoryFullBleed({ photo, caption }: StoryFullBleedProps) {
  return (
    <RevealOnScroll>
      <figure className="relative w-full">
        <img
          src={photo.src.full}
          alt={photo.title}
          className="w-full max-h-[90vh] object-cover"
          loading="lazy"
          decoding="async"
        />
        {caption && (
          <figcaption
            className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/60
              text-caption font-inter text-text-secondary"
          >
            {caption}
          </figcaption>
        )}
      </figure>
    </RevealOnScroll>
  );
}
