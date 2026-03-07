import { useEffect } from 'react';
import YARLightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Counter from 'yet-another-react-lightbox/plugins/counter';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/plugins/counter.css';

import type { Photo } from '../../types/photo';
import { useUIStore } from '../../store/uiStore';

interface GalleryLightboxProps {
  photos: Photo[];
}

/**
 * Fullscreen lightbox using yet-another-react-lightbox.
 * Plugins: Fullscreen, Zoom, Captions, Thumbnails, Slideshow, Counter.
 * UI chrome auto-hides after 3s of inactivity.
 */
export default function GalleryLightbox({ photos }: GalleryLightboxProps) {
  const { lightboxOpen, lightboxIndex, closeLightbox, setLightboxIndex } = useUIStore();

  /* Lock body scroll when lightbox is open */
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  const slides = photos.map((photo) => ({
    src: photo.src.full,
    alt: photo.title,
    title: photo.title,
    description: photo.description,
    width: photo.width,
    height: photo.height,
  }));

  return (
    <YARLightbox
      open={lightboxOpen}
      close={closeLightbox}
      index={lightboxIndex}
      slides={slides}
      on={{ view: ({ index }) => setLightboxIndex(index) }}
      plugins={[Fullscreen, Zoom, Captions, Thumbnails, Slideshow, Counter]}
      zoom={{ maxZoomPixelRatio: 3 }}
      animation={{ swipe: 300 }}
      styles={{
        container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
      }}
      carousel={{ finite: false, preload: 2 }}
    />
  );
}
