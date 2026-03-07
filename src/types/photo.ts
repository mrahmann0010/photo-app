/* ──────────────────────────────────────────────────────────
   Photo & Collection type definitions
   (from plan Section 5 — Image Metadata Display)
────────────────────────────────────────────────────────────── */

export interface PhotoSrc {
  thumbnail: string;  // Low-res ~400px
  medium: string;     // Mid-res ~1200px
  full: string;       // Full resolution
  lqip: string;       // Base64 blur placeholder
}

export interface PhotoLocation {
  name: string;
  coordinates?: [number, number];
}

export interface CameraSettings {
  aperture: string;       // e.g. "f/2.8"
  shutterSpeed: string;   // e.g. "1/500s"
  iso: number;
}

export interface Camera {
  body: string;
  lens: string;
  settings?: CameraSettings;
}

export interface Photo {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  location?: PhotoLocation;
  capturedAt?: string;       // ISO date
  camera?: Camera;
  src: PhotoSrc;
  width: number;
  height: number;
}

/* ── Collection ─────────────────────────────────────────── */

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  coverImage: string;
  tags: string[];
  photoCount: number;
  location?: string;
  date?: string;
  photos: Photo[];
}

/* ── Story ───────────────────────────────────────────────── */

export type StoryChapterBlock =
  | { type: 'text';      content: string }
  | { type: 'fullbleed'; photo: Photo; caption?: string }
  | { type: 'pair';      photos: [Photo, Photo]; captions?: [string?, string?] }
  | { type: 'pullquote'; text: string; attribution?: string }
  | { type: 'gallery';   photos: Photo[]; layout: 'strip' | 'grid' }
  | { type: 'divider';   label?: string };

export interface PhotoStory {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  heroImage: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  location?: string;
  chapters: StoryChapterBlock[];
}
