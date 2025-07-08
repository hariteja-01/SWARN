import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import tradingAnimation from "../assets/trading-3d.json";

const Hero = () => (
  <section
    className="min-h-screen flex flex-col justify-center items-center animated-gradient-bg pt-32 pb-16 relative overflow-hidden"
    id="hero"
  >
    <motion.h1
      className="text-7xl md:text-8xl font-extrabold text-white drop-shadow-lg mb-6 text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      SWARN
    </motion.h1>
    <motion.p
      className="text-2xl md:text-3xl text-light max-w-2xl text-center mb-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      The Ultimate AI-Powered Trading Platform.<br />
      Real-time insights, automated trading, and community learning—redefining your stock market journey.
    </motion.p>
    <motion.div
      className="w-full max-w-lg icon-animated"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
    >
      <Lottie animationData={tradingAnimation} loop={true} />
    </motion.div>
    <motion.div
      className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark to-transparent pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
    />
  </section>
);

export default Hero;