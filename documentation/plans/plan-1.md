# PHOTO_PORTFOLIO_PRODUCT_PLAN.md

## A Complete Redesign & Improvement Blueprint for a Premium Photography Portfolio

---

> *Prepared by: Senior Product Designer & Frontend Architect*
> *Based on repository analysis of the photo-app project*

---

## Table of Contents

1. [Current Project Analysis](#1-current-project-analysis)
2. [Vision for the Application](#2-vision-for-the-application)
3. [Recommended Tech Stack](#3-recommended-tech-stack)
4. [Core Application Pages](#4-core-application-pages)
5. [Gallery Design System](#5-gallery-design-system)
6. [Storytelling Feature](#6-storytelling-feature)
7. [UI Design System](#7-ui-design-system)
8. [Typography](#8-typography)
9. [Visual Effects and Animations](#9-visual-effects-and-animations)
10. [Image Experience](#10-image-experience)
11. [Unique Portfolio Features](#11-unique-portfolio-features)
12. [Component Architecture](#12-component-architecture)
13. [Folder Structure](#13-folder-structure)
14. [Performance Optimization](#14-performance-optimization)
15. [Accessibility](#15-accessibility)
16. [SEO Optimization](#16-seo-optimization)
17. [Future Enhancements](#17-future-enhancements)
18. [Implementation Roadmap](#18-implementation-roadmap)

---

## 1. Current Project Analysis

### Architecture Overview

The existing photo-app is a **React SPA** bootstrapped with Create React App. It uses `react-router-dom` for client-side routing, `motion/react` (Framer Motion) for page transitions, and the `swiper` library with its `EffectCards` module for carousel-style image presentation. All state is local (`useState`, `useEffect`) — there is no global state management, no backend, and no dynamic data layer.

### Framework and Tools Used

| Tool | Version / Notes |
|---|---|
| React | Functional components, hooks |
| react-router-dom | BrowserRouter, nested routes |
| Framer Motion | Page transitions, component animations |
| Swiper.js | EffectCards module for gallery slides |
| Tailwind CSS | Utility-first styling, `tailwind.config.js` present |
| CRA (Create React App) | Build tooling (implied by structure) |

### Folder Structure (Current)

```
/
├── public/              # Static image assets (1.jpg, 2.jpg, 4.jpg, etc.)
├── src/
│   ├── App.js           # Root component with routing
│   ├── index.js         # Entry point
│   ├── index.css        # Global styles + Tailwind imports + custom keyframes
│   ├── Components/      # Navbar, Footer, GalleryTile, SwiperMain
│   └── Pages/           # Home, Photos, About
├── tailwind.config.js
└── package.json
```

### Major Components and Pages

**Components:**

- `Navbar` — Sticky navigation bar with scroll-based style transition. Tracks scroll position using `useState`/`useEffect`.
- `Footer` — Static two-column link grid. No dynamic content.
- `GalleryTile` — Represents a single gallery preview. Accepts `position`, `title`, and `slug` props; renders a title pill and a hard-coded 3-image grid. Wraps in a `<Link>` to `/photos/:slug`.
- `SwiperMain` — Swiper card viewer for a gallery. Reads `slug` from `useParams`, maps it to static `imageMap` and `titleMap` dictionaries. Renders a Framer Motion animated Swiper.

**Pages:**

- `Home` (`/`) — Landing page with a full-screen styled quote. Entirely static, no data dependencies.
- `Photos` (`/photos`) — Lists multiple hard-coded `<GalleryTile>` entries. No dynamic data.
- `About` (`/about`) — Currently renders `SwiperMain` with no slug. No actual about content.

### Current Gallery Implementation

The gallery is implemented as a combination of `GalleryTile` (grid preview) and `SwiperMain` (Swiper EffectCards carousel). Gallery data (image paths, titles) is embedded directly inside the `SwiperMain` component as static JavaScript maps keyed by slug:

```js
const imageMap = {
  swiss: ['/swiss1.jpg', '/swiss2.jpg'],
  forest: ['/forest1.jpg', ...],
};
```

There is no external data file, no API, and no CMS. All three `GalleryTile` components on the Photos page use the same placeholder image paths (`/1.jpg`, `/2.jpg`, `/4.jpg`), regardless of which gallery they represent.

### Styling System Used

Tailwind CSS is the primary styling tool, supplemented by custom keyframe animations defined in `src/index.css` (fade-in, slide-up). The design is dark-themed with blur effects, photographic backgrounds, and centered layouts. Bespoke CSS classes handle specific swiper sizing requirements.

### Current UI/UX Quality

The current UI is a **minimal prototype** with a clear design intent (dark, photographic, minimalist) but lacks the polish of a production portfolio. Strengths include:

- Consistent dark aesthetic
- Animated page transitions via Framer Motion
- Swiper card effect is visually interesting

Weaknesses include:

- All three gallery tiles show identical placeholder images
- The About page has no content
- No meaningful error states, loading states, or empty states
- Navigation lacks mobile responsiveness
- Accessibility is minimal (generic or missing alt text, no keyboard navigation for gallery)
- The swiper relies entirely on hard-coded slug-to-image maps
- Duplicate `<Route>` definitions in `App.js` create routing confusion

### What Works Well

- Clean component/page folder separation
- Framer Motion integration provides a smooth base for transitions
- Tailwind is a solid styling foundation
- Slug-based routing is a good pattern for gallery navigation
- Overall layout intent is on-brand for a photography portfolio

### What Needs Improvement

- All gallery data must be externalized and made dynamic
- The entire image viewing experience must be upgraded (lightbox, fullscreen, zoom)
- About and Contact pages must be built
- Routing duplication must be resolved
- Accessibility and SEO must be implemented from the ground up
- Mobile experience requires dedicated design attention
- Typography needs a deliberate system, not ad-hoc Tailwind classes

---

## 2. Vision for the Application

### Product Vision Statement

> *A premium, cinematic photography portfolio platform that transforms each image collection into a visual story — enabling photographers and creative directors to present their work with intention, elegance, and emotional depth.*

### Experience Pillars

| Pillar | Description |
|---|---|
| **Minimal** | Every element earns its place. No clutter, no noise. White space is intentional. |
| **Elegant** | Premium typography, refined color, and considered proportions throughout. |
| **Cinematic** | Full-bleed imagery, dramatic transitions, and dark palette evoke the feeling of film. |
| **Immersive** | Photos command the viewport. The UI recedes to let the work speak. |
| **Modern** | Leverages contemporary web capabilities: smooth scroll, GPU-accelerated animation, next-gen image formats. |
| **Artistic** | The interface itself is a creative statement — not a template, but a distinctive identity. |

### Inspirational Reference Points

- **Awwwards SOTD** photography portfolios (e.g., Bruno Simon, Maxime Heckel)
- Editorial photo magazines (Aperture, Magnum Photos website)
- Film studio landing pages (A24, Criterion Collection)
- Luxury brand storytelling (Leica, LOEWE)

---

## 3. Recommended Tech Stack

### Frontend Framework

**React 18 + TypeScript**

TypeScript is non-negotiable for a maintainable, scalable codebase. It prevents entire classes of runtime bugs, improves IDE support, and makes refactoring safe. React 18 enables concurrent features (Suspense, transitions) that are directly useful for image-heavy interfaces.

### Build Tool

**Vite**

Replace Create React App with Vite immediately. CRA is deprecated and slow. Vite provides sub-second HMR, native ESM, and a dramatically faster development experience. It also integrates well with PostCSS/Tailwind.

```bash
npm create vite@latest photo-portfolio -- --template react-ts
```

### Styling

**Tailwind CSS v3+**

Retain Tailwind but upgrade to the latest version and enable JIT mode. Add the `@tailwindcss/typography` plugin for rich text/story content, and `@tailwindcss/aspect-ratio` for consistent image proportions.

### UI Component System

**shadcn/ui**

shadcn/ui provides unstyled, accessible Radix UI primitives pre-composed with Tailwind. This gives full design control without reinventing accessibility from scratch. Key components to use: Dialog (lightbox), Tooltip, Popover, ScrollArea, Separator.

### Animation

**Framer Motion (primary)**

Retain and expand the existing Framer Motion investment. Use `useScroll`, `useTransform`, `AnimatePresence`, `layoutId` (for shared element transitions between gallery grid and lightbox — a killer effect), and spring physics.

**GSAP + ScrollTrigger (premium effects)**

For parallax, pinned sections, timeline scrubbing, and the cinematic storytelling mode. GSAP is the industry standard for complex scroll-driven animation sequences. Use only where Framer Motion is insufficient.

**Lenis**

Smooth scroll library. Replaces native scroll with a buttery, physics-based scroll experience that makes the entire site feel premium.

### Image Handling

**Sharp (build-time) + next-gen formats**

During build, process all portfolio images with Sharp to generate WebP/AVIF variants at multiple resolutions. Store responsive image sets.

**React lazy loading via `IntersectionObserver`**

Implement a custom `<LazyImage>` component that renders a blurred low-quality image placeholder (LQIP) until the full image enters the viewport, then crossfades to the full resolution version.

### Gallery Layout

**CSS Grid (masonry via `grid-template-rows: masonry` or JS fallback)**

For true masonry, use the CSS native masonry spec (with a JS polyfill for unsupported browsers). Alternative: `react-masonry-css` for reliable cross-browser support.

**yet-another-react-lightbox**

Best-in-class lightbox library. Supports fullscreen, zoom, keyboard navigation, swipe, thumbnails, captions, and plugin system. Replaces the current Swiper implementation for the primary viewing experience.

### State Management

**Zustand**

Lightweight, minimal global state for: current open gallery, lightbox state, theme preference, and UI visibility. Far simpler than Redux for this use case.

**TanStack Query (React Query)**

When data is eventually moved to a JSON file, CMS, or API, React Query handles caching, loading states, and refetching cleanly.

### Typography

**Variable fonts via Google Fonts or Fontshare**

See Section 8 for detailed font pairing recommendations.

### Performance

- `vite-plugin-imagemin` for build-time image compression
- `React.lazy` + `Suspense` for route-level code splitting
- `@vitejs/plugin-react` with `babel-plugin-react-remove-properties` to strip test IDs in production

---

## 4. Core Application Pages

### 4.1 Home (`/`)

**Purpose:** Cinematic first impression. Establish visual identity, create emotional engagement, and direct users deeper into the work.

**Layout Structure:**

- Full-viewport hero with an autoplay muted video loop or a high-resolution hero image
- Centered title typeset in a large serif display font, animated in on load
- A single directional cue (down arrow or "Enter" text) with subtle pulse animation
- Below the fold: a curated horizontal scroll of featured gallery thumbnails (3–5)
- Brief philosophy statement in large, sparse typography
- Footer navigation

**UI Components:**

- `HeroSection` — full-bleed media background with text overlay
- `FeaturedGalleryScroll` — horizontal scroll strip of `GalleryPreviewCard` items
- `PhilosophyStatement` — large, centered text block with scroll reveal
- `SiteFooter`

---

### 4.2 Gallery / Collections (`/gallery`)

**Purpose:** The primary destination. Show all photography collections in a grid that communicates scale and visual range.

**Layout Structure:**

- Page header with collection count and sort/filter controls
- Masonry or asymmetric grid of `CollectionCard` tiles (variable height images)
- Each card: full-image cover, title on hover reveal, tag badge, image count
- Smooth page transition on entering a collection

**UI Components:**

- `CollectionGrid` — masonry layout wrapper
- `CollectionCard` — hover-reveal overlay, cover image, metadata
- `FilterBar` — tag/category filter pills
- `SortControl` — dropdown for date/name/size sorting

---

### 4.3 Collection Detail / Gallery Viewer (`/gallery/:slug`)

**Purpose:** The immersive image viewing experience for a single collection.

**Layout Structure:**

- Collection title + description header
- Masonry grid of all photos in the collection
- Click any photo to open the lightbox viewer
- Metadata panel (optional sidebar): location, date, camera details
- Related collections strip at the bottom

**UI Components:**

- `PhotoGrid` — masonry layout with `LazyImage` tiles
- `Lightbox` — fullscreen viewer via `yet-another-react-lightbox`
- `PhotoMetadata` — EXIF-style info display
- `RelatedCollections` — horizontal strip of 2–3 related galleries

---

### 4.4 Photo Story (`/stories/:slug`)

**Purpose:** Long-form, editorial storytelling format for featured projects. A cinematic photo essay.

**Layout Structure:**

- Full-bleed hero image with story title and subtitle overlaid
- Scrolling narrative with alternating: full-width images, text blocks, pull quotes, 2-up image grids
- Chapter dividers with animated reveals
- End-of-story CTA: view the full gallery, read another story

**UI Components:**

- `StoryHero` — parallax hero image with title
- `StoryChapter` — section wrapper with scroll reveal
- `StoryTextBlock` — typography-rich prose block
- `StoryPullQuote` — large italic quote with decorative rule
- `StoryImagePair` — side-by-side 2-image layout
- `StoryFullBleed` — edge-to-edge image section

---

### 4.5 About (`/about`)

**Purpose:** Human connection. The photographer's identity, philosophy, process, and biography.

**Layout Structure:**

- Split layout: large portrait photograph (left), bio text (right)
- Philosophy section: 3 values or principles in large type
- Process section: brief behind-the-scenes text with supporting images
- Clients/collaborators logo strip (optional)
- Link to Contact

**UI Components:**

- `AboutHero` — editorial split layout
- `PhilosophyGrid` — 3-column value statements
- `ProcessSection` — text + image narrative block
- `ClientStrip` — logo grid

---

### 4.6 Contact (`/contact`)

**Purpose:** Inquiry and connection point for potential clients, collaborators, and press.

**Layout Structure:**

- Minimal layout: large contact heading, short invitation text
- Contact form: name, email, project type (dropdown), message
- Direct email and social links below the form
- Optional: map or location indicator for based-in location

**UI Components:**

- `ContactForm` — validated form with React Hook Form
- `SocialLinks` — icon grid for Instagram, LinkedIn, etc.
- `ContactInfo` — email address, response time expectation

---

### 4.7 Journal / Blog (`/journal`) *(Future Phase)*

**Purpose:** Ongoing editorial content — thoughts on craft, process, travel, technique.

**Layout Structure:**

- Card grid of journal entries with cover image, date, title, excerpt
- Individual post page using the same `StoryChapter` components as Photo Story
- Tag filtering sidebar

---

## 5. Gallery Design System

### Masonry Layout

Use a true masonry grid (not a rigid column grid) to preserve the natural proportions of portrait and landscape photographs. This creates a more editorial, gallery-wall aesthetic.

```css
/* Native CSS masonry (progressive enhancement) */
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: masonry;
  gap: 8px;
}
```

For broader support, use `react-masonry-css`:

```tsx
<Masonry
  breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
  className="masonry-grid"
  columnClassName="masonry-grid-col"
>
  {photos.map(photo => <PhotoTile key={photo.id} {...photo} />)}
</Masonry>
```

### Responsive Grid Breakpoints

| Breakpoint | Columns | Gap |
|---|---|---|
| Mobile (`< 640px`) | 1 | 4px |
| Tablet (`640–1024px`) | 2 | 6px |
| Desktop (`1024–1440px`) | 3 | 8px |
| Wide (`> 1440px`) | 4 | 10px |

### Hover Effects

Each `PhotoTile` should apply a subtle zoom and overlay reveal on hover:

```tsx
// Framer Motion hover variant
const tileVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.4, ease: 'easeOut' } },
};

// Overlay: dark gradient slides up from bottom with title
const overlayVariants = {
  rest: { opacity: 0, y: 12 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};
```

### Image Preview Animation (Shared Element Transition)

Use Framer Motion's `layoutId` to create a seamless shared element transition when a user clicks a thumbnail to open the lightbox. The thumbnail expands fluidly into the fullscreen viewer — one of the most impressive micro-interactions in modern web portfolios.

```tsx
// Thumbnail
<motion.img layoutId={`photo-${photo.id}`} src={photo.thumbnail} />

// Lightbox
<motion.img layoutId={`photo-${photo.id}`} src={photo.fullRes} />
```

### Lightbox Viewer

Use `yet-another-react-lightbox` with the following plugins enabled:

- `Fullscreen` — native fullscreen API
- `Zoom` — pinch/scroll zoom
- `Thumbnails` — strip of all gallery images at bottom
- `Captions` — photo title and description overlay
- `Slideshow` — autoplay mode with configurable interval
- `Counter` — "3 / 24" indicator

```tsx
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';

<Lightbox
  open={open}
  close={() => setOpen(false)}
  slides={slides}
  plugins={[Fullscreen, Zoom, Captions, Thumbnails]}
/>
```

### Keyboard Navigation

Keyboard support in the lightbox (handled by `yet-another-react-lightbox` natively):

- `←` / `→` — previous/next image
- `Escape` — close lightbox
- `F` — toggle fullscreen
- `+` / `-` — zoom in/out

For the gallery grid itself, ensure `PhotoTile` components are `<button>` elements (or have `role="button"` with `tabIndex={0}`) so they are keyboard reachable.

### Swipe Navigation (Mobile)

`yet-another-react-lightbox` includes touch swipe support natively. For the gallery grid on mobile, consider a single-column scroll view rather than swipe, to preserve natural content flow.

### Image Metadata Display

Each photo should carry a metadata schema:

```typescript
interface Photo {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  location?: {
    name: string;
    coordinates?: [number, number];
  };
  capturedAt?: string;           // ISO date
  camera?: {
    body: string;                // e.g., "Leica M10"
    lens: string;                // e.g., "35mm f/1.4 Summilux"
    settings?: {
      aperture: string;          // e.g., "f/2.8"
      shutterSpeed: string;      // e.g., "1/500s"
      iso: number;               // e.g., 400
    };
  };
  src: {
    thumbnail: string;           // Low resolution (400px wide)
    medium: string;              // Medium resolution (1200px wide)
    full: string;                // Full resolution
    lqip: string;                // Base64 blur placeholder
  };
  width: number;
  height: number;
}
```

---

## 6. Storytelling Feature

### Concept

The storytelling mode transforms a photography project from a simple grid into a **cinematic photo essay** — a scrollable narrative that interweaves images, words, atmosphere, and emotion. Inspired by long-form editorial journalism and documentary film.

### Story Data Model

```typescript
interface PhotoStory {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  heroImage: string;
  publishedAt: string;
  readTime: string;             // e.g., "8 min read"
  tags: string[];
  location?: string;
  chapters: StoryChapter[];
}

type StoryChapter =
  | { type: 'text'; content: string }
  | { type: 'fullbleed'; photo: Photo; caption?: string }
  | { type: 'pair'; photos: [Photo, Photo]; captions?: [string?, string?] }
  | { type: 'pullquote'; text: string; attribution?: string }
  | { type: 'gallery'; photos: Photo[]; layout: 'strip' | 'grid' }
  | { type: 'divider'; label?: string };
```

### Story Scroll Experience

Each `StoryChapter` component reveals itself as the user scrolls into view, using Framer Motion's `useInView` or GSAP ScrollTrigger for more complex sequences:

```tsx
// Fade-up reveal for text blocks
const textReveal = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
```

Full-bleed images use a **horizontal crop pan** effect — as the user scrolls, the image slowly pans left or right using GSAP ScrollTrigger:

```js
gsap.to(imageEl, {
  xPercent: -5,
  ease: 'none',
  scrollTrigger: {
    trigger: containerEl,
    scrub: true,
  },
});
```

### Pull Quote Treatment

Pull quotes are typeset large (clamp to `4vw` minimum `2rem`) in a serif italic font, centered on the page with a thin horizontal rule above and below. They animate in with a scale from 0.96 to 1 and fade.

### Chapter Sections

Visual chapter dividers can use a numbered format (`01`, `02`, `03`) with a small label, styled as a thin horizontal rule with centered text, animated in with a line-draw SVG effect.

### Story Navigation

A fixed left-side progress indicator (thin vertical line with a moving dot) shows scroll progress through the story. Chapter labels appear next to the dot as the user scrolls through each section — a signature feature of premium editorial sites.

---

## 7. UI Design System

### Color Palette

The palette must support the dark, cinematic aesthetic as primary, with a light mode variant for future implementation.

**Dark Theme (Primary):**

```
Background:        #0A0A0A   (near-black, warm)
Surface:           #111111   (card backgrounds)
Surface Elevated:  #1A1A1A   (modals, overlays)
Border:            #222222   (subtle dividers)
Text Primary:      #F2F0EB   (warm off-white, not pure white)
Text Secondary:    #8A8A8A   (secondary labels)
Text Tertiary:     #444444   (placeholders, disabled)
Accent:            #D4B896   (warm sand/gold — used sparingly)
Accent Hover:      #C4A882
Error:             #E05252
```

**Light Theme (Future):**

```
Background:        #FAFAF8
Surface:           #FFFFFF
Text Primary:      #111111
Text Secondary:    #666666
Accent:            #8B6B45
```

### Typography System

See Section 8 for full font details. Scale system:

| Token | Size | Usage |
|---|---|---|
| `display-2xl` | `clamp(3.5rem, 8vw, 7rem)` | Hero titles |
| `display-xl` | `clamp(2.5rem, 5vw, 4.5rem)` | Page titles |
| `display-lg` | `clamp(2rem, 3.5vw, 3rem)` | Section headings |
| `heading-xl` | `1.75rem` | Card headings |
| `heading-lg` | `1.25rem` | Sub-headings |
| `body-lg` | `1.125rem` | Primary body text |
| `body-md` | `1rem` | Standard body |
| `body-sm` | `0.875rem` | Secondary text, labels |
| `caption` | `0.75rem` | Image captions, metadata |

### Spacing System

Based on a 4px base unit (Tailwind default). Key spacing tokens:

- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 40px
- `2xl`: 64px
- `3xl`: 96px
- `4xl`: 128px

Section padding on desktop: `py-24` (96px). On mobile: `py-16` (64px).

### Card Designs

**CollectionCard:**

```
Aspect ratio: variable (natural image ratio)
Border radius: 4px (barely rounded — more editorial than bubbly)
Overflow: hidden
Hover: scale(1.02), overlay reveals with title and arrow
Transition: 400ms cubic-bezier(0.22, 1, 0.36, 1)
```

**PhotoTile (masonry item):**

```
Border radius: 2px
No border
Hover: scale(1.03), brightness(1.05)
Cursor: zoom-in
```

### Buttons

**Primary:**

```
Background: transparent
Border: 1px solid rgba(242, 240, 235, 0.3)
Text: #F2F0EB
Padding: 12px 24px
Border radius: 2px
Hover: border-color #F2F0EB, background rgba(255,255,255,0.05)
Transition: all 300ms ease
```

**Ghost/Text:**

```
No background, no border
Text with animated underline that draws in on hover
Using CSS ::after pseudo-element with scaleX transform
```

### Navigation Design

The navigation bar should:

- Be fixed to the top, full width, centered content with max-width container
- Start completely transparent with white text
- On scroll past ~80px: apply `backdrop-filter: blur(16px)` and a semi-transparent dark background `rgba(10, 10, 10, 0.8)`
- Animate this transition with a smooth 300ms ease
- On mobile: collapse to a hamburger that opens a full-screen overlay menu with large typeset links
- Active route: indicated by a subtle underline or slight opacity change

### Hero Sections

Hero sections across all pages should use full-viewport-height (`100vh`) layouts with:

- Background: full-bleed photograph or gradient
- Text: positioned with generous padding, not centered (prefer bottom-left for editorial feel)
- Scroll indicator: thin animated line or mouse icon at bottom center

### Section Transitions

Between major page sections, use one of:

- A full-width thin horizontal rule with `margin: 0`
- A gradual background color shift from `#0A0A0A` to `#111111`
- An image band (full-bleed, short height) as a visual palette cleanser

---

## 8. Typography

### Font Pairing Strategy

The portfolio needs three typeface roles:

1. **Display / Hero** — creates the cinematic, editorial identity
2. **Body / UI** — clean, readable, functional
3. **Accent / Story** — used in pull quotes and story text for warmth

### Recommended Pairing A: Classic Editorial

| Role | Font | Source | Use Case |
|---|---|---|---|
| Display | **Playfair Display** | Google Fonts | Hero titles, collection names |
| Body/UI | **Inter** | Google Fonts | Navigation, labels, body copy |
| Story | **Lora** (italic variant) | Google Fonts | Pull quotes, story body text |

### Recommended Pairing B: Modern Luxury

| Role | Font | Source | Use Case |
|---|---|---|---|
| Display | **Cormorant Garamond** | Google Fonts | Cinematic titles (very high contrast, dramatic) |
| Body/UI | **DM Sans** | Google Fonts | All UI text |
| Accent | **Cormorant** (italic) | Google Fonts | Pull quotes |

### Recommended Pairing C: Contemporary Minimal

| Role | Font | Source | Use Case |
|---|---|---|---|
| Display | **Canela** | Fontshare | Large editorial headlines (best in class) |
| Body/UI | **Satoshi** | Fontshare | All UI (geometric, modern) |
| Story | **Editorial New** (italic) | Fontshare | Story body and quotes |

> **Recommendation:** Pairing C (Canela + Satoshi + Editorial New from Fontshare) produces the most distinctive and premium result. Fontshare fonts are free for commercial use. This combination is not widely used on generic portfolio templates, giving the site a unique identity.

### Variable Font Strategy

Where possible, use variable fonts to reduce HTTP requests. Both `Inter` and `Satoshi` offer variable font files. Load only the required axes:

```css
@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/Satoshi-Variable.woff2') format('woff2-variations');
  font-weight: 300 900;
  font-display: swap;
}
```

### Responsive Type with `clamp()`

Avoid fixed font sizes for display text. Use fluid typography:

```css
.display-title {
  font-size: clamp(2.5rem, 6vw + 1rem, 7rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
}
```

---

## 9. Visual Effects and Animations

### Smooth Scroll (Lenis)

Install Lenis and wrap the entire app. This replaces native browser scroll with a smooth, momentum-based scroll that makes every scroll interaction feel premium.

```tsx
import Lenis from '@studio-freight/lenis';
import { useEffect } from 'react';

function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1.2 });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
}
```

### Page Transitions (Framer Motion)

Keep the existing Framer Motion page transition pattern but upgrade the animation variants. Use a **curtain wipe** effect rather than a simple fade:

```tsx
const pageVariants = {
  initial: { clipPath: 'inset(0 100% 0 0)' },
  animate: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
  exit: { clipPath: 'inset(0 0 0 100%)', transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
};
```

### Scroll Animations (Framer Motion `useInView`)

Apply entrance animations to all major sections. Create a reusable `<RevealOnScroll>` wrapper component:

```tsx
function RevealOnScroll({ children, delay = 0 }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

### Parallax Image Movement

For hero images and story full-bleeds, apply a subtle parallax offset as the user scrolls:

```tsx
const { scrollYProgress } = useScroll({ target: sectionRef });
const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

<motion.img style={{ y }} src={heroImage} />
```

### Hover Zoom Effects

All `PhotoTile` and `CollectionCard` images use CSS `transform: scale()` on hover with `overflow: hidden` on the parent. This is more performant than Framer Motion hover for grid items at scale:

```css
.photo-tile img {
  transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
}
.photo-tile:hover img {
  transform: scale(1.06);
}
```

### Image Reveal Animations

For story chapters, images can reveal with a **clip-path wipe** from left to right, synchronized with scroll:

```tsx
// GSAP ScrollTrigger version
gsap.fromTo(imageEl,
  { clipPath: 'inset(0 100% 0 0)' },
  {
    clipPath: 'inset(0 0% 0 0)',
    duration: 1.2,
    ease: 'power3.inOut',
    scrollTrigger: { trigger: imageEl, start: 'top 80%' },
  }
);
```

### Text Character Animation

For hero titles, animate each word or character in sequence using Framer Motion's `staggerChildren`:

```tsx
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } };
const word = {
  hidden: { opacity: 0, y: '100%' },
  visible: { opacity: 1, y: '0%', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
```

### Cursor Interactions

On desktop, implement a custom cursor that:

- Is a small dot (8px) by default
- Expands to a larger circle (48px) when hovering over images (`cursor-expand` state)
- Changes to text "VIEW" when hovering over a CollectionCard
- Uses `lerp` (linear interpolation) for smooth cursor lag

```tsx
function useCustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // lerp position for smooth trailing
  // dispatch cursor state via context
}
```

### Loading Sequence

On first load, display a cinematic intro sequence:

1. Black screen with small logo or counter (0–100%)
2. Logo fades out
3. Hero section reveals with curtain wipe
4. Title animates in word by word
5. Total duration: 1.8–2.2 seconds

---

## 10. Image Experience

### Lazy Loading Strategy

Create a `<LazyImage>` component that:

1. Initially renders the **LQIP** (Low Quality Image Placeholder) — a tiny (20px) blurred version of the image encoded as a base64 string
2. Uses `IntersectionObserver` to detect when the image is near the viewport
3. Loads the full-resolution image in memory
4. Cross-fades from LQIP to full resolution over ~400ms
5. Marks itself as loaded to prevent re-triggering

```tsx
function LazyImage({ src, lqip, alt, width, height }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { rootMargin: '200px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ aspectRatio: `${width}/${height}`, position: 'relative' }}>
      <img src={lqip} style={{ filter: 'blur(20px)', transform: 'scale(1.05)' }} alt="" aria-hidden />
      {inView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 400ms ease' }}
        />
      )}
    </div>
  );
}
```

### Fullscreen Viewer

The lightbox provides a true fullscreen experience (via the Fullscreen API). The UI chrome (thumbnails, controls) fades out after 3 seconds of inactivity, leaving only the image — a "focus mode":

```tsx
const [uiVisible, setUiVisible] = useState(true);
const hideTimer = useRef<NodeJS.Timeout>();

function handleActivity() {
  setUiVisible(true);
  clearTimeout(hideTimer.current);
  hideTimer.current = setTimeout(() => setUiVisible(false), 3000);
}
```

### Pinch Zoom (Mobile)

Handled natively by `yet-another-react-lightbox`'s Zoom plugin. On desktop, scroll-to-zoom is also supported. Maximum zoom level should be set to 3× the natural image size.

### Slide Navigation

In the lightbox, navigation arrows appear on hover (desktop) and as permanent small controls on mobile. Keyboard arrow keys and touch swipe gestures are supported. Between slides, use a cross-dissolve transition by default, with an optional slide animation configurable per gallery.

### High Resolution Delivery

For serious photography portfolios, images should be delivered at up to 2560px wide for fullscreen viewing on 4K displays. Use `srcset` and `sizes` attributes to serve the appropriate resolution based on device pixel ratio:

```html
<img
  srcset="/photo-400.webp 400w, /photo-800.webp 800w, /photo-1600.webp 1600w, /photo-2560.webp 2560w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  alt="Mountain landscape at dusk"
/>
```

### Background Dimming

When the lightbox is open, the page behind is dimmed with a `backdrop` overlay (`rgba(0,0,0,0.95)`). The overlay fades in over 200ms. Scrolling is locked on the body element while the lightbox is open.

---

## 11. Unique Portfolio Features

### Interactive Storytelling Mode

Each photo story has a "Story Mode" toggle that switches from the standard scroll view to a **full-screen, keyboard/swipe driven cinematic experience** — like a presentation or interactive documentary. Users move through story beats one at a time with dramatic transitions. Inspired by interactive journalism (NYT Snow Fall, etc.).

### Timeline View of Projects

A page (`/timeline`) showing all collections arranged chronologically on a vertical timeline. Each year is marked, with collection cards branching off. Animated with GSAP ScrollTrigger — the timeline line draws itself as the user scrolls. This communicates the breadth and evolution of work over years.

### Photo Map (Location-Based Gallery)

A page (`/map`) showing a world map with pins for each collection's shoot location. Clicking a pin opens a mini preview of that collection. Use `react-map-gl` with Mapbox or MapLibre for the map layer. Styled with a custom dark map theme to match the portfolio aesthetic.

### Before/After Comparison Slider

For certain photo stories (e.g., RAW vs. edited, before/after restoration), embed a `<ComparisonSlider>` component — a draggable vertical divider between two versions of the same image. Implement using `react-compare-slider`.

### Behind-the-Scenes Notes

Each photo in the lightbox can have an expandable "Notes" panel showing a candid behind-the-scenes photograph and a short paragraph about the moment it was taken. This adds depth and personality, differentiating a true photographer portfolio from a generic gallery.

### Animated Project Covers

Collection cards on the grid use short, muted, autoplay video loops as their cover (4–8 seconds, ~500KB) rather than a static image. On hover, the video plays; at rest, a poster frame is shown. This creates a living, dynamic gallery grid.

### Cinematic Landing Page

The home page hero uses a **Ken Burns effect** — slow, imperceptible zoom and pan on a still photograph — to create a sense of movement and aliveness without the data cost of video. Combined with the smooth scroll and title animation, this makes an immediate premium impression.

### Password Protected Albums

Allow the photographer to share client galleries via a secret URL or password. A simple client-side password check (hash comparison) is sufficient for low-security proofing use cases. Albums in this mode display a password entry screen before revealing the gallery.

---

## 12. Component Architecture

### Top-Level Structure

```
src/components/
├── gallery/       # Everything related to displaying photographs
├── layout/        # Page-level structural components
├── navigation/    # All navigation-related components
├── story/         # Storytelling-mode specific components
└── ui/            # Generic, reusable design system primitives
```

### `gallery/` — Image Presentation

| Component | Responsibility |
|---|---|
| `PhotoGrid` | Masonry layout wrapper; iterates `Photo[]` and renders `PhotoTile` |
| `PhotoTile` | Single image tile with `LazyImage`, hover overlay, `layoutId` for transitions |
| `LazyImage` | LQIP → full resolution with IntersectionObserver and crossfade |
| `Lightbox` | Wraps `yet-another-react-lightbox` with portfolio-specific config |
| `CollectionCard` | Gallery overview card with cover image/video, title, tag, count |
| `CollectionGrid` | Masonry or grid of `CollectionCard` items for the gallery index |
| `ComparisonSlider` | Before/after draggable comparison for story use |
| `PhotoMetadata` | EXIF-style metadata display panel (camera, settings, location) |

### `layout/` — Structural Scaffolding

| Component | Responsibility |
|---|---|
| `AppLayout` | Root layout: renders `<Navbar>`, `<main>`, `<Footer>` with `<Outlet>` |
| `PageWrapper` | Applies `AnimatePresence` page transition + Lenis scroll reset |
| `Container` | Centered content wrapper with responsive horizontal padding |
| `Section` | Semantic `<section>` with standardized vertical padding |
| `HeroSection` | Full-viewport hero with background media, overlay, and child content |
| `SiteFooter` | Footer with nav links, social icons, copyright |

### `navigation/` — Navigation System

| Component | Responsibility |
|---|---|
| `Navbar` | Fixed top nav with scroll-based transparency and blur transition |
| `NavLink` | Individual nav link with animated active underline |
| `MobileMenu` | Full-screen overlay menu for mobile viewports |
| `BreadcrumbTrail` | Hierarchical location indicator for collection/story pages |
| `StoryProgress` | Fixed left-side scroll progress indicator for story mode |

### `story/` — Editorial Storytelling

| Component | Responsibility |
|---|---|
| `StoryHero` | Full-bleed hero with parallax image and title overlay |
| `StoryChapter` | Section wrapper with scroll reveal and chapter label |
| `StoryTextBlock` | Rich body text with `@tailwindcss/typography` prose styles |
| `StoryPullQuote` | Large typeset quote with decorative rule and attribution |
| `StoryImagePair` | Side-by-side two-photo layout with optional captions |
| `StoryFullBleed` | Edge-to-edge image with optional caption overlay |
| `StoryGalleryStrip` | Horizontal scroll strip of inline photo thumbnails |
| `ChapterDivider` | Animated divider with chapter number and optional label |

### `ui/` — Design System Primitives

| Component | Responsibility |
|---|---|
| `Button` | Primary, ghost, and icon button variants |
| `Badge` | Tag/category pill |
| `Tooltip` | Accessible tooltip via Radix UI |
| `RevealOnScroll` | Scroll-triggered Framer Motion entrance animation wrapper |
| `AnimatedText` | Word/character-level staggered animation for headlines |
| `CustomCursor` | Desktop custom cursor with expand/contract states |
| `LoadingScreen` | Cinematic first-load sequence |
| `AspectRatio` | Consistent image ratio wrapper |

---

## 13. Folder Structure

```
photo-portfolio/
├── public/
│   ├── fonts/                    # Self-hosted variable fonts (.woff2)
│   └── images/                   # Static images (favicon, OG image, etc.)
│
├── src/
│   ├── main.tsx                  # Vite entry point
│   ├── App.tsx                   # Root component: Router + AppLayout
│   │
│   ├── components/
│   │   ├── gallery/
│   │   │   ├── PhotoGrid.tsx
│   │   │   ├── PhotoTile.tsx
│   │   │   ├── LazyImage.tsx
│   │   │   ├── Lightbox.tsx
│   │   │   ├── CollectionCard.tsx
│   │   │   ├── CollectionGrid.tsx
│   │   │   ├── ComparisonSlider.tsx
│   │   │   └── PhotoMetadata.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx
│   │   │   ├── PageWrapper.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   └── SiteFooter.tsx
│   │   │
│   │   ├── navigation/
│   │   │   ├── Navbar.tsx
│   │   │   ├── NavLink.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   ├── BreadcrumbTrail.tsx
│   │   │   └── StoryProgress.tsx
│   │   │
│   │   ├── story/
│   │   │   ├── StoryHero.tsx
│   │   │   ├── StoryChapter.tsx
│   │   │   ├── StoryTextBlock.tsx
│   │   │   ├── StoryPullQuote.tsx
│   │   │   ├── StoryImagePair.tsx
│   │   │   ├── StoryFullBleed.tsx
│   │   │   ├── StoryGalleryStrip.tsx
│   │   │   └── ChapterDivider.tsx
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── Tooltip.tsx
│   │       ├── RevealOnScroll.tsx
│   │       ├── AnimatedText.tsx
│   │       ├── CustomCursor.tsx
│   │       ├── LoadingScreen.tsx
│   │       └── AspectRatio.tsx
│   │
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── CollectionPage.tsx
│   │   ├── StoryPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── TimelinePage.tsx
│   │   └── MapPage.tsx
│   │
│   ├── data/
│   │   ├── collections.ts        # Gallery collection definitions
│   │   ├── stories.ts            # Story chapter data
│   │   ├── photos.ts             # Photo metadata records
│   │   └── site.ts               # Site-wide config (title, author, links)
│   │
│   ├── hooks/
│   │   ├── useSmoothScroll.ts    # Lenis initialization
│   │   ├── useCustomCursor.ts    # Cursor position + state
│   │   ├── useLightbox.ts        # Lightbox open/close/index state
│   │   └── useMediaQuery.ts      # Responsive breakpoint detection
│   │
│   ├── store/
│   │   └── uiStore.ts            # Zustand: lightbox, menu, cursor state
│   │
│   ├── types/
│   │   ├── photo.ts              # Photo, Collection, Story interfaces
│   │   └── site.ts               # Site config types
│   │
│   ├── utils/
│   │   ├── imageUtils.ts         # srcset generation, LQIP helpers
│   │   ├── dateUtils.ts          # Date formatting
│   │   └── slugUtils.ts          # Slug generation and parsing
│   │
│   ├── styles/
│   │   ├── globals.css           # Tailwind base + global overrides
│   │   ├── fonts.css             # @font-face declarations
│   │   └── animations.css        # Custom CSS keyframes
│   │
│   └── router/
│       └── index.tsx             # All route definitions (single source of truth)
│
├── scripts/
│   └── processImages.mjs         # Sharp image optimization script (run before build)
│
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 14. Performance Optimization

### Image Optimization Pipeline

Before deploying, run a build-time image processing script using Sharp:

```js
// scripts/processImages.mjs
import sharp from 'sharp';
import { glob } from 'glob';

const sizes = [400, 800, 1200, 1600, 2560];

for (const file of await glob('src/assets/photos/**/*.{jpg,jpeg,png}')) {
  for (const width of sizes) {
    await sharp(file)
      .resize(width)
      .webp({ quality: 82, effort: 6 })
      .toFile(outputPath(file, width, 'webp'));

    await sharp(file)
      .resize(width)
      .avif({ quality: 65, effort: 9 })
      .toFile(outputPath(file, width, 'avif'));
  }

  // Generate LQIP (20px base64)
  const lqip = await sharp(file).resize(20).webp({ quality: 20 }).toBuffer();
  // Write to JSON manifest
}
```

This generates a `photos.manifest.json` at build time containing all image paths, dimensions, and LQIP data strings, which the `LazyImage` component consumes.

### Lazy Loading

Every image in the app uses the `<LazyImage>` component. No full-resolution image is fetched until it is within 200px of the viewport. The LQIP ensures there is no jarring blank space while images load.

### Code Splitting

Use `React.lazy` with `Suspense` for every page component:

```tsx
const StoryPage = lazy(() => import('./pages/StoryPage'));
const MapPage = lazy(() => import('./pages/MapPage'));
```

Heavy libraries (GSAP, react-map-gl, yet-another-react-lightbox) should only be loaded when needed by the relevant page or component.

### Bundle Analysis

Use `vite-bundle-analyzer` or `rollup-plugin-visualizer` to inspect bundle composition and identify unexpectedly large dependencies before each release.

### Performance Budgets

| Metric | Target |
|---|---|
| Largest Contentful Paint (LCP) | < 2.5s |
| Total Blocking Time (TBT) | < 200ms |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Initial JS bundle (gzipped) | < 150KB |
| Time to Interactive (TTI) | < 3.5s |

### Font Loading

Self-host all fonts. Use `font-display: swap` and preload the primary display and body fonts:

```html
<link rel="preload" href="/fonts/Canela-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/Satoshi-Variable.woff2" as="font" type="font/woff2" crossorigin>
```

### Caching Strategy

Configure CDN (Vercel/Cloudflare) to serve images with `Cache-Control: public, max-age=31536000, immutable`. Include content hashes in all image filenames so stale caches are never served after re-processing.

---

## 15. Accessibility

### Keyboard Navigation

- All interactive elements (nav links, gallery tiles, lightbox controls, buttons) must be reachable and operable via keyboard alone
- Logical tab order must follow visual reading order
- Visible `:focus-visible` outlines must be present on all interactive elements (use a consistent 2px solid accent ring, not the browser default)
- The lightbox must trap focus within itself while open and restore focus to the triggering element on close (use Radix Dialog pattern)
- Custom cursor should be disabled when a user is navigating via keyboard (detect via `keydown` event)

### Screen Readers

- All images must have descriptive, meaningful `alt` text (not "photo" or empty). Example: `alt="Morning fog over Lake Geneva, Switzerland, October 2023"`
- Decorative images (backgrounds, dividers) must have `alt=""` and `aria-hidden="true"`
- Lightbox must announce slide changes to screen readers via `aria-live="polite"`
- The photo count indicator should use `aria-label="Image 3 of 24"`
- Navigation landmarks: use `<nav>`, `<main>`, `<footer>`, `<aside>` semantic HTML elements

### Color Contrast

- All body text on dark backgrounds must meet **WCAG AA** contrast ratio (4.5:1 minimum)
- Primary text (`#F2F0EB`) on background (`#0A0A0A`): ~18:1 — passes AAA
- Secondary text (`#8A8A8A`) on background (`#0A0A0A`): ~5.5:1 — passes AA
- Accent (`#D4B896`) used only for decorative elements, not for text that must be readable

### Reduced Motion

Respect the `prefers-reduced-motion` media query. Disable or dramatically reduce all animations when this preference is active:

```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const variants = prefersReducedMotion
  ? { initial: {}, animate: {} }  // No animation
  : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } };
```

---

## 16. SEO Optimization

### Meta Tags

Use `react-helmet-async` to set per-page meta tags:

```tsx
<Helmet>
  <title>Swiss Alps Collection | Portfolio</title>
  <meta name="description" content="Photographs from a 3-week journey through the Swiss Alps in winter, 2023." />
  <link rel="canonical" href="https://yourportfolio.com/gallery/swiss" />
</Helmet>
```

### OpenGraph Images

Every collection, story, and page should have a unique OG image (1200×630px) — ideally the hero or cover photograph. This ensures rich link previews when shared on social media.

```html
<meta property="og:image" content="https://yourportfolio.com/og/swiss.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="twitter:card" content="summary_large_image" />
```

### Structured Data (JSON-LD)

Add schema.org structured data for the photographer profile and individual photo collections:

```json
{
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "Swiss Alps — Winter 2023",
  "description": "Photographs from a 3-week journey through the Swiss Alps.",
  "author": {
    "@type": "Person",
    "name": "Your Name",
    "url": "https://yourportfolio.com"
  },
  "image": [
    {
      "@type": "ImageObject",
      "contentUrl": "https://yourportfolio.com/photos/swiss/swiss-001.webp",
      "description": "Morning mist at the Matterhorn base",
      "datePublished": "2023-11-12"
    }
  ]
}
```

### Image Alt Text for SEO

Alt text doubles as SEO content. Write descriptive, natural-language alt text that includes location, subject, and mood — these are indexed by search engines and help the portfolio appear in image search results.

### Sitemap

Generate a `sitemap.xml` listing all gallery, story, and static pages. Submit to Google Search Console. Use `vite-plugin-sitemap` for automated generation based on your route configuration.

---

## 17. Future Enhancements

### CMS Integration

Once the portfolio grows beyond a comfortable number of hard-coded entries, integrate a headless CMS. Recommended options:

- **Sanity** — Best-in-class developer experience, rich image handling, custom schema, real-time collaboration
- **Contentful** — Mature, well-documented, generous free tier
- **Cloudinary** — Specifically built for image management; handles optimization, transformations, and delivery natively

### Admin Dashboard

A private `/admin` route (protected by auth) for managing collections, uploading photos, writing stories, and publishing/unpublishing galleries. Could be built with the same React components in a different layout, or delegated entirely to the CMS UI.

### Photo Licensing Store

Allow site visitors to license individual photographs for commercial or print use. Integrate with a payment provider (Stripe) and deliver download links via email. Each photo page would include a "License this image" button.

### Client Proofing Galleries

Create password-protected galleries for client deliverables. Clients can browse their photos, mark favorites with a star, and leave notes. The photographer receives a summary of selections. This is a significant commercial feature for working photographers.

### Advanced Analytics

Beyond standard Google Analytics page views, track: lightbox opens per photo, average time spent in story mode, most-viewed collections, drop-off points in long-form stories. Use Posthog or Plausible for privacy-friendly, GDPR-compliant analytics.

### Print-on-Demand Integration

Partner with a print lab (Fine Art America, Prodigi, Printful) to offer archival prints directly from the portfolio. Each photo's lightbox would include a "Buy a Print" option with size/paper selection.

### Multi-Language Support

For international photographers, add i18n via `react-i18next`. Prioritize: UI strings, navigation, contact form — photo titles and story text can remain in the primary language initially.

---

## 18. Implementation Roadmap

### Phase 1: Foundation & UI Redesign (Weeks 1–3)

**Goal:** Migrate from CRA to Vite + TypeScript, implement the new design system, fix all critical issues.

**Tasks:**

- [ ] Migrate project from CRA to Vite + React + TypeScript
- [ ] Install and configure Tailwind CSS v3, shadcn/ui, Framer Motion
- [ ] Install and configure Lenis smooth scroll
- [ ] Implement new color palette, typography system, and CSS variables
- [ ] Redesign `Navbar` with scroll transition and mobile hamburger menu
- [ ] Redesign `SiteFooter`
- [ ] Build `Container`, `Section`, `HeroSection` layout components
- [ ] Build `Button`, `Badge`, `RevealOnScroll`, `AnimatedText` UI primitives
- [ ] Implement `CustomCursor` for desktop
- [ ] Build `LoadingScreen` intro animation
- [ ] Fix duplicate routing in `App.tsx` (create clean `router/index.tsx`)
- [ ] Deploy to Vercel with preview environments

**Success Criteria:** Site loads on Vite, new design system visible, all routing works, Lighthouse score > 90 on performance.

---

### Phase 2: Gallery System (Weeks 4–6)

**Goal:** Replace all static/hard-coded gallery data with a real data layer; implement the full image viewing experience.

**Tasks:**

- [ ] Define TypeScript `Photo`, `Collection`, `PhotoStory` interfaces in `src/types/`
- [ ] Externalize all gallery data to `src/data/collections.ts` and `src/data/photos.ts`
- [ ] Build `LazyImage` component with LQIP support and IntersectionObserver
- [ ] Run Sharp image processing script; generate `photos.manifest.json`
- [ ] Build `PhotoTile` with hover overlay and `layoutId` for shared element transition
- [ ] Build `PhotoGrid` masonry layout with responsive breakpoints
- [ ] Build `CollectionCard` with animated cover and hover reveal
- [ ] Build `CollectionGrid` for the Gallery index page
- [ ] Integrate `yet-another-react-lightbox` with Fullscreen, Zoom, Captions, Thumbnails plugins
- [ ] Build `PhotoMetadata` panel
- [ ] Rebuild `GalleryPage` and `CollectionPage` using new components
- [ ] Implement keyboard navigation and accessibility throughout gallery
- [ ] Add `CollectionPage` → Lightbox shared element transition

**Success Criteria:** All gallery images load with LQIP, lightbox works with keyboard/swipe/zoom, data is fully externalized.

---

### Phase 3: Core Pages (Weeks 7–9)

**Goal:** Complete all primary pages: Home, About, Contact. Build the storytelling mode.

**Tasks:**

- [ ] Redesign `HomePage` with cinematic hero, Ken Burns effect, featured gallery strip, philosophy section
- [ ] Build `AboutPage` with split layout, values grid, process section
- [ ] Build `ContactPage` with validated form (React Hook Form + Zod)
- [ ] Build all `story/` components: `StoryHero`, `StoryChapter`, `StoryTextBlock`, `StoryPullQuote`, `StoryImagePair`, `StoryFullBleed`, `ChapterDivider`
- [ ] Build `StoryProgress` fixed scroll indicator
- [ ] Create initial story data and render at least one complete photo story
- [ ] Build `StoryPage` route

**Success Criteria:** All core pages complete, at least one photo story fully rendered and scrollable.

---

### Phase 4: Animation System (Weeks 10–11)

**Goal:** Elevate the visual experience to a premium level through polished, purposeful animation.

**Tasks:**

- [ ] Implement Framer Motion curtain wipe page transitions in `PageWrapper`
- [ ] Add `RevealOnScroll` to all major section elements across all pages
- [ ] Implement GSAP ScrollTrigger for story full-bleed parallax and image reveal
- [ ] Add hover zoom effects to all `PhotoTile` and `CollectionCard` items
- [ ] Implement animated hero text in `HomePage` (staggered word reveal)
- [ ] Add timeline draw-in animation for `TimelinePage` using GSAP
- [ ] Test and tune all animations for `prefers-reduced-motion` compliance
- [ ] Add animated video cover support to `CollectionCard`

**Success Criteria:** All page transitions smooth, scroll animations performant, no jank on mobile, reduced-motion mode verified.

---

### Phase 5: Performance, Accessibility & SEO (Weeks 12–13)

**Goal:** Ship a production-ready portfolio that scores well on Lighthouse, is fully accessible, and is discoverable.

**Tasks:**

- [ ] Run full accessibility audit with axe DevTools and NVDA screen reader
- [ ] Fix all identified keyboard navigation and ARIA issues
- [ ] Add descriptive `alt` text to every image in the data layer
- [ ] Implement `react-helmet-async` for per-page meta tags and OG images
- [ ] Generate OG images for all collections and stories
- [ ] Add JSON-LD structured data for `ImageGallery` and `Person` schema
- [ ] Configure `vite-plugin-sitemap` and submit to Google Search Console
- [ ] Run Lighthouse CI on all pages; reach target scores
- [ ] Configure CDN cache headers for all image assets
- [ ] Conduct cross-browser testing (Chrome, Safari, Firefox, mobile Safari)
- [ ] Conduct cross-device testing (iPhone, Android, iPad, desktop 4K)
- [ ] Final performance budget review

**Success Criteria:** Lighthouse scores ≥ 90 Performance, 100 Accessibility, 100 Best Practices, 90+ SEO across all primary pages. All WCAG AA criteria met.

---

*End of PHOTO_PORTFOLIO_PRODUCT_PLAN.md*

---

> *This document is a living product blueprint. It should be updated as design decisions are finalized, new requirements emerge, and phases are completed.*
