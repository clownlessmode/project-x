"use client";

import { Button } from "@shared/ui/button";
import { Check, Copy, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

type CopyStatus = "idle" | "success" | "error";

type CopyFieldProps = {
  label: string;
  value: string;
  autoCopy?: boolean;
};

const FEEDBACK_MS = 3000;

const iconTransition = {
  initial: { scale: 0.6, opacity: 0, rotate: -20 },
  animate: { scale: 1, opacity: 1, rotate: 0 },
  exit: { scale: 0.6, opacity: 0, rotate: 20 },
  transition: { type: "spring", stiffness: 520, damping: 28, mass: 0.6 },
} as const;

export function CopyField({ label, value, autoCopy = false }: CopyFieldProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const resetRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => clearTimeout(resetRef.current);
  }, []);

  const copy = useCallback(async () => {
    clearTimeout(resetRef.current);
    try {
      await navigator.clipboard.writeText(value);
      setStatus("success");
    } catch {
      setStatus("error");
    }
    resetRef.current = setTimeout(() => setStatus("idle"), FEEDBACK_MS);
  }, [value]);

  useEffect(() => {
    if (!autoCopy || !value) {
      return;
    }
    void copy();
  }, [autoCopy, value, copy]);

  return (
    <div className="flex w-full flex-col gap-1.5">
      <p className="text-sm leading-[1.2] text-white/60">{label}</p>
      <div
        role="button"
        tabIndex={0}
        aria-label={`Скопировать ${label.toLowerCase()}`}
        className="flex h-12 cursor-pointer items-center justify-between rounded-[16px] bg-[#282828] py-2.5 pr-1 pl-3.5 outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        onClick={() => void copy()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            void copy();
          }
        }}
      >
        <p className="truncate text-sm leading-[1.2] text-white">{value}</p>
        <Button
          type="button"
          size="icon-sm"
          aria-hidden
          tabIndex={-1}
          className="pointer-events-none size-10 rounded-[12px]"
        >
          <AnimatePresence mode="wait" initial={false}>
            {status === "success" ? (
              <motion.span
                key="success"
                className="flex items-center justify-center"
                {...iconTransition}
              >
                <Check className="size-5 text-white" strokeWidth={2.25} />
              </motion.span>
            ) : status === "error" ? (
              <motion.span
                key="error"
                className="flex items-center justify-center"
                {...iconTransition}
              >
                <X className="size-5 text-white" strokeWidth={2.25} />
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                className="flex items-center justify-center"
                {...iconTransition}
              >
                <Copy className="size-5 text-white" strokeWidth={1.75} />
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </div>
  );
}
