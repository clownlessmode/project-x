"use client";

import { HeartIcon } from "@shared/assets/icons/heart";
import { MOTION_EASE } from "@shared/config/motion";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export const SUCCESS_ANIMATION_SIZE = 600;

const CENTER = SUCCESS_ANIMATION_SIZE / 2;
const ENTRANCE_DELAY = 0.15;
const CENTER_STAGGER = 0.1;

const CENTER_LAYERS = [
  { r: (24.79 / 130.518) * CENTER, className: "fill-primary opacity-100" },
  { r: (48.275 / 130.518) * CENTER, className: "fill-primary opacity-60" },
  { r: (70.45 / 130.518) * CENTER, className: "fill-primary opacity-40" },
  { r: (93.45 / 130.518) * CENTER, className: "fill-primary opacity-10" },
];

const HEART_DELAY =
  ENTRANCE_DELAY + CENTER_LAYERS.length * CENTER_STAGGER + 0.08;

const centerBounceTransition = (index: number) => ({
  type: "spring" as const,
  stiffness: 380,
  damping: 12,
  mass: 0.7,
  delay: ENTRANCE_DELAY + index * CENTER_STAGGER,
});

export function SuccessAnimation({
  delay = 0,
  isReady: isReadyProp,
}: {
  delay?: number;
  isReady?: boolean;
}) {
  const [isReadyLocal, setIsReadyLocal] = useState(false);
  const isReady = isReadyProp ?? isReadyLocal;

  useEffect(() => {
    setIsReadyLocal(true);
  }, []);

  return (
    <motion.div
      className="pointer-events-none relative shrink-0 overflow-hidden"
      style={{
        width: SUCCESS_ANIMATION_SIZE,
        height: SUCCESS_ANIMATION_SIZE,
      }}
      initial={{ opacity: 0, scale: 0.88, filter: "blur(8px)" }}
      animate={
        isReady
          ? { opacity: 1, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, scale: 0.88, filter: "blur(8px)" }
      }
      transition={{ duration: 0.55, ease: MOTION_EASE, delay }}
    >
      <svg
        className="block size-full"
        viewBox={`0 0 ${SUCCESS_ANIMATION_SIZE} ${SUCCESS_ANIMATION_SIZE}`}
        aria-hidden
      >
        {CENTER_LAYERS.map((layer, index) => (
          <motion.circle
            key={layer.r}
            cx={CENTER}
            cy={CENTER}
            initial={{ r: 0, opacity: 0 }}
            animate={{
              r: isReady ? layer.r : 0,
              opacity: isReady ? 1 : 0,
            }}
            transition={centerBounceTransition(index)}
            className={layer.className}
          />
        ))}
      </svg>

      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-white"
        initial={{ scale: 0, opacity: 0 }}
        animate={isReady ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 420,
          damping: 14,
          mass: 0.7,
          delay: HEART_DELAY,
        }}
      >
        <motion.div
          animate={isReady ? { scale: [1, 1.12, 1] } : { scale: 0 }}
          transition={{
            duration: 0.8,
            ease: MOTION_EASE,
            delay: HEART_DELAY + 0.35,
            repeat: Infinity,
            repeatDelay: 1.2,
          }}
        >
          <HeartIcon className="size-[60px]" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
