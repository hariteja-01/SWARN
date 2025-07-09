
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import AuthSection from './components/AuthSection';
import About from './components/About';
import Footer from './components/Footer';
import AuthRoutes from './components/auth/authRoutes';


function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/login/*" element={<AuthRoutes />} />
        <Route path="/register/*" element={<AuthRoutes />} />
        <Route path="/2fa/*" element={<AuthRoutes />} />
        {/* Main site */}
        <Route
          path="/*"
          element={
            <div className="bg-dark text-white">
              <Navbar />
              <Hero />
              <Features />
              <Pricing />
              <AuthSection />
              <About />
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;