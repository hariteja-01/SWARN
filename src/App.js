import React, { useState, useEffect } from 'react';
import TradingViewBg from './components/TradingViewBg'; // Restore this import if you used it before
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import AuthSection from './components/AuthSection';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") !== "light"
  );

  useEffect(() => {
    const handler = () => setDarkMode(document.documentElement.classList.contains("dark"));
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-bg", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="relative min-h-screen">
      <TradingViewBg darkMode={darkMode} /> {/* Restore this line */}
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <AuthSection />
      <About />
      <Footer />
    </div>
  );
}

export default App;