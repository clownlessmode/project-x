import type { TarrifModel, TarrifPaymentMethod } from "./types";

export type PaymentMethodSlug = "sbp" | "usdt" | "stars";

const PAYMENT_METHOD_SLUGS: PaymentMethodSlug[] = ["sbp", "usdt", "stars"];

const PAYMENT_METHOD_LABELS: Record<PaymentMethodSlug, string> = {
  sbp: "СБП",
  usdt: "USDT",
  stars: "Telegram Stars",
};

const PAYMENT_METHOD_TO_CURRENCY: Record<
  PaymentMethodSlug,
  TarrifPaymentMethod
> = {
  sbp: "rub",
  usdt: "usdt",
  stars: "stars",
};

export function parsePaymentMethodSlug(
  value: string,
): PaymentMethodSlug | undefined {
  return PAYMENT_METHOD_SLUGS.find((slug) => slug === value);
}

export function getPaymentMethodLabel(slug: PaymentMethodSlug) {
  return PAYMENT_METHOD_LABELS[slug];
}

export function getPaymentMethodCurrency(slug: PaymentMethodSlug) {
  return PAYMENT_METHOD_TO_CURRENCY[slug];
}

export function getTarrifPriceByPaymentMethod(
  tarrif: TarrifModel,
  slug: PaymentMethodSlug,
) {
  const currency = getPaymentMethodCurrency(slug);

  return tarrif.prices.find((price) => price.currency === currency);
}

export function buildPaymentMethodLink(
  tarrifId: number,
  slug: PaymentMethodSlug,
) {
  return `/payment/${tarrifId}/${slug}`;
}
