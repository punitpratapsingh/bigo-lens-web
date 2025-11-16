// GoldenRuneParticles.tsx
import { useRef, useMemo } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function GoldenRuneParticles({ count = 300 }) {
  const ref = useRef<any>();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 8; // x
      positions[i * 3 + 1] = Math.random() * 6;         // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8; // z
    }
    return positions;
  }, []);

  useFrame(() => {
    const positions = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      positions.array[i * 3 + 1] += 0.008; // upward drift
      if (positions.array[i * 3 + 1] > 4) {
        positions.array[i * 3 + 1] = -2; // loop from bottom
      }
    }
    positions.needsUpdate = true;
  });

  return (
    <group>
      <Points
        ref={ref}
        positions={particles}
        stride={3}
      >
        <PointMaterial
          transparent
          color="#e7d37f"
          size={0.1}
          sizeAttenuation
          depthWrite={false}
          opacity={0.85}
        />
      </Points>
    </group>
  );
}
