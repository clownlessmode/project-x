"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

const EASE = [0.32, 0.72, 0, 1] as const;

const TITLE_WORDS = ["Добро", "пожаловать", "в", "мир"];

export const WelcomeTitle = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <h1 className="w-full break-words text-center text-[26px] font-normal leading-[1.3] tracking-[-0.4px] text-foreground">
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
              ease: EASE,
              delay: index * 0.08,
            }}
          >
            {word}
          </motion.span>
        ))}
      </span>
      <br />
      <motion.span
        className="mt-1 inline-block rounded-full bg-primary px-2 text-primary-foreground"
        initial={{ opacity: 0, scale: 0.72, y: 14 }}
        animate={
          isReady
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.72, y: 14 }
        }
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 13,
          mass: 0.7,
          delay: TITLE_WORDS.length * 0.08 + 0.12,
        }}
      >
        безопасного соединения
      </motion.span>
    </h1>
  );
};
