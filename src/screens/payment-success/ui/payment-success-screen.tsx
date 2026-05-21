"use client";

import { formatTarrifExpiryDate } from "@entities/tarrif/model/format-expiry-date";
import type { TarrifModel } from "@entities/tarrif/model/types";
import { fadeUpBlurTransition } from "@shared/config/motion";
import { useScreenReady } from "@shared/hooks/use-screen-ready";
import { Button } from "@shared/ui/button";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { SuccessAnimation } from "./success-animation";
import { SuccessTitle } from "./success-title";

type PaymentSuccessScreenProps = {
  tarrif: TarrifModel;
};

const DESCRIPTION_DELAY = 0.45;
const ANIMATION_DELAY = 0.55;
const BUTTON_DELAY = 1.15;

export function PaymentSuccessScreen({ tarrif }: PaymentSuccessScreenProps) {
  const router = useRouter();
  const isReady = useScreenReady();
  const expiryDate = formatTarrifExpiryDate(tarrif.period);

  return (
    <div className="flex h-screen flex-col items-center justify-between overflow-hidden px-4 pt-[42px] pb-[32px]">
      <div className="flex w-full shrink-0 flex-col items-center gap-[19px]">
        <SuccessTitle />
        <motion.div
          className="flex flex-col gap-1 text-center text-base leading-[1.1] text-white/80"
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={
            isReady
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 18, filter: "blur(6px)" }
          }
          transition={fadeUpBlurTransition(DESCRIPTION_DELAY)}
        >
          <p>Ваш тариф &ldquo;{tarrif.title}&rdquo;</p>
          <p>Срок действия до: {expiryDate}</p>
        </motion.div>
      </div>

      <div className="pointer-events-none flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden">
        <SuccessAnimation delay={ANIMATION_DELAY} isReady={isReady} />
      </div>

      <motion.div
        className="relative z-10 w-full shrink-0"
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
        <Button
          className="h-[50px] w-full rounded-[16px] text-xl font-medium"
          onClick={() => router.push(`/my-tarrif/${tarrif.id}`)}
        >
          К профилю
        </Button>
      </motion.div>
    </div>
  );
}
