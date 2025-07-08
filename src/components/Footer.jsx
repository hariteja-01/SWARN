import React from "react";

const Footer = () => (
  <footer className="bg-dark py-8 text-center text-light border-t border-glass">
    <div className="max-w-4xl mx-auto">
      <p className="mb-2">© {new Date().getFullYear()} SWARN. All rights reserved.</p>
      <p className="text-sm text-gray-400">Empowering your trading journey with AI.</p>
    </div>
  </footer>
);

export default Footer;