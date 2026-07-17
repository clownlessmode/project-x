"use client";

import {
  getTarrifPriceByPaymentMethod,
  type PaymentMethodSlug,
} from "@entities/tarrif/model/payment-method";
import { tariffFromClientSummary } from "@entities/tarrif/model/from-dto";
import { PaymentScreen } from "@screens/payment";
import { useTarrifById } from "@shared/hooks/use-tariffs";
import { useAuth } from "@shared/providers/auth-provider";
import { notFound } from "next/navigation";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

type PaymentRouteClientProps = {
  tarrifId: number;
  paymentMethod: PaymentMethodSlug;
};

export function PaymentRouteClient({
  tarrifId,
  paymentMethod,
}: PaymentRouteClientProps) {
  const searchParams = useSearchParams();
  const renewUserId = searchParams.get("renew")?.trim() ?? "";
  const { users } = useAuth();
  const renewUser = renewUserId
    ? users.find((user) => user.id === renewUserId)
    : undefined;

  const renewTarrif = useMemo(() => {
    if (!renewUser?.tariff || renewUser.tariff.id !== tarrifId) {
      return null;
    }
    return tariffFromClientSummary(renewUser.tariff);
  }, [renewUser, tarrifId]);

  const shouldFetch = !renewTarrif;
  const { tarrif: fetchedTarrif, loading, error } = useTarrifById(
    shouldFetch ? tarrifId : null,
  );

  const tarrif = renewTarrif ?? fetchedTarrif;

  if (shouldFetch && loading) {
    return (
      <div className="flex h-screen items-center justify-center text-sm text-muted-foreground">
        Загрузка тарифа…
      </div>
    );
  }

  if (!tarrif || error) {
    notFound();
  }

  if (!renewUserId && !tarrif.is_active) {
    notFound();
  }

  const price = getTarrifPriceByPaymentMethod(tarrif, paymentMethod);
  if (!price) {
    notFound();
  }

  return (
    <PaymentScreen
      tarrif={tarrif}
      paymentMethod={paymentMethod}
      amount={price.amount}
      renewUserId={renewUserId || undefined}
    />
  );
}
