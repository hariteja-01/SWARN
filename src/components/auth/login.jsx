

import React, { useState, useRef } from "react";
import GoldCoinBackground from "./GoldCoinBackground";
import { supabase } from "../../supabaseClient";


const generateCaptcha = () => Math.random().toString(36).substring(2, 8);

const Login = () => {
  const [form, setForm] = useState({
    user: "",
    password: "",
    remember: false,
    captchaInput: ""
  });
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const userRef = useRef();
  const passwordRef = useRef();
  const captchaRef = useRef();

  // Validation helpers
  const isEmail = val => /^\S+@\S+\.\S+$/.test(val);
  const isUsername = val => /^[A-Za-z0-9_]{6,20}$/.test(val);

  const validate = () => {
    if (!form.user) {
      setError("Please enter your email or username.");
      userRef.current && userRef.current.focus();
      return false;
    }
    if (!(isEmail(form.user) || isUsername(form.user))) {
      setError("Please enter a valid email or username (6-20 chars, letters, numbers, underscores).");
      userRef.current && userRef.current.focus();
      return false;
    }
    if (!form.password || form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      passwordRef.current && passwordRef.current.focus();
      return false;
    }
    if (!form.captchaInput || form.captchaInput !== captcha) {
      setError("Captcha incorrect. Please try again.");
      captchaRef.current && captchaRef.current.focus();
      return false;
    }
    setError("");
    return true;
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleLogin = async () => {
    setError("");
    setSuccess("");
    if (!validate()) return;
    setLoading(true);
    // Try login with Supabase
    let result;
    if (isEmail(form.user)) {
      result = await supabase.auth.signInWithPassword({
        email: form.user,
        password: form.password
      });
    } else {
      // If you want to support username login, you must store username in user_metadata and query for email by username
      // For now, show error if not email
      setError("Please login with your email address.");
      setLoading(false);
      return;
    }
    setLoading(false);
    if (result.error) {
      setError(result.error.message || "Invalid credentials, please try again.");
      setCaptcha(generateCaptcha());
      setForm(f => ({ ...f, captchaInput: "" }));
    } else {
      setSuccess("Login successful! Redirecting to dashboard...");
      setTimeout(() => window.location.href = "/dashboard", 1500);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden">
      <GoldCoinBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 opacity-90 z-10" />
      <main className="relative z-20 w-full max-w-md mx-auto p-8 rounded-xl shadow-2xl bg-white/90 backdrop-blur-md animate-fade-in">
        <header className="flex flex-col items-center mb-8">
          <div className="h-14 w-14 mb-2 flex items-center justify-center bg-yellow-100 rounded-full border-2 border-yellow-300">
            <span className="text-3xl font-extrabold text-yellow-600 select-none">S</span>
          </div>
          <h1 className="text-2xl font-bold text-yellow-700 tracking-wide">Secure Login</h1>
        </header>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center text-sm animate-fade-in" role="alert">{error}</div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center text-sm animate-fade-in" role="status">{success}</div>
        )}
        <div className="space-y-5">
          <div>
            <label htmlFor="user" className="block font-semibold text-gray-700">Email or Username</label>
            <input
              ref={userRef}
              id="user"
              name="user"
              type="text"
              autoComplete="username"
              className="mt-1 w-full p-2 rounded border focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter email or username"
              value={form.user}
              onChange={handleChange}
              aria-required="true"
              aria-label="Email or Username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-semibold text-gray-700">Password</label>
            <div className="relative">
              <input
                ref={passwordRef}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className="mt-1 w-full p-2 rounded border focus:ring-2 focus:ring-yellow-400 pr-10"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                aria-required="true"
                aria-label="Password"
              />
              <button
                type="button"
                tabIndex={0}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-2 text-gray-500 hover:text-yellow-600 focus:outline-none"
                onClick={() => setShowPassword(v => !v)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.506-3.182 1.372-4.418M4.582 9A7.974 7.974 0 0112 16c1.657 0 3.182-.506 4.418-1.372M15.418 15A7.974 7.974 0 0012 8c-1.657 0-3.182.506-4.418 1.372" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-1">Password must be at least 8 characters.</div>
          </div>
          <div className="flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              checked={form.remember}
              onChange={handleChange}
              className="h-4 w-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-400"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember Me</label>
          </div>
          <div>
            <label htmlFor="captchaInput" className="block font-semibold text-gray-700">Captcha</label>
            <div className="flex items-center gap-2">
              <span className="bg-gray-200 px-3 py-1 rounded font-mono tracking-widest text-lg select-none">{captcha}</span>
              <button
                type="button"
                aria-label="Refresh captcha"
                className="ml-1 p-1 rounded hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onClick={() => {
                  setCaptcha(generateCaptcha());
                  setForm(f => ({ ...f, captchaInput: "" }));
                  captchaRef.current && captchaRef.current.focus();
                }}
                tabIndex={0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582M20 20v-5h-.581M19.418 15A7.974 7.974 0 0012 8c-1.657 0-3.182.506-4.418 1.372M4.582 9A7.974 7.974 0 0112 16c1.657 0 3.182-.506 4.418-1.372" />
                </svg>
              </button>
              <input
                ref={captchaRef}
                id="captchaInput"
                name="captchaInput"
                type="text"
                className="w-full p-2 rounded border focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter captcha"
                value={form.captchaInput}
                onChange={handleChange}
                aria-required="true"
                aria-label="Captcha"
                autoComplete="off"
              />
            </div>
          </div>
          <button
            className={`mt-6 w-full py-3 rounded bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-gray-900 font-bold text-lg shadow-xl hover:scale-105 hover:from-yellow-300 hover:to-yellow-400 transition-all flex items-center justify-center ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
            type="button"
            onClick={handleLogin}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? <span className="loader mr-2" /> : null}
            Login
          </button>
        </div>
        <div className="flex justify-between items-center mt-6 text-sm">
          <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</a>
          <a href="/register" className="text-blue-600 hover:underline">Sign Up</a>
        </div>
        <footer className="mt-8 text-center text-xs text-gray-400">
          <a href="/privacy" className="hover:underline">Privacy Policy</a> | <a href="/terms" className="hover:underline">Terms of Service</a>
        </footer>
      </main>
    </div>
  );
};

export default Login;
