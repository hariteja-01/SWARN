import React from "react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Plans", href: "#plans" },
  { label: "Register", href: "#register" },
  { label: "About", href: "#about" },
];

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 bg-glass backdrop-blur-md shadow-lg animate-fade-in">
    <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
      <span className="text-3xl font-extrabold text-primary tracking-widest drop-shadow-lg select-none">
        SWARN
      </span>
      <ul className="flex gap-8 text-lg font-semibold">
        {navLinks.map((link) => (
          <li key={link.href} className="relative group">
            <a
              href={link.href}
              className="hover:text-secondary transition duration-200"
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

export default Navbar;