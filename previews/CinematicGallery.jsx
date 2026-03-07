import { useState, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";

/* ─── Font & Global Styles ─────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:       #080808;
    --surface:  #0f0f0f;
    --border:   rgba(255,255,255,0.06);
    --text:     #e9e3d8;
    --muted:    #4a4540;
    --gold:     #c8a97e;
    --gold-dim: rgba(200,169,126,0.15);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }

  ::selection { background: var(--gold-dim); color: var(--gold); }

  /* Noise grain overlay */
  .grain::after {
    content: '';
    position: fixed;
    inset: -200%;
    width: 400%; height: 400%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    background-size: 200px 200px;
    opacity: 0.04;
    pointer-events: none;
    z-index: 9999;
    animation: grain-drift 8s steps(2) infinite;
  }

  @keyframes grain-drift {
    0%   { transform: translate(0,0); }
    20%  { transform: translate(-3%,-4%); }
    40%  { transform: translate(-5%, 3%); }
    60%  { transform: translate(4%,-2%); }
    80%  { transform: translate(2%, 4%); }
    100% { transform: translate(0, 0); }
  }

  .serif { font-family: 'Cormorant Garamond', Georgia, serif; }

  /* Image zoom on parent hover */
  .img-zoom-wrap { overflow: hidden; }
  .img-zoom-wrap img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                filter 0.6s ease;
    will-change: transform;
  }
  .img-zoom-wrap:hover img,
  .tile-hovered .img-zoom-wrap img {
    transform: scale(1.06);
  }

  /* Cursor crosshair on images */
  .tile-image-area { cursor: crosshair; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--muted); border-radius: 2px; }
`;

/* ─── Mock Data ─────────────────────────────────────────────────────────── */
const GALLERIES = [
  {
    index: "01",
    slug: "swiss",
    title: "Swiss Alps",
    subtitle: "Mountain Light",
    year: "2023",
    count: 24,
    location: "Switzerland",
    hero: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85",
    secondary: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80",
    tertiary: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
  },
  {
    index: "02",
    slug: "forest",
    title: "Dark Forest",
    subtitle: "Shadows & Light",
    year: "2023",
    count: 18,
    location: "Black Forest, Germany",
    hero: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=85",
    secondary: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    tertiary: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=600&q=80",
  },
  {
    index: "03",
    slug: "tropics",
    title: "Tropics",
    subtitle: "Equatorial Study",
    year: "2022",
    count: 31,
    location: "Costa Rica",
    hero: "https://images.unsplash.com/photo-1503785640985-f62e3aeee448?w=1200&q=85",
    secondary: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80",
    tertiary: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80",
  },
];

/* ─── Utility: stagger container ────────────────────────────────────────── */
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
};

/* ─── GalleryTile ────────────────────────────────────────────────────────── */
function GalleryTile({ gallery, index: tileIndex }) {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const tileRef = useRef(null);
  const isInView = useInView(tileRef, { once: true, margin: "-10% 0px -10% 0px" });

  /* Mouse parallax for the hero image */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const imgX = useTransform(springX, [-0.5, 0.5], ["-4%", "4%"]);
  const imgY = useTransform(springY, [-0.5, 0.5], ["-3%", "3%"]);

  const handleMouseMove = (e) => {
    const rect = tileRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  const isEven = tileIndex % 2 === 0;

  return (
    <motion.div
      ref={tileRef}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={staggerContainer}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => console.log(`Navigate to /photos/${gallery.slug}`)}
      style={{
        cursor: "pointer",
        padding: "clamp(40px, 6vw, 80px) clamp(20px, 6vw, 80px)",
        borderTop: "1px solid var(--border)",
        display: "grid",
        gridTemplateColumns: isEven ? "1fr 1.6fr" : "1.6fr 1fr",
        gap: "clamp(24px, 4vw, 60px)",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Background index number ── */}
      <motion.span
        variants={fadeIn}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(120px, 22vw, 300px)",
          fontWeight: 300,
          color: "rgba(255,255,255,0.025)",
          lineHeight: 1,
          letterSpacing: "-0.05em",
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          transition: "color 0.5s ease",
          ...(hovered && { color: "rgba(200,169,126,0.045)" }),
        }}
      >
        {gallery.index}
      </motion.span>

      {/* ── Text Column (order depends on even/odd) ── */}
      <motion.div
        variants={staggerContainer}
        style={{
          order: isEven ? 0 : 1,
          display: "flex",
          flexDirection: "column",
          gap: "clamp(12px, 2vw, 20px)",
          zIndex: 1,
        }}
      >
        {/* Index pill */}
        <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              transition: "opacity 0.3s",
            }}
          >
            {gallery.index}
          </span>
          <span style={{ width: "32px", height: "1px", background: "var(--gold)", opacity: 0.4 }} />
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            {gallery.year}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          variants={fadeUp}
          className="serif"
          style={{
            fontSize: "clamp(2.6rem, 5.5vw, 5.5rem)",
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            transition: "color 0.4s ease",
            ...(hovered && { color: "#fff" }),
          }}
        >
          {gallery.title}
        </motion.h2>

        {/* Subtitle + Location */}
        <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span
            className="serif"
            style={{
              fontSize: "clamp(0.95rem, 1.5vw, 1.25rem)",
              fontStyle: "italic",
              color: "var(--gold)",
              fontWeight: 300,
            }}
          >
            {gallery.subtitle}
          </span>
          <span
            style={{
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            {gallery.location}
          </span>
        </motion.div>

        {/* CTA Row */}
        <motion.div
          variants={fadeUp}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginTop: "8px",
          }}
        >
          {/* Explore button */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", overflow: "hidden" }}>
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: hovered ? "var(--text)" : "var(--muted)",
                transition: "color 0.4s ease",
              }}
            >
              View Collection
            </span>
            <motion.span
              animate={{ x: hovered ? 6 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                color: "var(--gold)",
                fontSize: "16px",
              }}
            >
              →
            </motion.span>
          </div>

          {/* Divider */}
          <span style={{ width: "1px", height: "14px", background: "var(--border)" }} />

          {/* Count */}
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            {gallery.count} photos
          </span>
        </motion.div>
      </motion.div>

      {/* ── Image Column ── */}
      <motion.div
        variants={fadeUp}
        style={{
          order: isEven ? 1 : 0,
          zIndex: 1,
          display: "grid",
          gridTemplateRows: "auto auto",
          gridTemplateColumns: "1.6fr 1fr",
          gap: "6px",
          height: "clamp(280px, 40vw, 540px)",
        }}
      >
        {/* Hero image — spans both rows */}
        <motion.div
          className="img-zoom-wrap tile-image-area"
          style={{
            gridRow: "1 / 3",
            gridColumn: "1",
            position: "relative",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <motion.div style={{ x: imgX, y: imgY, width: "108%", height: "108%", marginLeft: "-4%" }}>
            <img
              src={gallery.hero}
              alt={gallery.title}
              onLoad={() => setImgLoaded(true)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: imgLoaded ? "none" : "blur(8px)",
                transform: hovered ? "scale(1.04)" : "scale(1)",
                transition: "transform 1.0s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s ease",
              }}
            />
          </motion.div>
          {/* Overlay gradient on hover */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(8,8,8,0.65) 0%, transparent 50%)",
              pointerEvents: "none",
            }}
          />
          {/* Corner accent */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid rgba(200,169,126,0.7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--gold)",
                  fontSize: "14px",
                }}
              >
                ↗
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Secondary image — top right */}
        <div
          className="img-zoom-wrap tile-image-area"
          style={{ gridRow: 1, gridColumn: 2, borderRadius: "2px", overflow: "hidden" }}
        >
          <img
            src={gallery.secondary}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
              transitionDelay: "0.05s",
            }}
          />
        </div>

        {/* Tertiary image — bottom right */}
        <div
          className="img-zoom-wrap tile-image-area"
          style={{ gridRow: 2, gridColumn: 2, borderRadius: "2px", overflow: "hidden" }}
        >
          <img
            src={gallery.tertiary}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
              transitionDelay: "0.1s",
            }}
          />
        </div>
      </motion.div>

      {/* Bottom scanline on hover */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "1px",
          background: "linear-gradient(to right, transparent, var(--gold), transparent)",
          transformOrigin: "left",
        }}
      />
    </motion.div>
  );
}

/* ─── Page Header ────────────────────────────────────────────────────────── */
function PageHeader() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.header
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={staggerContainer}
      style={{
        padding: "clamp(60px, 10vw, 130px) clamp(20px, 6vw, 80px) clamp(30px, 5vw, 60px)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        position: "relative",
      }}
    >
      {/* Eyebrow */}
      <motion.div
        variants={fadeUp}
        style={{ display: "flex", alignItems: "center", gap: "14px" }}
      >
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--gold)",
            fontWeight: 400,
          }}
        >
          Photography
        </span>
        <span style={{ width: "40px", height: "1px", background: "var(--gold)", opacity: 0.4 }} />
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          Selected Works
        </span>
      </motion.div>

      {/* Main title */}
      <div style={{ overflow: "hidden" }}>
        <motion.h1
          variants={{
            hidden: { y: "100%", opacity: 0 },
            show: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="serif"
          style={{
            fontSize: "clamp(3rem, 10vw, 10rem)",
            fontWeight: 300,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            color: "var(--text)",
          }}
        >
          Collections
        </motion.h1>
      </div>

      {/* Descriptor line */}
      <motion.p
        variants={fadeUp}
        style={{
          fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
          color: "var(--muted)",
          letterSpacing: "0.06em",
          maxWidth: "380px",
          lineHeight: 1.6,
          marginTop: "4px",
        }}
      >
        A curated archive of light, landscape, and lived moments.
        <br />
        {GALLERIES.length} collections · {GALLERIES.reduce((a, g) => a + g.count, 0)} photographs.
      </motion.p>

      {/* Decorative rule */}
      <motion.div
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 } },
        }}
        style={{
          position: "absolute",
          bottom: 0,
          left: "clamp(20px, 6vw, 80px)",
          right: "clamp(20px, 6vw, 80px)",
          height: "1px",
          background: "var(--border)",
          transformOrigin: "left",
        }}
      />
    </motion.header>
  );
}

/* ─── Gallery Stats Bar ─────────────────────────────────────────────────── */
function StatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { label: "Collections", value: GALLERIES.length },
    { label: "Photographs", value: GALLERIES.reduce((a, g) => a + g.count, 0) },
    { label: "Countries", value: 3 },
    { label: "Years Active", value: "2019–" },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{
        display: "flex",
        gap: "0",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        margin: "0 clamp(20px, 6vw, 80px)",
      }}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          style={{
            flex: 1,
            padding: "clamp(14px, 2vw, 24px) clamp(12px, 2vw, 28px)",
            borderRight: i < stats.length - 1 ? "1px solid var(--border)" : "none",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <span
            className="serif"
            style={{
              fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
              fontWeight: 300,
              color: "var(--text)",
              letterSpacing: "-0.02em",
            }}
          >
            {stat.value}
          </span>
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

/* ─── Photos Page ────────────────────────────────────────────────────────── */
export default function Photos() {
  return (
    <>
      <style>{STYLES}</style>

      <motion.div
        className="grain"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          minHeight: "100vh",
          background: "var(--bg)",
          color: "var(--text)",
        }}
      >
        {/* ── Page Header ── */}
        <PageHeader />

        {/* ── Stats Bar ── */}
        <StatsBar />

        {/* ── Gallery Tiles ── */}
        <div style={{ paddingBottom: "clamp(60px, 10vw, 120px)" }}>
          {GALLERIES.map((gallery, index) => (
            <GalleryTile key={gallery.slug} gallery={gallery} index={index} />
          ))}
        </div>

        {/* ── Footer Rule ── */}
        <div
          style={{
            margin: "0 clamp(20px, 6vw, 80px)",
            borderTop: "1px solid var(--border)",
            paddingTop: "clamp(20px, 3vw, 32px)",
            paddingBottom: "clamp(20px, 3vw, 32px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" }}>
            © 2024 Portfolio
          </span>
          <span className="serif" style={{ fontSize: "14px", fontStyle: "italic", color: "var(--muted)" }}>
            Light & Shadow
          </span>
        </div>
      </motion.div>
    </>
  );
}
