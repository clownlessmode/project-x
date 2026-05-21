"use client";

import { MOTION_EASE } from "@shared/config/motion";
import { useScreenReady } from "@shared/hooks/use-screen-ready";
import { motion } from "motion/react";

const TITLE_WORDS = ["Оплата", "прошла", "успешно!"];

export function SuccessTitle() {
  const isReady = useScreenReady();

  return (
    <div className="relative flex w-full justify-center">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[43px] w-[min(308px,100%)] -translate-x-1/2 -translate-y-1/2 rounded-[31px] bg-primary"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          isReady ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
        }
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 16,
          mass: 0.75,
        }}
        style={{ transformOrigin: "center center" }}
      />
      <h1 className="relative z-10 w-full max-w-[354px] break-words px-2 py-1 text-center text-[26px] font-normal leading-[1.3] tracking-[-0.4px] text-white">
        <span className="inline-flex flex-wrap justify-center gap-x-[0.3em]">
          {TITLE_WORDS.map((word, index) => (
            <motion.span
              key={word}
              className="inline-block"
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={
                isReady
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 18, filter: "blur(6px)" }
              }
              transition={{
                duration: 0.45,
                ease: MOTION_EASE,
                delay: 0.08 + index * 0.08,
              }}
            >
              {word}
            </motion.span>
          ))}
        </span>
      </h1>
    </div>
  );
}
