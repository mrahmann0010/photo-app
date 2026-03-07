import { useEffect, useRef, useState } from 'react';

interface LazyImageProps {
  src: string;
  lqip: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Lazy-load image with LQIP blur placeholder.
 * 1. Renders the blurred low-quality placeholder immediately.
 * 2. Uses IntersectionObserver to detect when the image is 200px from viewport.
 * 3. Loads the full-res image in memory.
 * 4. Cross-fades to full resolution over 400ms.
 */
export default function LazyImage({ src, lqip, alt, width, height, className = '' }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { rootMargin: '200px' }
    );
    const el = containerRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  const aspectStyle =
    width && height
      ? { aspectRatio: `${width} / ${height}` }
      : undefined;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#111111] ${className}`}
      style={aspectStyle}
    >
      {/* LQIP placeholder */}
      <img
        src={lqip}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'blur(20px)', transform: 'scale(1.08)' }}
      />

      {/* Full resolution image */}
      {inView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 400ms ease',
          }}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}
