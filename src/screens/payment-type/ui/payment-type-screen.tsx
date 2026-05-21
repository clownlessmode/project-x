"use client";

import {
  buildPaymentMethodLink,
  type PaymentMethodSlug,
} from "@entities/tarrif/model/payment-method";
import type { TarrifModel } from "@entities/tarrif/model/types";
import { AddSbp } from "@features/payment/add-sbp";
import { AddStars } from "@features/payment/add-stars";
import { AddUsdt } from "@features/payment/add-usdt";
import { springTransition, TITLE_WORD_DELAY } from "@shared/config/motion";
import { useScreenReady } from "@shared/hooks/use-screen-ready";
import { AnimatedTitle } from "@shared/ui/animated-title";
import { motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

type PaymentTypeScreenProps = {
  tarrif: TarrifModel;
};

const paymentMethods: {
  slug: PaymentMethodSlug;
  component: ReactNode;
}[] = [
  { slug: "sbp", component: <AddSbp /> },
  { slug: "usdt", component: <AddUsdt /> },
  { slug: "stars", component: <AddStars /> },
];

const LIST_BASE_DELAY = TITLE_WORD_DELAY * 2 + 0.12;

export const PaymentTypeScreen = ({ tarrif }: PaymentTypeScreenProps) => {
  const isReady = useScreenReady();

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header className="shrink-0 px-4 pt-6 pb-[30px]">
        <AnimatedTitle text="Способ оплаты" />
      </header>
      <ul className="flex flex-col gap-3 px-4">
        {paymentMethods.map(({ slug, component }, index) => (
          <motion.li
            key={slug}
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={
              isReady
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 28, scale: 0.96 }
            }
            transition={springTransition(LIST_BASE_DELAY + index * 0.08)}
          >
            <Link href={buildPaymentMethodLink(tarrif.id, slug)}>
              {component}
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};
