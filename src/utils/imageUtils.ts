import { slug as slugify } from './slugUtils';

/**
 * Returns a simple base-64 encoded blur placeholder string.
 * In production this would be generated server-side by Sharp.
 */
export function getLQIP(_src: string): string {
  // Placeholder — replace with real Sharp-generated LQIP data URIs
  return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMxMTExMTEiLz48L3N2Zz4=';
}

/**
 * Builds a srcset string for a given base path.
 * Assumes images follow the pattern: /photo-{width}.webp
 */
export function buildSrcSet(basePath: string, widths: number[] = [400, 800, 1200, 1600]) {
  return widths.map((w) => `${basePath} ${w}w`).join(', ');
}

/**
 * Generates a stable image filename from a title + extension.
 */
export function imageFilename(title: string, ext = 'webp'): string {
  return `${slugify(title)}.${ext}`;
}
