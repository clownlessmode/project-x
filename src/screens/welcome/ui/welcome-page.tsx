"use client";

import { assetPath } from "@shared/config/base-path";
import { Button } from "@shared/ui/button";
import { motion } from "motion/react";
import Link from "next/link";
import { WelcomeAnimation } from "./welcome-animation";
import { WelcomeDescription } from "./welcome-description";
import { WelcomeTitle } from "./welcome-title";

const BUTTON_DELAY = 1.15;

const DOCUMENT_LINKS = [
  {
    label: "Пользовательское соглашение",
    href: assetPath("/docs/Пользовательское_соглашение_100726.docx"),
  },
  {
    label: "Политика персональных данных",
    href: assetPath(
      "/docs/Политика_обработки_персональных_данных_090726_2.doc",
    ),
  },
  {
    label: "Политика возврата",
    href: assetPath("/docs/Политика возврата 100726.docx"),
  },
];

export const WelcomePage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-between overflow-hidden px-4 pt-[42px] pb-[32px]">
      <div className="flex flex-col gap-[24px]">
        <WelcomeTitle />
        <WelcomeDescription />
      </div>
      <WelcomeAnimation />
      <motion.div
        className="w-full"
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
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
        <nav
          className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[11px] leading-[14px] text-foreground/45"
          aria-label="Документы"
        >
          {DOCUMENT_LINKS.map((document) => (
            <a
              key={document.href}
              href={document.href}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-2 transition-colors hover:text-foreground/70 hover:underline focus-visible:text-foreground/70 focus-visible:outline-none focus-visible:underline"
            >
              {document.label}
            </a>
          ))}
        </nav>
      </motion.div>
    </div>
  );
};
