"use client";

import {
  getPaymentMethodCurrency,
  type PaymentMethodSlug,
} from "@entities/tarrif/model/payment-method";
import { PaymentCurrencyDisplay } from "@entities/tarrif/ui/payment-currency-display";
import { TarrifSummaryCard } from "@entities/tarrif/ui/tarrif-summary-card";
import type { TarrifModel } from "@entities/tarrif/model/types";
import {
  fadeUpBlurTransition,
  springTransition,
  TITLE_WORD_DELAY,
} from "@shared/config/motion";
import { useScreenReady } from "@shared/hooks/use-screen-ready";
import { AnimatedTitle } from "@shared/ui/animated-title";
import { Button } from "@shared/ui/button";
import { EmailField } from "@shared/ui/email-field";
import { isValidEmail } from "@shared/utils/is-valid-email";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PaymentScreenProps = {
  tarrif: TarrifModel;
  paymentMethod: PaymentMethodSlug;
  amount: number;
};

const CARD_DELAY = TITLE_WORD_DELAY + 0.12;
const CONTENT_DELAY = TITLE_WORD_DELAY + 0.24;
const FOOTER_DELAY = 0.55;

export function PaymentScreen({
  tarrif,
  paymentMethod,
  amount,
}: PaymentScreenProps) {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const isReady = useScreenReady();
  const currency = getPaymentMethodCurrency(paymentMethod);
  const isPayDisabled = !isValidEmail(email);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header className="shrink-0 px-4 pt-6 pb-[10px]">
        <AnimatedTitle text="Оплата" />
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={
            isReady
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 20, scale: 0.96 }
          }
          transition={springTransition(CARD_DELAY)}
        >
          <TarrifSummaryCard tarrif={tarrif} />
        </motion.div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col justify-between px-4 pb-[32px]">
        <motion.div
          className="flex flex-col gap-4 py-[10px]"
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={
            isReady
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 18, filter: "blur(6px)" }
          }
          transition={fadeUpBlurTransition(CONTENT_DELAY)}
        >
          <div className="flex flex-col gap-4 py-[10px]">
            <div className="flex flex-col gap-1">
              <p className="text-lg font-medium leading-[22px] tracking-[-0.4px] text-white">
                Данные клиента
              </p>
              <p className="text-sm leading-[1.2] text-white/60">
                Сюда отправим чек и данные по заказу
              </p>
            </div>
            <EmailField value={email} onChange={setEmail} />
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-4 pt-5"
          initial={{ y: 120, opacity: 0 }}
          animate={isReady ? { y: 0, opacity: 1 } : { y: 120, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 28,
            mass: 0.85,
            delay: FOOTER_DELAY,
          }}
        >
          <div className="flex items-center gap-1.5 text-lg font-medium leading-[22px] tracking-[-0.4px] text-white">
            <span className="shrink-0">Стоимость</span>
            <span className="h-[14px] min-w-0 flex-1 border-b border-dotted border-[#5e5e5e]" />
            <PaymentCurrencyDisplay amount={amount} currency={currency} />
          </div>
          <Button
            disabled={isPayDisabled}
            onClick={() => router.push(`/payment/${tarrif.id}/success`)}
            className="h-[50px] w-full rounded-[16px] text-xl font-medium disabled:opacity-50"
          >
            Оплатить
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
