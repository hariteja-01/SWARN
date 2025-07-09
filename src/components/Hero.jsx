import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import tradingAnimation from "../assets/trading-3d.json";

const Hero = () => {
  const bgRef = useRef();
  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const y = window.scrollY;
        bgRef.current.style.transform = `translateY(${y * 0.2}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <section
      className="min-h-screen flex flex-col md:flex-row items-center justify-center pt-32 pb-16 relative overflow-hidden"
      id="hero"
      style={{
        background: "#181c2f", // Solid dark background
      }}
    >
      <div className="flex-1 flex flex-col items-start justify-center z-10 px-8">
        <motion.h1
          className="text-7xl md:text-8xl font-extrabold text-white drop-shadow-lg mb-6 text-left"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          SWARN
        </motion.h1>
        <motion.p
          className="text-2xl md:text-3xl text-light max-w-2xl text-left mb-8"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          The Ultimate AI-Powered Trading Platform.
          <br />
          Real-time insights, automated trading, and community learning—redefining
          your stock market journey.
        </motion.p>
      </div>
      <motion.div
        className="flex-1 w-full max-w-lg icon-animated z-10"
        initial={{ scale: 0.8, opacity: 0, x: 80 }}
        animate={{ scale: 1, opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <Lottie animationData={tradingAnimation} loop={true} />
      </motion.div>
    </section>
  );
};

export default Hero;

/* Add this at the end of your index.css */
