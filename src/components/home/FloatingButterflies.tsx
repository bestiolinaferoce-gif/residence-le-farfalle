"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Farfalle colorate che volano come decorazione elegante.
 * Rispetta prefers-reduced-motion: se attivo, mostra farfalle statiche.
 */
const butterflyColors = [
  "#fbbf24", // giallo
  "#f97316", // arancio
  "#fb7185", // rosa corallo
  "#38bdf8", // azzurro
  "#a78bfa", // viola
  "#34d399", // teal
  "#f472b6", // rosa
  "#facc15", // giallo scuro
];

const butterflyPaths = [
  "M12 2C8 6 6 10 6 14c0 4 2 8 6 10 4-2 6-6 6-10 0-4-2-8-6-12z",
  "M12 1c-3 4-5 9-5 13 0 3 1 6 5 9 4-3 5-6 5-9 0-4-2-9-5-13z",
  "M12 3c-2 3-3 7-3 10 0 2 1 5 3 7 2-2 3-5 3-7 0-3-1-7-3-10z",
];

interface ButterflyProps {
  delay: number;
  duration: number;
  x: number;
  y: number;
  size: number;
  color: string;
  pathIndex: number;
  reducedMotion: boolean;
}

function Butterfly({
  delay,
  duration,
  x,
  y,
  size,
  color,
  pathIndex,
  reducedMotion,
}: ButterflyProps) {
  const path = butterflyPaths[pathIndex % butterflyPaths.length];

  if (reducedMotion) {
    return (
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: size,
          height: size,
          opacity: 0.15,
          zIndex: 1,
        }}
        initial={{ opacity: 0.15 }}
      >
        <svg viewBox="0 0 24 26" fill={color} className="w-full h-full">
          <path d={path} />
        </svg>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        opacity: 0.2,
        zIndex: 1,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 0.2,
        scale: 1,
        x: [0, 8, -4, 12, 0],
        y: [0, -12, 6, -8, 0],
        rotate: [0, 5, -3, 8, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <svg viewBox="0 0 24 26" fill={color} className="w-full h-full drop-shadow-sm">
        <path d={path} />
      </svg>
    </motion.div>
  );
}

export default function FloatingButterflies() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const butterflies = [
    { x: 5, y: 15, size: 28, delay: 0, duration: 12, color: butterflyColors[0], pathIndex: 0 },
    { x: 88, y: 25, size: 22, delay: 2, duration: 14, color: butterflyColors[1], pathIndex: 1 },
    { x: 15, y: 70, size: 20, delay: 1, duration: 10, color: butterflyColors[2], pathIndex: 2 },
    { x: 75, y: 60, size: 24, delay: 3, duration: 13, color: butterflyColors[3], pathIndex: 0 },
    { x: 45, y: 35, size: 18, delay: 0.5, duration: 11, color: butterflyColors[4], pathIndex: 1 },
    { x: 92, y: 80, size: 20, delay: 1.5, duration: 15, color: butterflyColors[5], pathIndex: 2 },
    { x: 25, y: 45, size: 22, delay: 2.5, duration: 9, color: butterflyColors[6], pathIndex: 0 },
    { x: 60, y: 18, size: 26, delay: 4, duration: 12, color: butterflyColors[7], pathIndex: 1 },
  ];

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: 0, pointerEvents: "none" }}
    >
      {butterflies.map((b, i) => (
        <Butterfly
          key={i}
          {...b}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  );
}
