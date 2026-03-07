import type { Photo } from '../../types/photo';
import LazyImage from './LazyImage';
import { useUIStore } from '../../store/uiStore';

interface PhotoTileProps {
  photo: Photo;
  collectionSlug: string;
  index: number;
}

/**
 * Single masonry image tile.
 * - Hover: scale(1.06) on the image (via .photo-tile CSS class).
 * - Click: opens lightbox at this photo's index.
 * - Provides expanded cursor variant on hover.
 */
export default function PhotoTile({ photo, collectionSlug, index }: PhotoTileProps) {
  const { openLightbox, setCursorVariant } = useUIStore();

  return (
    <button
      className="photo-tile block w-full text-left focus-visible:ring-2 focus-visible:ring-accent
        rounded-[2px] overflow-hidden"
      onClick={() => openLightbox(collectionSlug, index)}
      onMouseEnter={() => setCursorVariant('expand')}
      onMouseLeave={() => setCursorVariant('default')}
      aria-label={`View photo: ${photo.title}`}
    >
      <LazyImage
        src={photo.src.medium}
        lqip={photo.src.lqip}
        alt={photo.title}
        width={photo.width}
        height={photo.height}
        className="w-full"
      />
    </button>
  );
}
