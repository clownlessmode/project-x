"use client";

import { PaymentTypeScreen } from "@screens/payment-type";
import { useTarrifById } from "@shared/hooks/use-tariffs";
import { notFound } from "next/navigation";

type PaymentTypeRouteClientProps = {
  tarrifId: number;
};

export function PaymentTypeRouteClient({ tarrifId }: PaymentTypeRouteClientProps) {
  const { tarrif, loading, error } = useTarrifById(tarrifId);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-sm text-muted-foreground">
        Загрузка тарифа…
      </div>
    );
  }

  if (error || !tarrif || !tarrif.is_active) {
    notFound();
  }

  return <PaymentTypeScreen tarrif={tarrif} />;
}
