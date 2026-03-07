/** Convert a string to a URL-safe slug */
export function slug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Capitalise first letter of each word */
export function titleCase(str: string): string {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Parse slug back to a human-readable title */
export function slugToTitle(slug: string): string {
  return titleCase(slug.replace(/-/g, ' '));
}
