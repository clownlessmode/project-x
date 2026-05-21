"use client";

import { cn } from "@shared/utils/utils";
import { isValidEmail } from "@shared/utils/is-valid-email";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";

const EASE = [0.32, 0.72, 0, 1] as const;

type EmailFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export function EmailField({ value, onChange }: EmailFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const id = useId();
  const isActive = isFocused || value.length > 0;
  const showError = isTouched && value.trim().length > 0 && !isValidEmail(value);

  return (
    <div className="flex w-full flex-col gap-2">
      <motion.div
        layout
        transition={{ duration: 0.25, ease: EASE }}
        className={cn(
          "w-full rounded-[16px] bg-[#282828] px-[14px]",
          isActive ? "py-[10px]" : "flex h-12 items-center",
          showError && "ring-1 ring-red-500/60",
        )}
      >
        <div className="flex w-full flex-col">
          <AnimatePresence initial={false}>
            {isActive && (
              <motion.p
                key="email-label"
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 4 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="overflow-hidden text-sm leading-none tracking-[-0.4px] text-white/40"
              >
                Email
              </motion.p>
            )}
          </AnimatePresence>
          <input
            id={id}
            type="email"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              setIsTouched(true);
            }}
            placeholder={isActive ? undefined : "Email"}
            aria-invalid={showError}
            className={cn(
              "w-full bg-transparent text-sm tracking-[-0.4px] text-white outline-none placeholder:text-white/40",
              isActive ? "font-medium leading-none" : "leading-[1.2]",
            )}
            autoComplete="email"
          />
        </div>
      </motion.div>
      <AnimatePresence initial={false}>
        {showError && (
          <motion.p
            key="email-error"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="overflow-hidden text-sm leading-[1.2] text-red-400"
          >
            Введите корректный email
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
