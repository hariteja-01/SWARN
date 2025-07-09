import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";

const TwoFactor = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    if (!/^[0-9]{6}$/.test(code)) return "Enter a valid 6-digit code.";
    return "";
  };

  const handleSubmit = e => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);
    setError("");
    setSuccess("2FA Success! Redirecting...");
    setTimeout(() => navigate("/"), 1200);
  };

  return (
    <AuthLayout>
      <form
        className="bg-glass p-8 rounded-2xl shadow-xl flex flex-col gap-5 animate-fadeIn"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-primary mb-2 text-center">Two-Factor Authentication</h2>
        <p className="text-light text-center text-sm mb-2">Enter the 6-digit code sent to your email.</p>
        <input
          className="p-3 rounded bg-dark text-light text-center tracking-widest text-2xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          type="text"
          maxLength={6}
          placeholder="------"
          value={code}
          onChange={e => setCode(e.target.value.replace(/[^0-9]/g, ""))}
        />
        {error && <div className="text-red-400 text-sm text-center animate-fadeIn">{error}</div>}
        {success && <div className="text-green-400 text-sm text-center animate-fadeIn">{success}</div>}
        <button
          className="py-2 rounded bg-primary text-dark font-bold hover:bg-secondary transition-all shadow-md"
          type="submit"
        >
          Verify
        </button>
      </form>
    </AuthLayout>
  );
};

export default TwoFactor;
