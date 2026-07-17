"use client";

import {
  getPaymentMethodCurrency,
  type PaymentMethodSlug,
} from "@entities/tarrif/model/payment-method";
import { PaymentCurrencyDisplay } from "@entities/tarrif/ui/payment-currency-display";
import { TarrifSummaryCard } from "@entities/tarrif/ui/tarrif-summary-card";
import type { TarrifModel } from "@entities/tarrif/model/types";
import { api } from "@shared/api/client";
import {
  fadeUpBlurTransition,
  springTransition,
  TITLE_WORD_DELAY,
} from "@shared/config/motion";
import { usePaymentFulfillment } from "@shared/hooks/use-payment-fulfillment";
import { useScreenReady } from "@shared/hooks/use-screen-ready";
import { useAuth } from "@shared/providers/auth-provider";
import { buildTelegramAuthPayload } from "@shared/lib/telegram-auth-payload";
import { openExternalLink } from "@shared/lib/open-external-link";
import { savePendingPayment } from "@shared/lib/pending-payment";
import { AnimatedTitle } from "@shared/ui/animated-title";
import { Button } from "@shared/ui/button";
import { EmailField } from "@shared/ui/email-field";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

type PaymentScreenProps = {
  tarrif: TarrifModel;
  paymentMethod: PaymentMethodSlug;
  amount: number;
  renewUserId?: string;
};

const CARD_DELAY = TITLE_WORD_DELAY + 0.12;
const CONTENT_DELAY = TITLE_WORD_DELAY + 0.24;
const FOOTER_DELAY = 0.55;

export function PaymentScreen({
  tarrif,
  paymentMethod,
  amount,
  renewUserId,
}: PaymentScreenProps) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [waitingPay, setWaitingPay] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [payUrl, setPayUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { applySession, refresh } = useAuth();
  const isReady = useScreenReady();
  const currency = getPaymentMethodCurrency(paymentMethod);

  const finishPaid = useCallback(
    (session: Parameters<typeof applySession>[0]) => {
      applySession(session);
      void refresh();
      router.push(`/payment/${tarrif.id}/success`);
    },
    [applySession, refresh, router, tarrif.id],
  );

  usePaymentFulfillment({
    paymentId: waitingPay ? paymentId : null,
    onFulfilled: finishPaid,
  });

  const handleUsdtPay = async () => {
    const auth = buildTelegramAuthPayload();
    if (!auth) {
      setError("Откройте приложение из Telegram");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const invoice = await api.createCryptoPayment({
        ...auth,
        tariff_id: tarrif.id,
        email: email.trim(),
        renew_user_id: renewUserId,
      });
      if (invoice.test_mode && invoice.session) {
        savePendingPayment({
          paymentId: invoice.payment_id,
          tariffId: tarrif.id,
        });
        finishPaid(invoice.session);
        return;
      }
      const url =
        invoice.mini_app_invoice_url ||
        invoice.pay_url ||
        invoice.bot_invoice_url;
      savePendingPayment({
        paymentId: invoice.payment_id,
        payUrl: url,
        tariffId: tarrif.id,
      });
      setPaymentId(invoice.payment_id);
      setPayUrl(url);
      setWaitingPay(true);
      openExternalLink(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const handleActivate = async () => {
    if (paymentMethod === "usdt") {
      await handleUsdtPay();
      return;
    }
    setError("Этот способ оплаты скоро будет доступен");
  };

  const buttonLabel = () => {
    if (busy) return "Создаём счёт…";
    if (waitingPay) return "Ожидаем оплату…";
    if (paymentMethod === "usdt") return "Оплатить USDT";
    return "Оплатить";
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header className="shrink-0 px-4 pt-6 pb-[10px]">
        <AnimatedTitle text={renewUserId ? "Продление" : "Оплата"} />
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
          {waitingPay && paymentMethod === "usdt" && (
            <p className="text-sm text-white/70">
              Оплатите счёт в Crypto Bot. Ключ выдадим автоматически после
              подтверждения — можно вернуться в это окно.
            </p>
          )}
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
          {error && (
            <p className="text-center text-sm text-red-400">{error}</p>
          )}
          {paymentId && waitingPay && payUrl && (
            <Button
              type="button"
              variant="outline"
              onClick={() => openExternalLink(payUrl)}
              className="h-[44px] w-full rounded-[16px] text-base"
            >
              Открыть счёт снова
            </Button>
          )}
          <Button
            disabled={busy || waitingPay}
            onClick={() => void handleActivate()}
            className="h-[50px] w-full rounded-[16px] text-xl font-medium disabled:opacity-50"
          >
            {buttonLabel()}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
