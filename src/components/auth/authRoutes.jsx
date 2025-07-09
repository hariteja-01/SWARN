import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./login";
import Register from "./Register";
import TwoFactor from "./TwoFactor";



// This component will render Register as the default for /register/* and Login for /login/*
import { useLocation } from "react-router-dom";

const AuthRoutes = () => {
  const location = useLocation();
  // If the path starts with /register, default to Register, else default to Login
  const isRegister = location.pathname.startsWith("/register");
  return (
    <Routes>
      <Route path="/" element={isRegister ? <Register /> : <Login />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="2fa" element={<TwoFactor />} />
    </Routes>
  );
};

export default AuthRoutes;
