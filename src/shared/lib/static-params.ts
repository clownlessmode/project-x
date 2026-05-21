import type { PaymentMethodSlug } from "@entities/tarrif/model/payment-method";
import { TARRIFS_MOCK } from "@screens/tarrifs/model/mock";

const PAYMENT_METHODS: PaymentMethodSlug[] = ["sbp", "usdt", "stars"];

export function getTarrifRouteParams() {
  return TARRIFS_MOCK.map((tarrif) => ({
    tarrif: String(tarrif.id),
  }));
}

export function getPaymentRouteParams() {
  return TARRIFS_MOCK.flatMap((tarrif) =>
    PAYMENT_METHODS.map((paymentMethod) => ({
      tarrif: String(tarrif.id),
      "payment-method": paymentMethod,
    })),
  );
}
