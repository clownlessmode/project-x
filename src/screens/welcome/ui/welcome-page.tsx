"use client";

import { Button } from "@shared/ui/button";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { WelcomeAnimation } from "./welcome-animation";
import { WelcomeDescription } from "./welcome-description";
import { WelcomeTitle } from "./welcome-title";

const BUTTON_DELAY = 1.15;

export const WelcomePage = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-between overflow-hidden px-4 pt-[42px] pb-4">
      <div className="flex flex-col gap-[24px]">
        <WelcomeTitle />
        <WelcomeDescription />
      </div>
      <WelcomeAnimation />
      <motion.div
        className="w-full"
        initial={{ y: 120, opacity: 0 }}
        animate={isReady ? { y: 0, opacity: 1 } : { y: 120, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 320,
          damping: 28,
          mass: 0.85,
          delay: BUTTON_DELAY,
        }}
      >
        <Link href="/tarrifs" className="block w-full">
          <Button className="w-full">Далее</Button>
        </Link>
      </motion.div>
    </div>
  );
};
