import React, { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import ThemeSwitch from './ThemeSwitch';

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Plans", href: "#plans" },
  { label: "Register", href: "#register" },
  { label: "About", href: "#about" },
];

const Navbar = () => {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") !== "light");
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  return (
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
                className="text-white px-2 py-1 rounded transition duration-200 font-bold text-lg shadow-sm"
                style={{
                  textShadow: "0 2px 8px #000",
                  letterSpacing: "0.02em",
                  transition: "color 0.2s",
                }}
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 w-0 h-1 bg-[#E5B86D] rounded-full transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          {/* Login and Sign Up buttons */}
          <a
            href="#register"
            className="px-4 py-2 rounded-xl bg-glass text-primary font-bold border-2 border-primary hover:bg-primary hover:text-dark transition"
          >
            Login
          </a>
          <a
            href="#register"
            className="px-4 py-2 rounded-xl bg-primary text-dark font-bold border-2 border-primary hover:bg-secondary transition"
          >
            Sign Up
          </a>
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;