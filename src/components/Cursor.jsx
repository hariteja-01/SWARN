import React, { useEffect } from "react";

const Cursor = () => {
  useEffect(() => {
    const dot = document.querySelector(".cursor-dot");
    const move = e => {
      dot.style.transform = `translate(${e.clientX - 12}px,${e.clientY - 12}px)`;
      // More vivid color change
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      dot.style.background = `radial-gradient(circle, hsl(${200 + 120 * x},100%,60%) 40%, hsl(${50 + 200 * y},100%,60%) 100%)`;
      dot.style.border = "2px solid #fff";
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div className="cursor-dot"></div>;
};

export default Cursor;