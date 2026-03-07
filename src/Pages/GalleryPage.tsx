import { Helmet } from 'react-helmet-async';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import CollectionGrid from '../components/gallery/CollectionGrid';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import { collections } from '../data/collections';
import { siteConfig } from '../data/site';

export default function GalleryPage() {
  return (
    <>
      <Helmet>
        <title>Gallery — {siteConfig.title}</title>
        <meta name="description" content="All photography collections — landscapes, forests, and jungles." />
      </Helmet>

      {/* Page header */}
      <div className="pt-32 pb-10 bg-[#0A0A0A] border-b border-[#222222]">
        <Container>
          <RevealOnScroll>
            <div className="flex flex-col gap-2">
              <span className="text-caption font-inter text-accent uppercase tracking-[0.2em]">
                {collections.length} Collections
              </span>
              <h1 className="font-playfair text-display-lg text-text-primary">Gallery</h1>
              <p className="text-body-md text-text-secondary max-w-xl mt-1">
                Each collection is a series of photographs from a single journey or subject.
                Click any collection to explore the full gallery.
              </p>
            </div>
          </RevealOnScroll>
        </Container>
      </div>

      <Section className="bg-[#0A0A0A]">
        <Container>
          <CollectionGrid collections={collections} />
        </Container>
      </Section>
    </>
  );
}
