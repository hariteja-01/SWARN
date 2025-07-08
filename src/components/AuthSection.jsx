import React from "react";
import { motion } from "framer-motion";

const AuthSection = () => (
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
        <form className="flex flex-col gap-4">
          <input className="p-3 rounded bg-dark text-light" type="text" placeholder="Name" />
          <input className="p-3 rounded bg-dark text-light" type="email" placeholder="Email" />
          <input className="p-3 rounded bg-dark text-light" type="password" placeholder="Password" />
          <button className="py-2 rounded bg-primary text-dark font-bold hover:bg-secondary transition">Sign Up</button>
        </form>
      </motion.div>
      <motion.div
        className="bg-glass p-8 rounded-2xl shadow-lg w-80"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold mb-4 text-primary">Login</h3>
        <form className="flex flex-col gap-4">
          <input className="p-3 rounded bg-dark text-light" type="email" placeholder="Email" />
          <input className="p-3 rounded bg-dark text-light" type="password" placeholder="Password" />
          <button className="py-2 rounded bg-primary text-dark font-bold hover:bg-secondary transition">Login</button>
        </form>
      </motion.div>
    </div>
  </section>
);

export default AuthSection;