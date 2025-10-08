/**
 * Planet.tsx
 * Minimal black-and-white auto-rotating sphere (not user-draggable).
 */
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

function RotatingSphere() {
  const planetRef = useRef<Mesh>(null);

  // auto-rotate on each frame
  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.0001; // tweak speed here
    }
  });

  return (
    <mesh ref={planetRef} rotation={[0.3, 0.4, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="white" wireframe />
    </mesh>
  );
}

export default function Planet() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 3, 3]} intensity={0.8} />
      <RotatingSphere />
    </Canvas>
  );
}
