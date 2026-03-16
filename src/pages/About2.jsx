/**
 * CylindricalGallery.jsx — v5 (adjusted)
 *
 * Core fix: separate curveIntensity signal and boost it for stronger distortion
 * during scroll. Only the distortion multiplier was changed; physics remain
 * untouched.
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
// ScrollEngine — custom inertia + curve-intensity signal
// ─────────────────────────────────────────────────────────────────────────────
const ScrollCtx = createContext(null);

function ScrollProvider({ children }) {
  const state = useRef({
    offset: 0, // world-unit scroll position (wrapped)
    velocity: 0, // raw inertia value
    curveIntensity: 0, // 0–1, drives distortion
  });

  useEffect(() => {
    const s = state.current;

    const onWheel = (e) => {
      e.preventDefault();
      let d = e.deltaY;
      if (e.deltaMode === 1) d *= 32;
      if (e.deltaMode === 2) d *= window.innerHeight;
      // Scale to world units; ~100px wheel tick → +0.35 velocity
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
// Layout  [x, y, scale, aspect(w÷h), picsum-seed]
// ─────────────────────────────────────────────────────────────────────────────
const PHOTO_DATA = [
  // band 0
  [-3.8, 0.0, 1.1, 0.75, "10"],
  [0.0, 0.2, 1.3, 1.35, "20"],
  [4.0, 0.0, 1.05, 0.8, "30"],
  // band 1
  [-4.4, -2.3, 1.05, 1.2, "40"],
  [-0.8, -2.05, 1.2, 0.78, "50"],
  [2.9, -2.2, 1.1, 1.1, "60"],
  // band 2
  [-3.2, -4.4, 1.15, 0.9, "70"],
  [0.9, -4.6, 1.0, 1.4, "80"],
  [4.2, -4.3, 1.05, 0.82, "90"],
  // band 3
  [-4.7, -6.7, 1.1, 1.15, "100"],
  [-0.4, -6.45, 1.25, 0.75, "110"],
  [3.6, -6.75, 1.05, 1.25, "120"],
  // band 4
  [-3.0, -8.9, 1.0, 0.88, "130"],
  [0.6, -8.65, 1.15, 1.3, "140"],
  [4.1, -8.95, 1.1, 0.8, "150"],
];

const WORLD_HEIGHT = 9.5;

// ─────────────────────────────────────────────────────────────────────────────
// SceneLoop — one useFrame that owns ALL physics. Runs before anything else.
// ─────────────────────────────────────────────────────────────────────────────
function SceneLoop({ groupRef }) {
  const scrollState = useContext(ScrollCtx);

  useFrame((_, delta) => {
    if (!groupRef.current || !scrollState) return;
    const s = scrollState.current;

    // 1. Inertia decay — frame-rate independent
    s.velocity *= Math.pow(0.88, delta * 60);

    // 2. Advance scroll position + wrap
    s.offset += s.velocity;
    s.offset = ((s.offset % WORLD_HEIGHT) + WORLD_HEIGHT) % WORLD_HEIGHT;

    // 3. curveIntensity — normalised 0–1 from velocity magnitude
    //    Ramps up quickly while scrolling, decays to 0 when stopped.
    //    Math.min(|vel|/0.6, 1) → intensity saturates at velocity ≥ 0.6
    const targetIntensity = Math.min(Math.abs(s.velocity) / 0.6, 1);
    const lerpK = 1 - Math.pow(0.001, delta * 6);
    s.curveIntensity = THREE.MathUtils.lerp(
      s.curveIntensity,
      targetIntensity,
      lerpK,
    );

    // 4. Move gallery group
    groupRef.current.position.y = s.offset;
  });

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// URL helpers
// ─────────────────────────────────────────────────────────────────────────────
function picsumURL(seed) {
  return `https://picsum.photos/seed/${seed}/600/800`;
}
function fixUnsplash(url) {
  if (url.includes("unsplash.com") && !url.includes("?"))
    return `${url}?auto=format&fit=crop&w=600&q=80`;
  return url;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAX distortion constants — predictable, tune here
// ─────────────────────────────────────────────────────────────────────────────
const MAX_ROT_DEG = 12; // max Y-rotation at screen edges (degrees)
const MAX_TZ = -1.4; // max Z recession at edges (world units)
const MAX_DIM = 0.22; // max brightness reduction at edges (0–1)

// NEW: amplify the curveIntensity when calculating targets
// Increase this to make the distortion stronger during scroll.
// Suggested: 1.4–2.2 for progressively stronger effects.
const CURVE_BOOST = 1.7;

// ─────────────────────────────────────────────────────────────────────────────
// PhotoMesh
// ─────────────────────────────────────────────────────────────────────────────
function PhotoMesh({ url, x, y, scale, aspect }) {
  const meshRef = useRef();
  const matRef = useRef();
  const scrollState = useContext(ScrollCtx);

  // Per-photo smooth distortion state
  const D = useRef({ rotY: 0, tz: 0, bri: 1 });

  const texture = useLoader(THREE.TextureLoader, url, (loader) => {
    loader.crossOrigin = "anonymous";
  });

  useFrame((_, delta) => {
    if (!meshRef.current || !scrollState) return;

    const ci = scrollState.current.curveIntensity; // 0–1

    // Parabolic arc: nX = position normalised to ±1, para = nX²
    // para is 0 at centre, 1 at screen edges — the cylindrical curvature
    const nX = x / 5.0;
    const para = nX * nX;

    // Amplify curveIntensity with a bounded boost so we can tune distortion
    // without changing the physics. clamp to a reasonable ceiling (1.6)
    const boost = Math.min(ci * CURVE_BOOST, 1.6);
    matRef.current.uniforms.uCurve.value = boost * 0.6;

    // Targets driven by boosted curveIntensity (0 when still → everything zero → flat)
    const tRotY = -nX * para * boost * MAX_ROT_DEG;
    const tZ = para * boost * MAX_TZ;
    const tBri = 1 - para * boost * MAX_DIM;

    // Fast ramp-up, gentle release — asymmetric spring for realism
    const kIn = 1 - Math.pow(0.001, delta * 10); // snappy follow
    const kOut = 1 - Math.pow(0.001, delta * 5); // slower unwind

    // keep simple: use kIn for rot & tz, kOut for brightness unwind
    D.current.rotY = THREE.MathUtils.lerp(D.current.rotY, tRotY, kIn);
    D.current.tz = THREE.MathUtils.lerp(D.current.tz, tZ, kIn);
    D.current.bri = THREE.MathUtils.lerp(D.current.bri, tBri, kOut);

    meshRef.current.rotation.y = THREE.MathUtils.degToRad(D.current.rotY);
    meshRef.current.position.z = D.current.tz;

    if (matRef.current?.color) {
      matRef.current.color.setScalar(Math.max(0.2, D.current.bri));
    }
  });

  return (
    <mesh ref={meshRef} position={[x, y, 0]}>
      <planeGeometry args={[scale * aspect, scale, 40, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={{
          uTexture: { value: texture },
          uCurve: { value: 0 },
        }}
        vertexShader={`
    uniform float uCurve;
    varying vec2 vUv;

    void main() {
      vUv = uv;

      vec3 pos = position;

      float bend = pos.x * pos.x * uCurve;
      pos.z -= bend;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
    }
  `}
        fragmentShader={`
    uniform sampler2D uTexture;
    varying vec2 vUv;

    void main(){
      gl_FragColor = texture2D(uTexture, vUv);
    }
  `}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GalleryScene
// ─────────────────────────────────────────────────────────────────────────────
function GalleryScene({ images }) {
  const groupRef = useRef();

  const urls = useMemo(
    () =>
      PHOTO_DATA.map((d, i) =>
        images?.length > 0
          ? fixUnsplash(images[i % images.length])
          : picsumURL(d[4]),
      ),
    [images],
  );

  // Render 3 vertical copies for seamless infinite wrap
  const COPIES = [-1, 0, 1];

  return (
    <>
      {/* Physics loop runs before PhotoMesh useFrames */}
      <SceneLoop groupRef={groupRef} />

      <group ref={groupRef}>
        {COPIES.map((ci) =>
          PHOTO_DATA.map(([x, y, scale, aspect, seed], i) => (
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
// Overlay
// ─────────────────────────────────────────────────────────────────────────────
function GalleryTitle() {
  return (
    <div
      style={{
        position: "fixed",
        top: "32px",
        left: "36px",
        zIndex: 10,
        pointerEvents: "none",
        animation: "cgFadeUp 1s 0.2s cubic-bezier(0.22,1,0.36,1) both",
      }}
    >
      <p
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 300,
          fontSize: "clamp(18px, 2.2vw, 30px)",
          letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.88)",
          lineHeight: 1,
          margin: 0,
        }}
      >
        Archive
      </p>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(9px, 1vw, 12px)",
          letterSpacing: "0.32em",
          color: "rgba(255,255,255,0.28)",
          marginTop: "5px",
          textTransform: "uppercase",
          margin: "5px 0 0",
        }}
      >
        2024 — Collection
      </p>
    </div>
  );
}

function ScrollIndicator() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "30px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "7px",
        zIndex: 10,
        pointerEvents: "none",
        animation: "cgFadeUpCenter 1s 1.4s cubic-bezier(0.22,1,0.36,1) both",
      }}
    >
      <div
        style={{
          width: "1px",
          height: "38px",
          background: "rgba(255,255,255,0.20)",
          animation: "cgPulseBar 2.2s ease-in-out infinite",
        }}
      />
      <span
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "9px",
          letterSpacing: "0.28em",
          color: "rgba(255,255,255,0.20)",
          textTransform: "uppercase",
        }}
      >
        scroll
      </span>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#090909",
        zIndex: 20,
      }}
    >
      <span
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "12px",
          letterSpacing: "0.4em",
          color: "rgba(255,255,255,0.25)",
          textTransform: "uppercase",
          animation: "cgBreathe 2s ease-in-out infinite",
        }}
      >
        loading
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root export
// ─────────────────────────────────────────────────────────────────────────────
export default function CylindricalGallery({ images = [] }) {
  return (
    <ScrollProvider>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap');
        @keyframes cgFadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes cgFadeUpCenter {
          from { opacity:0; transform:translateY(16px) translateX(-50%); }
          to   { opacity:1; transform:translateY(0)    translateX(-50%); }
        }
        @keyframes cgPulseBar {
          0%,100% { opacity:0.20; transform:scaleY(1);   }
          50%     { opacity:0.50; transform:scaleY(1.5); }
        }
        @keyframes cgBreathe {
          0%,100% { opacity:0.25; }
          50%     { opacity:0.60; }
        }
      `}</style>

      {/* Radial vignette */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 5,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 130% 100% at 50% 50%, transparent 18%, rgba(0,0,0,0.93) 100%)",
        }}
      />

      {/* Edge fades */}
      {["top", "bottom"].map((side) => (
        <div
          key={side}
          aria-hidden
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            [side]: 0,
            height: "15vh",
            zIndex: 6,
            pointerEvents: "none",
            background: `linear-gradient(${side === "top" ? "to bottom" : "to top"},#090909,transparent)`,
          }}
        />
      ))}

      <GalleryTitle />
      <ScrollIndicator />

      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1,
            background: "#090909",
          }}
          camera={{ position: [0, 0, 8], fov: 55, near: 0.1, far: 200 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false,
          }}
          dpr={[1, 2]}
          frameloop="always"
        >
          <ambientLight intensity={1} />
          <GalleryScene images={images} />
        </Canvas>
      </Suspense>
    </ScrollProvider>
  );
}
