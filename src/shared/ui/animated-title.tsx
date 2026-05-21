"use client";

import { MOTION_EASE, TITLE_WORD_DELAY } from "@shared/config/motion";
import { useScreenReady } from "@shared/hooks/use-screen-ready";
import { cn } from "@shared/utils/utils";
import { motion } from "motion/react";

type AnimatedTitleProps = {
  text: string;
  className?: string;
};

export function AnimatedTitle({ text, className }: AnimatedTitleProps) {
  const isReady = useScreenReady();
  const words = text.split(" ");

  return (
    <h1
      className={cn(
        "w-full break-words text-[36px] font-medium leading-[22px] tracking-[-0.4px] text-foreground",
        className,
      )}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
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
            delay: index * TITLE_WORD_DELAY,
          }}
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </h1>
  );
}
