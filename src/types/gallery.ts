// ─── Core Types ───────────────────────────────────────────────────────────────

export interface PhotoSrc {
  thumbnail: string; // ~400px wide
  full: string;      // ~1200px wide
}

export interface Collection {
  key: string;
  title: string;
  subtitle?: string;
  location: string;
  year: string;
  count: number;
  liked: boolean;
  /** First 3 are used for the cluster preview */
  photos: PhotoSrc[];
}

export type ZoomLevel = -1 | 0 | 1;

export interface GalleryState {
  activeKey: string | null;
  zoomLevel: ZoomLevel;
  searchQuery: string;
}
