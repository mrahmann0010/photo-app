import Masonry from 'react-masonry-css';
import type { Photo } from '../../types/photo';
import PhotoTile from './PhotoTile';

interface PhotoGridProps {
  photos: Photo[];
  collectionSlug: string;
}

const breakpoints = {
  default: 3,
  1024: 2,
  640: 1,
};

/**
 * Masonry grid of PhotoTile items.
 * Uses react-masonry-css for cross-browser masonry layout.
 */
export default function PhotoGrid({ photos, collectionSlug }: PhotoGridProps) {
  return (
    <Masonry
      breakpointCols={breakpoints}
      className="masonry-grid"
      columnClassName="masonry-grid-col"
    >
      {photos.map((photo, i) => (
        <PhotoTile
          key={photo.id}
          photo={photo}
          collectionSlug={collectionSlug}
          index={i}
        />
      ))}
    </Masonry>
  );
}
