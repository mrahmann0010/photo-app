import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getCollectionBySlug } from '../data/collections';
import { siteConfig } from '../data/site';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import PhotoGrid from '../components/gallery/PhotoGrid';
import GalleryLightbox from '../components/gallery/GalleryLightbox';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import Badge from '../components/ui/Badge';
import { useUIStore } from '../store/uiStore';

export default function CollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const collection = slug ? getCollectionBySlug(slug) : null;
  const { lightboxOpen } = useUIStore();

  if (!collection) {
    return <Navigate to="/gallery" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{collection.title} — {siteConfig.title}</title>
        <meta name="description" content={collection.description} />
      </Helmet>

      {/* Collection header */}
      <div className="relative pt-32 pb-16 bg-[#0A0A0A] border-b border-[#222222] overflow-hidden">
        {/* Faint cover bleed */}
        {collection.coverImage && (
          <div
            className="absolute inset-0 opacity-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${collection.coverImage})` }}
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 to-[#0A0A0A]" aria-hidden="true" />

        <Container className="relative z-10">
          <RevealOnScroll>
            <div className="flex flex-col gap-3 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                {collection.tags?.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <h1 className="font-playfair text-display-lg text-text-primary">{collection.title}</h1>
              {collection.description && (
                <p className="text-body-md text-text-secondary">{collection.description}</p>
              )}
              <p className="text-caption text-text-tertiary font-inter uppercase tracking-widest mt-1">
                {collection.photos.length} photographs
                {collection.date ? ` · ${collection.date}` : ''}
              </p>
            </div>
          </RevealOnScroll>
        </Container>
      </div>

      {/* Masonry photo grid — lightbox is triggered via uiStore inside PhotoTile */}
      <Section className="bg-[#0A0A0A]">
        <Container>
          <PhotoGrid
            photos={collection.photos}
            collectionSlug={collection.slug}
          />
        </Container>
      </Section>

      {/* Lightbox — reads open state and photos from uiStore */}
      {lightboxOpen && (
        <GalleryLightbox photos={collection.photos} />
      )}
    </>
  );
}
