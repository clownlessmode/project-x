"use client";

import { api } from "@shared/api/client";
import type { TelegramAuthResponse } from "@shared/api/types";
import { buildTelegramAuthPayload } from "@shared/lib/telegram-auth-payload";
import { clearPendingPayment } from "@shared/lib/pending-payment";
import { useCallback, useEffect, useRef } from "react";

const POLL_MS = 3000;

type Options = {
  paymentId: string | null;
  enabled?: boolean;
  onFulfilled: (session: TelegramAuthResponse) => void;
};

export function usePaymentFulfillment({
  paymentId,
  enabled = true,
  onFulfilled,
}: Options) {
  const onFulfilledRef = useRef(onFulfilled);
  onFulfilledRef.current = onFulfilled;

  const tick = useCallback(async () => {
    if (!paymentId || !enabled) {
      return false;
    }
    const auth = buildTelegramAuthPayload();
    if (!auth) {
      return false;
    }
    try {
      const res = await api.paymentStatus({ ...auth, payment_id: paymentId });
      if (res.status === "fulfilled" && res.session) {
        clearPendingPayment();
        onFulfilledRef.current(res.session);
        return true;
      }
    } catch {
      // keep polling
    }
    return false;
  }, [paymentId, enabled]);

  useEffect(() => {
    if (!paymentId || !enabled) {
      return;
    }

    let stopped = false;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const run = async () => {
      if (stopped) {
        return;
      }
      const done = await tick();
      if (done && intervalId) {
        clearInterval(intervalId);
      }
    };

    void run();
    intervalId = setInterval(() => void run(), POLL_MS);

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        void run();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stopped = true;
      if (intervalId) {
        clearInterval(intervalId);
      }
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [paymentId, enabled, tick]);
}
