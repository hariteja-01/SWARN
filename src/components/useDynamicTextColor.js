import { useEffect } from "react";

export default function useDynamicTextColor(bgRef) {
  useEffect(() => {
    let last = "";
    function checkBg() {
      const el = bgRef.current;
      if (!el || !(el instanceof Element)) {
        requestAnimationFrame(checkBg);
        return;
      }
      const style = window.getComputedStyle(el);
      // Fallback: use tints from the gradient
      const match = style.background.match(/rgb\((\d+),(\d+),(\d+)\)/);
      let isDark = false;
      if (match) {
        const [r, g, b] = match.slice(1, 4).map(Number);
        // Perceived brightness formula
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        isDark = brightness < 140;
      }
      if (isDark !== last) {
        document.body.setAttribute("data-bg", isDark ? "dark" : "light");
        last = isDark;
      }
      requestAnimationFrame(checkBg);
    }
    checkBg();
  }, [bgRef]);
}