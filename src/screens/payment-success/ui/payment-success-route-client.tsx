"use client";

import { PaymentSuccessScreen } from "@screens/payment-success";
import { useTarrifById } from "@shared/hooks/use-tariffs";
import { notFound } from "next/navigation";

type PaymentSuccessRouteClientProps = {
  tarrifId: number;
};

export function PaymentSuccessRouteClient({
  tarrifId,
}: PaymentSuccessRouteClientProps) {
  const { tarrif, loading, error } = useTarrifById(tarrifId);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-sm text-muted-foreground">
        Загрузка…
      </div>
    );
  }

  if (error || !tarrif) {
    notFound();
  }

  return <PaymentSuccessScreen tarrif={tarrif} />;
}
