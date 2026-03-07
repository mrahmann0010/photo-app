import { create } from 'zustand';

interface UIState {
  /* Lightbox */
  lightboxOpen: boolean;
  lightboxIndex: number;
  lightboxCollectionSlug: string | null;
  openLightbox: (slug: string, index?: number) => void;
  closeLightbox: () => void;
  setLightboxIndex: (index: number) => void;

  /* Mobile menu */
  menuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;

  /* Loading screen */
  loadingComplete: boolean;
  setLoadingComplete: () => void;

  /* Custom cursor */
  cursorVariant: 'default' | 'expand' | 'text';
  setCursorVariant: (variant: UIState['cursorVariant']) => void;
}

export const useUIStore = create<UIState>((set) => ({
  /* Lightbox defaults */
  lightboxOpen: false,
  lightboxIndex: 0,
  lightboxCollectionSlug: null,
  openLightbox: (slug, index = 0) =>
    set({ lightboxOpen: true, lightboxCollectionSlug: slug, lightboxIndex: index }),
  closeLightbox: () =>
    set({ lightboxOpen: false, lightboxCollectionSlug: null, lightboxIndex: 0 }),
  setLightboxIndex: (index) => set({ lightboxIndex: index }),

  /* Mobile menu defaults */
  menuOpen: false,
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),
  closeMenu: () => set({ menuOpen: false }),

  /* Loading screen */
  loadingComplete: false,
  setLoadingComplete: () => set({ loadingComplete: true }),

  /* Cursor */
  cursorVariant: 'default',
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
}));
