import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import type { Collection } from '../../types/photo';
import Badge from '../ui/Badge';
import { useUIStore } from '../../store/uiStore';

interface CollectionCardProps {
  collection: Collection;
}

/**
 * Gallery overview card shown on the Gallery index page.
 * - Hover: overlay with title + arrow slides up from bottom.
 * - Hover cursor variant: 'text' (shows "VIEW").
 */
export default function CollectionCard({ collection }: CollectionCardProps) {
  const setCursorVariant = useUIStore((s) => s.setCursorVariant);

  return (
    <Link
      to={`/gallery/${collection.slug}`}
      className="collection-card group block relative rounded-card overflow-hidden
        focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={`View collection: ${collection.title}`}
      onMouseEnter={() => setCursorVariant('text')}
      onMouseLeave={() => setCursorVariant('default')}
    >
      {/* Cover image */}
      <img
        src={collection.coverImage}
        alt={collection.title}
        className="w-full aspect-[4/5] object-cover"
        loading="lazy"
        decoding="async"
      />

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
          flex flex-col justify-end p-5 gap-2"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="font-playfair text-heading-xl text-text-primary leading-tight">
          {collection.title}
        </h3>
        {collection.subtitle && (
          <p className="text-body-sm text-text-secondary">{collection.subtitle}</p>
        )}
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {collection.tags.slice(0, 3).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
          <span className="text-caption text-text-secondary ml-auto">
            {collection.photoCount} photos
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
