// EmberParticles.tsx
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function EmberParticles({ count = 200 }) {
  const ref = useRef<any>();

  const particles = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 6; // X
      arr[i * 3 + 1] = Math.random() * 4;         // Y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6; // Z
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      pos.array[i * 3 + 1] += 0.015; // rise
      pos.array[i * 3 + 0] += Math.sin((i + state.clock.elapsedTime) * 0.2) * 0.002; // flicker x
      pos.array[i * 3 + 2] += Math.cos((i + state.clock.elapsedTime) * 0.2) * 0.002; // flicker z

      if (pos.array[i * 3 + 1] > 3) pos.array[i * 3 + 1] = -1; 
    }
    pos.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={particles} stride={3}>
      <PointMaterial
        transparent
        color="#ff6a20"
        size={0.08}
        sizeAttenuation
        depthWrite={false}
        opacity={0.9}
      />
    </Points>
  );
}
