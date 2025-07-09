import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const AuthLayout = ({ children }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // Create animated gradient background using particles
    const particles = new THREE.Group();
    const particleCount = 200;
    for (let i = 0; i < particleCount; i++) {
      const geometry = new THREE.SphereGeometry(0.07, 8, 8);
      const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(`hsl(${Math.random() * 360}, 80%, 60%)`) });
      const particle = new THREE.Mesh(geometry, material);
      particle.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      );
      particles.add(particle);
    }
    scene.add(particles);

    let frame = 0;
    const animate = () => {
      frame++;
      particles.children.forEach((p, i) => {
        p.position.x += Math.sin(frame * 0.002 + i) * 0.002;
        p.position.y += Math.cos(frame * 0.002 + i) * 0.002;
      });
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div ref={mountRef} className="absolute inset-0 z-0" />
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  );
};

export default AuthLayout;
