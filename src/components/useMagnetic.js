import { useRef } from "react";
export function useMagnetic(strength = 30) {
  const ref = useRef();
  const handleMouseMove = e => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x / strength}px,${y / strength}px) scale(1.04)`;
  };
  const handleMouseLeave = () => {
    ref.current.style.transform = "";
  };
  return [ref, { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave }];
}

import { useMagnetic } from "./useMagnetic";
const [ref, events] = useMagnetic();
<button ref={ref} {...events} className="btn-3d btn-glow ...">Choose</button>