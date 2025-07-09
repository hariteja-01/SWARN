import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, MeshWobbleMaterial } from "@react-three/drei";

export default function Hero3D() {
  return (
    <div className="absolute right-8 top-24 w-72 h-72 z-10 hidden md:block">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 2]} />
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <mesh>
            <torusKnotGeometry args={[1, 0.3, 128, 32]} />
            <MeshWobbleMaterial color="#FFD700" factor={0.8} speed={2} />
          </mesh>
        </Float>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}