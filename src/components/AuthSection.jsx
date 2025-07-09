
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const AuthSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-dark" id="register">
      <h2 className="text-4xl font-bold text-center mb-10 text-secondary">Join SWARN</h2>
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
        <motion.div
          className="bg-glass p-8 rounded-2xl shadow-lg w-80"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4 text-primary">Register</h3>
          <button
            className="py-2 rounded bg-primary text-dark font-bold hover:bg-secondary transition w-full mt-4"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </motion.div>
        <motion.div
          className="bg-glass p-8 rounded-2xl shadow-lg w-80"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4 text-primary">Login</h3>
          <button
            className="py-2 rounded bg-primary text-dark font-bold hover:bg-secondary transition w-full mt-4"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AuthSection;