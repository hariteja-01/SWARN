import React, { useRef, useEffect } from "react";

// Utility to generate random float between min and max
const rand = (min, max) => Math.random() * (max - min) + min;

// Animated geometric shapes (circles, triangles, squares)
const SHAPES = [
  { type: "circle", size: 80, color: "bg-blue-500/30", blur: "blur-md" },
  { type: "circle", size: 120, color: "bg-purple-500/20", blur: "blur-lg" },
  { type: "square", size: 60, color: "bg-blue-400/20", blur: "blur" },
  { type: "triangle", size: 70, color: "bg-indigo-400/20", blur: "blur-sm" },
  { type: "circle", size: 100, color: "bg-fuchsia-400/20", blur: "blur" },
  { type: "square", size: 90, color: "bg-cyan-400/20", blur: "blur-md" },
];

function Shape({ type, size, color, blur, style }) {
  if (type === "circle")
    return (
      <div
        className={`absolute rounded-full ${color} ${blur}`}
        style={{ width: size, height: size, ...style }}
      />
    );
  if (type === "square")
    return (
      <div
        className={`absolute rounded-xl ${color} ${blur}`}
        style={{ width: size, height: size, ...style }}
      />
    );
  // Triangle using CSS
  if (type === "triangle")
    return (
      <div
        className={`absolute ${blur}`}
        style={{
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${size}px solid rgba(139,92,246,0.18)`,
          ...style,
        }}
      />
    );
  return null;
}

// Faint grid SVG overlay
function GridOverlay({ dark }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      width="100%"
      height="100%"
    >
      <defs>
        <pattern
          id="grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke={dark ? "#2a2e3a" : "#e5e7eb"}
            strokeWidth="1"
            opacity="0.18"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

// Main animated background component
const TradingViewBg = ({ darkMode }) => {
  const bgRef = useRef();
  const shapeRefs = useRef([]);

  // Animate gradient background
  useEffect(() => {
    let t = 0;
    let running = true;
    function animate() {
      t += 0.008;
      // Animate between blue/purple/indigo gradients
      const grad1 = `rgba(${Math.round(30 + 40 * Math.sin(t))},${Math.round(
        60 + 40 * Math.cos(t * 0.8)
      )},${Math.round(120 + 80 * Math.sin(t * 0.5))},1)`;
      const grad2 = `rgba(${Math.round(60 + 60 * Math.cos(t * 0.7))},${Math.round(
        40 + 60 * Math.sin(t * 0.6)
      )},${Math.round(180 + 40 * Math.cos(t * 0.9))},1)`;
      if (bgRef.current) {
        bgRef.current.style.background = darkMode
          ? `linear-gradient(120deg, ${grad1} 0%, ${grad2} 100%)`
          : `linear-gradient(120deg, #e0e7ff 0%, #f3e8ff 100%)`;
      }
      // Animate shapes gently
      shapeRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const angle = t * (0.5 + i * 0.1) + i;
        const x = 50 + 40 * Math.sin(angle + i);
        const y = 50 + 40 * Math.cos(angle - i);
        ref.style.left = `calc(${x}% - ${SHAPES[i % SHAPES.length].size / 2}px)`;
        ref.style.top = `calc(${y}% - ${SHAPES[i % SHAPES.length].size / 2}px)`;
      });
      if (running) requestAnimationFrame(animate);
    }
    animate();
    return () => {
      running = false;
    };
  }, [darkMode]);

  // Responsive: adjust number of shapes based on screen size
  const shapeCount = window.innerWidth < 640 ? 3 : 6;

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 -z-50 transition-colors duration-700"
      style={{
        willChange: "background",
        pointerEvents: "none",
        minHeight: "100vh",
        minWidth: "100vw",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {/* Faint grid overlay */}
      <GridOverlay dark={darkMode} />
      {/* Animated geometric shapes */}
      {Array.from({ length: shapeCount }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (shapeRefs.current[i] = el)}
          style={{ position: "absolute" }}
        >
          <Shape {...SHAPES[i % SHAPES.length]} />
        </div>
      ))}
    </div>
  );
};

export default TradingViewBg;