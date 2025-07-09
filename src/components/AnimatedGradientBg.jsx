import React, { useRef, useEffect } from "react";

// Pastel, harmonious color palette (edit as desired)
const COLORS = [
  [120, 180, 255],   // pastel blue
  [180, 120, 255],   // pastel purple
  [255, 180, 220],   // pastel pink
  [120, 255, 220],   // pastel teal
  [180, 255, 200],   // pastel green
];

function lerp(a, b, t) { return a + (b - a) * t; }
function lerpColor(a, b, t) {
  return [
    Math.round(lerp(a[0], b[0], t)),
    Math.round(lerp(a[1], b[1], t)),
    Math.round(lerp(a[2], b[2], t)),
  ];
}
function rgbToStr([r, g, b]) { return `rgb(${r},${g},${b})`; }

export default function AnimatedGradientBg() {
  const bgRef = useRef();
  const time = useRef(0);

  // Dynamically set text color for contrast
  useEffect(() => {
    let running = true;
    function animate() {
      time.current += 0.008;
      // Animate between color stops
      const t1 = (Math.sin(time.current * 0.7) + 1) / 2;
      const t2 = (Math.cos(time.current * 0.9) + 1) / 2;
      const t3 = (Math.sin(time.current * 0.5 + 1) + 1) / 2;

      // Interpolate between three color pairs for a rich gradient
      const c1 = lerpColor(COLORS[0], COLORS[1], t1);
      const c2 = lerpColor(COLORS[2], COLORS[3], t2);
      const c3 = lerpColor(COLORS[4], COLORS[0], t3);

      if (bgRef.current) {
        bgRef.current.style.background = `
          radial-gradient(ellipse 80% 60% at ${30 + 40 * t1}% ${40 + 30 * t2}%,
            ${rgbToStr(c1)}, 60%,
            ${rgbToStr(c2)} 100%
          ),
          linear-gradient(120deg, ${rgbToStr(c3)} 0%, ${rgbToStr(c1)} 100%)
        `;
      }

      // Calculate perceived brightness for contrast
      const [r, g, b] = c1;
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      document.body.setAttribute("data-bg", brightness < 140 ? "dark" : "light");

      if (running) requestAnimationFrame(animate);
    }
    animate();
    return () => { running = false; };
  }, []);

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 -z-50 transition-colors duration-700"
      style={{
        pointerEvents: "none",
        transition: "background 0.7s cubic-bezier(.4,0,.2,1)",
        willChange: "background",
      }}
      aria-hidden="true"
    />
  );
}