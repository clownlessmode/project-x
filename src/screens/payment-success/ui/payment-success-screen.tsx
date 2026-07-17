"use client";

import type { TarrifModel } from "@entities/tarrif/model/types";
import { CopyField } from "@screens/my-tarrif/ui/copy-field";
import { fadeUpBlurTransition } from "@shared/config/motion";
import { usePaymentFulfillment } from "@shared/hooks/use-payment-fulfillment";
import { useScreenReady } from "@shared/hooks/use-screen-ready";
import { useAuth } from "@shared/providers/auth-provider";
import { formatExpiresAt } from "@shared/lib/format-expires-at";
import { latestVpnUser } from "@shared/lib/latest-vpn-user";
import { openExternalLink } from "@shared/lib/open-external-link";
import {
  clearPendingPayment,
  readPendingPayment,
} from "@shared/lib/pending-payment";
import { Button } from "@shared/ui/button";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SuccessAnimation } from "./success-animation";
import { SuccessTitle } from "./success-title";

type PaymentSuccessScreenProps = {
  tarrif?: TarrifModel | null;
};

const DESCRIPTION_DELAY = 0.45;
const ANIMATION_DELAY = 0.55;
const KEY_DELAY = 0.85;
const BUTTON_DELAY = 1.15;

type Phase = "checking" | "ready" | "waiting";

export function PaymentSuccessScreen({ tarrif }: PaymentSuccessScreenProps) {
  const router = useRouter();
  const isReady = useScreenReady();
  const { applySession, refresh, session, hasVpn } = useAuth();
  const [pending] = useState(readPendingPayment);
  const [phase, setPhase] = useState<Phase>(
    pending?.paymentId ? "checking" : hasVpn ? "ready" : "waiting",
  );

  const handleFulfilled = useCallback(
    (next: Parameters<typeof applySession>[0]) => {
      applySession(next);
      void refresh();
      setPhase("ready");
    },
    [applySession, refresh],
  );

  usePaymentFulfillment({
    paymentId: pending?.paymentId ?? null,
    enabled: phase !== "ready",
    onFulfilled: handleFulfilled,
  });

  useEffect(() => {
    void refresh({ background: true });
  }, [refresh]);

  useEffect(() => {
    if (phase === "ready" || !session?.has_vpn) {
      return;
    }
    const user = latestVpnUser(session);
    if (user?.share_link?.startsWith("vless://")) {
      clearPendingPayment();
      setPhase("ready");
    }
  }, [session, phase]);

  const vpnUser = useMemo(() => latestVpnUser(session), [session]);
  const shareLink =
    vpnUser?.share_link?.startsWith("vless://") ? vpnUser.share_link : "";
  const expiryLabel = formatExpiresAt(vpnUser?.expires_at);

  const statusText = () => {
    if (phase === "ready" && shareLink) {
      return (
        <>
          <p>
            {tarrif?.title
              ? `Ваш тариф “${tarrif.title}” активирован`
              : "Оплата прошла, доступ активирован"}
          </p>
          {expiryLabel && <p>Срок действия до: {expiryLabel}</p>}
        </>
      );
    }
    if (phase === "checking") {
      return <p>Проверяем оплату…</p>;
    }
    return (
      <p>
        Если вы уже оплатили счёт, ключ появится через несколько секунд.
      </p>
    );
  };

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
          {statusText()}
        </motion.div>
      </div>

      <div className="pointer-events-none flex min-h-0 w-full flex-1 flex-col items-center justify-center overflow-hidden gap-4">
        <SuccessAnimation delay={ANIMATION_DELAY} isReady={isReady} />
        {phase === "ready" && shareLink && (
          <motion.div
            className="pointer-events-auto w-full max-w-md px-2"
            initial={{ opacity: 0, y: 12 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={fadeUpBlurTransition(KEY_DELAY)}
          >
            <CopyField label="Ключ" value={shareLink} autoCopy />
          </motion.div>
        )}
      </div>

      <motion.div
        className="relative z-10 flex w-full shrink-0 flex-col gap-3"
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
        {pending?.payUrl && phase !== "ready" && (
          <Button
            type="button"
            variant="outline"
            className="h-[44px] w-full rounded-[16px] text-base"
            onClick={() => openExternalLink(pending.payUrl!)}
          >
            Открыть счёт снова
          </Button>
        )}
        <Button
          className="h-[50px] w-full rounded-[16px] text-xl font-medium"
          onClick={() => router.push("/my-tarrif")}
        >
          К профилю
        </Button>
      </motion.div>
    </div>
  );
}
