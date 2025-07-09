import React from "react";
import { motion } from "framer-motion";
import tradingAnimation from "../assets/trading-3d.json";

const About = () => (
  <section className="py-24 bg-dark" id="about">
    <div className="flex flex-col md:flex-row-reverse items-center gap-12 max-w-5xl mx-auto">
      <motion.div
        className="w-full md:w-1/2 icon-animated"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <lottie-react animationData={tradingAnimation} loop={true} />
      </motion.div>
      <motion.div
        className="w-full md:w-1/2"
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-10 text-white text-left">
          About SWARN
        </h2>
        <div className="text-xl text-light text-left leading-relaxed">
          SWARN is an AI-powered trading platform designed to empower traders with
          advanced predictions, real-time analytics, automated trading, and a thriving
          community. Our mission is to make trading smarter, safer, and more
          accessible for everyone—whether you're a beginner or a pro. Join us and
          experience the future of trading!
        </div>
      </motion.div>
    </div>
  </section>
);

export default About;