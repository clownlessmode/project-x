import {
  parsePaymentMethodSlug,
  type PaymentMethodSlug,
} from "@entities/tarrif/model/payment-method";

export function parsePaymentRoute(
  tarrifParam: string,
  paymentMethodParam: string,
): { tarrifId: number; paymentMethod: PaymentMethodSlug } | null {
  const tarrifId = Number(tarrifParam);
  const paymentMethod = parsePaymentMethodSlug(paymentMethodParam);
  if (!Number.isInteger(tarrifId) || tarrifId <= 0 || !paymentMethod) {
    return null;
  }
  return { tarrifId, paymentMethod };
}
