// // import SwiperMain from "../Components/SwiperMain";

// // export default function About () {

// //   return (
// //     <section className="py-4 bg-green-700">
// //         <SwiperMain />
// //     </section>
// //   );
// // }

// // /* ─── Photo layout: [x%, topVh, widthVw, aspectH/W, picsum‑seed] ─── */
// // const LAYOUT = [
// //   [5, 7, 21, 1.3, "11"],
// //   [40, 3, 17, 0.85, "22"],
// //   [70, 9, 20, 1.2, "33"],
// //   [13, 56, 24, 1.1, "44"],
// //   [56, 50, 20, 0.9, "55"],
// //   [2, 108, 18, 1.4, "66"],
// //   [34, 113, 23, 0.78, "77"],
// //   [66, 105, 21, 1.15, "88"],
// //   [19, 163, 19, 1.25, "99"],
// //   [53, 169, 25, 0.95, "110"],
// //   [6, 218, 22, 1.1, "121"],
// //   [43, 213, 17, 1.3, "132"],
// //   [73, 221, 18, 0.85, "143"],
// // ];

// // const CMULT = 2.85; // content = 285vh

// /* ── helpers ─────────────────────────────────────────────────── */
// // const picsumSrc = (seed, wVw, aspect) => {
// //   const w = Math.round(wVw * 14.4); // ~1440 ref width
// //   return `https://picsum.photos/seed/${seed}/${w}/${Math.round(w * aspect)}`;
// // };

// // /* ═══════════════════════════════════════════════════════════════
// //    CurvedPhotoField
// //    props:
// //      images  – string[]  optional; falls back to picsum
// //      loop    – boolean   seamless vertical loop
// // ═══════════════════════════════════════════════════════════════ */
// // export default function CurvedPhotoField({ images, loop = false }) {
// //   const wrapRef = useRef(null);
// //   const innerRef = useRef(null);
// //   const photosRef = useRef([]);
// //   const S = useRef({ scroll: 0, target: 0, vel: 0 });
// //   const rafRef = useRef(null);

// //   /* ── mount / unmount ──────────────────────────────────────── */
// //   useEffect(() => {
// //     const s = S.current;

// //     /* ── wheel ──────────────────────────────────────────────── */
// //     const onWheel = (e) => {
// //       e.preventDefault();
// //       /* smooth pixel / line / page normalisation */
// //       let d = e.deltaY;
// //       if (e.deltaMode === 1) d *= 32;
// //       if (e.deltaMode === 2) d *= window.innerHeight;
// //       s.target += d;
// //       clamp();
// //     };

// //     /* ── touch ──────────────────────────────────────────────── */
// //     let ty0 = 0,
// //       ty1 = 0;
// //     const onTS = (e) => {
// //       ty0 = ty1 = e.touches[0].clientY;
// //     };
// //     const onTM = (e) => {
// //       e.preventDefault();
// //       ty1 = e.touches[0].clientY;
// //       s.target += (ty0 - ty1) * 1.6;
// //       ty0 = ty1;
// //       clamp();
// //     };

// //     const clamp = () => {
// //       if (!loop) {
// //         const max = window.innerHeight * CMULT - window.innerHeight;
// //         s.target = Math.max(0, Math.min(s.target, max));
// //       }
// //     };

// //     /* ── RAF loop ───────────────────────────────────────────── */
// //     const tick = () => {
// //       const cH = window.innerHeight * CMULT;
// //       const cx = window.innerWidth * 0.5;

// //       /* spring‑damper inertia — "liquid" feel */
// //       const diff = s.target - s.scroll;
// //       s.vel = s.vel * 0.82 + diff * 0.07; // damped spring
// //       s.scroll += s.vel;

// //       /* loop correction */
// //       if (loop) {
// //         const wrap = (v) => ((v % cH) + cH) % cH;
// //         if (s.scroll >= cH) {
// //           s.scroll -= cH;
// //           s.target -= cH;
// //         }
// //         if (s.scroll < 0) {
// //           s.scroll += cH;
// //           s.target += cH;
// //         }
// //       }

// //       /* translate inner sheet */
// //       innerRef.current.style.transform = `translateY(${-s.scroll}px)`;

// //       /* cylindrical distortion ─ per photo ─────────────────── */
// //       const progress = Math.min(1, Math.abs(s.scroll) / (cH * 0.55));
// //       const curvature = 0.14 + progress * 0.86; // 0.14 → 1.0

// //       for (const el of photosRef.current) {
// //         if (!el) continue;
// //         const r = el.getBoundingClientRect();
// //         const px = r.left + r.width * 0.5;
// //         const n = (px - cx) / cx; /* −1 … +1 */

// //         /* quadratic arc (not linear) */
// //         const q = Math.sign(n) * n * n;

// //         const rotY = q * 8.5 * curvature;
// //         const tz = -(n * n) * 95 * curvature;
// //         const sc = 1 - n * n * 0.055 * curvature;
// //         const bri = 1 - n * n * 0.12 * curvature; /* subtle edge darkening */

// //         el.style.transform = `rotateY(${rotY}deg) translateZ(${tz}px) scale(${sc})`;
// //         el.style.filter = `brightness(${bri})`;
// //       }

// //       rafRef.current = requestAnimationFrame(tick);
// //     };

// //     window.addEventListener("wheel", onWheel, { passive: false });
// //     window.addEventListener("touchstart", onTS, { passive: false });
// //     window.addEventListener("touchmove", onTM, { passive: false });
// //     rafRef.current = requestAnimationFrame(tick);

// //     return () => {
// //       cancelAnimationFrame(rafRef.current);
// //       window.removeEventListener("wheel", onWheel);
// //       window.removeEventListener("touchstart", onTS);
// //       window.removeEventListener("touchmove", onTM);
// //     };
// //   }, [loop]);

// //   /* ── build photo data ─────────────────────────────────────── */
// //   const items = LAYOUT.map(([x, top, w, asp, seed], i) => ({
// //     src: images?.[i % images.length] ?? picsumSrc(seed, w, asp),
// //     x,
// //     top,
// //     w,
// //   }));

// //   /* ── render one set of photos (duplicated when loop=true) ─── */
// //   const renderSet = (si) =>
// //     items.map(({ src, x, top, w }, i) => (
// //       <img
// //         key={`${si}-${i}`}
// //         ref={(el) => {
// //           photosRef.current[si * items.length + i] = el;
// //         }}
// //         src={src}
// //         alt=""
// //         draggable={false}
// //         style={{
// //           position: "absolute",
// //           left: `${x}%`,
// //           top: `calc(${top}vh + ${si * CMULT * 100}vh)`,
// //           width: `${w}vw`,
// //           height: "auto",
// //           objectFit: "cover",
// //           borderRadius: "3px",
// //           transformStyle: "preserve-3d",
// //           willChange: "transform, filter",
// //           userSelect: "none",
// //           pointerEvents: "none",
// //           display: "block",
// //           animation: `fadeUp ${0.6 + i * 0.04}s cubic-bezier(0.22,1,0.36,1) both`,
// //         }}
// //       />
// //     ));

// //   /* ── render ───────────────────────────────────────────────── */
// //   return (
// //     <>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap');

// //         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
// //         html, body { overflow: hidden; background: #080808; }

// //         @keyframes fadeUp {
// //           from { opacity: 0; transform: translateY(18px) rotateY(0deg); }
// //           to   { opacity: 1; }
// //         }

// //         @keyframes pulse {
// //           0%,100% { opacity: 0.35; transform: scaleY(1);   }
// //           50%      { opacity: 0.7;  transform: scaleY(1.5); }
// //         }
// //       `}</style>

// //       {/* ── outer perspective stage ── */}
// //       <div
// //         ref={wrapRef}
// //         style={{
// //           position: "fixed",
// //           inset: 0,
// //           overflow: "hidden",
// //           perspective: "1100px",
// //           perspectiveOrigin: "50% 48%",
// //           background: "#080808",
// //         }}
// //       >
// //         {/* vignette */}
// //         <div
// //           aria-hidden
// //           style={{
// //             position: "absolute",
// //             inset: 0,
// //             zIndex: 3,
// //             background:
// //               "radial-gradient(ellipse 130% 100% at 50% 50%, transparent 30%, rgba(0,0,0,0.82) 100%)",
// //             pointerEvents: "none",
// //           }}
// //         />

// //         {/* top + bottom fade bars */}
// //         {["top:0", "bottom:0"].map((side, k) => (
// //           <div
// //             key={k}
// //             aria-hidden
// //             style={{
// //               position: "absolute",
// //               left: 0,
// //               right: 0,
// //               [side.split(":")[0]]: 0,
// //               height: "12vh",
// //               zIndex: 4,
// //               background: `linear-gradient(${k ? "to top" : "to bottom"}, #080808, transparent)`,
// //               pointerEvents: "none",
// //             }}
// //           />
// //         ))}

// //         {/* ── scrolling sheet ── */}
// //         <div
// //           ref={innerRef}
// //           style={{
// //             position: "relative",
// //             width: "100%",
// //             height: `${CMULT * 100 * (loop ? 2 : 1)}vh`,
// //           }}
// //         >
// //           {renderSet(0)}
// //           {loop && renderSet(1)}
// //         </div>

// //         {/* ── minimal UI label ── */}
// //         <div
// //           style={{
// //             position: "fixed",
// //             bottom: "28px",
// //             left: "50%",
// //             transform: "translateX(-50%)",
// //             zIndex: 5,
// //             display: "flex",
// //             flexDirection: "column",
// //             alignItems: "center",
// //             gap: "8px",
// //             pointerEvents: "none",
// //           }}
// //         >
// //           <div
// //             style={{
// //               width: "1px",
// //               height: "28px",
// //               background: "rgba(255,255,255,0.3)",
// //               animation: "pulse 1.8s ease-in-out infinite",
// //             }}
// //           />
// //           <span
// //             style={{
// //               fontFamily: "'Cormorant Garamond', serif",
// //               fontStyle: "italic",
// //               fontWeight: 300,
// //               fontSize: "11px",
// //               letterSpacing: "0.2em",
// //               color: "rgba(255,255,255,0.28)",
// //               textTransform: "uppercase",
// //             }}
// //           >
// //             scroll
// //           </span>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // import React, { useRef, useMemo, useEffect } from "react";
// // import * as THREE from "three";
// // import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
// // import { shaderMaterial } from "@react-three/drei";

// // /**
// //  * ==========================================
// //  * 1. THE GLSL SHADERS (The 'Liquid' Math)
// //  * ==========================================
// //  */

// // // Vertex Shader: Projects the 3D plane into 2D screen space.
// // const vertexShader = `
// //   varying vec2 vUv;
// //   void main() {
// //     vUv = uv;
// //     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// //   }
// // `;

// // // Fragment Shader: Controls the visual look of the liquid warp.
// // // It uses a dynamic displacement map to offset pixels.
// // const fragmentShader = `
// //   varying vec2 vUv;
// //   uniform sampler2D uTexture;
// //   uniform sampler2D uDisplacementMap;
// //   uniform float uDistortionStrength;

// //   void main() {
// //     // Read the displacement map (it's grayscale, so we use .r)
// //     float displacement = texture2D(uDisplacementMap, vUv).r;

// //     // Shift the main texture coordinates based on the displacement.
// //     // The distortion pattern is proportional to the input map.
// //     vec2 distortedUv = vUv + displacement * uDistortionStrength;

// //     // Standard texture lookup using distorted UVs
// //     vec4 color = texture2D(uTexture, distortedUv);

// //     gl_FragColor = color;
// //   }
// // `;

// // /**
// //  * ==========================================
// //  * 2. THE CUSTOM SHADER MATERIAL
// //  * ==========================================
// //  */
// // // This function bridges GLSL variables (uniforms) and React props.
// // const LiquidDistortionMaterial = shaderMaterial(
// //   {
// //     uTexture: new THREE.Texture(),
// //     uDisplacementMap: new THREE.Texture(),
// //     uDistortionStrength: 0.15, // Sensitivity: lower is smoother.
// //   },
// //   vertexShader,
// //   fragmentShader,
// // );

// // extend({ LiquidDistortionMaterial });

// // /**
// //  * ==========================================
// //  * 3. THE INTERACTIVE SCENE COMPONENT
// //  * ==========================================
// //  */
// // const InteractiveFluidPlane = ({ imageSrc }) => {
// //   const meshRef = useRef();
// //   const materialRef = useRef();
// //   const { viewport } = useThree();

// //   // Create a dedicated 2D Canvas to draw blurred mouse "blobs"
// //   const [fluidCanvas, fluidContext, fluidTexture] = useMemo(() => {
// //     const canvas = document.createElement("canvas");
// //     canvas.width = canvas.height = 256; // Standard size for displacement maps
// //     const ctx = canvas.getContext("2d");
// //     const texture = new THREE.CanvasTexture(canvas);
// //     return [canvas, ctx, texture];
// //   }, []);

// //   // Set up mouse interaction loop
// //   useFrame(({ mouse }) => {
// //     if (!materialRef.current || !fluidContext) return;

// //     // A. Clear the fluid canvas with slight decay (creates trails)
// //     fluidContext.fillStyle = "rgba(0, 0, 0, 0.05)"; // Slowly fade trail
// //     fluidContext.fillRect(0, 0, fluidCanvas.width, fluidCanvas.height);

// //     // B. Transform mouse coords (-1 to 1) to canvas pixels (0 to 256)
// //     const normalizedX = (mouse.x + 1) / 2;
// //     const normalizedY = (-mouse.y + 1) / 2; // Invert Y for shader space
// //     const targetX = normalizedX * fluidCanvas.width;
// //     const targetY = normalizedY * fluidCanvas.height;

// //     // C. Draw a blurred mouse blob (Radial Gradient)
// //     fluidContext.beginPath();
// //     const radius = 35; // Size of the interactive ripple zone
// //     const gradient = fluidContext.createRadialGradient(
// //       targetX,
// //       targetY,
// //       0,
// //       targetX,
// //       targetY,
// //       radius,
// //     );
// //     gradient.addColorStop(0, "rgba(255, 255, 255, 1.0)"); // Center is white
// //     gradient.addColorStop(1, "rgba(255, 255, 255, 0.0)"); // Edges dissolve to black
// //     fluidContext.fillStyle = gradient;
// //     fluidContext.arc(targetX, targetY, radius, 0, Math.PI * 2);
// //     fluidContext.fill();

// //     // D. Update the texture flag and assign it to the material.
// //     fluidTexture.needsUpdate = true;
// //     materialRef.current.uDisplacementMap = fluidTexture;
// //   });

// //   // Load the main hero background texture
// //   const mainHeroTexture = useMemo(() => {
// //     return new THREE.TextureLoader().load(imageSrc);
// //   }, [imageSrc]);

// //   return (
// //     <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
// //       <planeGeometry args={[1, 1]} />
// //       <liquidDistortionMaterial
// //         ref={materialRef}
// //         uTexture={mainHeroTexture}
// //         transparent
// //       />
// //     </mesh>
// //   );
// // };

// // /**
// //  * ==========================================
// //  * 4. THE MAIN EXPORTED HERO COMPONENT
// //  * ==========================================
// //  */
// // const LiquidDistortionHero = () => {
// //   const heroImage =
// //     "https://images.unsplash.com/photo-1598214210664-968b55502c46?q=80&w=1600&auto=format&fit=crop";

// //   return (
// //     <div
// //       className="hero-container"
// //       style={{
// //         width: "100vw",
// //         height: "100vh",
// //         position: "relative",
// //         overflow: "hidden",
// //         backgroundColor: "#050505",
// //       }}
// //     >
// //       {/* 1. The WebGL Canvas covering the full screen */}
// //       <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 1] }}>
// //         <InteractiveFluidPlane imageSrc={heroImage} />
// //       </Canvas>

// //       {/* 2. Standard HTML Content (Menus, Titles) */}
// //       <div
// //         style={{
// //           position: "absolute",
// //           top: "50px",
// //           left: "50px",
// //           fontFamily: " serif",
// //           color: "#f0f0f0",
// //           zIndex: 10,
// //           mixBlendMode: "difference", // Makes text readable over the graphic
// //         }}
// //       >
// //         <h1 style={{ fontSize: "3rem", margin: 0 }}>LIQUID CANVAS</h1>
// //         <p style={{ opacity: 0.8 }}>WebGL DISTORTION ENGINE</p>
// //       </div>

// //       <div
// //         style={{
// //           position: "absolute",
// //           bottom: "20px",
// //           right: "20px",
// //           fontSize: "0.8rem",
// //           color: "white",
// //           zIndex: 10,
// //         }}
// //       >
// //         A. I. / 2026
// //       </div>
// //     </div>
// //   );
// // };

// // export default LiquidDistortionHero;

// import React, { useRef, useMemo } from "react";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { Image, ScrollControls, useScroll, Scroll } from "@react-three/drei";
// import * as THREE from "three";

// // 1. DATA: Define the "Editorial" scattered layout
// const PHOTO_DATA = [
//   {
//     url: "https://images.unsplash.com/photo-1515462277126-2dd0c162007a",
//     pos: [-3, 4, 0],
//     scale: [2, 3],
//   },
//   {
//     url: "https://images.unsplash.com/photo-1500462859273-50033564d13f",
//     pos: [3, 3, 0],
//     scale: [3, 2],
//   },
//   {
//     url: "https://images.unsplash.com/photo-1492691523567-307300298fb9",
//     pos: [0, 0, 0],
//     scale: [2.5, 3.5],
//   },
//   {
//     url: "https://images.unsplash.com/photo-1518173946687-a4c8a9b746f5",
//     pos: [-4, -2, 0],
//     scale: [3, 2.5],
//   },
//   {
//     url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
//     pos: [4, -4, 0],
//     scale: [2, 3],
//   },
//   {
//     url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
//     pos: [-2, -7, 0],
//     scale: [4, 2.5],
//   },
// ];

// /**
//  * 2. COMPONENT: Individual Photo Tile
//  * This tile monitors its own position relative to the center
//  * and applies the cylindrical math.
//  */
// const CylinderPhoto = ({ url, pos, scale, bendMultiplier }) => {
//   const ref = useRef();

//   useFrame((state) => {
//     if (!ref.current) return;

//     // The horizontal distance from center (X is static in layout)
//     const x = pos[0];

//     // Calculate Curvature:
//     // bendMultiplier increases with scroll.
//     // We use x^2 to make the depth drop-off non-linear (an arc).
//     const zOffset = -(Math.pow(x, 2) * 0.15) * bendMultiplier;

//     // Calculate Rotation:
//     // Images on the left rotate right, images on the right rotate left.
//     const yRotation = x * 0.1 * bendMultiplier;

//     // Apply transformations smoothly
//     ref.current.position.z = THREE.MathUtils.lerp(
//       ref.current.position.z,
//       zOffset,
//       0.1,
//     );
//     ref.current.rotation.y = THREE.MathUtils.lerp(
//       ref.current.rotation.y,
//       yRotation,
//       0.1,
//     );
//   });

//   return (
//     <group position={pos}>
//       <Image
//         ref={ref}
//         url={url}
//         scale={scale}
//         grayscale={0.2}
//         transparent
//         side={THREE.DoubleSide}
//       />
//     </group>
//   );
// };

// /**
//  * 3. COMPONENT: The Scene Wrapper
//  */
// const Scene = () => {
//   const scroll = useScroll();
//   const [bend, setBend] = React.useState(0);

//   useFrame(() => {
//     // scroll.offset goes from 0 to 1.
//     // At top (0), bend is subtle. At bottom (1), bend is stronger.
//     const targetBend = 0.5 + scroll.offset * 2.5;
//     setBend(targetBend);
//   });

//   return (
//     <Scroll>
//       {PHOTO_DATA.map((img, i) => (
//         <CylinderPhoto
//           key={i}
//           url={img.url}
//           pos={img.pos}
//           scale={img.scale}
//           bendMultiplier={bend}
//         />
//       ))}
//     </Scroll>
//   );
// };

// /**
//  * 4. MAIN COMPONENT
//  */
// export default function CurvedGallery() {
//   return (
//     <div style={{ width: "100vw", height: "100vh", background: "#0a0a0a" }}>
//       <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
//         {/* damping: 0.3 creates the smooth "luxury" scroll feel */}
//         <ScrollControls pages={3} damping={0.3}>
//           <Scene />
//         </ScrollControls>
//       </Canvas>

//       {/* Overlay UI */}
//       <div
//         style={{
//           position: "fixed",
//           top: "40px",
//           left: "40px",
//           color: "white",
//           pointerEvents: "none",
//         }}
//       >
//         <h1 style={{ fontWeight: 300, fontSize: "12px", letterSpacing: "2px" }}>
//           RICHARD PRESCOTT / ARCHIVE
//         </h1>
//       </div>
//     </div>
//   );
// }

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image, ScrollControls, useScroll, Scroll } from "@react-three/drei";
import * as THREE from "three";

// 1. DATA: Using more reliable IDs.
// Added a unique 'id' for the React Key requirement.
const PHOTO_DATA = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?auto=format&fit=crop&w=800&q=80",
    pos: [-3, 4, 0],
    scale: [2, 3],
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=800&q=80",
    pos: [3, 3, 0],
    scale: [3, 2],
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1492691523567-307300298fb9?auto=format&fit=crop&w=800&q=80",
    pos: [0, 0, 0],
    scale: [2.5, 3.5],
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1518173946687-a4c8a9b746f5?auto=format&fit=crop&w=800&q=80",
    pos: [-4, -2, 0],
    scale: [3, 2.5],
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    pos: [4, -4, 0],
    scale: [2, 3],
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    pos: [-2, -7, 0],
    scale: [4, 2.5],
  },
];

const CylinderPhoto = ({ url, pos, scale, bendMultiplier }) => {
  const ref = useRef();

  useFrame(() => {
    if (!ref.current) return;

    // The horizontal distance from center
    const x = pos[0];

    // ARC MATH: Depth (z) follows a parabolic curve (x squared)
    // This creates the "cylinder" or "V-shape" you described.
    const zOffset = -(Math.pow(x, 2) * 0.1) * bendMultiplier;

    // ROTATION MATH: Rotation scales linearly with x
    const yRotation = x * 0.08 * bendMultiplier;

    // Smoothly interpolate (lerp) to the target values
    ref.current.position.z = THREE.MathUtils.lerp(
      ref.current.position.z,
      zOffset,
      0.1,
    );
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      yRotation,
      0.1,
    );
  });

  return (
    <group position={pos}>
      <Image
        ref={ref}
        url={url}
        scale={scale}
        transparent
        side={THREE.DoubleSide}
        // This prevents the whole app from crashing if one image fails
        onError={(e) => console.error("Loading error:", e)}
      />
    </group>
  );
};

const Scene = () => {
  const scroll = useScroll();
  const groupRef = useRef();

  useFrame((state) => {
    // scroll.offset is 0 to 1.
    // We calculate the bend intensity based on scroll progress.
    const bendIntensity = 0.5 + scroll.offset * 2.0;

    // Apply that intensity to all children
    groupRef.current.children.forEach((child, i) => {
      // We pass the bendIntensity logic via refs or state,
      // but here we just update the group's internal logic.
    });

    // Update a "bend" variable that children can see (using a ref for performance)
    state.bend = bendIntensity;
  });

  return (
    <Scroll>
      <group ref={groupRef}>
        {PHOTO_DATA.map((img) => (
          <CylinderPhoto
            key={img.id} // FIX 1: Unique key for React
            url={img.url}
            pos={img.pos}
            scale={img.scale}
            bendMultiplier={1.5} // Initial bend
          />
        ))}
      </group>
    </Scroll>
  );
};

export default function CurvedGallery() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#050505" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
        <ScrollControls pages={4} damping={0.2}>
          <Scene />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
