"use client";

import { motion } from "framer-motion";

const AuroraGradientBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient background for full coverage */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20" />

      {/* Aurora Gradient Layers */}
      <motion.div
        className="absolute inset-0 opacity-60"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.4) 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-50"
        animate={{
          background: [
            "radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.5) 0%, transparent 60%)",
            "radial-gradient(circle at 20% 30%, rgba(120, 219, 255, 0.5) 0%, transparent 60%)",
            "radial-gradient(circle at 60% 10%, rgba(198, 255, 119, 0.5) 0%, transparent 60%)",
            "radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.5) 0%, transparent 60%)"
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            "radial-gradient(circle at 50% 20%, rgba(198, 255, 119, 0.6) 0%, transparent 70%)",
            "radial-gradient(circle at 30% 70%, rgba(255, 198, 119, 0.6) 0%, transparent 70%)",
            "radial-gradient(circle at 70% 40%, rgba(119, 198, 255, 0.6) 0%, transparent 70%)",
            "radial-gradient(circle at 50% 20%, rgba(198, 255, 119, 0.6) 0%, transparent 70%)"
          ]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Moving Neon Glow Effects */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 255, 255, 0.2) 0%, transparent 70%)",
          filter: "blur(40px)"
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.2, 0.8, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 0, 255, 0.2) 0%, transparent 70%)",
          filter: "blur(35px)"
        }}
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 100, -40, 0],
          scale: [1, 0.9, 1.3, 1]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 0, 0.15) 0%, transparent 70%)",
          filter: "blur(30px)"
        }}
        animate={{
          x: [0, 60, -90, 0],
          y: [0, -70, 50, 0],
          scale: [1, 1.4, 0.7, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Subtle Grid Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px"
        }}
      />
    </div>
  );
};

export default AuroraGradientBackground;
