import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image, ScrollControls, useScroll, Scroll } from "@react-three/drei";
import * as THREE from "three";

// 1. DATA: Using high-quality, reliable Unsplash IDs
const PHOTO_DATA = [
  {
    id: "a1",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000",
    pos: [-3, 4, 0],
    scale: [2, 3],
  },
  {
    id: "a2",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1000",
    pos: [3, 3, 0],
    scale: [3, 2],
  },
  {
    id: "a3",
    url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1000",
    pos: [0, 0, 0],
    scale: [2.5, 3.5],
  },
  {
    id: "a4",
    url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1000",
    pos: [-4, -2, 0],
    scale: [3, 2.5],
  },
  {
    id: "a5",
    url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1000",
    pos: [4, -4, 0],
    scale: [2, 3],
  },
  {
    id: "a6",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000",
    pos: [-2, -7, 0],
    scale: [4, 2.5],
  },
];

const CylinderPhoto = ({ url, pos, scale }) => {
  const ref = useRef();
  const scroll = useScroll(); // Access scroll within the component

  useFrame(() => {
    if (!ref.current) return;

    const x = pos[0];
    // Calculate dynamic bend based on scroll
    const bendIntensity = 0.5 + scroll.offset * 2.5;

    // V-Shape / Cylindrical Math
    const zOffset = -(Math.pow(x, 2) * 0.1) * bendIntensity;
    const yRotation = x * 0.08 * bendIntensity;

    // Smooth movement
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
        onError={(e) => console.error("Texture Load Fail:", url)}
      />
    </group>
  );
};

const Scene = () => {
  return (
    <Scroll>
      {PHOTO_DATA.map((img) => (
        <CylinderPhoto
          key={img.id} // Unique key
          url={img.url}
          pos={img.pos}
          scale={img.scale}
        />
      ))}
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
