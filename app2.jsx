/**
 * App.jsx — Example usage of CylindricalGallery
 *
 * Install dependencies:
 *   npm install three @react-three/fiber @react-three/drei
 */

import CylindricalGallery from "./CylindricalGallery";

// ── Option A: Use your own images ──────────────────────────────────────────
const MY_IMAGES = [
  "/photos/img01.jpg",
  "/photos/img02.jpg",
  "/photos/img03.jpg",
  // ... add as many as you have; the component will tile them
];

// ── Option B: Leave images={[]} or omit it to use Picsum placeholders ──────

export default function App() {
  return (
    /**
     * Props:
     *
     * images   string[]   Your image URLs. Omit for Picsum placeholders.
     * pages    number     Scroll depth (default 4). Increase for more travel.
     * loop     boolean    Seamless infinite scroll loop (default false).
     * damping  number     Inertia: 0 = maximum lag, 1 = instant (default 0.075).
     */
    <CylindricalGallery
      images={[]} // swap for MY_IMAGES to use your own photos
      pages={4}
      loop={false}
      damping={0.075}
    />
  );
}
