import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import AuthSection from './components/AuthSection';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-dark text-white">
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