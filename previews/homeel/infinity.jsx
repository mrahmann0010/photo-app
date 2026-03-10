// import { useEffect, useRef } from "react";

// export default function CurvedPhotoField({ images = [] }) {
//   const containerRef = useRef(null);
//   const photosRef = useRef([]);

//   useEffect(() => {
//     const update = () => {
//       const scrollY = window.scrollY;
//       const center = window.innerWidth / 2;

//       photosRef.current.forEach((photo) => {
//         if (!photo) return;

//         const rect = photo.getBoundingClientRect();
//         const photoCenter = rect.left + rect.width / 2;

//         const distance = photoCenter - center;

//         const curve = scrollY * 0.002;

//         const rotate = distance * curve * 0.03;

//         photo.style.transform = `
//           rotateY(${rotate}deg)
//           translateZ(${Math.abs(rotate) * -2}px)
//         `;
//       });
//     };

//     window.addEventListener("scroll", update);
//     window.addEventListener("resize", update);

//     update();

//     return () => {
//       window.removeEventListener("scroll", update);
//       window.removeEventListener("resize", update);
//     };
//   }, []);

//   return (
//     <section ref={containerRef} className="curvedField">
//       {images.map((src, i) => (
//         <img
//           key={i}
//           ref={(el) => (photosRef.current[i] = el)}
//           src={src}
//           className="photo"
//           alt=""
//         />
//       ))}

//       <style jsx>{`
//         .curvedField {
//           width: 100%;
//           min-height: 200vh;
//           padding: 12vh 6vw;
//           display: flex;
//           flex-wrap: wrap;
//           gap: 10vw 8vw;
//           justify-content: space-between;
//           perspective: 1200px;
//           background: #f5f5f5;
//         }

//         .photo {
//           width: 200px;
//           height: auto;
//           object-fit: cover;
//           border-radius: 4px;
//           transition: transform 0.1s linear;
//           transform-style: preserve-3d;
//         }

//         @media (max-width: 1000px) {
//           .photo {
//             width: 140px;
//           }
//         }

//         @media (max-width: 600px) {
//           .photo {
//             width: 100px;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }

import { useEffect, useRef } from "react";

/* ─── Photo layout: [x%, topVh, widthVw, aspectH/W, picsum‑seed] ─── */
const LAYOUT = [
  [5, 7, 21, 1.3, "11"],
  [40, 3, 17, 0.85, "22"],
  [70, 9, 20, 1.2, "33"],
  [13, 56, 24, 1.1, "44"],
  [56, 50, 20, 0.9, "55"],
  [2, 108, 18, 1.4, "66"],
  [34, 113, 23, 0.78, "77"],
  [66, 105, 21, 1.15, "88"],
  [19, 163, 19, 1.25, "99"],
  [53, 169, 25, 0.95, "110"],
  [6, 218, 22, 1.1, "121"],
  [43, 213, 17, 1.3, "132"],
  [73, 221, 18, 0.85, "143"],
];

const CMULT = 2.85; // content = 285vh

/* ── helpers ─────────────────────────────────────────────────── */
const picsumSrc = (seed, wVw, aspect) => {
  const w = Math.round(wVw * 14.4); // ~1440 ref width
  return `https://picsum.photos/seed/${seed}/${w}/${Math.round(w * aspect)}`;
};

/* ═══════════════════════════════════════════════════════════════
   CurvedPhotoField
   props:
     images  – string[]  optional; falls back to picsum
     loop    – boolean   seamless vertical loop
═══════════════════════════════════════════════════════════════ */
export default function CurvedPhotoField({ images, loop = false }) {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);
  const photosRef = useRef([]);
  const S = useRef({ scroll: 0, target: 0, vel: 0 });
  const rafRef = useRef(null);

  /* ── mount / unmount ──────────────────────────────────────── */
  useEffect(() => {
    const s = S.current;

    /* ── wheel ──────────────────────────────────────────────── */
    const onWheel = (e) => {
      e.preventDefault();
      /* smooth pixel / line / page normalisation */
      let d = e.deltaY;
      if (e.deltaMode === 1) d *= 32;
      if (e.deltaMode === 2) d *= window.innerHeight;
      s.target += d;
      clamp();
    };

    /* ── touch ──────────────────────────────────────────────── */
    let ty0 = 0,
      ty1 = 0;
    const onTS = (e) => {
      ty0 = ty1 = e.touches[0].clientY;
    };
    const onTM = (e) => {
      e.preventDefault();
      ty1 = e.touches[0].clientY;
      s.target += (ty0 - ty1) * 1.6;
      ty0 = ty1;
      clamp();
    };

    const clamp = () => {
      if (!loop) {
        const max = window.innerHeight * CMULT - window.innerHeight;
        s.target = Math.max(0, Math.min(s.target, max));
      }
    };

    /* ── RAF loop ───────────────────────────────────────────── */
    const tick = () => {
      const cH = window.innerHeight * CMULT;
      const cx = window.innerWidth * 0.5;

      /* spring‑damper inertia — "liquid" feel */
      const diff = s.target - s.scroll;
      s.vel = s.vel * 0.82 + diff * 0.07; // damped spring
      s.scroll += s.vel;

      /* loop correction */
      if (loop) {
        const wrap = (v) => ((v % cH) + cH) % cH;
        if (s.scroll >= cH) {
          s.scroll -= cH;
          s.target -= cH;
        }
        if (s.scroll < 0) {
          s.scroll += cH;
          s.target += cH;
        }
      }

      /* translate inner sheet */
      innerRef.current.style.transform = `translateY(${-s.scroll}px)`;

      /* cylindrical distortion ─ per photo ─────────────────── */
      const progress = Math.min(1, Math.abs(s.scroll) / (cH * 0.55));
      const curvature = 0.14 + progress * 0.86; // 0.14 → 1.0

      for (const el of photosRef.current) {
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const px = r.left + r.width * 0.5;
        const n = (px - cx) / cx; /* −1 … +1 */

        /* quadratic arc (not linear) */
        const q = Math.sign(n) * n * n;

        const rotY = q * 8.5 * curvature;
        const tz = -(n * n) * 95 * curvature;
        const sc = 1 - n * n * 0.055 * curvature;
        const bri = 1 - n * n * 0.12 * curvature; /* subtle edge darkening */

        el.style.transform = `rotateY(${rotY}deg) translateZ(${tz}px) scale(${sc})`;
        el.style.filter = `brightness(${bri})`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTS, { passive: false });
    window.addEventListener("touchmove", onTM, { passive: false });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTS);
      window.removeEventListener("touchmove", onTM);
    };
  }, [loop]);

  /* ── build photo data ─────────────────────────────────────── */
  const items = LAYOUT.map(([x, top, w, asp, seed], i) => ({
    src: images?.[i % images.length] ?? picsumSrc(seed, w, asp),
    x,
    top,
    w,
  }));

  /* ── render one set of photos (duplicated when loop=true) ─── */
  const renderSet = (si) =>
    items.map(({ src, x, top, w }, i) => (
      <img
        key={`${si}-${i}`}
        ref={(el) => {
          photosRef.current[si * items.length + i] = el;
        }}
        src={src}
        alt=""
        draggable={false}
        style={{
          position: "absolute",
          left: `${x}%`,
          top: `calc(${top}vh + ${si * CMULT * 100}vh)`,
          width: `${w}vw`,
          height: "auto",
          objectFit: "cover",
          borderRadius: "3px",
          transformStyle: "preserve-3d",
          willChange: "transform, filter",
          userSelect: "none",
          pointerEvents: "none",
          display: "block",
          animation: `fadeUp ${0.6 + i * 0.04}s cubic-bezier(0.22,1,0.36,1) both`,
        }}
      />
    ));

  /* ── render ───────────────────────────────────────────────── */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow: hidden; background: #080808; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px) rotateY(0deg); }
          to   { opacity: 1; }
        }

        @keyframes pulse {
          0%,100% { opacity: 0.35; transform: scaleY(1);   }
          50%      { opacity: 0.7;  transform: scaleY(1.5); }
        }
      `}</style>

      {/* ── outer perspective stage ── */}
      <div
        ref={wrapRef}
        style={{
          position: "fixed",
          inset: 0,
          overflow: "hidden",
          perspective: "1100px",
          perspectiveOrigin: "50% 48%",
          background: "#080808",
        }}
      >
        {/* vignette */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            background:
              "radial-gradient(ellipse 130% 100% at 50% 50%, transparent 30%, rgba(0,0,0,0.82) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* top + bottom fade bars */}
        {["top:0", "bottom:0"].map((side, k) => (
          <div
            key={k}
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              [side.split(":")[0]]: 0,
              height: "12vh",
              zIndex: 4,
              background: `linear-gradient(${k ? "to top" : "to bottom"}, #080808, transparent)`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* ── scrolling sheet ── */}
        <div
          ref={innerRef}
          style={{
            position: "relative",
            width: "100%",
            height: `${CMULT * 100 * (loop ? 2 : 1)}vh`,
          }}
        >
          {renderSet(0)}
          {loop && renderSet(1)}
        </div>

        {/* ── minimal UI label ── */}
        <div
          style={{
            position: "fixed",
            bottom: "28px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: "1px",
              height: "28px",
              background: "rgba(255,255,255,0.3)",
              animation: "pulse 1.8s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "11px",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.28)",
              textTransform: "uppercase",
            }}
          >
            scroll
          </span>
        </div>
      </div>
    </>
  );
}
