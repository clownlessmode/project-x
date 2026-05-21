"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

const EASE = [0.32, 0.72, 0, 1] as const;

const DESCRIPTION_LINES = [
  ["Подключайтесь", "к", "быстрому", "VPN", "и"],
  ["пользуйтесь", "интернетом", "без", "ограничений", "—"],
  ["дома,", "в", "поездках", "и", "в", "любой", "сети"],
];

const BASE_DELAY = 0.48;
const WORD_DELAY = 0.06;

export const WelcomeDescription = () => {
  const [isReady, setIsReady] = useState(false);

  const animatedLines = useMemo(() => {
    let wordIndex = 0;

    return DESCRIPTION_LINES.map((line) =>
      line.map((word) => {
        const delay = BASE_DELAY + wordIndex * WORD_DELAY;
        wordIndex += 1;

        return { word, delay };
      }),
    );
  }, []);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <p className="w-full break-words text-center text-[16px] font-normal leading-[1.1] text-foreground/60">
      {animatedLines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.map(({ word, delay }) => (
            <motion.span
              key={`${lineIndex}-${word}-${delay}`}
              className="inline-block"
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={
                isReady
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 14, filter: "blur(6px)" }
              }
              transition={{
                duration: 0.45,
                ease: EASE,
                delay,
              }}
            >
              {word}&nbsp;
            </motion.span>
          ))}
        </span>
      ))}
    </p>
  );
};
