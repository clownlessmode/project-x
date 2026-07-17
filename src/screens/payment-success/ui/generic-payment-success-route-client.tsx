"use client";

import { PaymentSuccessScreen } from "@screens/payment-success";
import { useTarrifById } from "@shared/hooks/use-tariffs";
import { readPendingPayment } from "@shared/lib/pending-payment";
import { useState } from "react";

export function GenericPaymentSuccessRouteClient() {
  const [pending] = useState(readPendingPayment);
  const { tarrif, loading } = useTarrifById(pending?.tariffId ?? null);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-sm text-muted-foreground">
        Загрузка…
      </div>
    );
  }

  return <PaymentSuccessScreen tarrif={tarrif} />;
}
