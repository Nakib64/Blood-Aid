// components/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ff416c] to-[#ff4b2b] flex flex-col items-center justify-center text-white px-4">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-[10rem] font-extrabold drop-shadow-lg"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl md:text-3xl text-center font-semibold mt-2"
      >
        Oops! Page not found.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="text-center mt-3 max-w-md"
      >
        The page you're looking for doesn't exist or has been moved. Let's get you back home.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <Link to="/" className="inline-block mt-6 px-6 py-3 bg-white text-[#ff416c] font-bold rounded-full shadow-lg hover:bg-[#ffe1e6] transition">
          Go Home
        </Link>
      </motion.div>

      <motion.div
        className="mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ delay: 0.8 }}
      >
        <svg className="w-40 h-40 opacity-40 animate-bounce" fill="none" stroke="white" strokeWidth="1" viewBox="0 0 24 24">
          <path d="M10.29 3.86L1.82 18a1 1 0 00.86 1.5h18.64a1 1 0 00.86-1.5L13.71 3.86a1 1 0 00-1.72 0zM12 9v4m0 4h.01"></path>
        </svg>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
