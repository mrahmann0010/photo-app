import type { Photo } from '../../types/photo';

interface PhotoMetadataProps {
  photo: Photo;
}

/**
 * EXIF-style metadata display panel shown below the photo or in a sidebar.
 */
export default function PhotoMetadata({ photo }: PhotoMetadataProps) {
  return (
    <div className="flex flex-col gap-4 text-body-sm font-inter">
      <h4 className="text-heading-lg font-playfair text-text-primary">{photo.title}</h4>

      {photo.description && (
        <p className="text-body-sm text-text-secondary leading-relaxed">{photo.description}</p>
      )}

      <dl className="grid grid-cols-2 gap-x-6 gap-y-2 border-t border-[#222222] pt-4">
        {photo.location?.name && (
          <>
            <dt className="text-caption text-text-tertiary uppercase tracking-widest">Location</dt>
            <dd className="text-body-sm text-text-secondary">{photo.location.name}</dd>
          </>
        )}
        {photo.capturedAt && (
          <>
            <dt className="text-caption text-text-tertiary uppercase tracking-widest">Date</dt>
            <dd className="text-body-sm text-text-secondary">
              {new Date(photo.capturedAt).toLocaleDateString('en-GB', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </dd>
          </>
        )}
        {photo.camera?.body && (
          <>
            <dt className="text-caption text-text-tertiary uppercase tracking-widest">Camera</dt>
            <dd className="text-body-sm text-text-secondary">{photo.camera.body}</dd>
          </>
        )}
        {photo.camera?.lens && (
          <>
            <dt className="text-caption text-text-tertiary uppercase tracking-widest">Lens</dt>
            <dd className="text-body-sm text-text-secondary">{photo.camera.lens}</dd>
          </>
        )}
        {photo.camera?.settings && (
          <>
            <dt className="text-caption text-text-tertiary uppercase tracking-widest">Settings</dt>
            <dd className="text-body-sm text-text-secondary">
              {photo.camera.settings.aperture} · {photo.camera.settings.shutterSpeed} · ISO {photo.camera.settings.iso}
            </dd>
          </>
        )}
      </dl>

      {photo.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {photo.tags.map((tag) => (
            <span
              key={tag}
              className="text-caption text-text-tertiary border border-[#333] px-2 py-1 rounded-[2px]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
