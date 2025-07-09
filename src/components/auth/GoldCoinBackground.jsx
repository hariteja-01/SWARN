import React, { useEffect, useState } from "react";
import coinImg from "../../assets/digital-currency-indian-rupee-symbol-golden-coin.png";


// More, smaller, faster coins that avoid the form area
const COIN_COUNT = 100; // Keep quantity
const COIN_MIN_SIZE = 32; // px, slightly larger coins
const COIN_MAX_SIZE = 44; // px
const COIN_SPEED_MIN = 10; // px/sec, slower
const COIN_SPEED_MAX = 18;

// Define the form area to avoid (centered, responsive)
const FORM_AVOID = {
  x: 25, // percent from left
  y: 18, // percent from top
  w: 50, // percent width
  h: 64, // percent height
};

const GoldCoinBackground = () => {
  // No refs needed for static images

  // Helper to pick a random position outside the form area
  function randomPosOutsideForm() {
    let x, y, tries = 0;
    do {
      x = Math.random() * 100;
      y = Math.random() * 100;
      tries++;
    } while (
      x > FORM_AVOID.x - 4 && x < FORM_AVOID.x + FORM_AVOID.w + 4 &&
      y > FORM_AVOID.y - 4 && y < FORM_AVOID.y + FORM_AVOID.h + 4 &&
      tries < 20
    );
    return { x, y };
  }

  // Each coin moves in a random direction, bounces, never teleports
  const [coins, setCoins] = useState(() =>
    Array.from({ length: COIN_COUNT }, () => {
      const size = Math.random() * (COIN_MAX_SIZE - COIN_MIN_SIZE) + COIN_MIN_SIZE;
      const { x: startX, y: startY } = randomPosOutsideForm();
      const angle = Math.random() * 2 * Math.PI;
      const speed = Math.random() * (COIN_SPEED_MAX - COIN_SPEED_MIN) + COIN_SPEED_MIN;
      return {
        x: startX,
        y: startY,
        size,
        angle,
        speed,
        key: Math.random().toString(36).slice(2),
      };
    })
  );

  useEffect(() => {
    let running = true;
    // Animate coins smoothly from one random target to another, avoiding the form area
    let targets = coins.map(() => randomPosOutsideForm());
    let lastTime = performance.now();

    function setNewTarget(i) {
      targets[i] = randomPosOutsideForm();
    }

    function animate() {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.04); // seconds, slightly faster update
      lastTime = now;
      setCoins(prev => prev.map((coin, i) => {
        let tx = targets[i].x;
        let ty = targets[i].y;
        let dx = tx - coin.x;
        let dy = ty - coin.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let speed = coin.speed * dt;
        // If close to target, pick a new one but keep moving smoothly
        let moveX = coin.x;
        let moveY = coin.y;
        if (dist < 0.5) {
          setNewTarget(i);
        } else {
          moveX = coin.x + (dx / dist) * Math.min(speed, dist);
          moveY = coin.y + (dy / dist) * Math.min(speed, dist);
        }
        // Prevent coins from entering the form area
// Add a larger margin so coins never touch or overlap the form visually
const marginX = 6; // percent, left/right margin
const marginY = 8; // percent, top/bottom margin
        if (
          moveX > FORM_AVOID.x - marginX && moveX < FORM_AVOID.x + FORM_AVOID.w + marginX &&
          moveY > FORM_AVOID.y - marginY && moveY < FORM_AVOID.y + FORM_AVOID.h + marginY
        ) {
          setNewTarget(i);
          // Move away from form
          moveX = coin.x - (dx / dist) * Math.min(speed, dist);
          moveY = coin.y - (dy / dist) * Math.min(speed, dist);
        }
        // Clamp to 0-100% to avoid coins going out of bounds
        moveX = Math.max(0, Math.min(100, moveX));
        moveY = Math.max(0, Math.min(100, moveY));
        return { ...coin, x: moveX, y: moveY };
      }));
      if (running) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    return () => {
      running = false;
    };
    // eslint-disable-next-line
  }, []);

  // positions state is now dynamic above
  return (
    <div
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      {coins.map((coin) => (
        <img
          key={coin.key}
          src={coinImg}
          alt="coin"
          style={{
            top: `${coin.y}%`,
            left: `${coin.x}%`,
            width: `${coin.size}px`,
            height: `${coin.size}px`,
            position: "absolute",
            zIndex: 0,
            pointerEvents: "none",
            opacity: 0.8,
            transition: "top 0.18s linear, left 0.18s linear, width 0.2s, height 0.2s",
            userSelect: "none",
            willChange: "top,left,width,height",
          }}
        />
      ))}
    </div>
  );
};

export default GoldCoinBackground;
