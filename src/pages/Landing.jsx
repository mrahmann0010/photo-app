/**
 * CylindricalGallery.jsx — v10
 *
 * ✅ INFINITE SCROLL LOOP
 *    Three stacked copies of the photo set. Offset wraps with modulo so
 *    the gallery tiles forever in both directions — no seam, no pop.
 *
 * ✅ ANIMATED GRAIN
 *    A <canvas> redraws pure random pixel noise every ~50ms via RAF.
 *    Looks like living 35mm film grain. Tune: GRAIN_OPACITY, GRAIN_SIZE,
 *    GRAIN_SPEED at the top of the GrainCanvas component.
 *
 * ✅ HOVER EFFECTS (WebGL shader)
 *    On hover: scale-up, brightness lift, UV zoom (photo breathes inward),
 *    vignette removal + warm tint. All driven by a single spring 0→1.
 *    Tune: HOVER_SCALE, HOVER_BRIGHTNESS, HOVER_UV_ZOOM constants.
 */

import {
  Suspense,
  useRef,
  useMemo,
  useEffect,
  createContext,
  useContext,
} from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

// ─────────────────────────────────────────────────────────────────────────────
// Scroll Engine — inertia + curveIntensity signal
// ─────────────────────────────────────────────────────────────────────────────
const ScrollCtx = createContext(null);

function ScrollProvider({ children }) {
  const state = useRef({ offset: 0, velocity: 0, curveIntensity: 0 });

  useEffect(() => {
    const s = state.current;

    const onWheel = (e) => {
      e.preventDefault();
      let d = e.deltaY;
      if (e.deltaMode === 1) d *= 32;
      if (e.deltaMode === 2) d *= window.innerHeight;
      s.velocity += d * 0.0035;
    };

    let ty = 0;
    const onTouchStart = (e) => {
      ty = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      e.preventDefault();
      const dy = ty - e.touches[0].clientY;
      ty = e.touches[0].clientY;
      s.velocity += dy * 0.007;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return <ScrollCtx.Provider value={state}>{children}</ScrollCtx.Provider>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Layout  [x, y, scale, aspect(w/h), picsum-seed]
// ─────────────────────────────────────────────────────────────────────────────
const PHOTO_DATA = [
  [-3.8, 0.0, 1.1, 0.75, "10"],
  [0.0, 0.2, 1.3, 1.35, "20"],
  [4.0, 0.0, 1.05, 0.8, "30"],
  [-4.4, -2.3, 1.05, 1.2, "40"],
  [-0.8, -2.05, 1.2, 0.78, "50"],
  [2.9, -2.2, 1.1, 1.1, "60"],
  [-3.2, -4.4, 1.15, 0.9, "70"],
  [0.9, -4.6, 1.0, 1.4, "80"],
  [4.2, -4.3, 1.05, 0.82, "90"],
  [-4.7, -6.7, 1.1, 1.15, "100"],
  [-0.4, -6.45, 1.25, 0.75, "110"],
  [3.6, -6.75, 1.05, 1.25, "120"],
];

// Total vertical span of ONE photo set in world units
const WORLD_HEIGHT = 8.2;

// Three copies stacked: below (-1), current (0), above (+1)
const COPIES = [-1, 0, 1];

// ─────────────────────────────────────────────────────────────────────────────
// SceneLoop — physics in a single useFrame (runs before child useFrames)
// ─────────────────────────────────────────────────────────────────────────────
function SceneLoop({ groupRef }) {
  const ctx = useContext(ScrollCtx);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const s = ctx.current;

    // Inertia decay — frame-rate independent
    s.velocity *= Math.pow(0.88, delta * 60);

    // Advance offset + seamless wrap
    s.offset += s.velocity;
    s.offset = ((s.offset % WORLD_HEIGHT) + WORLD_HEIGHT) % WORLD_HEIGHT;

    // curveIntensity 0→1: ramps up while scrolling, decays to 0 when stopped
    const targetCI = Math.min(Math.abs(s.velocity) / 0.6, 1);
    const kCI = 1 - Math.pow(0.001, delta * 6);
    s.curveIntensity = THREE.MathUtils.lerp(s.curveIntensity, targetCI, kCI);

    groupRef.current.position.y = s.offset;
  });

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Hover constants — tune these
// ─────────────────────────────────────────────────────────────────────────────
const HOVER_SCALE = 1.06; // mesh grows by this factor on hover
const HOVER_BRIGHTNESS = 1.22; // fragment brightness multiplier
const HOVER_UV_ZOOM = 0.93; // UV scale — lower = more zoom (0.88–1.0)

// ─────────────────────────────────────────────────────────────────────────────
// PhotoMesh — cylindrical bend + hover spring + shader effects
// ─────────────────────────────────────────────────────────────────────────────
function PhotoMesh({ url, x, y, scale, aspect }) {
  const meshRef = useRef();
  const matRef = useRef();
  const ctx = useContext(ScrollCtx);

  const curve = useRef({ rotY: 0, tz: 0 });
  const hover = useRef({ t: 0, over: false });

  const texture = useLoader(THREE.TextureLoader, url, (l) => {
    l.crossOrigin = "anonymous";
  });

  useFrame((_, delta) => {
    if (!meshRef.current || !matRef.current) return;

    // ── Cylindrical distortion ────────────────────────────────────────────
    const ci = ctx.current.curveIntensity;
    const nX = x / 5;
    const para = nX * nX;
    const boost = Math.min(ci * 1.7, 1.6);

    matRef.current.uniforms.uCurve.value = boost * 0.6;

    const kC = 1 - Math.pow(0.001, delta * 10);
    curve.current.rotY = THREE.MathUtils.lerp(
      curve.current.rotY,
      -nX * para * boost * 12,
      kC,
    );
    curve.current.tz = THREE.MathUtils.lerp(
      curve.current.tz,
      para * boost * -1.4,
      kC,
    );

    meshRef.current.rotation.y = THREE.MathUtils.degToRad(curve.current.rotY);
    meshRef.current.position.z = curve.current.tz;

    // ── Hover spring ──────────────────────────────────────────────────────
    // Faster in (kHin), slightly slower out (kHout) — satisfying elastic feel
    const kHin = 1 - Math.pow(0.001, delta * 11);
    const kHout = 1 - Math.pow(0.001, delta * 7);
    const kH = hover.current.over ? kHin : kHout;
    hover.current.t = THREE.MathUtils.lerp(
      hover.current.t,
      hover.current.over ? 1 : 0,
      kH,
    );

    const t = hover.current.t;

    // Scale
    meshRef.current.scale.setScalar(1 + (HOVER_SCALE - 1) * t);

    // Shader uniforms
    matRef.current.uniforms.uHover.value = t;
    matRef.current.uniforms.uBrightness.value = 1 + (HOVER_BRIGHTNESS - 1) * t;
    matRef.current.uniforms.uUVZoom.value = 1 - (1 - HOVER_UV_ZOOM) * t;
  });

  return (
    <mesh
      ref={meshRef}
      position={[x, y, 0]}
      onPointerEnter={(e) => {
        e.stopPropagation();
        hover.current.over = true;
        document.body.style.cursor = "pointer";
      }}
      onPointerLeave={() => {
        hover.current.over = false;
        document.body.style.cursor = "default";
      }}
    >
      <planeGeometry args={[scale * aspect, scale, 40, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={{
          uTexture: { value: texture },
          uCurve: { value: 0 },
          uHover: { value: 0 },
          uBrightness: { value: 1 },
          uUVZoom: { value: 1 },
        }}
        vertexShader={`
          uniform float uCurve;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 pos = position;
            // Parabolic Z push — cylindrical surface illusion
            pos.z -= pos.x * pos.x * uCurve;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D uTexture;
          uniform float uHover;
          uniform float uBrightness;
          uniform float uUVZoom;
          varying vec2 vUv;

          void main() {
            // UV zoom toward centre — image breathes inward on hover
            vec2 uv = (vUv - 0.5) * uUVZoom + 0.5;
            vec4 col = texture2D(uTexture, uv);

            // Brightness lift
            col.rgb *= uBrightness;

            // Resting vignette lifts on hover — feels "selected" / lit
            // Tweak 0.30 = vignette darkness at rest
            vec2  vig  = vUv * 2.0 - 1.0;
            float vign = 1.0 - dot(vig, vig) * 0.30;
            col.rgb   *= mix(vign, 1.0, uHover);

            // Subtle warm tint on hover (barely visible, feels expensive)
            col.rgb += vec3(0.018, 0.012, 0.004) * uHover;

            gl_FragColor = col;
          }
        `}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GalleryScene — 3 stacked copies for infinite loop
// ─────────────────────────────────────────────────────────────────────────────
function GalleryScene({ images }) {
  const groupRef = useRef();

  const urls = useMemo(
    () =>
      PHOTO_DATA.map((d, i) =>
        images?.length
          ? images[i % images.length]
          : `https://picsum.photos/seed/${d[4]}/600/800`,
      ),
    [images],
  );

  return (
    <>
      <SceneLoop groupRef={groupRef} />

      {/*
       * Three copies stacked at:
       *   y - WORLD_HEIGHT   ← below-visible copy
       *   y + 0              ← primary copy
       *   y + WORLD_HEIGHT   ← above-visible copy
       *
       * SceneLoop wraps position.y in [0, WORLD_HEIGHT) via modulo,
       * so one copy is always in view — seamless in both directions.
       */}
      <group ref={groupRef}>
        {COPIES.map((ci) =>
          PHOTO_DATA.map(([x, y, scale, aspect], i) => (
            <Suspense key={`${ci}-${i}`} fallback={null}>
              <PhotoMesh
                url={urls[i]}
                x={x}
                y={y + ci * WORLD_HEIGHT}
                scale={scale}
                aspect={aspect}
              />
            </Suspense>
          )),
        )}
      </group>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GrainCanvas — real-time RAF noise, feels like living 35mm film grain
//
// TUNE THESE THREE CONSTANTS:
//   GRAIN_OPACITY  0.0 = off  →  0.12 = heavy film. Sweet spot: 0.045–0.07
//   GRAIN_SIZE     1 = finest pixel grain  ·  2–3 = coarser texture
//   GRAIN_SPEED    ms between redraws — 40 = fast flutter · 80 = slow drift
// ─────────────────────────────────────────────────────────────────────────────
const GRAIN_OPACITY = 0.052;
const GRAIN_SIZE = 1;
const GRAIN_SPEED = 50;

function GrainCanvas() {
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf,
      last = 0;

    const resize = () => {
      canvas.width = Math.ceil(window.innerWidth / GRAIN_SIZE);
      canvas.height = Math.ceil(window.innerHeight / GRAIN_SIZE);
    };

    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      if (now - last < GRAIN_SPEED) return;
      last = now;

      const { width, height } = canvas;
      const img = ctx.createImageData(width, height);
      const buf = img.data;

      for (let i = 0; i < buf.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        buf[i] = v;
        buf[i + 1] = v;
        buf[i + 2] = v;
        buf[i + 3] = 255;
      }

      ctx.putImageData(img, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 4,
        pointerEvents: "none",
        imageRendering: "pixelated",
        opacity: GRAIN_OPACITY,
        mixBlendMode: "overlay",
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root export
// ─────────────────────────────────────────────────────────────────────────────
export default function CylindricalGallery({ images = [] }) {
  return (
    <ScrollProvider>
      {/* ══════════════════════════════════════════════════════════════
          MAIN PAGE WRAPPER
          All elements live here. Change background colour below.

          Background options:
            #F5F0EB  warm parchment  ← current
            #FAFAF8  cool paper white
            #F9F5EE  warmer cream
            #FFFCF7  near-white with warmth
            #F0EDE8  deeper antique tone
          ══════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          background: "#F5F0EB" /* ← PAGE BACKGROUND — change here */,
          overflow: "hidden",
        }}
      >
        {/* ── NAVBAR SLOT ─────────────────────────────────────────────
            Uncomment + import your Navbar. It sits at z-index ≥ 10
            so it floats above grain (4), vignette (2), and canvas (1).

            import Navbar from "./Components/Navbar";
            ─────────────────────────────────────────────────────────── */}
        {/* <Navbar /> */} {/* ← UNCOMMENT TO SHOW NAVBAR */}
        {/* ── ANIMATED FILM GRAIN ─────────────────────────────────────
            Real RAF noise. Tune GRAIN_OPACITY / GRAIN_SIZE / GRAIN_SPEED
            constants above GrainCanvas. Remove line to disable.
            ─────────────────────────────────────────────────────────── */}
        <GrainCanvas />
        {/* ── CORNER VIGNETTE ──────────────────────────────────────────
            Subtle darkening at edges for depth.
            Adjust final alpha: 0.0 = flat  ·  0.14 = visible.
            ─────────────────────────────────────────────────────────── */}
        <div
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 110% 90% at 50% 50%, transparent 50%, rgba(28,18,8,0.09) 100%)",
            /* ↑ change 0.09 to adjust vignette strength */
          }}
        />
        {/* ── TOP / BOTTOM EDGE FADES ──────────────────────────────────
            Photos bleed in/out softly at screen edges.
            Colour must match PAGE BACKGROUND above.
            Adjust height (12vh) or remove to disable.
            ─────────────────────────────────────────────────────────── */}
        {["top", "bottom"].map((side) => (
          <div
            key={side}
            aria-hidden
            style={{
              position: "fixed",
              left: 0,
              right: 0,
              [side]: 0,
              height: "12vh",
              zIndex: 3,
              pointerEvents: "none",
              background: `linear-gradient(${side === "top" ? "to bottom" : "to top"}, #F5F0EB, transparent)`,
              /* ↑ match PAGE BACKGROUND colour */
            }}
          />
        ))}
        {/* ── WEBGL CANVAS ─────────────────────────────────────────────
            Fixed fullscreen. transparent bg so page colour shows through.
            ─────────────────────────────────────────────────────────── */}
        <Suspense fallback={null}>
          <Canvas
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1,
              background: "transparent",
            }}
            gl={{ alpha: true }}
            camera={{ position: [0, 0, 8], fov: 55 }}
            dpr={[1, 2]}
            frameloop="always"
          >
            <ambientLight intensity={1} />
            <GalleryScene images={images} />
          </Canvas>
        </Suspense>
      </div>
      {/* ════════════════ END MAIN WRAPPER ═══════════════════════ */}
    </ScrollProvider>
  );
}
