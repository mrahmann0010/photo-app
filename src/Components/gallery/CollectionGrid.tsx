import type { Collection } from '../../types/photo';
import CollectionCard from './CollectionCard';
import RevealOnScroll from '../ui/RevealOnScroll';

interface CollectionGridProps {
  collections: Collection[];
}

/**
 * Responsive asymmetric grid of CollectionCard items.
 * 1 column on mobile, 2 on tablet, 3 on desktop.
 */
export default function CollectionGrid({ collections }: CollectionGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {collections.map((col, i) => (
        <RevealOnScroll key={col.id} delay={i * 0.08}>
          <CollectionCard collection={col} />
        </RevealOnScroll>
      ))}
    </div>
  );
}
