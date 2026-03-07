import type { Photo } from '../../types/photo';
import RevealOnScroll from '../ui/RevealOnScroll';

interface StoryImagePairProps {
  photos: [Photo, Photo];
  captions?: [string?, string?];
}

/**
 * Side-by-side two-photo layout with optional captions.
 */
export default function StoryImagePair({ photos, captions = [] }: StoryImagePairProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-6 md:px-16 max-w-[1440px] mx-auto">
      {photos.map((photo, i) => (
        <RevealOnScroll key={photo.id} delay={i * 0.1}>
          <figure className="flex flex-col gap-2">
            <img
              src={photo.src.medium}
              alt={photo.title}
              className="w-full object-cover rounded-tile"
              loading="lazy"
              decoding="async"
            />
            {captions[i] && (
              <figcaption className="text-caption font-inter text-text-tertiary pl-1">
                {captions[i]}
              </figcaption>
            )}
          </figure>
        </RevealOnScroll>
      ))}
    </div>
  );
}
